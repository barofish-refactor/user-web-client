import Image from 'next/image';
import { useRouter } from 'next/router';
import { formatToLocaleString } from 'src/utils/functions';

const ProductSmallSlideItem = () => {
  const router = useRouter();

  return (
    <div
      className='cursor-pointer'
      onClick={() => {
        router.push({ pathname: '/product', query: { id: 1 } });
      }}
    >
      <div className='relative aspect-square w-full overflow-hidden rounded-lg'>
        <Image fill src='/dummy/dummy-thumbnail-2.png' alt='image' draggable={false} />
        <button
          className='absolute bottom-2 right-2 flex h-9 w-9 items-center justify-center rounded-full bg-[#5B5D62]/[.7]'
          onClick={e => {
            e.stopPropagation();
            console.log('장바구니');
          }}
        >
          <Image src='/assets/icons/common/cart-product.svg' alt='cart' width={16} height={17} />
        </button>
      </div>
      <p className='mt-2 line-clamp-2 text-[14px] font-normal leading-[22px] -tracking-[3%] text-grey-10'>
        [-55℃ 급속냉동] 국내산 흰다리새우 1kg
      </p>
      <div className='mt-0.5 flex items-center gap-0.5'>
        <p className='text-[16px] font-bold leading-[24px] -tracking-[3%] text-teritory'>{`${15}%`}</p>
        <p className='text-[16px] font-bold leading-[24px] -tracking-[3%] text-grey-10'>{`${formatToLocaleString(
          47601,
        )}원`}</p>
      </div>
      <p className='-mt-0.5 text-[13px] font-normal leading-[20px] -tracking-[3%] text-grey-60 line-through'>{`${formatToLocaleString(
        15000,
      )}원`}</p>
      <div className='mt-0.5 flex items-center gap-0.5'>
        <Image
          src='/assets/icons/common/speech-bubble.svg'
          alt='후기'
          width={16}
          height={16}
          draggable={false}
        />
        <p className='text-[13px] font-medium leading-[20px] -tracking-[3%] text-grey-70'>후기</p>
        <p className='text-[13px] font-medium leading-[20px] -tracking-[3%] text-grey-70'>{`${0}+`}</p>
      </div>
    </div>
  );
};

export default ProductSmallSlideItem;
