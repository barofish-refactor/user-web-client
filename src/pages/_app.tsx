import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { type AppProps } from 'next/app';
import { useMemo } from 'react';

import { useRouter } from 'next/router';
import { client } from 'src/api/client';
import { ContentType } from 'src/api/swagger/http-client';
import { Head } from 'src/components/common';
import { fontPretendard } from 'src/fonts';
import { useAlertStore } from 'src/store';
import 'src/styles/globals.css';
import { type NextPageWithLayout } from 'src/types/common';
import { formatToBlob, setToken } from 'src/utils/functions';
import useWebview from 'src/utils/use-web-view';

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
            staleTime: 2.5 * (60 * 1000), // 2.5 min
            retry: 1,
          },
        },
      }),
    [],
  );

  useWebview(event => {
    const message = JSON.parse(event.data);

    if (message.type === 'backEvent') {
      window.ReactNativeWebView.postMessage(
        JSON.stringify({
          type: 'exitApp',
        }),
      );
      router.back();
    } else if (message.type === 'navigate') {
      router.push(message.url);
    } else if (message.type === 'socialLogin') {
      // 소셜 로그인
      client()
        .joinSnsUser(
          {
            data: formatToBlob(
              {
                loginType:
                  message.social === 'kakao'
                    ? 'KAKAO'
                    : message.social === 'naver'
                    ? 'NAVER'
                    : 'APPLE',
                loginId: message.loginId,
              },
              true,
            ),
          },
          { type: ContentType.FormData },
        )
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

  return (
    <QueryClientProvider client={queryClient}>
      {/* <ReactQueryDevtools initialIsOpen={false} position='top-right' /> */}
      <Head />
      <style jsx global>{`
        :root {
          --font-pretendard: ${fontPretendard.style.fontFamily};
        }
      `}</style>
      <Hydrate state={pageProps.dehydratedState}>{getLayout(<Component {...pageProps} />)}</Hydrate>
    </QueryClientProvider>
  );
}
