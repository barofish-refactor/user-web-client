import Layout from 'src/components/common/layout';
import { BackButton } from 'src/components/ui';
import { type NextPageWithLayout } from 'src/types/common';
import Image from 'next/image';
import { type ReviewDto } from 'src/api/swagger/data-contracts';
import { formatToLocaleString } from 'src/utils/functions';
import { ReviewItem } from 'src/components/review';

/* 
TODO Int 필요
*/

const dummyReviews: ReviewDto[] = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
}));

/** 마이페이지/구매 후기 */
const MypageReview: NextPageWithLayout = () => {
  const isEmpty = false;
  return (
    <div className='flex flex-1 flex-col'>
      <header className='title-header'>
        <BackButton />
        <h2 className='font-semibold leading-[24px] -tracking-[0.03em] text-grey-10'>구매 후기</h2>
        <div className='h-6 w-6' />
      </header>
      {isEmpty ? (
        <Empty />
      ) : (
        <div>
          <div className='flex items-center justify-between gap-2 px-4 py-2'>
            <h3 className='text-[14px] font-medium leading-[22px] -tracking-[0.03em]'>
              내가 쓴 후기
            </h3>
            <span className='text-[14px] font-medium leading-[22px] -tracking-[0.03em] text-primary-50'>
              총 {formatToLocaleString(dummyReviews.length)}건
            </span>
          </div>
          <article className='px-4'>
            {dummyReviews.map(v => (
              <ReviewItem key={v.id} isMine data={v} />
            ))}
          </article>
        </div>
      )}
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
    {page}
  </Layout>
);

export default MypageReview;
