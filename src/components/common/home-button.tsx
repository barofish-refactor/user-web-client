import { useRouter } from 'next/router';
import React from 'react';

const HomeButton = () => {
  const router = useRouter();
  return (
    <button
      className='h-[25px] w-[24px] bg-[url(/assets/icons/common/homeIcon.webp)] bg-cover'
      onClick={() => router.push('/')}
    />
  );
};

export default HomeButton;
