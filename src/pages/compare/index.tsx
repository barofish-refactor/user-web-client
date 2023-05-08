import Layout from 'src/components/common/layout';
import { type NextPageWithLayout } from 'src/types/common';

/** 비교하기 */
const Compare: NextPageWithLayout = () => {
  return <div className='max-md:w-[100vw]'>비교하기</div>;
};

Compare.getLayout = page => <Layout>{page}</Layout>;

export default Compare;
