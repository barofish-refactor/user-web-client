import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { client } from 'src/api/client';
import { type OrderProductDto } from 'src/api/swagger/data-contracts';
import { BackButton } from 'src/components/ui';
import { queryKey } from 'src/query-key';
import { useAlertStore } from 'src/store';
import { formatToLocaleString, formatToPhone } from 'src/utils/functions';
import { parsePaymentWay2 } from 'src/utils/parse';

const headingClassName = 'font-bold leading-[24px] -tracking-[0.03em] text-grey-10';
const labelClassName = 'font-medium leading-[24px] -tracking-[0.03em] text-grey-50';
const subValueClassName = 'font-medium leading-[24px] -tracking-[0.03em] text-grey-20';

const getDeliverFee = (v: OrderProductDto) =>
  Math.ceil((v.amount ?? 0) / (v.optionItem?.maxAvailableAmount ?? 1)) * (v.deliverFee ?? 0);

interface Props {
  id: string;
}

interface SectionProductType {
  index: number;
  storeId?: number;
  storeName?: string;
  storeProfile?: string;
  data: OrderProductDto[];
}

/** 장바구니 타입 변경 */
const changeSectionProduct = (value: OrderProductDto[]): SectionProductType[] => {
  let idx = 0;
  const result = value.reduce((acc, cur) => {
    const ownerId = cur.storeId;

    const index = acc.findIndex(v => v.storeId === ownerId);

    if (index === -1) {
      acc.push({
        data: [cur],
        storeId: cur.storeId,
        storeName: cur.storeName,
        storeProfile: cur.storeProfile,
        index: idx,
      });
      idx++;
    } else {
      acc[index].data.push(cur);
    }
    return acc;
  }, [] as SectionProductType[]);
  return result;
};

