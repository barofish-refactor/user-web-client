import Image from 'next/image';
import React, { useRef } from 'react';
import { useAlertStore } from 'src/store';
import cm from 'src/utils/class-merge';
// import useClickAway from 'src/utils/use-click-away';

const Alert = () => {
  const target = useRef<HTMLDivElement>(null);
  // const [check, setCheck] = useState<boolean>(false);
  const { alert, clearAlert } = useAlertStore();

  // useClickAway(target, () => {
  //   if (!check) setCheck(true);
  //   else setAlert(null);
  // });

  return (
    <div role='alertdialog' className='sticky top-0 z-[150] w-full'>
      {alert && (
        <div className='absolute top-0 z-[150] flex h-[100dvb] w-full flex-col justify-center bg-black/40 px-4'>
          <div
            ref={target}
            className={cm(
              'flex w-full flex-col items-center gap-10 rounded-[10px] bg-white px-6 pb-5 pt-10',
              { 'gap-14': alert.type === 'success' },
            )}
            onClick={e => {
              e.stopPropagation();
            }}
          >
            <div className='flex w-full flex-col items-center'>
              {alert.type === 'success' && (
                <div className='-mt-4 flex w-full flex-col gap-6 pb-6'>
                  <button
                    className='self-end'
                    onClick={() => {
                      alert.type === 'success' && alert.onClick && alert.onClick();
                      clearAlert();
                    }}
                  >
                    <Image
                      unoptimized
                      src='/assets/icons/common/alert-close.svg'
                      alt='close'
                      width={30}
                      height={30}
                    />
                  </button>
                  <Image
                    unoptimized
                    src='/assets/icons/common/alert-check-box.svg'
                    alt='check'
                    width={60}
                    height={60}
                    className='self-center'
                  />
                </div>
              )}
              <p className='break-all text-[16px] font-semibold leading-[24px] -tracking-[0.03em] text-grey-20'>
                {alert.message}
              </p>
            </div>
            <div className='flex w-full'>
              <button
                className={cm(
                  'flex h-[48px] flex-1 items-center justify-center rounded-lg bg-grey-20',
                  { 'bg-primary-50': alert.type === 'success' },
                )}
                onClick={() => {
                  alert.onClick && alert.onClick();
                  clearAlert();
                }}
              >
                <p className='text-[16px] font-medium leading-[24px] -tracking-[0.03em] text-white'>
                  {`${alert.buttonText ?? '확인'}`}
                </p>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Alert;
