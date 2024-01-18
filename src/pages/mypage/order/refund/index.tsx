import { useQuery } from '@tanstack/react-query';
import { DefaultSeo } from 'next-seo';
import Image from 'next/image';
import { client } from 'src/api/client';
import Layout from 'src/components/common/layout';
import Skeleton from 'src/components/common/skeleton';
import { MypageOrderListItem } from 'src/components/mypage/order';
import { BackButton } from 'src/components/ui';
import { queryKey } from 'src/query-key';
import { type NextPageWithLayout } from 'src/types/common';
import PullToRefresh from 'react-simple-pull-to-refresh';
import { handleRefresh } from 'src/utils/functions';
import Loading from 'src/components/common/loading';
import { useRouter } from 'next/router';
import { useAlertStore } from 'src/store';
import { deleteCookie } from 'cookies-next';
import { VARIABLES } from 'src/variables';
/** 마이페이지 - 취소/환불/교환 내역 */
const { ACCESS_TOKEN, REFRESH_TOKEN } = VARIABLES;
const MypageOrder: NextPageWithLayout = () => {
  const router = useRouter();

  const { setAlert } = useAlertStore();
  const { data, isLoading, isFetched } = useQuery(queryKey.order.list('canceled'), async () => {
    const res = await (await client()).selectCanceledOrderList();
    if (res.data.isSuccess) {
      return res.data;
    } else {
      if (res.data.code === '101' || res.data.code === '102') {
        setAlert({ message: res.data.errorMsg ?? '' });
        router.replace('/login');
        return;
      } else if (res.data.code === '103') {
        deleteCookie(ACCESS_TOKEN);
        deleteCookie(REFRESH_TOKEN);
        setAlert({ message: res.data.errorMsg ?? '' });
        router.replace('/login');
        return;
      }
      console.log(res.data.errorMsg);
      //
      throw new Error(res.data.errorMsg);
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
  if (isLoading) {
    return (
      <>
        <Skeleton />
        <Skeleton />
      </>
    );
  }

  return (
    <section className='pb-6'>
      <hr className='border-t-8 border-grey-90' />
      <PullToRefresh pullingContent='' refreshingContent={<Loading />} onRefresh={handleRefresh}>
        <article className='divide-y-8 divide-grey-90'>
          {data?.data && data.data.length === 0 ? (
            <div className='flex h-[calc(100dvb-100px)]  items-center justify-center'>
              {Empty()}
            </div>
          ) : (
            data?.data?.map(v => (
              // eslint-disable-next-line react/jsx-key
              <div key={v.id} className='flex h-[auto] w-full'>
                <MypageOrderListItem data={v} apiKey={smartApi ?? ''} />
              </div>
            ))
          )}
        </article>
      </PullToRefresh>
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
        취소/환불/교환 내역이 없습니다.
      </p>
    </div>
  );
}

MypageOrder.getLayout = page => (
  <Layout footerProps={{ disable: true }} headerProps={{ disable: true }}>
    <DefaultSeo title='취소/환불/교환 내역 | 바로피쉬' description='취소/환불/교환 내역' />
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
