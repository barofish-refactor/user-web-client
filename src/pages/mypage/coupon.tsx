import { useMutation, useQuery } from '@tanstack/react-query';
import { deleteCookie } from 'cookies-next';
import { DefaultSeo } from 'next-seo';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { client } from 'src/api/client';
import { type Coupon } from 'src/api/swagger/data-contracts';
import Layout from 'src/components/common/layout';
import Skeleton from 'src/components/common/skeleton';
import { CouponList, CouponNav, CouponTotalCount, type CouponNavType } from 'src/components/coupon';
import { BackButton } from 'src/components/ui';
import { queryKey } from 'src/query-key';
import { useAlertStore } from 'src/store';
import { type NextPageWithLayout } from 'src/types/common';
import { VARIABLES } from 'src/variables';
const { ACCESS_TOKEN, REFRESH_TOKEN } = VARIABLES;
const MypageCoupon: NextPageWithLayout = () => {
  const [navType, setNavType] = useState<CouponNavType>('holding');
  const { setAlert } = useAlertStore();
  const router = useRouter();
  // 보유 쿠폰
  const {
    data: downloadedCoupon,
    refetch: downloadedRefetch,
    isLoading: isDownloaded,
  } = useQuery(queryKey.downloadedCoupon.lists, async () => {
    const res = await (await client()).selectDownloadedCoupon();
    if (res.data.isSuccess) {
      return res.data.data;
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
    }
  });

  // 발급 가능한 쿠폰
  const {
    data: canDownloadCoupon,
    refetch: canDownloadRefetch,
    isLoading: isCanDownload,
  } = useQuery(queryKey.canDownloadCoupon.lists, async () => {
    const res = await (await client()).selectCanDownloadCoupon();
    if (res.data.isSuccess) {
      return res.data.data;
    } else {
      throw new Error('[selectCanUseCoupon]' + res.data.code + ': ' + res.data.errorMsg);
    }
  });

  // 발급 받기
  const { mutateAsync: selectDownloadCoupon, isLoading: isAddLoading } = useMutation(
    async (id: number) => await (await client()).selectDownloadCoupon(id, {}),
  );
  const onSelectDownloadCouponMutate = ({ id }: { id: number }) => {
    if (isAddLoading) return;
    selectDownloadCoupon(id)
      .then(res => {
        if (res.data.isSuccess) {
          setAlert({ message: '쿠폰을 발급받았습니다.', type: 'success' });
          downloadedRefetch();
          canDownloadRefetch();
        } else setAlert({ message: res.data.errorMsg ?? '' });
      })
      .catch(error => console.log(error));
  };

  const data = navType === 'holding' ? downloadedCoupon ?? [] : canDownloadCoupon ?? [];
  if (isDownloaded && isCanDownload)
    return (
      <>
        <CouponNav navType={navType} setNavType={setNavType} />
        <Skeleton />
        <Skeleton />
      </>
    );
  return (
    <>
      <CouponNav navType={navType} setNavType={setNavType} />
      {data.length === 0 ? (
        <Empty navType={navType} />
      ) : (
        <>
          <CouponTotalCount className='mt-2' total={data.length} navType={navType} />
          <CouponList
            className='p-4 pb-6'
            list={data}
            isAvailable={navType === 'available'}
            onDownload={(value: Coupon) => {
              if (value.id && navType === 'available') {
                onSelectDownloadCouponMutate({ id: value.id });
              }
            }}
          />
        </>
      )}
    </>
  );
};

function Empty({ navType }: { navType: CouponNavType }) {
  return (
    <div className='grid flex-1 place-items-center bg-white'>
      <div className='flex flex-col items-center gap-2'>
        <Image
          unoptimized
          src='/assets/icons/search/search-error.svg'
          alt='up'
          width={40}
          height={40}
        />
        <p className='whitespace-pre text-center text-[16px] font-medium leading-[20px] -tracking-[0.05em] text-[#B5B5B5]'>
          {navType === 'holding' ? '보유중인 쿠폰이 없습니다.' : '발급 가능한 쿠폰이 없습니다.'}
        </p>
      </div>
    </div>
  );
}

MypageCoupon.getLayout = page => (
  <Layout className='flex flex-col' footerProps={{ disable: true }} headerProps={{ disable: true }}>
    <DefaultSeo title='쿠폰함 | 바로피쉬' description='coupon' />
    <div className='flex flex-1 flex-col'>
      <header className='title-header'>
        <BackButton />
        <h2 className='font-semibold leading-[24px] -tracking-[0.03em] text-grey-10'>쿠폰함</h2>
        <div className='h-6 w-6' />
      </header>
      <div className='flex flex-1 flex-col bg-[#f2f2f2]'>{page}</div>
    </div>
  </Layout>
);

export default MypageCoupon;
