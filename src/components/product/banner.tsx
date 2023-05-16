import { Fragment, useRef, useState } from 'react';
import { Swiper, type SwiperRef, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Image from 'next/image';

const maxLength = 4;

interface Props {
  image?: {
    origin: string;
  };
  isShowArrow?: boolean;
}

/** 상품 상세 - 배너 */
const Banner = ({ isShowArrow = false }: Props) => {
  const refSwiper = useRef<SwiperRef>(null);
  const [pageIndex, setPageIndex] = useState<number>(0);

  return (
    <div className='relative'>
      <Swiper
        ref={refSwiper}
        loop
        spaceBetween={16}
        className=''
        onSlideChange={v => setPageIndex(v.realIndex)}
      >
        {[...Array(maxLength)].map((v, idx) => {
          return (
            <SwiperSlide key={`product${idx}`} className='aspect-square w-full'>
              <Image
                fill
                priority
                src='/dummy/dummy-product-detail-1.png'
                alt='product'
                className=''
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
      <div className='absolute bottom-[14px] right-[12px] z-10 flex h-[20px] items-center justify-center rounded-full bg-black/[.3] px-[9px]'>
        <p className='whitespace-pre text-[12px] font-semibold tabular-nums tracking-[15%] text-white'>{`${
          pageIndex + 1
        } `}</p>
        <p className='text-[12px] font-medium tabular-nums tracking-[15%] text-[#DDDDDD]'>
          {`/ ${maxLength}`}
        </p>
      </div>
      {isShowArrow && (
        <Fragment>
          <button
            className='absolute left-4 top-1/2 z-20 -translate-y-1/2'
            onClick={() => refSwiper.current?.swiper.slidePrev()}
          >
            <div className='flex h-9 w-9 items-center justify-center rounded-full bg-black opacity-60'>
              <Image
                src='/assets/icons/common//chevron-banner.svg'
                alt=''
                width={16}
                height={16}
                className='rotate-180'
              />
            </div>
          </button>
          <button
            className='absolute right-4 top-1/2 z-20 -translate-y-1/2'
            onClick={() => refSwiper.current?.swiper.slideNext()}
          >
            <div className='flex h-9 w-9 items-center justify-center rounded-full bg-black opacity-60'>
              <Image
                src='/assets/icons/common/chevron-banner.svg'
                alt=''
                width={16}
                height={16}
                className=''
              />
            </div>
          </button>
        </Fragment>
      )}
    </div>
  );
};

export default Banner;