export function MypageOrderDetail({ id }: Props) {
  const { setAlert } = useAlertStore();

  // const paymentMethod = '카드결제';
  const { data } = useQuery(queryKey.order.detail(id), async () => {
    const res = await (await client()).selectOrder(id);
    if (res.data.isSuccess) {
      return res.data.data;
    } else {
      setAlert({ message: res.data.errorMsg ?? '' });
      throw new Error(res.data.errorMsg);
    }
  });

  const totalProductPrice = data?.productInfos?.map(v => v.price ?? 0).reduce((a, b) => a + b, 0);

  const section = changeSectionProduct(data?.productInfos ?? []);

  const totalDeliverFee = section
    .map(x => {
      const sectionTotal = x.data
        .map(v => (v.price ?? 0) * (v.amount ?? 1))
        .reduce((a, b) => a + b, 0);

      const sectionDeliverFee = x.data.map(v => getDeliverFee(v)).reduce((a, b) => a + b, 0);

      return x.data[0].deliverFeeType === 'FREE'
        ? 0
        : x.data[0].deliverFeeType === 'FIX'
        ? sectionDeliverFee
        : sectionTotal >= (x.data[0].minOrderPrice ?? 0)
        ? 0
        : sectionDeliverFee;
    })
    .reduce((a, b) => a + b, 0);

  const { data: pointData } = useQuery(queryKey.pointRule, async () => {
    const res = await (await client()).selectPointRule();
    if (res.data.isSuccess) {
      return res.data.data;
    } else {
      setAlert({ message: res.data.errorMsg ?? '' });
      throw new Error(res.data.errorMsg);
    }
  });

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
            <span className='text-[14px] font-medium leading-[22px] -tracking-[0.03em] text-grey-10'>
              이름
            </span>
            <span className='text-[14px] leading-[22px] -tracking-[0.03em] text-grey-50'>
              {data?.ordererName ?? ''}
            </span>
            <span className='text-[14px] font-medium leading-[22px] -tracking-[0.03em] text-grey-10'>
              연락처
            </span>
            <span className='text-[14px] leading-[22px] -tracking-[0.03em] text-grey-50'>
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
            <p className='mt-1 text-[14px] font-medium leading-[22px] -tracking-[0.03em] text-grey-70'>
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
                  <p className='line-clamp-1 flex-1'>{data?.productInfos?.[0]?.product?.title}</p>
                  {(data?.productInfos?.length ?? 0) > 1 &&
                    `외 ${(data?.productInfos?.length ?? 0) - 1}건`}
                </div>
                <Image
                  unoptimized
                  src='/assets/icons/common/chevron-mypage.svg'
                  width={24}
                  height={24}
                  alt=''
                  className='rotate-90 group-open:-rotate-90'
                />
              </div>
            </summary>
            <article className='space-y-4 pt-[22px]'>
              {(section ?? []).map((v, idx) => {
                const sectionDeliverFee = v.data
                  .map(x => getDeliverFee(x))
                  .reduce((a, b) => a + b, 0);
                const totalPrice = v.data
                  .map(x => (x.price ?? 0) * (x.amount ?? 1))
                  .reduce((a, b) => a + b, 0);

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
                        <span className='text-[13px] font-medium leading-[20px] -tracking-[0.03em] text-grey-50'>
                          배송비
                        </span>
                        <span className='text-[13px] font-bold leading-[20px] -tracking-[0.03em] text-grey-20'>
                          {v.data[0].deliverFeeType === 'FREE'
                            ? '무료'
                            : v.data[0].deliverFeeType === 'FIX'
                            ? formatToLocaleString(sectionDeliverFee) + '원'
                            : totalPrice >= (v.data[0].minOrderPrice ?? 0)
                            ? '무료'
                            : formatToLocaleString(sectionDeliverFee) + '원'}
                        </span>
                      </div>
                    </div>
                    {v.data.map((x, i) => {
                      return (
                        <div key={i} className='flex items-center gap-2.5 pt-3'>
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
                            <h4 className='text-[14px] font-medium leading-[22px] -tracking-[0.03em] text-grey-10'>
                              {x.product?.title ?? ''}
                            </h4>
                            <div className='flex items-center'>
                              <p className='text-[14px] leading-[22px] -tracking-[0.03em] text-grey-40'>
                                {x.amount ?? 0}개
                              </p>
                              <div className='mx-1.5 h-[14px] w-[1px] bg-[#E2E2E2]' />
                              <p className='text-[14px] leading-[22px] -tracking-[0.03em] text-grey-40'>
                                {x.optionName ?? '기본'}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                    <p className='text-right font-bold leading-[24px] -tracking-[0.03em] text-grey-10'>
                      {formatToLocaleString(totalPrice, { suffix: '원' })}
                    </p>
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
              {formatToLocaleString(data?.totalAmount, { suffix: '원' })}
            </strong>
          </div>
        </div>
        <hr className='border-t-8 border-grey-90' />
        <div className='px-4 py-[22px]'>
          <h3 className={headingClassName}>적립금 혜택</h3>
          <div className='space-y-2.5 py-4'>
            <div className='flex justify-between'>
              <span className={labelClassName}>구매적립</span>
              <div className='text-right'>
                <span className={subValueClassName}>
                  {formatToLocaleString(
                    Math.floor(((data?.totalAmount ?? 0) / 100) * (pointData?.pointRate ?? 1)),
                    { prefix: '', suffix: '원' },
                  )}
                </span>
                <p className='text-[14px] leading-[22px] -tracking-[0.03em] text-grey-60'>
                  {`(${data?.user?.grade?.name ?? ''} 등급 : 구매 적립 ${
                    data?.user?.grade?.pointRate ?? 0
                  }%)`}
                </p>
              </div>
            </div>
            <div className='flex justify-between'>
              <span className={labelClassName}>후기작성</span>
              <span className={subValueClassName}>
                {formatToLocaleString(pointData?.maxReviewPoint, { prefix: '최대 ', suffix: '원' })}
              </span>
            </div>
          </div>
          <hr className='border-grey-90' />
          <div className='flex items-center justify-between pt-[22px]'>
            <h4 className={headingClassName}>적립 금액</h4>
            <strong className='text-[20px] font-bold leading-[30px] -tracking-[0.03em] text-primary-50'>
              {formatToLocaleString(
                Math.floor(((data?.totalAmount ?? 0) / 100) * (pointData?.pointRate ?? 1)) +
                  (pointData?.maxReviewPoint ?? 0),
                { prefix: '최대 ', suffix: '원' },
              )}
            </strong>
          </div>
        </div>
      </section>
    </div>
  );
}
