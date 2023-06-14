import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { type ProductListDto, type AddBasketPayload } from 'src/api/swagger/data-contracts';
import cm from 'src/utils/class-merge';
import { calcDiscountPrice, formatToLocaleString } from 'src/utils/functions';

interface Props {
  data: ProductListDto;
  type: 'SMALL' | 'LARGE';
  onMutate: (value: AddBasketPayload) => void;
}

const ProductSmallSlideItem = ({ data, type }: Props) => {
  const router = useRouter();
  // const image = (data.images ?? '').replace('[', '').replace(']', '').split(',');

  return (
    <button
      className='flex w-full flex-col text-start'
      onClick={() => {
        router.push({ pathname: '/product', query: { id: data.id } });
      }}
    >
      <div
        className={cm('relative aspect-square w-full overflow-hidden rounded-lg', {
          'aspect-[131/132]': type === 'SMALL',
        })}
      >
        <Image fill src={data.image ?? ''} alt='image' draggable={false} />
        <Link
          href={{ pathname: '/product', query: { id: data.id, openState: 'open' } }}
          as={{ pathname: '/product', query: { id: data.id } }}
          className='absolute bottom-2 right-2 flex h-9 w-9 items-center justify-center rounded-full bg-[#5B5D62]/[.7] backdrop-blur-[2.5px]'
        >
          <Image src='/assets/icons/common/cart-product.svg' alt='cart' width={16} height={17} />
        </Link>
      </div>
      <p className='mt-2 line-clamp-2 text-[14px] font-normal leading-[22px] -tracking-[0.03em] text-grey-10'>
        {data.title}
      </p>
      <div className='mt-0.5 flex items-center gap-0.5'>
        <p className='text-[16px] font-bold leading-[24px] -tracking-[0.03em] text-teritory'>{`${data.discountRate}%`}</p>
        <p className='text-[16px] font-bold leading-[24px] -tracking-[0.03em] text-grey-10'>{`${formatToLocaleString(
          calcDiscountPrice(data.originPrice, data.discountRate),
        )}원`}</p>
      </div>
      <p className='-mt-0.5 text-[13px] font-normal leading-[20px] -tracking-[0.03em] text-grey-60 line-through'>{`${formatToLocaleString(
        data.originPrice,
      )}원`}</p>
      <div className='mt-1 flex items-center gap-0.5'>
        <Image
          src='/assets/icons/common/speech-bubble.svg'
          alt='후기'
          width={16}
          height={16}
          draggable={false}
        />
        <p className='text-[13px] font-medium leading-[20px] -tracking-[0.03em] text-grey-70'>
          후기
        </p>
        <p className='text-[13px] font-medium leading-[20px] -tracking-[0.03em] text-grey-70'>{`${
          data.reviewCount ?? 0
        }`}</p>
      </div>
    </button>
  );
};

export default ProductSmallSlideItem;
