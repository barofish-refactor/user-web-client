import { useMutation, useQuery } from '@tanstack/react-query';
import { getCookie } from 'cookies-next';
import { type GetServerSideProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Fragment, useCallback, useEffect, useRef, useState } from 'react';
import { client } from 'src/api/client';
import {
  // type DeleteSaveProductsPayload,
  type SaveProductPayload,
  type SimpleProductDto,
  type DeleteTastingNoteToBasketPayload,
} from 'src/api/swagger/data-contracts';
import { ContentType } from 'src/api/swagger/http-client';
import { CartIcon, Chat, HomeBtn } from 'src/components/common';
import {
  // HEAD_DESCRIPTION,
  HEAD_NAME,
} from 'src/components/common/head';
import Layout from 'src/components/common/layout';
import {
  ProductBanner,
  ProductBottomSheet,
  // ProductCompare,
  // ProductInfoNotice,
  // ProductCompare,
  ProductInformationDefault,
  ProductInquiry,
  ProductTab,
  TastingInfo,
} from 'src/components/product';
import { ReviewChart, ReviewPhoto } from 'src/components/review';
import { BackButton } from 'src/components/ui';
import { queryKey } from 'src/query-key';
import { useAlertStore, useMetaStore, useToastStore } from 'src/store';
import { type NextPageWithLayout } from 'src/types/common';
import { formatToBlob, formatToLocaleString, handleRefresh } from 'src/utils/functions';
import { VARIABLES } from 'src/variables';
import * as fpixel from 'src/utils/fpixel';
import { HeaderBanner } from 'src/components/common/header-banner';
import { DefaultSeo } from 'next-seo';
import PullToRefresh from 'react-simple-pull-to-refresh';
import Loading from 'src/components/common/loading';
import * as kakaoPixel from 'src/utils/kakaoPixel';
import HomeFooter from 'src/components/home/footer';
import { useInView } from 'react-intersection-observer';

