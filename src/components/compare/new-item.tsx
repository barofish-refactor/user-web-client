import Image from 'next/image';
import Link from 'next/link';
import {
  type DeleteSaveProductsPayload,
  type ProductListDto,
  type SaveProductPayload,
} from 'src/api/swagger/data-contracts';
import { calcDiscountRate, formatToLocaleString, setSquareBrackets } from 'src/utils/functions';

interface Props {
  data: ProductListDto;
  onMutate: (value: SaveProductPayload) => void;
  onDeleteSaveProductsMutate: (value: DeleteSaveProductsPayload) => void;
}

const CompareNewItem = ({ data, onMutate, onDeleteSaveProductsMutate }: Props) => {
  return (
    <Link href={{ pathname: '/product', query: { id: data.id } }}>
      <div className='relative overflow-hidden rounded-lg'>
        <Image
          unoptimized
          width={150}
          height={150}
          src={data.image ?? ''}
          alt='image'
          draggable={false}
          className='aspect-square w-full object-cover'
        />
        <span
          className='absolute right-1 top-1.5'
          onClick={e => {
            e.preventDefault();
            if (data.isLike) onDeleteSaveProductsMutate({ data: { productIds: [data.id ?? -1] } });
            else onMutate({ data: { productId: data.id } });
          }}
        >
          <Image
            unoptimized
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
        {`${setSquareBrackets(data?.storeName)} ${data?.title}`}
      </p>
      <div className='mt-0.5 flex items-center gap-0.5'>
        {(data.originPrice ?? 0) !== 0 && (
          <p className='text-[16px] font-bold leading-[24px] -tracking-[0.03em] text-teritory'>{`${calcDiscountRate(
            data.originPrice,
            data.discountPrice,
          )}%`}</p>
        )}
        <p className='text-[16px] font-bold leading-[24px] -tracking-[0.03em] text-grey-10'>{`${formatToLocaleString(
          data.discountPrice,
        )}원`}</p>
      </div>
      {(data.originPrice ?? 0) !== 0 && (
        <p className='-mt-0.5 text-start text-[13px] font-normal leading-[20px] -tracking-[0.03em] text-grey-60 line-through'>{`${formatToLocaleString(
          data.originPrice ?? 0,
        )}원`}</p>
      )}
      <div className='mt-1 flex items-center gap-0.5'>
        <Image
          unoptimized
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
