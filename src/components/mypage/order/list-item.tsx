import Link from 'next/link';
import { type OrderProductDto } from 'src/api/swagger/data-contracts';
import { MypageOrderProductItem } from 'src/components/mypage/order';
import { formatToUtc } from 'src/utils/functions';

interface Props {
  id: string | undefined;
  orderedAt: string | undefined;
  orderProducts: OrderProductDto[] | undefined;
  totalPrice: number | undefined;
}

export function MypageOrderListItem({ id, orderedAt, orderProducts, totalPrice }: Props) {
  return (
    <div>
      <div className='flex h-[56px] items-center justify-between border-b border-b-grey-90 px-4'>
        <time
          dateTime={orderedAt}
          className='font-semibold leading-[24px] -tracking-[0.03em] text-grey-10'
        >
          {formatToUtc(orderedAt, 'yy.MM.dd')}
        </time>
        <Link
          href={{ pathname: '/mypage/order/[id]', query: { id } }}
          className='inline-flex h-6 w-6 bg-[url(/assets/icons/common/chevron-mypage.svg)] bg-cover'
        />
      </div>
      <div className='p-4 pb-6'>
        {orderProducts?.map((v, i) => (
          <MypageOrderProductItem key={i} item={v} totalPrice={totalPrice} />
        ))}
      </div>
    </div>
  );
}
