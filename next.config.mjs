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
  // distDir: 'dist', // Static HTML Export면 주석 해제
  // output: '', // Static HTML Export면 'export', Dockerizing이면 'standalone'
  reactStrictMode: false,
  experimental: {
    scrollRestoration: true,
  },
  images: {
    unoptimized: true,
    disableStaticImages: true,
  },
};

export default config;
