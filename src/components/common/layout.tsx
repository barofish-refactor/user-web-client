import { type ComponentProps } from 'react';
import { Alert, BottomConfirm, BottomSheet, Confirm, PcBanner } from 'src/components/common';

import { Footer, type FooterProps } from 'src/components/common/footer';
import { Header, type HeaderProps } from 'src/components/common/header';
import PhotoSheet from 'src/components/common/photo-sheet';
import Toast from 'src/components/common/toast';
import cm from 'src/utils/class-merge';

type Optional<T> = T & { disable?: boolean };

interface Props extends ComponentProps<'main'> {
  headerProps?: Optional<HeaderProps>;
  footerProps?: Optional<FooterProps>;
}

export default function Layout({
  headerProps: { disable: headerDisable = false, ...headerArgs } = {},
  footerProps: { disable: footerDisable = false, ...footerArgs } = {},
  className,
  ...args
}: Props) {
  return (
    <article className='flex flex-1 gap-[18px] md:mx-auto'>
      {/* PC 좌측 배너 */}
      <PcBanner />
      {/* 메인화면 */}
      <div className='flex flex-1 flex-col bg-white md:w-[375px]'>
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
        {/* Toast */}
        <Toast />
        {!headerDisable && <Header {...headerArgs} />}
        <main {...args} className={cm('flex-1', className)} />
        {!footerDisable && <Footer {...footerArgs} />}
      </div>
    </article>
  );
}
