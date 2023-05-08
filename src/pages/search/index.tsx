import Layout from 'src/components/common/layout';
import { type NextPageWithLayout } from 'src/types/common';

/** 검색 */
const Search: NextPageWithLayout = () => {
  return <div className='max-md:w-[100vw]'>검색</div>;
};

Search.getLayout = page => (
  <Layout headerProps={{ disable: true }} footerProps={{ disable: true }}>
    {page}
  </Layout>
);

export default Search;
