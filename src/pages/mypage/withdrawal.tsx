import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import clsx from 'clsx';
import { deleteCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { client } from 'src/api/client';
import Layout from 'src/components/common/layout';
import { submitButtonClassName } from 'src/components/form';
import { BackButton, Checkbox } from 'src/components/ui';
import { queryKey } from 'src/query-key';
import { getServerSidePolicy } from 'src/server';
import { useAlertStore } from 'src/store';
import { type NextPageWithLayout } from 'src/types/common';
import { requestPermission } from 'src/utils/functions';
import { VARIABLES } from 'src/variables';

export const getServerSideProps = getServerSidePolicy('HTML_WITHDRAW');

const MypageWithdrawal: NextPageWithLayout = () => {
  const { setAlert } = useAlertStore();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isAgree, setIsAgree] = useState(false);
  const [content, setContent] = useState<string>('');

  const { data } = useQuery(queryKey.withdraw, async () => {
    const res = await (await client()).selectSiteInfo('HTML_WITHDRAW');
    if (res.data.isSuccess) {
      return res.data.data;
    } else {
      throw new Error(res.data.code + ': ' + res.data.errorMsg);
    }
  });

  const { mutateAsync: withdrawUser, isLoading: isMutateLoading } = useMutation(
    async () => await (await client()).withdrawUser(),
  );

  const onWithdrawal = () => {
    if (isMutateLoading) return;
    withdrawUser()
      .then(res => {
        if (res.data.isSuccess) {
          setAlert({
            message: '탈퇴처리되었습니다.',
            onClick: () => {
              deleteCookie(VARIABLES.ACCESS_TOKEN);
              deleteCookie(VARIABLES.REFRESH_TOKEN);
              queryClient.clear();
              router.replace('/login');
              requestPermission('withdraw', '');
              // resetToken();
            },
          });
        } else setAlert({ message: res.data.errorMsg ?? '' });
      })
      .catch(error => console.log(error));
  };

  useEffect(() => {
    if (data && data.content) {
      fetch(data.content)
        .then(res => res.text())
        .then(setContent)
        .catch(err => console.log(JSON.stringify(err)));
    }
  }, [data]);

  return (
    <div className='flex flex-1 flex-col'>
      <header className='title-header'>
        <BackButton />
        <h2 className='font-semibold leading-[24px] -tracking-[0.03em] text-grey-10'>탈퇴하기</h2>
        <div className='h-6 w-6' />
      </header>
      <section className='flex flex-1 flex-col justify-between px-4 pb-[140px] pt-6'>
        <div>
          <h3 className='font-semibold leading-[24px] -tracking-[0.03em] text-black'>
            탈퇴 전 꼭 확인해주세요!
          </h3>
          <div dangerouslySetInnerHTML={{ __html: content }} className='tinymce my-4' />
        </div>
      </section>
      <div className='fixed bottom-0 flex w-[375px] flex-col bg-white px-4 pb-6 pt-4 max-md:w-full'>
        <div className='mb-6 flex items-center gap-2'>
          <Checkbox
            id='check'
            checked={isAgree}
            className='[&_circle]:data-[state=checked]:fill-grey-20'
            onCheckedChange={checked => typeof checked === 'boolean' && setIsAgree(checked)}
          />
          <label
            htmlFor='check'
            className='text-[15px] leading-[20px] -tracking-[0.03em] text-grey-40'
          >
            위 내용을 모두 이해하였으며 동의합니다.
          </label>
        </div>
        <button
          disabled={!isAgree}
          className={clsx(submitButtonClassName, '[&]:bg-grey-20')}
          onClick={onWithdrawal}
        >
          탈퇴하기
        </button>
      </div>
    </div>
  );
};

MypageWithdrawal.getLayout = page => (
  <Layout
    className='flex flex-1 flex-col'
    footerProps={{ disable: true }}
    headerProps={{ disable: true }}
  >
    {page}
  </Layout>
);

export default MypageWithdrawal;
