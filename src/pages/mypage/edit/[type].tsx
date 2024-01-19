import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteCookie } from 'cookies-next';
import { type GetServerSideProps, type GetStaticPaths } from 'next';
import { useRouter } from 'next/router';
import { client } from 'src/api/client';
import { type UpdateUserPayload } from 'src/api/swagger/data-contracts';
import Layout from 'src/components/common/layout';
import {
  MypageEditNickname,
  MypageEditPassword,
  MypageEditPhone,
} from 'src/components/mypage/edit';
import { BackButton } from 'src/components/ui';
import { queryKey } from 'src/query-key';
import { useAlertStore } from 'src/store';
import { type NextPageWithLayout } from 'src/types/common';
import { formatToBlob } from 'src/utils/functions';
import { VARIABLES } from 'src/variables';

export type MypageEditType = 'nickname' | 'password' | 'phone';

interface Props {
  type: MypageEditType;
}
const { ACCESS_TOKEN, REFRESH_TOKEN } = VARIABLES;
const MypageEditDynamic: NextPageWithLayout<Props> = ({ type }) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { setAlert } = useAlertStore();

  const { data: user } = useQuery(queryKey.user, async () => {
    const res = await (await client()).selectUserSelfInfo();
    if (res.data.isSuccess) {
      return res.data.data;
    } else {
      if (res.data.code === '101' || res.data.code === '102' || res.data.code === '103') {
        deleteCookie(ACCESS_TOKEN);
        deleteCookie(REFRESH_TOKEN);
        setAlert({ message: res.data.errorMsg ?? '' });
        router.replace('/login');
      }
      console.log(res.data.errorMsg);
      //
      throw new Error(res.data.errorMsg);
    }
  });

  const { mutateAsync: updateUser, isLoading } = useMutation(
    async (args: UpdateUserPayload) => await (await client()).updateUser(args),
  );

  const onMutate = ({ data }: UpdateUserPayload) => {
    if (isLoading) return;
    updateUser({
      data: formatToBlob<UpdateUserPayload['data']>(data, true),
      // profileImage:
    })
      .then(res => {
        if (res.data.isSuccess) {
          queryClient.invalidateQueries(queryKey.user);
          setAlert({ message: '변경되었습니다.', type: 'success', onClick: () => router.back() });
        } else setAlert({ message: res.data.errorMsg ?? '' });
      })
      .catch(error => {
        console.log(error);
      });
  };

  const title = {
    nickname: '닉네임 변경',
    password: '비밀번호 변경',
    phone: '휴대폰 번호 변경',
  }[type];

  return (
    <div className='flex flex-1 flex-col'>
      <header className='title-header'>
        <BackButton />
        <h2 className='font-semibold leading-[24px] -tracking-[0.03em] text-grey-10'>{title}</h2>
        <div className='h-6 w-6' />
      </header>
      {type === 'nickname' && (
        <MypageEditNickname currentNickname={user?.nickname ?? ''} onMutate={onMutate} />
      )}
      {type === 'password' && <MypageEditPassword onMutate={onMutate} />}
      {type === 'phone' && <MypageEditPhone currentPhone={user?.phone ?? ''} onMutate={onMutate} />}
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      { params: { type: 'nickname' } },
      { params: { type: 'password' } },
      { params: { type: 'phone' } },
    ] satisfies { params: { type: MypageEditType } }[],
    fallback: false,
  };
};

export const getStaticProps: GetServerSideProps = async ({ params }) => {
  return {
    props: {
      type: params?.type,
    },
  };
};

MypageEditDynamic.getLayout = page => (
  <Layout
    className='flex flex-1 flex-col'
    footerProps={{ disable: true }}
    headerProps={{ disable: true }}
  >
    {page}
  </Layout>
);

export default MypageEditDynamic;
