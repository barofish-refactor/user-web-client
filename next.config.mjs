/** @type {import('next').NextConfig} */
const config = {
  webpack(config, { isServer }) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.tsx?$/,
      use: [{ loader: '@svgr/webpack', options: { icon: true } }],
    });
    if (!isServer) {
      // 번들 최적화 설정
      config.optimization.minimize = true; // 번들 압축 활성화
      // 추가적인 웹팩 설정 작성
    }
    return config;
  },
  compress: true,
  reactStrictMode: false,
  experimental: {
    scrollRestoration: true,
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  images: {
    minimumCacheTTL: 360,
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
    NEXT_PUBLIC_KAKAO_KEY: 'd8cd8c99c88e172ab9d16e7ba1efaa7f',
    NEXT_PUBLIC_APPLE_KEY: 'com.matsinger.barofish.signin',
  },
};

export default config;
