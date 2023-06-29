import { useMutation } from '@tanstack/react-query';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FormProvider, useForm } from 'react-hook-form';
import { client } from 'src/api/client';
import { type UserLoginReq } from 'src/api/swagger/data-contracts';
import Layout from 'src/components/common/layout';
import { FormField, PasswordField, submitButtonClassName } from 'src/components/form';
import { AppleButton, KakaoButton, NaverButton } from 'src/components/signup';
import { useAlertStore } from 'src/store';
import { type NextPageWithLayout } from 'src/types/common';
import { setToken } from 'src/utils/functions';

type FormType = {
  email: string;
  password: string;
};

const Login: NextPageWithLayout = () => {
  const isIos = typeof window !== 'undefined' ? !!navigator.userAgent.match(/Mac OS X/i) : true;
  const router = useRouter();
  const { setAlert } = useAlertStore();
  const form = useForm<FormType>();
  const { handleSubmit } = form;
  const { mutateAsync: loginUser } = useMutation((args: UserLoginReq) => client().loginUser(args));

  const onSubmit = handleSubmit(data => {
    loginUser({ loginType: 'IDPW', loginId: data.email, password: data.password })
      .then(res => {
        if (res.data.isSuccess) {
          setToken(res.data.data);
          return true;
        } else {
          setAlert({ message: res.data.errorMsg ?? '' });
          return false;
        }
      })
      .then(res => {
        if (res) router.push('/');
      })
      .catch(console.error);
  });

  return (
    <div className='flex flex-1 flex-col justify-between pb-6 pt-[45px]'>
      <div className='relative px-6'>
        <button
          className='absolute -top-[38px] right-4'
          onClick={() => {
            router.back();
          }}
        >
          <Image
            src='/assets/icons/common/close-small-grey.svg'
            alt='close'
            width={38}
            height={38}
          />
        </button>
        <Image
          className='mx-auto'
          src='/assets/icons/sign/logo.svg'
          width={60}
          height={60}
          alt='logo'
        />
        <h1 className='mt-3 text-center text-[28px] font-semibold leading-[38px] -tracking-[0.3px] text-primary-50'>
          바로피쉬
        </h1>
        <FormProvider {...form}>
          <form className='mt-6 space-y-6' onSubmit={onSubmit}>
            <FormField
              fieldKey='email'
              label='이메일'
              placeholder='이메일을 입력해 주세요'
              options={{ required: { value: true, message: '이메일을 입력해주세요' } }}
            />
            <PasswordField
              label='비밀번호'
              fieldKey='password'
              placeholder='비밀번호를 입력해 주세요'
              options={{ required: { value: true, message: '비밀번호를 입력해 주세요' } }}
            />
            <button type='submit' className={clsx(submitButtonClassName, '[&]:h-12')}>
              로그인
            </button>
          </form>
        </FormProvider>
        <nav className='flex items-center justify-center gap-5 py-8 text-[14px] font-medium leading-[22px] -tracking-[0.03em] text-grey-20'>
          <Link href='/contact'>문의하기</Link>
          <div className='h-[14px] w-[1px] bg-[#f2f2f2]' />
          <Link href='/signup'>회원가입</Link>
        </nav>
        <div className='px-4'>
          <div className='relative flex justify-center'>
            <h3 className='z-[1] bg-white px-[14px] text-center text-[14px] font-medium leading-[22px] -tracking-[0.03em] text-grey-30'>
              SNS 계정으로 로그인
            </h3>
            <hr className='absolute left-0 top-1/2 w-full -translate-y-1/2 border-[#f1f1f1]' />
          </div>
          <div className='flex justify-center gap-4 pt-6'>
            <NaverButton />
            <KakaoButton />
            {
              // android 일 때 숨김
              isIos && <AppleButton />
            }
          </div>
        </div>
      </div>
      <div className='flex items-center justify-center gap-1 pt-10 text-[12px] font-medium leading-[18px] -tracking-[0.03em]'>
        <span className='text-grey-60'>비밀번호를 잊으셨나요?</span>
        <Link href='/reset-password' className='text-grey-20 underline underline-offset-2'>
          비밀번호 초기화
        </Link>
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
