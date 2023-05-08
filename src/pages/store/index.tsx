import Layout from 'src/components/common/layout';
import { type NextPageWithLayout } from 'src/types/common';

/** 스토어 */
const Store: NextPageWithLayout = () => {
  return <div className='max-md:w-[100vw]'>스토어</div>;
};

Store.getLayout = page => <Layout>{page}</Layout>;

export default Store;
