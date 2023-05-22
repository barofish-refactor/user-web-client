import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Layout from 'src/components/common/layout';
import ProductList from 'src/components/home/product-list';
import { type NextPageWithLayout } from 'src/types/common';
import { Swiper, type SwiperRef, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { FreeMode } from 'swiper';
import { useEffect, useRef, useState } from 'react';
import cm from 'src/utils/class-merge';
import { categoryList } from 'src/pages/category';

/** 검색 (카테고리, 큐레이션) */
const ProductResult: NextPageWithLayout = () => {
  const router = useRouter();
  const { id, title, subItemId } = router.query;

  const refSwiper = useRef<SwiperRef>(null);
  const [selectedTabIndex, setSelectedTabIndex] = useState<number>();

  useEffect(() => {
    if (id && subItemId) {
      const idx = categoryList
        .filter(x => x.id === Number(id))[0]
        .subItem.findIndex(x => x.id === Number(subItemId));
      setSelectedTabIndex(idx + 1);
      if (idx > 2) refSwiper.current?.swiper.slideTo(idx);
    } else {
      setSelectedTabIndex(0);
    }
  }, [id, subItemId]);

  return (
    <div className='max-md:w-[100vw]'>
      <div className='sticky top-0 z-50 flex h-[56px] items-center gap-3.5 bg-white px-4'>
        <button onClick={() => router.back()}>
          <Image src='/assets/icons/common/arrow-back.svg' alt='back' width={24} height={24} />
        </button>
        <p className='flex-1 text-center text-[16px] font-bold leading-[24px] -tracking-[0.03em] text-grey-10'>
          {title}
        </p>
        <Link href='/product/cart'>
          <Image src='/assets/icons/common/cart-title.svg' alt='cart' width={22} height={23} />
        </Link>
      </div>
      {id ? (
        <Swiper ref={refSwiper} freeMode slidesPerView={4} modules={[FreeMode]} className='mt-3'>
          {[{ id: -1, name: '전체보기' }]
            .concat(categoryList.filter(x => x.id === Number(id))[0].subItem)
            .map((v, idx) => {
              return (
                <SwiperSlide key={`mainTab${idx}`} className='h-full w-1/4'>
                  <button className='w-full' onClick={() => setSelectedTabIndex(idx)}>
                    <div className='flex h-full w-full flex-col justify-between'>
                      <p
                        className={cm(
                          'text-[16px] font-medium leading-[24px] -tracking-[0.03em] text-grey-50',
                          { 'font-semibold text-primary-50': selectedTabIndex === idx },
                        )}
                      >
                        {v.name}
                      </p>
                      <div
                        className={cm('h-[2.5px]', { 'bg-primary-50': selectedTabIndex === idx })}
                      />
                    </div>
                  </button>
                </SwiperSlide>
              );
            })}
        </Swiper>
      ) : null}
      <ProductList />
    </div>
  );
};

ProductResult.getLayout = page => (
  <Layout headerProps={{ disable: true }} footerProps={{ disable: true }}>
    {page}
  </Layout>
);

export default ProductResult;
