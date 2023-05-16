import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Layout from 'src/components/common/layout';
import {
  ProductBanner,
  ProductCompare,
  ProductInformationDefault,
  ProductInquiry,
  ProductReview,
  ProductTab,
} from 'src/components/product';
import { StoreBottomSheet } from 'src/components/store';
import { type NextPageWithLayout } from 'src/types/common';

/** 상품 상세 */
const ProductDetail: NextPageWithLayout = () => {
  const router = useRouter();
  // const { id } = router.query;

  const [selectedTab, setSelectedTab] = useState<number>(0);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  return (
    <div className='pb-[80px] max-md:w-[100vw]'>
      {/* bottomSheet : 옵션 선택 */}
      <div className='sticky top-0 z-[100] w-full'>
        {isVisible && (
          <div className='absolute top-0 z-[100] flex h-[100dvb] w-full flex-col justify-end bg-black/50'>
            <StoreBottomSheet setIsVisible={setIsVisible} />
          </div>
        )}
      </div>

      {/* header */}
      <div className='sticky top-0 z-50 flex h-[56px] items-center justify-between gap-3.5 bg-white px-4'>
        <button onClick={() => router.back()}>
          <Image src='/assets/icons/common/arrow-back.svg' alt='back' width={24} height={24} />
        </button>
        <div className='flex items-center gap-4'>
          <button
            onClick={() => {
              //
            }}
          >
            <Image src='/assets/icons/common/cart-title.svg' alt='cart' width={22} height={23} />
          </button>
          <button
            onClick={() => {
              //
            }}
          >
            <Image src='/assets/icons/common/share.svg' alt='share' width={18} height={19} />
          </button>
        </div>
      </div>

      {/* content */}
      <ProductBanner />
      <ProductInformationDefault data={{}} />
      <ProductCompare />

      {/* Tab Content */}
      <ProductTab selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      <div className='min-h-[calc(100dvb-180px)]'>
        {selectedTab === 0 ? (
          <Image
            width='0'
            height='0'
            sizes='100vw'
            className='h-auto w-full'
            src='/dummy/dummy-product-detail-2.jpg'
            alt='상품상세'
            draggable={false}
          />
        ) : selectedTab === 1 ? (
          <ProductReview />
        ) : selectedTab === 2 ? (
          <ProductInquiry />
        ) : (
          <></>
        )}
      </div>

      {/* 하단 부분 */}
      <div className='fixed bottom-0 z-50 flex w-[375px] items-center gap-2 bg-white px-4 pb-5 pt-2 max-md:w-full'>
        <button
          className='flex h-[52px] w-[54px] items-center justify-center rounded-lg border border-grey-80'
          onClick={() => {
            setIsLiked(!isLiked);
          }}
        >
          {isLiked ? (
            <Image src='/assets/icons/product/heart-on.svg' alt='heart' width={30} height={30} />
          ) : (
            <Image src='/assets/icons/product/heart-off.svg' alt='heart' width={30} height={30} />
          )}
        </button>
        <button
          className='flex h-[52px] flex-1 items-center justify-center rounded-lg bg-primary-50'
          onClick={() => {
            setIsVisible(true);
          }}
        >
          <p className='text-[16px] font-bold -tracking-[3%] text-white'>구매하기</p>
        </button>
      </div>
    </div>
  );
};

ProductDetail.getLayout = page => (
  <Layout headerProps={{ disable: true }} footerProps={{ disable: true }}>
    {page}
  </Layout>
);

export default ProductDetail;
