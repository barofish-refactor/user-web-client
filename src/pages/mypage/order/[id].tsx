import Layout from 'src/components/common/layout';
import { MypageOrderDetail } from 'src/components/mypage/order';
import { type NextPageWithLayout } from 'src/types/common';

/** 마이페이지/주문 내역/상세 */
const MypageOrderDynamic: NextPageWithLayout = () => {
  return <MypageOrderDetail />;
};

MypageOrderDynamic.getLayout = page => (
  <Layout footerProps={{ disable: true }} headerProps={{ disable: true }}>
    {page}
  </Layout>
);

export default MypageOrderDynamic;
