import Image from 'next/image';
import { useRouter } from 'next/router';
import { type AddBasketPayload, type ProductListDto } from 'src/api/swagger/data-contracts';
import { useProductOptionStore } from 'src/store';
import cm from 'src/utils/class-merge';
import { calcDiscountRate, formatToLocaleString, setSquareBrackets } from 'src/utils/functions';

interface Props {
  data: ProductListDto;
  type: 'SMALL' | 'LARGE';
  imageOptimize?: boolean;
  onMutate: (value: AddBasketPayload) => void;
  onClick?: () => void;
}

const ProductSmallSlideItem = ({ data, type, imageOptimize, onClick }: Props) => {
  const router = useRouter();
  const { setProductOption } = useProductOptionStore();
  // const image = (data.images ?? '').replace('[', '').replace(']', '').split(',');

  return (
    <button
      className='flex w-full flex-col text-start'
      onClick={() => {
        onClick && onClick();
        router.push({ pathname: '/product', query: { id: data.id } });
      }}
    >
      <div
        className={cm('relative aspect-square w-full overflow-hidden rounded-lg', {
          'aspect-[132/132]': type === 'SMALL',
        })}
      >
        <Image
          width={132}
          height={132}
          unoptimized={!imageOptimize}
          src={data.image ?? ''}
          alt='image'
          draggable={false}
          className='aspect-square w-full object-cover'
        />
        <div
          className='product-cart'
          onClick={e => {
            e.stopPropagation();
            setProductOption({ data });
          }}
        />

        {/* <Link
          href={{ pathname: '/product', query: { id: data.id, openState: 'open' } }}
          as={{ pathname: '/product', query: { id: data.id } }}
          className='product-cart'
        /> */}
      </div>
      <p className='mt-2 line-clamp-2 text-[16px] font-normal leading-[22px] -tracking-[0.03em] text-grey-10'>
        {`${setSquareBrackets(data?.storeName)} ${data?.title}`}
      </p>
      <div className='mt-0.5 flex items-center gap-0.5'>
        {(data.originPrice ?? 0) !== 0 && (
          <p className='text-[18px] font-bold leading-[24px] -tracking-[0.03em] text-teritory'>{`${calcDiscountRate(
            data.originPrice,
            data.discountPrice,
          )}%`}</p>
        )}
        <p className='text-[18px] font-bold leading-[24px] -tracking-[0.03em] text-grey-10'>{`${formatToLocaleString(
          data.discountPrice,
        )}원`}</p>
      </div>
      {(data.originPrice ?? 0) !== 0 && (
        <p className='-mt-0.5 text-[15px] font-normal leading-[20px] -tracking-[0.03em] text-grey-60 line-through'>{`${formatToLocaleString(
          data.originPrice,
        )}원`}</p>
      )}
      {/* <div className='mt-1 flex items-center gap-0.5'>
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
      </div> */}
    </button>
  );
};

export default ProductSmallSlideItem;
