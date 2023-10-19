import { useInfiniteQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { client } from 'src/api/client';
import { type Api } from 'src/api/swagger/Api';
import { ReviewItem } from 'src/components/review';
import { queryKey } from 'src/query-key';
import cm from 'src/utils/class-merge';
import { formatToLocaleString } from 'src/utils/functions';
import { FreeMode } from 'swiper';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';

type Instance = InstanceType<typeof Api>;
type RequestInstance = Instance['selectReviewListWithProductId'];
type Variables = NonNullable<Parameters<RequestInstance>>;

const perView = 10;

interface Props {
  id: number;
  type: 'store' | 'product';
}

/** 사진 후기 */
export function ReviewPhoto({ id, type }: Props) {
  // const queryClient = useQueryClient();
  const [selectedSort, setSelectedSort] = useState<number>(0); // 베스트순, 최신순

  const { data, hasNextPage, fetchNextPage, refetch } = useInfiniteQuery(
    queryKey.review.list({ id, type, selectedSort }),
    async ({ pageParam = 0 }) => {
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
        ? (await client()).selectReviewListWithProductId(...variables)
        : (await client()).selectReviewListWithStoreId1(...variables));
      if (res.data.isSuccess) {
        return res.data.data;
      } else {
        throw new Error(res.data.code + ': ' + res.data.errorMsg);
      }
    },
    {
      getNextPageParam: (lastPage, allPages) => {
        const nextId = allPages.length;
        return lastPage?.content?.length !== 0 ? nextId : -1;
      },
    },
  );

  const { ref } = useInView({
    initialInView: false,
    skip: !hasNextPage,
    onChange: inView => {
      if (inView) fetchNextPage();
    },
  });
  console.log(data);

  return (
    <div>
      <div className='px-4 pb-6 pt-5'>
        <div className='flex items-center justify-between'>
          <p className='text-[20px] font-bold leading-[30px] -tracking-[0.03em] text-grey-10'>
            사진 후기
          </p>
          <Link href={{ pathname: '/store/review-all', query: { id, type } }} className=''>
            <div className='flex h-[30px] items-center gap-1'>
              <p className='whitespace-nowrap text-[14px] font-medium leading-[22px] -tracking-[0.03em] text-grey-50'>
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
        <Swiper
          freeMode
          slidesPerView={3.5}
          modules={[FreeMode]}
          spaceBetween={11}
          className='mt-3.5'
          style={{ marginInline: '-16px', paddingInline: '16px' }}
        >
          {data?.pages?.map((x, i) =>
            x?.content
              ?.filter(v => v.images?.[0] !== '')
              .map((v, idx) => {
                return (
                  <SwiperSlide key={`reviews${i}${idx}${v.id}`} className=''>
                    <Link href={{ pathname: '/store/review', query: { id: v.id } }}>
                      <div className='relative overflow-hidden'>
                        <Image
                          unoptimized
                          width={100}
                          height={100}
                          src={v.images?.[0] ?? ''}
                          alt='review'
                          draggable={false}
                          className='aspect-square w-full rounded-lg object-cover'
                        />
                        <div
                          className='z-1 absolute bottom-[35px] left-[33.5px] rounded-full  p-[3px] text-white'
                          style={{ background: 'rgba(111, 111, 111, 0.65)' }}
                        >
                          +{v.images?.length}
                        </div>
                      </div>
                    </Link>
                  </SwiperSlide>
                );
              }),
          )}
        </Swiper>
      </div>
      <div className='h-2 bg-grey-90' />
      {/* 후기 리스트 */}
      <div className='flex flex-col gap-[29px] px-[17px] py-5'>
        <p className='text-[14px] font-bold leading-[20px] -tracking-[0.05em] text-grey-10'>{`후기 ${formatToLocaleString(
          data?.pages[0]?.totalElements ?? 0,
        )}개`}</p>
        <div className='flex items-center gap-[9px]'>
          <button onClick={() => setSelectedSort(0)}>
            <p
              className={cm(
                'text-[14px] font-medium leading-[20px] -tracking-[0.05em] text-grey-50',
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
                'text-[14px] font-medium leading-[20px] -tracking-[0.05em] text-grey-50',
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

      {(data?.pages ?? []).filter(x => (x?.content ?? []).length > 0).map(x => x?.content)
        .length === 0 ? (
        Empty()
      ) : (
        <div className='pb-[100px] pl-[17px] pr-[15px]'>
          {(data?.pages ?? []).map((x, i) =>
            (x?.content ?? []).map((v, idx) => (
              <ReviewItem key={`${i}${idx}${v.id}`} data={v} showInfo={false} refetch={refetch} />
            )),
          )}
          <div ref={ref} className='pb-10' />
        </div>
      )}
    </div>
  );
}

function Empty() {
  return (
    <div className='my-[100px] grid flex-1 place-items-center'>
      <div className='flex flex-col items-center gap-2'>
        <Image
          unoptimized
          src='/assets/icons/search/search-error.svg'
          alt='up'
          width={40}
          height={40}
        />
        <p className='whitespace-pre text-center text-[14px] font-medium leading-[20px] -tracking-[0.05em] text-[#B5B5B5]'>
          후기가 없습니다.
        </p>
      </div>
    </div>
  );
}
