import Image from 'next/image';
import Link from 'next/link';
import {
  HomeLargeSlideCuration,
  HomeSmallSlideCuration,
  HomeTableCuration,
} from 'src/components/home';
import cm from 'src/utils/class-merge';

interface Props {
  type: 'TABLE' | 'SLIDE_SMALL' | 'SLIDE_LARGE';
  title: string;
  description: string;
  className?: string;
}

/** 홈화면 - 큐레이션 Item (type 처리) */
const CurationItem = ({ type, title, description, className }: Props) => {
  return (
    <div className={cm('px-4 py-[30px]', className)}>
      <div className='flex items-center justify-between'>
        <p className='line-clamp-1 text-[20px] font-bold leading-[30px] -tracking-[0.03em] text-grey-10'>
          {title}
        </p>
        <Link href={{ pathname: '/search/product-result', query: { title } }} className=''>
          <div className='flex h-[30px] items-center gap-1'>
            <p className='whitespace-nowrap text-[14px] font-medium leading-[22px] -tracking-[0.03em] text-grey-50'>
              전체보기
            </p>
            <Image src='/assets/icons/common/chevron.svg' alt='chevron' width={12} height={12} />
          </div>
        </Link>
      </div>
      <p className='text-[14px] font-normal leading-[22px] -tracking-[0.03em] text-grey-60'>
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
