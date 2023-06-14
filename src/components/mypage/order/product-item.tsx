import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { type OrderProductDto } from 'src/api/swagger/data-contracts';
import { formatToLocaleString } from 'src/utils/functions';
import { parseProductInfoState } from 'src/utils/parse';

/* 
  상태에 따른 버튼 노출 필요
  버튼이 하나도 없으면 hasButtons = false 필요
*/

const buttonClassName =
  'rounded-sm border border-[#f2f2f2] text-[13px] leading-[20px] -tracking-[0.03em] text-grey-30';

interface Props {
  totalPrice: number | undefined;
  item: OrderProductDto;
}

export function MypageOrderProductItem({ item, totalPrice }: Props) {
  const hasButtons = true;
  return (
    <div className={clsx('last:pb-0', hasButtons ? 'pb-5' : 'pb-0')}>
      <p
        data-done={item.state !== 'DELIVERY_READY'}
        className='text-[14px] font-semibold leading-[22px] -tracking-[0.03em] text-primary-50 data-[done=true]:text-grey-50'
      >
        {parseProductInfoState(item.state)}
      </p>
      <div className='mt-2 flex items-center gap-2.5'>
        <Link href={{ pathname: '/product', query: { id: item.product?.id } }}>
          <Image
            priority
            src='https://picsum.photos/70/70'
            alt='product'
            width={70}
            height={70}
            className='aspect-square h-[70px] w-[70px] rounded object-cover'
          />
        </Link>
        <div className='flex-1'>
          <h4 className='line-clamp-1 text-[13px] font-medium leading-[20px] -tracking-[0.03em] text-grey-10'>
            {item.product?.title ?? ''}
          </h4>
          <p className='line-clamp-1 text-[13px] leading-[20px] -tracking-[0.03em] text-grey-40'>
            기본
          </p>
          <div className='mt-0.5 flex items-center gap-1'>
            <span className='text-[13px] leading-[20px] -tracking-[0.03em] text-grey-60'>
              {formatToLocaleString(item.amount, { suffix: '개' })}
            </span>
            <strong className='text-[14px] font-medium leading-[22px] -tracking-[0.03em]'>
              {formatToLocaleString(totalPrice, { suffix: '원' })}
            </strong>
          </div>
        </div>
      </div>
      {hasButtons && (
        <nav className='mt-3 grid h-8 grid-flow-col gap-x-1.5'>
          <Link href='#' className={buttonClassName}>
            취소/환불
          </Link>
          <Link href='#' className={buttonClassName}>
            교환 요청
          </Link>
          <button className={buttonClassName}>구매 확정</button>
          <button className={buttonClassName}>배송 조회</button>
          <Link href='#' className={buttonClassName}>
            후기 작성
          </Link>
          <Link href='#' className={buttonClassName}>
            재구매
          </Link>
        </nav>
      )}
    </div>
  );
}
