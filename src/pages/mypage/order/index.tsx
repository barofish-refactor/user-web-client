import { useQuery } from '@tanstack/react-query';
import { client } from 'src/api/client';
import { type OrderDto } from 'src/api/swagger/data-contracts';
import Layout from 'src/components/common/layout';
import { MypageOrderListItem, MypageOrderStatistics } from 'src/components/mypage/order';
import { BackButton } from 'src/components/ui';
import { queryKey } from 'src/query-key';
import { useAlertStore } from 'src/store';
import { type NextPageWithLayout } from 'src/types/common';

interface Props {
  initialData: OrderDto[];
}

/** 마이페이지/주문 내역 */
const MypageOrder: NextPageWithLayout<Props> = ({ initialData }) => {
  const { setAlert } = useAlertStore();
  const { data } = useQuery(
    queryKey.order.lists,
    async () => {
      const res = await client().selectOrderList();
      if (res.data.isSuccess) {
        return res.data.data;
      } else {
        setAlert({ message: res.data.errorMsg ?? '' });
        throw new Error(res.data.errorMsg);
      }
    },
    {
      initialData,
    },
  );

  return (
    <section className='pb-6'>
      <MypageOrderStatistics
        totalCount={data?.length}
        deliveryDoneCount={0}
        cancelRefundCount={0}
      />
      <hr className='border-t-8 border-grey-90' />
      <article className='divide-y-8 divide-grey-90'>
        {data?.map(v => (
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
        <h2 className='font-semibold leading-[24px] -tracking-[0.03em] text-grey-10'>주문 내역</h2>
        <div className='h-6 w-6' />
      </header>
      {page}
    </div>
  </Layout>
);

// export const getServerSideProps: GetServerSideProps = async () => {
//   const { selectOrderList } = client();
//   return {
//     props: { initialData: (await selectOrderList()).data.data },
//   };
// };

export default MypageOrder;
