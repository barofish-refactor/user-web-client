import { type InfiniteData, useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { type GetServerSideProps } from 'next';
import { DefaultSeo } from 'next-seo';
import Image from 'next/image';
import { useInView } from 'react-intersection-observer';
import { client } from 'src/api/client';
import { type OrderDto } from 'src/api/swagger/data-contracts';
import Layout from 'src/components/common/layout';
import { MypageOrderListItem, MypageOrderStatistics } from 'src/components/mypage/order';
import { BackButton } from 'src/components/ui';
import { queryKey } from 'src/query-key';
import { useAlertStore } from 'src/store';
import { type NextPageWithLayout } from 'src/types/common';

const perView = 10;

interface Props {
  initialData: InfiniteData<OrderDto[]>;
}

/** 마이페이지/주문 내역 */
const MypageOrder: NextPageWithLayout<Props> = ({}) => {
  const { setAlert } = useAlertStore();
  const { data, hasNextPage, fetchNextPage, isFetched } = useInfiniteQuery(
    queryKey.order.lists,
    async ({ pageParam = 0 }) => {
      if (pageParam === -1) return;
      const res = await (
        await client()
      ).selectOrderList({
        page: pageParam,
        take: perView,
      });
      if (res.data.isSuccess) {
        return res.data.data;
      } else {
        setAlert({ message: res.data.code + ': ' + res.data.errorMsg });
        throw new Error(res.data.code + ': ' + res.data.errorMsg);
      }
    },
    {
      getNextPageParam: (lastPage, allPages) => {
        const nextId = allPages.length;
        return lastPage?.length !== 0 ? nextId : -1;
      },
    },
  );

  const { data: countData } = useQuery(['orderCount'], async () => {
    const res = await (await client()).selectOrderList1();
    if (res.data.isSuccess) return res.data.data;
  });
  const { data: deliveryDoneCount } = useQuery(['deliveryDoneCount'], async () => {
    const res = await (await client()).selectOrderList1({ state: 'DELIVERY_DONE,FINAL_CONFIRM' });
    if (res.data.isSuccess) return res.data.data;
  });
  const { data: cancelRefundCount } = useQuery(['cancelRefundCount'], async () => {
    const res = await (
      await client()
    ).selectOrderList1({
      state:
        'CANCELED,CANCEL_REQUEST,EXCHANGE_REQUEST,EXCHANGE_ACCEPT,REFUND_REQUEST,REFUND_ACCEPT,REFUND_DONE',
    });
    if (res.data.isSuccess) return res.data.data;
  });

  const { data: smartApi } = useQuery(
    ['smartApi'],
    async () => {
      const res = await (await client()).selectSmartDeliverApiKey();
      if (res.data.isSuccess) {
        return res.data.data;
      } else {
        setAlert({ message: res.data.errorMsg ?? '' });
        throw new Error(res.data.errorMsg);
      }
    },
    {
      enabled: isFetched,
      staleTime: Infinity,
    },
  );

  const { ref } = useInView({
    initialInView: false,
    skip: !hasNextPage,
    onChange: inView => {
      if (inView) fetchNextPage();
    },
  });

  return (
    <section className='pb-6'>
      <MypageOrderStatistics
        totalCount={countData}
        deliveryDoneCount={deliveryDoneCount ?? 0}
        cancelRefundCount={cancelRefundCount ?? 0}
      />
      <hr className='border-t-8 border-grey-90' />
      <article className='divide-y-8 divide-grey-90'>
        {!!countData && countData === 0 ? (
          <div className='flex h-[calc(100dvb-200px)] items-center justify-center'>{Empty()}</div>
        ) : (
          (data?.pages ?? []).map(x =>
            (x ?? []).map(v => <MypageOrderListItem key={v.id} data={v} apiKey={smartApi ?? ''} />),
          )
        )}
      </article>
      <div ref={ref} className='pb-10' />
    </section>
  );
};

function Empty() {
  return (
    <div className='flex flex-col items-center gap-2'>
      <Image
        unoptimized
        src='/assets/icons/search/search-error.svg'
        alt='up'
        width={40}
        height={40}
      />
      <p className='whitespace-pre text-center text-[16px] font-medium leading-[20px] -tracking-[0.05em] text-[#B5B5B5]'>
        주문 내역이 없습니다.
      </p>
    </div>
  );
}

MypageOrder.getLayout = page => (
  <Layout footerProps={{ disable: true }} headerProps={{ disable: true }}>
    <div>
      <DefaultSeo title='주문내역 | 바로피쉬' description='UserOrder' />
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
  const { selectOrderList } = await client();
  return {
    props: { initialData: (await selectOrderList()).data.data },
  };
};

export default MypageOrder;
