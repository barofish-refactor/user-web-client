import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { client } from 'src/api/client';
import Layout from 'src/components/common/layout';
import { AppleButton, KakaoButton, NaverButton } from 'src/components/signup';
import { queryKey } from 'src/query-key';
import { type NextPageWithLayout } from 'src/types/common';
import { requestPermission } from 'src/utils/functions';

const Login: NextPageWithLayout = () => {
  const router = useRouter();

  const { data: info } = useQuery(queryKey.partnerJoin, async () => {
    const res = await (await client()).selectSiteInfo('URL_PARTNER_JOIN');
    if (res.data.isSuccess) {
      return res.data.data;
    } else {
      throw new Error(res.data.code + ': ' + res.data.errorMsg);
    }
  });
  return (
    <div className='relative flex flex-1 flex-col justify-between pb-6 pt-[15dvb]'>
      <button
        className='absolute right-4 top-[7px] z-10'
        onClick={() => {
          router.back();
        }}
      >
        <Image
          unoptimized
          src='/assets/icons/common/close-small-grey.svg'
          alt='close'
          width={38}
          height={38}
        />
      </button>
      <div className='relative px-6'>
        <Image
          unoptimized
          draggable={false}
          className='mx-auto'
          src='/assets/icons/sign/logo-login.png'
          width={163}
          height={62}
          alt='logo'
        />
        <div className='mt-[46px] flex flex-col gap-[14px]'>
          <KakaoButton />
          <NaverButton />
          <AppleButton />
        </div>
        <div className='mt-[30px]'>
          <div className='relative flex justify-center'>
            <h3 className='z-[1] bg-white px-2 text-center text-[18px] font-medium leading-[22px] -tracking-[0.03em] text-[#C2C3C7]'>
              또는
            </h3>
            <hr className='absolute left-0 top-1/2 w-full -translate-y-1/2 border-[#D4D5D8]' />
          </div>
        </div>
        <div className='flex items-center justify-center gap-4 pt-[18px] text-[15px] font-medium leading-[22px] -tracking-[0.03em] text-grey-20'>
          <Link href='/email'>이메일 로그인</Link>
          <div className='h-4 w-[1px] bg-grey-80' />
          <Link href='/signup'>이메일 회원가입</Link>
          <div className='h-4 w-[1px] bg-grey-80' />
          <Link href='/reset-password'>비밀번호 찾기</Link>
        </div>
      </div>
      <div className='flex items-center justify-center gap-1.5 text-[16px] font-semibold leading-[20px] -tracking-[0.39px]'>
        <span className='text-grey-50'>산지 마켓 판매자이신가요?</span>
        <button
          className='text-grey-20 underline underline-offset-2'
          onClick={() => {
            if (info?.content) {
              if (window.ReactNativeWebView) requestPermission('link', info.content);
              else window.open(info.content);
            }
          }}
        >
          입점 문의하기
        </button>
      </div>
    </div>
  );
};

Login.getLayout = page => (
  <Layout
    className='flex flex-1 flex-col'
    headerProps={{ disable: true }}
    footerProps={{ disable: true }}
  >
    {page}
  </Layout>
);

export default Login;
