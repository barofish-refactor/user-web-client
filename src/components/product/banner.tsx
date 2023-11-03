import { Fragment, useRef, useState } from 'react';
import { Swiper, type SwiperRef, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Image from 'next/image';

interface Props {
  image: string[];
  isShowArrow?: boolean;
}

/** 상품 상세 - 배너 */
const Banner = ({ image, isShowArrow = false }: Props) => {
  const refSwiper = useRef<SwiperRef>(null);
  const [pageIndex, setPageIndex] = useState<number>(0);

  const blurDataURL =
    'data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg==';
  return (
    <div className='relative'>
      <Swiper
        ref={refSwiper}
        loop
        lazyPreloadPrevNext={image.length < 1 ? image.length : 0}
        spaceBetween={16}
        className=''
        onSlideChange={v => setPageIndex(v.realIndex)}
      >
        {image.map((v, idx) => {
          return (
            <SwiperSlide key={`product${idx}`} className=''>
              <Image
                unoptimized
                priority
                width={375}
                height={375}
                src={v}
                alt='product'
                className='aspect-square w-full object-cover'
                blurDataURL={blurDataURL}
                placeholder='blur'
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
      <div className='absolute bottom-[14px] right-[12px] z-10 flex h-[20px] w-10 items-center justify-center rounded-full bg-grey-10/[.6]'>
        <p className='whitespace-pre text-[14px] font-semibold text-white'>{`${
          image.length === 0 ? 0 : (isNaN(pageIndex) ? 0 : pageIndex) + 1
        } `}</p>
        <p className='text-[14px] font-medium  text-[#DDDDDD]'>{`/ ${image.length}`}</p>
      </div>
      {isShowArrow && image.length > 1 && (
        <Fragment>
          <button
            className='absolute left-4 top-1/2 z-20 -translate-y-1/2'
            onClick={() => refSwiper.current?.swiper.slidePrev()}
          >
            <div className='flex h-9 w-9 items-center justify-center rounded-full bg-black opacity-60'>
              <Image
                unoptimized
                src='/assets/icons/common/chevron-banner.svg'
                alt='상세'
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
                unoptimized
                src='/assets/icons/common/chevron-banner.svg'
                alt='상세'
                width={16}
                height={16}
              />
            </div>
          </button>
        </Fragment>
      )}
    </div>
  );
};

export default Banner;
