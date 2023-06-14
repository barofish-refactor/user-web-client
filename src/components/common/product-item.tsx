import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { type ProductListDto, type Product } from 'src/api/swagger/data-contracts';
import { calcDiscountPrice, formatToLocaleString } from 'src/utils/functions';

interface Props {
  data: Product;
  dataDto?: ProductListDto;
}

const ProductItem = ({ data, dataDto }: Props) => {
  const router = useRouter();
  const image = (data.images ?? '')?.replace('[', '').replace(']', '').split(',');

  return (
    <button
      className='flex w-full flex-col text-start'
      onClick={() => {
        router.push({ pathname: '/product', query: { id: data.id } });
      }}
    >
      <div className='relative aspect-square w-full overflow-hidden rounded-lg'>
        <Image
          fill
          src={(dataDto ? dataDto.image : image?.[0]) ?? '/'}
          alt='image'
          draggable={false}
        />
        <Link
          href={{ pathname: '/product', query: { id: data.id, openState: 'open' } }}
          as={{ pathname: '/product', query: { id: data.id } }}
          className='absolute bottom-2 right-2 grid h-9 w-9 place-items-center rounded-full bg-[#5B5D62]/[.7] backdrop-blur-[2.5px]'
        >
          <Image src='/assets/icons/common/cart-product.svg' alt='cart' width={16} height={17} />
        </Link>
      </div>
      <p className='mt-2 line-clamp-2 text-start text-[14px] font-normal leading-[22px] -tracking-[0.03em] text-grey-10'>
        {data.title}
      </p>
      <div className='mt-0.5 flex items-center gap-0.5'>
        <p className='text-[16px] font-bold leading-[24px] -tracking-[0.03em] text-teritory'>{`${
          data.discountRate ?? 0
        }%`}</p>
        <p className='text-[16px] font-bold leading-[24px] -tracking-[0.03em] text-grey-10'>{`${formatToLocaleString(
          calcDiscountPrice(data.originPrice, data.discountRate),
        )}원`}</p>
      </div>
      <p className='-mt-0.5 text-start text-[13px] font-normal leading-[20px] -tracking-[0.03em] text-grey-60 line-through'>{`${formatToLocaleString(
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
          (data.reviews ?? []).length
        }`}</p>
      </div>
    </button>
  );
};

export default ProductItem;
