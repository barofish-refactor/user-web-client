import { DefaultSeo } from 'next-seo';
import { useRouter } from 'next/router';
import Layout from 'src/components/common/layout';
import { MypageOrderDetail } from 'src/components/mypage/order';
import { type NextPageWithLayout } from 'src/types/common';

/** 마이페이지/주문 내역/상세 */
const MypageOrderDynamic: NextPageWithLayout = () => {
  const router = useRouter();
  const { id } = router.query;
  return <MypageOrderDetail id={id?.toString() ?? ''} />;
};

MypageOrderDynamic.getLayout = page => (
  <Layout footerProps={{ disable: true }} headerProps={{ disable: true }}>
    <DefaultSeo title='주문 상세 | 바로피쉬' description='OrderDetail' />
    {page}
  </Layout>
);

export default MypageOrderDynamic;
