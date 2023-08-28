import { formatToLocaleString } from 'src/utils/functions';

const wrapClassName = 'flex flex-col items-center justify-center gap-0.5';
const labelClassName = 'text-[12px] leading-[18px] -tracking-[0.03em] text-grey-50';
const valueClassName = 'font-bold text-[18px] leading-[21.48px] -tracking-[0.03em] text-grey-10';

interface Props {
  totalCount: number | undefined;
  deliveryDoneCount: number;
  cancelRefundCount: number;
}

export function MypageOrderStatistics({
  totalCount = 0,
  deliveryDoneCount,
  cancelRefundCount,
}: Props) {
  return (
    <div className='grid h-20 grid-cols-[1fr,auto,1fr,auto,1fr] items-center'>
      <div className={wrapClassName}>
        <strong className={valueClassName}>{formatToLocaleString(totalCount)}</strong>
        <span className={labelClassName}>전체</span>
      </div>
      <div className='h-6 w-[1px] bg-[#e2e2e2]' />
      <div className={wrapClassName}>
        <strong className={valueClassName}>{formatToLocaleString(deliveryDoneCount)}</strong>
        <span className={labelClassName}>배송완료</span>
      </div>
      <div className='h-6 w-[1px] bg-[#e2e2e2]' />
      <div className={wrapClassName}>
        <strong className={valueClassName}>{formatToLocaleString(cancelRefundCount)}</strong>
        <span className={labelClassName}>취소/환불</span>
      </div>
    </div>
  );
}
