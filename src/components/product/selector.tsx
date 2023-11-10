import Image from 'next/image';
import React, { useState } from 'react';
import cm from 'src/utils/class-merge';
import { formatToLocaleString } from 'src/utils/functions';

export interface ProductSelectorType {
  // id: number;
  optionId: number;
  productId: number;
  option: string;
  price: number;
  value: string;
  additionalPrice: number;
  amount: number;
  stock: number;
  maxAvailableStock: number;
}

interface Props {
  index: number;
  list: ProductSelectorType[];
  placeHolder?: string;
  className?: string;
  setValue?: (value: ProductSelectorType) => void;
  isNeeded?: boolean;
}

/** 상품 옵션 선택 Selector */
const Selector = ({ index, list, placeHolder, className, setValue, isNeeded }: Props) => {
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
          className={cm('text-[16px] font-medium -tracking-[0.03em] text-grey-10', {
            'text-grey-50': isOpen,
          })}
        >
          {placeHolder}
          {/* {value && !isOpen ? value.option : placeHolder} */}
        </p>
        <Image
          unoptimized
          src='/assets/icons/common/chevron-category.svg'
          alt='chevron'
          width={23.5}
          height={24.5}
          className={cm({ 'rotate-180': !isOpen })}
          draggable={false}
        />
      </button>
      {isOpen && (
        <div
          className='absolute left-0 right-0 flex max-h-[calc(68px*2.5)] flex-col items-start overflow-hidden overflow-y-scroll overscroll-y-none rounded-b-lg border border-t-0 border-grey-40 scrollbar-hide'
          style={{ zIndex: 999 - index }}
        >
          {list.map((v, idx) => {
            const isSoldOut = v.stock === 0;
            return (
              <button
                key={`selector${idx}`}
                className={cm(
                  'flex h-[68px] w-full shrink-0 flex-col justify-center gap-1 border-b border-b-grey-90 bg-white px-3 last-of-type:border-b-0',
                )}
                onClick={() => {
                  if (isSoldOut) return;
                  setIsOpen(false);
                  setValue && setValue(v);
                }}
              >
                <p
                  className={cm(
                    'text-[15px] font-medium leading-[20px] -tracking-[0.03em] text-grey-30',
                    { 'opacity-70': isSoldOut },
                  )}
                >
                  {`${v.option}`}{' '}
                  {isNeeded &&
                    v.additionalPrice !== 0 &&
                    `(${v.additionalPrice > 0 ? '+' : ''}${formatToLocaleString(
                      v.additionalPrice,
                    )}원)`}
                  {`${isSoldOut ? '(품절)' : ''}`}
                </p>
                <p
                  className={cm(
                    'text-[18px] font-semibold leading-[24px] -tracking-[0.03em] text-grey-10',
                    { 'opacity-70': isSoldOut },
                  )}
                >
                  {`${formatToLocaleString(v.price + v.additionalPrice)}원`}
                </p>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Selector;
