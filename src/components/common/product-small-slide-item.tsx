import Image from 'next/image';
import { useRouter } from 'next/router';
import { type ProductListDto, type AddBasketPayload } from 'src/api/swagger/data-contracts';
import { useProductOptionStore } from 'src/store';
import cm from 'src/utils/class-merge';
import { calcDiscountRate, formatToLocaleString, setSquareBrackets } from 'src/utils/functions';

interface Props {
  data: ProductListDto;
  type: 'SMALL' | 'LARGE';
  onMutate: (value: AddBasketPayload) => void;
  onClick?: () => void;
}

const ProductSmallSlideItem = ({ data, type, onClick }: Props) => {
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
          'aspect-[131/132]': type === 'SMALL',
        })}
      >
        <Image
          fill
          src={data.image ?? ''}
          alt='image'
          draggable={false}
          className='w-full object-cover'
        />
        {/* <div className={cm('relative overflow-hidden rounded-lg')}>
        <Image
          width={type === 'SMALL' ? 131 : 132}
          height={132}
          src={data.image ?? ''}
          alt='image'
          draggable={false}
          className={cm(
            'w-full object-cover',
            type === 'SMALL' ? 'aspect-[131/132]' : 'aspect-square',
          )}
        /> */}
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
      <p className='mt-2 line-clamp-2 text-[14px] font-normal leading-[22px] -tracking-[0.03em] text-grey-10'>
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
        <p className='-mt-0.5 text-[13px] font-normal leading-[20px] -tracking-[0.03em] text-grey-60 line-through'>{`${formatToLocaleString(
          data.originPrice,
        )}원`}</p>
      )}
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
