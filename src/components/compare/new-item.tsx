import Image from 'next/image';
import Link from 'next/link';
import { type ProductListDto, type SaveProductPayload } from 'src/api/swagger/data-contracts';
import { calcDiscountPrice, formatToLocaleString } from 'src/utils/functions';

interface Props {
  data: ProductListDto;
  onMutate: (value: SaveProductPayload) => void;
}

const CompareNewItem = ({ data, onMutate }: Props) => {
  return (
    <Link href={{ pathname: '/product', query: { id: data.id } }}>
      <div className='relative aspect-square w-full overflow-hidden rounded-lg'>
        <Image fill src={data.image ?? ''} alt='image' draggable={false} />
        <span
          className='absolute right-1 top-1.5'
          onClick={e => {
            e.preventDefault();
            onMutate({ data: { productId: data.id } });
          }}
        >
          <Image
            alt='bookmark'
            width={24}
            height={24}
            src={
              data.isLike
                ? '/assets/icons/compare/compare-bookmark-on.svg'
                : '/assets/icons/compare/compare-bookmark.svg'
            }
          />
        </span>
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
        data.originPrice ?? 0,
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
    </Link>
  );
};

export default CompareNewItem;
