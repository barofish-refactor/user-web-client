import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import Layout from 'src/components/common/layout';
import { type NextPageWithLayout } from 'src/types/common';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { FreeMode } from 'swiper';
import { calcDiscountPrice, formatToBlob, formatToLocaleString } from 'src/utils/functions';
import { CompareNewItem } from 'src/components/compare';
import { useInfiniteQuery, useMutation } from '@tanstack/react-query';
import { queryKey } from 'src/query-key';
import { client } from 'src/api/client';
import { type GetServerSideProps } from 'next';
import {
  type AddCompareSetPayload,
  type CompareMain,
  type SaveProductPayload,
} from 'src/api/swagger/data-contracts';
import { useInView } from 'react-intersection-observer';
import { useAlertStore, useToastStore } from 'src/store';
import { ContentType } from 'src/api/swagger/http-client';
import { useRouter } from 'next/router';

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

  const { data, hasNextPage, fetchNextPage } = useInfiniteQuery(
    queryKey.compareMain,
    async ({ pageParam = 1 }) => {
      const res = await client().selectMain({ page: pageParam, take: perView });
      if (res.data.isSuccess) {
        console.log(res.data.data);
        return res.data.data;
      } else {
        throw new Error(res.data.code + ': ' + res.data.errorMsg);
      }
    },
    {
      // staleTime: 0,
      getNextPageParam: (lastPage, allPages) => {
        const nextId = allPages.length;
        return nextId + 1;
      },
    },
  );

  const { mutateAsync: likeStoreByUser, isLoading } = useMutation((args: SaveProductPayload) =>
    client().saveProduct(args, { type: ContentType.FormData }),
  );

  const onMutate = ({ data }: SaveProductPayload) => {
    if (isLoading) return;
    likeStoreByUser({ data: formatToBlob<SaveProductPayload['data']>(data, true) })
      .then(res => {
        if (res.data.isSuccess) {
          setToast({
            text: '1개의 상품이 보관함에 담겼어요.',
            onClick: () => router.push('/compare/storage'),
          });
          // refetch();
        } else setAlert({ message: res.data.errorMsg ?? '' });
      })
      .catch(error => console.log(error));
  };

  const { mutateAsync: addCompareSet, isLoading: isAddLoading } = useMutation(
    (args: AddCompareSetPayload) => client().addCompareSet(args, {}),
  );

  const onAddCompareSetMutate = (args: AddCompareSetPayload) => {
    if (isAddLoading) return;
    addCompareSet(formatToBlob(args, true))
      .then(res => {
        if (res.data.isSuccess) {
          setAlert({ message: '보관함에 담았습니다.', type: 'success' });
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
    <div className='max-md:w-[100vw]'>
      <div className='sticky top-0 z-50 flex h-[56px] items-center gap-4 bg-white px-[18px]'>
        <div className='w-[60px]' />
        <p className='flex-1 text-center text-[16px] font-bold leading-[24px] -tracking-[0.03em] text-grey-10'>
          비교하기
        </p>
        <Link href='/compare/storage'>
          <Image
            src='/assets/icons/common/bookmark-title.svg'
            alt='bookmark'
            width={24}
            height={24}
          />
        </Link>
        <Link href='/product/cart'>
          <Image src='/assets/icons/common/cart-title.svg' alt='cart' width={22} height={23} />
        </Link>
      </div>
      <div className='px-4 pt-2.5'>
        <Link
          href='/search'
          className='flex h-10 w-full items-center gap-2 rounded-lg bg-grey-90 px-3'
        >
          <Image src='/assets/icons/common/search.svg' alt='search' width={24} height={24} />
          <p className='bg-grey-90 text-[14px] font-medium leading-[22px] -tracking-[0.03em] text-grey-70'>
            비교하고싶은 상품을 검색해주세요
          </p>
        </Link>
      </div>
      <div className='px-4 pt-[30px]'>
        <p className='text-[20px] font-bold leading-[30px] -tracking-[0.03em] text-grey-10'>
          인기있는 비교하기 조합
        </p>
        <p className='text-[14px] font-normal leading-[22px] -tracking-[0.03em] text-grey-60'>
          다른 분들은 이렇게 세트로 함께 많이 비교하고 있어요!
        </p>
      </div>

      <div className='mx-4'>
        <Swiper
          freeMode
          slidesPerView={1.1}
          modules={[FreeMode]}
          spaceBetween={16}
          style={{
            marginLeft: '-16px',
            marginRight: '-16px',
            paddingLeft: '16px',
            paddingRight: '16px',
          }}
        >
          {(data?.pages[0]?.popularCompareSets ?? []).map((set, idx) => {
            return (
              <SwiperSlide key={`compare${idx}`} className='pt-2.5'>
                {(set.products ?? []).map((v, i) => {
                  return (
                    <div
                      key={`product${i}`}
                      className='flex items-center gap-2.5 border-b border-b-grey-90 py-5 last-of-type:border-b-0'
                    >
                      <div className='relative'>
                        <Image
                          src={v.image ?? ''}
                          alt='product'
                          width={110}
                          height={110}
                          className='rounded-lg'
                        />
                        <button
                          className='absolute right-1 top-1.5'
                          onClick={() => onMutate({ data: { productId: v.id } })}
                        >
                          <Image
                            src='/assets/icons/compare/compare-bookmark.svg'
                            alt='bookmark'
                            width={24}
                            height={24}
                          />
                        </button>
                      </div>
                      <div className='flex-1'>
                        <p className='text-[14px] font-normal leading-[22px] -tracking-[0.03em] text-grey-10'>
                          {v.title ?? ''}
                        </p>
                        <div className='mt-0.5 flex items-center gap-0.5'>
                          <p className='text-[16px] font-bold leading-[24px] -tracking-[0.03em] text-teritory'>{`${15}%`}</p>
                          <p className='text-[16px] font-bold leading-[24px] -tracking-[0.03em] text-grey-10'>{`${formatToLocaleString(
                            calcDiscountPrice(v.originPrice, v.discountRate),
                          )}원`}</p>
                        </div>
                        <p className='-mt-0.5 text-start text-[13px] font-normal leading-[20px] -tracking-[0.03em] text-grey-60 line-through'>{`${formatToLocaleString(
                          v.originPrice,
                        )}원`}</p>
                        <div className='mt-1 flex items-center gap-0.5'>
                          <Image
                            src='/assets/icons/common/speech-bubble.svg'
                            alt='후기'
                            width={16}
                            height={16}
                            draggable={false}
                          />
                          <p className='text-[13px] font-medium leading-[20px] -tracking-[0.03em] text-grey-70'>
                            후기
                          </p>
                          <p className='text-[13px] font-medium leading-[20px] -tracking-[0.03em] text-grey-70'>{`${
                            v.reviewCount ?? 0
                          }`}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
                <button
                  className='mt-2.5 flex h-[42px] w-full items-center justify-center rounded-lg border border-grey-70'
                  onClick={() => {
                    onAddCompareSetMutate((set.products ?? []).map(x => x.id ?? -1));
                  }}
                >
                  <p className='text-[14px] font-semibold leading-[22px] -tracking-[0.03em] text-grey-10'>
                    이 조합으로 비교해보기
                  </p>
                </button>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>

      {data?.pages[0]?.recommendCompareProducts &&
        data?.pages[0]?.recommendCompareProducts.length > 0 && (
          <div className='mx-4 mt-[50px]'>
            <p className='text-[20px] font-bold leading-[30px] -tracking-[0.03em] text-grey-10'>
              이 상품, 이렇게 비교해보는건 어때요?
            </p>
            <p className='text-[14px] font-normal leading-[22px] -tracking-[0.03em] text-grey-60'>
              바로피쉬가 비교해보면 좋은 조합을 추천해드릴게요!
            </p>
            {/* 큰 상품 */}
            <div className='relative mt-5 aspect-square'>
              <Image
                fill
                src={data.pages[0].recommendCompareProducts[refreshIndex].mainProduct?.image ?? ''}
                alt='product'
                className='rounded-lg'
              />
              <button
                className='absolute right-2 top-3'
                onClick={() => {
                  //
                }}
              >
                <Image
                  src='/assets/icons/compare/compare-bookmark.svg'
                  alt='bookmark'
                  width={24}
                  height={24}
                />
              </button>
            </div>
            <p className='mt-2.5 text-[16px] font-normal leading-[24px] -tracking-[0.03em] text-grey-10'>
              {data.pages[0].recommendCompareProducts[refreshIndex].mainProduct?.title ?? ''}
            </p>
            <div className='mt-0.5 flex items-center gap-0.5'>
              <p className='text-[20px] font-bold leading-[30px] -tracking-[0.03em] text-teritory'>{`${
                data.pages[0].recommendCompareProducts[refreshIndex].mainProduct?.discountRate ?? 0
              }%`}</p>
              <p className='text-[20px] font-bold leading-[30px] -tracking-[0.03em] text-grey-10'>{`${formatToLocaleString(
                calcDiscountPrice(
                  data.pages[0].recommendCompareProducts[refreshIndex].mainProduct?.originPrice,
                  data.pages[0].recommendCompareProducts[refreshIndex].mainProduct?.discountRate,
                ),
              )}원`}</p>
            </div>
            <p className='-mt-0.5 text-start text-[14px] font-normal leading-[22px] -tracking-[0.03em] text-grey-60 line-through'>{`${formatToLocaleString(
              data.pages[0].recommendCompareProducts[refreshIndex].mainProduct?.originPrice ?? 0,
            )}원`}</p>
            <div className='mt-1 flex items-center gap-0.5'>
              <Image
                src='/assets/icons/common/speech-bubble.svg'
                alt='후기'
                width={16}
                height={16}
                draggable={false}
              />
              <p className='text-[13px] font-medium leading-[20px] -tracking-[0.03em] text-grey-70'>
                후기
              </p>
              <p className='text-[13px] font-medium leading-[20px] -tracking-[0.03em] text-grey-70'>
                {`${
                  data.pages[0].recommendCompareProducts[refreshIndex].mainProduct?.reviewCount ?? 0
                }`}
              </p>
            </div>
            {/* 추천 비교 조합 상품 */}
            <p className='py-2.5 text-[14px] font-semibold leading-[22px] -tracking-[0.03em] text-grey-10'>
              추천 비교 조합 상품
            </p>
            <div className='flex items-center gap-1.5'>
              {(data.pages[0].recommendCompareProducts[refreshIndex].recommendProducts ?? []).map(
                (v, idx) => {
                  return (
                    <div
                      key={`recommend${idx}`}
                      className='relative aspect-square min-w-[calc((100%-12px)/3)]'
                    >
                      <Image fill src={v.image ?? ''} alt='product' className='rounded-lg' />
                      <button
                        className='absolute right-1 top-1.5'
                        onClick={() => {
                          onMutate({ data: { productId: v.id } });
                        }}
                      >
                        <Image
                          src='/assets/icons/compare/compare-bookmark.svg'
                          alt='bookmark'
                          width={24}
                          height={24}
                        />
                      </button>
                    </div>
                  );
                },
              )}
            </div>
            <button
              className='mt-[30px] flex h-[42px] w-full items-center justify-center gap-1 rounded-lg border border-grey-70'
              onClick={() => {
                const next = refreshIndex + 1;
                setRefreshIndex(next === 5 ? 0 : next);
              }}
            >
              <Image
                src='/assets/icons/common/refresh-24.svg'
                alt='refresh'
                width={24}
                height={24}
              />
              <p className='text-[14px] font-semibold -tracking-[0.03em] text-grey-10'>
                다른 상품 조합 보기
              </p>
              <div className='flex items-center pl-0.5'>
                <p className='text-[14px] font-semibold tabular-nums -tracking-[0.03em] text-primary-50'>
                  {refreshIndex + 1}
                </p>
                <p className='text-[14px] font-semibold tabular-nums -tracking-[0.03em] text-grey-70'>
                  /5
                </p>
              </div>
            </button>
          </div>
        )}

      {/* 새로 나온 상품들을 바로 비교해봐요 */}
      <div className='mx-4 mt-[60px]'>
        <p className='text-[20px] font-bold leading-[30px] -tracking-[0.03em] text-grey-10'>
          새로 나온 상품들을 바로 비교해봐요
        </p>
        <p className='text-[14px] font-normal leading-[22px] -tracking-[0.03em] text-grey-60'>
          신상품들을 비교해보고 신선한 상태 그대로 즐겨보세요!
        </p>
        <div className='mt-5 grid grid-cols-2 gap-x-[11px] gap-y-5'>
          {(data?.pages[0]?.newCompareProduct?.products ?? []).map((v, idx) => {
            return <CompareNewItem key={`new${idx}`} data={v} onMutate={onMutate} />;
          })}
        </div>
      </div>
      <div ref={ref} />
    </div>
  );
};

Compare.getLayout = page => <Layout headerProps={{ disable: true }}>{page}</Layout>;

export const getServerSideProps: GetServerSideProps = async () => {
  const { selectMain } = client();
  return {
    props: { initialData: (await selectMain({ page: 1, take: perView })).data.data },
  };
};

export default Compare;
