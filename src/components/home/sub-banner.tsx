import { useEffect, useState } from 'react';
import { Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Image from 'next/image';
import { type Banner } from 'src/api/swagger/data-contracts';
import { useRouter } from 'next/router';
import cm from 'src/utils/class-merge';

interface Props {
  data: Banner[];
}

/** 홈화면 - 서브 배너 */
const SubBanner = ({ data }: Props) => {
  const router = useRouter();
  const [pageIndex, setPageIndex] = useState<number>(0);

  useEffect(() => {
    if (data.length > 0) {
      setPageIndex(0);
    }
  }, [data]);

  return (
    <div className='relative'>
      <Swiper
        loop
        modules={[Autoplay]}
        spaceBetween={16}
        className='aspect-[343/129]'
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        onSlideChange={v => setPageIndex(v.realIndex ?? 0)}
      >
        {data.map((v, idx) => {
          return (
            <SwiperSlide key={`banner_${idx}`} className='aspect-[343/129] w-full'>
              {v.image && (
                <Image
                  priority={idx === 0}
                  src={v.image ?? ''}
                  width={375}
                  height={208}
                  alt='subBanner'
                  className={cm('aspect-[343/129] w-full rounded-lg object-cover', {
                    'cursor-pointer': ['CURATION', 'CATEGORY', 'NOTICE'].includes(v.type ?? ''),
                  })}
                  onClick={() => {
                    switch (v.type) {
                      case 'CURATION':
                        router.push({
                          pathname: '/search/product-result',
                          query: { type: 'curation', id: v.curationId, title: v.curation?.title },
                        });
                        break;
                      case 'CATEGORY':
                        router.push({
                          pathname: '/search/product-result',
                          query: {
                            type: 'category',
                            id: v.category?.categoryId,
                            subItemId: v.categoryId,
                            title: v.category?.name,
                          },
                        });
                        break;
                      case 'NOTICE':
                        router.push({ pathname: '/mypage/notice/[id]', query: { id: v.noticeId } });
                        break;
                      default:
                        break;
                    }
                  }}
                />
              )}
            </SwiperSlide>
          );
        })}
      </Swiper>
      <div className='absolute bottom-[14px] right-[12px] z-10 flex h-[19.71px] w-[41px] items-center justify-center rounded-full bg-black/[.3] backdrop-blur-[5px]'>
        <p>{}</p>
        <p className='whitespace-pre text-[12px] font-semibold tabular-nums text-white'>
          {data.length === 0 ? 0 : (isNaN(pageIndex) ? 0 : pageIndex) + 1}
        </p>
        <p className='whitespace-pre text-[12px] font-medium tabular-nums text-[#DDDDDD]'>{` / ${data.length}`}</p>
      </div>
    </div>
  );
};

export default SubBanner;
