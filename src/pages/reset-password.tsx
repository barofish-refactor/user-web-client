import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { FormProvider, useForm } from 'react-hook-form';
import { client } from 'src/api/client';
import { type ResetPasswordPayload } from 'src/api/swagger/data-contracts';
import { ContentType } from 'src/api/swagger/http-client';
import Layout from 'src/components/common/layout';
import { PhoneField, submitButtonClassName, type PhoneFormType } from 'src/components/form';
import { BackButton } from 'src/components/ui';
import { useAlertStore } from 'src/store';
import { type NextPageWithLayout } from 'src/types/common';
import { formatToBlob } from 'src/utils/functions';

const ResetPassword: NextPageWithLayout = () => {
  const router = useRouter();
  const form = useForm<PhoneFormType>();
  const { handleSubmit, watch, setFocus } = form;
  const { setAlert } = useAlertStore();

  const isVerified = !!watch('verificationId');

  const { mutateAsync: resetPassword, isLoading } = useMutation((args: ResetPasswordPayload) =>
    client().resetPassword(args, { type: ContentType.FormData }),
  );

  const onMutate = ({ data }: ResetPasswordPayload) => {
    if (isLoading) return;
    resetPassword({ data: formatToBlob<ResetPasswordPayload['data']>(data, true) })
      .then(res => {
        if (res.data.isSuccess) {
          setAlert({
            message: '비밀번호가 문자로 전송되었습니다.',
            type: 'success',
            onClick: () => {
              router.back();
            },
          });
        } else setAlert({ message: res.data.errorMsg ?? '' });
      })
      .catch(error => console.log(error));
  };

  const onSubmit = handleSubmit(data => {
    if (!data.verificationId) {
      setAlert({ message: '휴대폰 인증을 진행해 주세요.' });
      setFocus('verificationCode');
      return;
    }
    onMutate({
      data: {
        verificationId: data.verificationId,
        phone: data.phone,
      },
    });
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
