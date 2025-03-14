import { type SyntheticEvent, useEffect, useState } from 'react';
import { Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';
import { Banner } from 'src/api/swagger/data-contracts';
import { useRouter } from 'next/router';
import cm from 'src/utils/class-merge';

import 'swiper/css';
import { requestPermission } from 'src/utils/functions';
import { VARIABLES } from 'src/variables';

interface Props {
  data: Banner[];
}

/** 홈화면 - 배너 */
const Banner = ({ data }: Props) => {
  const router = useRouter();
  const [pageIndex, setPageIndex] = useState<number>(0);
  const blurDataURL =
    'data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg==';

  useEffect(() => {
    if (data.length > 0) {
      setPageIndex(0);
    }
  }, [data]);
  const handleImgError = (e: SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.currentTarget;
    target.src = '/assets/icons/common/default-image.png';
  };

  return (
    <div className='relative'>
      <Swiper
        loop
        modules={[Autoplay]}
        lazyPreloadPrevNext={data.length}
        spaceBetween={16}
        className='aspect-[375/270]'
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        onSlideChange={v => setPageIndex(v.realIndex ?? 0)}
      >
        {data.map((v, idx) => {
          return (
            <SwiperSlide key={v.id} className='aspect-[375/270] w-full'>
              {/* <div className='swiper-lazy-preloader swiper-lazy-preloader-white' /> */}
              <Image
                priority={idx === 0}
                src={v.image ?? ''}
                width={375}
                height={208}
                alt='banner'
                blurDataURL={blurDataURL}
                placeholder='blur'
                className={cm('aspect-[375/270] w-full object-cover', {
                  'cursor-pointer':
                    ['CURATION', 'CATEGORY', 'NOTICE'].includes(v.type ?? '') || v.link,
                })}
                onError={handleImgError}
                onClick={() => {
                  const link = v.link;
                  const productionUrl = VARIABLES.PRODUCTION_URL;
                  if (link) {
                    if (link.includes(productionUrl))
                      return router.push(link.replace(productionUrl, ''));

                    if (window.ReactNativeWebView) {
                      requestPermission('link', `${link}`);
                    } else {
                      return window.open(`${link}`, '_blank');
                    }
                    return;
                  }
                  switch (v.type) {
                    case 'CURATION':
                      router.push({
                        pathname: '/search/product-result',
                        query: { type: 'curation', id: v.curationId },
                      });
                      break;
                    case 'CATEGORY':
                      router.push({
                        pathname: '/search/product-result',
                        query: {
                          type: 'category',
                          id: v.category?.categoryId ?? v.categoryId,
                          subItemId: v.categoryId,
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

export default Banner;
