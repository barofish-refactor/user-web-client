import { type Notice } from 'src/api/swagger/data-contracts';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay } from 'swiper';
import Image from 'next/image';
SwiperCore.use([Autoplay]);

interface Props {
  data: Notice[];
}

const HomeNotice = ({ data }: Props) => {
  return (
    <div className='flex items-start px-[10px] pt-[11px]'>
      <div className='w-[20%] font-bold'>공지사항</div>
      <div className='w-[80%]'>
        <Swiper
          loop
          navigation
          slidesPerView={1}
          modules={[Autoplay]}
          direction='vertical'
          style={{ height: '100px' }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
        >
          {data?.map(item => (
            <SwiperSlide key={item.id}>
              <span className='-tracking-[0.02em]'>{item.title}</span>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <Image
        unoptimized
        src='/assets/icons/common/chevron.svg'
        alt='chevron'
        className='mt-[3px]'
        width={12}
        height={12}
      />
    </div>
  );
};

export default HomeNotice;
