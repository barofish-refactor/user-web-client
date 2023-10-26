import Image from 'next/image';
import { formatToLocaleString } from 'src/utils/functions';

interface Props {
  data: {
    taste: number;
    freshness: number;
    price: number;
    packaging: number;
    size: number;
  };
}

/** 구매자들의 솔직 리뷰 */
export function ReviewChart({ data }: Props) {
  const { ...chartData } = data;
  const maxValue = Object.values(chartData).reduce((a, b) => (a > b ? a : b));

  return (
    <div className='px-4 pb-[30px] pt-5'>
      <p className='text-[18px] font-bold leading-[24px] -tracking-[0.03em] text-grey-10'>
        구매자들의 솔직 리뷰
      </p>
      <p className='text-[15px] font-medium leading-[20px] -tracking-[0.03em] text-grey-60'>
        다른 구매자들은 상품을 이렇게 평가했어요.
      </p>
      <div className='mt-2.5 flex items-center py-[3px]'>
        <Image
          unoptimized
          src='/assets/icons/product/check-real-review.svg'
          alt='check'
          width={14}
          height={10}
          draggable={false}
        />
        <p className='ml-1.5 text-[15px] font-bold leading-[20px] -tracking-[0.03em] text-secondary-50'>{`총 ${formatToLocaleString(
          data.taste + data.freshness + data.price + data.packaging + data.size,
        )}개`}</p>
        <p className='text-[15px] font-medium leading-[20px] -tracking-[0.03em] text-grey-10'>
          의 평가
        </p>
      </div>
      {/* chart */}
      <div className='mt-2.5 flex flex-col gap-2.5'>
        {/* 맛 */}
        <div className='relative'>
          <div className='h-8 w-full rounded-r-lg bg-grey-80/10'>
            <div className='h-full w-[70%]'>
              <div
                className='h-full rounded-r-lg bg-secondary-80'
                style={{ width: data.taste === 0 ? 0 : (data.taste / maxValue) * 100 + '%' }}
              />
            </div>
          </div>
          <div className='absolute top-0 flex h-8 w-full items-center justify-between px-2'>
            <div className='flex items-center gap-2'>
              <Image
                unoptimized
                src='/assets/icons/product/real-review-taste.svg'
                alt='taste'
                width={16}
                height={16}
                draggable={false}
              />
              <p className='text-[16px] font-semibold -tracking-[0.03em] text-grey-10'>
                맛이 만족스러워요
              </p>
            </div>
            <p className='text-[16px] font-bold -tracking-[0.03em] text-primary-70'>{`${data.taste}명`}</p>
          </div>
        </div>
        {/* 신선도 */}
        <div className='relative'>
          <div className='h-8 w-full rounded-r-lg bg-grey-80/10'>
            <div className='h-full w-[70%]'>
              <div
                className='h-full rounded-r-lg bg-secondary-80'
                style={{
                  width: data.freshness === 0 ? 0 : (data.freshness / maxValue) * 100 + '%',
                }}
              />
            </div>
          </div>
          <div className='absolute top-0 flex h-8 w-full items-center justify-between px-2'>
            <div className='flex items-center gap-2'>
              <Image
                unoptimized
                src='/assets/icons/product/real-review-freshness.svg'
                alt='taste'
                width={16}
                height={16}
                draggable={false}
              />
              <p className='text-[16px] font-semibold -tracking-[0.03em] text-grey-10'>
                신선도가 좋아요
              </p>
            </div>
            <p className='text-[14px] font-bold -tracking-[0.03em] text-primary-70'>{`${data.freshness}명`}</p>
          </div>
        </div>
        {/* 가격 */}
        <div className='relative'>
          <div className='h-8 w-full rounded-r-lg bg-grey-80/10'>
            <div className='h-full w-[70%]'>
              <div
                className='h-full rounded-r-lg bg-secondary-80'
                style={{ width: data.price === 0 ? 0 : (data.price / maxValue) * 100 + '%' }}
              />
            </div>
          </div>
          <div className='absolute top-0 flex h-8 w-full items-center justify-between px-2'>
            <div className='flex items-center gap-2'>
              <Image
                unoptimized
                src='/assets/icons/product/real-review-price.svg'
                alt='taste'
                width={16}
                height={16}
                draggable={false}
              />
              <p className='text-[16px] font-semibold -tracking-[0.03em] text-grey-10'>
                가격이 합리적이에요
              </p>
            </div>
            <p className='text-[16px] font-bold -tracking-[0.03em] text-primary-70'>{`${data.price}명`}</p>
          </div>
        </div>
        {/* 포장 */}
        <div className='relative'>
          <div className='h-8 w-full rounded-r-lg bg-grey-80/10'>
            <div className='h-full w-[70%]'>
              <div
                className='h-full rounded-r-lg bg-secondary-80'
                style={{
                  width: data.packaging === 0 ? 0 : (data.packaging / maxValue) * 100 + '%',
                }}
              />
            </div>
          </div>
          <div className='absolute top-0 flex h-8 w-full items-center justify-between px-2'>
            <div className='flex items-center gap-2'>
              <Image
                unoptimized
                src='/assets/icons/product/real-review-packaging.svg'
                alt='taste'
                width={16}
                height={16}
                draggable={false}
              />
              <p className='text-[16px] font-semibold -tracking-[0.03em] text-grey-10'>
                포장이 꼼꼼해요
              </p>
            </div>
            <p className='text-[16px] font-bold -tracking-[0.03em] text-primary-70'>{`${data.packaging}명`}</p>
          </div>
        </div>
        {/* 크기 */}
        <div className='relative'>
          <div className='h-8 w-full rounded-r-lg bg-grey-80/10'>
            <div className='h-full w-[70%]'>
              <div
                className='h-full rounded-r-lg bg-secondary-80'
                style={{ width: data.size === 0 ? 0 : (data.size / maxValue) * 100 + '%' }}
              />
            </div>
          </div>
          <div className='absolute top-0 flex h-8 w-full items-center justify-between px-2'>
            <div className='flex items-center gap-2'>
              <Image
                unoptimized
                src='/assets/icons/product/real-review-size.svg'
                alt='taste'
                width={16}
                height={16}
                draggable={false}
              />
              <p className='text-[16px] font-semibold -tracking-[0.03em] text-grey-10'>
                크기가 사진과 같아요
              </p>
            </div>
            <p className='text-[16px] font-bold -tracking-[0.03em] text-primary-70'>{`${data.size}명`}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
