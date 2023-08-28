import { useRouter } from 'next/router';
import { type ReactElement } from 'react';
import Layout from 'src/components/common/layout';
import { BackButton } from 'src/components/ui';

interface Props {
  page: ReactElement;
}

export function InquiryLayout({ page }: Props) {
  const router = useRouter();

  return (
    <Layout
      headerProps={{ disable: true }}
      footerProps={{ disable: true }}
      className='flex flex-col'
    >
      <div className='flex flex-1 flex-col'>
        <header className='title-header'>
          <BackButton onBack={() => router.push('/mypage')} />
          <h2 className='font-semibold leading-[24px] -tracking-[0.03em] text-grey-10'>
            상품 문의내역
          </h2>
          <div className='h-6 w-6' />
        </header>
        {page}
      </div>
    </Layout>
  );
}
