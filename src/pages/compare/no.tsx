import { useInfiniteQuery, useMutation } from '@tanstack/react-query';
import { getCookie } from 'cookies-next';
import { type GetServerSideProps } from 'next';
import { DefaultSeo } from 'next-seo';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { client } from 'src/api/client';
import {
  type CompareMain,
  type DeleteSaveProductsPayload,
  type SaveProductPayload,
} from 'src/api/swagger/data-contracts';
import { ContentType } from 'src/api/swagger/http-client';
import { CartIcon } from 'src/components/common';
import Layout from 'src/components/common/layout';
import { CompareNewItem } from 'src/components/compare';
import { queryKey } from 'src/query-key';
import { useAlertStore, useToastStore } from 'src/store';
import { type NextPageWithLayout } from 'src/types/common';
import {
  calcDiscountRate,
  formatToBlob,
  formatToLocaleString,
  setSquareBrackets,
} from 'src/utils/functions';
import { VARIABLES } from 'src/variables';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';

const perView = 10;

interface Props {
  initialData: CompareMain;
}

/** 비교하기 */
const Compare: NextPageWithLayout<Props> = ({}) => {
  const router = useRouter();
  const { setAlert } = useAlertStore();
  const { setToast } = useToastStore();
  const [refreshIndex, setRefreshIndex] = useState<number>(0);

  const { data, refetch, hasNextPage, fetchNextPage } = useInfiniteQuery(
    queryKey.compareMain,
    async ({ pageParam = 1 }) => {
      if (pageParam === -1) return;
      const res = await (await client()).selectMain({ page: pageParam, take: perView });
      if (res.data.isSuccess) {
        return res.data.data;
      } else {
        throw new Error(res.data.code + ': ' + res.data.errorMsg);
      }
    },
    {
      getNextPageParam: (lastPage, allPages) => {
        const nextId = allPages.length;
        return lastPage?.newCompareProduct?.products?.length !== 0 ? nextId + 1 : -1;
      },
    },
  );

  const { mutateAsync: saveProduct, isLoading } = useMutation(
    async (args: SaveProductPayload) =>
      await (await client()).saveProduct(args, { type: ContentType.FormData }),
  );

  const { mutateAsync: deleteSaveProducts, isLoading: isDeleteLoading } = useMutation(
    async (args: DeleteSaveProductsPayload) =>
      await (await client()).deleteSaveProducts(args, { type: ContentType.FormData }),
  );

  const onMutate = ({ data }: SaveProductPayload, isRefetch = true) => {
    if (!getCookie(VARIABLES.ACCESS_TOKEN)) return router.push('/login');
    if (isLoading) return;
    saveProduct({ data: formatToBlob<SaveProductPayload['data']>(data, true) })
      .then(res => {
        if (res.data.isSuccess) {
          setToast({
            text: '1개의 상품이 저장함에 담겼어요.',
            onClick: () => router.push('/compare/storage'),
          });
          if (isRefetch) refetch();
        } else setAlert({ message: res.data.errorMsg ?? '' });
      })
      .catch(error => console.log(error));
  };

  const onDeleteSaveProductsMutate = ({ data }: DeleteSaveProductsPayload) => {
    if (isDeleteLoading) return;
    deleteSaveProducts({ data: formatToBlob<DeleteSaveProductsPayload['data']>(data, true) })
      .then(res => {
        if (res.data.isSuccess) {
          refetch();
        } else setAlert({ message: res.data.errorMsg ?? '' });
      })
      .catch(error => console.log(error));
  };

  const { ref } = useInView({
    initialInView: false,
    skip: !hasNextPage,
    onChange: inView => {
      if (inView) fetchNextPage();
    },
  });

  return (
    <></>
    // <div className='overflow-clip max-md:w-[100vw]'>
    //   <div className='sticky top-0 z-50 flex h-[56px] items-center gap-4 bg-white px-[18px]'>
    //     <div className='w-[60px]' />
    //     <p className='flex-1 text-center text-[16px] font-bold leading-[24px] -tracking-[0.03em] text-grey-10'>
    //       비교하기
    //     </p>
    //     <Link href='/compare/storage'>
    //       <Image
    //         unoptimized
    //         src='/assets/icons/common/bookmark-title.svg'
    //         alt='bookmark'
    //         width={24}
    //         height={24}
    //       />
    //     </Link>
    //     <Link href='/product/cart'>
    //       <CartIcon />
    //     </Link>
    //   </div>
    //   <div className='px-4 pt-2.5'>
    //     <Link
    //       href='/search'
    //       className='flex h-10 w-full items-center gap-2 rounded-lg bg-grey-90 px-3'
    //     >
    //       <Image src='/assets/icons/common/search.svg' alt='search' width={24} height={24} />
    //       <p className='bg-grey-90 text-[14px] font-medium leading-[22px] -tracking-[0.03em] text-grey-70'>
    //         비교하고 싶은 상품을 검색해 주세요
    //       </p>
    //     </Link>
    //   </div>
    //   <div className='px-4 pt-[30px]'>
    //     <p className='text-[20px] font-bold leading-[30px] -tracking-[0.03em] text-grey-10'>
    //       인기있는 비교하기 조합
    //     </p>
    //     <p className='text-[14px] font-normal leading-[22px] -tracking-[0.03em] text-grey-60'>
    //       다른 분들은 이렇게 세트로 함께 많이 비교하고 있어요!
    //     </p>
    //   </div>

    //   <div className='mx-4 w-[83%]'>
    //     <Swiper
    //       className='!overflow-visible'
    //       spaceBetween={16}
    //       style={{ marginInline: '-16px', paddingInline: '16px' }}
    //     >
    //       {(data?.pages[0]?.popularCompareSets ?? []).map((set, idx) => {
    //         return (
    //           <SwiperSlide key={`compare${idx}`} className='pt-2.5'>
    //             {(set.products ?? []).map((v, i) => {
    //               return (
    //                 <Link
    //                   key={`product${i}`}
    //                   href={{ pathname: '/product', query: { id: v.id } }}
    //                   className='flex items-center gap-2.5 border-b border-b-grey-90 py-5 last-of-type:border-b-0'
    //                 >
    //                   <div className='relative'>
    //                     <Image
    //                       unoptimized
    //                       src={v.image ?? ''}
    //                       alt='product'
    //                       width={110}
    //                       height={110}
    //                       className='aspect-square rounded-lg object-cover'
    //                     />
    //                     <button
    //                       className='absolute right-1 top-1.5'
    //                       onClick={e => {
    //                         e.preventDefault();
    //                         if (v.isLike)
    //                           onDeleteSaveProductsMutate({ data: { productIds: [v.id ?? -1] } });
    //                         else onMutate({ data: { productId: v.id } });
    //                       }}
    //                     >
    //                       <Image
    //                         unoptimized
    //                         alt='bookmark'
    //                         width={24}
    //                         height={24}
    //                         src={
    //                           v.isLike
    //                             ? '/assets/icons/compare/compare-bookmark-on.svg'
    //                             : '/assets/icons/compare/compare-bookmark.svg'
    //                         }
    //                       />
    //                     </button>
    //                   </div>
    //                   <div className='flex-1'>
    //                     <p className='line-clamp-2 text-[14px] font-normal leading-[22px] -tracking-[0.03em] text-grey-10'>
    //                       {`${setSquareBrackets(v.storeName)} ${v.title}`}
    //                     </p>
    //                     <div className='mt-0.5 flex items-center gap-0.5'>
    //                       {(v.originPrice ?? 0) !== 0 && (
    //                         <p className='text-[16px] font-bold leading-[24px] -tracking-[0.03em] text-teritory'>{`${calcDiscountRate(
    //                           v.originPrice,
    //                           v.discountPrice,
    //                         )}%`}</p>
    //                       )}
    //                       <p className='text-[16px] font-bold leading-[24px] -tracking-[0.03em] text-grey-10'>{`${formatToLocaleString(
    //                         v.discountPrice,
    //                       )}원`}</p>
    //                     </div>
    //                     {(v.originPrice ?? 0) !== 0 && (
    //                       <p className='-mt-0.5 text-start text-[13px] font-normal leading-[20px] -tracking-[0.03em] text-grey-60 line-through'>{`${formatToLocaleString(
    //                         v.originPrice,
    //                       )}원`}</p>
    //                     )}
    //                     <div className='mt-1 flex items-center gap-0.5'>
    //                       <Image
    //                         unoptimized
    //                         src='/assets/icons/common/speech-bubble.svg'
    //                         alt='후기'
    //                         width={16}
    //                         height={16}
    //                         draggable={false}
    //                       />
    //                       <p className='text-[13px] font-medium leading-[20px] -tracking-[0.03em] text-grey-70'>
    //                         후기
    //                       </p>
    //                       <p className='text-[13px] font-medium leading-[20px] -tracking-[0.03em] text-grey-70'>{`${
    //                         v.reviewCount ?? 0
    //                       }`}</p>
    //                     </div>
    //                   </div>
    //                 </Link>
    //               );
    //             })}
    //             <button
    //               className='mt-2.5 flex h-[42px] w-full items-center justify-center rounded-lg border border-grey-70'
    //               onClick={() => {
    //                 router.push({
    //                   pathname: '/compare/[id]',
    //                   query: { id: (set.products ?? []).map(x => x.id ?? -1), type: 'list' },
    //                 });
    //               }}
    //             >
    //               <p className='text-[14px] font-semibold leading-[22px] -tracking-[0.03em] text-grey-10'>
    //                 이 조합으로 비교해보기
    //               </p>
    //             </button>
    //           </SwiperSlide>
    //         );
    //       })}
    //     </Swiper>
    //   </div>

    //   {data?.pages[0]?.recommendCompareProducts &&
    //     data?.pages[0]?.recommendCompareProducts.length > 0 && (
    //       <div className='mx-4 mt-[50px]'>
    //         <p className='text-[20px] font-bold leading-[30px] -tracking-[0.03em] text-grey-10'>
    //           이 상품, 이렇게 비교해보는건 어때요?
    //         </p>
    //         <p className='text-[14px] font-normal leading-[22px] -tracking-[0.03em] text-grey-60'>
    //           바로피쉬가 비교해보면 좋은 조합을 추천해드릴게요!
    //         </p>
    //         {/* 큰 상품 */}
    //         <Link
    //           href={{
    //             pathname: '/product',
    //             query: { id: data.pages[0].recommendCompareProducts[refreshIndex].mainProduct?.id },
    //           }}
    //         >
    //           <div className='relative mt-5 aspect-square'>
    //             <Image
    //               unoptimized
    //               fill
    //               draggable={false}
    //               alt='product'
    //               className='rounded-lg object-cover'
    //               src={
    //                 data.pages[0].recommendCompareProducts[refreshIndex].mainProduct?.image ?? ''
    //               }
    //             />
    //             <button
    //               className='absolute right-2 top-3'
    //               onClick={e => {
    //                 e.preventDefault();
    //                 const mainData =
    //                   data?.pages[0]?.recommendCompareProducts?.[refreshIndex].mainProduct;
    //                 if (mainData?.isLike)
    //                   onDeleteSaveProductsMutate({ data: { productIds: [mainData?.id ?? -1] } });
    //                 else onMutate({ data: { productId: mainData?.id } });
    //               }}
    //             >
    //               <Image
    //                 unoptimized
    //                 alt='bookmark'
    //                 width={24}
    //                 height={24}
    //                 src={
    //                   data.pages[0].recommendCompareProducts[refreshIndex].mainProduct?.isLike
    //                     ? '/assets/icons/compare/compare-bookmark-on.svg'
    //                     : '/assets/icons/compare/compare-bookmark.svg'
    //                 }
    //               />
    //             </button>
    //           </div>
    //         </Link>
    //         <p className='mt-2.5 line-clamp-2 text-[16px] font-normal leading-[24px] -tracking-[0.03em] text-grey-10'>
    //           {`${setSquareBrackets(
    //             data.pages[0].recommendCompareProducts[refreshIndex].mainProduct?.storeName,
    //           )} ${data.pages[0].recommendCompareProducts[refreshIndex].mainProduct?.title}`}
    //         </p>
    //         <div className='mt-0.5 flex items-center gap-0.5'>
    //           {(data.pages[0].recommendCompareProducts[refreshIndex].mainProduct?.originPrice ??
    //             0) !== 0 && (
    //             <p className='text-[20px] font-bold leading-[30px] -tracking-[0.03em] text-teritory'>
    //               {calcDiscountRate(
    //                 data.pages[0].recommendCompareProducts[refreshIndex].mainProduct?.originPrice,
    //                 data.pages[0].recommendCompareProducts[refreshIndex].mainProduct?.discountPrice,
    //               )}
    //               %
    //             </p>
    //           )}
    //           <p className='text-[20px] font-bold leading-[30px] -tracking-[0.03em] text-grey-10'>{`${formatToLocaleString(
    //             data.pages[0].recommendCompareProducts[refreshIndex].mainProduct?.discountPrice,
    //           )}원`}</p>
    //         </div>
    //         {(data.pages[0].recommendCompareProducts[refreshIndex].mainProduct?.originPrice ??
    //           0) !== 0 && (
    //           <p className='-mt-0.5 text-start text-[14px] font-normal leading-[22px] -tracking-[0.03em] text-grey-60 line-through'>{`${formatToLocaleString(
    //             data.pages[0].recommendCompareProducts[refreshIndex].mainProduct?.originPrice ?? 0,
    //           )}원`}</p>
    //         )}
    //         <div className='mt-1 flex items-center gap-0.5'>
    //           <Image
    //             unoptimized
    //             src='/assets/icons/common/speech-bubble.svg'
    //             alt='후기'
    //             width={16}
    //             height={16}
    //             draggable={false}
    //           />
    //           <p className='text-[13px] font-medium leading-[20px] -tracking-[0.03em] text-grey-70'>
    //             후기
    //           </p>
    //           <p className='text-[13px] font-medium leading-[20px] -tracking-[0.03em] text-grey-70'>
    //             {`${
    //               data.pages[0].recommendCompareProducts[refreshIndex].mainProduct?.reviewCount ?? 0
    //             }`}
    //           </p>
    //         </div>
    //         {/* 추천 비교 조합 상품 */}
    //         <p className='py-2.5 text-[14px] font-semibold leading-[22px] -tracking-[0.03em] text-grey-10'>
    //           추천 비교 조합 상품
    //         </p>
    //         <div className='flex items-center gap-1.5'>
    //           {(data.pages[0].recommendCompareProducts[refreshIndex].recommendProducts ?? []).map(
    //             (v, idx) => {
    //               return (
    //                 <Link
    //                   key={`recommend${idx}`}
    //                   href={{ pathname: '/product', query: { id: v.id } }}
    //                   className='relative aspect-square min-w-[calc((100%-12px)/3)]'
    //                 >
    //                   <Image
    //                     unoptimized
    //                     fill
    //                     draggable={false}
    //                     src={v.image ?? ''}
    //                     alt='product'
    //                     className='aspect-square min-w-[calc((100%-12px)/3)] rounded-lg object-cover'
    //                   />
    //                   <button
    //                     className='absolute right-1 top-1.5'
    //                     onClick={e => {
    //                       e.preventDefault();
    //                       if (v.isLike)
    //                         onDeleteSaveProductsMutate({ data: { productIds: [v.id ?? -1] } });
    //                       else onMutate({ data: { productId: v.id } });
    //                     }}
    //                   >
    //                     <Image
    //                       unoptimized
    //                       alt='bookmark'
    //                       width={24}
    //                       height={24}
    //                       src={
    //                         v.isLike
    //                           ? '/assets/icons/compare/compare-bookmark-on.svg'
    //                           : '/assets/icons/compare/compare-bookmark.svg'
    //                       }
    //                     />
    //                   </button>
    //                 </Link>
    //               );
    //             },
    //           )}
    //         </div>
    //         <button
    //           className='mt-[30px] flex h-[42px] w-full items-center justify-center gap-1 rounded-lg border border-grey-70'
    //           onClick={() => {
    //             const next = refreshIndex + 1;
    //             setRefreshIndex(
    //               next === data.pages[0]?.recommendCompareProducts?.length ? 0 : next,
    //             );
    //           }}
    //         >
    //           <Image
    //             unoptimized
    //             src='/assets/icons/common/refresh-24.svg'
    //             alt='refresh'
    //             width={24}
    //             height={24}
    //           />
    //           <p className='text-[14px] font-semibold -tracking-[0.03em] text-grey-10'>
    //             다른 상품 조합 보기
    //           </p>
    //           <div className='flex items-center pl-0.5'>
    //             <p className='text-[14px] font-semibold tabular-nums -tracking-[0.03em] text-primary-50'>
    //               {refreshIndex + 1}
    //             </p>
    //             <p className='text-[14px] font-semibold tabular-nums -tracking-[0.03em] text-grey-70'>
    //               {`/${data.pages[0].recommendCompareProducts.length}`}
    //             </p>
    //           </div>
    //         </button>
    //       </div>
    //     )}

    //   {/* 새로 나온 상품들을 바로 비교해봐요 */}
    //   <div className='mx-4 mt-[60px]'>
    //     <p className='text-[20px] font-bold leading-[30px] -tracking-[0.03em] text-grey-10'>
    //       새로 나온 상품들을 바로 비교해봐요
    //     </p>
    //     <p className='text-[14px] font-normal leading-[22px] -tracking-[0.03em] text-grey-60'>
    //       신상품들을 비교해보고 신선한 상태 그대로 즐겨보세요!
    //     </p>
    //     <div className='mt-5 grid grid-cols-2 gap-x-[11px] gap-y-5'>
    //       {(data?.pages[0]?.newCompareProduct?.products ?? []).map((v, idx) => {
    //         return (
    //           <CompareNewItem
    //             key={`new${idx}`}
    //             data={v}
    //             onMutate={onMutate}
    //             onDeleteSaveProductsMutate={onDeleteSaveProductsMutate}
    //           />
    //         );
    //       })}
    //     </div>
    //   </div>
    //   <div ref={ref} className='pb-10' />
    // </div>
  );
};

Compare.getLayout = page => (
  <Layout headerProps={{ disable: true }}>
    <DefaultSeo title='비교하기 | 바로피쉬' description='비교하기' />
    {page}
  </Layout>
);

export const getServerSideProps: GetServerSideProps = async () => {
  const { selectMain } = await client();
  return {
    props: { initialData: (await selectMain({ page: 1, take: perView })).data.data },
  };
};

export default Compare;
