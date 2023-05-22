import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { FreeMode } from 'swiper';
import Image from 'next/image';
import { formatToLocaleString, formatToUtc } from 'src/utils/functions';

interface Props {
  data?: any;
}

/** 구매후기 */
const ReviewItem = ({}: Props) => {
  return (
    <div className='py-4'>
      <div className='flex items-center gap-1'>
        <p className='text-[14px] font-semibold leading-[22px] -tracking-[0.03em] text-grey-10'>
          닉네임
        </p>
        <div className='flex h-[22px] items-center justify-center rounded border border-[#6085EC] px-2'>
          <p className='text-[12px] font-medium -tracking-[0.03em] text-primary-50'>멸치</p>
        </div>
      </div>
      <p className='mt-[7px] truncate text-[14px] font-normal leading-[22px] -tracking-[0.03em] text-grey-60'>
        {`옵션 : ${'TextTextTextTextTextTextTextTextTextTextTextTextTextText'}`}
      </p>
      <Swiper
        freeMode
        slidesPerView={2.2}
        modules={[FreeMode]}
        spaceBetween={11}
        className='mt-4'
        style={{
          marginLeft: '-16px',
          marginRight: '-16px',
          paddingLeft: '16px',
          paddingRight: '16px',
        }}
      >
        {[...Array(10)].map((v, idx) => {
          const list = [
            '/dummy/dummy-review-1.png',
            '/dummy/dummy-review-2.png',
            '/dummy/dummy-review-3.png',
          ];
          const dummy = list[idx % 3];
          return (
            <SwiperSlide key={`curation${idx}`} className=''>
              <div className='relative aspect-square w-full overflow-hidden rounded-lg'>
                <Image fill src={dummy} alt='review' draggable={false} />
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
      <p className='mt-3 text-[14px] font-normal leading-[22px] -tracking-[0.03em] text-grey-50'>
        TextTextTextTextTextTextTextTextTextTextTextText
        TextTextTextTextTextTextTextTextTextTextTextTextText TextTextTextTextTextTextTextTextText
      </p>
      <button
        className='my-[18px] flex w-full items-center gap-[13px] rounded-lg bg-grey-90 p-2'
        onClick={() => {
          //
        }}
      >
        <Image
          src='/dummy/dummy-product-detail-1.png'
          alt='product'
          className='rounded-lg'
          width={72}
          height={72}
        />
        <div className='flex flex-1 flex-col truncate text-start'>
          <p className='text-[13px] font-bold leading-[16px] -tracking-[0.05em] text-grey-10'>
            서준수산
          </p>
          <p className='mt-0.5 truncate text-[13px] font-medium leading-[20px] -tracking-[0.05em] text-grey-30'>
            [3차 세척,스킨포장] 목포 손질 먹갈치 400~650g
          </p>
          <div className='flex items-center gap-0.5'>
            <p className='text-[16px] font-semibold leading-[19px] -tracking-[0.05em] text-teritory'>{`${40}%`}</p>
            <p className='text-[16px] font-bold leading-[22px] -tracking-[0.05em] text-grey-10'>{`${formatToLocaleString(
              9600,
            )}원`}</p>
          </div>
        </div>
      </button>
      <div className='flex items-center justify-between'>
        <p className='text-[12px] font-medium leading-[18px] -tracking-[0.03em] text-grey-70'>{`${formatToUtc(
          new Date(),
          'yyyy.MM.dd',
        )}`}</p>
        <button
          className='flex h-8 items-center gap-1.5 rounded-full border border-grey-80 px-3.5'
          onClick={() => {
            //
          }}
        >
          <Image src='/assets/icons/product/review-like.svg' alt='like' width={12} height={13} />
          <p className='text-[12px] font-medium -tracking-[0.05em] text-grey-60'>도움돼요</p>
          <p className='text-[12px] font-medium -tracking-[0.05em] text-grey-60'>{`${formatToLocaleString(
            500,
          )}`}</p>
        </button>
      </div>

      <div className='mt-[15px] h-[1px] bg-[#F2F2F2]' />
    </div>
  );
};

export default ReviewItem;
