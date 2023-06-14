import Image from 'next/image';
import { FreeMode } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import { type ReviewDto } from 'src/api/swagger/data-contracts';
import { ReviewDots } from 'src/components/review';
import { calcDiscountPrice, formatToLocaleString, formatToUtc } from 'src/utils/functions';

import 'swiper/css';
import { useRouter } from 'next/router';

/* 
  TODO 신고하기 페이지 작업 필요
*/

interface Props {
  data: ReviewDto;
  isMine?: boolean;
}

/** 구매후기 */
export function ReviewItem({ data, isMine }: Props) {
  const router = useRouter();

  return (
    <div className='py-4'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-1'>
          <p className='text-[14px] font-semibold leading-[22px] -tracking-[0.03em] text-grey-10'>
            닉네임
          </p>
          <div className='flex h-[22px] items-center justify-center rounded border border-[#6085EC] px-2'>
            <p className='text-[12px] font-medium -tracking-[0.03em] text-primary-50'>멸치</p>
          </div>
        </div>
        {isMine ? (
          <ReviewDots />
        ) : (
          <button className='text-[13px] font-medium leading-[20px] -tracking-[0.03em] text-grey-70'>
            신고하기
          </button>
        )}
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
        {(data.images ?? []).map((v, idx) => {
          return (
            <SwiperSlide key={`curation${idx}`} className=''>
              <div className='relative aspect-square w-full overflow-hidden rounded-lg'>
                <Image fill src={v} alt='review' draggable={false} />
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
      <p className='mt-3 text-[14px] font-normal leading-[22px] -tracking-[0.03em] text-grey-50'>
        {data.content ?? ''}
      </p>
      <button
        className='my-[18px] flex w-full items-center gap-[13px] rounded-lg bg-grey-90 p-2'
        onClick={() => {
          router.push({ pathname: '/product', query: { id: data.simpleProduct?.id } });
        }}
      >
        <Image
          src={data.simpleProduct?.image ?? ''}
          alt='product'
          className='rounded-lg'
          width={72}
          height={72}
        />
        <div className='flex flex-1 flex-col truncate text-start'>
          <p className='text-[13px] font-bold leading-[16px] -tracking-[0.05em] text-grey-10'>
            {data.store?.name ?? ''}
          </p>
          <p className='mt-0.5 truncate text-[13px] font-medium leading-[20px] -tracking-[0.05em] text-grey-30'>
            {data.simpleProduct?.title ?? ''}
          </p>
          <div className='flex items-center gap-0.5'>
            <p className='text-[16px] font-semibold leading-[19px] -tracking-[0.05em] text-teritory'>{`${
              data.simpleProduct?.discountRate ?? 0
            }%`}</p>
            <p className='text-[16px] font-bold leading-[22px] -tracking-[0.05em] text-grey-10'>{`${formatToLocaleString(
              calcDiscountPrice(data.simpleProduct?.originPrice, data.simpleProduct?.discountRate),
            )}원`}</p>
          </div>
        </div>
      </button>
      <div className='flex items-center justify-between'>
        <p className='text-[12px] font-medium leading-[18px] -tracking-[0.03em] text-grey-70'>{`${formatToUtc(
          data.createdAt,
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
            0,
          )}`}</p>
        </button>
      </div>

      <div className='mt-[15px] h-[1px] bg-[#F2F2F2]' />
    </div>
  );
}
