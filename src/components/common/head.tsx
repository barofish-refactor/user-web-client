import NextHead from 'next/head';

const NAME = '';

export default function Head() {
  return (
    <NextHead>
      <title>{NAME}</title>
      <meta content='width=device-width' name='viewport' />
      <meta content={NAME} name='description' />
      <meta content={NAME} property='og:site_name' />
      <meta content={NAME} property='og:title' />
      <meta content={NAME} property='og:description' />
      <meta content='website' property='og:type' />
      <meta content='https://localhost:3000' property='og:url' />
    </NextHead>
  );
}
