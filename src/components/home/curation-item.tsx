import Image from 'next/image';
import Link from 'next/link';
import {
  type DeleteSaveProductsPayload,
  type SaveProductPayload,
  type CurationDto,
} from 'src/api/swagger/data-contracts';
import {
  HomeLargeSlideCuration,
  HomeSmallSlideCuration,
  HomeTableCuration,
} from 'src/components/home';
import cm from 'src/utils/class-merge';

interface Props {
  data: CurationDto;
  className?: string;
  showViewAll?: boolean;
  onMutate?: (value: SaveProductPayload) => void;
  onDeleteSaveProductsMutate?: (value: DeleteSaveProductsPayload) => void;
}

/** 홈화면 - 큐레이션 Item (type 처리) */
const CurationItem = ({
  data,
  className,
  showViewAll = true,
  onMutate,
  onDeleteSaveProductsMutate,
}: Props) => {
  return (
    <div className={cm('px-4 py-[30px]', className)}>
      <div className='flex items-center justify-between'>
        <p className='line-clamp-1 text-[20px] font-bold leading-[30px] -tracking-[0.03em] text-grey-10'>
          {data.title}
        </p>
        {showViewAll && (
          <Link
            className=''
            href={{
              pathname: '/search/product-result',
              query: { type: 'curation', id: data.id },
            }}
          >
            <div className='flex h-[30px] items-center gap-1'>
              <p className='whitespace-nowrap text-[14px] font-medium leading-[22px] -tracking-[0.03em] text-grey-50'>
                전체보기
              </p>
              <Image
                unoptimized
                src='/assets/icons/common/chevron.svg'
                alt='chevron'
                width={12}
                height={12}
              />
            </div>
          </Link>
        )}
      </div>
      <p className='whitespace-pre-line text-[14px] font-normal leading-[22px] -tracking-[0.03em] text-grey-60'>
        {data.description}
      </p>
      {data.type === 'SQUARE' ? (
        <HomeTableCuration
          data={data.products?.filter(x => x.state === 'ACTIVE') ?? []}
          onMutate={onMutate}
          onDeleteSaveProductsMutate={onDeleteSaveProductsMutate}
        />
      ) : data.type === 'S_SLIDER' ? (
        <HomeSmallSlideCuration data={data.products?.filter(x => x.state === 'ACTIVE') ?? []} />
      ) : (
        <HomeLargeSlideCuration data={data.products?.filter(x => x.state === 'ACTIVE') ?? []} />
      )}
    </div>
  );
};

export default CurationItem;
