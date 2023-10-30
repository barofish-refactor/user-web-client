import { useInfiniteQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Fragment } from 'react';
import { useInView } from 'react-intersection-observer';
import { client } from 'src/api/client';
import Layout from 'src/components/common/layout';
import { BackButton } from 'src/components/ui';
import { queryKey } from 'src/query-key';
import { type NextPageWithLayout } from 'src/types/common';

const perView = 30;

/** 사진 전체보기 */
const ReviewAll: NextPageWithLayout = () => {
  const router = useRouter();
  const { id, type } = router.query;

  const { data, hasNextPage, fetchNextPage } = useInfiniteQuery(
    queryKey.review.list({ id, type }),
    async ({ pageParam = 0 }) => {
      if (pageParam === -1) return;
      const query = {
        page: pageParam,
        take: perView,
      };
      const res = await (type === 'product'
        ? (await client()).selectReviewListWithProductId(Number(id), query)
        : (await client()).selectReviewListWithStoreId1(Number(id), query));
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

  return (
    <div className='max-md:w-[100vw]'>
      <div className='sticky top-0 z-50 flex h-[56px] items-center gap-3.5 bg-white px-4'>
        <BackButton />
        <p className='flex-1 text-center text-[18px] font-bold leading-[24px] -tracking-[0.03em] text-grey-10'>
          사진 전체보기
        </p>
        <div className='w-6' />
      </div>

      {/* content */}
      {data?.pages
        .map(x => x?.content?.filter(v => v.images?.[0] !== ''))
        .map(x => x?.length ?? 0)
        .reduce((a, b) => a + b) === 0 ? (
        Empty()
      ) : (
        <div className='grid grid-cols-3 gap-[5px] p-4'>
          <Fragment>
            {data?.pages?.map(x =>
              x?.content
                ?.filter(v => v.images?.[0] !== '')
                .map(v => {
                  return (
                    <Link
                      key={`review${v.id}`}
                      href={{ pathname: '/store/review', query: { id: v.id } }}
                      className=''
                    >
                      <Image
                        unoptimized
                        width={110}
                        height={110}
                        src={v.images?.[0] ?? ''}
                        alt='review'
                        draggable={false}
                        className='aspect-square w-full overflow-hidden rounded-lg object-cover'
                      />
                    </Link>
                  );
                }),
            )}
            <div ref={ref} className='pb-10' />
          </Fragment>
        </div>
      )}
    </div>
  );
};

function Empty() {
  return (
    <div className='flex h-[100dvb] items-center justify-center'>
      <div className='mb-[100px] grid flex-1 place-items-center'>
        <div className='flex flex-col items-center gap-2'>
          <Image
            unoptimized
            src='/assets/icons/search/search-error.svg'
            alt='up'
            width={40}
            height={40}
          />
          <p className='whitespace-pre text-center text-[16px] font-medium leading-[20px] -tracking-[0.05em] text-[#B5B5B5]'>
            사진 후기가 없습니다.
          </p>
        </div>
      </div>
    </div>
  );
}

ReviewAll.getLayout = page => (
  <Layout headerProps={{ disable: true }} footerProps={{ disable: true }}>
    {page}
  </Layout>
);

export default ReviewAll;
