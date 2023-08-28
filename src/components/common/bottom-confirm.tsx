import React, { useRef, useState } from 'react';
import { useBottomConfirmStore } from 'src/store';
import useClickAway from 'src/utils/use-click-away';

const BottomConfirm = () => {
  const target = useRef<HTMLDivElement>(null);
  const [check, setCheck] = useState<boolean>(false);
  const { bottomConfirm, clearBottomConfirm } = useBottomConfirmStore();

  useClickAway(target, () => {
    if (!check) setCheck(true);
    else {
      clearBottomConfirm();
      setCheck(false);
    }
  });

  return (
    <div className='sticky top-0 z-[150] w-full'>
      {bottomConfirm && (
        <div className='absolute top-0 z-[150] flex h-[100dvb] w-full flex-col justify-end'>
          <div
            ref={target}
            className='flex w-full flex-col items-center rounded-t-lg border-t border-t-grey-90 bg-white px-6 pb-4 pt-[38px]'
            onClick={e => {
              e.stopPropagation();
            }}
          >
            <p className='text-[20px] font-bold leading-[30px] -tracking-[0.03em] text-grey-10'>
              {bottomConfirm.title}
            </p>
            <p className='mt-2 text-[16px] font-normal leading-[24px] -tracking-[0.03em] text-grey-40'>
              {bottomConfirm.content}
            </p>
            <div className='mt-10 flex w-full items-center gap-[7px]'>
              <button
                className='flex h-[50px] w-full items-center justify-center rounded-lg border border-primary-50'
                onClick={() => {
                  clearBottomConfirm();
                }}
              >
                <p className='text-[16px] font-bold -tracking-[0.03em] text-primary-50'>취소</p>
              </button>
              <button
                className='flex h-[50px] w-full items-center justify-center rounded-lg bg-primary-50'
                onClick={() => {
                  bottomConfirm.onClick();
                  clearBottomConfirm();
                }}
              >
                <p className='text-[16px] font-bold -tracking-[0.03em] text-white'>
                  {bottomConfirm.buttonText ?? '삭제'}
                </p>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BottomConfirm;
