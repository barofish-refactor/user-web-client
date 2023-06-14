import { useMutation } from '@tanstack/react-query';
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
  const { mutateAsync: loginUser } = useMutation((args: JoinSnsUserPayload) =>
    client().joinSnsUser(args, { type: ContentType.FormData }),
  );
  const [redirectUrl, setRedirectUrl] = useState('');

  useEffect(() => {
    setRedirectUrl(location.href);
  }, []);

  return (
    <AppleLogin
      usePopup
      clientId={process.env.APPLE_KEY}
      redirectURI={redirectUrl}
      callback={res => {
        const jwt = decodeToken(res.authorization.id_token);
        if ('sub' in jwt) {
          loginUser({
            data: formatToBlob({ loginType: 'APPLE', loginId: jwt.sub }, true),
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
      render={({ onClick, disabled }) => (
        <button
          disabled={disabled}
          className='h-[39px] w-[39px] bg-[url(/assets/icons/sign/apple.svg)] bg-cover'
          onClick={() => {
            if (window.ReactNativeWebView) requestPermission('socialLogin', 'apple');
            else {
              onClick();
            }
          }}
        />
      )}
    />
  );
}
