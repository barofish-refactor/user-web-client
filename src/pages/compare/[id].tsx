import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import Layout from 'src/components/common/layout';
import { BackButton } from 'src/components/ui';
import { useAlertStore } from 'src/store';
import { type NextPageWithLayout } from 'src/types/common';

/** 비교하기 상세 */
const CompareDetail: NextPageWithLayout = () => {
  const router = useRouter();
  const { id } = router.query;
  const { setAlert } = useAlertStore();

  return (
    <div className='pb-[250px] max-md:w-[100vw]'>
      {/* header */}
      <div className='sticky top-0 z-50 flex h-[56px] items-center bg-white pl-4 pr-[18px]'>
        <BackButton />
        <p className='flex-1 text-center text-[16px] font-bold -tracking-[0.03em] text-grey-10'>
          비교하기
        </p>
        <Link href='/product/cart'>
          <Image src='/assets/icons/common/cart-title.svg' alt='cart' width={22} height={23} />
        </Link>
      </div>

      {}
    </div>
  );
};

CompareDetail.getLayout = page => (
  <Layout headerProps={{ disable: true }} footerProps={{ disable: true }}>
    {page}
  </Layout>
);

export default CompareDetail;
