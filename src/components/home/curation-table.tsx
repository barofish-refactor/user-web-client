import {
  type DeleteSaveProductsPayload,
  type SaveProductPayload,
  type ProductListDto,
} from 'src/api/swagger/data-contracts';
import { ProductItem } from 'src/components/common';

interface Props {
  data: ProductListDto[];
  onMutate?: (value: SaveProductPayload) => void;
  onDeleteSaveProductsMutate?: (value: DeleteSaveProductsPayload) => void;
}

/** 홈화면 - 큐레이션 (테이블) */
const CurationTable = ({ data, onMutate, onDeleteSaveProductsMutate }: Props) => {
  return (
    <div className='mt-5 grid grid-cols-2 gap-x-[11px] gap-y-5'>
      {data.slice(0, 4).map((v, idx) => {
        return (
          <ProductItem
            key={idx}
            imageOptimize
            dataDto={v}
            onMutate={onMutate}
            onDeleteSaveProductsMutate={onDeleteSaveProductsMutate}
          />
        );
      })}
    </div>
  );
};

export default CurationTable;
