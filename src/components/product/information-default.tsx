import Image from 'next/image';
import Link from 'next/link';
import { ChevronIcon } from 'src/components/icons';
import { formatToLocaleString } from 'src/utils/functions';

interface Props {
  data?: any;
}

/** 상품 상세 - 기본 정보 */
const InformationDefault = ({}: Props) => {
  return (
    <div className=''>
      <div className='px-4 pb-5 pt-[15px]'>
        <p className='text-[13px] font-medium leading-[20px] -tracking-[0.03em] text-grey-60'>{`선어>갈치`}</p>
        <p className='text-[16px] font-medium leading-[24px] -tracking-[0.03em] text-grey-10'>
          [3차 세척, 스킨포장] 목포 손질 먹갈치 400~650g
        </p>
        <p className='mt-[5px] text-[13px] font-normal leading-[20px] -tracking-[0.03em] text-grey-50 underline underline-offset-[3px]'>
          {`${formatToLocaleString(4923)}개의 후기`}
        </p>
        <div className='mt-3 flex items-center justify-between'>
          <div>
            <div className='flex items-center gap-0.5'>
              <p className='text-[14px] font-medium leading-[22px] -tracking-[0.03em] text-teritory'>{`${20}%`}</p>
              <p className='text-[14px] font-normal leading-[22px] -tracking-[0.03em] text-grey-70 line-through'>{`${formatToLocaleString(
                30000,
              )}원`}</p>
            </div>
            <p className='-mt-[5px] text-[20px] font-bold leading-[30px] -tracking-[0.03em] text-black'>{`${formatToLocaleString(
              24000,
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
            <p className='text-[13px] font-medium leading-[20px] -tracking-[0.03em] text-grey-60'>
              배송안내
            </p>
            <p className='text-[13px] font-medium leading-[20px] -tracking-[0.03em] text-grey-60'>
              배송비 3,000원 (제주 및 산간 도서 지방 배송 불가)
            </p>
          </div>
          <div className='flex items-center gap-[26px]'>
            <p className='text-[13px] font-medium leading-[20px] -tracking-[0.03em] text-grey-60'>
              발송안내
            </p>
            <p className='text-[13px] font-medium leading-[20px] -tracking-[0.03em] text-grey-60'>
              모레(토) 3/4 도착예정
            </p>
          </div>
        </div>
      </div>
      <div className='h-2 bg-grey-90' />
      {/* 스토어 */}
      <div className='flex items-center gap-[13px] px-4 pb-7 pt-[21px]'>
        <Image
          src='/dummy/dummy-store-1.png'
          alt='store'
          width={40}
          height={40}
          className='mb-[1px] rounded-full'
        />
        <div className='flex-1 flex-col gap-1'>
          <p className='text-[14px] font-bold leading-[22px] -tracking-[0.03em] text-grey-10'>
            서준수산
          </p>
          <div className='flex items-center gap-[5px]'>
            <p className='text-[12px] font-medium leading-[18px] -tracking-[0.03em] text-grey-60'>
              전라남도 목포
            </p>
            <div className='h-[11px] w-[1px] bg-grey-80' />
            <p className='text-[12px] font-medium leading-[18px] -tracking-[0.03em] text-grey-60'>{`후기 개수 ${formatToLocaleString(
              555,
            )}`}</p>
          </div>
        </div>
        <Link href={{ pathname: '/store/detail', query: { id: 1 } }}>
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
