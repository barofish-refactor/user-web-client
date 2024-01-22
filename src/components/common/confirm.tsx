import React, { useRef } from 'react';
import { useConfirmStore } from 'src/store';
import cm from 'src/utils/class-merge';
// import useClickAway from 'src/utils/use-click-away';

const Confirm = () => {
  const target = useRef<HTMLDivElement>(null);
  // const [check, setCheck] = useState<boolean>(false);
  const { confirm, clearConfirm } = useConfirmStore();

  // useClickAway(target, () => {
  //   if (!check) setCheck(true);
  //   else clearConfirm()
  // });

  return (
    <div role='alertdialog' className='sticky top-0 z-[150] w-full'>
      {confirm && (
        <div className='absolute top-0 z-[100] flex h-[100vh] w-full flex-col justify-center bg-black/40 px-4'>
          <div
            ref={target}
            className='flex w-full flex-col items-center gap-10 rounded-[10px] bg-white px-6 pb-5 pt-10'
            onClick={e => {
              e.stopPropagation();
            }}
          >
            <p className='whitespace-pre-wrap break-all text-center text-[16px] font-semibold leading-[24px] -tracking-[0.03em] text-grey-20'>
              {confirm.message}
            </p>
            <div className='flex w-full items-center gap-2'>
              <button
                className='flex h-[48px] flex-1 items-center justify-center rounded-lg bg-[#F2F2F2]'
                onClick={() => {
                  clearConfirm();
                }}
              >
                <p className='text-[16px] font-medium leading-[24px] -tracking-[0.03em] text-grey-50'>
                  취소
                </p>
              </button>
              <button
                className={cm(
                  'flex h-[48px] flex-1 items-center justify-center rounded-lg bg-primary-50',
                  { 'bg-error': confirm.type === 'error' },
                )}
                onClick={() => {
                  confirm.onClick();
                  clearConfirm();
                }}
              >
                <p className='text-[16px] font-medium leading-[24px] -tracking-[0.03em] text-white'>
                  {`${confirm.buttonText ?? '확인'}`}
                </p>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Confirm;
