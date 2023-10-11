import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { client } from 'src/api/client';
import Layout from 'src/components/common/layout';
import { ReviewForm } from 'src/components/review';
// import { RetouchReviewForm } from 'src/components/review/retouchForm';
import { BackButton } from 'src/components/ui';
import { queryKey } from 'src/query-key';
import { type NextPageWithLayout } from 'src/types/common';

const MypageReviewModify: NextPageWithLayout = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data } = useQuery(
    queryKey.review.detail(id),
    async () => {
      const res = await (await client()).selectReview(Number(id));

      if (res.data.isSuccess) {
        return res.data.data;
      } else {
        throw new Error(res.data.errorMsg);
      }
    },
    {
      enabled: !!id,
    },
  );
  console.log(data, '2');
  // subId={Number(subId)}
  return <ReviewForm />;
};

MypageReviewModify.getLayout = page => (
  <Layout className='flex flex-col' headerProps={{ disable: true }} footerProps={{ disable: true }}>
    <div className='flex flex-1 flex-col'>
      <header className='title-header'>
        <BackButton />
        <h2 className='font-semibold leading-[24px] -tracking-[0.03em] text-grey-10'>
          구매 후기 수정
        </h2>
        <div className='h-6 w-6' />
      </header>
      {page}
    </div>
  </Layout>
);

export default MypageReviewModify;
