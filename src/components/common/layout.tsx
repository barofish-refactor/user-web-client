import { type ComponentProps, useEffect } from 'react';
import { BottomSheet } from 'src/components/common';

import { Footer, type FooterProps } from 'src/components/common/footer';
import { Header, type HeaderProps } from 'src/components/common/header';
import { useOpenStore } from 'src/store';
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
  const { isOpen } = useOpenStore();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'overlay';
    }
  }, [isOpen]);

  return (
    <article className='flex flex-1 gap-[18px] md:mx-auto'>
      {/* PC 좌측 배너 */}
      <section className='w-[375px] max-md:hidden'>
        <div className='fixed h-[100dvb] w-[375px] bg-primary-90'>
          <p className='text-center'>PC배너</p>
        </div>
      </section>
      {/* 메인화면 */}
      <section className='flex flex-1 flex-col bg-white md:w-[375px]'>
        {/* bottomSheet */}
        <div className='sticky top-0 z-[100] w-full'>
          {isOpen && (
            <div className='absolute top-0 z-[100] flex h-[100dvb] w-full flex-col justify-end bg-black/30'>
              <BottomSheet />
            </div>
          )}
        </div>
        {!headerDisable && <Header {...headerArgs} />}
        <main {...args} className={cm('flex-1', className)} />
        {!footerDisable && <Footer {...footerArgs} />}
      </section>
    </article>
  );
}
