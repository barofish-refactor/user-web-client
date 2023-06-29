import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { client } from 'src/api/client';
import { type Curation } from 'src/api/swagger/data-contracts';
import Layout from 'src/components/common/layout';
import {
  HomeAbbreviationCuration,
  HomeBanner,
  HomeCurationItem,
  HomeCurationTip,
  HomeFooter,
  HomePartner,
  HomeProductList,
  HomeSubBanner,
} from 'src/components/home';
import { queryKey } from 'src/query-key';
import { type indexFilterType, useAlertStore, useFilterStore } from 'src/store';
import { aToB, bToA } from 'src/utils/parse';
import { FreeMode } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { type NextPageWithLayout } from 'src/types/common';
import cm from 'src/utils/class-merge';

import 'swiper/css';

const perView = 10;

// interface Props {
//   initialData: Main;
// }

/** 홈화면 */
const Home: NextPageWithLayout = () => {
  const router = useRouter();
  const { tab = 0, f } = router.query;
  const { setAlert } = useAlertStore();

  const { filter, setFilter, clearFilter } = useFilterStore();
  const [savedFilter, setSavedFilter] = useState<number[]>([]);
  const [dummyFilter, setDummyFilter] = useState<indexFilterType[]>();

  const { data, isLoading, refetch } = useQuery(
    queryKey.main,
    async () => {
      const res = await client().selectMainItems();
      if (res.data.isSuccess) {
        return res.data.data;
      } else setAlert({ message: res.data.errorMsg ?? '' });
    },
    {
      staleTime: 0,
    },
  );

  const {
    data: topBarData,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery(
    queryKey.topBar.detail({
      id: Number(tab),
      filterFieldIds: savedFilter.length > 0 ? savedFilter.join(',') : undefined,
    }),
    async ({ pageParam = 1 }) => {
      const res = await client().selectTopBar(Number(tab), {
        filterFieldIds: savedFilter.length > 0 ? savedFilter.join(',') : undefined,
        page: pageParam,
        take: perView,
      });
      if (res.data.isSuccess) {
        return res.data.data;
      } else {
        throw new Error(res.data.code + ': ' + res.data.errorMsg);
      }
    },
    {
      enabled: Number(tab) !== 0,
      // staleTime: 0,
      getNextPageParam: (_lastPage, allPages) => {
        const nextId = allPages.length;
        return nextId + 1;
      },
    },
  );

  useEffect(() => {
    if (filter) {
      setDummyFilter(filter);

      router.replace({
        pathname: '/',
        query: {
          ...router.query,
          f: aToB(JSON.stringify(filter.map(v => v.id))),
        },
      });
      setFilter(null);
    } else {
      // setSavedFilter(undefined);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  useEffect(() => {
    if (router.isReady && f) {
      try {
        setSavedFilter(JSON.parse(bToA(f as string)));
      } catch (error) {
        console.log(error);
      }
    } else {
      setSavedFilter([]);
    }
  }, [f, router.isReady]);

  const { ref } = useInView({
    initialInView: false,
    skip: !hasNextPage,
    onChange: inView => {
      if (inView) fetchNextPage();
    },
  });

  return (
    <div className='max-md:w-[100vw]'>
      {/* Tab */}
      <Swiper freeMode slidesPerView={4} modules={[FreeMode]} className='mt-3'>
        {[{ id: 0, name: '바로추천' }, ...(data?.topBars ?? [])].map((v, idx) => {
          const isSelected = Number(tab) === idx;
          return (
            <SwiperSlide key={`mainTab${idx}`} className='h-full !w-1/4'>
              <button
                className='w-full'
                onClick={() => {
                  clearFilter();
                  router.replace({ pathname: '/', query: idx === 0 ? undefined : { tab: idx } });
                }}
              >
                <div className='flex h-full w-full flex-col justify-between'>
                  <p
                    className={cm(
                      'text-center text-[16px] font-medium leading-[24px] -tracking-[0.03em] text-grey-50',
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
      {/* Content - 바로추천 */}
      {tab === 0 ? (
        <>
          <HomeBanner data={data?.banners ? data.banners.filter(x => x.state === 'ACTIVE') : []} />
          <HomeAbbreviationCuration
            data={[
              { id: -2, image: '/dummy/dummy-curation-1.png', shortName: '해산물꿀팁' } as Curation,
            ].concat(data?.curations ?? [])}
          />
          <div className='h-[1px] bg-[#F4F4F4]' />
          {isLoading ? (
            <div className='h-[50vh]' />
          ) : (
            <>
              {data?.curations?.map((v, idx) => {
                return (
                  <div key={v.id}>
                    <HomeCurationItem data={v} />
                    {idx === 0 && (
                      <>
                        {/* SubBanner */}
                        {data.subBanner && (
                          <div className='mx-4 my-[30px]'>
                            <HomeSubBanner
                              data={
                                data.subBanner
                                  ? data.subBanner.filter(x => x.state === 'ACTIVE')
                                  : []
                              }
                            />
                          </div>
                        )}
                        {/* Partner */}
                        {data?.store && <HomePartner data={data?.store} refetch={refetch} />}
                      </>
                    )}
                  </div>
                );
              })}
            </>
          )}
          {/* 알아두면 좋은 정보 */}
          <HomeCurationTip />
        </>
      ) : (
        <div>
          <div className='h-[1px] bg-grey-90' />
          <HomeProductList
            storeType='topBar'
            storeId={Number(tab)}
            type={data?.topBars ? data?.topBars[Number(tab) - 1]?.name : '-'}
            dataDto={topBarData?.pages ?? []}
            filter={dummyFilter}
          />
          <div ref={ref} />
        </div>
      )}
      <HomeFooter />
    </div>
  );
};

Home.getLayout = page => <Layout>{page}</Layout>;

// export const getServerSideProps: GetServerSideProps = async () => {
//   const { selectMainItems } = client();
//   return {
//     props: { initialData: (await selectMainItems()).data.data },
//   };
// };

export default Home;
