import Layout from 'src/components/common/layout';
import { BackButton } from 'src/components/ui';
import { type NextPageWithLayout } from 'src/types/common';
import Image from 'next/image';
import Link from 'next/link';
import { formatToUtc } from 'src/utils/functions';
import { useAlertStore } from 'src/store';
import { useQuery } from '@tanstack/react-query';
import { queryKey } from 'src/query-key';
import { client } from 'src/api/client';
import { type GetServerSideProps } from 'next';
import { type Notice } from 'src/api/swagger/data-contracts';

interface Props {
  initialData: Notice[];
}

const MypageNotices: NextPageWithLayout<Props> = ({ initialData }) => {
  const { setAlert } = useAlertStore();

  const { data } = useQuery(
    queryKey.notice.lists,
    async () => {
      const res = await client().selectNoticeList({ type: 'NOTICE' });
      if (res.data.isSuccess) {
        console.log(res.data);
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

  if (!data || data.length === 0) return <Empty />;

  return (
    <article className='grid gap-6 p-4 pb-10'>
      {data.map(v => {
        return (
          <Link
            key={v.id}
            href={{ pathname: '/mypage/notice/[id]', query: { id: v.id } }}
            className='space-y-3'
          >
            <div className='flex items-center justify-between gap-2'>
              <h3 className='line-clamp-1 flex-1 font-semibold leading-[24px] -tracking-[0.03em] text-grey-10'>
                {v.title}
              </h3>
              <time className='text-[14px] font-medium leading-[22px] -tracking-[0.03em] text-grey-70'>
                {formatToUtc(v.createdAt, 'yyyy.MM.dd')}
              </time>
            </div>
            <p className='line-clamp-2 whitespace-pre-line text-[14px] leading-[22px] -tracking-[0.03em] text-grey-10'>
              {v.content}
            </p>
          </Link>
        );
      })}
    </article>
  );
};

function Empty() {
  return (
    <div className='grid flex-1 place-items-center'>
      <div className='flex flex-col items-center gap-2'>
        <Image src='/assets/icons/search/search-error.svg' alt='up' width={40} height={40} />
        <p className='whitespace-pre text-center text-[14px] font-medium leading-[20px] -tracking-[0.05em] text-[#B5B5B5]'>
          {`등록된 공지사항이 없습니다.\n공지가 오면 빠르게 알려드리겠습니다. :)`}
        </p>
      </div>
    </div>
  );
}

MypageNotices.getLayout = page => (
  <Layout className='flex flex-col' footerProps={{ disable: true }} headerProps={{ disable: true }}>
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

export const getServerSideProps: GetServerSideProps = async () => {
  const { selectNoticeList } = client();
  return {
    props: { initialData: (await selectNoticeList({ type: 'NOTICE' })).data.data },
  };
};

export default MypageNotices;
