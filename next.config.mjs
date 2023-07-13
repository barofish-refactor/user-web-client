/** @type {import('next').NextConfig} */
const config = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.tsx?$/,
      use: [{ loader: '@svgr/webpack', options: { icon: true } }],
    });

    return config;
  },
  reactStrictMode: false,
  experimental: {
    scrollRestoration: true,
  },
  images: {
    minimumCacheTTL: 60,
    disableStaticImages: true,
    remotePatterns: [
      {
        hostname: 'barofish-dev.s3.ap-northeast-2.amazonaws.com',
      },
      {
        hostname: 'barofish-prod.s3.ap-northeast-2.amazonaws.com',
      },
    ],
  },
  env: {
    NEXT_PUBLIC_IAMPORT_KEY: 'imp38983932',
    NEXT_PUBLIC_NAVER_KEY: '6R7kGWl8rIGqIYSXt91M',
    NEXT_PUBLIC_KAKAO_KEY: 'ce11ca781427ffa0ee2f8358ab575e9a',
    NEXT_PUBLIC_APPLE_KEY: 'com.matsinger.barofish.signin',
  },
};

export default config;
