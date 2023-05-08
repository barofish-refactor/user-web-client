import Image from 'next/image';
import { formatToLocaleString } from 'src/utils/functions';

const ProductItem = () => {
  return (
    <div className=''>
      <div className='relative aspect-square w-full overflow-hidden rounded-lg'>
        <Image fill src='/dummy/dummy-thumbnail-1.png' alt='image' draggable={false} />
        <button
          className='absolute bottom-2 right-2 flex h-9 w-9 items-center justify-center rounded-full bg-[#5B5D62]/[.7]'
          onClick={() => {
            //
          }}
        >
          <Image src='/assets/icons/common/cart-product.svg' alt='cart' width={16} height={17} />
        </button>
      </div>
      <p className='mt-2 line-clamp-2 text-[14px] font-normal leading-[22px] -tracking-[3%] text-grey-10'>
        [현대식 냉풍기계 건조] 목포 반건조 병어 37-~510g
      </p>
      <div className='mt-0.5 flex items-center gap-0.5'>
        <p className='text-[16px] font-bold leading-[24px] -tracking-[3%] text-teritory'>{`${15}%`}</p>
        <p className='text-[16px] font-bold leading-[24px] -tracking-[3%] text-grey-10'>{`${formatToLocaleString(
          12300,
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

export default ProductItem;
