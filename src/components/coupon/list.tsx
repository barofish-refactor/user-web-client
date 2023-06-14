import clsx from 'clsx';
import { type Coupon } from 'src/api/swagger/data-contracts';
import { CouponItem } from 'src/components/coupon';

export function CouponList({
  list,
  isAvailable,
  className,
}: {
  list: Coupon[] | undefined;
  isAvailable?: boolean;
  className?: string;
}) {
  return (
    <article className={clsx(className, 'grid space-y-3')}>
      {list?.map(v => (
        <CouponItem key={v.id} item={v} isAvailable={isAvailable} />
      ))}
    </article>
  );
}
