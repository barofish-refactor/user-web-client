import addDays from 'date-fns/addDays';
import Image from 'next/image';
import Link from 'next/link';
// import Link from 'next/link';
import { type SimpleProductDto } from 'src/api/swagger/data-contracts';
import { ChevronIcon } from 'src/components/icons';
// import { ChevronIcon } from 'src/components/icons';
import { calcDiscountPrice, formatToLocaleString, formatToUtc } from 'src/utils/functions';

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
              <p className='text-[14px] font-medium leading-[22px] -tracking-[0.03em] text-teritory'>{`${
                data?.discountRate ?? 0
              }%`}</p>
              <p className='text-[14px] font-normal leading-[22px] -tracking-[0.03em] text-grey-70 line-through'>{`${formatToLocaleString(
                data?.originPrice,
              )}원`}</p>
            </div>
            <p className='-mt-[5px] text-[20px] font-bold leading-[30px] -tracking-[0.03em] text-black'>{`${formatToLocaleString(
              calcDiscountPrice(data?.originPrice, data?.discountRate),
            )}원`}</p>
          </div>
          {/* <button
            className='flex h-[34px] items-center justify-center rounded-lg border border-grey-80 pl-[11px] pr-[6.5px]'
            onClick={() => {
              //
            }}
          >
            <p className='-mr-0.5 text-[12px] font-bold -tracking-[0.03em] text-grey-60'>
              비교하기
            </p>
            <Image
              src='/assets/icons/common/plus-small.svg'
              alt='plus'
              width={23.5}
              height={23.5}
            />
          </button> */}
        </div>
      </div>
      <div className='h-[1px] bg-grey-90' />
      {/* 배송 정보 */}
      <div className='px-4 pb-6 pt-[22px]'>
        <p className='text-[14px] font-bold leading-[22px] -tracking-[0.03em] text-grey-10'>
          배송정보
        </p>
        <div className='mt-3 flex flex-col gap-3.5'>
          <div className='flex items-center gap-[26px]'>
            <p className='whitespace-pre text-[13px] font-medium leading-[20px] -tracking-[0.03em] text-grey-60'>
              배송안내
            </p>
            <p className='text-[13px] font-medium leading-[20px] -tracking-[0.03em] text-grey-60'>
              {`${data?.deliveryInfo ?? ''}`}
            </p>
          </div>
          <div className='flex items-center gap-[26px]'>
            <p className='whitespace-pre text-[13px] font-medium leading-[20px] -tracking-[0.03em] text-grey-60'>
              발송안내
            </p>
            <p className='text-[13px] font-medium leading-[20px] -tracking-[0.03em] text-grey-60'>
              {`${formatToUtc(addDays(new Date(), data?.expectedDeliverDay ?? 0), 'M/d')} 도착예정`}
            </p>
          </div>
        </div>
      </div>
      <div className='h-2 bg-grey-90' />
      {/* 스토어 */}
      <div className='flex items-center gap-[13px] px-4 pb-7 pt-[21px]'>
        <Image
          src={data?.store?.profileImage ?? '/'}
          alt='store'
          width={40}
          height={40}
          className='mb-[1px] rounded-full'
        />
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
