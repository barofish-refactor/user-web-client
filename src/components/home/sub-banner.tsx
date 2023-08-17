import 'swiper/css';
import Image from 'next/image';
import { type Banner } from 'src/api/swagger/data-contracts';
import { useRouter } from 'next/router';
import cm from 'src/utils/class-merge';
import { requestPermission } from 'src/utils/functions';

interface Props {
  data: Banner;
}

/** 홈화면 - 서브 배너 */
const SubBanner = ({ data }: Props) => {
  const router = useRouter();

  return (
    <div className='relative'>
      <Image
        priority
        src={data.image ?? ''}
        width={375}
        height={208}
        alt='subBanner'
        className={cm('aspect-[343/129] w-full rounded-lg object-cover', {
          'cursor-pointer':
            ['CURATION', 'CATEGORY', 'NOTICE'].includes(data.type ?? '') || data.link,
        })}
        onClick={() => {
          const link = data.link;
          const productionUrl = process.env.NEXT_PUBLIC_PRODUCTION_URL;

          if (link) {
            if (link.includes(productionUrl)) return router.push(link.replace(productionUrl, ''));

            if (window.ReactNativeWebView) {
              requestPermission('link', `${link}`);
            } else {
              return window.open(`${link}`, '_blank');
            }
            return;
          }
          switch (data.type) {
            case 'CURATION':
              router.push({
                pathname: '/search/product-result',
                query: { type: 'curation', id: data.curationId },
              });
              break;
            case 'CATEGORY':
              router.push({
                pathname: '/search/product-result',
                query: {
                  type: 'category',
                  id: data.category?.categoryId,
                  subItemId: data.categoryId,
                },
              });
              break;
            case 'NOTICE':
              router.push({ pathname: '/mypage/notice/[id]', query: { id: data.noticeId } });
              break;
            default:
              break;
          }
        }}
      />
    </div>
  );
};

export default SubBanner;
