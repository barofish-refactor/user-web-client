import { useState } from 'react';
import Layout from 'src/components/common/layout';
import { type NextPageWithLayout } from 'src/types/common';
import cm from 'src/utils/class-merge';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { FreeMode } from 'swiper';
import {
  HomeAbbreviationCuration,
  HomeBanner,
  HomeCurationItem,
  HomeCurationTip,
  HomePartner,
  HomeProductList,
} from 'src/components/home';

interface curationType {
  type: 'TABLE' | 'SLIDE_SMALL' | 'SLIDE_LARGE';
  title: string;
  description: string;
}

const dummyCuration: curationType[] = [
  {
    type: 'TABLE',
    title: '지금이 딱인 제철 해산물 🦐',
    description: '따뜻한 봄, 가장 맛있게 먹을 수 있는 봄철 해산물 어때요?',
  },
  {
    type: 'SLIDE_SMALL',
    title: '구이용으로 추천드려요 🔥',
    description: '다른 것 필요없이 굽는 것만으로 한 끼 요리 완성!',
  },
  {
    type: 'SLIDE_LARGE',
    title: '간편하게 먹기 좋아요  🥢',
    description: '손님 초대, 파티용 음식을 고민하셨다면 이 상품 추천해요!',
  },
  {
    type: 'SLIDE_SMALL',
    title: '이것이 바로 진짜 밥도둑 🍚',
    description: '이런 요리 하나만 있어도 밥 두그릇은 기본 아닌가요?',
  },
  {
    type: 'TABLE',
    title: '혼술도 외롭지않게   🥂',
    description: '혼술이라고 슬퍼하지마세요. 바로피쉬가 책임져드립니다!',
  },
];

/** 홈화면 */
const Home: NextPageWithLayout = () => {
  const [selectedTabIndex, setSelectedTabIndex] = useState<number>(0);

  return (
    <div className='max-md:w-[100vw]'>
      {/* Tab */}
      <Swiper freeMode slidesPerView={4} modules={[FreeMode]} className=''>
        {['바로추천', '신상품', '인기상품', '특가할인', '특가할인2'].map((v, idx) => {
          return (
            <SwiperSlide key={`mainTab${idx}`} className='h-full w-1/4'>
              <button className='w-full' onClick={() => setSelectedTabIndex(idx)}>
                <div className='flex h-full w-full flex-col justify-between'>
                  <p
                    className={cm(
                      'text-[16px] font-medium leading-[24px] -tracking-[3%] text-grey-50',
                      { 'font-semibold text-primary-50': selectedTabIndex === idx },
                    )}
                  >
                    {v}
                  </p>
                  <div className={cm('h-[2.5px]', { 'bg-primary-50': selectedTabIndex === idx })} />
                </div>
              </button>
            </SwiperSlide>
          );
        })}
      </Swiper>
      {/* Content - 바로추천 */}
      {selectedTabIndex === 0 ? (
        <>
          <HomeBanner />
          <HomeAbbreviationCuration />
          <div className='h-[1px] bg-[#F4F4F4]' />
          {dummyCuration.map((v, idx) => {
            return (
              <div key={`homeCuration${idx}`}>
                <HomeCurationItem type={v.type} title={v.title} description={v.description} />
                {idx === 0 && (
                  <>
                    {/* SubBanner */}
                    <div className='mx-4 my-[30px] aspect-[343/96] overflow-hidden rounded bg-[#F5F3EE]'>
                      <div />
                    </div>
                    {/* Partner */}
                    <HomePartner />
                  </>
                )}
              </div>
            );
          })}
          {/* 알아두면 좋은 정보 */}
          <HomeCurationTip />
        </>
      ) : (
        <>
          <div className='h-[1px] bg-grey-90' />
          <HomeProductList type='' />
        </>
      )}
    </div>
  );
};

Home.getLayout = page => <Layout>{page}</Layout>;

export default Home;
