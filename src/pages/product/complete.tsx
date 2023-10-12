import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import Layout from 'src/components/common/layout';
import { useOrderDataStore } from 'src/store';
import { type NextPageWithLayout } from 'src/types/common';
import * as gtag from 'src/utils/gtag';
import * as fpixel from 'src/utils/fpixel';
import { DefaultSeo } from 'next-seo';
/** 주문 완료 */
const Complete: NextPageWithLayout = () => {
  const router = useRouter();
  const { orderData } = useOrderDataStore();
  console.log(orderData);

  const onComplete = () => {
    // 성공시 픽셀,ga

    const gaItme =
      orderData &&
      orderData?.data?.items?.map((ga: any) => {
        return {
          item_id: ga.item_id,
          item_name: ga.item_name,
          list_name: ga.list_name,
          item_category: ga.item_category,
          variant: ga.variant,
          affiliation: ga.affiliation,
          list_position: ga.list_position,
          item_brand: ga.item_brand,
          price: ga.price,
          quantity: ga.quantity,
        };
      });
    const fpItme =
      orderData &&
      orderData?.data?.itmes?.map((f: any) => {
        return {
          item_id: f.item_id,
          item_name: f.item_name,
          affiliation: f.affiliation,
          currency: f.currency,
          quantity: f.quantity,
          item_brand: f.item_brand,
          price: f.fpPrice,
        };
      });
    console.log(fpItme, 'fpItme');
    console.log(gaItme, 'gaItme');

    fpixel.purchase({
      content_id: orderData?.data.content_id,
      value: orderData?.data.fpValue,
      currency: 'KRW',
      content_type: orderData?.data.fpContent_type,
      contents: fpItme,
    });
    gtag.Purchase({
      action: 'purchase',
      value: orderData?.data.value,
      name: orderData?.data.name[0],
      category: orderData?.data.category,
      currency: orderData?.data.currency,
      transaction_id: orderData?.data.content_id,
      shipping: orderData?.data.shipping,
      tax: orderData?.data.tax,
      affiliation: '바로피쉬',
      items: gaItme,
    });
    router.replace('/');
  };

  return (
    <>
      <DefaultSeo
        title={`${orderData?.data.name[0] || '주문완료'} | 바로피쉬`}
        description='contect'
      />
      <div className='pb-[80px] max-md:w-[100vw]'>
        {/* header */}
        <div className='sticky top-0 z-50 flex h-[56px] items-center justify-center gap-3.5 bg-white px-4'>
          <p className='text-[16px] font-bold -tracking-[0.03em] text-grey-10'>주문하기</p>
        </div>
        <div className='flex w-full flex-col items-center pt-[120px]'>
          <Image src='/assets/icons/product/complete.svg' alt='complete' width={73} height={73} />
          <p className='mt-8 text-[24px] font-bold leading-[36px] -tracking-[0.03em] text-primary-50'>
            주문이 완료되었습니다!
          </p>
          <p className='mt-4 whitespace-pre text-center text-[16px] font-medium leading-[24px] -tracking-[0.03em] text-grey-50'>
            {`신선한 상품으로 빠르게 배송하겠습니다.\n이용해 주셔서 감사합니다.`}
          </p>
        </div>
        <div className='fixed bottom-0 z-50 w-[375px] px-4 pb-7 max-md:w-full'>
          <button
            className='flex h-[52px] w-full items-center justify-center rounded-lg bg-primary-50'
            onClick={onComplete}
          >
            <p className='text-[16px] font-bold -tracking-[0.03em] text-white'>쇼핑 계속하기</p>
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
