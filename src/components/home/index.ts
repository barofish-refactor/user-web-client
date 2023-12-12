import dynamic from 'next/dynamic';

export { default as HomeAbbreviationCuration } from './curation-abbreviation';
export { default as HomeCurationItem } from './curation-item';
export { default as HomeLargeSlideCuration } from './curation-large-slide';
export { default as HomeSmallSlideCuration } from './curation-small-slide';
export { default as HomeTableCuration } from './curation-table';
export { default as HomePartner } from './partner';
export { default as HomeProductList } from './product-list';
export { default as HomeSubBanner } from './sub-banner';
export { default as HomeCurationList } from './curation-list';
export { default as HomeTab } from './tab';
export { default as HomeNotice } from './home-notice';

export const HomeBanner = dynamic(() => import('./banner'));
export const HomeFooter = dynamic(() => import('./footer'));
export const HomeCurationTip = dynamic(() => import('./curation-tip'));
