import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { client } from 'src/api/client';
import Layout from 'src/components/common/layout';
import { MypageOrderListItem } from 'src/components/mypage/order';
import { BackButton } from 'src/components/ui';
import { queryKey } from 'src/query-key';
import { type NextPageWithLayout } from 'src/types/common';

/** 마이페이지 - 취소/환불/교환 내역 */
const MypageOrder: NextPageWithLayout = () => {
  const { data, isFetched } = useQuery(queryKey.order.list('canceled'), async () => {
    const res = await (await client()).selectCanceledOrderList();
    if (res.data.isSuccess) {
      return res.data;
    } else {
      throw new Error(res.data.code + ': ' + res.data.errorMsg);
    }
  });

  const { data: smartApi } = useQuery(
    ['smartApi'],
    async () => {
      const res = await (await client()).selectSmartDeliverApiKey();
      if (res.data.isSuccess) {
        return res.data.data;
      } else {
        throw new Error(res.data.errorMsg);
      }
    },
    {
      enabled: isFetched,
      staleTime: Infinity,
    },
  );

  return (
    <section className='pb-6'>
      <hr className='border-t-8 border-grey-90' />
      <article className='divide-y-8 divide-grey-90'>
        {data?.data && data.data.length === 0 ? (
          <div className='flex h-[calc(100dvb-200px)] items-center justify-center'>{Empty()}</div>
        ) : (
          data?.data?.map(v => (
            <MypageOrderListItem
              key={v.id}
              id={v.id}
              orderedAt={v.orderedAt}
              orderProducts={v.productInfos}
              apiKey={smartApi ?? ''}
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
      <Image
        unoptimized
        src='/assets/icons/search/search-error.svg'
        alt='up'
        width={40}
        height={40}
      />
      <p className='whitespace-pre text-center text-[14px] font-medium leading-[20px] -tracking-[0.05em] text-[#B5B5B5]'>
        취소/환불/교환 내역이 없습니다.
      </p>
    </div>
  );
}

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
