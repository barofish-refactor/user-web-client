import { useQuery } from '@tanstack/react-query';
import { client } from 'src/api/client';
import Layout from 'src/components/common/layout';
import { MypageOrderListItem, MypageOrderStatistics } from 'src/components/mypage/order';
import { BackButton } from 'src/components/ui';
import { queryKey } from 'src/query-key';
import { type NextPageWithLayout } from 'src/types/common';

/** 마이페이지/주문 내역 */
const MypageOrder: NextPageWithLayout = () => {
  const { data } = useQuery(queryKey.order.lists, () => client().selectOrderList());

  return (
    <section className='pb-6'>
      <MypageOrderStatistics totalCount={0} deliveryDoneCount={0} cancelRefundCount={0} />
      <hr className='border-t-8 border-grey-90' />
      <article className='divide-y-8 divide-grey-90'>
        {data?.data.data?.map(v => (
          <MypageOrderListItem
            key={v.id}
            id={v.id}
            orderedAt={v.orderedAt}
            orderProducts={v.productInfos}
            totalPrice={0}
          />
        ))}
      </article>
    </section>
  );
};

MypageOrder.getLayout = page => (
  <Layout footerProps={{ disable: true }} headerProps={{ disable: true }}>
    <div>
      <header className='title-header'>
        <BackButton />
        <h2 className='font-semibold leading-[24px] -tracking-[0.03em] text-grey-10'>
          취소/환불/교환 내역
        </h2>
        <div className='h-6 w-6' />
      </header>
      {page}
    </div>
  </Layout>
);

export default MypageOrder;
