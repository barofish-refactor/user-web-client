import Image from 'next/image';
import { useRouter } from 'next/router';
import Layout from 'src/components/common/layout';
import { ProductBanner } from 'src/components/product';
import { type NextPageWithLayout } from 'src/types/common';
import { formatToUtc, formatToLocaleString } from 'src/utils/functions';

/** 후기 상세보기 */
const Review: NextPageWithLayout = () => {
  const router = useRouter();
  // const { id } = router.query;

  return (
    <div className='max-md:w-[100vw]'>
      <div className='sticky top-0 z-50 flex h-[56px] items-center gap-3.5 bg-white px-4'>
        <button onClick={() => router.back()}>
          <Image src='/assets/icons/common/arrow-back.svg' alt='back' width={24} height={24} />
        </button>
        <p className='flex-1 text-center text-[16px] font-bold leading-[24px] -tracking-[0.03em] text-grey-10'>
          후기 상세보기
        </p>
        <div className='w-6' />
        {/* <Link href='/product/cart'>
          <Image src='/assets/icons/common/cart-title.svg' alt='cart' width={22} height={23} />
        </Link> */}
      </div>
      <ProductBanner isShowArrow />
      <div className='p-4'>
        <div className='flex items-center gap-1'>
          <p className='text-[14px] font-semibold leading-[22px] -tracking-[0.03em] text-grey-10'>
            닉네임
          </p>
          <div className='flex h-[22px] items-center justify-center rounded border border-[#6085EC] px-2'>
            <p className='text-[12px] font-medium -tracking-[0.03em] text-primary-50'>멸치</p>
          </div>
        </div>
        <p className='mt-[7px] truncate text-[14px] font-normal leading-[22px] -tracking-[0.03em] text-grey-60'>
          {`옵션 : ${'TextTextTextTextTextTextTextTextTextTextTextTextTextText'}`}
        </p>
        <p className='mt-4 text-[14px] font-normal leading-[22px] -tracking-[0.03em] text-grey-50'>
          TextTextTextTextTextTextTextTextTextTextTextText
          TextTextTextTextTextTextTextTextTextTextTextTextText TextTextTextTextTextTextTextTextText
        </p>
        <div className='mt-[18px] flex items-center justify-between'>
          <p className='text-[12px] font-medium leading-[18px] -tracking-[0.03em] text-grey-70'>{`${formatToUtc(
            new Date(),
            'yyyy.MM.dd',
          )}`}</p>
          <button
            className='flex h-8 items-center gap-1.5 rounded-full border border-grey-80 px-3.5'
            onClick={() => {
              //
            }}
          >
            <Image src='/assets/icons/product/review-like.svg' alt='like' width={12} height={13} />
            <p className='text-[12px] font-medium -tracking-[0.05em] text-grey-60'>도움돼요</p>
            <p className='text-[12px] font-medium -tracking-[0.05em] text-grey-60'>{`${formatToLocaleString(
              500,
            )}`}</p>
          </button>
        </div>
        <div className='mt-[15px] h-[1px] bg-[#F2F2F2]' />
      </div>
    </div>
  );
};

Review.getLayout = page => (
  <Layout headerProps={{ disable: true }} footerProps={{ disable: true }}>
    {page}
  </Layout>
);

export default Review;
