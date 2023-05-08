import Layout from 'src/components/common/layout';
import { type NextPageWithLayout } from 'src/types/common';

/** 마이페이지 */
const MyPage: NextPageWithLayout = () => {
  return <div className='max-md:w-[100vw]'>마이페이지</div>;
};

MyPage.getLayout = page => <Layout>{page}</Layout>;

export default MyPage;
