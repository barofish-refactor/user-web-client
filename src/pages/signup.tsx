import { DefaultSeo } from 'next-seo';
import { useRouter } from 'next/router';
import Layout from 'src/components/common/layout';
import { SignupForm } from 'src/components/signup';
import { BackButton } from 'src/components/ui';
import { type NextPageWithLayout } from 'src/types/common';

const Signup: NextPageWithLayout = () => {
  const router = useRouter();
  const { v, name } = router.query;

  return (
    <>
      <DefaultSeo title='바로피쉬 | 회원가입' description='회원가입' />
      <div>
        <header className='title-header'>
          <BackButton />
          <h2 className='font-semibold leading-[24px] -tracking-[0.03em] text-grey-10'>회원가입</h2>
          <div className='h-6 w-6' />
        </header>
        <SignupForm appleId={v} name={name} />
      </div>
    </>
  );
};

Signup.getLayout = page => (
  <Layout footerProps={{ disable: true }} headerProps={{ disable: true }}>
    {page}
  </Layout>
);

export default Signup;
