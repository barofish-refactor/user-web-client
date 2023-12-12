import { useRouter } from 'next/router';
import { type ReactElement } from 'react';
import Layout from 'src/components/common/layout';
import { BackButton } from 'src/components/ui';

interface Props {
  page: ReactElement;
}

export function NoticeLayout({ page }: Props) {
  const router = useRouter();
  return (
    <Layout
      className='flex flex-col'
      footerProps={{ disable: true }}
      headerProps={{ disable: true }}
    >
      <div className='flex flex-1 flex-col'>
        <header className='title-header'>
          <BackButton onBack={() => router.back()} />
          <h2 className='font-semibold leading-[24px] -tracking-[0.03em] text-grey-10'>공지사항</h2>
          <div className='h-6 w-6' />
        </header>
        {page}
      </div>
    </Layout>
  );
}
