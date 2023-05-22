import Image from 'next/image';
import Link from 'next/link';
import Layout from 'src/components/common/layout';
import { type NextPageWithLayout } from 'src/types/common';
import { formatToLocaleString } from 'src/utils/functions';

/** 마이페이지 */
const MyPage: NextPageWithLayout = () => {
  return (
    <div className='max-md:w-[100vw]'>
      <div className='flex items-center justify-between px-4 pt-6'>
        <button className='flex flex-col gap-0.5'>
          <div className='flex items-center gap-0.5'>
            <p className='text-[20px] font-bold leading-[30px] -tracking-[0.03em] text-grey-10'>
              홍길동
            </p>
            <Image
              src='/assets/icons/common/chevron-category.svg'
              alt='chevron'
              width={24}
              height={24}
              className='rotate-90'
            />
          </div>
          <p className='text-[14px] font-normal leading-[22px] -tracking-[0.03em] text-grey-60'>
            기본 정보보기
          </p>
        </button>
        <Image
          src='/assets/icons/common/default-profile.png'
          alt='profile'
          width={54}
          height={54}
          className='rounded-full'
        />
      </div>
      <div className='rounded-b-2xl px-4 pb-4 pt-6 shadow-[0px_4px_5px_rgba(0,0,0,0.04)]'>
        <div className='flex h-[61px] items-center justify-evenly rounded-lg bg-grey-90'>
          <div className='flex w-[60px] flex-col items-center gap-0.5'>
            <p className='text-[18px] font-bold leading-[21px] -tracking-[0.03em] text-grey-10'>
              {formatToLocaleString(142)}
            </p>
            <p className='text-[12px] font-normal leading-[18px] -tracking-[0.03em] text-grey-50'>
              구매후기
            </p>
          </div>
          <div className='h-6 w-[1px] bg-[#E2E2E2]' />
          <div className='flex w-[60px] flex-col items-center gap-0.5'>
            <p className='text-[18px] font-bold leading-[21px] -tracking-[0.03em] text-grey-10'>
              {formatToLocaleString(12)}
            </p>
            <p className='text-[12px] font-normal leading-[18px] -tracking-[0.03em] text-grey-50'>
              찜한상품
            </p>
          </div>
          <div className='h-6 w-[1px] bg-[#E2E2E2]' />
          <div className='flex w-[60px] flex-col items-center gap-0.5'>
            <p className='text-[18px] font-bold leading-[21px] -tracking-[0.03em] text-grey-10'>
              {formatToLocaleString(24)}
            </p>
            <p className='text-[12px] font-normal leading-[18px] -tracking-[0.03em] text-grey-50'>
              최근본상품
            </p>
          </div>
          <div className='h-6 w-[1px] bg-[#E2E2E2]' />
          <div className='flex w-[60px] flex-col items-center gap-0.5'>
            <p className='text-[18px] font-bold leading-[21px] -tracking-[0.03em] text-grey-10'>
              {formatToLocaleString(21)}
            </p>
            <p className='text-[12px] font-normal leading-[18px] -tracking-[0.03em] text-grey-50'>
              구매한상품
            </p>
          </div>
        </div>
      </div>
      <div className='p-4'>
        <Link
          className='relative flex h-[140px] w-full flex-col items-start justify-between overflow-hidden rounded-lg bg-grey-10 px-4 pb-4 pt-6 text-start shadow-[0px_4px_10px_rgba(0,0,0,0.08)]'
          href={{
            pathname: '/search/product-result',
            query: { title: '지금이 딱인 제철 해산물 🦐' },
          }}
        >
          <div className='z-20 flex flex-col'>
            <p className='text-[16px] font-semibold leading-[24px] -tracking-[0.03em] text-white'>
              지금이 딱인 제철 해산물 🦐
            </p>
            <p className='text-[12px] font-medium leading-[18px] -tracking-[0.03em] text-grey-70'>
              따뜻한 봄, 가장 맛있게 먹을 수 있는 봄철 해산물 어때요?
            </p>
          </div>
          <div className='z-20 flex items-center gap-1'>
            <p className='text-[12px] font-medium leading-[18px] -tracking-[0.03em] text-grey-60'>
              제철 해산물 보러가기
            </p>
            <Image
              src='/assets/icons/common/chevron-mypage.svg'
              alt='chevron'
              width={16}
              height={16}
            />
          </div>
        </Link>
      </div>
      <div className='h-2 bg-grey-90' />
      {[
        '주문내역',
        '취소 환불 교환 내역',
        '쿠폰함',
        '결제수단 관리',
        '공지사항',
        'FAQ',
        '1:1 문의',
        '개인정보처리 방침',
        '이용약관',
      ].map((v, idx) => {
        return (
          <div key={`mypage${idx}`}>
            <button
              className='flex h-[56px] w-full items-center justify-between border-b border-b-grey-90 px-4'
              onClick={() => {
                switch (idx) {
                  // 주문내역
                  case 0:
                    break;
                  // 취소 환불 교환 내역
                  case 1:
                    break;
                  // 쿠폰함
                  case 2:
                    break;
                  // 결제수단 관리
                  case 3:
                    break;
                  // 공지사항
                  case 4:
                    break;
                  // FAQ
                  case 5:
                    break;
                  // 1:1 문의
                  case 6:
                    break;
                  // 개인정보처리 방침
                  case 7:
                    break;
                  // 이용약관
                  case 8:
                    break;
                  default:
                    break;
                }
              }}
            >
              <p className='text-[16px] font-medium -tracking-[0.03em] text-grey-10'>{v}</p>
              <Image
                src='/assets/icons/common/chevron-mypage.svg'
                alt='chevron'
                width={24}
                height={24}
              />
            </button>
            {[3, 6].includes(idx) && <div className='h-2 bg-grey-90' />}
          </div>
        );
      })}
    </div>
  );
};

MyPage.getLayout = page => <Layout headerProps={{ disable: true }}>{page}</Layout>;

export default MyPage;
