import Image from 'next/image';
import Link from 'next/link';
import { type ComponentProps } from 'react';

import cm from 'src/utils/class-merge';
import { HeaderBanner } from './header-banner';
import { useQuery } from '@tanstack/react-query';
import { queryKey } from 'src/query-key';
import { client } from 'src/api/client';
import dynamic from 'next/dynamic';
export const CartIcon = dynamic(() => import('src/components/common/cart-icon'));
export type HeaderProps = ComponentProps<'header'>;

export function Header({ className, ...props }: HeaderProps) {
  const { data } = useQuery(queryKey.user, async () => {
    const res = await (await client()).selectUserSelfInfo();
    if (res.data.isSuccess) {
      return res.data.data;
    }
  });
  return (
    <header {...props} className={cm('sticky top-0 z-50 space-y-0', className)}>
      {!data && <HeaderBanner />}
      <div
        style={{ paddingTop: '4px' }}
        className={
          !data
            ? 'relative bottom-2 flex h-[70px]  items-center gap-3.5 bg-white pl-4 pr-[18px]'
            : 'flex h-[56px] items-center  gap-3.5 bg-white pl-4 pr-[18px]'
        }
      >
        <Link href='/'>
          <Image
            unoptimized
            src='/assets/icons/common/logo-title.svg'
            alt='logo'
            width={18}
            height={30.86}
          />
        </Link>
        <Link
          href='/search'
          className='flex h-10 flex-1 items-center gap-2 rounded-md bg-grey-90 px-3'
        >
          <Image
            unoptimized
            src='/assets/icons/common/search.svg'
            alt='search'
            width={24}
            height={24}
          />
          <p className='line-clamp-1 text-[16px] font-normal -tracking-[0.03em] text-grey-80'>
            검색어를 입력해주세요.
          </p>
        </Link>
        {/* 비교하기 */}
        {/* <Link
          href='/compare/storage'
          className='h-6 w-6 bg-[url(/assets/icons/common/bookmark-title.svg)] bg-cover'
        /> */}
        {/* 장바구니 */}
        <Link href='/product/cart' className='ml-[2px]'>
          <CartIcon />
        </Link>
      </div>
    </header>
  );
}
