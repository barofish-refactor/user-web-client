import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
export const HeaderBanner = () => {
  const router = useRouter();
  return (
    <button className='relative' onClick={() => router.push('/login')}>
      <Image src='/assets/icons/common/belt-banner.png' width={375} height={208} alt='bannerAds' />
    </button>
  );
};
