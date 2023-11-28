import { useMutation, useQuery } from '@tanstack/react-query';
import { getCookie } from 'cookies-next';
import { type GetServerSideProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Fragment, useState } from 'react';
import { client } from 'src/api/client';
import {
  type CompareSetDto,
  type DeleteCompareSetPayload,
  type DeleteSaveProductsPayload,
  type ProductListDto,
} from 'src/api/swagger/data-contracts';
import { ContentType } from 'src/api/swagger/http-client';
import { CartIcon } from 'src/components/common';
import Layout from 'src/components/common/layout';
import { BackButton } from 'src/components/ui';
import { queryKey } from 'src/query-key';
import { useAlertStore, useBottomConfirmStore } from 'src/store';
import { type NextPageWithLayout } from 'src/types/common';
import cm from 'src/utils/class-merge';
import {
  calcDiscountRate,
  formatToBlob,
  formatToLocaleString,
  setSquareBrackets,
} from 'src/utils/functions';
import { VARIABLES } from 'src/variables';
import { FreeMode } from 'swiper';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';

/** 저장함 */
const Storage: NextPageWithLayout = () => {
  const { setAlert } = useAlertStore();
  const router = useRouter();
  const { bottomConfirm, setBottomConfirm } = useBottomConfirmStore();
  const [selectedTab, setSelectedTab] = useState<number>(0);
  const [selectedItem, setSelectedItem] = useState<ProductListDto[]>([]);
  const [selectedSet, setSelectedSet] = useState<CompareSetDto[]>([]);

  const { data, refetch } = useQuery(queryKey.compare.lists, async () => {
    const res = await (await client()).getTastingNoteBasket();
    if (res.data.isSuccess) {
      return res.data.data;
    } else {
      throw new Error(res.data.code + ': ' + res.data.errorMsg);
    }
  });

  const { data: set, refetch: setRefetch } = useQuery(queryKey.compareSet.lists, async () => {
    const res = await (await client()).selectCompareSetList();
    if (res.data.isSuccess) {
      return res.data.data;
    } else {
      throw new Error(res.data.code + ': ' + res.data.errorMsg);
    }
  });

  const { mutateAsync: deleteSaveProducts, isLoading: isDeleteLoading } = useMutation(
    async (args: DeleteSaveProductsPayload) =>
      await (await client()).deleteSaveProducts(args, { type: ContentType.FormData }),
  );

  const { mutateAsync: deleteCompareSet, isLoading: isDeleteSetLoading } = useMutation(
    async (args: DeleteCompareSetPayload) =>
      await (await client()).deleteCompareSet(args, { type: ContentType.FormData }),
  );

  const onDeleteSaveProductsMutate = ({ data }: DeleteSaveProductsPayload) => {
    if (isDeleteLoading) return;

    deleteSaveProducts({ data: formatToBlob<DeleteSaveProductsPayload['data']>(data, true) })
      .then(res => {
        if (res.data.isSuccess) {
          refetch();
          setSelectedItem([]);
          setSelectedSet([]);
        } else setAlert({ message: res.data.errorMsg ?? '' });
      })
      .catch(error => console.log(error));
  };

  const onDeleteCompareSetMutate = ({ data }: DeleteCompareSetPayload) => {
    if (isDeleteSetLoading) return;
    deleteCompareSet({ data: formatToBlob<DeleteCompareSetPayload['data']>(data, true) })
      .then(res => {
        if (res.data.isSuccess) {
          setRefetch();
          setSelectedItem([]);
          setSelectedSet([]);
        } else setAlert({ message: res.data.errorMsg ?? '' });
      })
      .catch(error => console.log(error));
  };
  console.log(selectedItem);

  return (
    <div
      className={cm('pb-6 max-md:w-[100vw]', {
        'pb-[250px]': bottomConfirm || selectedItem.length > 0,
      })}
    >
      {/* header */}
      <div className='sticky top-0 z-50 flex h-[56px] items-center bg-white pl-4 pr-[18px]'>
        <BackButton />
        <p className='flex-1 text-center text-[16px] font-bold -tracking-[0.03em] text-grey-10'>
          피쉬저장소
        </p>
        <Link href='/product/cart'>
          <CartIcon />
        </Link>
      </div>

      {/* Tab */}
      {/* <div className='mt-4 flex w-full items-center justify-around border-b border-b-[#F7F7F7] px-[46px] md:justify-between'>
        {['저장한 상품', '저장한 조합'].map((v, idx) => {
          const isActive = selectedTab === idx;

          return (
            <button
              key={`storeTab${idx}`}
              className={cm(
                'px-[21.5px] pb-1.5',
                isActive ? '-mb-[1px] border-b-2 border-b-primary-50' : 'border-b border-b-white', // 파란선 1px 겹침 처리
              )}
              onClick={() => {
                setSelectedItem([]);
                setSelectedSet([]);
                setSelectedTab(idx);
                refetch();
                setRefetch();
              }}
            >
              <p
                className={cm(
                  'w-[71px] text-[16px] leading-[24px] -tracking-[0.03em]',
                  isActive ? 'font-bold text-primary-50' : 'font-medium text-grey-50',
                )}
              >
                {v}
              </p>
            </button>
          );
        })}
      </div> */}

      {selectedTab === 0 ? (
        (data ?? []).length === 0 ? (
          Empty('저장한 상품')
        ) : (
          <Fragment>
            <div className='mt-6 flex items-center px-4'>
              <p className='flex-1 text-[14px] font-semibold leading-[22px] -tracking-[0.03em] text-grey-60'>
                {`저장한 상품 ${formatToLocaleString(data?.length ?? 0)}`}
              </p>
              <button
                className=''
                onClick={() => {
                  if (selectedItem.length === 0)
                    return setAlert({ message: '상품을 선택해주세요.' });
                  setBottomConfirm({
                    title: '상품 삭제',
                    content: '선택하신 상품을 정말 삭제하시겠습니까?',
                    onClick: () => {
                      onDeleteCompareSetMutate({
                        data: { compareSetIds: selectedItem.map(x => x.productId ?? -1) },
                      });
                    },
                  });
                }}
              >
                <p
                  className={cm(
                    'text-[14px] font-semibold leading-[22px] -tracking-[0.03em] text-grey-20',
                    { 'text-primary-50': selectedItem.length > 0 },
                  )}
                >
                  삭제
                </p>
              </button>
              {selectedItem.length > 0 && (
                <div className='flex items-center'>
                  <div className='mx-5 h-[18px] w-[1px] bg-grey-90' />
                  <button
                    className=''
                    onClick={() => {
                      setSelectedItem([]);
                    }}
                  >
                    <p className='text-[14px] font-semibold leading-[22px] -tracking-[0.03em] text-grey-20'>
                      취소
                    </p>
                  </button>
                </div>
              )}
            </div>
            <div className='mt-2.5 grid grid-cols-3 gap-x-1.5 gap-y-[22px] px-4'>
              {(data ?? []).map((v: any, idx: number) => {
                return (
                  <Link
                    key={`storage${idx}`}
                    href={{ pathname: '/product', query: { id: v.productId } }}
                  >
                    <div className='relative aspect-square'>
                      <Image
                        unoptimized
                        width={110}
                        height={110}
                        src={v.image ?? ''}
                        alt='product'
                        className='aspect-square w-full rounded-lg object-cover'
                      />
                      <button
                        className='absolute left-2 top-2'
                        onClick={e => {
                          e.preventDefault();

                          const tmp = [...selectedItem];
                          console.log(tmp, 'selectedItem', tmp.length);
                          // if (tmp.length >= 2)
                          //   return setAlert({ message: '상품을 2개까지만 선택해주세요.' });
                          const findIndex = tmp.findIndex(x => v.id === x.id);
                          if (findIndex > -1) tmp.splice(findIndex, 1);
                          else tmp.push(v);
                          setSelectedItem(tmp);
                        }}
                      >
                        <Image
                          unoptimized
                          alt='check'
                          width={24}
                          height={24}
                          src={
                            selectedItem.map(x => x.id).includes(v.id)
                              ? '/assets/icons/common/check-box-on.svg'
                              : '/assets/icons/common/check-box-off-gray.svg'
                          }
                        />
                      </button>
                    </div>
                    <p className='mt-2 line-clamp-1 text-start text-[14px] font-normal leading-[22px] -tracking-[0.03em] text-grey-10'>
                      {`${setSquareBrackets(v.storeName)} ${v.title}`}
                    </p>
                    <div className='mt-0.5 flex items-center gap-0.5'>
                      {(v.originPrice ?? 0) !== 0 && (
                        <p className='text-[16px] font-bold leading-[24px] -tracking-[0.03em] text-teritory'>{`${calcDiscountRate(
                          v.originPrice,
                          v.discountPrice,
                        )}%`}</p>
                      )}
                      <p className='line-clamp-1 text-[16px] font-bold leading-[24px] -tracking-[0.03em] text-grey-10'>{`${formatToLocaleString(
                        v.discountPrice,
                      )}원`}</p>
                    </div>
                    {(v.originPrice ?? 0) !== 0 && (
                      <p className='-mt-0.5 text-start text-[13px] font-normal leading-[20px] -tracking-[0.03em] text-grey-60 line-through'>{`${formatToLocaleString(
                        v.originPrice,
                      )}원`}</p>
                    )}
                    {/* <div className='mt-1 flex items-center gap-0.5'>
                      <Image
                        unoptimized
                        src='/assets/icons/common/speech-bubble.svg'
                        alt='후기'
                        width={16}
                        height={16}
                        draggable={false}
                      />
                      <p className='text-[13px] font-medium leading-[20px] -tracking-[0.03em] text-grey-70'>
                        후기
                      </p>
                      <p className='text-[13px] font-medium leading-[20px] -tracking-[0.03em] text-grey-70'>{`${
                        v.reviewCount ?? 0
                      }`}</p>
                      안나오냐
                    </div> */}
                  </Link>
                );
              })}
            </div>
          </Fragment>
        )
      ) : (set ?? []).length === 0 ? (
        Empty('저장한 조합')
      ) : (
        <Fragment>
          <div className='mt-6 flex items-center px-4'>
            <p className='flex-1 text-[14px] font-semibold leading-[22px] -tracking-[0.03em] text-grey-60'>
              {`저장한 조합 ${formatToLocaleString(set?.length ?? 0)}`}
            </p>
            <button
              className=''
              onClick={() => {
                if (selectedSet.length === 0) return setAlert({ message: '조합을 선택해주세요.' });
                setBottomConfirm({
                  title: '조합 삭제',
                  content: '선택하신 조합을 정말 삭제하시겠습니까?',
                  onClick: () => {
                    onDeleteCompareSetMutate({
                      data: { compareSetIds: selectedSet.map(x => x.compareSetId ?? -1) },
                    });
                  },
                });
              }}
            >
              <p
                className={cm(
                  'text-[14px] font-semibold leading-[22px] -tracking-[0.03em] text-grey-20',
                  { 'text-primary-50': selectedSet.length > 0 },
                )}
              >
                삭제
              </p>
            </button>
            {selectedSet.length > 0 && (
              <button
                className='ml-10'
                onClick={() => {
                  setSelectedSet([]);
                }}
              >
                <p className='text-[14px] font-semibold leading-[22px] -tracking-[0.03em] text-grey-20'>
                  취소
                </p>
              </button>
            )}
          </div>
          <div className='mt-[11px] flex flex-col gap-5 px-4'>
            {(set ?? [])?.map(v => {
              // {([] as CompareSetDto[]).map(v => {
              return (
                <div
                  key={`set${v.compareSetId}`}
                  className='rounded-lg border border-grey-80 px-[13px] py-[14px]'
                >
                  <div className='flex items-center justify-end'>
                    <button
                      className=''
                      onClick={e => {
                        e.preventDefault();
                        const tmp = [...selectedSet];
                        const findIndex = tmp.findIndex(x => v.compareSetId === x.compareSetId);
                        if (findIndex > -1) tmp.splice(findIndex, 1);
                        else tmp.push(v);

                        setSelectedSet(tmp);
                      }}
                    >
                      <Image
                        unoptimized
                        alt='check'
                        width={24}
                        height={24}
                        src={
                          selectedSet.map(x => x.compareSetId).includes(v.compareSetId)
                            ? '/assets/icons/common/check-box-on.svg'
                            : '/assets/icons/common/check-box-off-gray.svg'
                        }
                      />
                    </button>
                  </div>
                  <div className='mt-[15px] flex flex-col gap-4'>
                    {(v.products ?? [])?.map(x => {
                      const image = (x.image ?? '').replace('[', '').replace(']', '').split(',');

                      return (
                        <div key={`${v.compareSetId}/${x.id}`} className='flex items-center gap-2'>
                          <Image
                            unoptimized
                            src={image?.[0] ?? '/'}
                            alt='product'
                            className='rounded-lg'
                            width={90}
                            height={90}
                            style={{ width: '90px', height: '90px' }}
                          />
                          <div className=''>
                            <p className='line-clamp-1 text-[14px] font-normal leading-[22px] -tracking-[0.03em] text-grey-10'>
                              {`${setSquareBrackets(x?.storeName)} ${x?.title} `}
                            </p>
                            <div className='mt-0.5 flex items-center gap-0.5'>
                              {(x.originPrice ?? 0) !== 0 && (
                                <p className='text-[16px] font-bold leading-[24px] -tracking-[0.03em] text-teritory'>{`${calcDiscountRate(
                                  x.originPrice,
                                  x.discountPrice,
                                )}%`}</p>
                              )}
                              <p className='text-[16px] font-bold leading-[24px] -tracking-[0.03em] text-grey-10'>{`${formatToLocaleString(
                                x.discountPrice,
                              )}원`}</p>
                            </div>
                            {(x.originPrice ?? 0) !== 0 && (
                              <p className='-mt-0.5 text-start text-[13px] font-normal leading-[20px] -tracking-[0.03em] text-grey-60 line-through'>{`${formatToLocaleString(
                                x.originPrice,
                              )}원`}</p>
                            )}
                            {/* <div className='mt-1 flex items-center gap-0.5'>
                              <Image
                                unoptimized
                                src='/assets/icons/common/speech-bubble.svg'
                                alt='후기'
                                width={16}
                                height={16}
                                draggable={false}
                              />
                              <p className='text-[13px] font-medium leading-[20px] -tracking-[0.03em] text-grey-70'>
                                후기
                              </p>
                              <p className='text-[13px] font-medium leading-[20px] -tracking-[0.03em] text-grey-70'>{`${
                                x.reviewCount ?? 0
                              }`}</p>
                            </div> */}
                          </div>
                        </div>
                      );
                    })}
                    <Link
                      className='mt-1.5'
                      href={{
                        pathname: '/compare/[id]',
                        query: { id: v.compareSetId, type: 'id' },
                      }}
                    >
                      <div className='flex h-[42px] items-center justify-center rounded-lg border border-grey-70'>
                        <p className='text-[14px] font-semibold -tracking-[0.03em] text-grey-10'>
                          비교 상세 보기
                        </p>
                      </div>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </Fragment>
      )}

      {selectedItem.length > 0 && (
        <div className='fixed bottom-0 z-50 flex w-[375px] flex-col rounded-t-lg border-t border-t-grey-90 bg-white px-4 pb-7 pt-2.5 max-md:w-full'>
          <div className='h-1 w-9 self-center rounded-full bg-grey-80' />
          <p className='mt-[17px] text-[14px] font-medium leading-[22px] -tracking-[0.03em] text-grey-70'>
            최대 2개까지 비교 가능해요
          </p>

          <Swiper
            slidesPerView={4.3}
            modules={[FreeMode]}
            spaceBetween={11}
            className='mt-[13px]'
            style={{ marginInline: '-16px', paddingInline: '16px' }}
            freeMode={{
              momentumRatio: 0.3,
              momentumBounceRatio: 0.5,
              momentumVelocityRatio: 0.5,
            }}
          >
            {selectedItem.map((v, idx) => {
              return (
                <SwiperSlide key={`curation${idx}`} className=''>
                  <button
                    className='relative overflow-hidden rounded-lg'
                    onClick={() => {
                      const tmp = [...selectedItem];
                      tmp.splice(idx, 1);
                      setSelectedItem(tmp);
                    }}
                  >
                    <Image
                      unoptimized
                      width={70}
                      height={70}
                      src={v.image ?? ''}
                      alt='selected'
                      draggable={false}
                      className='aspect-square h-[70px] w-[70px] object-cover'
                    />
                    <Image
                      unoptimized
                      src='/assets/icons/compare/compare-delete.svg'
                      alt='delete'
                      width={18}
                      height={18}
                      className='absolute right-1.5 top-1.5'
                    />
                  </button>
                </SwiperSlide>
              );
            })}
          </Swiper>
          <button
            className='mt-5 flex h-[52px] w-full items-center justify-center rounded-lg bg-primary-50'
            onClick={() => {
              if (![2].includes(selectedItem.length))
                return setAlert({ message: '상품 2개를 선택해주세요.' });
              const isTastingNoteExists = selectedItem.filter(
                item => item.tastingNoteExists === true,
              );
              const notTastingNoteExists = selectedItem.filter(
                item => item.tastingNoteExists === false,
              );
              if (isTastingNoteExists.length < 2)
                return setAlert({
                  message:
                    `${notTastingNoteExists.map(item => item.title)}` +
                    ' 는\n 테이스팅 데이터가 없는 상품 입니다.',
                });
              // const list = new Set<number | undefined>(selectedItem.map(x => x.parentCategoryId));
              // if (Array.from(list).length > 1)
              //   return setAlert({ message: '같은 카테고리의 상품끼리 비교 가능합니다.' });

              // onAddCompareSetMutate(selectedItem.map(x => x.id ?? -1));

              router.push({
                pathname: '/compare/[id]',
                query: { id: selectedItem.map(x => x.productId).join(','), type: 'list' },
              });
            }}
          >
            <p className='text-[16px] font-bold leading-[24px] -tracking-[0.03em] text-white'>
              비교하기
            </p>
          </button>
        </div>
      )}
    </div>
  );
};

function Empty(text: string) {
  return (
    <div className='h-[calc(100dvb-136px)]'>
      <div className='grid h-full flex-1 place-items-center'>
        <div className='flex flex-col items-center gap-2'>
          <Image
            unoptimized
            src='/assets/icons/common/error.svg'
            alt='error'
            width={40}
            height={40}
          />
          <p className='whitespace-pre text-center text-[14px] font-medium leading-[24px] -tracking-[0.05em] text-[#B5B5B5]'>
            {`${text}이 없습니다.`}
          </p>
        </div>
      </div>
    </div>
  );
}

Storage.getLayout = page => (
  <Layout headerProps={{ disable: true }} footerProps={{ disable: true }}>
    {page}
  </Layout>
);

export const getServerSideProps: GetServerSideProps = async context => {
  if (!getCookie(VARIABLES.ACCESS_TOKEN, context)) {
    {
      return {
        redirect: {
          permanent: false,
          destination: '/login',
        },
      };
    }
  } else {
    return {
      props: {},
    };
  }
};

export default Storage;
