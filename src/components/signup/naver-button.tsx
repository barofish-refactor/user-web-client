import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { useRef } from 'react';
import { client } from 'src/api/client';
import { type JoinSnsUserPayload } from 'src/api/swagger/data-contracts';
import { ContentType } from 'src/api/swagger/http-client';
import { useAlertStore } from 'src/store';
import { formatToBlob, requestPermission, setToken } from 'src/utils/functions';

export function NaverButton() {
  const router = useRouter();
  const { setAlert } = useAlertStore();
  const naverButtonRef = useRef<HTMLDivElement>(null);
  const { mutateAsync: loginUser } = useMutation(
    async (args: JoinSnsUserPayload) =>
      await (await client()).joinSnsUser(args, { type: ContentType.FormData }),
  );

  function boostrapNaver() {
    const naver = new window.naver.LoginWithNaverId({
      clientId: process.env.NEXT_PUBLIC_NAVER_KEY,
      callbackUrl: location.href,
      isPopup: false,
      loginButton: {},
    });

    naver.init();

    naver.getLoginStatus((isSuccess: boolean) => {
      if (isSuccess) {
        const token = location.hash.split('=')[1]?.split('&')[0];
        if (!token) return;

        const user: {
          id: string;
          age?: string;
          mobile?: string;
          gender?: string;
          name?: string;
          nickname?: string;
          profile_image?: string;
        } = naver.user;

        loginUser({
          data: formatToBlob(
            {
              loginType: 'NAVER',
              loginId: naver.user.id,
              phone: user.mobile ? user.mobile.replaceAll('-', '') : undefined,
              profileImage: user.profile_image,
              name: user.name,
              nickname: user.nickname,
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
    });
  }

  function onClickNaver() {
    if (window.ReactNativeWebView) requestPermission('socialLogin', 'naver');
    else {
      const innerAnchor = naverButtonRef.current?.children[0] as HTMLAnchorElement;
      innerAnchor.click();
    }
  }

  return (
    <>
      <Script
        src='https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.2.js'
        onReady={boostrapNaver}
      />
      <div ref={naverButtonRef} hidden id='naverIdLogin' />
      <button
        className='h-[45px] w-[45px] bg-[url(/assets/icons/sign/naver.svg)] bg-cover'
        onClick={onClickNaver}
      />
    </>
  );
}
