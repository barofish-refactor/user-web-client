import { useQuery } from '@tanstack/react-query';
import { type GetServerSideProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { client } from 'src/api/client';
import { Tip } from 'src/api/swagger/data-contracts';
import Layout from 'src/components/common/layout';
import { BackButton } from 'src/components/ui';
import { queryKey } from 'src/query-key';
import { useAlertStore } from 'src/store';
import { type NextPageWithLayout } from 'src/types/common';
import cm from 'src/utils/class-merge';

interface Props {
  initialData: Tip[];
}

/** 알아두면 좋은 정보 */
const Tip: NextPageWithLayout<Props> = ({ initialData }) => {
  const { setAlert } = useAlertStore();

  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const variables: { type?: 'COMPARE' | 'BUY_TIP' | 'NEW_ONE' } = {
    type:
      selectedIndex === 0
        ? undefined
        : selectedIndex === 1
        ? 'COMPARE'
        : selectedIndex === 2
        ? 'BUY_TIP'
        : 'NEW_ONE',
  };

  const { data } = useQuery(
    queryKey.tipList.list(variables),
    async () => {
      const res = await (await client()).selectTipList(variables);
      if (res.data.isSuccess) {
        return res.data.data;
      } else {
        throw new Error(res.data.code + ': ' + res.data.errorMsg);
      }
    },
    {
      // enabled: !!selectedIndex,
      initialData,
    },
  );

  const { data: tipInfo } = useQuery(queryKey.tipInfo, async () => {
    const res = await (await client()).selectTipInfo();
    if (res.data.isSuccess) {
      return res.data.data;
    } else setAlert({ message: res.data.errorMsg ?? '' });
  });

  return (
    <div className='max-md:w-[100vw]'>
      {/* header */}
      <div className='sticky top-0 z-50 flex h-[56px] items-center gap-4 bg-white pl-4 pr-[18px]'>
        <BackButton />
        <div className='w-5' />
        <p className='flex-1 whitespace-pre text-center text-[16px] font-bold leading-[24px] -tracking-[0.03em] text-grey-10'>
          {tipInfo?.title ?? '알아두면 좋은 정보'}
        </p>
        <Link href='/compare/storage'>
          <Image
            unoptimized
            src='/assets/icons/common/bookmark-title.svg'
            alt='cart'
            width={24}
            height={24}
          />
        </Link>
        <Link href='/product/cart'>
          <Image
            unoptimized
            src='/assets/icons/common/cart-title.svg'
            alt='cart'
            width={22}
            height={23}
          />
        </Link>
      </div>

      {/* content */}
      <div className='flex items-center justify-center gap-[5px] px-[30px] py-4'>
        {['전체', '적극 비교 컨텐츠', '구매 TIP', '생소한 해산물'].map((v, idx) => {
          return (
            <button
              key={`tip${idx}`}
              className={cm(
                'flex h-8 items-center justify-center rounded-lg border border-grey-90 px-3',
                { 'border-0 bg-primary-50': selectedIndex === idx },
              )}
              onClick={() => {
                setSelectedIndex(idx);
              }}
            >
              <p
                className={cm(
                  'whitespace-pre text-[12px] font-semibold leading-[18px] -tracking-[0.03em] text-grey-50',
                  { 'text-white': selectedIndex === idx },
                )}
              >
                {v}
              </p>
            </button>
          );
        })}
      </div>
      <div className='flex flex-col gap-6 px-[40px] pb-[67px] pt-4'>
        {data?.map((v, idx) => {
          return (
            <Link
              key={`tip${idx}`}
              href={{ pathname: '/tip-detail', query: { id: v.id } }}
              className='relative aspect-[294/419] w-full overflow-hidden rounded-lg shadow-[0px_5px_10px_rgba(0,0,0,0.15)]'
            >
              <Image
                unoptimized
                width={294}
                height={419}
                src={v.image ?? ''}
                alt='tip'
                draggable={false}
                className='aspect-[294/419] w-full object-cover'
              />
              <div className='absolute inset-0 bg-[linear-gradient(180deg,rgba(111,111,111,0.9)0%,rgba(46,46,46,0.774)0.01%,rgba(67,67,67,0)59.58%)] px-5 py-6'>
                <p className='whitespace-pre-wrap break-keep text-[24px] font-bold leading-[36px] -tracking-[0.03em] text-white'>
                  {v.title}
                </p>
                <p className='mt-[5px] whitespace-pre-wrap break-keep text-[14px] font-medium leading-[22px] -tracking-[0.03em] text-white'>
                  {v.description}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

Tip.getLayout = page => (
  <Layout headerProps={{ disable: true }} footerProps={{ disable: true }}>
    {page}
  </Layout>
);

export const getServerSideProps: GetServerSideProps = async () => {
  const { selectTipList } = await client();
  return {
    props: { initialData: (await selectTipList()).data.data },
  };
};

export default Tip;
