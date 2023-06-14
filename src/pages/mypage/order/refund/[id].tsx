import Layout from 'src/components/common/layout';
import { MypageOrderDetail } from 'src/components/mypage/order';
import { type NextPageWithLayout } from 'src/types/common';

/** 마이페이지/취소교환/환불 내역/상세 */
const MypageOrderRefundDynamic: NextPageWithLayout = () => {
  return <MypageOrderDetail />;
};

MypageOrderRefundDynamic.getLayout = page => (
  <Layout footerProps={{ disable: true }} headerProps={{ disable: true }}>
    {page}
  </Layout>
);

export default MypageOrderRefundDynamic;
