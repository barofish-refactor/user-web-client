import { FormProvider, useForm } from 'react-hook-form';
import Layout from 'src/components/common/layout';
import { PhoneField, submitButtonClassName, type PhoneFormType } from 'src/components/form';
import { BackButton } from 'src/components/ui';
import { type NextPageWithLayout } from 'src/types/common';

const ResetPassword: NextPageWithLayout = () => {
  const form = useForm<PhoneFormType>();
  const {
    handleSubmit,
    formState: { dirtyFields },
  } = form;

  const isVerified = dirtyFields.verificationId;

  const onSubmit = handleSubmit(data => {
    console.log(data);
  });

  return (
    <div className='flex flex-1 flex-col'>
      <header className='title-header'>
        <BackButton />
        <h2 className='font-semibold leading-[24px] -tracking-[0.03em] text-grey-10'>
          비밀번호 초기화
        </h2>
        <div className='h-6 w-6' />
      </header>
      <FormProvider {...form}>
        <form className='flex flex-1 flex-col justify-between px-4 pb-6 pt-6' onSubmit={onSubmit}>
          <PhoneField />
          <button disabled={!isVerified} type='submit' className={submitButtonClassName}>
            확인
          </button>
        </form>
      </FormProvider>
    </div>
  );
};

ResetPassword.getLayout = page => (
  <Layout
    className='flex flex-1 flex-col'
    footerProps={{ disable: true }}
    headerProps={{ disable: true }}
  >
    {page}
  </Layout>
);

export default ResetPassword;
