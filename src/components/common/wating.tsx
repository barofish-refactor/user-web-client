import Image from 'next/image';
import React from 'react';

interface Props {
  title: string;
}

const Wating = ({ title }: Props) => {
  return (
    <div className='flex h-[calc(100dvb-112px)] items-center justify-center bg-grey-90'>
      <div className='mt-2 flex flex-col items-center gap-2'>
        <Image
          unoptimized
          src='/assets/icons/common/alert-wating.svg'
          alt='alert'
          width={48}
          height={48}
        />
        <p className='text-[16px] font-semibold leading-[24px] -tracking-[0.03em] text-grey-20'>
          {`${title}가 준비중입니다.`}
        </p>
        <p className='whitespace-pre text-center text-[14px] font-medium leading-[22px] -tracking-[0.03em] text-grey-60'>
          {`${title}가 곧 출시 예정이니\n조금만 기다려주세요 :)`}
        </p>
      </div>
    </div>
  );
};

export default Wating;
