import { useState } from 'react';
import { Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Image from 'next/image';

const maxLength = 4;

/** 홈화면 - 배너 */
const Banner = () => {
  const [pageIndex, setPageIndex] = useState<number>(0);

  return (
    <div className='relative'>
      <Swiper
        loop
        modules={[Autoplay]}
        spaceBetween={16}
        className=''
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        onSlideChange={v => setPageIndex(v.realIndex)}
      >
        {[...Array(maxLength)].map((v, idx) => {
          return (
            <SwiperSlide key={`banner_${idx}`} className='aspect-[375/208] w-full'>
              <Image fill priority src='/dummy/dummy-banner-1.png' alt='banner' className='' />
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
    </div>
  );
};

export default Banner;
