import { type Notice } from 'src/api/swagger/data-contracts';
import 'swiper/css';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Props {
  data: Notice[];
}

const HomeNotice = ({ data }: Props) => {
  const [noticeText, setNoticeText] = useState<string>();
  const [id, setId] = useState<number>(0);
  const [propsData, setPropsData] = useState<Notice[]>([]);
  useEffect(() => {
    if (data && data) {
      const noticeActive = data.filter(item => item.representative === true);
      const noticeText = noticeActive[0]?.title as string;
      const noticeId = noticeActive[0]?.id as number;
      setId(noticeId);
      setPropsData(noticeActive);
      setNoticeText(noticeText);
    }
  }, [data, id]);
  console.log(propsData);

  if (propsData?.length === 0) return null;

  return (
    <div className='flex h-[50px] items-center overflow-hidden'>
      <div className='flex  w-full items-start px-[10px] '>
        <div className='w-[25%] pr-[2px] text-center text-[16px] font-bold'>공지사항</div>
        <Link href={`mypage/notice/${id}`} className='flex w-[75%] items-start'>
          <div className='line-clamp-1 w-[95%] overflow-ellipsis px-1 text-[14px]'>
            {noticeText}
          </div>
          <div className='w-[5%]'>
            <Image
              unoptimized
              src='/assets/icons/common/chevron.svg'
              alt='chevron'
              className='mt-[3px]'
              width={12}
              height={12}
            />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default HomeNotice;
