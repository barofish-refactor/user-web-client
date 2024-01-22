import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { Fragment, useMemo, useState } from 'react';
import { client } from 'src/api/client';
import { type OrderProductDto } from 'src/api/swagger/data-contracts';
import { BackButton } from 'src/components/ui';
import { queryKey } from 'src/query-key';
import { useAlertStore } from 'src/store';
import { type deliverFeeTypeEnum } from 'src/types/common';
import cm from 'src/utils/class-merge';
import { formatToLocaleString, formatToPhone, getDeliverFee } from 'src/utils/functions';
import { parsePaymentWay2, parseProductInfoState } from 'src/utils/parse';

const headingClassName = 'font-bold leading-[24px] -tracking-[0.03em] text-grey-10';
const labelClassName = 'font-medium leading-[24px] -tracking-[0.03em] text-grey-50';
const subValueClassName = 'font-medium leading-[24px] -tracking-[0.03em] text-grey-20';

interface Props {
  id: string;
}

interface SectionProductType {
  index: number;
  storeId?: number;
  storeName?: string;
  storeProfile?: string;
  deliverFee: number;
  data: OrderProductDto[];
}
interface DeliverPriceCheckType {
  result: number;
  sectionTotal: number;
  minOrderPrice: number;
  deliverFeeType?: deliverFeeTypeEnum;
  minStorePrice: number;
}
/** 장바구니 타입 변경 */
const changeSectionProduct = (value: OrderProductDto[]): SectionProductType[] => {
  let idx = 0;

  const result = value.reduce((acc, cur) => {
    const ownerId = cur.storeId;

    const index = acc.findIndex(v => v.storeId === ownerId);
    const productId = cur.product?.id;

    const curTotalPrice = value
      .filter(v => v.product?.id === productId)
      .map(v => (v.amount ?? 0) * (v.originPrice ?? 0))
      .reduce((a, b) => a + b, 0);
    const curDeliverFee = getDeliverFee({
      type: cur.deliverFeeType ?? 'FREE',
      deliverFee: cur.deliverFee ?? 0,
      totalPrice: curTotalPrice,
      minStorePrice: cur.minStorePrice ?? 0,
      minOrderPrice: cur.minOrderPrice ?? 0,
    });

    if (index === -1) {
      acc.push({
        data: [cur],
        storeId: cur.storeId,
        storeName: cur.storeName,
        storeProfile: cur.storeProfile,
        deliverFee: curDeliverFee,
        index: idx,
      });
      idx++;
    } else {
      acc[index].deliverFee = Math.max(acc[index].deliverFee, curDeliverFee);
      acc[index].data.push(cur);
    }
    return acc;
  }, [] as SectionProductType[]);
  return result;
};
const deliverPriceAfterCheckType = ({
  result,
  sectionTotal,
  minOrderPrice,
  deliverFeeType,
  minStorePrice,
}: DeliverPriceCheckType) => {
  let finalResult;
  if (deliverFeeType === 'FREE') {
    finalResult = 0;
  } else if (deliverFeeType === 'FIX') {
    finalResult = result;
  } else if (deliverFeeType === 'FREE_IF_OVER') {
    finalResult = sectionTotal >= minOrderPrice ? 0 : result;
  } else if (deliverFeeType === 'S_CONDITIONAL') {
    finalResult = sectionTotal >= minStorePrice ? 0 : result;
  } else {
    finalResult = result;
  }

  return finalResult;
};
function getAdditionalPrice(
  value: any,
  // addDiscountPrice?: boolean,
  multiple?: boolean,
) {
  const discountPrice = value?.price ?? 0;
  let result = (value?.originPrice ?? 0) - discountPrice;

  // if (addDiscountPrice) {
  //   result = discountPrice + result;
  // }

  if (multiple) {
    result = result * (value.amount ?? 0);
  }

  return result;
}
export function MypageOrderDetail({ id }: Props) {
  const { setAlert } = useAlertStore();

  // const paymentMethod = '카드결제';
  const { data } = useQuery(
    queryKey.order.detail(id),
    async () => {
      const res = await (await client()).selectOrder(id);
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

  const totalProductPrice = data?.productInfos
    ?.map((v: any) => v.price ?? 0)
    .reduce((a: number, b: number) => a + b, 0);
  const refundTotalProductPrice = data?.productInfos
    ?.map((v: any) => {
      let price = v.price;
      if (v.state === 'CANCELED') price = 0;
      if (v.state === 'REFUND_DONE') price = 0;

      return price ?? 0;
      // v.price ?? 0;
    })
    .reduce((a: number, b: number) => a + b, 0);
  console.log(refundTotalProductPrice, 'refundTotalProductPrice');

  const section = changeSectionProduct(data?.productInfos ?? []);

  const totalDeliverFee = section.map(x => x.deliverFee).reduce((a, b) => a + b, 0);

  const { data: pointData } = useQuery(queryKey.pointRule, async () => {
    const res = await (await client()).selectPointRule();
    if (res.data.isSuccess) {
      return res.data.data;
    } else {
      setAlert({ message: res.data.errorMsg ?? '' });
      throw new Error(res.data.errorMsg);
    }
  });

  /** 구매 적립금 */
  const buyPoint =
    Math.round(Math.floor(Math.max(totalProductPrice ?? 0) * (pointData?.pointRate ?? 1)) / 10) *
    10;
  /** 상품 적립금 */
  const productPoint = Math.floor(
    data?.productInfos
      ? data.productInfos
          .map((v: any) => v.price * v.optionItem?.pointRate * v.amount)
          .reduce((a: number, b: number) => a + b, 0)
      : 0,
  );
  /** 후기 작성 적립금 */
  const imageReviewPoint = pointData?.imageReviewPoint;
  /** 예상 적립 금액 */
  const expectPoint = useMemo(
    () => buyPoint + (imageReviewPoint ?? 0) + productPoint,
    [buyPoint, imageReviewPoint, productPoint],
  );
  const [isOpenProductPoint, setIsOpenProductPoint] = useState<boolean>(false);
  console.log(data, 'data');

  return (
    <div>
      <header className='title-header'>
        <BackButton />
        <h2 className='font-semibold leading-[24px] -tracking-[0.03em] text-grey-10'>주문 상세</h2>
        <div className='h-6 w-6' />
      </header>
      <section className='pb-6'>
        <div className='px-4 pb-[22px] pt-4'>
          <h3 className={headingClassName}>주문자 정보</h3>
          <div className='grid grid-cols-[64px,1fr] gap-x-2 gap-y-4 pt-4'>
            <span className='text-[16px] font-medium leading-[22px] -tracking-[0.03em] text-grey-10'>
              이름
            </span>
            <span className='text-[16px] leading-[22px] -tracking-[0.03em] text-grey-50'>
              {data?.ordererName ?? ''}
            </span>
            <span className='text-[16px] font-medium leading-[22px] -tracking-[0.03em] text-grey-10'>
              연락처
            </span>
            <span className='text-[16px] leading-[22px] -tracking-[0.03em] text-grey-50'>
              {formatToPhone(data?.ordererTel)}
            </span>
          </div>
        </div>
        <hr className='border-t-8 border-grey-90' />
        <div className='px-4 py-[22px]'>
          <h3 className={headingClassName}>배송지</h3>
          <div className='pt-[22px]'>
            <h4 className={headingClassName}>{data?.deliverPlace?.name ?? ''}</h4>
            <p className='mt-1 font-medium leading-[24px] -tracking-[0.03em] text-grey-10'>
              {data?.deliverPlace?.receiverName ?? ''},{formatToPhone(data?.deliverPlace?.tel)}
            </p>
            <hr className='my-2.5 border-grey-90' />
            <p className='font-medium leading-[24px] -tracking-[0.03em] text-grey-10'>
              {data?.deliverPlace?.address ?? ''}, {data?.deliverPlace?.addressDetail ?? ''}
            </p>
            <p className='mt-1 text-[16px] font-medium leading-[22px] -tracking-[0.03em] text-grey-70'>
              {data?.deliverPlace?.deliverMessage ?? ''}
            </p>
          </div>
        </div>
        <hr className='border-t-8 border-grey-90' />
        <div className='px-4 py-[22px]'>
          <details open className='group'>
            <summary className='flex items-center justify-between gap-3'>
              <h3 className={headingClassName}>주문 상품</h3>
              <div className='flex flex-1 items-center gap-1.5'>
                <div className='flex flex-1 font-medium leading-[24px] -tracking-[0.03em] text-grey-20'>
                  <p className='line-clamp-1 flex-1 text-end'>
                    &nbsp;{data?.productInfos?.[0]?.product?.title}
                  </p>
                  {(data?.productInfos?.length ?? 0) > 1 &&
                    `외 ${(data?.productInfos?.length ?? 0) - 1}건`}
                </div>
                <Image
                  unoptimized
                  src='/assets/icons/common/chevron-mypage.svg'
                  width={24}
                  height={24}
                  alt='mypage'
                  className='rotate-90 group-open:-rotate-90'
                />
              </div>
            </summary>
            <article className='space-y-4 pt-[22px]'>
              {(section ?? []).map((v, idx) => {
                // const sectionDeliverFee = v.deliverFee;
                const totalDelivery = v.data
                  .map(x => {
                    const sectionTotal = v.data
                      .map(v => getAdditionalPrice(v, true))
                      .reduce((a, b) => a + b, 0);

                    const deliverF = deliverPriceAfterCheckType({
                      result: x.deliverFee ?? 0,
                      sectionTotal,
                      minOrderPrice: x.minOrderPrice ?? 10000000,
                      deliverFeeType: x.deliverFeeType,
                      minStorePrice: x.minStorePrice ?? 10000000,
                    });
                    return deliverF;
                  })
                  .reduce((a, b) => a + b, 0);
                // const totalPrice = v.data.map(x => x.price ?? 0).reduce((a, b) => a + b, 0);
                // const exceptRefundTotalPriceData = v.data
                //   .map(x => {
                //     let price = x.price;
                //     if (x.state === 'CANCELED') price = 0;
                //     if (x.state === 'REFUND_DONE') price = 0;

                //     return price ?? 0;
                //   })
                //   .reduce((a, b) => a + b, 0);
                // x => x.state !== 'CANCELED' || x.state !== 'REFUND_DONE',

                return (
                  <div key={idx} className='border-b border-b-grey-90 pb-4 last:border-0 last:pb-0'>
                    <div className='flex items-center justify-between'>
                      <Link
                        href={{ pathname: '/store/detail', query: { id: v.storeId } }}
                        className='flex items-center gap-2'
                      >
                        <Image
                          unoptimized
                          className='aspect-square h-7 w-7 rounded-full border border-grey-90 object-cover'
                          width={28}
                          height={28}
                          alt='스토어'
                          src={v.storeProfile ?? ''}
                        />
                        <span className='font-semibold leading-[24px] -tracking-[0.03em] text-grey-10'>
                          {v.storeName ?? ''}
                        </span>
                      </Link>
                      <div className='flex items-center gap-1'>
                        <span className='text-[15px] font-medium leading-[20px] -tracking-[0.03em] text-grey-50'>
                          배송비
                        </span>
                        <span className='text-[15px] font-bold leading-[20px] -tracking-[0.03em] text-grey-20'>
                          {totalDelivery === 0
                            ? '무료'
                            : formatToLocaleString(totalDelivery, { suffix: '원' })}
                        </span>
                      </div>
                    </div>
                    {v.data.map(x => {
                      return (
                        <div key={x.id} className='flex items-center gap-2.5 pt-3'>
                          <Link href={{ pathname: '/product', query: { id: x.product?.id } }}>
                            <Image
                              unoptimized
                              src={x.product?.image ?? ''}
                              width={70}
                              height={70}
                              alt='product'
                              className='aspect-square h-[70px] w-[70px] rounded object-cover'
                            />
                          </Link>
                          <div className='flex flex-1 flex-col justify-center gap-1'>
                            <h4 className='text-[16px] font-medium leading-[22px] -tracking-[0.03em] text-grey-10'>
                              {x.product?.title ?? ''}
                            </h4>
                            <div className='flex flex-wrap items-center'>
                              <p className='text-[16px] leading-[22px] -tracking-[0.03em] text-grey-40'>
                                {x.amount ?? 0}개
                              </p>
                              <div className='mx-1.5 h-[14px] w-[1px] bg-[#E2E2E2]' />
                              <p className='text-[16px] leading-[22px] -tracking-[0.03em] text-grey-40'>
                                {x.optionName ?? '기본'}
                              </p>
                              <div className='mx-1.5 h-[14px] w-[1px] bg-[#E2E2E2]' />
                              <p className='text-[16px] leading-[22px] -tracking-[0.03em] text-grey-40'>
                                {parseProductInfoState(x.state)}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                    {/* <p className='text-right font-bold leading-[24px] -tracking-[0.03em] text-grey-10'>
                      {formatToLocaleString(exceptRefundTotalPriceData, { suffix: '원' })}
                    </p> */}
                  </div>
                );
              })}
            </article>
          </details>
        </div>
        <hr className='border-t-8 border-grey-90' />
        <div className='flex items-center justify-between px-4 py-[22px]'>
          <h3 className={headingClassName}>결제 수단</h3>
          <p className='font-semibold leading-[24px] -tracking-[0.03em] text-grey-10'>
            {parsePaymentWay2(data?.paymentWay)}
          </p>
        </div>
        <hr className='border-t-8 border-grey-90' />
        <div className='px-4 py-[22px]'>
          <h3 className={headingClassName}>결제 금액</h3>
          <div className='space-y-2.5 py-4'>
            <div className='flex items-center justify-between'>
              <span className={labelClassName}>주문금액</span>
              <span className={subValueClassName}>
                {formatToLocaleString(totalProductPrice, { suffix: '원' })}
              </span>
            </div>
            <div className='flex items-center justify-between'>
              <span className={labelClassName}>배송비</span>
              <span className={subValueClassName}>
                {formatToLocaleString(totalDeliverFee, { prefix: '+' })}원
              </span>
            </div>
            <div className='flex items-center justify-between'>
              <span className={labelClassName}>쿠폰할인</span>
              <span className={subValueClassName}>
                {formatToLocaleString(data?.couponDiscount, { prefix: '-' })}원
              </span>
            </div>
            <div className='flex items-center justify-between'>
              <span className={labelClassName}>적립금사용</span>
              <span className={subValueClassName}>
                {formatToLocaleString(data?.usePoint, { prefix: '-' })}원
              </span>
            </div>
          </div>
          <hr className='border-[#f7f7f7]' />
          <div className='mt-4 flex items-center justify-between'>
            <h4 className={headingClassName}>최종 결제 금액</h4>
            <strong className='text-[20px] leading-[30px] -tracking-[0.03em] text-grey-10'>
              {formatToLocaleString(
                totalProductPrice +
                  totalDeliverFee -
                  Number(data?.couponDiscount) -
                  Number(data?.usePoint),
                { suffix: '원' },
              )}
            </strong>
          </div>
        </div>
        <hr className='border-t-8 border-grey-90' />
        <div className='px-4 py-[22px]'>
          <h3 className={headingClassName}>적립금 혜택</h3>
          {/* <div className='space-y-2.5 py-4'> */}
          <div className='flex justify-between'>
            <span className={labelClassName}>구매적립</span>
            <div className='text-right'>
              <span className={subValueClassName}>
                {formatToLocaleString(buyPoint, { suffix: '원' })}
              </span>
              <p className='text-[14px] leading-[22px] -tracking-[0.03em] text-grey-60'>
                {`(${data?.user?.grade?.name ?? ''} 등급 : 구매 적립 ${
                  Number(data?.user?.grade?.pointRate) * 100 ?? 1
                }%)`}
              </p>
            </div>
          </div>
          {/* <div className='flex justify-between'> */}
          <button
            className='flex h-[44px] w-full items-center justify-between'
            onClick={() => setIsOpenProductPoint(!isOpenProductPoint)}
          >
            <p className='flex text-[16px] font-medium leading-[24px] -tracking-[0.03em]  text-grey-50'>
              상품적립
              <Image
                unoptimized
                src='/assets/icons/common/chevron-mypage.svg'
                alt='chevron'
                width={24}
                height={24}
                className={cm(!isOpenProductPoint ? 'rotate-90' : 'rotate-[270deg]')}
              />
            </p>
            <div className='flex flex-col items-end'>
              <p className='text-[16px] font-medium leading-[24px] -tracking-[0.03em] text-grey-20'>{`${formatToLocaleString(
                productPoint,
              )}원`}</p>
            </div>
          </button>
          {isOpenProductPoint &&
            data?.productInfos?.map((item: any, idx: number) => {
              return (
                <Fragment key={idx}>
                  <div className='flex items-center justify-between'>
                    <p className='text-[14px] font-medium leading-[10px] -tracking-[0.03em] text-grey-50'>
                      {item?.optionItem?.name}
                    </p>
                    <p className='text-[14px] font-medium leading-[24px] -tracking-[0.03em] text-grey-60'>{`${formatToLocaleString(
                      Math.floor(item?.optionItem.discountPrice * item?.optionItem?.pointRate) *
                        item?.amount,
                    )}원`}</p>
                  </div>
                  <p className='mb-4 mt-4 text-[14px] font-medium leading-[10px] -tracking-[0.03em] text-grey-60'>
                    옵션: {item.optionName}
                  </p>
                </Fragment>
              );
            })}
          {/* </div> */}

          <div className='flex justify-between'>
            <span className={labelClassName}>후기작성</span>
            <span className={subValueClassName}>
              {formatToLocaleString(imageReviewPoint, {
                prefix: '최대 ',
                suffix: '원',
              })}
            </span>
          </div>
          {/* </div> */}
          <hr className='border-grey-90' />
          <div className='flex items-center justify-between pt-[22px]'>
            <h4 className={headingClassName}>적립 금액</h4>
            <strong className='text-[20px] font-bold leading-[30px] -tracking-[0.03em] text-primary-50'>
              {formatToLocaleString(expectPoint, { prefix: '최대 ', suffix: '원' })}
            </strong>
          </div>
        </div>
      </section>
    </div>
  );
}
