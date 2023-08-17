import { useQuery } from '@tanstack/react-query';
import { type GetServerSideProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { client } from 'src/api/client';
import { type Tip } from 'src/api/swagger/data-contracts';
import { CartIcon } from 'src/components/common';
import Layout from 'src/components/common/layout';
import { BackButton } from 'src/components/ui';
import { queryKey } from 'src/query-key';
import { useAlertStore } from 'src/store';
import { type NextPageWithLayout } from 'src/types/common';

interface Props {
  initialData: Tip;
}

const TipDetail: NextPageWithLayout<Props> = ({ initialData }) => {
  const router = useRouter();
  const { setAlert } = useAlertStore();
  const { id } = router.query;
  const [content, setContent] = useState<string>('');

  const { data } = useQuery(
    queryKey.tipList.detail(Number(id)),
    async () => {
      const res = await (await client()).selectTip(Number(id));
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
    <div className='max-md:w-[100vw]'>
      {/* header */}
      <div className='sticky top-0 z-50 flex h-[56px] items-center gap-4 bg-white pl-4 pr-[18px]'>
        <BackButton />
        <div className='w-5' />
        <p className='flex-1 whitespace-pre text-center text-[16px] font-bold leading-[24px] -tracking-[0.03em] text-grey-10'>
          알아두면 좋은 정보
        </p>
        <Link href='/compare/storage'>
          <Image
            unoptimized
            src='/assets/icons/common/bookmark-title.svg'
            alt='cart'
            width={24}
            height={24}
          />
        </Link>
        <Link href='/product/cart'>
          <CartIcon />
        </Link>
      </div>
      {/* content */}
      <div>
        <div className='relative aspect-[375/276] w-full'>
          {data?.imageDetail && (
            <Image
              unoptimized
              src={data?.imageDetail}
              alt='image'
              width={375}
              height={276}
              className='aspect-[375/276] w-full object-cover'
            />
          )}
        </div>
        <div className='px-4 pt-4'>
          <p className='text-[12px] font-medium leading-[18px] -tracking-[0.03em] text-grey-50'>
            {data?.description}
          </p>
          <p className='mt-1.5 text-[24px] font-bold leading-[36px] -tracking-[0.03em] text-grey-10'>
            {data?.title}
          </p>
          {/* <p className='mt-8 text-[14px] font-medium leading-[22px] -tracking-[0.03em] text-grey-20'>
            {data?.content}
          </p> */}
        </div>
        <div dangerouslySetInnerHTML={{ __html: content }} className='mt-8' />
      </div>
    </div>
  );
};

TipDetail.getLayout = page => (
  <Layout headerProps={{ disable: true }} footerProps={{ disable: true }}>
    {page}
  </Layout>
);

export const getServerSideProps: GetServerSideProps = async context => {
  const { id } = context.query;
  const { selectTip } = await client();

  return {
    props: { initialData: (await selectTip(Number(id))).data.data },
  };
};

export default TipDetail;
