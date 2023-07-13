import { useMutation, useQueryClient } from '@tanstack/react-query';
import clsx from 'clsx';
import { deleteCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { client } from 'src/api/client';
import Layout from 'src/components/common/layout';
import { submitButtonClassName } from 'src/components/form';
import { BackButton, Checkbox } from 'src/components/ui';
import { useAlertStore } from 'src/store';
import { type NextPageWithLayout } from 'src/types/common';
import { requestPermission } from 'src/utils/functions';
import { VARIABLES } from 'src/variables';

const MypageWithdrawal: NextPageWithLayout = () => {
  const { setAlert } = useAlertStore();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isAgree, setIsAgree] = useState(false);

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
            },
          });
        } else setAlert({ message: res.data.errorMsg ?? '' });
      })
      .catch(error => console.log(error));
  };

  return (
    <div className='flex flex-1 flex-col'>
      <header className='title-header'>
        <BackButton />
        <h2 className='font-semibold leading-[24px] -tracking-[0.03em] text-grey-10'>탈퇴하기</h2>
        <div className='h-6 w-6' />
      </header>
      <section className='flex flex-1 flex-col justify-between px-4 py-6'>
        <div>
          <h3 className='font-semibold leading-[24px] -tracking-[0.03em] text-black'>
            탈퇴 전 꼭 확인해주세요!
          </h3>
          <h4 className='mt-6'>바로피쉬를 탈퇴하면,</h4>
          <ul className='mt-4 list-disc space-y-4'>
            <li className='-traacking-[0.03em] ml-6 text-[14px] leading-[22px] text-grey-40'>
              탈퇴 시 일부 개인정보는 개인정보처리방침에 따라 즉시 삭제하며, 삭제된 정보는 복구할 수
              없습니다. 관계법령에 필요한 정보일 경우 일정 기간 별도 보관합니다.
            </li>
            {/* <li className='-traacking-[0.03em] ml-6 text-[14px] leading-[22px] text-grey-40'>
              탈퇴 예시 텍스트입니다. 탈퇴 예시 텍스트입니다. 탈퇴 예시 텍스트입니다. 탈퇴 예시
              텍스트입니다. 탈퇴 예시 텍스트입니다. 탈퇴 예시 텍스트입니다. 탈퇴 예시 텍스트입니다.
              탈퇴 예시 텍스트입니다. 탈퇴 예시 텍스트입니다. 탈퇴 예시 텍스트입니다. 탈퇴 예시
              텍스트입니다. 탈퇴 예시 텍스트입니다. 탈퇴 예시 텍스트입니다. 탈퇴 예시 텍스트입니다.
              탈퇴 예시 텍스트입니다. 탈퇴 예시 텍스트입니다. 탈퇴 예시 텍스트입니다. 탈퇴 예시
              텍스트입니다. 탈퇴 예시 텍스트입니다. 탈퇴 예시 텍스트입니다. 탈퇴 예시 텍스트입니다.
            </li> */}
          </ul>
        </div>
        <div>
          <div className='mb-6 flex items-center gap-2'>
            <Checkbox
              id='check'
              checked={isAgree}
              className='[&_circle]:data-[state=checked]:fill-grey-20'
              onCheckedChange={checked => typeof checked === 'boolean' && setIsAgree(checked)}
            />
            <label
              htmlFor='check'
              className='text-[13px] leading-[20px] -tracking-[0.03em] text-grey-40'
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
      </section>
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
