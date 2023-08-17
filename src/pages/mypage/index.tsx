// import { GetServerSideProps } from 'next';
import { useQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import Image from 'next/image';
import Link, { type LinkProps } from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState, type ReactNode } from 'react';
import { client } from 'src/api/client';
import Layout from 'src/components/common/layout';
import { queryKey } from 'src/query-key';
import { useAlertStore } from 'src/store';
import { type NextPageWithLayout } from 'src/types/common';
import cm from 'src/utils/class-merge';
import { formatToLocaleString, requestPermission } from 'src/utils/functions';

/** 마이페이지 */
const MyPage: NextPageWithLayout = () => {
  const router = useRouter();
  const { id } = router.query;
  const { setAlert } = useAlertStore();
  const [recentData, setRecentData] = useState<string[]>([]); // 최근 본 상품

  const { data: user, isLoading } = useQuery(queryKey.user, async () => {
    const res = await (await client()).selectUserSelfInfo();
    if (res.data.isSuccess) {
      return res.data.data;
    } else {
      if (res.data.code === 'FORBIDDEN') {
        router.replace('/login');
        return;
      }
      setAlert({ message: res.data.errorMsg ?? '' });
      throw new Error(res.data.errorMsg);
    }
  });

  const { data: cartCount } = useQuery(
    queryKey.cartCount,
    async () => {
      const { countBasket } = await client();
      const res = await countBasket();
      return res.data.data;
    },
    { staleTime: Infinity },
  );

  const { data: banner } = useQuery(queryKey.banner, async () => {
    const res = await (await client()).selectMyPageBanner();
    if (res.data.isSuccess) {
      return res.data.data;
    } else {
      throw new Error(res.data.code + ': ' + res.data.errorMsg);
    }
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const result = localStorage.getItem('product') || '[]';
      setRecentData(JSON.parse(result));
    }
  }, []);

  useEffect(() => {
    if (id) {
      setAlert({
        message: '가상계좌 정보가 문자로 전송되었습니다.',
        type: 'success',
        onClick: () => router.replace('/mypage'),
      });
    }
  }, [id, router, setAlert]);

  return (
    <div className='max-md:w-[100vw]'>
      <div className='flex items-center justify-between px-4 pt-6'>
        <div className='flex flex-col items-start gap-1'>
          <Link href='/mypage/info' className='flex items-center'>
            <span
              className={clsx(
                'mr-2 inline-flex rounded border px-2 py-0.5 text-[12px] font-medium leading-[18px] -tracking-[0.03em]',
                {
                  'border-primary-60 text-primary-50': !user?.grade || user?.grade?.pointRate === 1,
                  'border-[#561BFF] text-[#561BFF]': user?.grade?.pointRate === 2,
                  'border-[#BA27FF] text-[#BA27FF]': user?.grade?.pointRate === 3,
                  'border-[#FF3868] text-[#FF3868]': user?.grade?.pointRate === 4,
                },
              )}
            >
              {user?.grade?.name ?? '멸치'}
            </span>
            <p className='mr-1 text-[20px] font-bold leading-[30px] -tracking-[0.03em] text-grey-10'>
              {!isLoading
                ? user?.nickname && user.nickname.length > 0
                  ? user.nickname
                  : '내 정보를 입력해주세요.'
                : ' '}
            </p>
            <Image
              unoptimized
              src='/assets/icons/common/chevron-category.svg'
              alt='chevron'
              width={24}
              height={24}
              className='rotate-90'
            />
          </Link>
          <div className='flex items-center gap-4 rounded bg-grey-90 px-2 py-0.5'>
            <span className='text-[13px] font-medium leading-[20px] -tracking-[0.03em] text-grey-20'>
              적립금
            </span>
            <strong className='font-semibold leading-[24px] -tracking-[0.03em] text-grey-20'>
              {formatToLocaleString(user?.point)}원
            </strong>
          </div>
        </div>
        <Image
          unoptimized
          alt='profile'
          width={54}
          height={54}
          className='aspect-square rounded-full object-cover'
          src={
            !!user?.profileImage ? user.profileImage : '/assets/icons/common/default-profile.png'
          }
        />
      </div>
      <div className='rounded-b-2xl px-4 pb-4 pt-6 shadow-[0px_4px_5px_rgba(0,0,0,0.04)]'>
        <div className='flex h-[61px] items-center justify-evenly rounded-lg bg-grey-90'>
          <Link href='/mypage/notification' className='flex w-[60px] flex-col items-center gap-0.5'>
            <strong className='text-[18px] font-bold leading-[21px] -tracking-[0.03em] text-grey-10'>
              {formatToLocaleString(user?.notificationCount)}
            </strong>
            <p className='text-[12px] font-normal leading-[18px] -tracking-[0.03em] text-grey-50'>
              알림
            </p>
          </Link>
          <div className='h-6 w-[1px] bg-[#E2E2E2]' />
          <Link href='/compare/storage' className='flex w-[60px] flex-col items-center gap-0.5'>
            <strong className='text-[18px] font-bold leading-[21px] -tracking-[0.03em] text-grey-10'>
              {formatToLocaleString(user?.saveProductCount)}
            </strong>
            <p className='text-[12px] font-normal leading-[18px] -tracking-[0.03em] text-grey-50'>
              저장함
            </p>
          </Link>
          <div className='h-6 w-[1px] bg-[#E2E2E2]' />
          <Link href='/product/cart' className='flex w-[60px] flex-col items-center gap-0.5'>
            <strong className='text-[18px] font-bold leading-[21px] -tracking-[0.03em] text-grey-10'>
              {formatToLocaleString(cartCount)}
            </strong>
            <p className='text-[12px] font-normal leading-[18px] -tracking-[0.03em] text-grey-50'>
              장바구니
            </p>
          </Link>
          <div className='h-6 w-[1px] bg-[#E2E2E2]' />
          <Link href='/mypage/recent' className='flex w-[60px] flex-col items-center gap-0.5'>
            <strong className='text-[18px] font-bold leading-[21px] -tracking-[0.03em] text-grey-10'>
              {formatToLocaleString(recentData.length)}
            </strong>
            <p className='text-[12px] font-normal leading-[18px] -tracking-[0.03em] text-grey-50'>
              최근본상품
            </p>
          </Link>
        </div>
      </div>
      {banner && banner.length > 0 && (
        <div className='p-4'>
          <button
            className={cm(
              'relative flex h-[140px] w-full flex-col items-start justify-between overflow-hidden rounded-lg px-4 pb-4 pt-6 text-start shadow-[0px_4px_10px_rgba(0,0,0,0.08)]',
              banner[0].link && banner[0].link.length > 0 ? 'cursor-pointer' : 'cursor-default',
            )}
            onClick={() => {
              const link = banner[0].link;
              const productionUrl = process.env.NEXT_PUBLIC_PRODUCTION_URL;

              if (link && link.length > 0) {
                if (link.includes(productionUrl))
                  return router.push(link.replace(productionUrl, ''));

                if (window.ReactNativeWebView) {
                  requestPermission('link', `${link}`);
                } else {
                  return window.open(`${link}`, '_blank');
                }
                return;
              }
            }}
          >
            <Image
              unoptimized
              fill
              priority
              draggable={false}
              src={banner[0].image ?? ''}
              alt=''
              className='aspect-[343/140] w-full object-cover'
            />
          </button>
        </div>
      )}
      <hr className='border-t-8 border-grey-90' />
      <NavLink href='/mypage/order'>주문내역</NavLink>
      <NavLink href='/mypage/order/refund'>취소 환불 교환 내역</NavLink>
      <NavLink href='/mypage/coupon'>쿠폰함</NavLink>
      <NavLink href='/mypage/pay-method'>결제수단 관리</NavLink>
      <NavLink href='/mypage/inquiry'>상품 문의내역</NavLink>
      <NavLink href='/mypage/review'>구매후기</NavLink>
      <hr className='border-t-8 border-grey-90' />
      <NavLink href='/mypage/notice'>공지사항</NavLink>
      <NavLink href='/mypage/faq'>FAQ</NavLink>
      <NavLink href='/contact'>1:1 문의</NavLink>
      <hr className='border-t-8 border-grey-90' />
      <NavLink href='/privacy'>개인정보처리 방침</NavLink>
      <NavLink href='/terms-of-service'>이용약관</NavLink>
      {/* <NavLink href='/marketing'>마케팅 수신 동의</NavLink> */}
    </div>
  );
};

MyPage.getLayout = page => <Layout headerProps={{ disable: true }}>{page}</Layout>;

// export const getServerSideProps: GetServerSideProps = async () => {
//   const { selectCategories } = client();
//   return {
//     props: { initialData: (await selectCategories()).data },
//   };
// };

export default MyPage;

function NavLink({ href, children }: { href?: LinkProps['href']; children?: ReactNode }) {
  const buttonClassName =
    'flex h-[56px] w-full items-center justify-between border-b border-b-grey-90 px-4 text-[16px] font-medium -tracking-[0.03em] text-grey-10';

  const innerElement = (
    <>
      {children}
      <Image
        unoptimized
        src='/assets/icons/common/chevron-mypage.svg'
        alt='chevron'
        width={24}
        height={24}
      />
    </>
  );

  if (href) {
    return (
      <Link href={href} className={buttonClassName}>
        {innerElement}
      </Link>
    );
  }
  return <div className={buttonClassName}>{innerElement}</div>;
}
