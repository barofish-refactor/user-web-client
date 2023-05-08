import localFont from 'next/font/local';

export const fontPretendard = localFont({
  src: [
    {
      path: './assets/black.woff2',
      weight: '900',
      style: 'normal',
    },
    {
      path: './assets/extra-bold.woff2',
      weight: '800',
      style: 'normal',
    },
    {
      path: './assets/bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: './assets/semi-bold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: './assets/medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: './assets/regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './assets/light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: './assets/extra-light.woff2',
      weight: '200',
      style: 'normal',
    },
    {
      path: './assets/thin.woff2',
      weight: '100',
      style: 'normal',
    },
  ],
});
