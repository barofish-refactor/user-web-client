import Image from 'next/image';
import Layout from 'src/components/common/layout';
import { BackButton } from 'src/components/ui';
import { type NextPageWithLayout } from 'src/types/common';
import { formatToUtc } from 'src/utils/functions';

interface Notice {
  title: string;
  type: 'DELIVERY_DONE' | 'DELIVERY_START' | 'REVIEW' | 'COUPON';
  content: string;
  createdAt: Date;
}

const dummyNotice: Notice[] = [
  {
    title: '배송 출발',
    type: 'DELIVERY_START',
    content:
      '주문하신 [3차 세척, 스킨포장] 목포 손질 먹갈치 400g 외 1건 상품의 배송이 시작되었습니다. 빠르고 신선하게 배송해드릴게요 :)',
    createdAt: new Date(),
  },
  {
    title: '리뷰 작성',
    type: 'REVIEW',
    content:
      '5/2 (화)에 주문하신 [3차 세척, 스킨포장] 목포 손질 먹갈치 400g 외 1건 상품은 어떠셨나요? 만족하셨다면 리뷰 작성하시고 포인트 받아가세요!',
    createdAt: new Date(),
  },
  {
    title: '배송 완료',
    type: 'DELIVERY_DONE',
    content:
      '주문하신 [3차 세척, 스킨포장] 목포 손질 먹갈치 400g 외 1건 상품의 배송을 완료하였습니다. 이용해주셔서 감사합니다.',
    createdAt: new Date(),
  },
  {
    title: '쿠폰 도착',
    type: 'COUPON',
    content:
      '[닉네임] 고객님을 위한 바로피쉬 회원가입 기념 5% 할인 쿠폰을 지급해드렸어요! 지금 바로 마이페이지 쿠폰함에서 확인해보세요:)',
    createdAt: new Date(),
  },
  {
    title: '쿠폰 도착',
    type: 'COUPON',
    content:
      '[닉네임] 고객님을 위한 바로피쉬 회원가입 기념 5% 할인 쿠폰을 지급해드렸어요! 지금 바로 마이페이지 쿠폰함에서 확인해보세요:)',
    createdAt: new Date(),
  },
];

const Notice: NextPageWithLayout = () => {
  return (
    <div className='pb-[100px] max-md:w-[100vw]'>
      {/* header */}
      <div className='sticky top-0 z-50 flex h-[56px] items-center justify-between gap-3.5 bg-white px-4'>
        <BackButton />
        <p className='text-[16px] font-bold -tracking-[0.03em] text-grey-10'>알림</p>
        <div className='w-6' />
      </div>

      {/* content */}
      {/* {dummyNotice.length > 0 ? ( */}
      {[].length > 0 ? (
        <div className='flex flex-col gap-[34px] px-4 pt-4'>
          {dummyNotice.map((v, idx) => {
            const icon =
              v.type === 'REVIEW'
                ? '/assets/icons/notice/notice-review.svg'
                : v.type === 'COUPON'
                ? '/assets/icons/notice/notice-coupon.svg'
                : '/assets/icons/notice/notice-delivery.svg';

            return (
              <button
                key={`notice${idx}`}
                className='text-start'
                onClick={() => {
                  //
                }}
              >
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-2'>
                    <Image src={icon} alt={v.type} width={24} height={24} />
                    <p className='text-[16px] font-semibold leading-[24px] -tracking-[0.03em] text-grey-10'>
                      {v.title}
                    </p>
                  </div>
                  <p className='text-[14px] font-medium leading-[22px] -tracking-[0.03em] text-grey-70'>
                    {`${formatToUtc(v.createdAt, 'M월 d일')}`}
                  </p>
                </div>
                <p className='pl-8 pt-2.5 text-[14px] font-normal leading-[22px] -tracking-[0.03em] text-grey-10'>
                  {v.content}
                </p>
              </button>
            );
          })}
        </div>
      ) : (
        <div className='mt-[200px] flex flex-col items-center gap-2'>
          <Image src='/assets/icons/common/error.svg' alt='error' width={40} height={40} />
          <p className='whitespace-pre text-center text-[14px] font-medium leading-[24px] -tracking-[0.05em] text-[#B5B5B5]'>
            {`등록된 알림이 없습니다.\n알림이 오면 빠르게 알려드리겠습니다 :)`}
          </p>
        </div>
      )}
    </div>
  );
};

Notice.getLayout = page => (
  <Layout headerProps={{ disable: true }} footerProps={{ disable: true }}>
    {page}
  </Layout>
);

export default Notice;
