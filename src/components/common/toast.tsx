import React, { useEffect, useRef, useState } from 'react';
import { useToastStore } from 'src/store';
import useClickAway from 'src/utils/use-click-away';

const Toast = () => {
  const target = useRef<HTMLDivElement>(null);
  const [check, setCheck] = useState<boolean>(false);
  const { toast, clearToast } = useToastStore();

  useClickAway(target, () => {
    if (!check) setCheck(true);
    else {
      clearToast();
      setCheck(false);
    }
  });

  useEffect(() => {
    if (toast) {
      setTimeout(() => {
        clearToast();
      }, 2000);
    }
  }, [clearToast, toast]);

  return (
    <div className='sticky top-0 z-[150] w-full'>
      {toast && (
        <div className='absolute top-0 z-[150] flex h-[100dvb] w-full flex-col justify-end'>
          <div
            ref={target}
            className='flex w-full flex-col items-center px-4 pb-10'
            onClick={e => {
              e.stopPropagation();
            }}
          >
            <div className='flex h-[50px] w-full items-center justify-between rounded-lg bg-primary-10 px-4'>
              <p className='text-[12px] font-bold leading-[18px] -tracking-[0.03em] text-white'>
                {toast.text ?? '1개의 상품이 저장함에 담겼어요.'}
              </p>
              <button
                onClick={() => {
                  toast.onClick();
                  clearToast();
                }}
              >
                <p className='text-[12px] font-medium leading-[18px] -tracking-[0.03em] text-primary-80'>
                  저장함에서 비교하기
                </p>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Toast;
