import { DefaultSeo } from 'next-seo';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { Fragment, useEffect } from 'react';
import * as gtag from 'src/utils/gtag';
import * as fpixel from 'src/utils/fpixel';
import * as kakaoPixel from 'src/utils/kakaoPixel';
export const HEAD_NAME = '바로피쉬';
export const HEAD_DESCRIPTION = '실패없는 직거래 수산물 쇼핑은 여기서!';

export default function Head() {
  return (
    <Fragment>
      <DefaultSeo
        title={HEAD_NAME}
        description={HEAD_DESCRIPTION}
        additionalMetaTags={[
          {
            name: 'viewport',
            content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no',
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
      {gtag.GA_TRACKING_ID && <GAScript />}
      {fpixel.FB_PIXEL_ID && <PxixelScript />}
      {kakaoPixel.KAKAO_TRACKING_ID && <KakaoScript />}
      {/* {NAVER_PIXEL_ID && <NaverScript />} */}
    </Fragment>
  );
}
function PxixelScript() {
  const router = useRouter();

  useEffect(() => {
    // This pageview only triggers the first time (it's important for Pixel to have real information)

    const handleRouteChange = () => {
      fpixel.pageview();
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);
  return (
    <>
      <Script
        id='fb-pixel'
        strategy='afterInteractive'
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', ${fpixel.FB_PIXEL_ID});
            fbq('track', 'ViewContent');
          `,
        }}
      />
    </>
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
      {/* <Script
        strategy='afterInteractive'
        src='https://www.googletagmanager.com/gtag/js?id=AW-11315318272'
      /> */}
      <Script
        id='gtag-init'
        strategy='afterInteractive'
        dangerouslySetInnerHTML={{
          __html: `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'AW-11315318272');
  gtag('config', '${gtag.GA_TRACKING_ID}' , {
    page_path: window.location.pathname,
  });
  `,
        }}
      />
    </>
  );
}

function KakaoScript() {
  const router = useRouter();

  useEffect(() => {
    // This pageview only triggers the first time (it's important for Pixel to have real information)
    const handleRouteChange = (url: URL) => {
      if (typeof window.kakaoPixel !== 'undefined') {
        window.kakaoPixel(`${kakaoPixel.KAKAO_TRACKING_ID}`).pageView(url);
      }
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    router.events.on('hashChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
      router.events.off('hashChangeComplete', handleRouteChange);
    };
  }, [router.events]);
  return (
    <>
      <Script id='kakao-init' strategy='afterInteractive' src='//t1.daumcdn.net/kas/static/kp.js' />
      <Script
        id='kakao-tracking'
        strategy='afterInteractive'
        dangerouslySetInnerHTML={{
          __html: `
            if (typeof window.kakaoPixel !== 'undefined') {
              window.kakaoPixel('create', '${kakaoPixel.KAKAO_TRACKING_ID}', { persistent_session: true });
              window.kakaoPixel('identify', '${kakaoPixel.KAKAO_TRACKING_ID}');
              window.kakaoPixel('pageView');
            }
          `,
        }}
      />
    </>
  );
}
// const NAVER_PIXEL_ID = process.env.NEXT_PUBLIC_NAVER_PIEXL_ID;
// function NaverScript() {
//   return (
//     <>
//       <Script
//         id='naver-init'
//         strategy='afterInteractive'
//         type='text/javascript'
//         src='//wcs.naver.net/wcslog.js'
//       />
//       <Script
//         id='naver-tracking'
//         strategy='afterInteractive'
//         dangerouslySetInnerHTML={{
//           __html: `
//           if (!wcs_add) var wcs_add={};
//           wcs_add["wa"] = "${NAVER_PIXEL_ID}";
//           if (!_nasa) var _nasa={};
//           if(window.wcs){
//           wcs.inflow("barofish.com");
//           wcs_do(_nasa);
//           }
//           `,
//         }}
//       />
//     </>
//   );
// }
