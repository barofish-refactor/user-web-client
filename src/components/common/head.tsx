import { DefaultSeo } from 'next-seo';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { Fragment, useEffect } from 'react';
import * as gtag from 'src/utils/gtag';

export const HEAD_NAME = '바로피쉬';
export const HEAD_DESCRIPTION = '수산물 전문 비교구매 플랫폼';

export default function Head() {
  return (
    <Fragment>
      <DefaultSeo
        title={HEAD_NAME}
        description={HEAD_DESCRIPTION}
        additionalMetaTags={[
          {
            name: 'viewport',
            content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0',
          },
          {
            name: 'naver-site-verification',
            content: '1e575d2a85af7f25e9fddd1ce448ecc7bc99335d',
          },
        ]}
        openGraph={{
          images: [{ url: '/assets/icons/common/logo-title.svg', alt: 'logo' }],
          title: HEAD_NAME,
          description: HEAD_DESCRIPTION,
          siteName: HEAD_NAME,
          type: 'website',
        }}
      />
      {/* Global Site Tag (gtag.js) - Google Analytics */}
      {gtag.GA_TRACKING_ID && <GAScript />}
    </Fragment>
  );
}

function GAScript() {
  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = (url: URL) => gtag.pageview(url);
    router.events.on('routeChangeComplete', handleRouteChange);
    router.events.on('hashChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
      router.events.off('hashChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <Script
        strategy='afterInteractive'
        src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
      />
      <Script
        id='gtag-init'
        strategy='afterInteractive'
        dangerouslySetInnerHTML={{
          __html: `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', '${gtag.GA_TRACKING_ID}', {
    page_path: window.location.pathname,
  });
  `,
        }}
      />
    </>
  );
}
