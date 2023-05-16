import Image from 'next/image';
import Link from 'next/link';
import { type ComponentProps } from 'react';

import cm from 'src/utils/class-merge';

export type HeaderProps = ComponentProps<'header'>;

export function Header({ className, ...props }: HeaderProps) {
  return (
    <header {...props} className={cm('sticky top-0 z-50', className)}>
      <div className='flex h-[56px] items-center gap-3.5 bg-white pl-4 pr-2'>
        <Link href='/'>
          <Image src='/assets/icons/common/logo-title.svg' alt='logo' width={18} height={30.86} />
        </Link>
        <Link
          href='/search'
          className='flex h-10 flex-1 items-center gap-2 rounded-md bg-grey-90 px-3'
        >
          <Image src='/assets/icons/common/search.svg' alt='search' width={24} height={24} />
          <p className='line-clamp-1 text-[14px] font-normal -tracking-[3%] text-grey-80'>
            검색어를 입력해주세요.
          </p>
        </Link>
        <Link href='/notice'>
          <Image
            src='/assets/icons/common/notification-title.svg'
            alt='notification'
            width={22}
            height={24}
          />
        </Link>
        <Link href='/'>
          <Image
            src='/assets/icons/common/cart-title.svg'
            alt='cart'
            width={22}
            height={23}
            className='ml-[1px]'
          />
        </Link>
      </div>
    </header>
  );
}
