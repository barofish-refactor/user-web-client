import { useMutation } from '@tanstack/react-query';
import Image from 'next/image';
import router from 'next/router';
import { useEffect, useState } from 'react';
import AppleLogin from 'react-apple-login';
import { client } from 'src/api/client';
import { type JoinSnsUserPayload } from 'src/api/swagger/data-contracts';
import { ContentType } from 'src/api/swagger/http-client';
import { useAlertStore } from 'src/store';
import { decodeToken, formatToBlob, requestPermission, setToken } from 'src/utils/functions';

export function AppleButton() {
  const { setAlert } = useAlertStore();
  const { mutateAsync: loginUser } = useMutation(
    async (args: JoinSnsUserPayload) =>
      await (await client()).joinSnsUser(args, { type: ContentType.FormData }),
  );
  const [redirectUrl, setRedirectUrl] = useState('');

  useEffect(() => {
    setRedirectUrl(location.href);
  }, []);

  return (
    <AppleLogin
      usePopup
      responseMode='form_post'
      // scope='name email'
      scope='name'
      clientId={process.env.NEXT_PUBLIC_APPLE_KEY}
      redirectURI={redirectUrl}
      callback={res => {
        if (res.error) return;
        const jwt = decodeToken(res.authorization.id_token);
        const fullName = res.user?.name;
        const name = (fullName?.lastName ?? '') + (fullName?.firstName ?? '');
        if ('sub' in jwt) {
          loginUser({
            data: formatToBlob<JoinSnsUserPayload['data']>(
              { loginType: 'APPLE', loginId: jwt.sub },
              true,
            ),
          })
            .then(res => {
              if (res.data.isSuccess) {
                if (res.data.data) {
                  setToken(res.data.data);
                  return true;
                } else {
                  router.push({ pathname: 'signup', query: { v: jwt.sub, name } });
                  return false;
                }
              } else {
                setAlert({ message: res.data.errorMsg ?? '' });
                return false;
              }
            })
            .then(res => {
              if (res) {
                const getPaths = sessionStorage.getItem('Paths');

                const getPath = sessionStorage.getItem('Path');
                if (getPath) return router.replace(getPath ? `${getPath}` : '/');
                if (getPaths) {
                  const query = JSON.parse(getPaths);
                  return router.replace({
                    pathname: '/product/order',
                    query: { id: query?.id, options: query.options },
                  });
                }
                if (!getPath && !getPaths) return router.replace('/');
              }
            })
            .catch(console.error);
        }
      }}
      render={({ onClick, disabled }) => (
        <button
          disabled={disabled}
          className='relative flex h-12 items-center justify-center rounded-lg bg-black'
          onClick={() => {
            if (window.ReactNativeWebView) requestPermission('socialLogin', 'apple');
            else {
              onClick();
            }
          }}
        >
          <Image
            src='/assets/icons/sign/apple.svg'
            alt='apple'
            width={14}
            height={18}
            className='absolute left-4'
          />
          <p className='text-[18px] font-bold -tracking-[0.48px] text-white'>Apple로 계속하기</p>
        </button>
      )}
    />
  );
}
