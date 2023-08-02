import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { type GetServerSideProps } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { client } from 'src/api/client';
import { type Category, type CustomResponseListCategory } from 'src/api/swagger/data-contracts';
import Layout from 'src/components/common/layout';
import { HomeProductList } from 'src/components/home';
import { BackButton } from 'src/components/ui';
import { queryKey } from 'src/query-key';
import { type indexFilterType, useFilterStore, useAlertStore } from 'src/store';
import { type NextPageWithLayout } from 'src/types/common';
import cm from 'src/utils/class-merge';
import { aToB, bToA, safeParse, type sortType } from 'src/utils/parse';
import { FreeMode } from 'swiper';
import 'swiper/css';
import { Swiper, SwiperSlide, type SwiperRef } from 'swiper/react';

const perView = 10;

interface Props {
  initialData: CustomResponseListCategory;
}
/** 검색 (카테고리, 큐레이션) */
const ProductResult: NextPageWithLayout<Props> = ({ initialData }) => {
  const router = useRouter();
  const { filter, setFilter } = useFilterStore();
  const { setAlert } = useAlertStore();
  const { id, subItemId, type, f } = router.query;
  const refSwiper = useRef<SwiperRef>(null);
  const [selectedTabIndex, setSelectedTabIndex] = useState<number>();
  const [selectedCategoryId, setSelectedCategoryId] = useState<number>(-1);
  const [dummyFilter, setDummyFilter] = useState<indexFilterType[]>();
  const [savedFilter, setSavedFilter] = useState<number[]>([]);
  const [sort, setSort] = useState<sortType>('RECOMMEND'); // default: 추천순

  const [title, setTitle] = useState<string>('');

  const { data, isLoading } = useQuery(
    queryKey.category,
    async () => {
      const { selectCategories } = await client();
      const res = await selectCategories();
      return res.data;
    },
    { initialData },
  );

  const { data: curationData, isLoading: curationLoading } = useQuery(
    queryKey.curation.detail(id),
    async () => {
      const res = await (await client()).selectCuration(Number(id));
      return res.data.data;
    },
    {
      enabled: !!id && type === 'curation',
    },
  );

  useEffect(() => {
    if (curationData && !curationLoading) {
      setTitle(curationData.title ?? curationData.shortName ?? '');
    }
  }, [curationData, curationLoading]);

  useEffect(() => {
    if (data && !isLoading && type === 'category' && id) {
      const tmp = data.data?.filter(x => x.id === Number(id));
      if (tmp && tmp?.length > 0) setTitle(tmp[0].name ?? '');
    }
  }, [data, id, isLoading, type]);

  const {
    data: productData,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery(
    queryKey.productList.list({
      filterFieldIds: savedFilter.length > 0 ? savedFilter.join(',') : undefined,
      ...{
        categoryIds: selectedCategoryId === -1 ? undefined : selectedCategoryId.toString(),
        curationId: type === 'curation' ? Number(id) : undefined,
      },
      sortby: sort,
    }),
    async ({ pageParam = 1 }) => {
      if (pageParam === -1) return;
      const res = await (
        await client()
      ).selectProductListByUser({
        filterFieldIds: savedFilter.length > 0 ? savedFilter.join(',') : undefined,
        ...{
          categoryIds: selectedCategoryId === -1 ? undefined : selectedCategoryId.toString(),
          curationId: type === 'curation' ? Number(id) : undefined,
        },
        sortby: sort,
        page: pageParam,
        take: perView,
      });
      if (res.data.isSuccess) {
        return res.data.data;
      } else setAlert({ message: res.data.errorMsg ?? '' });
    },
    {
      // enabled: !!id || !!selectedCategoryId,
      enabled: !!id && !!selectedCategoryId,
      getNextPageParam: (lastPage, allPages) => {
        const nextId = allPages.length;
        return lastPage?.content?.length !== 0 ? nextId + 1 : -1;
      },
    },
  );

  useEffect(() => {
    if (id && subItemId && data.data) {
      const idx = (data.data.filter(x => x.id === Number(id))[0].categoryList ?? []).findIndex(
        x => x.id === Number(subItemId),
      );

      setSelectedTabIndex(idx + 1);

      if (idx > 2) refSwiper.current?.swiper.slideTo(idx);
    } else {
      setSelectedTabIndex(0);
    }
  }, [id, subItemId, data]);

  useEffect(() => {
    if (type === 'category') {
      if (selectedTabIndex) {
        const list = data.data?.filter(x => x.id === Number(id))[0].categoryList ?? [];
        if (list.length > 0) {
          setSelectedCategoryId(list[selectedTabIndex - 1].id ?? -1);
        }
      } else {
        setSelectedCategoryId(Number(id));
      }
    }
  }, [data.data, id, selectedTabIndex, type]);

  useEffect(() => {
    if (filter) {
      setDummyFilter(filter);

      router.replace({
        pathname: '/search/product-result',
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

  return (
    <div className='max-md:w-[100vw]'>
      <div className='sticky top-0 z-50 flex h-[56px] items-center gap-3.5 bg-white pl-4 pr-[18px]'>
        <BackButton />
        <p className='line-clamp-1 flex-1 text-center text-[16px] font-bold leading-[24px] -tracking-[0.03em] text-grey-10'>
          {title}
        </p>
        <Link
          href='/product/cart'
          className='h-[23px] w-[22px] bg-[url(/assets/icons/common/cart-title.svg)] bg-cover'
        />
      </div>
      {type === 'category' ? (
        <Swiper ref={refSwiper} freeMode slidesPerView={4} modules={[FreeMode]} className='mt-3'>
          {[{ id: -1, name: '전체보기' } as Category]
            .concat(data.data?.filter(x => x.id === Number(id))[0].categoryList ?? [])
            .map((v, idx) => {
              return (
                <SwiperSlide key={`mainTab${idx}`} className='h-full w-1/4'>
                  <button className='w-full' onClick={() => setSelectedTabIndex(idx)}>
                    <div className='flex h-full w-full flex-col justify-between'>
                      <p
                        className={cm(
                          'text-[16px] font-medium leading-[24px] -tracking-[0.03em] text-grey-50',
                          { 'font-semibold text-primary-50': selectedTabIndex === idx },
                        )}
                      >
                        {v.name}
                      </p>
                      <div
                        className={cm('h-[2.5px]', { 'bg-primary-50': selectedTabIndex === idx })}
                      />
                    </div>
                  </button>
                </SwiperSlide>
              );
            })}
        </Swiper>
      ) : null}
      <HomeProductList
        storeType={type === 'curation' ? 'curation' : 'category'}
        storeId={type === 'curation' ? Number(id) : selectedCategoryId}
        dataDto={productData?.pages ?? []}
        filter={dummyFilter}
        sort={sort}
        setSort={setSort}
      />
      <div ref={ref} className='pb-10' />
    </div>
  );
};

ProductResult.getLayout = page => (
  <Layout headerProps={{ disable: true }} footerProps={{ disable: true }}>
    {page}
  </Layout>
);

export const getServerSideProps: GetServerSideProps = async () => {
  const { selectCategories } = await client();
  return {
    props: { initialData: (await selectCategories()).data },
  };
};

export default ProductResult;
