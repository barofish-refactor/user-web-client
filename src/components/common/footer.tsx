import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { type ComponentProps } from 'react';

import cm from 'src/utils/class-merge';

interface GnbType {
  title: string;
  path: string;
  activeIcon: string;
  inactiveIcon: string;
  iconWidth: number;
  iconHeight: number;
  paddingTop?: number;
}

const gnbList: GnbType[] = [
  {
    title: '홈',
    path: '/',
    activeIcon: '/assets/icons/common/gnb-home-active.svg',
    inactiveIcon: '/assets/icons/common/gnb-home.svg',
    iconWidth: 25,
    iconHeight: 24,
  },
  {
    title: '카테고리',
    path: '/category',
    activeIcon: '/assets/icons/common/gnb-category-active.svg',
    inactiveIcon: '/assets/icons/common/gnb-category.svg',
    iconWidth: 23,
    iconHeight: 22,
    paddingTop: 2,
  },
  {
    title: '비교하기',
    path: '/compare',
    activeIcon: '/assets/icons/common/gnb-compare-active.svg',
    inactiveIcon: '/assets/icons/common/gnb-compare.svg',
    iconWidth: 33,
    iconHeight: 36,
  },
  {
    title: '스토어',
    path: '/store',
    activeIcon: '/assets/icons/common/gnb-store-active.svg',
    inactiveIcon: '/assets/icons/common/gnb-store.svg',
    iconWidth: 25,
    iconHeight: 24,
  },
  {
    title: '마이페이지',
    path: '/mypage',
    activeIcon: '/assets/icons/common/gnb-mypage-active.svg',
    inactiveIcon: '/assets/icons/common/gnb-mypage.svg',
    iconWidth: 19,
    iconHeight: 24,
  },
];

export type FooterProps = ComponentProps<'footer'>;

export function Footer({ className, ...props }: FooterProps) {
  const router = useRouter();

  return (
    <footer {...props} className={cm('sticky bottom-0 z-50', className)}>
      <div className='flex h-[56px] border-t border-t-grey-90 bg-white pt-2'>
        {gnbList.map((v, i) => {
          const isActive = v.path === router.pathname;

          return (
            <Link
              key={i}
              href={v.path}
              className={cm('flex h-[48px] flex-1 flex-col items-center justify-between', {
                'pt-0.5': v.paddingTop === 2,
              })}
            >
              <Image
                src={isActive ? v.activeIcon : v.inactiveIcon}
                alt={v.title}
                width={v.iconWidth}
                height={v.iconHeight}
              />
              <p
                className={cm(
                  'whitespace-nowrap text-[12px] font-medium leading-[18px] -tracking-[0.03em] text-[#969696]',
                  { 'font-bold text-primary-50': isActive },
                )}
              >
                {v.title}
              </p>
            </Link>
          );
        })}
      </div>
    </footer>
  );
}
