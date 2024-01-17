import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { client } from 'src/api/client';
import { type Api } from 'src/api/swagger/Api';
import { ReviewItem } from 'src/components/review';
// import { NewReviewItem } from 'src/components/review/newItem';
import { queryKey } from 'src/query-key';
import cm from 'src/utils/class-merge';
import { formatToLocaleString } from 'src/utils/functions';
import { FreeMode } from 'swiper';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
type Instance = InstanceType<typeof Api>;
type RequestInstance = Instance['selectReviewListWithProductId'];
type Variables = NonNullable<Parameters<RequestInstance>>;

const perView = 3;

interface Props {
  id: number;
  type: 'store' | 'product';
}

/** 사진 후기 */
export function ReviewPhoto({ id, type }: Props) {
  // const queryClient = useQueryClient();
  const [selectedSort, setSelectedSort] = useState<number>(0); // 베스트순, 최신순
  const { data: imges } = useQuery(queryKey.reviewPhoto, async () => {
    const res = await (await client()).getProductReviewPhotos(id);
    if (res.data.isSuccess) {
      return res.data.data;
    } else {
      throw new Error(res.data.code + ': ' + res.data.errorMsg);
    }
  });

  const { data, fetchNextPage, refetch } = useInfiniteQuery(
    queryKey.review.list({ id, type, selectedSort }),
    async ({ pageParam = 1 }) => {
      if (pageParam === -1) return;
      const variables: Variables = [
        id,
        {
          page: pageParam,
          take: perView,
          orderType: selectedSort === 0 ? 'BEST' : 'RECENT',
        },
      ];
      const res = await (type === 'product'
        ? (await client()).getReviews(...variables)
        : (await client()).selectReviewListWithStoreIdV21(...variables));
      if (res.data.isSuccess) {
        return res.data.data;
      } else {
        throw new Error(res.data.code + ': ' + res.data.errorMsg);
      }
    },
    {
      cacheTime: 200,
      getNextPageParam: (lastPage, allPages) => {
        const nextId = allPages.length;

        // return lastPage?.content?.length !== 0 ? nextId : -1;
        return lastPage?.pagedReviews?.content?.length !== allPages[0]?.pagedReviews?.totalPages
          ? nextId + 1
          : -1;
      },
    },
  );

  // const { ref } = useInView({
  //   initialInView: false,
  //   skip: !hasNextPage,
  //   onChange: inView => {
  //     if (inView) fetchNextPage();
  //   },
  // });

  const [lastNumber, setLastNumber] = useState<number>(0);
  const [isBtn, setIsBtn] = useState<boolean>(false);
  const nextPageBtn = () => {
    if (data) {
      if (data.pages.length === lastNumber) {
        setIsBtn(true);
        return;
      } else {
        fetchNextPage();
      }
    }
  };

  useEffect(() => {
    if (data) refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (data && data.pages[0]?.pagedReviews) {
      const totalPages = data?.pages[0]?.pagedReviews?.totalPages as number;
      if (data.pages.length === lastNumber) {
        setIsBtn(true);
      } else {
        setLastNumber(totalPages);
      }
    }
  }, [data, lastNumber]);
  return (
    <div>
      <div className='px-4 pb-6 pt-5'>
        <div className='flex items-center justify-between'>
          <p className='text-[22px] font-bold leading-[30px] -tracking-[0.03em] text-grey-10'>
            사진 후기
          </p>
          <Link href={{ pathname: '/store/review-all', query: { id, type } }} className=''>
            <div className='flex h-[30px] items-center gap-1'>
              <p className='whitespace-nowrap text-[16px] font-medium leading-[22px] -tracking-[0.03em] text-grey-50'>
                전체보기
              </p>
              <Image
                unoptimized
                src='/assets/icons/common/chevron.svg'
                alt='chevron'
                width={12}
                height={12}
              />
            </div>
          </Link>
        </div>
        {imges === undefined ? (
          Empty(50, '사진')
        ) : (
          <Swiper
            freeMode
            slidesPerView={3.5}
            modules={[FreeMode]}
            spaceBetween={11}
            className='mt-3.5'
            style={{ marginInline: '-16px', paddingInline: '16px' }}
          >
            {imges &&
              imges.map((v: any, idx: number) => {
                return (
                  <SwiperSlide key={`reviews${idx}${v.reviewId}`} className=''>
                    <Link href={{ pathname: '/store/review', query: { id: v.reviewId } }}>
                      <div className='relative overflow-hidden'>
                        <Image
                          unoptimized
                          width={100}
                          height={100}
                          src={v?.imageUrls?.[0] ?? ''}
                          alt='review'
                          draggable={false}
                          className='aspect-square w-full rounded-lg object-cover'
                        />
                        {Number(v?.imageUrls.length) > 1 && (
                          <div
                            className='z-1 absolute bottom-[35px] left-[33.5px] rounded-full  px-[3.5px] py-[3px] text-white'
                            style={{ background: 'rgba(111, 111, 111, 0.65)' }}
                          >
                            +{Number(v?.imageUrls.length) - 1}
                          </div>
                        )}
                      </div>
                    </Link>
                  </SwiperSlide>
                );
              })}
          </Swiper>
        )}
      </div>
      <div className='h-2 bg-grey-90' />
      {/* 후기 리스트 */}
      <div className='flex flex-col gap-[29px] px-[17px] py-5'>
        <p className='text-[16px] font-bold leading-[20px] -tracking-[0.05em] text-grey-10'>{`후기 ${formatToLocaleString(
          data?.pages[0]?.pagedReviews?.totalElements ?? 0,
        )}개`}</p>
        <div className='flex items-center gap-[9px]'>
          <button onClick={() => setSelectedSort(0)}>
            <p
              className={cm(
                'text-[16px] font-medium leading-[20px] -tracking-[0.05em] text-grey-50',
                {
                  'font-bold text-primary-50': selectedSort === 0,
                },
              )}
            >
              베스트순
            </p>
          </button>
          <div className='h-5 w-[1px] bg-grey-80' />
          <button onClick={() => setSelectedSort(1)}>
            <p
              className={cm(
                'text-[16px] font-medium leading-[20px] -tracking-[0.05em] text-grey-50',
                {
                  'font-bold text-primary-50': selectedSort === 1,
                },
              )}
            >
              최신순
            </p>
          </button>
        </div>
      </div>
      <div className='h-[1px] bg-[#E2E2E2]' />
      {(data?.pages ?? [])
        .filter(x => (x?.pagedReviews?.content ?? []).length > 0)
        .map(x => x?.pagedReviews?.content).length === 0 ? (
        Empty(100)
      ) : (
        <div className='pb-[0px] pl-[17px] pr-[15px]'>
          {(data?.pages ?? []).map((x, i) =>
            (x?.pagedReviews?.content ?? []).map((v: any, idx: number) => (
              <ReviewItem key={`${i}${idx}${v.id}`} data={v} showInfo={false} refetch={refetch} />
            )),
          )}
          {/* <div ref={ref} className='pb-10' /> */}
        </div>
      )}
      {!isBtn && (
        <div className='mb-3  flex'>
          <button
            className='text-grey-50-50 m-[auto] flex   py-[5px] text-[16px] font-semibold text-grey-50'
            onClick={nextPageBtn}
          >
            <span className='mx-2'> 더보기</span>
            <Image
              unoptimized
              src='/assets/icons/common/chevron-footer.svg'
              alt='footer'
              width={13}
              height={8}
              className='rotate relative top-[6px]'
            />
          </button>
        </div>
      )}
    </div>
  );
}

function Empty(px?: number, text?: string) {
  return (
    <div className={`my-[${px}px] grid flex-1 place-items-center`}>
      <div className='flex flex-col items-center gap-2'>
        <Image
          unoptimized
          src='/assets/icons/search/search-error.svg'
          alt='up'
          width={40}
          height={40}
        />
        <p className='whitespace-pre text-center text-[16px] font-medium leading-[20px] -tracking-[0.05em] text-[#B5B5B5]'>
          {text} 후기가 없습니다.
        </p>
      </div>
    </div>
  );
}
