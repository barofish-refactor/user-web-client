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

interface Props {
  data: CurationDto;
  className?: string;
  showViewAll?: boolean;
  onMutate?: (value: SaveProductPayload) => void;
  onDeleteSaveProductsMutate?: (value: DeleteSaveProductsPayload) => void;
}

/** 홈화면 - 큐레이션 Item (type 처리) */
export const TemporaryCurationItem = ({ data, onMutate, onDeleteSaveProductsMutate }: Props) => {
  return (
    <div className='px-4 py-[30px]'>
      <div className='flex items-center justify-between'>
        {data.products && data.products?.length > 0 && (
          <p className='line-clamp-1 text-[22px] font-bold leading-[30px] -tracking-[0.03em] text-grey-10'>
            이번 주말엔 요걸로 한 잔?
          </p>
        )}
      </div>
      {data.type === 'SQUARE' ? (
        <HomeTableCuration
          data={data.products?.filter(x => x.state === 'ACTIVE') ?? []}
          onMutate={onMutate}
          onDeleteSaveProductsMutate={onDeleteSaveProductsMutate}
        />
      ) : data.type === 'S_SLIDER' ? (
        <HomeSmallSlideCuration
          title={data.title}
          data={data.products?.filter(x => x.state === 'ACTIVE') ?? []}
        />
      ) : (
        <HomeLargeSlideCuration data={data.products?.filter(x => x.state === 'ACTIVE') ?? []} />
      )}
    </div>
  );
};
