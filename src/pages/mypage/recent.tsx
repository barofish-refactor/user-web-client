import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, Fragment } from 'react';
import { client } from 'src/api/client';
import { ProductItem } from 'src/components/common';
import Layout from 'src/components/common/layout';
import { BackButton } from 'src/components/ui';
import { queryKey } from 'src/query-key';
import { type NextPageWithLayout } from 'src/types/common';

const MypageRecent: NextPageWithLayout = () => {
  const [recentData, setRecentData] = useState<string[]>([]); // 최근 본 상품

  const { data } = useQuery(
    queryKey.recent.list(recentData),
    async () => {
      const res = await (await client()).selectRecentViewList({ ids: recentData.join(',') });
      if (res.data.isSuccess) {
        return res.data.data;
      } else {
        throw new Error(res.data.code + ': ' + res.data.errorMsg);
      }
    },
    {
      enabled: !!recentData,
    },
  );

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const result = localStorage.getItem('product') || '[]';
      setRecentData(JSON.parse(result));
    }
  }, []);

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
      {(data ?? []).length > 0 ? (
        <article className='grid auto-rows-fr grid-cols-2 gap-x-[11px] gap-y-4 p-4'>
          {(data ?? []).map((v, i) => (
            <ProductItem key={i} dataDto={v} />
          ))}
        </article>
      ) : (
        <Fragment>{Empty()}</Fragment>
      )}
    </div>
  );
};

function Empty() {
  return (
    <div className='flex h-[100dvb] w-full items-center justify-center'>
      <div className='mb-[100px] grid flex-1 place-items-center'>
        <div className='flex flex-col items-center gap-2'>
          <Image
            unoptimized
            src='/assets/icons/search/search-error.svg'
            alt='up'
            width={40}
            height={40}
          />
          <p className='whitespace-pre text-center text-[14px] font-medium leading-[20px] -tracking-[0.05em] text-[#B5B5B5]'>
            최근 본 상품이 없습니다.
          </p>
        </div>
      </div>
    </div>
  );
}

MypageRecent.getLayout = page => (
  <Layout headerProps={{ disable: true }} footerProps={{ disable: true }}>
    {page}
  </Layout>
);

export default MypageRecent;
