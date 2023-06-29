import Layout from 'src/components/common/layout';
import { BackButton } from 'src/components/ui';
import { type NextPageWithLayout } from 'src/types/common';
import Image from 'next/image';
import Link from 'next/link';
import { formatToBlob, formatToLocaleString } from 'src/utils/functions';
import { inputClassName, submitButtonClassName } from 'src/components/form';
import { Selector } from 'src/components/common';
import clsx from 'clsx';
import { useMutation, useQuery } from '@tanstack/react-query';
import { client } from 'src/api/client';
import { queryKey } from 'src/query-key';
import { useAlertStore } from 'src/store';
import { useRouter } from 'next/router';
import { Fragment, useEffect, useState } from 'react';
import {
  type CancelOrderByUserPayload,
  type RequestChangeProductPayload,
  type OrderProductDto,
} from 'src/api/swagger/data-contracts';
import { ContentType } from 'src/api/swagger/http-client';

interface optionType {
  label: string;
  value: 'JUST' | 'DELIVER_DELAY' | 'ORDER_FAULT' | 'BAD_SERVICE';
}

/** 마이페이지/주문 내역/주문 취소 */
const MypageOrderRefundAction: NextPageWithLayout = () => {
  const router = useRouter();
  const { id, subId, type } = router.query;
  const { setAlert } = useAlertStore();
  const [reportValue, setReportValue] = useState<optionType>();
  const [content, setContent] = useState<string>('');
  const [productInfo, setProductInfo] = useState<OrderProductDto>();

  const { data: orderData } = useQuery(
    queryKey.order.detail(id as string),
    async () => {
      const res = await client().selectOrder(id as string);
      if (res.data.isSuccess) {
        return res.data.data;
      } else {
        setAlert({ message: res.data.errorMsg ?? '' });
        throw new Error(res.data.errorMsg);
      }
    },
    {
      enabled: !!id,
    },
  );

  useEffect(() => {
    if (orderData && subId) {
      const tmp = orderData.productInfos?.filter(v => v.id === Number(subId));
      if (tmp && tmp.length > 0) setProductInfo(tmp[0]);
    }
  }, [orderData, subId]);

  const { mutateAsync: cancelOrderByUser, isLoading: isCancelLoading } = useMutation(
    ({
      orderProductInfoId,
      data,
    }: {
      orderProductInfoId: number;
      data: CancelOrderByUserPayload;
    }) => client().cancelOrderByUser(orderProductInfoId, data, { type: ContentType.FormData }),
  );

  const { mutateAsync: requestChangeProduct, isLoading: isChangeLoading } = useMutation(
    ({
      orderProductInfoId,
      data,
    }: {
      orderProductInfoId: number;
      data: RequestChangeProductPayload;
    }) => client().requestChangeProduct(orderProductInfoId, data, { type: ContentType.FormData }),
  );

  const onCancelMutate = ({
    orderProductInfoId,
    data,
  }: {
    orderProductInfoId: number;
    data: CancelOrderByUserPayload;
  }) => {
    if (isCancelLoading) return;
    cancelOrderByUser({ orderProductInfoId, data: { data: formatToBlob(data.data, true) } })
      .then(res => {
        if (res.data.isSuccess) {
          setAlert({
            message: `취소/환불 ${
              orderData?.state === 'WAIT_DEPOSIT' ? '완료 되었습니다.' : '요청이 접수되었습니다.'
            }`,
            type: 'success',
            onClick: () => router.replace({ pathname: '/mypage' }),
          });
        } else setAlert({ message: res.data.errorMsg ?? '' });
      })
      .catch(error => console.log(error));
  };

  const onChangeMutate = ({
    orderProductInfoId,
    data,
  }: {
    orderProductInfoId: number;
    data: RequestChangeProductPayload;
  }) => {
    if (isChangeLoading) return;
    requestChangeProduct({ orderProductInfoId, data: { data: formatToBlob(data.data, true) } })
      .then(res => {
        if (res.data.isSuccess) {
          setAlert({
            message: '교환 요청이 접수되었습니다.',
            type: 'success',
            onClick: () => router.replace({ pathname: '/mypage' }),
          });
        } else setAlert({ message: res.data.errorMsg ?? '' });
      })
      .catch(error => console.log(error));
  };

  return (
    <Fragment>
      <header className='title-header'>
        <BackButton />
        <h2 className='font-semibold leading-[24px] -tracking-[0.03em] text-grey-10'>
          {type === 'refund' ? `취소/환불` : '교환 요청'}
        </h2>
        <div className='h-6 w-6' />
      </header>
      <section className='flex flex-1 flex-col pb-6'>
        <div className='flex items-center gap-2.5 bg-grey-90 p-4'>
          <Link href={{ pathname: '/product', query: { id: 1 } }}>
            {productInfo?.product?.image && (
              <Image
                priority
                src={productInfo?.product?.image ?? ''}
                alt='product'
                width={70}
                height={70}
                className='aspect-square h-[70px] w-[70px] rounded object-cover'
              />
            )}
          </Link>
          <div className='flex-1'>
            <h4 className='line-clamp-1 text-[13px] font-medium leading-[20px] -tracking-[0.03em] text-grey-10'>
              {productInfo?.product?.title ?? ''}
            </h4>
            <p className='line-clamp-1 text-[13px] leading-[20px] -tracking-[0.03em] text-grey-40'>
              {productInfo?.optionName ?? '기본'}
            </p>
            <div className='mt-0.5 flex items-center gap-1'>
              <span className='text-[13px] leading-[20px] -tracking-[0.03em] text-grey-60'>
                {formatToLocaleString(productInfo?.amount, { suffix: '개' })}
              </span>
              <strong className='text-[14px] font-medium leading-[22px] -tracking-[0.03em]'>
                {formatToLocaleString(productInfo?.price, { suffix: '원' })}
              </strong>
            </div>
          </div>
        </div>
        <div className='flex flex-1 flex-col justify-between px-4 pt-6'>
          <div>
            <h3 className='text-[13px] font-bold leading-[20px] -tracking-[0.03em] text-grey-20'>
              취소/환불 사유
            </h3>
            <div className='space-y-1.5 pt-3'>
              <Selector
                value={reportValue}
                setValue={e => setReportValue(e as optionType)}
                placeHolder={
                  type === 'change' ? '옵션을 선택해주세요' : '취소/환불 사유를 선택해주세요'
                }
                list={
                  [
                    { label: '단순 변심', value: 'JUST' },
                    { label: '배송 지연', value: 'DELIVER_DELAY' },
                    { label: '주문 실수', value: 'ORDER_FAULT' },
                    { label: '서비스 불만족', value: 'BAD_SERVICE' },
                  ] as optionType[]
                }
              />
              <textarea
                className={clsx(inputClassName, 'py-3 [&]:h-[212px]')}
                spellCheck={false}
                value={content}
                placeholder={
                  type === 'change'
                    ? '교환 요청 사유를 작성 해 주세요'
                    : '취소/환불 사유를 작성 해 주세요'
                }
                onChange={e => setContent(e.target.value)}
              />
            </div>
          </div>
          <button
            className={submitButtonClassName}
            onClick={() => {
              if (!reportValue)
                return setAlert({
                  message: `${
                    type === 'change' ? '교환 요청 사유를' : '취소/환불 사유를'
                  } 선택해주세요`,
                });
              if (type === 'change') {
                onChangeMutate({
                  orderProductInfoId: productInfo?.id ?? -1,
                  data: {
                    data: {
                      cancelReason: reportValue.value,
                      reasonContent: content,
                    },
                  },
                });
              } else {
                onCancelMutate({
                  orderProductInfoId: productInfo?.id ?? -1,
                  data: {
                    data: {
                      cancelReason: reportValue.value,
                      content,
                    },
                  },
                });
              }
            }}
          >
            {type === 'change' ? `교환 요청` : `취소/환불 요청`}
          </button>
        </div>
      </section>
    </Fragment>
  );
};

MypageOrderRefundAction.getLayout = page => (
  <Layout
    className='flex flex-1 flex-col'
    footerProps={{ disable: true }}
    headerProps={{ disable: true }}
  >
    <div className='flex flex-1 flex-col'>{page}</div>
  </Layout>
);

export default MypageOrderRefundAction;
