import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Layout from 'src/components/common/layout';
import { type NextPageWithLayout } from 'src/types/common';
import { DefaultSeo } from 'next-seo';
/** 주문 완료 */
const Complete: NextPageWithLayout = () => {
  const router = useRouter();

  const onComplete = () => {
    router.replace('/');
  };

  return (
    <>
      <DefaultSeo title='회원가입완료' description='회원가입 완료했습니다.' />
      <div className='pb-[80px] max-md:w-[100vw]'>
        {/* header */}
        <div className='sticky top-0 z-50 flex h-[56px] items-center justify-center gap-3.5 bg-white px-4'>
          <p className='text-[18px] font-bold -tracking-[0.03em] text-grey-10'>회원가입 완료</p>
        </div>
        <div className='flex w-full flex-col items-center pt-[120px]'>
          <Image src='/assets/icons/product/complete.svg' alt='complete' width={73} height={73} />
          <p className='mt-8 text-[25px] font-bold leading-[36px] -tracking-[0.03em] text-primary-50'>
            화원가입이 완료되었습니다!
          </p>
          <p className='mt-4 whitespace-pre text-center text-[18px] font-medium leading-[24px] -tracking-[0.03em] text-grey-50'>
            {`최선의 서비스를 제공하도록 노력하겠습니다.\n 회원가입 해주셔서 감사합니다.`}
          </p>
        </div>
        <div className='fixed bottom-0 z-50 w-[375px] px-4 pb-7 max-md:w-full'>
          <button
            className='flex h-[52px] w-full items-center justify-center rounded-lg bg-primary-50'
            onClick={onComplete}
          >
            <p className='text-[18px] font-bold -tracking-[0.03em] text-white'>로그인 하러가기</p>
          </button>
        </div>
      </div>
    </>
  );
};

Complete.getLayout = page => (
  <Layout headerProps={{ disable: true }} footerProps={{ disable: true }}>
    {page}
  </Layout>
);

export default Complete;
