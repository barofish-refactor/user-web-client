import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query';
import { getCookie } from 'cookies-next';
import { type GetServerSideProps } from 'next';
import { DefaultSeo } from 'next-seo';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Fragment, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { client } from 'src/api/client';
import { type SimpleStore } from 'src/api/swagger/data-contracts';
import { CartIcon } from 'src/components/common';
import { HeaderBanner } from 'src/components/common/header-banner';
import Layout from 'src/components/common/layout';
import { HomeProductList } from 'src/components/home';
import { StarIcon } from 'src/components/icons';
import { ShareButton } from 'src/components/product';
import { ReviewChart, ReviewPhoto } from 'src/components/review';
import { StoreTab } from 'src/components/store';
import { BackButton } from 'src/components/ui';
import { queryKey } from 'src/query-key';
import { useAlertStore, useFilterStore, type indexFilterType } from 'src/store';
import { type NextPageWithLayout } from 'src/types/common';
import { aToB, bToA, safeParse, type sortType } from 'src/utils/parse';
import { VARIABLES } from 'src/variables';

const perView = 10;

interface Props {
  initialData: SimpleStore;
}

/** 스토어 상세 */
const StoreDetail: NextPageWithLayout<Props> = ({ initialData }) => {
  const router = useRouter();
  const { id, f } = router.query;
  const { setAlert } = useAlertStore();
  const { filter, setFilter } = useFilterStore();

  const [description, setDescription] = useState<string>('');
  const [dummyFilter, setDummyFilter] = useState<indexFilterType[]>();
  const [savedFilter, setSavedFilter] = useState<number[]>([]);
  const [sort, setSort] = useState<sortType>('RECOMMEND'); // default: 추천순

  const { data, refetch } = useQuery(
    queryKey.store.detail(id),
    async () => {
      const res = await (await client()).selectStore(Number(id));
      if (res.data.isSuccess) {
        return res.data.data;
      } else {
        throw new Error(res.data.code + ': ' + res.data.errorMsg);
      }
    },
    {
      enabled: !!id,
      initialData,
    },
  );

  const {
    data: productData,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery(
    queryKey.productList.list({
      filterFieldIds: savedFilter.length > 0 ? savedFilter.join(',') : undefined,
      storeId: Number(id),
      sortby: sort,
    }),
    async ({ pageParam = 1 }) => {
      if (pageParam === -1) return;
      const res = await (
        await client()
      ).selectProductListByUser1({
        filterFieldIds: savedFilter.length > 0 ? savedFilter.join(',') : undefined,
        storeId: Number(id),
        sortby: sort,
        page: pageParam,
        take: perView,
      });
      if (res.data.isSuccess) {
        return res.data.data;
      } else setAlert({ message: res.data.errorMsg ?? '' });
    },
    {
      enabled: !!id,
      getNextPageParam: (lastPage, allPages) => {
        const nextId = allPages.length;
        return lastPage?.content?.length !== 0 ? nextId + 1 : -1;
      },
    },
  );

  const { mutateAsync: likeStoreByUser, isLoading } = useMutation(
    async (args: { storeId: number; type: 'LIKE' | 'UNLIKE' }) =>
      await (await client()).likeStoreByUser(args),
  );

  const onMutate = ({ storeId, type }: { storeId: number; type: 'LIKE' | 'UNLIKE' }) => {
    if (!getCookie(VARIABLES.ACCESS_TOKEN)) return router.push('/login');
    if (isLoading) return;
    likeStoreByUser({
      storeId,
      type,
    })
      .then(res => {
        if (res.data.isSuccess) {
          refetch();
        } else {
          setAlert({ message: res.data.errorMsg ?? '' });
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  const [selectedTab, setSelectedTab] = useState<number>(0);

  useEffect(() => {
    if (filter) {
      setDummyFilter(filter);

      router.replace({
        pathname: '/store/detail',
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
        setSavedFilter(safeParse(bToA(f as string)) ?? []);
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

  useEffect(() => {
    if (data) {
      if (data.visitNote && !!data.visitNote.trim()) {
        fetch(data.visitNote)
          .then(res => res.text())
          .then(setDescription)
          .catch(err => console.log(JSON.stringify(err)));
      }
    }
  }, [data]);
  // 배너 확인용 유저
  const { data: user } = useQuery(queryKey.user, async () => {
    const res = await (await client()).selectUserSelfInfo();
    if (res.data.isSuccess) {
      return res.data.data;
    }
  });
  console.log(data);

  return (
    <div className='max-md:w-[100vw]'>
      {/* header */}
      {!user && (
        <div className='sticky top-0 z-50'>
          <HeaderBanner />
        </div>
      )}
      {data && (
        <DefaultSeo
          title={data.name}
          description='바로피쉬에 입점되어있는 믿을수있는 스토어'
          openGraph={{
            title: data.name,
            description: data.oneLineDescription,
            siteName: '입점스토어',
            type: 'website',
          }}
        />
      )}
      <div
        className={
          !user
            ? 'sticky top-11 z-50 flex h-[56px] items-center justify-between gap-3.5 bg-white px-4'
            : 'sticky top-0 z-50 flex h-[56px] items-center justify-between gap-3.5 bg-white px-4'
        }
      >
        <BackButton />
        <div className='flex items-center gap-4'>
          <button
            onClick={() => {
              onMutate({
                storeId: data?.storeId ?? -1,
                type: data?.isLike ? 'UNLIKE' : 'LIKE',
              });
            }}
          >
            {data?.isLike ? (
              <StarIcon isActive={true} />
            ) : (
              <Image
                unoptimized
                src='/assets/icons/common/star.svg'
                alt='star'
                width={24}
                height={24}
              />
            )}
          </button>
          <Link href='/product/cart'>
            <CartIcon />
          </Link>
          <ShareButton />
        </div>
      </div>

      {/* banner */}
      <Image
        unoptimized
        priority
        width={375}
        height={186}
        src={data?.backgroundImage ?? '/'}
        alt='banner'
        className=' aspect-[375/186] w-full object-cover'
      />

      {/* info */}
      <div className='flex items-start justify-between pb-5 pl-[17px] pr-[21px] pt-4'>
        <div className='flex flex-1 items-center gap-3'>
          <Image
            unoptimized
            src={data?.profileImage ?? '/'}
            alt='partner'
            width={83}
            height={83}
            className='rounded-full border border-grey-90 object-cover'
            style={{ width: '83px', height: '83px' }}
          />
          <div className=''>
            <p className='text-[20px] font-bold leading-[30px] -tracking-[0.03em] text-grey-10'>
              {data?.name ?? ''}
            </p>
            <p className='text-[14px] font-semibold leading-[22px] -tracking-[0.03em] text-grey-30'>
              {data?.location ?? ''}
            </p>
            <div className='mt-[5px] flex flex-wrap gap-1'>
              {(data?.keyword ?? []).map((v, idx) => {
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
      </div>
      <div className='h-2 bg-grey-90' />
      {/* 구매자들의 솔직 리뷰 */}
      <ReviewChart
        data={{
          taste:
            (data?.reviewStatistic?.filter(x => x.key === 'TASTE').length ?? 0) > 0
              ? data?.reviewStatistic?.filter(x => x.key === 'TASTE')[0].count ?? 0
              : 0,
          freshness:
            (data?.reviewStatistic?.filter(x => x.key === 'FRESH').length ?? 0) > 0
              ? data?.reviewStatistic?.filter(x => x.key === 'FRESH')[0].count ?? 0
              : 0,
          price:
            (data?.reviewStatistic?.filter(x => x.key === 'PRICE').length ?? 0) > 0
              ? data?.reviewStatistic?.filter(x => x.key === 'PRICE')[0].count ?? 0
              : 0,
          packaging:
            (data?.reviewStatistic?.filter(x => x.key === 'PACKAGING').length ?? 0) > 0
              ? data?.reviewStatistic?.filter(x => x.key === 'PACKAGING')[0].count ?? 0
              : 0,
          size:
            (data?.reviewStatistic?.filter(x => x.key === 'SIZE').length ?? 0) > 0
              ? data?.reviewStatistic?.filter(x => x.key === 'SIZE')[0].count ?? 0
              : 0,
        }}
      />
      <div className='mt-2.5 h-2 bg-grey-90' />
      <StoreTab data={data} selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      <div className='min-h-[calc(100dvb-95px)]'>
        {selectedTab === 0 ? (
          description === '' ? (
            <div className='grid min-h-[calc(100dvb-95px)] flex-1 place-items-center'>
              <div className='flex flex-col items-center gap-2'>
                <Image
                  unoptimized
                  src='/assets/icons/search/search-error.svg'
                  alt='up'
                  width={40}
                  height={40}
                />
                <p className='whitespace-pre text-center text-[14px] font-medium leading-[20px] -tracking-[0.05em] text-[#B5B5B5]'>
                  준비중입니다.
                </p>
              </div>
            </div>
          ) : (
            <div
              dangerouslySetInnerHTML={{ __html: description }}
              className='mb-5 w-full [&_img]:w-full'
            />
          )
        ) : selectedTab === 1 ? (
          <Fragment>
            <HomeProductList
              storeType='store'
              storeId={data?.storeId}
              dataDto={productData?.pages ?? []}
              filter={dummyFilter}
              sort={sort}
              setSort={setSort}
            />
            <div ref={ref} className='pb-10' />
          </Fragment>
        ) : (
          // <ReviewPhoto data={[]} type='store' />
          <ReviewPhoto id={data?.storeId ?? -1} type='store' />
        )}
      </div>
    </div>
  );
};

StoreDetail.getLayout = page => (
  <Layout headerProps={{ disable: true }} footerProps={{ disable: true }}>
    {page}
  </Layout>
);

export const getServerSideProps: GetServerSideProps = async context => {
  const { id } = context.query;
  const { selectStore } = await client();
  return {
    props: { initialData: (await selectStore(Number(id))).data.data },
  };
};

export default StoreDetail;
