import { useMutation, useQuery } from '@tanstack/react-query';
import { getCookie } from 'cookies-next';
import { type GetServerSideProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
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
import { CartIcon, Chat } from 'src/components/common';
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
  ShareButton,
  TastingInfo,
} from 'src/components/product';
import { ReviewChart, ReviewPhoto } from 'src/components/review';
import { BackButton } from 'src/components/ui';
import { queryKey } from 'src/query-key';
import { useAlertStore, useToastStore } from 'src/store';
import { type NextPageWithLayout } from 'src/types/common';
import { formatToBlob, formatToLocaleString, handleRefresh } from 'src/utils/functions';
import { VARIABLES } from 'src/variables';
import * as fpixel from 'src/utils/fpixel';
import { HeaderBanner } from 'src/components/common/header-banner';
import { DefaultSeo } from 'next-seo';
import PullToRefresh from 'react-simple-pull-to-refresh';
import Loading from 'src/components/common/loading';
import { useInView } from 'react-intersection-observer';
interface Props {
  initialData: SimpleProductDto;
}

/** 상품 상세 */
const ProductDetail: NextPageWithLayout<Props> = ({ initialData }) => {
  const router = useRouter();
  const { id, openState } = router.query;
  const { setAlert } = useAlertStore();
  const { setToast } = useToastStore();
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
    if (!getCookie(VARIABLES.ACCESS_TOKEN)) return router.push('/login');
    if (isSaveLoading) return;

    saveProduct({ data: formatToBlob<SaveProductPayload['data']>(data, true) })
      .then(res => {
        if (res.data.isSuccess) {
          setToast({
            text: '1개의 상품이 저장함에 담겼어요.',
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
    if (!data) return;
    const value = {
      content_ids: [data?.id],
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
  }, [data, headTitle, router.events]);
  // 배너 확인용 유저
  const { data: user } = useQuery(queryKey.user, async () => {
    const res = await (await client()).selectUserSelfInfo();
    if (res.data.isSuccess) {
      return res.data.data;
    }
  });

  const testtext = '실패없는 직거래 수산물 쇼핑은 여기서!';

  const [isImgObserver, setIsImgObserver] = useState(false);
  const infoRef = useRef<HTMLDivElement>(null);
  const reviewRef = useRef<HTMLDivElement>(null);
  const inquiryRef = useRef<HTMLDivElement>(null);

  const { ref: imgRef } = useInView({
    initialInView: false,
    onChange: inView => {
      if (inView) {
        setIsImgObserver(false);
      } else {
        setIsImgObserver(true);
      }
    },
  });
  // console.log(isObserver);
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
    } else if (
      inquiryRef.current &&
      inquiryRef.current.getBoundingClientRect().top <= clientHeight / 2 &&
      inquiryRef.current.getBoundingClientRect().bottom >= clientHeight / 2
    ) {
      setSelectedTab(2);
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

  return (
    <>
      {data && (
        <Head>
          <meta property='og:price:currency' content='KRW' />
          <meta property='og:image' content={`${data?.images ? data?.images[0] : ''}`} />

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
        <DefaultSeo
          title={headTitle}
          description={testtext}
          openGraph={{
            title: headTitle,
            description: testtext,
            images: data?.images?.map((v: string) => {
              return {
                url: v,
                alt: headTitle,
              };
            }),
          }}
        />
        {/* bottomSheet : 옵션 선택 */}
        <div className='sticky top-0 z-[100] w-full'>
          {isVisible && (
            <div className='absolute top-0 z-[100] flex h-[100vh] w-full flex-col justify-end bg-black/50'>
              <ProductBottomSheet data={data} isVisible={isVisible} setIsVisible={setIsVisible} />
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
              ? 'sticky top-11 z-50 flex h-[56px] items-center justify-between gap-3.5 bg-white pl-4 pr-[18px]'
              : 'sticky top-0 z-50 flex h-[56px] items-center justify-between gap-3.5 bg-white pl-4 pr-[18px]'
          }
        >
          <BackButton />
          <div className=' flex items-center gap-4'>
            <Link href='/product/cart'>
              <CartIcon />
            </Link>
            <ShareButton />
          </div>
        </div>

        <div
          className={
            !user
              ? 'sticky top-[100px] z-50 flex  w-full items-center justify-between bg-white'
              : 'sticky top-10 z-50 flex  w-full items-center justify-between bg-white '
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
            <div ref={imgRef}>
              <ProductInformationDefault
                data={data}
                user={user}
                setSelectedTab={setSelectedTab}
                // isTasting={data.tastingNoteInfo ?? 0}
              />
            </div>
            {/* <ProductCompare /> */}
            {/* BARO’s 피쉬 노트 */}

            {data && data?.tastingNoteInfo && isTasting && (
              <div className='flex h-[auto] min-h-[580px] w-full flex-col items-center bg-[#eef3ff] pb-[15px]'>
                <div className='mb-[40px] w-full items-start  bg-[#002486] px-[10px] py-[12px] pl-[40px] text-left text-[20px] font-bold  text-white '>
                  피쉬 테이스팅 노트
                </div>
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
              </div>
            )}

            {/* <div className='h-2 bg-grey-90' /> */}
            {/* Tab Content */}
            {/* <div className=' w-full flex-col items-center '> */}

            {/* </div> */}
            <div className='mt-[30px] min-h-[calc(100dvb-180px)]'>
              <Fragment>
                <div
                  ref={infoRef}
                  dangerouslySetInnerHTML={{ __html: description }}
                  className='pb-7 [&_img]:w-full'
                />
                {/* <ProductInfoNotice id={Number(id)} /> */}
              </Fragment>
              <div className='h-2 bg-grey-90' />
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
            {/* 하단 부분 */}
            <div className='fixed bottom-0 z-50 flex w-[375px] items-center gap-2 bg-white px-4 pb-5 pt-2 max-md:w-full'>
              <button
                className='flex h-[52px] w-[54px] items-center justify-center rounded-lg border border-grey-80'
                onClick={() => {
                  if (!getCookie(VARIABLES.ACCESS_TOKEN)) return router.push('/login');
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
          </>
        </PullToRefresh>
      </div>
    </>
  );
};

ProductDetail.getLayout = page => (
  <Layout headerProps={{ disable: true }} footerProps={{ disable: true }}>
    {page}
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
