import { ProductSmallSlideItem } from 'src/components/common';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { FreeMode } from 'swiper';
import cm from 'src/utils/class-merge';

interface Props {
  data?: any[];
  className?: string;
}

/** 홈화면 - 큐레이션 (슬라이드 - 소) */
const CurationSmallSlide = ({ className }: Props) => {
  return (
    <Swiper
      freeMode
      slidesPerView={2.5}
      modules={[FreeMode]}
      spaceBetween={11}
      className={cm('mt-5', className)}
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
            <ProductSmallSlideItem type='SMALL' />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default CurationSmallSlide;
