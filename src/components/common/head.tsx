import { DefaultSeo } from 'next-seo';
import NextHead from 'next/head';
import { Fragment } from 'react';

export const HEAD_NAME = '바로피쉬';
export const HEAD_DESCRIPTION = '수산물 전문 비교구매 플랫폼';

export default function Head() {
  return (
    <Fragment>
      <DefaultSeo
        title={HEAD_NAME}
        description={HEAD_DESCRIPTION}
        openGraph={{
          images: [{ url: '/assets/icons/common/logo-title.svg', alt: 'logo' }],
          title: HEAD_NAME,
          description: HEAD_DESCRIPTION,
          siteName: HEAD_NAME,
          type: 'website',
        }}
      />
      <NextHead>
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0'
        />
      </NextHead>
    </Fragment>
  );
}
