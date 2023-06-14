import { type GetServerSideProps } from 'next';
import { client } from 'src/api/client';

type Id = 'HTML_MARKETING' | 'HTML_PRIVACY' | 'HTML_TERM_OF_SERVICE';

export const getServerSidePolicy = (id: Id) => {
  const getServerSideProps: GetServerSideProps = async () => {
    try {
      const res = await client().selectSiteInfo(id);
      if (res.data.isSuccess) {
        const file = res.data.data?.content;
        let content = '';
        if (file) {
          content = await fetch(file).then(res => res.text());
        }

        return {
          props: {
            content,
            description: res.data.data?.description ?? '',
          },
        };
      } else {
        throw new Error(res.data.errorMsg);
      }
    } catch (error) {
      console.error(error);
      return {
        notFound: true,
      };
    }
  };

  return getServerSideProps;
};
