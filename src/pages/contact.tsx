import Image from 'next/image';
import { useRouter } from 'next/router';
import Layout from 'src/components/common/layout';
import { BackButton } from 'src/components/ui';
import { type NextPageWithLayout } from 'src/types/common';
import { requestPermission } from 'src/utils/functions';

/** 1:1 문의 */
const Contact: NextPageWithLayout = () => {
  const router = useRouter();

  return (
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
            if (window.ReactNativeWebView) requestPermission('link', 'https://cs.kakao.com/');
            else window.open('https://cs.kakao.com/');
          }}
        >
          <Image src='/assets/icons/contact/kakao.svg' width={32} height={32} alt='카카오톡' />
          <span className='text-[14px] font-medium leading-[22px] -tracking-[0.03em]'>
            카카오톡으로 문의하기
          </span>
        </button>
        <button
          className='flex items-center justify-center gap-4 bg-[#F7F7F7]'
          onClick={() => {
            if (window.ReactNativeWebView) requestPermission('tel', '1668-4591');
            else router.push('tel:1668-4591');
          }}
        >
          <Image src='/assets/icons/contact/phone.svg' width={32} height={32} alt='전화' />
          <span className='text-[14px] font-medium leading-[22px] -tracking-[0.03em] text-grey-30'>
            전화상담 연결하기
          </span>
        </button>
      </section>
    </div>
  );
};

Contact.getLayout = page => (
  <Layout footerProps={{ disable: true }} headerProps={{ disable: true }}>
    {page}
  </Layout>
);

export default Contact;
