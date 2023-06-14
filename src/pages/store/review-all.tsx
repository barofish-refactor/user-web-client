import { useInfiniteQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
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
    async ({ pageParam = 1 }) => {
      const res = await (type === 'product'
        ? client().selectReviewListWithProductId(Number(id), {
            page: pageParam,
            take: perView,
          })
        : client().selectReviewListWithStoreId1(Number(id), {
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
    <div className='max-md:w-[100vw]'>
      <div className='sticky top-0 z-50 flex h-[56px] items-center gap-3.5 bg-white px-4'>
        <BackButton />
        <p className='flex-1 text-center text-[16px] font-bold leading-[24px] -tracking-[0.03em] text-grey-10'>
          사진 전체보기
        </p>
        <div className='w-6' />
      </div>

      {/* content */}
      <div className='grid grid-cols-3 gap-[5px] p-4'>
        {(data?.pages ?? []).map(x =>
          (x?.content ?? []).map(v => {
            return (
              <Link
                key={`review${v.id}`}
                href={{ pathname: '/store/review', query: { id: 1 } }}
                className=''
              >
                <div className='relative aspect-square w-full overflow-hidden rounded-lg'>
                  <Image fill src={v.images?.[0] ?? ''} alt='review' draggable={false} />
                </div>
              </Link>
            );
          }),
        )}
        <div ref={ref} />
      </div>
    </div>
  );
};

ReviewAll.getLayout = page => (
  <Layout headerProps={{ disable: true }} footerProps={{ disable: true }}>
    {page}
  </Layout>
);

export default ReviewAll;
