// import { GetServerSideProps } from 'next';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link, { type LinkProps } from 'next/link';
import { useRouter } from 'next/router';
import { type ReactNode } from 'react';
import { client } from 'src/api/client';
import Layout from 'src/components/common/layout';
import { queryKey } from 'src/query-key';
import { useAlertStore } from 'src/store';
import { type NextPageWithLayout } from 'src/types/common';
import { formatToLocaleString } from 'src/utils/functions';

/** 마이페이지 */
const MyPage: NextPageWithLayout = () => {
  const router = useRouter();
  const { setAlert } = useAlertStore();

  const { data: user } = useQuery(queryKey.user, async () => {
    const res = await client().selectUserSelfInfo();
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

  return (
    <div className='max-md:w-[100vw]'>
      <div className='flex items-center justify-between px-4 pt-6'>
        <Link href='/mypage/info' className='flex flex-col gap-0.5'>
          <div className='flex items-center gap-0.5'>
            <p className='text-[20px] font-bold leading-[30px] -tracking-[0.03em] text-grey-10'>
              {user?.nickname ?? '-'}
            </p>
            <Image
              src='/assets/icons/common/chevron-category.svg'
              alt='chevron'
              width={24}
              height={24}
              className='rotate-90'
            />
          </div>
          <p className='text-[14px] font-normal leading-[22px] -tracking-[0.03em] text-grey-60'>
            기본 정보보기
          </p>
        </Link>
        <Image
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
          <Link href='/mypage/review' className='flex w-[60px] flex-col items-center gap-0.5'>
            <p className='text-[18px] font-bold leading-[21px] -tracking-[0.03em] text-grey-10'>
              {formatToLocaleString(0)}
            </p>
            <p className='text-[12px] font-normal leading-[18px] -tracking-[0.03em] text-grey-50'>
              구매후기
            </p>
          </Link>
          <div className='h-6 w-[1px] bg-[#E2E2E2]' />
          <Link href='/mypage/notification' className='flex w-[60px] flex-col items-center gap-0.5'>
            <p className='text-[18px] font-bold leading-[21px] -tracking-[0.03em] text-grey-10'>
              {/* {formatToLocaleString((data ?? []).length)} */}0
            </p>
            <p className='text-[12px] font-normal leading-[18px] -tracking-[0.03em] text-grey-50'>
              알림
            </p>
          </Link>
          <div className='h-6 w-[1px] bg-[#E2E2E2]' />
          <Link href='/mypage/recent' className='flex w-[60px] flex-col items-center gap-0.5'>
            <p className='text-[18px] font-bold leading-[21px] -tracking-[0.03em] text-grey-10'>
              {formatToLocaleString(0)}
            </p>
            <p className='text-[12px] font-normal leading-[18px] -tracking-[0.03em] text-grey-50'>
              최근본상품
            </p>
          </Link>
        </div>
      </div>
      <div className='p-4'>
        <Link
          className='relative flex h-[140px] w-full flex-col items-start justify-between overflow-hidden rounded-lg bg-grey-10 px-4 pb-4 pt-6 text-start shadow-[0px_4px_10px_rgba(0,0,0,0.08)]'
          href={{
            pathname: '/search/product-result',
            query: { title: '지금이 딱인 제철 해산물 🦐', type: 'curation' },
          }}
        >
          <div className='z-20 flex flex-col'>
            <p className='text-[16px] font-semibold leading-[24px] -tracking-[0.03em] text-white'>
              지금이 딱인 제철 해산물 🦐
            </p>
            <p className='text-[12px] font-medium leading-[18px] -tracking-[0.03em] text-grey-70'>
              따뜻한 봄, 가장 맛있게 먹을 수 있는 봄철 해산물 어때요?
            </p>
          </div>
          <div className='z-20 flex items-center gap-1'>
            <p className='text-[12px] font-medium leading-[18px] -tracking-[0.03em] text-grey-60'>
              제철 해산물 보러가기
            </p>
            <Image
              src='/assets/icons/common/chevron-mypage.svg'
              alt='chevron'
              width={16}
              height={16}
            />
          </div>
        </Link>
      </div>
      <hr className='border-t-8 border-grey-90' />
      <NavLink href='/mypage/order'>주문내역</NavLink>
      <NavLink href='/mypage/order/refund'>취소 환불 교환 내역</NavLink>
      <NavLink href='/mypage/coupon'>쿠폰함</NavLink>
      {/* <NavLink href='/mypage/pay-method'>결제수단 관리</NavLink> */}
      <hr className='border-t-8 border-grey-90' />
      <NavLink href='/mypage/notice'>공지사항</NavLink>
      <NavLink href='/mypage/faq'>FAQ</NavLink>
      <NavLink href='/contact'>1:1 문의</NavLink>
      {/* <hr className='border-t-8 border-grey-90' /> */}
      <NavLink href='/privacy'>개인정보처리 방침</NavLink>
      <NavLink href='/terms-of-service'>이용약관</NavLink>
      <NavLink href='/marketing'>마케팅 수신 동의</NavLink>
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
      <Image src='/assets/icons/common/chevron-mypage.svg' alt='chevron' width={24} height={24} />
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
