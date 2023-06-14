import Image from 'next/image';
import Link from 'next/link';
import { formatToLocaleString } from 'src/utils/functions';

const ProductItem = () => {
  return (
    <Link href={{ pathname: '/product', query: { id: 1 } }}>
      <div className='relative aspect-square w-full overflow-hidden rounded-lg'>
        <Image fill src='/dummy/dummy-thumbnail-1.png' alt='image' draggable={false} />
        <span
          className='absolute bottom-2 right-2 flex h-9 w-9 items-center justify-center rounded-full bg-[#5B5D62]/[.7] backdrop-blur-[2.5px]'
          onClick={e => {
            e.preventDefault();
            console.log('장바구니 id:1');
          }}
        >
          <Image src='/assets/icons/common/cart-product.svg' alt='cart' width={16} height={17} />
        </span>
      </div>
      <p className='mt-2 line-clamp-2 text-start text-[14px] font-normal leading-[22px] -tracking-[0.03em] text-grey-10'>
        [현대식 냉풍기계 건조] 목포 반건조 병어 37-~510g
      </p>
      <div className='mt-0.5 flex items-center gap-0.5'>
        <p className='text-[16px] font-bold leading-[24px] -tracking-[0.03em] text-teritory'>{`${15}%`}</p>
        <p className='text-[16px] font-bold leading-[24px] -tracking-[0.03em] text-grey-10'>{`${formatToLocaleString(
          12300,
        )}원`}</p>
      </div>
      <p className='-mt-0.5 text-start text-[13px] font-normal leading-[20px] -tracking-[0.03em] text-grey-60 line-through'>{`${formatToLocaleString(
        15000,
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
        <p className='text-[13px] font-medium leading-[20px] -tracking-[0.03em] text-grey-70'>{`${0}+`}</p>
      </div>
    </Link>
  );
};

export default ProductItem;
