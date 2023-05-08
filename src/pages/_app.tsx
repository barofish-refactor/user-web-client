import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { type AppProps } from 'next/app';
import { useMemo } from 'react';

import { Head } from 'src/components/common';
import { fontPretendard } from 'src/fonts';
import { type NextPageWithLayout } from 'src/types/common';

import 'src/styles/globals.css';

type CustomAppProps = AppProps<any> & { Component: NextPageWithLayout };

export default function MyApp(props: CustomAppProps) {
  const { Component, pageProps } = props;
  const getLayout = Component.getLayout || (page => page);

  const queryClient = useMemo(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 2.5 * (60 * 1000), // 2.5 min
          },
        },
      }),
    [],
  );

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
