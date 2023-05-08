import { Head, Html, Main, NextScript } from 'next/document';

// https://realfavicongenerator.net/ favicon 생성사이트

export default function Document() {
  return (
    <Html lang='ko'>
      <Head>
        <link href='/favicon.ico' rel='icon' />
        <link href='/favicon-16x16.png' rel='icon' sizes='16x16' type='image/png' />
        <link href='/favicon-32x32.png' rel='icon' sizes='32x32' type='image/png' />
        <link href='/apple-touch-icon.png' rel='apple-touch-icon' />
        <link href='/manifest.json' rel='manifest' />
        <link color='#5bbad5' href='/safari-pinned-tab.svg' rel='mask-icon' />
        <meta content='#da532c' name='msapplication-TileColor' />
        <meta content='#ffffff' name='theme-color' />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
