import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
export const HeaderBanner = () => {
  const router = useRouter();
  return (
    <button className='w-full' onClick={() => router.push('/login')}>
      <Image
        src='/assets/icons/common/belt-banner.webp'
        style={{ objectFit: 'fill' }}
        width={750}
        height={200}
        loading='lazy'
        alt='bannerAds'
        sizes='(max-width: 768px) 100vw, (max-width: 1200px) 100vw'
      />
    </button>
  );
};
