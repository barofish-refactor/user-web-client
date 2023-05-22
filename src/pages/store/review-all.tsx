import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Layout from 'src/components/common/layout';
import { type NextPageWithLayout } from 'src/types/common';

/** 사진 전체보기 */
const ReviewAll: NextPageWithLayout = () => {
  const router = useRouter();
  // const { id } = router.query;

  return (
    <div className='max-md:w-[100vw]'>
      <div className='sticky top-0 z-50 flex h-[56px] items-center gap-3.5 bg-white px-4'>
        <button onClick={() => router.back()}>
          <Image src='/assets/icons/common/arrow-back.svg' alt='back' width={24} height={24} />
        </button>
        <p className='flex-1 text-center text-[16px] font-bold leading-[24px] -tracking-[0.03em] text-grey-10'>
          사진 전체보기
        </p>
        <div className='w-6' />
        {/* <Link href='/product/cart'>
          <Image src='/assets/icons/common/cart-title.svg' alt='cart' width={22} height={23} />
        </Link> */}
      </div>

      {/* content */}
      <div className='grid grid-cols-3 gap-[5px] p-4'>
        {[
          '/dummy/dummy-review-1.png',
          '/dummy/dummy-review-2.png',
          '/dummy/dummy-review-3.png',
          '/dummy/dummy-review-2.png',
          '/dummy/dummy-review-1.png',
          '/dummy/dummy-review-2.png',
          '/dummy/dummy-review-3.png',
          '/dummy/dummy-review-2.png',
          '/dummy/dummy-review-1.png',
          '/dummy/dummy-review-2.png',
          '/dummy/dummy-review-3.png',
          '/dummy/dummy-review-2.png',
          '/dummy/dummy-review-1.png',
          '/dummy/dummy-review-2.png',
          '/dummy/dummy-review-3.png',
          '/dummy/dummy-review-2.png',
          '/dummy/dummy-review-1.png',
          '/dummy/dummy-review-2.png',
          '/dummy/dummy-review-3.png',
          '/dummy/dummy-review-2.png',
          '/dummy/dummy-review-1.png',
          '/dummy/dummy-review-2.png',
          '/dummy/dummy-review-3.png',
          '/dummy/dummy-review-2.png',
        ].map((v, idx) => {
          return (
            <Link
              key={`review${idx}`}
              href={{ pathname: '/store/review', query: { id: 1 } }}
              className=''
            >
              <div className='relative aspect-square w-full overflow-hidden rounded-lg'>
                <Image fill src={v} alt='review' draggable={false} />
              </div>
            </Link>
          );
        })}
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
