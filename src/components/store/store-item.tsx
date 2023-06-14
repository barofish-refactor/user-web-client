import Image from 'next/image';
import Link from 'next/link';
import { type MouseEventHandler } from 'react';
import { type SimpleStore } from 'src/api/swagger/data-contracts';
import { StarIcon } from 'src/components/icons';

interface Props {
  data?: SimpleStore;
  buttonType: 'star' | 'select';
  isSelected?: boolean;
  onButtonClick: MouseEventHandler<HTMLButtonElement>;
}

const StoreItem = ({ data, buttonType, isSelected, onButtonClick }: Props) => {
  return (
    <Link
      href={{ pathname: '/store/detail', query: { id: data?.storeId ?? -1 } }}
      className='w-full overflow-hidden rounded-lg border border-grey-80 px-4 pb-[19px] pt-[26px]'
    >
      <div className='flex items-start justify-between'>
        <div className='flex flex-1 items-center gap-3'>
          <Image
            src={data?.profileImage ?? '/'}
            alt='partner'
            width={83}
            height={83}
            className='rounded-full border border-grey-90'
          />
          <div className=''>
            <p className='text-[20px] font-bold leading-[30px] -tracking-[0.03em] text-grey-10'>
              {data?.name}
            </p>
            <p className='text-[14px] font-semibold leading-[22px] -tracking-[0.03em] text-grey-30'>
              {data?.location}
            </p>
            <div className='mt-[5px] flex gap-1'>
              {(data?.keyword ?? []).map((v, idx) => {
                return (
                  <div
                    key={`tag${idx}`}
                    className='flex h-[22px] items-center justify-center rounded bg-grey-90 px-2'
                  >
                    <p className='whitespace-pre text-[13px] font-medium -tracking-[0.03em] text-grey-40'>
                      {v}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <button onClick={onButtonClick}>
          {buttonType === 'star' ? (
            <StarIcon isActive={data?.isLike ?? false} />
          ) : (
            <Image
              alt=''
              width={24}
              height={24}
              src={
                isSelected
                  ? '/assets/icons/common/check-box-on.svg'
                  : '/assets/icons/common/check-box-off-gray.svg'
              }
            />
          )}
        </button>
      </div>
      <div className='my-4 h-[1px] bg-grey-90' />
      <p className='text-[14px] font-normal leading-[22px] -tracking-[0.03em] text-grey-10'>
        {data?.reviews && data.reviews.length > 0 ? data.reviews[0].content : ''}
      </p>
    </Link>
  );
};

export default StoreItem;
