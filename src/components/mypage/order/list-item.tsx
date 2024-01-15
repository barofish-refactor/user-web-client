import Link from 'next/link';
import { type OrderDto } from 'src/api/swagger/data-contracts';
import { MypageOrderProductItem } from 'src/components/mypage/order';
import { formatToUtc } from 'src/utils/functions';

interface Props {
  data?: OrderDto;
  apiKey: string;
}

export function MypageOrderListItem({ data, apiKey }: Props) {
  const productInfos = data?.productInfos ?? [];
  return (
    <div className='w-full'>
      <Link
        href={{ pathname: '/mypage/order/[id]', query: { id: data?.id } }}
        className='flex h-[56px] items-center justify-between border-b border-b-grey-90 px-4'
      >
        <time
          dateTime={data?.orderedAt}
          className='font-semibold leading-[24px] -tracking-[0.03em] text-grey-10'
        >
          {formatToUtc(data?.orderedAt, 'yy.MM.dd')}
        </time>
        <div className='inline-flex h-6 w-6 bg-[url(/assets/icons/common/chevron-mypage.svg)] bg-cover' />
      </Link>
      <div className='p-4 pb-6'>
        {data &&
          productInfos.map(v => (
            <MypageOrderProductItem
              key={v.id}
              item={v}
              id={data.id}
              apiKey={apiKey}
              isAllCancel={
                !!data.couponDiscount && data.couponDiscount !== 0 && productInfos.length > 1
              } // 상품이 두개 이상, 쿠폰을 썼을 경우 true
            />
          ))}
      </div>
    </div>
  );
}
