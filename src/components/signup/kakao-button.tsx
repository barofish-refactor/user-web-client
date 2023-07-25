import { useMutation } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/router';
import KakaoLogin from 'react-kakao-login';
import { client } from 'src/api/client';
import { type JoinSnsUserPayload } from 'src/api/swagger/data-contracts';
import { ContentType } from 'src/api/swagger/http-client';
import { useAlertStore } from 'src/store';
import { formatToBlob, requestPermission, setToken } from 'src/utils/functions';

export function KakaoButton() {
  const router = useRouter();
  const { setAlert } = useAlertStore();
  const { mutateAsync: loginUser } = useMutation(
    async (args: JoinSnsUserPayload) =>
      await (await client()).joinSnsUser(args, { type: ContentType.FormData }),
  );

  return (
    <KakaoLogin
      token={process.env.NEXT_PUBLIC_KAKAO_KEY}
      render={({ onClick }) => (
        <button
          className='relative flex h-12 items-center justify-center rounded-lg bg-[#FEE33A]'
          onClick={() => {
            if (window.ReactNativeWebView) requestPermission('socialLogin', 'kakao');
            else onClick();
          }}
        >
          <Image
            src='/assets/icons/sign/kakao.svg'
            alt='kakao'
            width={19}
            height={18}
            className='absolute left-4'
          />
          <p className='ml-[3px] text-[16px] font-bold -tracking-[0.48px] text-secondary-10'>
            카카오로 3초만에 시작하기
          </p>
        </button>
      )}
      onFail={console.error}
      onLogout={console.info}
      onSuccess={response => {
        if (!response.profile) return;
        if (
          'name' in response.profile.kakao_account &&
          (typeof response.profile.kakao_account.name === 'string' ||
            typeof response.profile.kakao_account.name === 'undefined')
        ) {
          loginUser({
            data: formatToBlob<JoinSnsUserPayload['data']>(
              {
                loginType: 'KAKAO',
                loginId: String(response.profile.id),
                email: response.profile.kakao_account.email,
                name: response.profile.kakao_account.name,
                nickname: response.profile.kakao_account.name,
                phone: response.profile.kakao_account.phone_number
                  ? response.profile.kakao_account.phone_number
                      .replace('+82 ', '0')
                      .replaceAll('-', '')
                  : undefined,
              },
              true,
            ),
          })
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
              if (res) router.replace('/');
            })
            .catch(console.error);
        }
      }}
    />
  );
}
