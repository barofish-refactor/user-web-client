import { Head, Html, Main, NextScript } from 'next/document';
import Script from 'next/script';

export default function Document() {
  return (
    <Html lang='ko'>
      <Head>
        <link rel='apple-touch-icon' sizes='180x180' href='/apple-touch-icon.png' />
        <link rel='icon' type='image/png' sizes='32x32' href='/favicon-32x32.png' />
        <link rel='icon' type='image/png' sizes='16x16' href='/favicon-16x16.png' />
        <link rel='manifest' href='/site.webmanifest' />
        <link rel='mask-icon' href='/safari-pinned-tab.svg' color='#5bbad5' />
        <link
          rel='stylesheet'
          as='style'
          crossOrigin='anonymous'
          href='https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.8/dist/web/static/pretendard.css'
        />
        <meta name='msapplication-TileColor' content='#da532c' />
        <meta name='theme-color' content='#ffffff' />
        <meta
          name='google-site-verification'
          content='T3lWWvNBN9VLNavR3ZtyKsKoat_QW1rBqsfxDBo_FAs'
        />
        <Script id='google-tag-manager' strategy='afterInteractive'>
          {`
    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer', 'GTM-P8Z6CV7');`}
        </Script>
      </Head>
      <body>
        <Main />
        <NextScript />
        <noscript
          dangerouslySetInnerHTML={{
            __html: `
            <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-P8Z6CV7"
            height="0" width="0" style="display:none;visibility:hidden"></iframe>
            `,
          }}
        />
      </body>
    </Html>
  );
}
