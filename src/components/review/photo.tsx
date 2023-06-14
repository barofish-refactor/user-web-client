import { useInfiniteQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { client } from 'src/api/client';
import { ReviewItem } from 'src/components/review';
import { queryKey } from 'src/query-key';
import cm from 'src/utils/class-merge';
import { formatToLocaleString } from 'src/utils/functions';
import { FreeMode } from 'swiper';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';

const perView = 10;

interface Props {
  id: number;
  type: 'store' | 'product';
}

/** 사진 후기 */
export function ReviewPhoto({ id, type }: Props) {
  const [selectedSort, setSelectedSort] = useState<number>(0); // 베스트순, 최신순

  const { data, hasNextPage, fetchNextPage } = useInfiniteQuery(
    queryKey.review.list({ id, type }),
    async ({ pageParam = 1 }) => {
      const res = await (type === 'product'
        ? client().selectReviewListWithProductId(id, {
            page: pageParam,
            take: perView,
          })
        : client().selectReviewListWithStoreId1(id, {
            page: pageParam,
            take: perView,
          }));
      if (res.data.isSuccess) {
        console.log('review:', res.data);
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

  const { ref } = useInView({
    initialInView: false,
    skip: !hasNextPage,
    onChange: inView => {
      if (inView) fetchNextPage();
    },
  });

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
              <Image src='/assets/icons/common/chevron.svg' alt='chevron' width={12} height={12} />
            </div>
          </Link>
        </div>
        <Swiper
          freeMode
          slidesPerView={3.5}
          modules={[FreeMode]}
          spaceBetween={11}
          className='mt-3.5'
          style={{
            marginLeft: '-16px',
            marginRight: '-16px',
            paddingLeft: '16px',
            paddingRight: '16px',
          }}
        >
          {(data?.pages ?? []).map(x =>
            (x?.content ?? []).map(v => {
              return (
                <SwiperSlide key={`reviews${v.id}`} className=''>
                  <Link href={{ pathname: '/store/review', query: { id: 1 } }}>
                    <div className='relative aspect-square w-full overflow-hidden rounded-lg'>
                      <Image fill src={v.images?.[0] ?? ''} alt='review' draggable={false} />
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
          data?.pages[0]?.totalPages ?? 0,
        )}개`}</p>
        <div className='flex items-center gap-[9px]'>
          <button className='' onClick={() => setSelectedSort(0)}>
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
          <button className='' onClick={() => setSelectedSort(1)}>
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
      <div className='pb-[100px] pl-[17px] pr-[15px]'>
        {(data?.pages ?? []).map(x =>
          (x?.content ?? []).map(v => <ReviewItem key={v.id} data={v} />),
        )}
        <div ref={ref} />
      </div>
    </div>
  );
}
