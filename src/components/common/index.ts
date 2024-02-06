import dynamic from 'next/dynamic';

export { default as Alert } from './alert';
export { default as BottomConfirm } from './bottom-confirm';
export { default as BottomSheet } from './bottom-sheet';
export { default as Confirm } from './confirm';
export * from './footer';
export { default as Head } from './head';
export * from './header';
export { default as PageLayout } from './layout';
export { default as OptionBottomSheet } from './option-bottom-sheet';
export { default as PhothSheet } from './photo-sheet';
export * from './policy';
export { default as ProductItem } from './product-item';
export { default as ProductSmallSlideItem } from './product-small-slide-item';
export { default as Selector } from './selector';
export { default as WatingPage } from './wating';
export { default as CartIcon } from './cart-icon';
export { default as Chat } from './chat';
export { default as HomeBtn } from './home-button';

export const PcBanner = dynamic(() => import('./pc-banner'));
