import Image from 'next/image';
import Link from 'next/link';
import { type ComponentProps } from 'react';

import cm from 'src/utils/class-merge';

export type HeaderProps = ComponentProps<'header'>;

export function Header({ className, ...props }: HeaderProps) {
  return (
    <header {...props} className={cm('sticky top-0 z-50', className)}>
      <div className='flex h-[56px] items-center gap-3.5 bg-white pl-4 pr-[18px]'>
        <Link href='/'>
          <Image src='/assets/icons/common/logo-title.svg' alt='logo' width={18} height={30.86} />
        </Link>
        <Link
          href='/search'
          className='flex h-10 flex-1 items-center gap-2 rounded-md bg-grey-90 px-3'
        >
          <Image src='/assets/icons/common/search.svg' alt='search' width={24} height={24} />
          <p className='line-clamp-1 text-[14px] font-normal -tracking-[0.03em] text-grey-80'>
            검색어를 입력해주세요.
          </p>
        </Link>
        {/* 비교하기 */}
        <Link
          href='/compare/storage'
          className='h-6 w-6 bg-[url(/assets/icons/common/bookmark-title.svg)] bg-cover'
        />
        {/* 장바구니 */}
        <Link
          href='/product/cart'
          className='ml-[2px] h-[23px] w-[22px] bg-[url(/assets/icons/common/cart-title.svg)] bg-cover'
        />
      </div>
    </header>
  );
}
