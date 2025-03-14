import { useInfiniteQuery } from '@tanstack/react-query';
import { DefaultSeo } from 'next-seo';
import Image from 'next/image';
import { Fragment } from 'react';
import { useInView } from 'react-intersection-observer';
import { client } from 'src/api/client';
import Layout from 'src/components/common/layout';
import Skeleton from 'src/components/common/skeleton';
// import { ReviewItem } from 'src/components/review';
import { NewReviewItem } from 'src/components/review/newItem';
import { LinkButton } from 'src/components/ui';
import { queryKey } from 'src/query-key';
import { type NextPageWithLayout } from 'src/types/common';
import { formatToLocaleString, handleRefresh } from 'src/utils/functions';
import PullToRefresh from 'react-simple-pull-to-refresh';
import Loading from 'src/components/common/loading';
import { useAlertStore } from 'src/store';
import { useRouter } from 'next/router';
import { deleteCookie } from 'cookies-next';
import { VARIABLES } from 'src/variables';
const take = 10;
const { ACCESS_TOKEN, REFRESH_TOKEN } = VARIABLES;
/** 마이페이지/구매 후기 */
const MypageReview: NextPageWithLayout = () => {
  const router = useRouter();

  const { setAlert } = useAlertStore();
  const { data, isLoading, hasNextPage, fetchNextPage, refetch } = useInfiniteQuery(
    queryKey.myReview,
    async ({ pageParam = 1 }) => {
      if (pageParam === -1) return;
      const res = await (await client()).selectMyReviewListV2({ page: pageParam, take });
      if (res.data.isSuccess) {
        return res.data.data;
      } else {
        if (res.data.code === '101' || res.data.code === '102') {
          setAlert({ message: res.data.errorMsg ?? '' });
          router.replace('/login');
          return;
        } else if (res.data.code === '103') {
          deleteCookie(ACCESS_TOKEN);
          deleteCookie(REFRESH_TOKEN);
          setAlert({ message: res.data.errorMsg ?? '' });
          router.replace('/login');
          return;
        }
        console.log(res.data.errorMsg);
        //
        throw new Error(res.data.errorMsg);
      }
    },
    {
      getNextPageParam: (lastPage, allPages) => {
        const nextId = allPages.length;

        // return lastPage?.content?.length !== 0 ? nextId : -1;
        return lastPage?.pagedReviews?.content?.length !== allPages[0]?.pagedReviews?.totalPages
          ? nextId + 1
          : -1;
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

  if (isLoading)
    return (
      <>
        <div className='flex items-center justify-between gap-2 border-b border-b-[#f2f2f2] px-4 py-2'>
          <h3 className='text-[16px] font-medium leading-[22px] -tracking-[0.03em]'>
            내가 쓴 후기
          </h3>
          <span className='text-[16px] font-medium leading-[22px] -tracking-[0.03em] text-primary-50'>
            loding...
          </span>
        </div>
        <Skeleton />
        <Skeleton />
      </>
    );
  // if (data?.pages?.length && data?.pages?.length <= 0) return <Empty />;
  if (data?.pages?.[0]?.pagedReviews?.empty) return <Empty />;
  return (
    <>
      <DefaultSeo title='구매후기' description='Review' />
      <PullToRefresh pullingContent='' refreshingContent={<Loading />} onRefresh={handleRefresh}>
        <div className='max-md:w-[100vw]'>
          <div className='flex items-center justify-between gap-2 border-b border-b-[#f2f2f2] px-4 py-2'>
            <h3 className='text-[16px] font-medium leading-[22px] -tracking-[0.03em]'>
              내가 쓴 후기
            </h3>
            <span className='text-[16px] font-medium leading-[22px] -tracking-[0.03em] text-primary-50'>
              총 {formatToLocaleString(data?.pages?.[0]?.reviewCount)}건
            </span>
          </div>
          <article className='px-4'>
            {data?.pages.map((v, i) => (
              <Fragment key={i}>
                {v?.pagedReviews?.content?.map((v, idx) => (
                  <NewReviewItem key={`${idx}${v?.productId}`} isMine data={v} refetch={refetch} />
                ))}
              </Fragment>
            ))}
            <div ref={ref} className='pb-10' />
          </article>
        </div>
      </PullToRefresh>
    </>
  );
};

function Empty() {
  return (
    <div className='grid h-[auto] flex-1 place-items-center'>
      <div className='flex flex-col items-center gap-2'>
        <Image
          unoptimized
          src='/assets/icons/search/search-error.svg'
          alt='up'
          width={40}
          height={40}
        />
        <p className='whitespace-pre text-center text-[16px] font-medium leading-[20px] -tracking-[0.05em] text-[#B5B5B5]'>
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
        <LinkButton link='/mypage' />
        <h2 className='font-semibold leading-[24px] -tracking-[0.03em] text-grey-10'>구매 후기</h2>
        <div className='h-6 w-6' />
      </header>
      {page}
    </div>
  </Layout>
);

export default MypageReview;