interface Props {
  initialData: SimpleProductDto;
}
declare global {
  interface Window {
    kakao: any;
  }
}
/** 상품 상세 */
const ProductDetail: NextPageWithLayout<Props> = ({ initialData }) => {
  const router = useRouter();
  const { id, openState } = router.query;
  const { setAlert } = useAlertStore();
  const { setToast } = useToastStore();
  const { setMetaData } = useMetaStore();
  const [isTasting, setIsTasting] = useState(false);
  const { data, refetch } = useQuery(
    queryKey.product.detail(id),
    async () => {
      const res = await (await client()).selectProduct(Number(id));
      if (res.data.isSuccess) {
        if (res.data.data) {
          const tastingNoteInfoLength = res.data.data.tastingNoteInfo as [];
          if (tastingNoteInfoLength.length > 0) setIsTasting(true);
        }
        return res.data.data;
      } else {
        throw new Error(res.data.code + ': ' + res.data.errorMsg);
      }
    },
    {
      enabled: !!id,
      initialData,
    },
  );

  // const { data: tastingData, refetch: tastingRefetch } = useQuery(
  //   queryKey.tasting.detail(id),
  //   async () => {
  //     const res = await (await client()).selectProduct(Number(id));
  //     if (res.data.isSuccess) {
  //       return res.data.data;
  //     } else {
  //       throw new Error(res.data.code + ': ' + res.data.errorMsg);
  //     }
  //   },
  // );

  const { data: deliverInfo } = useQuery(queryKey.deliverInfo, async () => {
    const res = await (await client()).selectSiteInfo('HTML_DELIVER_INFO');
    if (res.data.isSuccess) {
      return res.data.data;
    } else {
      throw new Error(res.data.code + ': ' + res.data.errorMsg);
    }
  });

  const { mutateAsync: saveProduct, isLoading: isSaveLoading } = useMutation(
    async (args: SaveProductPayload) =>
      await (await client()).addTastingNoteToBasket(args, { type: ContentType.FormData }),
  );

  const onSaveMutate = ({ data }: SaveProductPayload) => {
    if (!getCookie(VARIABLES.ACCESS_TOKEN)) {
      sessionStorage.setItem('Path', router.asPath);
      router.push('/login');
      return;
    }

    if (isSaveLoading) return;

    saveProduct({ data: formatToBlob<SaveProductPayload['data']>(data, true) })
      .then(res => {
        if (res.data.isSuccess) {
          setToast({
            text: '해당 상품이 피쉬저장소에 담겼어요.',
            onClick: () => router.push('/compare'),
          });
          refetch();
        } else setAlert({ message: res.data.errorMsg ?? '' });
      })
      .catch(error => console.log(error));
  };

  const { mutateAsync: deleteSaveProducts, isLoading: isDeleteLoading } = useMutation(
    async (args: DeleteTastingNoteToBasketPayload) =>
      await (await client()).deleteTastingNoteToBasket(args, { type: ContentType.FormData }),
  );

  const onDeleteSaveProductsMutate = ({ data }: DeleteTastingNoteToBasketPayload) => {
    if (isDeleteLoading) return;
    deleteSaveProducts({ data: formatToBlob<DeleteTastingNoteToBasketPayload['data']>(data, true) })
      .then(res => {
        if (res.data.isSuccess) {
          refetch();
        } else setAlert({ message: res.data.errorMsg ?? '' });
      })
      .catch(error => console.log(error));
  };

  const headTitle = `${data?.title} - ${HEAD_NAME}`;
  // const headDescription = `${data?.title} - ${HEAD_DESCRIPTION}`;

  const [selectedTab, setSelectedTab] = useState<number>(0);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const [content, setContent] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  useEffect(() => {
    if (data) {
      setIsLiked(data.isLike ?? false);
      if (data.description) {
        fetch(data.description)
          .then(res => res.text())
          .then(setDescription)
          .catch(err => console.log(JSON.stringify(err)));
      }
    }
  }, [data]);

  useEffect(() => {
    if (deliverInfo && deliverInfo.content) {
      fetch(deliverInfo.content)
        .then(res => res.text())
        .then(setContent)
        .catch(err => console.log(JSON.stringify(err)));
    }
  }, [deliverInfo]);

  useEffect(() => {
    if (openState === 'open') {
      setIsVisible(true);
    }
  }, [openState]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const result = localStorage.getItem('product') || '[]';
      const list: number[] = JSON.parse(result);
      const list2 = new Set<number>([Number(id)].concat(list));
      localStorage.setItem('product', JSON.stringify(Array.from(list2)));
    }
  }, [id]);

  useEffect(() => {
    // 정보 넘기기
    const title = initialData.title as string;
    const images = initialData.images as string[];
    setMetaData({ title: '[바로피쉬]' + title, image: { alt: '상품', url: images[0] } });
    if (!data) return;

    if (typeof window.kakaoPixel !== 'undefined') {
      window.kakaoPixel(`${kakaoPixel.KAKAO_TRACKING_ID}`).viewContent({
        id: `${data?.id}`,
        tag: `${data?.title}`,
      });
    }
    const value = {
      content_ids: ['facebook_' + data?.id],
      content_type: 'product',
      currency: 'KRW',
      value:
        formatToLocaleString(data?.discountPrice).replace(',', '.') ||
        formatToLocaleString(data?.originPrice).replace(',', '.'),
    };
    gtag('event', 'view_item', {
      items: [
        {
          id: data?.id,
          name: data?.title,
          list_name: '해산물',
          brand: data?.store?.name,
          category: data?.category?.name,
          variant: '상품 옵션',
          list_position: data?.category?.parentCategoryName,
          quantity: 1,
          price: data?.discountPrice || data?.originPrice,
        },
      ],
    });
    // google ads
    gtag('event', 'conversion', { send_to: 'AW-11315318272/9kSpCOrK_9cYEICcyJMq' });
    fpixel.view({ value });
  }, [data, headTitle, initialData.images, initialData.title, router.events, setMetaData]);
  // 배너 확인용 유저
  const { data: user } = useQuery(queryKey.user, async () => {
    const res = await (await client()).selectUserSelfInfo();
    if (res.data.isSuccess) {
      return res.data.data;
    }
  });

  const infoRef = useRef<HTMLDivElement>(null);
  const reviewRef = useRef<HTMLDivElement>(null);
  const inquiryRef = useRef<HTMLDivElement>(null);

  const tapOnclick = (idx: number) => {
    setSelectedTab(idx);
    setIsTap(true);
    setIsScroll(false);
  };
  const [isTap, setIsTap] = useState(false);
  const [isScroll, setIsScroll] = useState(false);
  useEffect(() => {
    if (!isTap || isScroll) return;
    if (selectedTab === 0) {
      infoRef.current?.scrollIntoView({
        behavior: 'auto',
        block: 'start',
      });
      if (!user) window.scrollBy(0, -170);
      else window.scrollBy(0, -110);
    } else if (selectedTab === 1) {
      reviewRef.current?.scrollIntoView({
        behavior: 'auto',
        block: 'start',
      });
      if (!user) window.scrollBy(0, -130);
      else window.scrollBy(0, -90);
    } else if (selectedTab === 2) {
      inquiryRef.current?.scrollIntoView({
        behavior: 'auto',
        block: 'start',
      });
      if (!user) window.scrollBy(0, -20);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tapOnclick]);

  const _infiniteScroll = useCallback(() => {
    // 화면높이
    setIsScroll(true);
    const clientHeight = document.documentElement.clientHeight;
    if (
      infoRef.current &&
      reviewRef.current &&
      inquiryRef.current &&
      infoRef.current.getBoundingClientRect().top <= clientHeight / 2 &&
      infoRef.current.getBoundingClientRect().bottom >= clientHeight / 2
    ) {
      setSelectedTab(0);
    } else if (
      reviewRef.current &&
      inquiryRef.current &&
      reviewRef.current.getBoundingClientRect().top <= clientHeight / 2 &&
      reviewRef.current.getBoundingClientRect().bottom >= clientHeight / 2
    ) {
      setSelectedTab(1);
      setIsFloating(true);
    } else if (
      inquiryRef.current &&
      inquiryRef.current.getBoundingClientRect().top <= clientHeight / 2 &&
      inquiryRef.current.getBoundingClientRect().bottom >= clientHeight / 2
    ) {
      setSelectedTab(2);
      setIsFloating(true);
    }
  }, []);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    window.addEventListener('scroll', _infiniteScroll, true);
    setIsScroll(true);
    return () => {
      window.removeEventListener('scroll', _infiniteScroll, true);
    };
  }, [_infiniteScroll, isTap]);
  const [isFloating, setIsFloating] = useState(false);
  const [isRef, setIsRef] = useState(false);
  useEffect(() => {
    const clientHeight = document.documentElement.clientHeight;
    if (infoRef.current && infoRef.current.getBoundingClientRect().top <= clientHeight / 2) {
      setIsFloating(true);
    } else {
      setIsFloating(false);
    }
  }, [isRef, isTap]);

  const { ref } = useInView({
    initialInView: false,
    onChange: inView => {
      if (inView) setIsRef(true);
      else setIsRef(false);
    },
  });

  const onFloating = () => {
    infoRef.current?.scrollIntoView({
      behavior: 'auto',
      block: 'start',
    });
    if (!user) window.scrollBy(0, -170);
    else window.scrollBy(0, -150);
  };
  const HEAD_DESCRIPTION = '실패없는 직거래 수산물 쇼핑은 여기서!';
  return (
    <>
      {data && (
        <Head>
          <meta property='og:price:currency' content='KRW' />
          <meta
            property='og:image'
            content={`${initialData?.images ? initialData?.images[0] : ''}`}
          />
          <meta
            property='og:url'
            content={`https://barofish.com${router.pathname}?id=${router?.query.id}`}
          />
          <meta property='og:price:currency' content='KRW' />
          <meta
            property='og:price:amount'
            content={`${
              initialData?.discountPrice?.toString() || initialData?.originPrice?.toString()
            }`}
          />
          <meta
            property='product:availability'
            content={data?.state === 'INACTIVE' ? 'discontinued' : 'in stock'}
          />
          <meta property='product:brand' content={data?.store?.name} />
          <meta property='product:condition' content='new' />
          <meta property='product:plural_title' content={headTitle} />
          <meta property='product:price:currency' content='KRW' />
          <meta
            property='product:price:amount'
            content={`${
              initialData?.discountPrice?.toString() || initialData?.originPrice?.toString()
            }`}
          />
          <meta property='product:item_group_id' content={data?.id?.toString()} />
          <meta property='product:retailer_item_id' content={'facebook_' + data?.id?.toString()} />
        </Head>
      )}

      {/* <Head></Head> */}
      <div className='overflow-y-visible pb-[80px] max-md:w-[100vw]'>
        {/* <DefaultSeo
          title={headTitle}
          description={HEAD_DESCRIPTION}
          openGraph={{
            title: headTitle,
            description: HEAD_DESCRIPTION,
            images: initialData?.images?.map((v: string) => {
              return {
                url: v,
                alt: headTitle,
              };
            }),
          }}
        /> */}
        {/* bottomSheet : 옵션 선택 */}
        <div className='sticky top-0 z-[100] max-md:w-[100vw]'>
          {isVisible && (
            <div className='absolute top-0 z-[100] flex h-[100vh] w-full flex-col justify-end bg-black/50'>
              <ProductBottomSheet data={data} setIsVisible={setIsVisible} />
            </div>
          )}
        </div>
        {/* header */}
        {!user && (
          <div className='sticky top-0 z-50'>
            <HeaderBanner />
          </div>
        )}
        <div
          className={
            !user
              ? 'sticky top-[42px] z-50 flex h-[50px] items-center justify-between gap-3.5 bg-white pl-4 pr-[18px]'
              : 'sticky top-0 z-50 flex h-[50px] items-center justify-between gap-3.5 bg-white pl-4 pr-[18px]'
          }
        >
          <BackButton />
          {/* <div className='cursor-pointer pl-[25px]' onClick={() => router.push('/')}>
            홈
          </div> */}
          <div className=' flex items-center gap-2.5'>
            <HomeBtn />
            <div
              className='cursor-pointer'
              onClick={() => {
                if (!getCookie(VARIABLES.ACCESS_TOKEN)) {
                  sessionStorage.setItem('Path', router.asPath);
                  router.push('/login');
                  return;
                }
                router.push('/product/cart');
              }}
            >
              <CartIcon />
            </div>
            {/* <ShareButton /> */}
          </div>
        </div>

        <div
          style={{ borderTop: '1px solid #dcdcdc' }}
          className={
            !user
              ? 'sticky top-[90px] z-50 flex  w-full items-center justify-between bg-white'
              : 'sticky top-[50px] z-50 flex  w-full items-center justify-between bg-white '
          }
        >
          <ProductTab
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
            reviewCount={data?.reviewCount ?? 0}
            onClick={tapOnclick}
          />
        </div>

        <PullToRefresh pullingContent='' refreshingContent={<Loading />} onRefresh={handleRefresh}>
          <>
            {/* content */}
            <ProductBanner image={data?.images ?? []} />
            <ProductInformationDefault
              data={data}
              user={user}
              setSelectedTab={setSelectedTab}
              // isTasting={data.tastingNoteInfo ?? 0}
            />

            {/* <ProductCompare /> */}
            {/* BARO’s 피쉬 노트 */}

            {data && data?.tastingNoteInfo && isTasting && (
              <div className='flex h-[auto]  w-full flex-col items-center bg-[#EEF3FF] pb-[15px]'>
                <div className='mb-[10px] mt-7 w-[230px] items-center rounded-full bg-[#002486] p-[5px] py-[5px] text-center text-[20px] font-bold  text-[#fff] '>
                  피쉬 테이스팅 노트
                </div>
                <p className='mb-[5px] text-[12px]'>수산물 30년 경력의 매니아부터 초보자까지!</p>
                <p className='mb-[15px] text-[12px]'>
                  바로피쉬가 직접 먹어보고 솔직한 노트로 전해드립니다.
                </p>
                <Chat data={data?.tastingNoteInfo ?? []} />
                <TastingInfo
                  keyword={data?.tastingNoteInfo[0]?.textures ?? []}
                  info={{
                    difficultyLevelOfTrimming:
                      data?.tastingNoteInfo[0]?.difficultyLevelOfTrimming ?? 0,
                    recommendedCookingWay: data?.tastingNoteInfo[0]?.recommendedCookingWay ?? '',
                    theScentOfTheSea: data?.tastingNoteInfo[0]?.theScentOfTheSea ?? 0,
                  }}
                />
                <button
                  className='mb-[10px] mt-[30px] flex h-[52px] w-[230px] flex-1 items-center justify-center rounded-full bg-primary-50 px-[5px] py-[10px] text-white'
                  style={{
                    background:
                      'linear-gradient(90deg, #4974E6 6.36%, #6965E8 50.17%, #8956E9 92.66%)',
                  }}
                  onClick={() => {
                    if (!getCookie(VARIABLES.ACCESS_TOKEN)) {
                      sessionStorage.setItem('Path', router.asPath);
                      router.push('/login');
                      return;
                    }
                    if (data?.isLike)
                      onDeleteSaveProductsMutate({ data: { productId: [Number(id)] } });
                    else {
                      if (data?.tastingNoteInfo?.length === 0)
                        return setAlert({
                          message: '테이스팅 노트 준비중입니다.',
                        });
                      onSaveMutate({ data: { productId: Number(id) } });
                    }
                  }}
                >
                  <span className='mr-[5px]'>피쉬 저장소에 담아보세요</span>
                  <Image
                    src='/assets/icons/product/tastingAdd.webp'
                    alt='add'
                    width={20}
                    height={20}
                  />
                </button>
              </div>
            )}
            {/* Tab Content */}
            {/* <div className=' w-full flex-col items-center '> */}

            {/* </div> */}
            <div className=' min-h-[calc(100dvb-180px)]'>
              <div ref={ref} className='h-2' />
              <Fragment>
                <div
                  ref={infoRef}
                  dangerouslySetInnerHTML={{ __html: description }}
                  className='pb-7 [&_img]:w-full'
                />
                {/* <ProductInfoNotice id={Number(id)} /> */}
              </Fragment>

              <div>
                {/* 구매자들의 솔직 리뷰 */}
                <ReviewChart
                  data={{
                    taste: data?.reviewStatistics?.taste ?? 0,
                    freshness: data?.reviewStatistics?.fresh ?? 0,
                    price: data?.reviewStatistics?.price ?? 0,
                    packaging: data?.reviewStatistics?.packaging ?? 0,
                    size: data?.reviewStatistics?.size ?? 0,
                  }}
                />
                {/* 사진 후기 */}
                <div className='h-2 bg-grey-90' />
                {/* <ReviewPhoto data={data?.reviews ?? []} type='product' /> */}
                <div ref={reviewRef}>
                  <ReviewPhoto id={data?.id ?? -1} type='product' />
                </div>
              </div>
              <div className='h-2 bg-grey-90' />
              <div ref={inquiryRef}>
                <ProductInquiry
                  productId={Number(id)}
                  data={data?.inquiries ?? []}
                  refetch={refetch}
                />
              </div>
              {/* 배송정책 */}
              {/* <div
                dangerouslySetInnerHTML={{ __html: content }}
                className='product-delivery-description mt-5 px-4'
              /> */}
            </div>
          </>
        </PullToRefresh>
        {/* 플러팅 버튼 */}
        {isFloating && (
          <button
            className='fixed bottom-[110px] z-50 flex w-[375px] justify-end max-md:w-full'
            onClick={onFloating}
          >
            <Image
              width={100}
              height={100}
              src='/assets/icons/product/floating.png'
              alt='floating'
              className='relative top-[45px] h-[100px] w-[100px]'
            />
          </button>
        )}

        {/* 하단 부분 */}
        <div className='fixed bottom-0 z-50 flex w-[375px] items-center gap-2 bg-white px-4 pb-5 pt-2 max-md:w-full'>
          <button
            className='flex h-[52px] w-[54px] items-center justify-center rounded-lg border border-grey-80'
            onClick={() => {
              if (!getCookie(VARIABLES.ACCESS_TOKEN)) {
                sessionStorage.setItem('Path', router.asPath);
                router.push('/login');
                return;
              }
              if (data?.isLike) onDeleteSaveProductsMutate({ data: { productId: [Number(id)] } });
              else {
                if (data?.tastingNoteInfo?.length === 0)
                  return setAlert({
                    message: '테이스팅 노트 준비중입니다.',
                  });
                onSaveMutate({ data: { productId: Number(id) } });
              }
            }}
          >
            <Image
              unoptimized
              alt='heart'
              width={30}
              height={30}
              src={
                isLiked
                  ? '/assets/icons/product/product-bookmark-on.svg'
                  : '/assets/icons/product/product-bookmark-off.svg'
              }
            />
          </button>
          <button
            disabled={data?.state === 'INACTIVE'}
            className={
              data?.state === 'ACTIVE'
                ? 'flex h-[52px] flex-1 items-center justify-center rounded-lg bg-primary-50'
                : 'flex h-[52px] flex-1 items-center justify-center rounded-lg bg-grey-70'
            }
            onClick={() => {
              if (data?.state !== 'ACTIVE') {
                let message = '';
                switch (data?.state) {
                  case 'DELETED':
                    message = '삭제된 상품입니다.';
                    break;
                  case 'SOLD_OUT':
                    message = '품절된 상품입니다.';
                    break;
                  case 'INACTIVE':
                    message = '비활성화된 상품입니다.';
                    break;
                  default:
                    break;
                }
                return setAlert({ message });
              }
              setIsVisible(true);
            }}
          >
            <p className='text-[18px] font-bold -tracking-[0.03em] text-white'>
              {data?.state === 'ACTIVE' ? '구매하기' : '상품 준비중'}
            </p>
          </button>
        </div>
      </div>
    </>
  );
};

ProductDetail.getLayout = page => (
  <Layout headerProps={{ disable: true }} footerProps={{ disable: true }}>
    {page}
    <HomeFooter />
  </Layout>
);

export const getServerSideProps: GetServerSideProps = async context => {
  const { id } = context.query;
  const { selectProduct } = await client();
  return {
    props: { initialData: (await selectProduct(Number(id))).data.data },
  };
};
export default ProductDetail;
