import Image from 'next/image';
import Link from 'next/link';
import {
  HomeLargeSlideCuration,
  HomeSmallSlideCuration,
  HomeTableCuration,
} from 'src/components/home';

interface Props {
  type: 'TABLE' | 'SLIDE_SMALL' | 'SLIDE_LARGE';
  title: string;
  description: string;
}

/** 홈화면 - 큐레이션 Item (type 처리) */
const CurationItem = ({ type, title, description }: Props) => {
  return (
    <div className='px-4 py-[30px]'>
      <div className='flex items-center justify-between'>
        <p className='line-clamp-1 text-[20px] font-bold leading-[30px] -tracking-[3%] text-grey-10'>
          {title}
        </p>
        <Link href='' className=''>
          <div className='flex h-[30px] items-center gap-1'>
            <p className='whitespace-nowrap text-[14px] font-medium leading-[22px] -tracking-[3%] text-grey-50'>
              전체보기
            </p>
            <Image src='/assets/icons/common/chevron.svg' alt='chevron' width={12} height={12} />
          </div>
        </Link>
      </div>
      <p className='text-[14px] font-normal leading-[22px] -tracking-[3%] text-grey-60'>
        {description}
      </p>
      {type === 'TABLE' ? (
        <HomeTableCuration data={[]} />
      ) : type === 'SLIDE_SMALL' ? (
        <HomeSmallSlideCuration data={[]} />
      ) : (
        <HomeLargeSlideCuration data={[]} />
      )}
    </div>
  );
};

export default CurationItem;
