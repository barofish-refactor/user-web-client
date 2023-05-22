import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { FreeMode } from 'swiper';

interface Props {
  //
}

const name = '서준수산';
const location = '전라남도 목포에 위치';
const tag = ['참병어', '먹갈치', '반건조병어'];
const content =
  '부모님과 같이 먹으려고 시켰는데 해산물 배송이 처음이다 보니 걱정도 많이 됐었어요..! 그런데 정말 맛있었고 신선했어요. 다음에도 다시 주문하겠습니다!';

/** 홈화면 - 파트너 부분 */
const Partner = ({}: Props) => {
  return (
    <div className='px-4 py-[30px]'>
      <p className='line-clamp-1 text-[20px] font-bold leading-[30px] -tracking-[0.03em] text-grey-10'>
        믿고 구매할 수 있는 스토어 🏡
      </p>
      <p className='text-[14px] font-normal leading-[22px] -tracking-[0.03em] text-grey-60'>
        바로피쉬에서 입증한 스토어에서 실패없는 수산물 쇼핑!
      </p>

      <Swiper
        freeMode
        slidesPerView={1.03}
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
        {[...Array(3)].map((v, idx) => {
          return (
            <SwiperSlide key={`partner${idx}`} className=''>
              <div className='overflow-hidden rounded-lg border border-grey-90 px-4 pb-[19px] pt-[26px]'>
                <div className='flex items-start justify-between'>
                  <div className='flex flex-1 items-center gap-3'>
                    <Image
                      src='/dummy/dummy-partner-1.png'
                      alt='partner'
                      width={83}
                      height={83}
                      className='rounded-full border border-grey-90'
                    />
                    <div className=''>
                      <p className='text-[20px] font-bold leading-[30px] -tracking-[0.03em] text-grey-10'>
                        {name}
                      </p>
                      <p className='text-[14px] font-semibold leading-[22px] -tracking-[0.03em] text-grey-30'>
                        {location}
                      </p>
                      <div className='mt-[5px] flex gap-1'>
                        {tag.slice(0, 3).map((v, idx) => {
                          return (
                            <div
                              key={`tag${idx}`}
                              className='flex h-[22px] items-center justify-center rounded bg-grey-90 px-2'
                            >
                              <p className='whitespace-pre text-[13px] font-medium -tracking-[0.03em] text-grey-40'>
                                {v}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      //
                    }}
                  >
                    <Image
                      src='/assets/icons/common/partner-star.svg'
                      alt='bookmark'
                      width={24}
                      height={24}
                    />
                  </button>
                </div>
                <div className='my-4 h-[1px] bg-grey-90' />
                <p className='text-[14px] font-normal leading-[22px] -tracking-[0.03em] text-grey-10'>
                  {content}
                </p>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default Partner;
