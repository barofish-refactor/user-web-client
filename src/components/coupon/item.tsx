import s from './item.module.css';
import clsx from 'clsx';
import Image from 'next/image';
import { type Coupon } from 'src/api/swagger/data-contracts';
import cm from 'src/utils/class-merge';
import { formatToLocaleString, formatToUtc } from 'src/utils/functions';

export function CouponItem({
  item,
  isAvailable,
  isOrder,
  onClick,
  isCoupon,
}: {
  item: Coupon;
  isAvailable?: boolean;
  isCoupon?: boolean;
  isOrder?: boolean;
  onClick?: (item: Coupon) => void;
}) {
  // const hasBorder = item.id % 2 === 0;
  const hasBorder = !!isCoupon;

  const onDownload = () => {
    if (onClick) onClick(item);
    else alert('다운로드');
  };

  return (
    <div
      data-border={hasBorder}
      className={cm(
        s.coupon,
        'h-[144px] overflow-hidden rounded-lg  shadow-[0px_3px_6px_rgba(0,0,0,0.15)]',
        { 'cursor-pointer': isOrder },
        { 'cursor-auto': !isCoupon },
        { 'border border-grey-80 shadow-none ': !isCoupon },
      )}
      onClick={() => {
        if (isOrder && onClick) onDownload();
      }}
    >
      <div className={cm('relative flex h-full overflow-hidden rounded-lg bg-white', {})}>
        {isCoupon && <LinearGradient />}

        <div className='relative z-[1] flex h-full w-full rounded-lg'>
          <div className={clsx(s.content, 'flex flex-1 flex-col justify-between')}>
            <div>
              <h4
                className={cm(
                  'text-[14px] font-semibold leading-[22px] -tracking-[0.03em] text-grey-20',
                  { 'text-grey-70': !isCoupon },
                )}
              >
                {item.title}
              </h4>
              <strong
                className={cm(
                  'text-[30px] font-bold leading-[36px] -tracking-[0.03em] text-primary-40',
                  { 'text-grey-70': !isCoupon },
                )}
              >
                {formatToLocaleString(item.amount, {
                  suffix: item.type === 'RATE' ? '%' : '원',
                })}
                <span
                  className={cm(
                    'ml-0.5 text-[14px] font-semibold leading-[22px] -tracking-[0.03em] text-primary-40',
                    { 'text-grey-70': !isCoupon },
                  )}
                >
                  할인
                </span>
              </strong>
            </div>
            <div className='flex items-center gap-[7px]'>
              <span
                className={cm(
                  'text-[13px] font-medium leading-[20px] -tracking-[0.03em] text-grey-50',
                  {
                    'text-grey-70': !isCoupon,
                  },
                )}
              >
                {formatToUtc(item.startAt, 'yy.MM.dd')} ~ {formatToUtc(item.endAt, 'yy.MM.dd')}
              </span>
              <span
                className={cm('text-[12px] leading-[18px] -tracking-[0.03em] text-grey-60', {
                  'text-[red]': !isCoupon,
                })}
              >
                {`최소 ${formatToLocaleString(item.minPrice)}원 이상 구매 시`}
              </span>
            </div>
          </div>
          <button
            disabled={!isAvailable && !isOrder}
            className={cm(
              'grid h-full basis-[67px] place-items-center border-l border-dashed border-primary-70',
              { 'cursor-auto': !isCoupon },
            )}
            onClick={onDownload}
          >
            {isAvailable && !isOrder && (
              <Image
                unoptimized
                src='/assets/icons/coupon/download.svg'
                width={24}
                height={24}
                alt='다운로드'
              />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

function LinearGradient() {
  return (
    <svg
      className='absolute right-0 top-0'
      width='215'
      height='144'
      viewBox='0 0 215 144'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <g clipPath='url(#clip0_1912_41)'>
        <path
          d='M162 107C205.505 107 245.589 28.2994 257.601 -9.23611C257.807 -9.87804 257.316 -10.5 256.642 -10.5H1C0.447715 -10.5 0 -10.0523 0 -9.50001V191C0 191.552 0.435687 192 0.987971 192H56C82.5 192 105.48 107 162 107Z'
          fill='url(#paint0_linear_1912_41)'
        />
      </g>
      <defs>
        <linearGradient
          id='paint0_linear_1912_41'
          x1='195'
          y1='128'
          x2='84.5'
          y2='76'
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor='#F0F7FE' />
          <stop offset='1' stopColor='#F0F7FE' stopOpacity='0' />
        </linearGradient>
        <clipPath id='clip0_1912_41'>
          <rect width='215' height='144' fill='white' />
        </clipPath>
      </defs>
    </svg>
  );
}
