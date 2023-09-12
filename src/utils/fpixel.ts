export const FB_PIXEL_ID = process.env.NEXT_PUBLIC_PIXEL_ID;

export const pageview = () => {
  // @ts-ignore
  window.fbq('track', 'PageView');
};

export const view = (options = {}) => {
  // @ts-ignore
  window.fbq('track', 'ViewContent', options);
};
