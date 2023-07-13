import { useQuery } from '@tanstack/react-query';
import { type GetServerSideProps } from 'next';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { client } from 'src/api/client';
import { type Notice } from 'src/api/swagger/data-contracts';
import { ChevronIcon } from 'src/components/icons';
import { FaqLayout } from 'src/components/mypage/faq';
import { queryKey } from 'src/query-key';
import { useAlertStore } from 'src/store';
import { type NextPageWithLayout } from 'src/types/common';

interface Props {
  initialData: Notice[];
}

const MypageFaq: NextPageWithLayout<Props> = ({ initialData }) => {
  const { setAlert } = useAlertStore();
  const [content, setContent] = useState<string[]>([]);

  const { data } = useQuery(
    queryKey.faq.lists,
    async () => {
      const res = await (await client()).selectNoticeList({ type: 'FAQ' });
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
    if (data) {
      Promise.all(
        data.map(x => {
          return fetch(x.content ?? '')
            .then(res => res.text())
            .then(res => res.toString())
            .catch(err => console.log(JSON.stringify(err)));
        }),
      ).then(res => {
        setContent(res as string[]);
      });
    }
  }, [data]);

  if (!data || data.length === 0) return <Empty />;

  return (
    <article className='pb-10 pt-2'>
      {data.map((v, i) => (
        <details key={v.id} className='group border-b border-b-grey-90'>
          <summary className='flex justify-between gap-2 p-4 text-[14px]'>
            <h3 className='line-clamp-1 flex-1 font-semibold leading-[22px] -tracking-[0.03em] text-grey-20 group-open:line-clamp-none'>
              Q. {v.title}
            </h3>
            <ChevronIcon
              width={24}
              height={24}
              className='-rotate-90 self-start group-open:rotate-90'
            />
          </summary>
          <div className='whitespace-pre-line border border-[#f2f2f2] bg-grey-90 px-8 py-5 text-[14px] leading-[22px] -tracking-[0.03em] text-grey-40'>
            {content[i] && <div dangerouslySetInnerHTML={{ __html: content[i] }} className='' />}
          </div>
        </details>
      ))}
    </article>
  );
};

function Empty() {
  return (
    <div className='grid flex-1 place-items-center'>
      <div className='flex flex-col items-center gap-2'>
        <Image
          unoptimized
          src='/assets/icons/search/search-error.svg'
          alt='up'
          width={40}
          height={40}
        />
        <p className='whitespace-pre text-center text-[14px] font-medium leading-[20px] -tracking-[0.05em] text-[#B5B5B5]'>
          {`등록된 FAQ가 없습니다.\n1:1 문의에 문의사항을 남겨주세요. :)`}
        </p>
      </div>
    </div>
  );
}

MypageFaq.getLayout = page => <FaqLayout page={page} />;

export const getServerSideProps: GetServerSideProps = async () => {
  const { selectNoticeList } = await client();
  return {
    props: { initialData: (await selectNoticeList({ type: 'FAQ' })).data.data },
  };
};

export default MypageFaq;
