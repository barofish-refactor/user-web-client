import { useQuery } from '@tanstack/react-query';
import { DefaultSeo } from 'next-seo';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { client } from 'src/api/client';
import Layout from 'src/components/common/layout';
import { BackButton } from 'src/components/ui';
import { queryKey } from 'src/query-key';
import { type NextPageWithLayout } from 'src/types/common';
import { requestPermission } from 'src/utils/functions';

/** 1:1 문의 */
const Contact: NextPageWithLayout = () => {
  const router = useRouter();

  const { data: info } = useQuery(queryKey.kakao, async () => {
    const res = await (await client()).selectSiteInfo('URL_KAKAO_CONTACT');
    if (res.data.isSuccess) {
      return res.data.data;
    } else {
      throw new Error(res.data.code + ': ' + res.data.errorMsg);
    }
  });

  return (
    <>
      <DefaultSeo title='바로피쉬 | 문의' description='1:1 문의' />
      <div>
        <header className='title-header'>
          <BackButton />
          <h2 className='font-semibold leading-[24px] -tracking-[0.03em] text-grey-10'>1:1 문의</h2>
          <div className='h-6 w-6' />
        </header>
        <section className='grid grid-rows-[repeat(2,118px)] gap-3 p-4'>
          <button
            className='flex items-center justify-center gap-4 rounded-lg border border-[#f2dc09] bg-[#FFE812]'
            onClick={() => {
              if (info?.content) {
                if (window.ReactNativeWebView) requestPermission('link', info.content);
                else window.open(info.content);
              }
            }}
          >
            <Image
              unoptimized
              src='/assets/icons/contact/kakao.svg'
              width={32}
              height={32}
              alt='카카오톡'
            />
            <span className='text-[18px] font-medium leading-[22px] -tracking-[0.03em]'>
              카카오톡으로 문의하기
            </span>
          </button>
          <button
            className='flex items-center justify-center gap-4 rounded-lg bg-[#F7F7F7]'
            onClick={() => {
              if (window.ReactNativeWebView) requestPermission('tel', '070-7954-7185');
              else router.push('tel:070-7954-7185');
            }}
          >
            <Image
              unoptimized
              src='/assets/icons/contact/phone.svg'
              width={32}
              height={32}
              alt='전화'
            />
            <span className='text-[18px] font-medium leading-[22px] -tracking-[0.03em] text-grey-30'>
              전화상담 연결하기
            </span>
          </button>
          <div className='text-center text-[16px]'>
            <span className=' font-semibold'>문의가능시간 :</span> 9시~6시 (토,일 공휴일 제외)
          </div>
        </section>
      </div>
    </>
  );
};

Contact.getLayout = page => (
  <Layout footerProps={{ disable: true }} headerProps={{ disable: true }}>
    <DefaultSeo title='1:1문의' description='contect' />
    {page}
  </Layout>
);

export default Contact;
