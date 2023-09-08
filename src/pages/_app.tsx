import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { type AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { client } from 'src/api/client';
import { Head } from 'src/components/common';
import { useAlertStore } from 'src/store';
import { type NextPageWithLayout } from 'src/types/common';
import { formatToBlob, setToken } from 'src/utils/functions';
import useWebview from 'src/utils/use-web-view';

import { ContentType } from 'src/api/swagger/http-client';
import 'src/styles/globals.css';
import { type JoinSnsUserPayload } from 'src/api/swagger/data-contracts';

type CustomAppProps = AppProps<any> & { Component: NextPageWithLayout };

export default function MyApp(props: CustomAppProps) {
  const { Component, pageProps } = props;
  const getLayout = Component.getLayout || (page => page);
  const router = useRouter();
  const { setAlert } = useAlertStore();

  const queryClient = useMemo(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 0,
            retry: 1,
            refetchOnWindowFocus: false,
          },
        },
      }),
    [],
  );

  useWebview(async event => {
    const message = JSON.parse(event.data);

    if (message.type === 'backEvent') {
      window.ReactNativeWebView.postMessage(
        JSON.stringify({
          type: 'exitApp',
        }),
      );
      router.back();
    } else if (message.type === 'navigate') {
      router.push({ pathname: '/product', query: { id: message.id } });
    } else if (message.type === 'socialLogin') {
      // 소셜 로그인
      (await client())
        .joinSnsUser(
          {
            data: formatToBlob<JoinSnsUserPayload['data']>(
              {
                loginType:
                  message.social === 'kakao'
                    ? 'KAKAO'
                    : message.social === 'naver'
                    ? 'NAVER'
                    : 'APPLE',
                loginId: message.loginId,
                profileImage: message.profileImage ?? undefined,
                name:
                  message.social === 'apple' ? message.name.nickname : message.name ?? undefined,
                nickname: message.nickname ?? undefined,
                phone: message.phone
                  ? String(message.phone).replace('+82 ', '0').replaceAll('-', '')
                  : undefined,
              },
              true,
            ),
          },
          { type: ContentType.FormData },
        )
        .then(res => {
          if (res.data.isSuccess) {
            if (res.data.data) {
              setToken(res.data.data);
              return true;
            } else {
              router.push({
                pathname: 'signup',
                query: { v: message.loginId, name: message.name },
              });
              return false;
            }
          } else {
            setAlert({ message: res.data.errorMsg ?? '' });
            return false;
          }
        })
        .then(res => {
          if (res) router.replace('/');
        })
        .catch(err => setAlert({ message: err }));
    }
  });

  return (
    <QueryClientProvider client={queryClient}>
      {/* <ReactQueryDevtools initialIsOpen={false} position='top-right' /> */}
      <Head />
      <Hydrate state={pageProps.dehydratedState}>{getLayout(<Component {...pageProps} />)}</Hydrate>
    </QueryClientProvider>
  );
}
