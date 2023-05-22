import { ProductSmallSlideItem } from 'src/components/common';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { FreeMode } from 'swiper';

interface Props {
  data?: any[];
}

/** 홈화면 - 큐레이션 (슬라이드 - 대) */
const CurationLargeSlide = ({}: Props) => {
  return (
    <Swiper
      freeMode
      slidesPerView={1.3}
      modules={[FreeMode]}
      spaceBetween={11}
      className='mt-5'
      style={{
        marginLeft: '-16px',
        marginRight: '-16px',
        paddingLeft: '16px',
        paddingRight: '16px',
      }}
    >
      {[...Array(10)].map((v, idx) => {
        return (
          <SwiperSlide key={`curation${idx}`} className=''>
            <ProductSmallSlideItem type='LARGE' />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default CurationLargeSlide;
