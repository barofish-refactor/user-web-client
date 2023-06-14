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
  HomeFooter,
  HomePartner,
  HomeProductList,
} from 'src/components/home';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
// import { type GetServerSideProps } from 'next';
import { type Main, type Curation } from 'src/api/swagger/data-contracts';
import { queryKey } from 'src/query-key';
import { client } from 'src/api/client';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useInView } from 'react-intersection-observer';
import { useFilterStore } from 'src/store';
import { useEffect, useState } from 'react';
import { type filterType } from 'src/components/common/bottom-sheet';
import { aToB, bToA } from 'src/utils/parse';
import { type GetServerSideProps } from 'next';

const perView = 10;

interface Props {
  initialData: Main;
}

/** 홈화면 */
const Home: NextPageWithLayout<Props> = ({ initialData }) => {
  const router = useRouter();
  const { tab = 0, f } = router.query;

  const { filter, clearFilter } = useFilterStore();
  const [savedFilter, setSavedFilter] = useState<filterType>();

  const { data, refetch } = useQuery(
    queryKey.main,
    async () => {
      const res = await client().selectMainItems();
      if (res.data.isSuccess) {
        return res.data.data;
      } else {
        throw new Error(res.data.code + ': ' + res.data.errorMsg);
      }
    },
    {
      initialData,
      staleTime: 0,
    },
  );

  const {
    data: topBarData,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery(
    queryKey.topBar.detail({ id: Number(tab), ...savedFilter }),
    async ({ pageParam = 1 }) => {
      const res = await client().selectTopBar(Number(tab), {
        ...savedFilter,
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
      getNextPageParam: (lastPage, allPages) => {
        const nextId = allPages.length;
        return nextId + 1;
      },
    },
  );

  const emptyToUndefined = (value: string) => {
    return value === '' ? undefined : value;
  };

  useEffect(() => {
    if (filter) {
      const categoryIds = filter
        .filter(v => v.tabIndex === 0)
        .map(v => v.id)
        .join(',');
      const typeIds = filter
        .filter(v => v.tabIndex === 1)
        .map(v => v.id)
        .join(',');
      const locationIds = filter
        .filter(v => v.tabIndex === 2)
        .map(v => v.id)
        .join(',');
      const processIds = filter
        .filter(v => v.tabIndex === 3)
        .map(v => v.id)
        .join(',');
      const usageIds = filter
        .filter(v => v.tabIndex === 4)
        .map(v => v.id)
        .join(',');
      const storageIds = filter
        .filter(v => v.tabIndex === 5)
        .map(v => v.id)
        .join(',');

      router.replace({
        pathname: '/',
        query: {
          tab,
          f: aToB(
            JSON.stringify({
              categoryIds: emptyToUndefined(categoryIds),
              typeIds: emptyToUndefined(typeIds),
              locationIds: emptyToUndefined(locationIds),
              processIds: emptyToUndefined(processIds),
              usageIds: emptyToUndefined(usageIds),
              storageIds: emptyToUndefined(storageIds),
            }),
          ),
        },
      });
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
      setSavedFilter(undefined);
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
          <HomeBanner data={data?.banners ?? []} />
          <HomeAbbreviationCuration
            data={[
              { id: -2, image: '/dummy/dummy-curation-1.png', shortName: '해산물꿀팁' } as Curation,
            ].concat(data?.curations ?? [])}
          />
          <div className='h-[1px] bg-[#F4F4F4]' />
          {data?.curations?.map((v, idx) => {
            return (
              <div key={`homeCuration${idx}`}>
                <HomeCurationItem data={v} />
                {idx === 0 && (
                  <>
                    {/* SubBanner */}
                    {data?.subBanner && (
                      <div
                        className='relative mx-4 my-[30px] aspect-[343/96] cursor-pointer overflow-hidden rounded'
                        onClick={() => {
                          //
                        }}
                      >
                        <Image
                          fill
                          src={data.subBanner.image ?? ''}
                          alt='subBanner'
                          className='object-cover'
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
          {/* 알아두면 좋은 정보 */}
          <HomeCurationTip data={data?.tips ?? []} />
        </>
      ) : (
        <div className=''>
          <div className='h-[1px] bg-grey-90' />
          <HomeProductList
            type={data?.topBars ? data?.topBars[Number(tab) - 1].name : '-'}
            data={[]}
            dataDto={Array.prototype.concat.apply([], topBarData?.pages ?? [])}
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

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  };
};

export default Home;
