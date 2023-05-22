import Image from 'next/image';

/** 홈화면 - 푸터 (정보) */
const Footer = () => {
  return (
    <div className='pt-[62px]'>
      <div className='h-2 bg-grey-90' />
      <p className='pl-[15px] pr-[13px] pt-[25px] text-[13px] font-medium leading-[18px] -tracking-[0.05em] text-[#969696]'>
        (주) 맛신저는 통신판매중개자이며, 통신판매의 당사자가 아닙니다. 따라서 (주) 맛신저는 상품,
        거래정보 및 거래에 대하여 책임을 지지 않습니다.
      </p>
      <div className='px-[16px] pb-[118px] pt-[23px]'>
        <button>
          <div className='flex items-center gap-[5px]'>
            <p className='text-[13px] font-bold leading-[16px] -tracking-[0.05em] text-[#797979]'>
              (주) 맛신저 사업자정보
            </p>
            <Image src='/assets/icons/common//chevron-footer.svg' alt='' width={13} height={8} />
          </div>
        </button>
        <div className='mt-[18px] flex items-center gap-[3px]'>
          <p className='text-[12px] font-medium leading-[16px] -tracking-[0.05em] text-[#B5B5B5]'>
            Copyright
          </p>
          <p className='text-[12px] font-medium leading-[16px] -tracking-[0.05em] text-[#B5B5B5]'>
            ©
          </p>
          <p className='text-[12px] font-medium leading-[16px] -tracking-[0.05em] text-[#B5B5B5]'>
            바로피쉬.
          </p>
          <p className='ml-0.5 text-[12px] font-medium leading-[16px] -tracking-[0.05em] text-[#B5B5B5]'>
            All rights reserved.
          </p>
        </div>
        <div className='mt-2.5 flex items-center gap-[13px]'>
          <button>
            <p className='text-[12px] font-bold leading-[16px] -tracking-[0.05em] text-[#797979]'>
              이용약관
            </p>
          </button>
          <div className='h-[14px] w-[1px] bg-[#E2E2E2]' />
          <button>
            <p className='mr-[3px] text-[12px] font-bold leading-[16px] -tracking-[0.05em] text-[#797979]'>
              개인정보처리방침
            </p>
          </button>
          <div className='h-[14px] w-[1px] bg-[#E2E2E2]' />
          <button>
            <p className='text-[12px] font-bold leading-[16px] -tracking-[0.05em] text-[#797979]'>
              사업자정보확인
            </p>
          </button>
        </div>
        <div className='mt-[7px] flex items-center gap-[7px]'>
          <p className='text-[12px] font-bold leading-[16px] -tracking-[0.05em] text-[#797979]'>
            입점문의 :
          </p>
          <p className='text-[12px] font-medium leading-[16px] -tracking-[0.05em] text-primary-50'>
            partners@barofish.com
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
