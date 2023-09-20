import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
export const HeaderBanner = () => {
  const router = useRouter();
  return (
    <button onClick={() => router.push('/login')}>
      <Image
        src='/assets/icons/common/belt-banner.gif'
        style={{ objectFit: 'fill' }}
        width={400}
        height={208}
        alt='bannerAds'
      />
    </button>
  );
};
