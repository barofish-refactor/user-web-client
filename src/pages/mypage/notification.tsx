import { useInfiniteQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Fragment } from 'react';
import { useInView } from 'react-intersection-observer';
import { client } from 'src/api/client';
import Layout from 'src/components/common/layout';
import { BackButton } from 'src/components/ui';
import { queryKey } from 'src/query-key';
import { type NextPageWithLayout } from 'src/types/common';
import { distanceFromNow } from 'src/utils/functions';

const perView = 10;

const Notice: NextPageWithLayout = () => {
  const router = useRouter();
  const { data, hasNextPage, fetchNextPage } = useInfiniteQuery(
    queryKey.notification,
    async ({ pageParam = 0 }) => {
      if (pageParam === -1) return;
      const res = await (
        await client()
      ).selectNotification({
        page: pageParam,
        take: perView,
      });
      if (res.data.isSuccess) {
        return res.data.data;
      } else {
        throw new Error(res.data.code + ': ' + res.data.errorMsg);
      }
    },
    {
      // staleTime: 0,
      getNextPageParam: (lastPage, allPages) => {
        const nextId = allPages.length;
        return lastPage?.content?.length !== 0 ? nextId : -1;
      },
    },
  );

  const { ref } = useInView({
    initialInView: false,
    skip: !hasNextPage,
    onChange: inView => {
      if (inView) fetchNextPage();
    },
  });

  if (data?.pages?.[0]?.empty) return <Empty />;

  return (
    <div className='flex flex-col gap-[34px] px-4 pt-4'>
      {data?.pages.map((x, i) => (
        <Fragment key={i}>
          {x?.content?.map(v => {
            const type = v.type as unknown as string;
            const icon =
              type === 'REVIEW'
                ? '/assets/icons/notice/notice-review.svg'
                : type === 'COUPON'
                ? '/assets/icons/notice/notice-coupon.svg'
                : '/assets/icons/notice/notice-delivery.svg';

            return (
              <button
                key={v.id}
                className='text-start'
                onClick={() => {
                  switch (v.type) {
                    case 'ADMIN':
                      break;
                    case 'COUPON':
                      router.push('/mypage/coupon');
                      break;
                    case 'DELIVERY':
                    case 'ORDER':
                      router.push('/mypage/order');
                      break;
                    case 'REVIEW':
                      router.push('/mypage/review');
                      break;
                    default:
                      break;
                  }
                }}
              >
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-2'>
                    <Image unoptimized src={icon} alt='' width={24} height={24} />
                    <p className='text-[16px] font-semibold leading-[24px] -tracking-[0.03em] text-grey-10'>
                      {v.title}
                    </p>
                  </div>
                  <p className='text-[14px] font-medium leading-[22px] -tracking-[0.03em] text-grey-70'>
                    {/* {`${formatToUtc(v.createdAt, 'M월 d일')}`} */}
                    {v.createdAt ? distanceFromNow(v.createdAt) : ''}
                  </p>
                </div>
                <p
                  dangerouslySetInnerHTML={{ __html: v.content ?? '' }}
                  className='pl-8 pt-2.5 text-[14px] font-normal leading-[22px] -tracking-[0.03em] text-grey-10'
                />
              </button>
            );
          })}
        </Fragment>
      ))}
      <div ref={ref} />
    </div>
  );
};

function Empty() {
  return (
    <div className='grid flex-1 place-items-center'>
      <div className='flex flex-col items-center gap-2'>
        <Image
          unoptimized
          src='/assets/icons/common/error.svg'
          alt='error'
          width={40}
          height={40}
        />
        <p className='whitespace-pre text-center text-[14px] font-medium leading-[24px] -tracking-[0.05em] text-[#B5B5B5]'>
          {`등록된 알림이 없습니다.\n알림이 오면 빠르게 알려드리겠습니다 :)`}
        </p>
      </div>
    </div>
  );
}

Notice.getLayout = page => (
  <Layout className='flex flex-col' headerProps={{ disable: true }} footerProps={{ disable: true }}>
    <div className='flex flex-1 flex-col'>
      <div className='sticky top-0 z-50 flex h-[56px] items-center justify-between gap-3.5 bg-white px-4'>
        <BackButton />
        <p className='text-[16px] font-bold -tracking-[0.03em] text-grey-10'>알림</p>
        <div className='w-6' />
      </div>
      {page}
    </div>
  </Layout>
);

export default Notice;
