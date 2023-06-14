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
  output: 'standalone',
  reactStrictMode: false,
  experimental: {
    scrollRestoration: true,
  },
  images: {
    unoptimized: true,
    disableStaticImages: true,
  },
  env: {
    NEXT_PUBLIC_IAMPORT_KEY: 'imp38983932',
    NAVER_KEY: '6R7kGWl8rIGqIYSXt91M',
    KAKAO_KEY: 'ce11ca781427ffa0ee2f8358ab575e9a',
    APPLE_KEY: 'com.matsinger.barofish.signin',
  },
  // async redirects() {
  //   return [
  //     {
  //       source: '/:path*',
  //       has: [
  //         {
  //           type: 'host',
  //           value: 'www.shop.barofish.com',
  //         },
  //       ],
  //       destination: 'shop.barofish.com/:path*',
  //       permanent: true,
  //     },
  //     {
  //       source: '/:path*',
  //       has: [
  //         {
  //           type: 'host',
  //           value: 'www.app.barofish.com',
  //         },
  //       ],
  //       destination: 'app.barofish.com/:path*',
  //       permanent: true,
  //     },
  //   ];
  // },
};

export default config;
