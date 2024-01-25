import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Fragment, useEffect, useState } from 'react';
import { client } from 'src/api/client';
import { type UserInfoDto, type SimpleProductDto } from 'src/api/swagger/data-contracts';
import { ChevronIcon } from 'src/components/icons';
import { queryKey } from 'src/query-key';
import { calcDiscountRate, formatToLocaleString, setDeliverDate } from 'src/utils/functions';

interface Props {
  data?: SimpleProductDto;
  user: UserInfoDto | undefined;
  setSelectedTab: (value: number) => void;
  isTasting?: any;
}

/** 상품 상세 - 기본 정보 */
const InformationDefault = ({ data, user, setSelectedTab, isTasting }: Props) => {
  const [point, setPoint] = useState<number>(0);
  const router = useRouter();
  const { id } = router.query;
  useEffect(() => {
    if (data?.discountPrice && data?.pointRate) {
      // 데이터 확인
      if (user && user.grade?.pointRate) {
        // 유저 확인
        const userDataPoint =
          Math.round(
            Math.floor(Math.max(data?.discountPrice, 0) * (user?.grade?.pointRate ?? 1)) / 10,
          ) *
            10 +
          Math.floor(data?.discountPrice * data?.pointRate);

        setPoint(userDataPoint);
      } else {
        // 유저가 아니라면
        const dataPoint = Math.floor(data?.discountPrice * data?.pointRate);
        setPoint(dataPoint);
      }
    }
  }, [data?.discountPrice, data?.pointRate, user]);
  const { data: deliver, refetch } = useQuery<any>([`${queryKey.deliverInfoDate}`], async () => {
    const res = await (await client()).getExpectedArrivalDate(data?.id as number);
    if (res.data.isSuccess) {
      return res.data.data;
    } else {
      throw new Error(res.data.code + ': ' + res.data.errorMsg);
    }
  });

  const [timer, setTimer] = useState('');
  // 시간 계산
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const deliverData = () => {
    const now = new Date();
    const hours = now.getHours();
    const minute = now.getMinutes();
    const second = now.getSeconds();

    const valueHour = Number(data?.forwardingTime) - hours - 1;
    const valueMinute = 60 - minute;
    const valueSecond = 60 - second;
    const setMinute = valueMinute < 10 ? '0' + valueMinute.toString() : valueMinute;
    const setSecond = valueSecond < 10 ? '0' + valueSecond.toString() : valueSecond;
    const valueLast = valueHour + `:` + setMinute + ':' + setSecond;
    if (Number(valueHour) < 0) {
      return refetch();
    }
    setTimer(valueLast);
  };

  useEffect(() => {
    if (!deliver) return;
    if (deliver?.calculatedExpectedArrivalDate > 1) return;
    const timer = setTimeout(() => {
      deliverData();
    }, 1000);

    return () => clearTimeout(timer);
  }, [deliver, deliverData, timer]);

  // onClick={() => {
  //   setSelectedTab(1);
  //   if (isTasting.length > 0) {
  //     window.scrollTo({ top: 810, left: 0, behavior: 'auto' });
  //   } else {
  //     window.scrollTo({ top: 1300, left: 0, behavior: 'auto' });
  //   }
  //   sessionStorage.setItem(
  //     'productView',
  //     JSON.stringify({
  //       id,
  //       tabId: 1,
  //     }),
  //   );
  // }}
  return (
    <Fragment>
      <div className='px-4 pb-5 pt-[15px]'>
        <p className='text-[15px] font-medium leading-[20px] -tracking-[0.03em] text-grey-60'>{`${data?.category?.parentCategoryName}>${data?.category?.name}`}</p>
        <p className='text-[18px] font-medium leading-[24px] -tracking-[0.03em] text-grey-10'>
          {data?.title}
        </p>
        {/* <p className='mt-[5px] text-[15px] font-normal leading-[20px] -tracking-[0.03em] text-grey-50 underline underline-offset-[3px]'>
          {`${formatToLocaleString(data?.reviewCount)}개의 후기`}
        </p> */}
        <div className='mt-3 flex items-center justify-between'>
          <div>
            <div className='flex items-center gap-0.5'>
              {(data?.originPrice ?? 0) !== 0 && (
                <Fragment>
                  <p className='text-[16px] font-medium leading-[22px] -tracking-[0.03em] text-teritory'>{`${calcDiscountRate(
                    data?.originPrice,
                    data?.discountPrice,
                  )}%`}</p>
                  <p className='text-[16px] font-normal leading-[22px] -tracking-[0.03em] text-grey-70 line-through'>{`${formatToLocaleString(
                    data?.originPrice,
                  )}원`}</p>
                </Fragment>
              )}
            </div>
            <p className='-mt-[5px] text-[22px] font-bold leading-[30px] -tracking-[0.03em] text-black'>{`${formatToLocaleString(
              data?.discountPrice,
            )}원`}</p>
            <p className='-mt-[5px] text-[17px] font-bold leading-[30px] -tracking-[0.03em] text-grey-70'>{`${formatToLocaleString(
              point,
            )}원 적립`}</p>
          </div>
        </div>
      </div>
      <div className='h-[1px] bg-grey-90' />
      {/* 배송 정보 */}
      <div className='px-4 pb-6 pt-[22px]'>
        <p className='text-[16px] font-bold leading-[22px] -tracking-[0.03em] text-grey-10'>
          배송정보
        </p>
        <div className='mt-3 flex flex-col gap-3.5'>
          <div className='flex items-start'>
            <p className='w-[70px] whitespace-pre text-[15px] font-medium leading-[20px] -tracking-[0.03em] text-grey-60'>
              배송안내
            </p>
            <p className='flex-1 text-[15px] font-medium leading-[20px] -tracking-[0.03em] text-grey-60'>
              {`${data?.deliveryInfo ?? ''}`}
            </p>
          </div>
          <div className='flex items-start'>
            <p className='w-[70px] whitespace-pre text-[15px] font-medium leading-[20px] -tracking-[0.03em] text-grey-60'>
              발송안내
            </p>
            <p className='flex-1 text-[15px] font-medium leading-[20px] -tracking-[0.03em] text-grey-60'>
              {deliver &&
              deliver.productExpectedArrivalDate <= 1 &&
              deliver.calculatedExpectedArrivalDate === 1
                ? `${timer} 이내 주문시 ${setDeliverDate(
                    deliver.calculatedExpectedArrivalDate,
                  )} 도착예정`
                : deliver && deliver.productExpectedArrivalDate <= 1
                ? `${setDeliverDate(deliver.calculatedExpectedArrivalDate)} 도착예정`
                : deliver &&
                  `${setDeliverDate(
                    deliver?.productExpectedArrivalDate,
                  )}  이내 발송 예정 (일요일, 공휴일 제외)`}
              {/* {data?.expectedDeliverDay && `${setDeliverDate(data.expectedDeliverDay)} 도착예정`} */}
            </p>
          </div>
          <div className='flex items-start'>
            <p className='w-[70px] whitespace-pre text-[15px] font-medium leading-[20px] -tracking-[0.03em] text-grey-60'>
              배송비
            </p>
            <p className='flex-1 whitespace-pre text-[15px] font-medium leading-[20px] -tracking-[0.03em] text-grey-60'>
              {`${
                data?.deliverFeeType === 'FREE'
                  ? '무료'
                  : data?.deliverFeeType === 'FIX'
                  ? formatToLocaleString(data?.deliveryFee, { suffix: '원' })
                  : formatToLocaleString(data?.deliveryFee, { suffix: '원 (' }) +
                    formatToLocaleString(
                      data?.minStorePrice ? data?.minStorePrice : data?.minOrderPrice,
                    ) +
                    '원 이상 구매 시 무료)'
              }`}
            </p>
          </div>
        </div>
      </div>
      <div className='h-2 bg-grey-90' />
      {/* 스토어 */}
      <div className='flex items-center gap-[13px] px-4 pb-7 pt-[21px]'>
        {data?.store?.profileImage && (
          <Image
            unoptimized
            blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8XQ8AAnsBfKyAV94AAAAASUVORK5CYII='
            placeholder='blur'
            src={data?.store?.profileImage}
            alt='store'
            draggable={false}
            width={40}
            height={40}
            className='mb-[1px] rounded-full object-cover'
            style={{ width: '40px', height: '40px' }}
          />
        )}
        <div className='flex-1 flex-col gap-1'>
          <p className='text-[18px] font-bold leading-[22px] -tracking-[0.03em] text-grey-10'>
            {data?.store?.name ?? ''}
          </p>
          <div className='flex items-center gap-[5px]'>
            <p className='text-[16px] font-medium leading-[18px] -tracking-[0.03em] text-grey-60'>
              {data?.store?.location ?? ''}
            </p>
            <div className='h-[11px] w-[1px] bg-grey-80' />
            <p className='text-[16px] font-medium leading-[18px] -tracking-[0.03em] text-grey-60'>{`후기 개수 ${formatToLocaleString(
              data?.store?.reviewCount,
            )}`}</p>
          </div>
        </div>
        <Link href={{ pathname: '/store/detail', query: { id: data?.store?.storeId } }}>
          <div className='flex h-[34px] items-center justify-center rounded-lg bg-primary-90 px-2'>
            <p className='text-[15px] font-bold -tracking-[0.03em] text-primary-70'>스토어 보기</p>
            <ChevronIcon className='rotate-180' width={18} height={18} />
          </div>
        </Link>
      </div>
      {/* <div className='h-2 bg-grey-90' /> */}
    </Fragment>
  );
};

export default InformationDefault;
