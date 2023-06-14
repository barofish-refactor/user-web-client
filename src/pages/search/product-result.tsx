import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { type GetServerSideProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Fragment, useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { client } from 'src/api/client';
import { type Category, type CustomResponseListCategory } from 'src/api/swagger/data-contracts';
import Layout from 'src/components/common/layout';
import { HomeProductList } from 'src/components/home';
import { BackButton } from 'src/components/ui';
import { queryKey } from 'src/query-key';
import { type NextPageWithLayout } from 'src/types/common';
import cm from 'src/utils/class-merge';
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
  const { id, title, subItemId, type } = router.query;
  const refSwiper = useRef<SwiperRef>(null);
  const [selectedTabIndex, setSelectedTabIndex] = useState<number>();
  const [selectedCategoryId, setSelectedCategoryId] = useState<number>(-1);

  const { data } = useQuery(
    queryKey.category,
    async () => {
      const { selectCategories } = client();
      const res = await selectCategories();
      return res.data;
    },
    { initialData },
  );

  const { data: curationData } = useQuery(
    queryKey.curationList,
    async () => {
      const { selectCuration } = client();
      const res = await selectCuration(Number(id));
      return res.data;
    },
    {
      enabled: !!id && type === 'curation',
      staleTime: 0,
    },
  );

  const {
    data: productData,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery(
    queryKey.productList.list({
      categoryIds: selectedCategoryId === -1 ? undefined : selectedCategoryId.toString(),
    }),
    async ({ pageParam = 1 }) => {
      const res = await client().selectProductListByUser({
        categoryIds: selectedCategoryId === -1 ? undefined : selectedCategoryId.toString(),
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
      enabled: (!!id && type === 'category') || !!selectedCategoryId,
      // staleTime: 0,
      getNextPageParam: (lastPage, allPages) => {
        const nextId = allPages.length;
        return nextId + 1;
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
    if (selectedTabIndex) {
      const list = data.data?.filter(x => x.id === Number(id))[0].categoryList ?? [];
      if (list.length > 0) {
        setSelectedCategoryId(list[selectedTabIndex - 1].id ?? -1);
      }
    } else {
      setSelectedCategoryId(Number(id));
    }
  }, [data.data, id, selectedTabIndex]);

  const { ref } = useInView({
    initialInView: false,
    skip: !hasNextPage,
    onChange: inView => {
      if (inView) fetchNextPage();
    },
  });

  return (
    <div className='max-md:w-[100vw]'>
      <div className='sticky top-0 z-50 flex h-[56px] items-center gap-3.5 bg-white px-4'>
        <BackButton />
        <p className='flex-1 text-center text-[16px] font-bold leading-[24px] -tracking-[0.03em] text-grey-10'>
          {title}
        </p>
        <Link href='/product/cart'>
          <Image src='/assets/icons/common/cart-title.svg' alt='cart' width={22} height={23} />
        </Link>
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
      {type === 'curation' ? (
        <HomeProductList dataDto={curationData?.data?.products ?? []} data={[]} />
      ) : (
        <Fragment>
          <HomeProductList
            dataDto={Array.prototype.concat.apply([], productData?.pages ?? [])}
            data={[]}
          />
          <div ref={ref} />
        </Fragment>
      )}
    </div>
  );
};

ProductResult.getLayout = page => (
  <Layout headerProps={{ disable: true }} footerProps={{ disable: true }}>
    {page}
  </Layout>
);

export const getServerSideProps: GetServerSideProps = async () => {
  const { selectCategories } = client();
  return {
    props: { initialData: (await selectCategories()).data },
  };
};

export default ProductResult;
