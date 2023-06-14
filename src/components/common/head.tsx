import NextHead from 'next/head';

const NAME = '바로피쉬';

export default function Head() {
  return (
    <NextHead>
      <title>{NAME}</title>
      <meta content={NAME} name='description' />
      <meta content={NAME} property='og:site_name' />
      <meta content={NAME} property='og:title' />
      <meta content={NAME} property='og:description' />
      <meta content='website' property='og:type' />
      <meta
        name='viewport'
        content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0'
      />
    </NextHead>
  );
}
