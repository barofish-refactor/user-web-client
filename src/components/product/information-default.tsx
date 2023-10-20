import Image from 'next/image';
import Link from 'next/link';
import { Fragment, useEffect, useState } from 'react';
import { type UserInfoDto, type SimpleProductDto } from 'src/api/swagger/data-contracts';
import { ChevronIcon } from 'src/components/icons';
import { calcDiscountRate, formatToLocaleString, setDeliverDate } from 'src/utils/functions';

interface Props {
  data?: SimpleProductDto;
  user: UserInfoDto | undefined;
}

/** 상품 상세 - 기본 정보 */
const InformationDefault = ({ data, user }: Props) => {
  const [point, setPoint] = useState<number>(0);

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

  return (
    <div className=''>
      <div className='px-4 pb-5 pt-[15px]'>
        <p className='text-[15px] font-medium leading-[20px] -tracking-[0.03em] text-grey-60'>{`${data?.category?.parentCategoryName}>${data?.category?.name}`}</p>
        <p className='text-[18px] font-medium leading-[24px] -tracking-[0.03em] text-grey-10'>
          {data?.title}
        </p>
        <p className='mt-[5px] text-[15px] font-normal leading-[20px] -tracking-[0.03em] text-grey-50 underline underline-offset-[3px]'>
          {`${formatToLocaleString((data?.reviews ?? []).length)}개의 후기`}
        </p>
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
              {`${setDeliverDate(1)} 도착예정`}
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
                    formatToLocaleString(data?.minOrderPrice) +
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
          <p className='text-[16px] font-bold leading-[22px] -tracking-[0.03em] text-grey-10'>
            {data?.store?.name ?? ''}
          </p>
          <div className='flex items-center gap-[5px]'>
            <p className='text-[14px] font-medium leading-[18px] -tracking-[0.03em] text-grey-60'>
              {data?.store?.location ?? ''}
            </p>
            <div className='h-[11px] w-[1px] bg-grey-80' />
            <p className='text-[14px] font-medium leading-[18px] -tracking-[0.03em] text-grey-60'>{`후기 개수 ${formatToLocaleString(
              0,
            )}`}</p>
          </div>
        </div>
        <Link href={{ pathname: '/store/detail', query: { id: data?.store?.storeId } }}>
          <div className='flex h-[34px] items-center justify-center rounded-lg bg-primary-90 px-2'>
            <p className='text-[14px] font-bold -tracking-[0.03em] text-primary-70'>스토어 보기</p>
            <ChevronIcon className='rotate-180' width={18} height={18} />
          </div>
        </Link>
      </div>
      <div className='h-2 bg-grey-90' />
    </div>
  );
};

export default InformationDefault;
