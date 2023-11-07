import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { type Main } from 'src/api/swagger/data-contracts';
import { useFilterStore } from 'src/store';
import cm from 'src/utils/class-merge';
import { FreeMode } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

interface Props {
  mainData: Main | undefined;
}

export default function Tab({ mainData }: Props) {
  const { clearFilter } = useFilterStore();
  const router = useRouter();
  const { tab = 0 } = router.query;
  const [tabnum, setTabnum] = useState(0);
  const browserPreventEvent = useCallback(() => {
    if (tabnum !== 0) {
      console.log(location.href[location.href.length - 1]);
      let url = location.href.substring(0, location.href.length - 1);
      url = url + tab.toString();
      history.pushState(null, '', url);
    }
  }, [tab, tabnum]);
  useEffect(() => {
    window.addEventListener('popstate', () => {
      browserPreventEvent();
    });
    return () => {
      window.removeEventListener('popstate', () => {
        browserPreventEvent();
      });
    };
  }, [browserPreventEvent]);
  return (
    <Swiper freeMode slidesPerView={4} modules={[FreeMode]} className='mt-3'>
      {[{ id: 0, name: '바로추천' }, ...(mainData?.topBars ?? [])].map((v, idx) => {
        const isSelected = Number(tab) === idx;
        return (
          <SwiperSlide key={idx} className='h-full !w-1/4'>
            <button
              className='w-full'
              onClick={() => {
                clearFilter();
                setTabnum(idx);
                router.replace({ pathname: '/', query: idx === 0 ? undefined : { tab: idx } });
              }}
            >
              <div className='flex h-full w-full flex-col justify-between'>
                <p
                  className={cm(
                    'text-center text-[17px] font-medium leading-[24px] -tracking-[0.03em] text-grey-50',
                    { 'font-semibold text-primary-50': isSelected },
                  )}
                >
                  {v.name}
                </p>
                <div
                  className={cm('mt-[3.5px] h-[2.5px]', {
                    'bg-primary-50': isSelected,
                  })}
                />
              </div>
            </button>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}
