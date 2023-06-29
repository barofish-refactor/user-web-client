import { useMutation } from '@tanstack/react-query';
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
  const { mutateAsync: loginUser } = useMutation((args: JoinSnsUserPayload) =>
    client().joinSnsUser(args, { type: ContentType.FormData }),
  );

  return (
    <KakaoLogin
      token={process.env.NEXT_PUBLIC_KAKAO_KEY}
      render={({ onClick }) => (
        <button
          className='h-[45px] w-[45px] bg-[url(/assets/icons/sign/kakao.svg)] bg-cover'
          onClick={() => {
            if (window.ReactNativeWebView) requestPermission('socialLogin', 'kakao');
            else onClick();
          }}
        />
      )}
      onFail={console.error}
      onLogout={console.info}
      onSuccess={response => {
        if (!response.profile) return;

        loginUser({
          data: formatToBlob(
            {
              loginType: 'KAKAO',
              loginId: String(response.profile.id),
              profileImage: response.profile.kakao_account.profile.profile_image ?? undefined,
              // email: response.profile.kakao_account.email ?? undefined,
              name: response.profile.kakao_account.profile.nickname ?? undefined,
              nickname: (response.profile.kakao_account as any).name ?? undefined,
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
      }}
    />
  );
}
