import Image from 'next/image';
import Link from 'next/link';
import { FreeMode } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

/** 홈화면 - 큐레이션 (약어) */
const CurationAbbreviation = () => {
  return (
    <Swiper
      freeMode
      modules={[FreeMode]}
      spaceBetween={10}
      slidesPerView='auto'
      className='my-1'
      style={{ padding: '16px' }}
    >
      {[
        '해산물꿀팁',
        '밥도둑',
        '구이용',
        '혼술용',
        '간편하게',
        '해산물꿀팁',
        '밥도둑',
        '구이용',
        '혼술용',
        '간편하게',
      ].map((v, idx) => {
        const image = `/dummy/dummy-curation-${(idx % 4) + 1}.png`;
        return (
          <SwiperSlide key={`mainTab${idx}`} className='' style={{ width: '70px' }}>
            <Link
              href={{ pathname: '/search/product-result', query: { title: v } }}
              className='flex h-[95px] w-[70px] flex-col items-center justify-between'
            >
              <div className='h-[70px] w-[70px] rounded-full bg-primary-90'>
                <Image src={image} alt={v} width={70} height={70} />
              </div>
              <p className='text-[13px] font-medium leading-[20px] -tracking-[3%] text-grey-20'>
                {v}
              </p>
            </Link>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default CurationAbbreviation;
