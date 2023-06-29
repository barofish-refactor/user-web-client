import Image from 'next/image';
import Link from 'next/link';
import { type Curation } from 'src/api/swagger/data-contracts';
import { FreeMode } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

interface Props {
  data: Curation[];
}

/** 홈화면 - 큐레이션 (약어) */
const CurationAbbreviation = ({ data }: Props) => {
  return (
    <Swiper
      freeMode
      modules={[FreeMode]}
      // spaceBetween={10}
      slidesPerView='auto'
      className='my-1'
      style={{ padding: '16px' }}
    >
      {data.map((v, idx) => {
        return (
          <SwiperSlide key={`mainTab${idx}`} className='mr-2.5 !w-[70px] last-of-type:mr-0'>
            <Link
              className='flex h-[95px] w-[70px] flex-col items-center justify-between'
              href={
                v.id !== -2
                  ? {
                      pathname: '/search/product-result',
                      query: { type: 'curation', id: v.id, title: v.title },
                    }
                  : {
                      pathname: '/tip',
                    }
              }
            >
              <div className='h-[70px] w-[70px] overflow-hidden rounded-full bg-primary-90'>
                <Image
                  src={v.image ?? ''}
                  alt={v.shortName ?? ''}
                  width={70}
                  height={70}
                  className='object-cover'
                />
              </div>
              <p className='line-clamp-1 w-full text-center text-[13px] font-medium leading-[20px] -tracking-[0.03em] text-grey-20'>
                {v.shortName ?? ''}
              </p>
            </Link>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default CurationAbbreviation;
