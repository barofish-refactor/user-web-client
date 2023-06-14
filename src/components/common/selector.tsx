import Image from 'next/image';
import React, { useState } from 'react';
import cm from 'src/utils/class-merge';

export interface SelectorType {
  label: string;
  value: string;
}

interface Props {
  list: SelectorType[];
  placeHolder?: string;
  className?: string;
  value?: SelectorType;
  setValue?: (value: SelectorType) => void;
}

const Selector = ({ list, placeHolder, className, value, setValue }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className={cm('relative h-11 overflow-visible', className)}>
      <button
        className={cm(
          'flex h-11 w-full items-center justify-between rounded-lg border border-grey-80 pl-3 pr-[14.5px]',
          { 'rounded-b-none border-grey-40': isOpen },
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        <p
          className={cm('text-[14px] font-medium -tracking-[0.03em] text-grey-10', {
            'text-grey-50': isOpen,
          })}
        >
          {value && !isOpen ? value.label : placeHolder}
        </p>
        <Image
          src='/assets/icons/common/chevron-category.svg'
          alt='chevron'
          width={23.5}
          height={24.5}
          className={cm('', { 'rotate-180': !isOpen })}
          draggable={false}
        />
      </button>
      {isOpen && (
        <div className='absolute left-0 right-0 flex max-h-[calc(40px*4)] flex-col items-start overflow-hidden overflow-y-scroll overscroll-y-none rounded-b-lg border border-t-0 border-grey-40 scrollbar-hide'>
          {list.map((v, idx) => {
            return (
              <button
                key={`selector${idx}`}
                className='flex h-10 w-full shrink-0 items-center border-b border-b-grey-90 bg-white px-3 last-of-type:border-b-0'
                onClick={() => {
                  setIsOpen(false);
                  setValue && setValue(v);
                }}
              >
                <p className='text-[13px] font-medium -tracking-[0.03em] text-grey-10'>{v.label}</p>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Selector;
