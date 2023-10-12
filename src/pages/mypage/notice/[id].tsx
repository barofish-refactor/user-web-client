import { useQuery } from '@tanstack/react-query';
import { type GetServerSideProps } from 'next';
import { DefaultSeo } from 'next-seo';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { client } from 'src/api/client';
import { type Notice } from 'src/api/swagger/data-contracts';
import Layout from 'src/components/common/layout';
import { BackButton } from 'src/components/ui';
import { queryKey } from 'src/query-key';
import { useAlertStore } from 'src/store';
import { type NextPageWithLayout } from 'src/types/common';
import { formatToUtc } from 'src/utils/functions';

interface Props {
  initialData: Notice;
}

const MypageNotice: NextPageWithLayout<Props> = ({ initialData }) => {
  const router = useRouter();
  const { setAlert } = useAlertStore();
  const { id } = router.query;
  const [content, setContent] = useState<string>('');

  const { data } = useQuery(
    queryKey.notice.detail(Number(id)),
    async () => {
      const res = await (await client()).selectNotice(Number(id));
      if (res.data.isSuccess) {
        return res.data.data;
      } else {
        setAlert({ message: res.data.errorMsg ?? '' });
        throw new Error(res.data.errorMsg);
      }
    },
    {
      initialData,
    },
  );

  useEffect(() => {
    if (data && data.content) {
      fetch(data.content)
        .then(res => res.text())
        .then(setContent)
        .catch(err => console.log(JSON.stringify(err)));
    }
  }, [data]);

  return (
    <div className='flex flex-1 flex-col justify-between pb-10 pt-4'>
      <div className='space-y-3'>
        <div className='flex items-center justify-between gap-2 px-4'>
          <h3 className='line-clamp-1 flex-1 font-semibold leading-[24px] -tracking-[0.03em] text-grey-10'>
            {data?.title}
          </h3>
          <time className='text-[14px] font-medium leading-[22px] -tracking-[0.03em] text-grey-70'>
            {formatToUtc(data?.createdAt, 'yyyy.MM.dd')}
          </time>
        </div>
        <div>
          {/* <h4 className='line-clamp-2 whitespace-pre-line px-4 text-[14px] leading-[22px] -tracking-[0.03em] text-grey-10'>
            {data?.content}
          </h4> */}
          {/* <p className='mt-3 whitespace-pre-line border border-[#f2f2f2] bg-grey-90 px-8 py-5 text-[14px] leading-[22px] -tracking-[0.03em] text-grey-40'>
            {data?.content}
          </p> */}
          <div className='mt-3 whitespace-pre-line border border-[#f2f2f2] bg-grey-90 px-8 py-5 text-[14px] leading-[22px] -tracking-[0.03em] text-grey-40'>
            <div dangerouslySetInnerHTML={{ __html: content }} className='' />
          </div>
        </div>
      </div>
    </div>
  );
};

MypageNotice.getLayout = page => (
  <Layout className='flex flex-col' headerProps={{ disable: true }} footerProps={{ disable: true }}>
    <DefaultSeo title='공지사항 | 바로피쉬' description='noticeDetail' />
    <div className='flex flex-1 flex-col'>
      <header className='title-header'>
        <BackButton />
        <h2 className='font-semibold leading-[24px] -tracking-[0.03em] text-grey-10'>공지사항</h2>
        <div className='h-6 w-6' />
      </header>
      {page}
    </div>
  </Layout>
);

export const getServerSideProps: GetServerSideProps = async context => {
  const { id } = context.query;
  const { selectNotice } = await client();
  return {
    props: { initialData: (await selectNotice(Number(id))).data.data },
  };
};

export default MypageNotice;
