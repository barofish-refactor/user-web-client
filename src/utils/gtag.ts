export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID;

/** @link https://developers.google.com/analytics/devguides/collection/gtagjs/pages */
export const pageview = (url: URL) => {
  if (typeof window.gtag !== 'undefined') {
    if (!GA_TRACKING_ID) return;
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
    });
  }
};

type GTagEvent = {
  action: string;
  category: string;
  name: string | string[];
  value: number | string;
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
// export const event = ({ action, category, label, value }: GTagEvent) => {
//   if (typeof window.gtag !== 'undefined') {
//     window.gtag('event', action, {
//       event_category: category,
//       event_label: label,
//       value,
//     });
//   }
// };
export const Purchase = ({ action, category, name, value }: GTagEvent) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', action, {
      event_category: category,
      event_label: name,
      value,
    });
  }
};
