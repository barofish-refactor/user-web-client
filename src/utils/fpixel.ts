export const FB_PIXEL_ID = process.env.NEXT_PUBLIC_PIXEL_ID;

export const pageview = () => {
  // @ts-ignore
  window.fbq('track', 'PageView');
};

export const view = (options = {}) => {
  // @ts-ignore
  window.fbq('track', 'ViewContent', options);
};
export const addToCart = (options = {}) => {
  // @ts-ignore
  window.fbq('track', 'AddToCart', options);
};

export const purchase = (options = {}) => {
  // @ts-ignore
  window.fbq('track', 'Purchase', options);
};
