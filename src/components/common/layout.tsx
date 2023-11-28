import { type ComponentProps } from 'react';
import { Footer, type FooterProps } from 'src/components/common/footer';
import { Header, type HeaderProps } from 'src/components/common/header';
import cm from 'src/utils/class-merge';
import dynamic from 'next/dynamic';
import PullToRefresh from 'react-simple-pull-to-refresh';
export const PcBanner = dynamic(() => import('src/components/common/pc-banner'));
export const Alert = dynamic(() => import('src/components/common/alert'));
export const Confirm = dynamic(() => import('src/components/common/confirm'));
export const BottomSheet = dynamic(() => import('src/components/common/bottom-sheet'));
export const BottomConfirm = dynamic(() => import('src/components/common/bottom-confirm'));
export const OptionBottomSheet = dynamic(() => import('src/components/common/option-bottom-sheet'));
export const Toast = dynamic(() => import('src/components/common/toast'));
export const PhotoSheet = dynamic(() => import('src/components/common/photo-sheet'));

type Optional<T> = T & { disable?: boolean };

interface Props extends ComponentProps<'main'> {
  headerProps?: Optional<HeaderProps>;
  footerProps?: Optional<FooterProps>;
}

export default function Layout(
  this: any,
  {
    headerProps: { disable: headerDisable = false, ...headerArgs } = {},
    footerProps: { disable: footerDisable = false, ...footerArgs } = {},
    className,
    ...args
  }: Props,
) {
  const handleRefresh = async () => {
    location.reload();
  };
  return (
    <div className='flex flex-1 gap-[18px] md:mx-auto'>
      {/* PC 좌측 배너 */}
      <PcBanner />
      {/* 메인화면 */}

      <div className='flex flex-1 flex-col bg-white  md:w-[375px]'>
        {/* Alert */}
        <Alert />
        {/* confirm */}
        <Confirm />
        {/* bottomConfirm */}
        <BottomConfirm />
        {/* photo */}
        <PhotoSheet />
        {/* bottomSheet */}
        <BottomSheet />
        {/* bottomSheet */}
        <OptionBottomSheet />
        {/* Toast */}
        <Toast />
        <PullToRefresh pullingContent='' onRefresh={handleRefresh}>
          <>
            {!headerDisable && <Header {...headerArgs} />}

            <main {...args} className={cm('flex-1', className)} />

            {!footerDisable && <Footer {...footerArgs} />}
          </>
        </PullToRefresh>
      </div>
    </div>
  );
}
