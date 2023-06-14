import dynamic from 'next/dynamic';

export * from './back-button';
export * from './checkbox';
export * from './external-link';
export const DaumPostcode = dynamic(() => import('./daum-postcode'), { ssr: false });
