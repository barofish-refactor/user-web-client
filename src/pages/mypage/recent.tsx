import Link from 'next/link';
import { type Product } from 'src/api/swagger/data-contracts';
import { ProductItem } from 'src/components/common';
import Layout from 'src/components/common/layout';
import { BackButton } from 'src/components/ui';
import { type NextPageWithLayout } from 'src/types/common';

/* 
  TODO Int 필요
*/

const dummyProducts: Product[] = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  title: `[제목 예시] [산지 직송] 싱싱한 해산물 최고의 품질로 만나보세요!`,
  images: `[https://picsum.photos/seed/${i}/200/200]`,
  discountRate: 30,
  originPrice: 10000,
}));

const MypageRecent: NextPageWithLayout = () => {
  return (
    <div>
      <header className='title-header'>
        <BackButton />
        <h2 className='font-semibold leading-[24px] -tracking-[0.03em] text-grey-10'>
          최근 본 상품
        </h2>
        <Link
          href='/product/cart'
          className='ml-[1px] h-[23px] basis-[22px] bg-[url(/assets/icons/common/cart-title.svg)] bg-cover'
        />
      </header>
      <article className='grid auto-rows-fr grid-cols-2 gap-x-[11px] gap-y-4 p-4'>
        {dummyProducts.map(v => (
          <ProductItem key={v.id} data={v} />
        ))}
      </article>
    </div>
  );
};

MypageRecent.getLayout = page => (
  <Layout headerProps={{ disable: true }} footerProps={{ disable: true }}>
    {page}
  </Layout>
);

export default MypageRecent;
