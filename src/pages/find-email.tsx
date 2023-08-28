import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { FormProvider, useForm } from 'react-hook-form';
import { client } from 'src/api/client';
import { type FindEmailPayload } from 'src/api/swagger/data-contracts';
import { ContentType } from 'src/api/swagger/http-client';
import Layout from 'src/components/common/layout';
import { PhoneField, submitButtonClassName, type PhoneFormType } from 'src/components/form';
import { BackButton } from 'src/components/ui';
import { useAlertStore } from 'src/store';
import { type NextPageWithLayout } from 'src/types/common';
import { formatToBlob } from 'src/utils/functions';

const FindEmail: NextPageWithLayout = () => {
  const router = useRouter();
  const form = useForm<PhoneFormType>();
  const { handleSubmit, watch, setFocus } = form;
  const { setAlert } = useAlertStore();

  const isVerified = !!watch('verificationId');

  const { mutateAsync: findEmail, isLoading } = useMutation(
    async (args: FindEmailPayload) =>
      await (await client()).findEmail(args, { type: ContentType.FormData }),
  );

  const onMutate = ({ data }: FindEmailPayload) => {
    if (isLoading) return;
    findEmail({ data: formatToBlob<FindEmailPayload['data']>(data, true) })
      .then(res => {
        if (res.data.isSuccess) {
          setAlert({
            message: '휴대폰 문자로 이메일을\n보내드렸습니다.',
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
          이메일 찾기
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

FindEmail.getLayout = page => (
  <Layout
    className='flex flex-1 flex-col'
    footerProps={{ disable: true }}
    headerProps={{ disable: true }}
  >
    {page}
  </Layout>
);

export default FindEmail;
