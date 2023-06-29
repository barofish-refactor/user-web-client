import { useInfiniteQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { Fragment } from 'react';
import { useInView } from 'react-intersection-observer';
import { client } from 'src/api/client';
import Layout from 'src/components/common/layout';
import { ReviewItem } from 'src/components/review';
import { BackButton } from 'src/components/ui';
import { queryKey } from 'src/query-key';
import { type NextPageWithLayout } from 'src/types/common';
import { formatToLocaleString } from 'src/utils/functions';

const take = 10;

/** 마이페이지/구매 후기 */
const MypageReview: NextPageWithLayout = () => {
  const { data, isLoading, hasNextPage, fetchNextPage, refetch } = useInfiniteQuery(
    queryKey.myReview,
    async ({ pageParam = 1 }) => {
      const res = await client().selectMyReviewList({ page: pageParam, take });
      if (res.data.isSuccess) {
        return res.data.data;
      } else {
        throw new Error(res.data.code + ': ' + res.data.errorMsg);
      }
    },
    {
      getNextPageParam: (_lastPage, allPages) => {
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

  if (isLoading) return null;
  if (data?.pages?.[0]?.empty) return <Empty />;

  return (
    <div>
      <div className='flex items-center justify-between gap-2 border-b border-b-[#f2f2f2] px-4 py-2'>
        <h3 className='text-[14px] font-medium leading-[22px] -tracking-[0.03em]'>내가 쓴 후기</h3>
        <span className='text-[14px] font-medium leading-[22px] -tracking-[0.03em] text-primary-50'>
          총 {formatToLocaleString(data?.pages?.[0]?.totalElements)}건
        </span>
      </div>
      <article className='px-4'>
        {data?.pages.map((v, i) => (
          <Fragment key={i}>
            {v?.content?.map((v, idx) => (
              <ReviewItem key={`${idx}${v.id}`} isMine data={v} refetch={refetch} />
            ))}
          </Fragment>
        ))}
        <div ref={ref} />
      </article>
    </div>
  );
};

function Empty() {
  return (
    <div className='grid flex-1 place-items-center'>
      <div className='flex flex-col items-center gap-2'>
        <Image src='/assets/icons/search/search-error.svg' alt='up' width={40} height={40} />
        <p className='whitespace-pre text-center text-[14px] font-medium leading-[20px] -tracking-[0.05em] text-[#B5B5B5]'>
          구매 후기가 없습니다.
        </p>
      </div>
    </div>
  );
}

MypageReview.getLayout = page => (
  <Layout className='flex flex-col' headerProps={{ disable: true }} footerProps={{ disable: true }}>
    <div className='flex flex-1 flex-col'>
      <header className='title-header'>
        <BackButton />
        <h2 className='font-semibold leading-[24px] -tracking-[0.03em] text-grey-10'>구매 후기</h2>
        <div className='h-6 w-6' />
      </header>
      {page}
    </div>
  </Layout>
);

export default MypageReview;
