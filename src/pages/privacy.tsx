import { Policy, type PolicyProps } from 'src/components/common';
import Layout from 'src/components/common/layout';
import { getServerSidePolicy } from 'src/server';
import { type NextPageWithLayout } from 'src/types/common';

const Privacy: NextPageWithLayout<PolicyProps> = props => <Policy {...props} />;

export const getServerSideProps = getServerSidePolicy('HTML_PRIVACY');

Privacy.getLayout = page => (
  <Layout footerProps={{ disable: true }} headerProps={{ disable: true }}>
    {page}
  </Layout>
);

export default Privacy;
