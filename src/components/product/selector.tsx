import Image from 'next/image';
import React, { useState } from 'react';
import cm from 'src/utils/class-merge';
import { formatToLocaleString } from 'src/utils/functions';

export interface ProductSelectorType {
  id: number;
  option: string;
  price: number;
  value: string;
}

interface Props {
  list: ProductSelectorType[];
  placeHolder?: string;
  className?: string;
  setValue?: (value: ProductSelectorType) => void;
}

const Selector = ({ list, placeHolder, className, setValue }: Props) => {
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
          className={cm('text-[14px] font-medium -tracking-[3%] text-grey-10', {
            'text-grey-50': isOpen,
          })}
        >
          {placeHolder}
          {/* {value && !isOpen ? value.option : placeHolder} */}
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
        <div className='absolute left-0 right-0 flex flex-col items-start overflow-hidden rounded-b-lg border border-t-0 border-grey-40'>
          {list.map((v, idx) => {
            return (
              <button
                key={`selector${idx}`}
                className='flex h-[68px] w-full flex-col justify-center gap-1 border-b border-b-grey-90 bg-white px-3 last-of-type:border-b-0'
                onClick={() => {
                  setIsOpen(false);
                  setValue && setValue(v);
                }}
              >
                <p className='text-[13px] font-medium leading-[20px] -tracking-[3%] text-grey-30'>
                  {v.option}
                </p>
                <p className='text-[16px] font-semibold leading-[24px] -tracking-[3%] text-grey-10'>{`${formatToLocaleString(
                  v.price,
                )}원`}</p>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Selector;
