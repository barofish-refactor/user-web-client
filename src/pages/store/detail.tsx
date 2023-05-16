import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Layout from 'src/components/common/layout';
import ProductList from 'src/components/home/product-list';
import { ProductReviewChart, ProductReviewPhoto } from 'src/components/product';
import { StoreTab } from 'src/components/store';
import { type NextPageWithLayout } from 'src/types/common';

const name = '서준수산';
const location = '전라남도 목포에 위치';
const tag = ['참병어', '먹갈치', '반건조병어'];

/** 스토어 상세 */
const StoreDetail: NextPageWithLayout = () => {
  const router = useRouter();
  // const { id } = router.query;

  const [selectedTab, setSelectedTab] = useState<number>(0);

  return (
    <div className='max-md:w-[100vw]'>
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

      {/* banner */}
      <div className='relative aspect-[375/186] w-full'>
        <Image fill src='/dummy/dummy-store-2.png' alt='banner' />
      </div>

      {/* info */}
      <div className='flex items-start justify-between pb-5 pl-[17px] pr-[21px] pt-[11px]'>
        <div className='mt-[5px] flex flex-1 items-center gap-3'>
          <Image
            src='/dummy/dummy-partner-1.png'
            alt='partner'
            width={83}
            height={83}
            className='rounded-full border border-grey-90'
          />
          <div className=''>
            <p className='text-[20px] font-bold leading-[30px] -tracking-[3%] text-grey-10'>
              {name}
            </p>
            <p className='text-[14px] font-semibold leading-[22px] -tracking-[3%] text-grey-30'>
              {location}
            </p>
            <div className='flex gap-1'>
              {tag.slice(0, 3).map((v, idx) => {
                return (
                  <div
                    key={`tag${idx}`}
                    className='flex h-[22px] items-center justify-center rounded bg-grey-90 px-2'
                  >
                    <p className='whitespace-pre text-[13px] font-medium -tracking-[3%] text-grey-40'>
                      {v}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <button
          onClick={() => {
            //
          }}
        >
          <Image src='/assets/icons/common/bookmark.svg' alt='bookmark' width={30} height={36} />
        </button>
      </div>
      <div className='h-2 bg-grey-90' />
      {/* 구매자들의 솔직 리뷰 */}
      <ProductReviewChart
        data={{
          totalCount: 129,
          taste: 30,
          freshness: 12,
          price: 21,
          packaging: 39,
          size: 27,
        }}
      />
      <div className='mt-2.5 h-2 bg-grey-90' />
      <StoreTab selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      <div className='min-h-[calc(100dvb-95px)]'>
        {selectedTab === 0 ? (
          <></>
        ) : selectedTab === 1 ? (
          <ProductList className='pt-[22px]' />
        ) : (
          <div>
            <ProductReviewPhoto />
          </div>
        )}
      </div>
    </div>
  );
};

StoreDetail.getLayout = page => (
  <Layout headerProps={{ disable: true }} footerProps={{ disable: true }}>
    {page}
  </Layout>
);

export default StoreDetail;
