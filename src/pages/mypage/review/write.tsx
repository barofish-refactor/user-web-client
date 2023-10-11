import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { client } from 'src/api/client';
import Layout from 'src/components/common/layout';
import { ReviewForm } from 'src/components/review';
import { BackButton } from 'src/components/ui';
import { queryKey } from 'src/query-key';
import { useAlertStore } from 'src/store';
import { type NextPageWithLayout } from 'src/types/common';

const MypageReviewWrite: NextPageWithLayout = () => {
  const router = useRouter();
  const { v, subId } = router.query;
  const { setAlert } = useAlertStore();

  const { data } = useQuery(
    queryKey.order.detail(v as string),
    async () => {
      const res = await (await client()).selectOrder(v as string);
      if (res.data.isSuccess) {
        return res.data.data;
      } else {
        setAlert({ message: res.data.errorMsg ?? '' });
        throw new Error(res.data.errorMsg);
      }
    },
    {
      enabled: !!v,
    },
  );
  console.log(data, '1');
  return <ReviewForm order={data} subId={Number(subId)} />;
};

MypageReviewWrite.getLayout = page => (
  <Layout className='flex' headerProps={{ disable: true }} footerProps={{ disable: true }}>
    <div className='flex flex-1 flex-col'>
      <header className='title-header'>
        <BackButton />
        <h2 className='font-semibold leading-[24px] -tracking-[0.03em] text-grey-10'>리뷰 작성</h2>
        <div className='h-6 w-6' />
      </header>
      {page}
    </div>
  </Layout>
);

export default MypageReviewWrite;
