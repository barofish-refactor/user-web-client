import clsx from 'clsx';
import { addDays, isAfter } from 'date-fns';
import Image from 'next/image';
import { type Coupon } from 'src/api/swagger/data-contracts';
import { CouponItem } from 'src/components/coupon';
import { useAlertStore } from 'src/store';
import { formatToUtc } from 'src/utils/functions';

interface Props {
  setIsVisible: (value: boolean) => void;
  setCoupon: (coupon: Coupon | undefined) => void;
  data: Coupon[] | undefined;
  totalPrice: number;
}

/** 결제하기 - 쿠폰 선택 */
const ProductCoupon = ({ setIsVisible, setCoupon, data, totalPrice }: Props) => {
  const { setAlert } = useAlertStore();
  return (
    <div className='flex h-[100dvb] w-full flex-col items-center overscroll-y-contain bg-white'>
      {/* header */}
      <div className='sticky top-0 z-50 flex h-[56px] w-full shrink-0 items-center justify-between gap-3.5 bg-white px-4'>
        <button
          className={clsx('h-6 w-6 bg-[url(/assets/icons/common/close-base.svg)] bg-cover')}
          onClick={() => {
            history.back();
            setIsVisible(false);
          }}
        />
        <p className='text-[16px] font-bold -tracking-[0.03em] text-grey-10'>쿠폰함</p>
        <div className='w-6' />
      </div>
      {/* content */}
      {!data?.length ? (
        <Empty />
      ) : (
        <div className='h-full w-full flex-1 overflow-auto scrollbar-hide'>
          {data?.map(v => (
            <div key={v.id} className='px-3 pb-3'>
              <CouponItem
                isAvailable
                isOrder
                item={v}
                onClick={(value: Coupon) => {
                  if (value.minPrice && value.minPrice > totalPrice)
                    return setAlert({ message: '최소 결제금액을 확인해주세요.' });
                  if (value.type === 'AMOUNT' && (value.amount ?? 0) > totalPrice)
                    return setAlert({ message: '결제금액이 할인금액보다 작습니다.' });
                  if (
                    value.endAt
                      ? isAfter(
                          addDays(new Date(), -1),
                          new Date(formatToUtc(value.endAt, 'yyyy-MM-dd')),
                        )
                      : false
                  )
                    return setAlert({ message: '쿠폰 사용날짜가 지났습니다.' });
                  setCoupon(value);
                  history.back();
                  setIsVisible(false);
                }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

function Empty() {
  return (
    <div className='grid flex-1 place-items-center bg-white'>
      <div className='flex flex-col items-center gap-2'>
        <Image
          unoptimized
          src='/assets/icons/search/search-error.svg'
          alt='up'
          width={40}
          height={40}
        />
        <p className='whitespace-pre text-center text-[14px] font-medium leading-[20px] -tracking-[0.05em] text-[#B5B5B5]'>
          보유중인 쿠폰이 없습니다.
        </p>
      </div>
    </div>
  );
}

export default ProductCoupon;
