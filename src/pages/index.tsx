import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { type ReactElement, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { client } from 'src/api/client';
import { type CurationDto, type Curation, type Main } from 'src/api/swagger/data-contracts';
import Layout from 'src/components/common/layout';

import {
  HomeAbbreviationCuration,
  HomeBanner,
  HomeCurationList,
  // HomeCurationTip,
  HomeFooter,
  HomeProductList,
  HomeTab,
} from 'src/components/home';
import { queryKey } from 'src/query-key';
import { useAlertStore, useFilterStore, type indexFilterType } from 'src/store';
// import { type NextPageWithLayout } from 'src/types/common';
import { aToB, bToA, safeParse } from 'src/utils/parse';
import 'swiper/css';

const perView = 10;

/** 홈화면 */
const Home = (props: { curation: CurationDto[]; mainItem: Main }) => {
  const router = useRouter();
  const { tab = 0, f } = router.query;
  const { setAlert } = useAlertStore();

  const { filter, setFilter } = useFilterStore();
  const [savedFilter, setSavedFilter] = useState<number[]>([]);
  const [dummyFilter, setDummyFilter] = useState<indexFilterType[]>();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [defaultCurationAbbreviation, setDefaultCurationAbbreviation] = useState<Curation[]>([]);
  const { data, isLoading, refetch } = useQuery(
    queryKey.main,
    async () => {
      const res = await (await client()).selectMainItems();
      if (res.data.isSuccess) {
        return res.data.data;
      } else setAlert({ message: res.data.errorMsg ?? '' });
    },
    { initialData: props.mainItem },
  );

  const { data: curationData } = useQuery({
    queryKey: queryKey.mainCuration,
    queryFn: async () => {
      const res = await (await client()).selectMainCurationList();
      if (res.data.isSuccess) {
        return res.data.data;
      } else setAlert({ message: res.data.errorMsg ?? '' });
    },
    initialData: props.curation,
  });

  // const { data: curationData } = useQuery(queryKey.mainCuration, async () => {
  //   const res = await (await client()).selectMainCurationList();
  //   if (res.data.isSuccess) {
  //     return res.data.data;
  //   } else setAlert({ message: res.data.errorMsg ?? '' });
  // });

  // 꿀팁 아이콘
  // const { data: tipInfo } = useQuery(queryKey.tipInfo, async () => {
  //   const res = await (await client()).selectTipInfo();
  //   if (res.data.isSuccess) {
  //     return res.data.data;
  //   } else setAlert({ message: res.data.errorMsg ?? '' });
  // });

  // useEffect(() => {
  //   if (tipInfo) {
  //     setDefaultCurationAbbreviation([
  //       {
  //         id: -2,
  //         image: tipInfo.thumbnailImage,
  //         shortName: tipInfo.name,
  //       },
  //     ]);
  //   }
  // }, [tipInfo]);

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
      if (pageParam === -1) return;
      const res = await (
        await client()
      ).selectTopBar(Number(tab), {
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
      getNextPageParam: (lastPage, allPages) => {
        const nextId = allPages.length;

        return lastPage?.content?.length !== 0 ? nextId + 1 : -1;
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
        if (typeof f === 'string') setSavedFilter(safeParse(bToA(f)) ?? []);
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

  // if (isLoading) return <Loading />;
  return (
    <div className='max-md:w-[100vw]'>
      {/* Tab */}
      <HomeTab mainData={data} />
      {/* Content - 바로추천 */}
      {tab === 0 ? (
        <>
          <HomeBanner
            data={
              data?.banners
                ? data.banners
                    .filter(x => x.state === 'ACTIVE')
                    .sort((a, b) => {
                      if ((a.sortNo ?? -1) > (b.sortNo ?? -1)) return 1;
                      else if ((a.sortNo ?? -1) < (b.sortNo ?? -1)) return -1;
                      else return 0;
                    })
                : []
            }
          />

          <HomeAbbreviationCuration
            data={defaultCurationAbbreviation.concat(
              (curationData ?? []).filter(
                x => x.shortName && x.shortName.length > 0 && (x.products ?? []).length > 0,
              ),
            )}
          />
          <div className='h-[1px]' />
          {isLoading ? (
            <div className='h-[50vh]' />
          ) : (
            <>
              <HomeCurationList mainData={data} mainRefetch={refetch} />
            </>
          )}
          {/* 알아두면 좋은 정보 */}
          {/* <HomeCurationTip /> */}
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
          <div ref={ref} className='pb-10' />
        </div>
      )}
      <HomeFooter />
    </div>
  );
};

Home.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

export default Home;

export async function getStaticProps() {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const res = await (await client()).selectMainCurationList();
  const res2 = await (await client()).selectMainItems();
  const curation = res.data.data;
  const mainItem = res2.data.data;

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      curation,
      mainItem,
    },
  };
}
