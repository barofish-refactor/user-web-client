import { useQuery } from '@tanstack/react-query';
import { type GetServerSideProps } from 'next';
import Image from 'next/image';
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
      staleTime: 0,
    },
  );

  return (
    <section className='pb-6'>
      <MypageOrderStatistics
        totalCount={data?.length}
        deliveryDoneCount={
          data && data.length > 0
            ? data.filter(
                x =>
                  (x.productInfos?.filter(v =>
                    ['DELIVERY_DONE', 'FINAL_CONFIRM'].includes(v.state ?? ''),
                  ).length ?? 0) > 0,
              ).length
            : 0
        }
        cancelRefundCount={
          data && data.length > 0
            ? data.filter(
                x =>
                  (x.productInfos?.filter(v =>
                    [
                      'CANCELED',
                      'CANCEL_REQUEST',
                      'EXCHANGE_REQUEST',
                      'EXCHANGE_ACCEPT',
                      'REFUND_REQUEST',
                      'REFUND_ACCEPT',
                      'REFUND_DONE',
                    ].includes(v.state ?? ''),
                  ).length ?? 0) > 0,
              ).length
            : 0
        }
      />
      <hr className='border-t-8 border-grey-90' />
      <article className='divide-y-8 divide-grey-90'>
        {data && data.length === 0 ? (
          <div className='flex h-[calc(100dvb-200px)] items-center justify-center'>{Empty()}</div>
        ) : (
          data?.map(v => (
            <MypageOrderListItem
              key={v.id}
              id={v.id}
              orderedAt={v.orderedAt}
              orderProducts={v.productInfos}
            />
          ))
        )}
      </article>
    </section>
  );
};

function Empty() {
  return (
    <div className='flex flex-col items-center gap-2'>
      <Image src='/assets/icons/search/search-error.svg' alt='up' width={40} height={40} />
      <p className='whitespace-pre text-center text-[14px] font-medium leading-[20px] -tracking-[0.05em] text-[#B5B5B5]'>
        주문 내역이 없습니다.
      </p>
    </div>
  );
}

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

export const getServerSideProps: GetServerSideProps = async () => {
  const { selectOrderList } = client();
  return {
    props: { initialData: (await selectOrderList()).data.data },
  };
};

export default MypageOrder;
