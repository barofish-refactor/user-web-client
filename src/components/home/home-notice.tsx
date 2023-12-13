import { type Notice } from 'src/api/swagger/data-contracts';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay } from 'swiper';
import Image from 'next/image';
import { useEffect, useState } from 'react';
SwiperCore.use([Autoplay]);

interface Props {
  data: Notice[];
}

const HomeNotice = ({ data }: Props) => {
  const [noticeText, setNoticeText] = useState<string>();
  useEffect(() => {
    if (data && data) {
      const noticeActive = data.filter(item => item.representative === true);
      const noticeText = noticeActive[0]?.title as string;
      console.log(noticeText);

      setNoticeText(noticeText);
    }
  }, [data]);
  return (
    <div className='flex items-start px-[10px] pt-[11px]'>
      <div className='w-[20%] font-bold'>공지사항</div>
      <div className='w-[80%]'>{noticeText}</div>
      <Image
        unoptimized
        src='/assets/icons/common/chevron.svg'
        alt='chevron'
        className='mt-[3px]'
        width={12}
        height={12}
      />
    </div>
  );
};

export default HomeNotice;
