import clsx from 'clsx';
import { type Coupon } from 'src/api/swagger/data-contracts';
import { CouponItem } from 'src/components/coupon';

export function CouponList({
  list,
  isAvailable,
  isOrder,
  className,
  onDownload,
}: {
  list: Coupon[] | undefined;
  isAvailable?: boolean;
  isOrder?: boolean;
  className?: string;
  onDownload?: (item: Coupon) => void;
}) {
  return (
    <article className={clsx(className, 'grid w-full space-y-3')}>
      {list?.map(v => (
        <CouponItem
          key={v.id}
          item={v}
          isCoupon={true}
          isAvailable={isAvailable}
          isOrder={isOrder}
          onClick={onDownload}
        />
      ))}
    </article>
  );
}
