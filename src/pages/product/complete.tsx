import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Layout from 'src/components/common/layout';
import { type NextPageWithLayout } from 'src/types/common';
import * as gtag from 'src/utils/gtag';
import * as fpixel from 'src/utils/fpixel';
import { DefaultSeo } from 'next-seo';
/** 주문 완료 */
const Complete: NextPageWithLayout = () => {
  const router = useRouter();
  const [ga, setGa] = useState<any>();
  const [fp, setFp] = useState<any>();

  useEffect(() => {
    const LocalGaData: any = localStorage.getItem('ga');
    const LocalFpData: any = localStorage.getItem('fp');
    if (!LocalGaData && LocalFpData) return;
    const jsonGaData = JSON.parse(LocalGaData);
    const jsonFpData = JSON.parse(LocalFpData);

    setGa(jsonGaData);
    setFp(jsonFpData);
  }, []);

  const onComplete = () => {
    // 성공시 픽셀,ga

    fpixel.purchase({
      ...fp,
    });
    gtag.Purchase({
      ...ga,
    });
    localStorage.removeItem('ga');
    localStorage.removeItem('fp');
    router.replace('/');
  };

  return (
    <>
      <DefaultSeo title={`${ga?.name || '주문완료'} | 바로피쉬`} description='contect' />
      <div className='pb-[80px] max-md:w-[100vw]'>
        {/* header */}
        <div className='sticky top-0 z-50 flex h-[56px] items-center justify-center gap-3.5 bg-white px-4'>
          <p className='text-[18px] font-bold -tracking-[0.03em] text-grey-10'>주문하기</p>
        </div>
        <div className='flex w-full flex-col items-center pt-[120px]'>
          <Image src='/assets/icons/product/complete.svg' alt='complete' width={73} height={73} />
          <p className='mt-8 text-[25px] font-bold leading-[36px] -tracking-[0.03em] text-primary-50'>
            주문이 완료되었습니다!
          </p>
          <p className='mt-4 whitespace-pre text-center text-[18px] font-medium leading-[24px] -tracking-[0.03em] text-grey-50'>
            {`신선한 상품으로 빠르게 배송하겠습니다.\n이용해 주셔서 감사합니다.`}
          </p>
        </div>
        <div className='fixed bottom-0 z-50 w-[375px] px-4 pb-7 max-md:w-full'>
          <button
            className='flex h-[52px] w-full items-center justify-center rounded-lg bg-primary-50'
            onClick={onComplete}
          >
            <p className='text-[18px] font-bold -tracking-[0.03em] text-white'>쇼핑 계속하기</p>
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
