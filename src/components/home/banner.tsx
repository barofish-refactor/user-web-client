import { useState } from 'react';
import { Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Image from 'next/image';
import { Banner } from 'src/api/swagger/data-contracts';

interface Props {
  data: Banner[];
}

/** 홈화면 - 배너 */
const Banner = ({ data }: Props) => {
  const [pageIndex, setPageIndex] = useState<number>(0);

  return (
    <div className='relative'>
      <Swiper
        loop
        modules={[Autoplay]}
        spaceBetween={16}
        className='aspect-[375/208]'
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        onSlideChange={v => setPageIndex(v.realIndex)}
      >
        {data.map((v, idx) => {
          return (
            <SwiperSlide key={`banner_${idx}`} className='aspect-[375/208] w-full'>
              <Image fill priority src={v.image ?? ''} alt='banner' className='object-cover' />
            </SwiperSlide>
          );
        })}
      </Swiper>
      <div className='absolute bottom-[14px] right-[12px] z-10 flex h-[19.71px] w-[41px] items-center justify-center rounded-full bg-black/[.3] backdrop-blur-[5px]'>
        <p className='whitespace-pre text-[12px] font-semibold tabular-nums text-white'>{`${
          pageIndex + 1
        } `}</p>
        <p className='text-[12px] font-medium tabular-nums text-[#DDDDDD]'>{`/ ${data.length}`}</p>
      </div>
    </div>
  );
};

export default Banner;
