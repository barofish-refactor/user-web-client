import { useMutation, useQueryClient } from '@tanstack/react-query';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { client } from 'src/api/client';
import { type OrderProductDto } from 'src/api/swagger/data-contracts';
import { queryKey } from 'src/query-key';
import { useAlertStore, useConfirmStore } from 'src/store';
import { formatToLocaleString } from 'src/utils/functions';
import { parseProductInfoState } from 'src/utils/parse';

/* 
  상태에 따른 버튼 노출 필요
  버튼이 하나도 없으면 hasButtons = false 필요
*/

const buttonClassName =
  'rounded-sm border border-[#f2f2f2] text-[13px] leading-[20px] -tracking-[0.03em] text-grey-30 flex items-center justify-center';

interface Props {
  id: string | undefined;
  item: OrderProductDto;
}

export function MypageOrderProductItem({ id, item }: Props) {
  const queryClient = useQueryClient();
  const { setAlert } = useAlertStore();
  const { setConfirm } = useConfirmStore();

  const hasButtons = true;
  let buttonList: number[] = []; // 취소환불, 교환요청, 구매확정, 배송조회, 후기작성, 재구매
  switch (item.state) {
    case 'WAIT_DEPOSIT':
    case 'PAYMENT_DONE':
    case 'DELIVERY_READY':
      buttonList = [0];
      break;
    case 'ON_DELIVERY':
      buttonList = [2, 3];
      break;
    case 'DELIVERY_DONE':
      buttonList = [0, 1, 2, 3];
      break;
    case 'FINAL_CONFIRM':
      buttonList = [4, 5];
      break;
    case 'CANCELED':
    case 'CANCEL_REQUEST':
    case 'EXCHANGE_REQUEST':
    case 'EXCHANGE_ACCEPT':
    case 'REFUND_REQUEST':
    case 'REFUND_ACCEPT':
    case 'REFUND_DONE':
      break;
    default:
      buttonList = [0, 1, 2, 3, 4, 5];
      break;
  }

  const { mutateAsync: confirmOrderProduct, isLoading: isConfirmLoading } = useMutation(
    async ({ orderProductInfoId }: { orderProductInfoId: number }) =>
      await (await client()).confirmOrderProduct(orderProductInfoId),
  );

  const onConfirmMutate = ({ orderProductInfoId }: { orderProductInfoId: number }) => {
    if (isConfirmLoading) return;
    setConfirm({
      message: '구매확정하시겠습니까?',
      onClick: () => {
        confirmOrderProduct({ orderProductInfoId })
          .then(res => {
            if (res.data.isSuccess) {
              setAlert({
                message: '구매확정 되었습니다.',
                type: 'success',
                onClick: () => queryClient.invalidateQueries(queryKey.order.lists),
              });
            } else setAlert({ message: res.data.errorMsg ?? '' });
          })
          .catch(error => console.log(error));
      },
    });
  };

  return (
    <div className={clsx('last:pb-0', hasButtons ? 'pb-5' : 'pb-0')}>
      <p
        data-done={item.state !== 'DELIVERY_READY'}
        className='text-[14px] font-semibold leading-[22px] -tracking-[0.03em] text-primary-50 data-[done=true]:text-grey-50'
      >
        {parseProductInfoState(item.state)}
      </p>
      <div className='mt-2 flex items-center gap-2.5'>
        <Link href={{ pathname: '/product', query: { id: item.product?.id } }}>
          <Image
            unoptimized
            priority
            src={item.product?.image ?? ''}
            alt='product'
            width={70}
            height={70}
            className='aspect-square h-[70px] w-[70px] rounded object-cover'
          />
        </Link>
        <div className='flex-1'>
          <h4 className='line-clamp-1 text-[13px] font-medium leading-[20px] -tracking-[0.03em] text-grey-10'>
            {item.product?.title ?? ''}
          </h4>
          <p className='line-clamp-1 text-[13px] leading-[20px] -tracking-[0.03em] text-grey-40'>
            기본
          </p>
          <div className='mt-0.5 flex items-center gap-1'>
            <span className='text-[13px] leading-[20px] -tracking-[0.03em] text-grey-60'>
              {formatToLocaleString(item.amount, { suffix: '개' })}
            </span>
            <strong className='text-[14px] font-medium leading-[22px] -tracking-[0.03em]'>
              {formatToLocaleString(item.price, { suffix: '원' })}
            </strong>
          </div>
        </div>
      </div>
      {buttonList.length > 0 && (
        <nav className='mt-3 grid h-8 grid-flow-col gap-x-1.5'>
          {buttonList.includes(0) && (
            <Link
              className={buttonClassName}
              href={{
                pathname: '/mypage/order/refund/action',
                query: { id, subId: item.id, type: 'refund', state: item.state },
              }}
            >
              취소/환불
            </Link>
          )}
          {buttonList.includes(1) && (
            <Link
              className={buttonClassName}
              href={{
                pathname: '/mypage/order/refund/action',
                query: { id, subId: item.id, type: 'change' },
              }}
            >
              교환 요청
            </Link>
          )}
          {buttonList.includes(2) && (
            <button
              className={buttonClassName}
              onClick={() => {
                if (item.id) onConfirmMutate({ orderProductInfoId: item.id });
              }}
            >
              구매 확정
            </button>
          )}
          {buttonList.includes(3) && (
            <button
              className={buttonClassName}
              onClick={() => {
                setAlert({
                  message: (item.deliverCompany ?? '') + ' ' + (item.invoiceCode ?? ''),
                  onClick: () => {
                    if (window.ReactNativeWebView) {
                      window.ReactNativeWebView.postMessage(
                        JSON.stringify({ type: 'link', url: `https://naver.me/5FlthH9K` }),
                      );
                    } else {
                      return window.open(`https://naver.me/5FlthH9K`, '_blank');
                    }
                  },
                });
              }}
            >
              배송 조회
            </button>
          )}
          {buttonList.includes(4) && !item.isReviewWritten && (
            <Link
              href={{ pathname: '/mypage/review/write', query: { v: id, subId: item.id } }}
              className={buttonClassName}
            >
              후기 작성
            </Link>
          )}
          {buttonList.includes(5) && (
            <Link
              href={{ pathname: '/product', query: { id: item.product?.id } }}
              className={buttonClassName}
            >
              재구매
            </Link>
          )}
        </nav>
      )}
    </div>
  );
}
