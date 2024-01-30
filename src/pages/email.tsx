import { useMutation } from '@tanstack/react-query';
import clsx from 'clsx';
import { DefaultSeo } from 'next-seo';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FormProvider, useForm } from 'react-hook-form';
import { client } from 'src/api/client';
import { type UserLoginReq } from 'src/api/swagger/data-contracts';
import Layout from 'src/components/common/layout';
import { FormField, PasswordField, submitButtonClassName } from 'src/components/form';
import { BackButton } from 'src/components/ui';
import { useAlertStore } from 'src/store';
import { type NextPageWithLayout } from 'src/types/common';
import { setToken } from 'src/utils/functions';

type FormType = {
  email: string;
  password: string;
};

const Login: NextPageWithLayout = () => {
  const router = useRouter();
  const { setAlert } = useAlertStore();
  const form = useForm<FormType>();
  const { handleSubmit } = form;
  const { mutateAsync: loginUser } = useMutation(
    async (args: UserLoginReq) => await (await client()).loginUser(args),
  );

  const onSubmit = handleSubmit(data => {
    loginUser({ loginType: 'IDPW', loginId: data.email, password: data.password })
      .then(res => {
        if (res.data.isSuccess) {
          setToken(res.data.data);
          return true;
        } else {
          // setAlert({ message: res.response.data.data.errorMsg ?? '' });
          return false;
        }
      })
      .then(res => {
        if (res) {
          const getPaths = sessionStorage.getItem('Paths');
          const getPath = sessionStorage.getItem('Path');
          if (getPath) return router.push(getPath ? `${getPath}` : '/');
          if (getPaths) {
            const query = JSON.parse(getPaths);
            return router.push({
              pathname: '/product/order',
              query: { id: query?.id, options: query.options },
            });
          }
          if (!getPath && !getPaths) return router.push('/');
        }
      })
      .catch(err => setAlert({ message: err.response.data.errorMsg ?? '' }));
  });

  return (
    <>
      <DefaultSeo title='바로피쉬 | 이메일 로그인' description='이메일 로그인' />
      <div className='flex flex-1 flex-col'>
        <header className='title-header'>
          <BackButton />
          <h2 className='font-semibold leading-[24px] -tracking-[0.03em] text-grey-10'>
            이메일 로그인
          </h2>
          <div className='h-6 w-6' />
        </header>
        <FormProvider {...form}>
          <form className='flex flex-1 flex-col justify-between px-4' onSubmit={onSubmit}>
            <div className='mt-6 space-y-3'>
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
              <nav className='flex items-center justify-end gap-2.5 py-2 text-[13px] font-medium leading-[20px] -tracking-[0.03em] text-grey-40'>
                <Link href='/find-email'>이메일 찾기</Link>
                <div className='h-[14px] w-[1px] bg-[#f2f2f2]' />
                <Link href='/reset-password'>비밀번호 찾기</Link>
              </nav>
            </div>
            <div className='flex pb-6 pt-10'>
              <button type='submit' className={clsx(submitButtonClassName, '[&]:h-12')}>
                로그인
              </button>
            </div>
          </form>
        </FormProvider>
      </div>
    </>
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
