import { DefaultSeo } from 'next-seo';
import { Policy, type PolicyProps } from 'src/components/common';
import Layout from 'src/components/common/layout';
import { getServerSidePolicy } from 'src/server';
import { type NextPageWithLayout } from 'src/types/common';

const Privacy: NextPageWithLayout<PolicyProps> = props => <Policy {...props} />;

export const getServerSideProps = getServerSidePolicy('HTML_PRIVACY');

Privacy.getLayout = page => (
  <Layout footerProps={{ disable: true }} headerProps={{ disable: true }}>
    <DefaultSeo title='개인정보처리방침 | 바로피쉬' description='privacy' />
    {page}
  </Layout>
);

export default Privacy;
