import { useMutation, useQuery } from '@tanstack/react-query';
import { type GetServerSideProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { client } from 'src/api/client';
import { type SimpleStore } from 'src/api/swagger/data-contracts';
import Layout from 'src/components/common/layout';
import { HomeProductList } from 'src/components/home';
import { StarIcon } from 'src/components/icons';
import { ReviewChart, ReviewPhoto } from 'src/components/review';
import { StoreTab } from 'src/components/store';
import { BackButton } from 'src/components/ui';
import { queryKey } from 'src/query-key';
import { useAlertStore } from 'src/store';
import { type NextPageWithLayout } from 'src/types/common';

interface Props {
  initialData: SimpleStore;
}

/** 스토어 상세 */
const StoreDetail: NextPageWithLayout<Props> = ({ initialData }) => {
  const router = useRouter();
  const { id } = router.query;
  const { setAlert } = useAlertStore();

  const { data, refetch } = useQuery(
    queryKey.store.detail(id),
    async () => {
      const res = await client().selectStore(Number(id));
      if (res.data.isSuccess) {
        return res.data.data;
      } else {
        throw new Error(res.data.code + ': ' + res.data.errorMsg);
      }
    },
    {
      enabled: !!id,
      initialData,
      staleTime: 0,
    },
  );

  const { mutateAsync: likeStoreByUser } = useMutation(
    (args: { storeId: number; type: 'LIKE' | 'UNLIKE' }) => client().likeStoreByUser(args),
  );

  const onMutate = ({ storeId, type }: { storeId: number; type: 'LIKE' | 'UNLIKE' }) => {
    likeStoreByUser({
      storeId,
      type,
    })
      .then(res => {
        console.log(res);
        if (res.data.isSuccess) {
          refetch();
        } else {
          setAlert({ message: res.data.errorMsg ?? '' });
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  const [selectedTab, setSelectedTab] = useState<number>(0);

  return (
    <div className='max-md:w-[100vw]'>
      {/* header */}
      <div className='sticky top-0 z-50 flex h-[56px] items-center justify-between gap-3.5 bg-white px-4'>
        <BackButton />
        <div className='flex items-center gap-4'>
          <button
            onClick={() => {
              onMutate({
                storeId: data?.storeId ?? -1,
                type: data?.isLike ? 'UNLIKE' : 'LIKE',
              });
            }}
          >
            {data?.isLike ? (
              <StarIcon isActive={true} />
            ) : (
              <Image src='/assets/icons/common/star.svg' alt='star' width={24} height={24} />
            )}
          </button>
          <Link href='/product/cart'>
            <Image src='/assets/icons/common/cart-title.svg' alt='cart' width={22} height={23} />
          </Link>
          <button
            onClick={() => {
              //
            }}
          >
            <Image src='/assets/icons/common/share.svg' alt='share' width={18} height={19} />
          </button>
        </div>
      </div>

      {/* banner */}
      <div className='relative aspect-[375/186] w-full'>
        <Image fill src={data?.backgroundImage ?? '/'} alt='banner' />
      </div>

      {/* info */}
      <div className='flex items-start justify-between pb-5 pl-[17px] pr-[21px] pt-4'>
        <div className='flex flex-1 items-center gap-3'>
          <Image
            src={data?.profileImage ?? '/'}
            alt='partner'
            width={83}
            height={83}
            className='rounded-full border border-grey-90'
            style={{ width: '83px', height: '83px' }}
          />
          <div className=''>
            <p className='text-[20px] font-bold leading-[30px] -tracking-[0.03em] text-grey-10'>
              {data?.name ?? ''}
            </p>
            <p className='text-[14px] font-semibold leading-[22px] -tracking-[0.03em] text-grey-30'>
              {data?.location ?? ''}
            </p>
            <div className='mt-[5px] flex gap-1'>
              {(data?.keyword ?? []).map((v, idx) => {
                return (
                  <div
                    key={`tag${idx}`}
                    className='flex h-[22px] items-center justify-center rounded bg-grey-90 px-2'
                  >
                    <p className='whitespace-pre text-[13px] font-medium -tracking-[0.03em] text-grey-40'>
                      {v}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div className='h-2 bg-grey-90' />
      {/* 구매자들의 솔직 리뷰 */}
      <ReviewChart
        data={{
          // totalCount: (data?.reviews ?? []).length,
          taste: 0,
          freshness: 0,
          price: 0,
          packaging: 0,
          size: 0,
        }}
      />
      <div className='mt-2.5 h-2 bg-grey-90' />
      <StoreTab data={data} selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      <div className='min-h-[calc(100dvb-95px)]'>
        {selectedTab === 0 ? (
          <></>
        ) : selectedTab === 1 ? (
          <HomeProductList data={[]} dataDto={data?.products ?? []} className='pt-[22px]' />
        ) : (
          // <ReviewPhoto data={[]} type='store' />
          <ReviewPhoto id={data?.storeId ?? -1} type='store' />
        )}
      </div>
    </div>
  );
};

StoreDetail.getLayout = page => (
  <Layout headerProps={{ disable: true }} footerProps={{ disable: true }}>
    {page}
  </Layout>
);

export const getServerSideProps: GetServerSideProps = async context => {
  const { id } = context.query;
  const { selectStore } = client();
  return {
    props: { initialData: (await selectStore(Number(id))).data.data },
  };
};

export default StoreDetail;
