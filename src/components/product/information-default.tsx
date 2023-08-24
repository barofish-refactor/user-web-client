import Image from 'next/image';
import Link from 'next/link';
import { Fragment } from 'react';
import { type SimpleProductDto } from 'src/api/swagger/data-contracts';
import { ChevronIcon } from 'src/components/icons';
import { calcDiscountRate, formatToLocaleString, setDeliverDate } from 'src/utils/functions';

interface Props {
  data?: SimpleProductDto;
}

/** 상품 상세 - 기본 정보 */
const InformationDefault = ({ data }: Props) => {
  return (
    <div className=''>
      <div className='px-4 pb-5 pt-[15px]'>
        <p className='text-[13px] font-medium leading-[20px] -tracking-[0.03em] text-grey-60'>{`${data?.category?.parentCategoryName}>${data?.category?.name}`}</p>
        <p className='text-[16px] font-medium leading-[24px] -tracking-[0.03em] text-grey-10'>
          {data?.title}
        </p>
        <p className='mt-[5px] text-[13px] font-normal leading-[20px] -tracking-[0.03em] text-grey-50 underline underline-offset-[3px]'>
          {`${formatToLocaleString((data?.reviews ?? []).length)}개의 후기`}
        </p>
        <div className='mt-3 flex items-center justify-between'>
          <div>
            <div className='flex items-center gap-0.5'>
              {(data?.originPrice ?? 0) !== 0 && (
                <Fragment>
                  <p className='text-[14px] font-medium leading-[22px] -tracking-[0.03em] text-teritory'>{`${calcDiscountRate(
                    data?.originPrice,
                    data?.discountPrice,
                  )}%`}</p>
                  <p className='text-[14px] font-normal leading-[22px] -tracking-[0.03em] text-grey-70 line-through'>{`${formatToLocaleString(
                    data?.originPrice,
                  )}원`}</p>
                </Fragment>
              )}
            </div>
            <p className='-mt-[5px] text-[20px] font-bold leading-[30px] -tracking-[0.03em] text-black'>{`${formatToLocaleString(
              data?.discountPrice,
            )}원`}</p>
          </div>
        </div>
      </div>
      <div className='h-[1px] bg-grey-90' />
      {/* 배송 정보 */}
      <div className='px-4 pb-6 pt-[22px]'>
        <p className='text-[14px] font-bold leading-[22px] -tracking-[0.03em] text-grey-10'>
          배송정보
        </p>
        <div className='mt-3 flex flex-col gap-3.5'>
          <div className='flex items-start'>
            <p className='w-[70px] whitespace-pre text-[13px] font-medium leading-[20px] -tracking-[0.03em] text-grey-60'>
              배송안내
            </p>
            <p className='flex-1 text-[13px] font-medium leading-[20px] -tracking-[0.03em] text-grey-60'>
              {`${data?.deliveryInfo ?? ''}`}
            </p>
          </div>
          <div className='flex items-start'>
            <p className='w-[70px] whitespace-pre text-[13px] font-medium leading-[20px] -tracking-[0.03em] text-grey-60'>
              발송안내
            </p>
            <p className='flex-1 text-[13px] font-medium leading-[20px] -tracking-[0.03em] text-grey-60'>
              {`${setDeliverDate(1)} 도착예정`}
            </p>
          </div>
          <div className='flex items-start'>
            <p className='w-[70px] whitespace-pre text-[13px] font-medium leading-[20px] -tracking-[0.03em] text-grey-60'>
              배송비
            </p>
            <p className='flex-1 whitespace-pre text-[13px] font-medium leading-[20px] -tracking-[0.03em] text-grey-60'>
              {`${
                data?.store?.deliverFeeType === 'FREE'
                  ? '무료'
                  : data?.store?.deliverFeeType === 'FIX'
                  ? formatToLocaleString(data.store.deliverFee, { suffix: '원' })
                  : formatToLocaleString(data?.store?.deliverFee, { suffix: '원 (' }) +
                    formatToLocaleString(data?.store?.minOrderPrice) +
                    '원 이상 구매 시 무료)'
              }`}
              {data?.deliverBoxPerAmount
                ? `\n1박스에 최대 ${data.deliverBoxPerAmount}개 까지 가능합니다.`
                : ''}
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
          <p className='text-[14px] font-bold leading-[22px] -tracking-[0.03em] text-grey-10'>
            {data?.store?.name ?? ''}
          </p>
          <div className='flex items-center gap-[5px]'>
            <p className='text-[12px] font-medium leading-[18px] -tracking-[0.03em] text-grey-60'>
              {data?.store?.location ?? ''}
            </p>
            <div className='h-[11px] w-[1px] bg-grey-80' />
            <p className='text-[12px] font-medium leading-[18px] -tracking-[0.03em] text-grey-60'>{`후기 개수 ${formatToLocaleString(
              0,
            )}`}</p>
          </div>
        </div>
        <Link href={{ pathname: '/store/detail', query: { id: data?.store?.storeId } }}>
          <div className='flex h-[34px] items-center justify-center rounded-lg bg-primary-90 px-2'>
            <p className='text-[12px] font-bold -tracking-[0.03em] text-primary-70'>스토어 보기</p>
            <ChevronIcon className='rotate-180' width={18} height={18} />
          </div>
        </Link>
      </div>
      <div className='h-2 bg-grey-90' />
    </div>
  );
};

export default InformationDefault;
