import { Head, Html, Main, NextScript } from 'next/document';
import Script from 'next/script';

export default function Document() {
  const NAVER_PIXEL_ID = process.env.NEXT_PUBLIC_NAVER_PIEXL_ID;
  return (
    <Html lang='ko'>
      <Head>
        <link rel='apple-touch-icon' sizes='180x180' href='/apple-touch-icon.png' />
        <link rel='icon' type='image/png' sizes='32x32' href='/favicon-32x32.png' />
        <link rel='icon' type='image/png' sizes='16x16' href='/favicon-16x16.png' />
        <link rel='manifest' href='/site.webmanifest' />
        <link rel='mask-icon' href='/safari-pinned-tab.svg' color='#5bbad5' />
        {/* <link
          rel='stylesheet'
          as='style'
          crossOrigin='anonymous'
          href='https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.8/dist/web/static/pretendard.css'
        /> */}
        <meta name='msapplication-TileColor' content='#da532c' />
        <meta name='theme-color' content='#ffffff' />
        <meta
          name='google-site-verification'
          content='T3lWWvNBN9VLNavR3ZtyKsKoat_QW1rBqsfxDBo_FAs'
        />
        <meta name='naver-site-verification' content='1e575d2a85af7f25e9fddd1ce448ecc7bc99335d' />
        <>
          <Script
            id='naver-init'
            strategy='afterInteractive'
            type='text/javascript'
            src='//wcs.naver.net/wcslog.js'
          />
          <Script
            id='naver-tracking'
            strategy='afterInteractive'
            dangerouslySetInnerHTML={{
              __html: `
          if (!wcs_add) var wcs_add={};
          wcs_add["wa"] = "${NAVER_PIXEL_ID}";
          if (!_nasa) var _nasa={};
          if(window.wcs){
          wcs.inflow("barofish.com");
          wcs_do(_nasa);
          }
          `,
            }}
          />
        </>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
