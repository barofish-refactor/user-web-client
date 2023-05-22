import { ProductItem } from 'src/components/common';

interface Props {
  data?: any[];
}

/** 홈화면 - 큐레이션 (테이블) */
const CurationTable = ({}: Props) => {
  return (
    <div className='mt-5 grid grid-cols-2 gap-x-[11px] gap-y-5'>
      {[...Array(4)].map((v, idx) => {
        return <ProductItem key={`curation${idx}`} />;
      })}
    </div>
  );
};

export default CurationTable;
