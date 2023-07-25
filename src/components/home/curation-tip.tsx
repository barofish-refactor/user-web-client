import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { useInView } from 'react-intersection-observer';
import { client } from 'src/api/client';
import { queryKey } from 'src/query-key';
import { FreeMode } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import { useAlertStore } from 'src/store';

/** 홈화면 - 알아두면 좋은 정보 */
const CurationTip = () => {
  const { setAlert } = useAlertStore();

  const { ref, inView } = useInView({ initialInView: false, triggerOnce: true });
  const { data } = useQuery(
    queryKey.tipList.list({ type: undefined }),
    async () => {
      const res = await (await client()).selectTipList();
      if (res.data.isSuccess) {
        return res.data.data;
      } else {
        throw new Error(res.data.code + ': ' + res.data.errorMsg);
      }
    },
    {
      enabled: inView,
    },
  );

  const { data: tipInfo } = useQuery(queryKey.tipInfo, async () => {
    const res = await (await client()).selectTipInfo();
    if (res.data.isSuccess) {
      return res.data.data;
    } else setAlert({ message: res.data.errorMsg ?? '' });
  });

  return (
    <div className='px-4 pt-[30px]'>
      <div className='flex items-center justify-between'>
        <p
          ref={ref}
          className='line-clamp-1 text-[20px] font-bold leading-[30px] -tracking-[0.03em] text-grey-10'
        >
          {tipInfo?.title ?? ''}
        </p>
        <Link href='/tip' className=''>
          <div className='flex h-[30px] items-center gap-1'>
            <p className='whitespace-nowrap text-[14px] font-medium leading-[22px] -tracking-[0.03em] text-grey-50'>
              전체보기
            </p>
            <Image
              unoptimized
              src='/assets/icons/common/chevron.svg'
              alt='chevron'
              width={12}
              height={12}
            />
          </div>
        </Link>
      </div>
      <p className='whitespace-pre-line text-[14px] font-normal leading-[22px] -tracking-[0.03em] text-grey-60'>
        {tipInfo?.subTitle ?? ''}
      </p>
      <Swiper
        freeMode
        slidesPerView={1.2}
        modules={[FreeMode]}
        spaceBetween={11}
        style={{ marginInline: '-16px', paddingInline: '16px' }}
      >
        {data?.map(v => {
          return (
            <SwiperSlide key={v.id} className='pb-[30px] pt-[20px]'>
              <Link href={{ pathname: '/tip-detail', query: { id: v.id } }}>
                <div className='relative aspect-[294/419] w-full overflow-hidden rounded-lg shadow-[0px_5px_10px_rgba(0,0,0,0.15)]'>
                  <Image
                    width={294}
                    height={419}
                    src={v.image ?? ''}
                    alt='tip'
                    draggable={false}
                    className='aspect-[294/419] w-full object-cover'
                  />
                  <div className='absolute inset-0 bg-[linear-gradient(180deg,rgba(111,111,111,0.9)0%,rgba(46,46,46,0.774)0.01%,rgba(67,67,67,0)59.58%)] px-5 py-6'>
                    <p className='whitespace-pre-wrap break-keep text-[24px] font-bold leading-[36px] -tracking-[0.03em] text-white'>
                      {v.title}
                    </p>
                    <p className='mt-[5px] whitespace-pre-wrap break-keep text-[14px] font-medium leading-[22px] -tracking-[0.03em] text-white'>
                      {v.description}
                    </p>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default CurationTip;
