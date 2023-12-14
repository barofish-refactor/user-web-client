import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { client } from 'src/api/client';
import { queryKey } from 'src/query-key';
import cm from 'src/utils/class-merge';

/** 홈화면 - 푸터 (정보) */
const Footer = () => {
  const [showInfo, setShowInfo] = useState<boolean>(false);

  const { data: info } = useQuery(queryKey.footer, async () => {
    const res = await (await client()).selectSiteInfo('TC_FOOTER');
    if (res.data.isSuccess) {
      return res.data.data;
    } else {
      throw new Error(res.data.code + ': ' + res.data.errorMsg);
    }
  });

  return (
    <div className='bg-[#f5f5f5] pt-[10px]'>
      {/* <div className='h-2 bg-grey-90' /> */}
      <p className='pl-[15px] pr-[13px] pt-[25px] text-[13px] font-medium leading-[18px] -tracking-[0.05em] text-[#969696]'>
        (주) 맛신저는 통신판매중개자이며, 통신판매의 당사자가 아닙니다. 따라서 (주) 맛신저는 상품,
        거래정보 및 거래에 대하여 책임을 지지 않습니다.
      </p>
      <div className=' px-[16px] pb-[118px] pt-[23px]'>
        <button onClick={() => setShowInfo(!showInfo)}>
          <div className='flex items-center gap-[5px]'>
            <p className='text-[15px] font-bold leading-[16px] -tracking-[0.05em] text-[#797979]'>
              (주) 맛신저 사업자정보
            </p>
            <Image
              unoptimized
              src='/assets/icons/common/chevron-footer.svg'
              alt='footer'
              width={13}
              height={8}
              className={cm({ 'rotate-180': showInfo })}
            />
          </div>
        </button>
        {showInfo && info?.tcContent && (
          <div className='leaidng-[16px] mt-[18px] flex flex-col gap-2 text-[14px] font-medium -tracking-[0.03em] text-grey-60'>
            {info.tcContent.map((v, i) => {
              return <p key={i}>{`${v.title} : ${v.content}`}</p>;
            })}
          </div>
        )}
        <div className='mt-[18px] flex items-center gap-[3px] text-[14px] font-medium leading-[16px] -tracking-[0.05em] text-[#B5B5B5]'>
          <p>Copyright</p>
          <p>©</p>
          <p>바로피쉬.</p>
          <p>All rights reserved.</p>
        </div>
        <div className='mt-2.5 flex items-center gap-3 text-[12px] font-bold leading-[16px] -tracking-[0.05em] text-[#797979]'>
          <Link href='/terms-of-service'>이용약관</Link>
          <div className='h-[14px] w-[1px] bg-[#E2E2E2]' />
          <Link href='/privacy'>개인정보처리방침</Link>
          <div className='h-[14px] w-[1px] bg-[#E2E2E2]' />
          <Link href='/marketing'>마케팅 수신 동의</Link>
        </div>
        <div className='mt-[7px] flex items-center gap-[7px]'>
          <p className='text-[14px] font-bold leading-[16px] -tracking-[0.05em] text-[#797979]'>
            입점문의 :
          </p>
          <p className='text-[14px] font-medium leading-[16px] -tracking-[0.05em] text-primary-50'>
            partners@barofish.com
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
