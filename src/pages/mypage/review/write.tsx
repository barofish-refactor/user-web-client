import Layout from 'src/components/common/layout';
import { ReviewForm } from 'src/components/review';
import { BackButton } from 'src/components/ui';
import { type NextPageWithLayout } from 'src/types/common';

const MypageReviewWrite: NextPageWithLayout = () => {
  return <ReviewForm />;
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
