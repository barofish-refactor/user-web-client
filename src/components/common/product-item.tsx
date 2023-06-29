import Image from 'next/image';
import Link from 'next/link';
import { type ProductListDto } from 'src/api/swagger/data-contracts';
import { useProductOptionStore } from 'src/store';
import { calcDiscountRate, formatToLocaleString, setSquareBrackets } from 'src/utils/functions';

interface Props {
  dataDto?: ProductListDto;
}

const ProductItem = ({ dataDto }: Props) => {
  const { setProductOption } = useProductOptionStore();

  return (
    <Link
      href={{ pathname: '/product', query: { id: dataDto?.id } }}
      className='flex w-full flex-col text-start'
    >
      <div className='relative aspect-square w-full overflow-hidden rounded-lg'>
        <Image fill src={dataDto?.image ?? '/'} alt='image' draggable={false} />
        <button
          className='product-cart'
          onClick={e => {
            e.preventDefault();
            setProductOption({ data: dataDto });
          }}
        />
        {/* <Link
          href={{ pathname: '/product', query: { id: dataDto?.id, openState: 'open' } }}
          as={{ pathname: '/product', query: { id: dataDto?.id } }}
          className='product-cart'
        /> */}
      </div>
      <p className='mt-2 line-clamp-2 text-start text-[14px] font-normal leading-[22px] -tracking-[0.03em] text-grey-10'>
        {`${setSquareBrackets(dataDto?.storeName)} ${dataDto?.title}`}
      </p>
      <div className='mt-0.5 flex items-center gap-0.5'>
        {(dataDto?.originPrice ?? 0) !== 0 && (
          <p className='text-[16px] font-bold leading-[24px] -tracking-[0.03em] text-teritory'>{`${calcDiscountRate(
            dataDto?.originPrice,
            dataDto?.discountPrice,
          )}%`}</p>
        )}
        <p className='text-[16px] font-bold leading-[24px] -tracking-[0.03em] text-grey-10'>{`${formatToLocaleString(
          dataDto?.discountPrice,
        )}원`}</p>
      </div>
      {(dataDto?.originPrice ?? 0) !== 0 && (
        <p className='-mt-0.5 text-start text-[13px] font-normal leading-[20px] -tracking-[0.03em] text-grey-60 line-through'>{`${formatToLocaleString(
          dataDto?.originPrice,
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
          dataDto?.reviewCount ?? 0
        }`}</p>
      </div>
    </Link>
  );
};

export default ProductItem;
