import Image from 'next/image';
import Link from 'next/link';
import { BackButton } from 'src/components/ui';
import { formatToLocaleString, formatToPhone } from 'src/utils/functions';

const headingClassName = 'font-bold leading-[24px] -tracking-[0.03em] text-grey-10';
const labelClassName = 'font-medium leading-[24px] -tracking-[0.03em] text-grey-50';
const subValueClassName = 'font-medium leading-[24px] -tracking-[0.03em] text-grey-20';

export function MypageOrderDetail() {
  const orderInfo = {
    name: '김바로',
    phone: '010-1234-5678',
  };
  const shippingAddressInfo = {
    name: '집',
    receiverName: '홍길동',
    phone: '010-1234-5678',
    address: '서울특별시 강남구 테헤란로 427 위워크타워 10층',
    addressDetail: '위워크타워 10층',
    memo: '부재 시 경비실에 맡겨주세요.',
  };
  const orderProducts = Array.from({ length: 2 }, (_, i) => ({
    id: i + 1,
    product: {
      id: i + 1,
      title: '[3차 세척, 스킨포장] 목포 손질 먹갈치400~650g',
      option: '중 1팩(4토막) 400g 내외',
      price: 12300,
      img: 'https://picsum.photos/70/70',
      shippingFee: 2500,
    },
    seller: {
      id: i + 1,
      profile: 'https://picsum.photos/28/28',
      name: '서준수산',
    },
  }));
  const paymentMethod = '네이버페이';
  const paymentAmountInfo = {
    orderPrice: 36480,
    shippingFee: 3000,
    discount: 0,
    useReward: 480,
    get total() {
      return this.orderPrice + this.shippingFee - this.discount - this.useReward;
    },
  };
  const rewardInfo = {
    /** 구매적립 */
    purchase: 360,
    review: 650,
    get total() {
      return this.purchase + this.review;
    },
  };
  return (
    <div>
      <header className='title-header'>
        <BackButton />
        <h2 className='font-semibold leading-[24px] -tracking-[0.03em] text-grey-10'>주문 상세</h2>
        <div className='h-6 w-6' />
      </header>
      <section className='pb-6'>
        <div className='px-4 pb-[22px] pt-4'>
          <h3 className={headingClassName}>주문자 정보</h3>
          <div className='grid grid-cols-[64px,1fr] gap-x-2 gap-y-4 pt-4'>
            <span className='text-[14px] font-medium leading-[22px] -tracking-[0.03em] text-grey-10'>
              이름
            </span>
            <span className='text-[14px] leading-[22px] -tracking-[0.03em] text-grey-50'>
              {orderInfo.name}
            </span>
            <span className='text-[14px] font-medium leading-[22px] -tracking-[0.03em] text-grey-10'>
              연락처
            </span>
            <span className='text-[14px] leading-[22px] -tracking-[0.03em] text-grey-50'>
              {formatToPhone(orderInfo.phone)}
            </span>
          </div>
        </div>
        <hr className='border-t-8 border-grey-90' />
        <div className='px-4 py-[22px]'>
          <h3 className={headingClassName}>배송지</h3>
          <div className='pt-[22px]'>
            <h4 className={headingClassName}>{shippingAddressInfo.name}</h4>
            <p className='mt-1 font-medium leading-[24px] -tracking-[0.03em] text-grey-10'>
              {shippingAddressInfo.receiverName},{formatToPhone(shippingAddressInfo.phone)}
            </p>
            <hr className='my-2.5 border-grey-90' />
            <p className='font-medium leading-[24px] -tracking-[0.03em] text-grey-10'>
              {shippingAddressInfo.address}, {shippingAddressInfo.addressDetail}
            </p>
            <p className='mt-1 text-[14px] font-medium leading-[22px] -tracking-[0.03em] text-grey-70'>
              {shippingAddressInfo.memo}
            </p>
          </div>
        </div>
        <hr className='border-t-8 border-grey-90' />
        <div className='px-4 py-[22px]'>
          <h3 className={headingClassName}>주문 상품</h3>
          <article className='space-y-4 pt-[22px]'>
            {orderProducts.map(v => (
              <div key={v.id} className='border-b border-b-grey-90 pb-4 last:border-0 last:pb-0'>
                <div className='flex items-center justify-between'>
                  <Link href='#' className='flex items-center gap-2'>
                    <Image
                      className='aspect-square h-7 w-7 rounded-full border border-grey-90 object-cover'
                      width={28}
                      height={28}
                      alt='스토어'
                      src={v.seller.profile}
                    />
                    <span className='font-semibold leading-[24px] -tracking-[0.03em] text-grey-10'>
                      {v.seller.name}
                    </span>
                  </Link>
                  <div className='flex items-center gap-1'>
                    <span className='text-[13px] font-medium leading-[20px] -tracking-[0.03em] text-grey-50'>
                      배송비
                    </span>
                    <span className='text-[13px] font-bold leading-[20px] -tracking-[0.03em] text-grey-20'>
                      {formatToLocaleString(v.product.shippingFee, { suffix: '원' })}
                    </span>
                  </div>
                </div>
                <div className='flex items-center gap-2.5 pt-3'>
                  <Link href='#'>
                    <Image
                      src={v.product.img}
                      width={70}
                      height={70}
                      alt='product'
                      className='aspect-square h-[70px] w-[70px] rounded object-cover'
                    />
                  </Link>
                  <div className='flex flex-1 flex-col justify-center gap-1'>
                    <h4 className='text-[14px] font-medium leading-[22px] -tracking-[0.03em] text-grey-10'>
                      {v.product.title}
                    </h4>
                    <p className='text-[14px] leading-[22px] -tracking-[0.03em] text-grey-40'>
                      {v.product.option}
                    </p>
                  </div>
                </div>
                <p className='text-right font-bold leading-[24px] -tracking-[0.03em] text-grey-10'>
                  {formatToLocaleString(v.product.price, { suffix: '원' })}
                </p>
              </div>
            ))}
          </article>
        </div>
        <hr className='border-t-8 border-grey-90' />
        <div className='flex items-center justify-between px-4 py-[22px]'>
          <h3 className={headingClassName}>결제 수단</h3>
          <p className='font-semibold leading-[24px] -tracking-[0.03em] text-grey-10'>
            {paymentMethod}
          </p>
        </div>
        <hr className='border-t-8 border-grey-90' />
        <div className='px-4 py-[22px]'>
          <h3 className={headingClassName}>결제 금액</h3>
          <div className='space-y-2.5 py-4'>
            <div className='flex items-center justify-between'>
              <span className={labelClassName}>주문금액</span>
              <span className={subValueClassName}>
                {formatToLocaleString(paymentAmountInfo.orderPrice, { suffix: '원' })}
              </span>
            </div>
            <div className='flex items-center justify-between'>
              <span className={labelClassName}>배송비</span>
              <span className={subValueClassName}>
                {formatToLocaleString(paymentAmountInfo.shippingFee, { prefix: '+', suffix: '원' })}
              </span>
            </div>
            <div className='flex items-center justify-between'>
              <span className={labelClassName}>쿠폰할인</span>
              <span className={subValueClassName}>
                {formatToLocaleString(paymentAmountInfo.discount, { prefix: '-', suffix: '원' })}
              </span>
            </div>
            <div className='flex items-center justify-between'>
              <span className={labelClassName}>적립금사용</span>
              <span className={subValueClassName}>
                {formatToLocaleString(paymentAmountInfo.discount, { prefix: '-', suffix: '원' })}
              </span>
            </div>
          </div>
          <hr className='border-[#f7f7f7]' />
          <div className='mt-4 flex items-center justify-between'>
            <h4 className={headingClassName}>최종 결제 금액</h4>
            <strong className='text-[20px] leading-[30px] -tracking-[0.03em] text-grey-10'>
              {formatToLocaleString(paymentAmountInfo.total, { suffix: '원' })}
            </strong>
          </div>
        </div>
        <hr className='border-t-8 border-grey-90' />
        <div className='px-4 py-[22px]'>
          <h3 className={headingClassName}>적립금 혜택</h3>
          <div className='space-y-2.5 py-4'>
            <div className='flex justify-between'>
              <span className={labelClassName}>구매적립</span>
              <div className='text-right'>
                <span className={subValueClassName}>
                  {formatToLocaleString(rewardInfo.purchase, { prefix: '최대 ', suffix: '원' })}
                </span>
                <p className='text-[14px] leading-[22px] -tracking-[0.03em] text-grey-60'>
                  (멸치 등급 : 구매 적립 1%)
                </p>
              </div>
            </div>
            <div className='flex justify-between'>
              <span className={labelClassName}>후기작성</span>
              <span className={subValueClassName}>
                {formatToLocaleString(rewardInfo.review, { prefix: '최대 ', suffix: '원' })}
              </span>
            </div>
          </div>
          <hr className='border-grey-90' />
          <div className='flex items-center justify-between pt-[22px]'>
            <h4 className={headingClassName}>적립 금액</h4>
            <strong className='text-[20px] font-bold leading-[30px] -tracking-[0.03em] text-primary-50'>
              {formatToLocaleString(rewardInfo.total, { prefix: '최대 ', suffix: '원' })}
            </strong>
          </div>
        </div>
      </section>
    </div>
  );
}
