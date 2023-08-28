import clsx from 'clsx';
import { type CouponNavType } from 'src/components/coupon/nav';
import { formatToLocaleString } from 'src/utils/functions';

export function CouponTotalCount({
  total = 0,
  className,
  navType,
}: {
  total: number | undefined;
  className?: string;
  navType: CouponNavType;
}) {
  return (
    <div className={clsx(className, 'bg-white px-4 py-3')}>
      <span className='text-[14px] leading-[22px] -tracking-[0.03em] text-grey-20'>
        {navType === 'available' ? '발급 가능한 쿠폰' : '보유 쿠폰'}{' '}
        <strong className='font-semibold text-primary-50'>{formatToLocaleString(total)}</strong>장
      </span>
    </div>
  );
}
