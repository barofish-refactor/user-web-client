import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { FreeMode } from 'swiper';

interface Props {
  //
}

/** 홈화면 - 알아두면 좋은 정보 */
const CurationTip = ({}: Props) => {
  return (
    <div className='px-4 py-[30px]'>
      <div className='flex items-center justify-between'>
        <p className='line-clamp-1 text-[20px] font-bold leading-[30px] -tracking-[3%] text-grey-10'>
          알아두면 좋은 정보 💡
        </p>
        <Link href='/' className=''>
          <div className='flex h-[30px] items-center gap-1'>
            <p className='whitespace-nowrap text-[14px] font-medium leading-[22px] -tracking-[3%] text-grey-50'>
              전체보기
            </p>
            <Image src='/assets/icons/common/chevron.svg' alt='chevron' width={12} height={12} />
          </div>
        </Link>
      </div>
      <p className='text-[14px] font-normal leading-[22px] -tracking-[3%] text-grey-60'>
        어디가서 잘 들을 수 없는 정보, 여기에 모두 담았어요!
      </p>
      <Swiper
        freeMode
        slidesPerView={1.2}
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
        {[...Array(2)].map((v, idx) => {
          const image = idx % 2 === 0 ? '/dummy/dummy-tip-1.png' : '/dummy/dummy-tip-2.png';
          return (
            <SwiperSlide key={`tip${idx}`} className=''>
              <div className='relative aspect-[294/419] w-full overflow-hidden rounded-lg shadow-[0px_5px_10px_rgba(0,0,0,0.15)]'>
                <Image fill src={image} alt='tip' draggable={false} className='scale-110' />
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default CurationTip;
