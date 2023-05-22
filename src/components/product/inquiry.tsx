import Image from 'next/image';
import Link from 'next/link';
import { type inquiryType } from 'src/pages/product/inquiry';
import cm from 'src/utils/class-merge';
import { formatToUtc } from 'src/utils/functions';

interface Inquiry {
  title: string;
  content: string;
  type: inquiryType;
  state: 'WAITING' | 'DONE';
  isSecret: boolean;
  answer?: string;
  userName: string;
  user: {
    id: number;
    name: string;
  };
  createdAt: Date;
}

const dummyInquiry: Inquiry[] = [
  {
    title: '언제도착하나요',
    content: '궁금해요',
    type: 'DELIVERY',
    state: 'WAITING',
    isSecret: false,
    userName: '이**',
    user: {
      id: 0,
      name: '이이이',
    },
    createdAt: new Date(),
  },
  {
    title: '언제도착하나요',
    content: '궁금해요',
    type: 'REFUND',
    state: 'DONE',
    isSecret: false,
    userName: '이**',
    user: {
      id: 0,
      name: '이이이',
    },
    createdAt: new Date(),
  },
  {
    title: '언제도착하나요',
    content: '궁금해요',
    type: 'ETC',
    state: 'DONE',
    isSecret: true,
    userName: '이**',
    user: {
      id: 0,
      name: '이이이',
    },
    createdAt: new Date(),
  },
];

const Inquiry = () => {
  return (
    <div className=''>
      <Link
        href={{ pathname: '/product/inquiry', query: { id: 1 } }}
        className='mx-4 mb-[18px] mt-5 flex h-[42px] items-center justify-center rounded-lg border border-primary-50'
      >
        <p className='text-[14px] font-semibold leading-[22px] -tracking-[0.03em] text-primary-50'>
          상품 문의하기
        </p>
      </Link>
      <div>
        {dummyInquiry.map((v, idx) => {
          const isDone = v.state === 'DONE';
          return (
            <div key={`inquiry${idx}`} className=''>
              <button
                className='flex w-full items-end justify-between py-[22px] pl-4 pr-[14.5px]'
                onClick={() => {
                  //
                }}
              >
                <div className='flex flex-col gap-2'>
                  <div className='flex items-center gap-0.5'>
                    <p
                      className={cm(
                        'text-[14px] font-medium leading-[22px] -tracking-[0.03em] text-grey-20',
                        { 'text-grey-70': isDone },
                      )}
                    >
                      {v.type === 'DELIVERY'
                        ? '[상품문의]'
                        : v.type === 'REFUND'
                        ? '[반품/취소]'
                        : '[기타]'}
                    </p>
                    <p
                      className={cm(
                        'text-[14px] font-medium leading-[22px] -tracking-[0.03em] text-grey-20',
                        { 'text-grey-70': isDone },
                      )}
                    >
                      {v.title}
                    </p>
                  </div>
                  <div className='flex items-center gap-2'>
                    <p
                      className={cm(
                        'text-[13px] font-normal leading-[20px] -tracking-[0.03em] text-grey-30',
                        { 'font-medium text-primary-50': isDone },
                      )}
                    >
                      {isDone ? '답변완료' : '답변대기'}
                    </p>
                    <div className='h-2.5 w-[1px] bg-grey-80' />
                    <p className='text-[13px] font-normal leading-[20px] -tracking-[0.03em] text-grey-30'>
                      {v.userName}
                    </p>
                    <div className='h-2.5 w-[1px] bg-grey-80' />
                    <p className='text-[13px] font-normal leading-[20px] -tracking-[0.03em] text-grey-30'>{`${formatToUtc(
                      v.createdAt,
                      'yyyy.MM.dd',
                    )}`}</p>
                  </div>
                </div>
                <Image
                  src='/assets/icons/common/chevron-category.svg'
                  alt='chevron'
                  width={23.5}
                  height={24.5}
                  className={cm('mb-[3px]', { 'rotate-180': true })}
                  draggable={false}
                />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Inquiry;
