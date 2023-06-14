import { useMutation, useQuery } from '@tanstack/react-query';
import { type GetServerSideProps } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Fragment, useEffect, useState } from 'react';
import { client } from 'src/api/client';
import Layout from 'src/components/common/layout';
import { ProductShippingAddress } from 'src/components/product';
import { type optionState } from 'src/components/product/bottom-sheet';
import { BackButton } from 'src/components/ui';
import { type NextPageWithLayout } from 'src/types/common';
import cm from 'src/utils/class-merge';
import { formatToLocaleString, formatToPhone } from 'src/utils/functions';
import { bToA } from 'src/utils/parse';
import { IamportPayMethod, IamportPg, impSuccessKey, useIamport } from 'src/utils/use-iamport';
import { type OrderReq, type DeliverPlace } from 'src/api/swagger/data-contracts';
import { useAlertStore } from 'src/store';
import { queryKey } from 'src/query-key';
import { PatternFormat } from 'react-number-format';

/** 주문하기 */
const Order: NextPageWithLayout = () => {
  const router = useRouter();
  const { options } = router.query;
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const { setAlert } = useAlertStore();

  const selectedOption: optionState[] = router.isReady ? JSON.parse(bToA(options as string)) : [];
  const totalPrice =
    selectedOption.length > 0
      ? selectedOption
          .map(x => (x.price + x.additionalPrice) * x.amount)
          .reduce((a: number, b: number) => a + b)
      : 0;
  const totalDelivery =
    selectedOption.length > 0
      ? selectedOption.map(x => x.deliveryFee).reduce((a: number, b: number) => a + b)
      : 0;

  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [shippingAddress, setShippingAddress] = useState<DeliverPlace[]>([]);
  const [point, setPoint] = useState<string>('');
  const [isOpenProduct, setIsOpenProduct] = useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isCheck, setIsCheck] = useState<boolean>(true);
  const onIamport = useIamport();

  const onIamportResult = (orderId: string, isSuccess: boolean) => {
    console.log('isSuccess :', isSuccess);
    router.push({
      pathname: '/product/payment',
      query: { ...router.query, [impSuccessKey]: isSuccess, orderId },
    });
  };

  const getMobileResultUrl = (orderId: string) => {
    const url = new URL(`${location.origin}${'/product/payment'}`);
    url.searchParams.set('id', router.query.id as string);
    url.searchParams.set('orderId', orderId);
    url.searchParams.set('options', options as string);

    return url.href;
  };

  // const { data } = useQuery(
  //   queryKey.product.detail(id),
  //   async () => {
  //     const res = await client().selectProduct(Number(id));
  //     if (res.data.isSuccess) {
  //       return res.data.data;
  //     } else {
  //       throw new Error(res.data.code + ': ' + res.data.errorMsg);
  //     }
  //   },
  //   {
  //     enabled: !!id,
  //     onError: err => console.log(err),
  //   },
  // );

  const { data: _ } = useQuery(
    queryKey.user,
    async () => {
      const res = await client().selectUserSelfInfo();

      if (res.data.isSuccess) {
        return res.data.data;
      } else {
        if (res.data.code === 'FORBIDDEN') {
          router.replace('/login');
          return;
        }
        setAlert({ message: res.data.errorMsg ?? '' });
        throw new Error(res.data.errorMsg);
      }
    },
    {
      staleTime: 0,
      onSuccess: res => {
        setName(res?.name ?? '');
        setPhone(res?.phone ?? '');
        setShippingAddress(res?.deliverPlaces ?? []);
      },
    },
  );

  const { mutateAsync: orderProduct } = useMutation((args: OrderReq) =>
    client().orderProduct(args),
  );

  useEffect(() => {
    const close = () => {
      setIsVisible(false);
    };
    window.addEventListener('popstate', close, { passive: false });

    return () => {
      window.removeEventListener('popstate', close);
    };
  }, []);

  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'overlay';
    }
  }, [isVisible]);

  return (
    <div className='pb-[100px] max-md:w-[100vw]'>
      {/* 배송지 변경 */}
      <div className='sticky top-0 z-[100] w-full'>
        {isVisible && (
          <div className='absolute top-0 z-[100] flex h-[100dvb] w-full flex-col justify-end bg-black/50'>
            <ProductShippingAddress data={shippingAddress} setIsVisible={setIsVisible} />
          </div>
        )}
      </div>

      {/* header */}
      <div className='sticky top-0 z-50 flex h-[56px] items-center justify-between gap-3.5 bg-white px-4'>
        <BackButton />
        <p className='text-[16px] font-bold -tracking-[0.03em] text-grey-10'>주문하기</p>
        <div className='w-6' />
      </div>

      {/* 주문자 정보 */}
      <div className='flex flex-col gap-4 px-4 py-5'>
        <p className='text-[16px] font-bold leading-[24px] -tracking-[0.03em] text-grey-10'>
          주문자 정보
        </p>
        <div className='flex items-center'>
          <p className='w-[71px] text-[16px] font-medium leading-[24px] -tracking-[0.03em] text-grey-10'>
            이름
          </p>
          <input
            maxLength={10}
            className='h-[44px] flex-1 rounded-lg border border-grey-80 px-3 text-[14px] font-normal leading-[22px] -tracking-[0.03em] text-grey-10 placeholder:text-grey-60 focus:border-primary-50'
            placeholder='이름을 입력해주세요'
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>
        <div className='flex items-center'>
          <p className='w-[71px] text-[16px] font-medium leading-[24px] -tracking-[0.03em] text-grey-10'>
            연락처
          </p>
          <PatternFormat
            format='###-####-####'
            placeholder='휴대폰 번호를 입력해주세요'
            inputMode='numeric'
            spellCheck={false}
            value={phone}
            className='h-[44px] flex-1 rounded-lg border border-grey-80 px-3 text-[14px] font-normal leading-[22px] -tracking-[0.03em] text-grey-10 placeholder:text-grey-60 focus:border-primary-50'
            onChange={e => setPhone(e.target.value)}
          />
        </div>
      </div>
      <div className='h-2 bg-grey-90' />

      {/* 배송지 */}
      <div className='flex flex-col px-4 py-[22px]'>
        <div className='flex items-center justify-between'>
          <p className='text-[16px] font-bold leading-[24px] -tracking-[0.03em] text-grey-10'>
            배송지
          </p>
          <button
            className=''
            onClick={() => {
              setIsVisible(true);
              history.pushState(location.href, '', '');
            }}
          >
            <p className='text-[14px] font-semibold leading-[22px] -tracking-[0.03em] text-primary-50'>
              배송지 변경
            </p>
          </button>
        </div>
        {shippingAddress.length > 0 && (
          <Fragment>
            <div className='mt-[22px] flex items-center gap-2'>
              <p className='text-[16px] font-bold leading-[24px] -tracking-[0.03em] text-grey-10'>
                집
              </p>
              {shippingAddress[0].isDefault && (
                <div className='flex h-[22px] items-center justify-center rounded-full bg-primary-90 px-2'>
                  <p className='text-[13px] font-medium leading-[20px] -tracking-[0.03em] text-primary-60'>
                    기본배송지
                  </p>
                </div>
              )}
            </div>
            <p className='mt-1 text-[16px] font-medium leading-[24px] -tracking-[0.03em] text-grey-10'>
              {`${shippingAddress[0].name}, ${formatToPhone(shippingAddress[0].tel)}`}
            </p>
            <div className='my-2.5 h-[1px] bg-grey-90' />
            <p className='text-[16px] font-medium leading-[24px] -tracking-[0.03em] text-grey-10'>
              {/* 서울 강남구 강남대로 지하 396 (역삼동) 강남역, 지하 1층 강남역, 지하 1층 강남역, 지하 1층 */}
              {`${shippingAddress[0].address} ${shippingAddress[0].addressDetail}`}
            </p>
            <p className='mt-1 text-[14px] font-medium leading-[22px] -tracking-[0.03em] text-grey-70'>
              {/* 부재 시 연락주세요 */}
              {shippingAddress[0].deliverMessage}
            </p>
          </Fragment>
        )}
      </div>
      <div className='h-2 bg-grey-90' />

      {/* 주문 상품 */}
      <button
        className='flex h-[68px] w-full items-center gap-1.5 px-4'
        onClick={() => setIsOpenProduct(!isOpenProduct)}
      >
        <p className='text-[16px] font-bold leading-[24px] -tracking-[0.03em] text-grey-10'>
          주문 상품
        </p>
        <p className='line-clamp-1 flex-1 text-end text-[16px] font-medium leading-[24px] -tracking-[0.03em] text-grey-20'>
          {/* {`${data?.data?.title}`}{`${product.length > 1 ? ' 외 1개' :''}`} */}
          {`${selectedOption[0].productName}`}
        </p>
        <Image
          src='/assets/icons/common/chevron-mypage.svg'
          alt='chevron'
          width={24}
          height={24}
          className={cm(!isOpenProduct ? 'rotate-90' : 'rotate-[270deg]')}
        />
      </button>
      {isOpenProduct &&
        selectedOption.map((v, idx) => {
          return (
            <div key={`option${idx}`} className='px-4'>
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                  <Image
                    src={v.storeImage}
                    alt=''
                    width={28}
                    height={28}
                    className='h-7 w-7 rounded-full border border-grey-90 object-cover'
                  />
                  <p className='text-[16px] font-semibold leading-[24px] -tracking-[0.03em] text-grey-10'>
                    {v.storeName}
                  </p>
                </div>
                <div className='flex items-center gap-1'>
                  <p className='text-[13px] font-medium leading-[20px] -tracking-[0.03em] text-grey-50'>
                    배송비
                  </p>
                  <p className='text-[13px] font-bold leading-[20px] -tracking-[0.03em] text-grey-20'>{`${
                    v.deliveryFee === 0 ? '무료' : formatToLocaleString(v.deliveryFee) + '원'
                  }`}</p>
                </div>
              </div>
              <div className='mt-[13px] flex items-center gap-3'>
                <Image
                  alt=''
                  width={70}
                  height={70}
                  className='h-[70px] w-[70px] rounded object-cover'
                  src={v.productImage}
                />
                <div className='flex flex-col gap-1'>
                  <p className='text-[14px] font-medium leading-[22px] text-grey-10'>
                    {v.productName}
                  </p>
                  <p className='text-[14px] font-medium leading-[22px] text-grey-40'>
                    {v.name} : {v.amount}개
                  </p>
                </div>
              </div>
              <div className='mb-4 flex items-center justify-end'>
                <p className='text-[16px] font-bold leading-[24px] text-grey-10'>
                  {formatToLocaleString((v.price + v.additionalPrice) * v.amount)}원
                </p>
              </div>
              {idx !== selectedOption.length - 1 && <div className='mb-4 h-[1px] bg-grey-90' />}
            </div>
          );
        })}
      <div className='h-2 bg-grey-90' />

      {/* 쿠폰 */}
      <div className='px-4 py-[22px]'>
        <div className='flex items-center justify-between'>
          <p className='text-[16px] font-bold leading-[24px] -tracking-[0.03em] text-grey-10'>
            쿠폰
          </p>
          <div className='flex items-center'>
            <p className='text-[14px] font-medium leading-[22px] -tracking-[0.03em] text-grey-20'>
              사용 가능 쿠폰
            </p>
            <p className='whitespace-pre text-[14px] font-semibold leading-[22px] -tracking-[0.03em] text-primary-50'>{` ${0}`}</p>
            <p className='text-[14px] font-medium leading-[22px] -tracking-[0.03em] text-grey-20'>
              장
            </p>
          </div>
        </div>
        <div className='mt-4 flex items-center gap-2'>
          <div className='flex h-[44px] flex-1 items-center rounded-lg border border-grey-80 bg-grey-90 px-4'>
            <p className='text-[14px] font-medium leading-[22px] -tracking-[0.03em] text-grey-60'>
              사용 가능한 쿠폰이 없습니다
            </p>
          </div>
          <button
            className='flex h-[44px] w-[93px] items-center justify-center rounded-lg border border-grey-80'
            onClick={() => {
              //
            }}
          >
            <p className='text-[14px] font-semibold -tracking-[0.03em] text-grey-10'>쿠폰 선택</p>
          </button>
        </div>
      </div>
      <div className='h-2 bg-grey-90' />

      {/* 적립금 */}
      <div className='px-4 py-[22px]'>
        <div className='flex items-center justify-between'>
          <p className='text-[16px] font-bold leading-[24px] -tracking-[0.03em] text-grey-10'>
            적립금
          </p>
        </div>
        <div className='mt-4 flex items-center gap-2'>
          <input
            type='number'
            className='flex h-[44px] flex-1 items-center rounded-lg border border-grey-80 px-4 text-grey-10 placeholder:text-grey-60'
            placeholder='0원'
            value={point}
            onChange={e => {
              const text = e.target.value;
              if (text.length > 11) return;
              setPoint(text);
            }}
          />
          <button
            className='flex h-[44px] w-[93px] items-center justify-center rounded-lg border border-grey-80'
            onClick={() => {
              //
            }}
          >
            <p className='text-[14px] font-semibold -tracking-[0.03em] text-grey-10'>모두 사용</p>
          </button>
        </div>
        <div className='mt-2 flex items-center'>
          <p className='text-[14px] font-medium leading-[22px] -tracking-[0.03em] text-grey-20'>
            보유 적립금
          </p>
          <p className='whitespace-pre text-[14px] font-semibold leading-[22px] -tracking-[0.03em] text-primary-50'>{` ${formatToLocaleString(
            0,
          )}원`}</p>
        </div>
      </div>
      <div className='h-2 bg-grey-90' />

      {/* 결제수단 */}
      <button
        className='flex h-[68px] w-full items-center gap-1.5 px-4'
        onClick={() => {
          //
        }}
      >
        <p className='text-[16px] font-bold leading-[24px] -tracking-[0.03em] text-grey-10'>
          결제수단
        </p>
        <p className='flex-1 text-end text-[16px] font-semibold leading-[24px] -tracking-[0.03em] text-grey-10'>
          신용카드
        </p>
        {/* <Image
          src='/assets/icons/common/chevron-mypage.svg'
          alt='chevron'
          width={24}
          height={24}
          className='rotate-90'
        /> */}
      </button>
      <div className='h-2 bg-grey-90' />

      {/* 결제 금액 */}
      <div className='px-4 py-[22px]'>
        <p className='text-[16px] font-bold leading-[24px] -tracking-[0.03em] text-grey-10'>
          결제 금액
        </p>
        <div className='mt-4 flex flex-col gap-2.5'>
          <div className='flex items-center justify-between'>
            <p className='text-[16px] font-medium leading-[24px] -tracking-[0.03em] text-grey-50'>
              주문금액
            </p>
            <p className='text-[16px] font-medium leading-[24px] -tracking-[0.03em] text-grey-20'>{`${formatToLocaleString(
              totalPrice,
            )}원`}</p>
          </div>
          <div className='flex items-center justify-between'>
            <p className='text-[16px] font-medium leading-[24px] -tracking-[0.03em] text-grey-50'>
              배송비
            </p>
            <p className='text-[16px] font-medium leading-[24px] -tracking-[0.03em] text-grey-20'>{`+${formatToLocaleString(
              totalDelivery,
            )}원`}</p>
          </div>
          <div className='flex items-center justify-between'>
            <p className='text-[16px] font-medium leading-[24px] -tracking-[0.03em] text-grey-50'>
              쿠폰할인
            </p>
            <p className='text-[16px] font-medium leading-[24px] -tracking-[0.03em] text-grey-20'>{`${formatToLocaleString(
              0,
            )}원`}</p>
          </div>
          <div className='flex items-center justify-between'>
            <p className='text-[16px] font-medium leading-[24px] -tracking-[0.03em] text-grey-50'>
              적립금사용
            </p>
            <p className='text-[16px] font-medium leading-[24px] -tracking-[0.03em] text-grey-20'>{`-${formatToLocaleString(
              0,
            )}원`}</p>
          </div>
        </div>
        <div className='mb-[22px] mt-4 h-[1px] bg-grey-90' />
        <div className='flex items-start justify-between'>
          <p className='text-[16px] font-bold leading-[24px] -tracking-[0.03em] text-grey-10'>
            최종 결제 금액
          </p>
          <p className='text-[20px] font-bold leading-[30px] -tracking-[0.03em] text-grey-10'>{`${formatToLocaleString(
            totalPrice + totalDelivery,
          )}원`}</p>
        </div>
      </div>
      <div className='h-2 bg-grey-90' />

      {/* 적립금 혜택 */}
      <div className='px-4 py-[22px]'>
        <p className='text-[16px] font-bold leading-[24px] -tracking-[0.03em] text-grey-10'>
          적립금 혜택
        </p>
        <div className='mt-4 flex items-start justify-between'>
          <p className='text-[16px] font-medium leading-[24px] -tracking-[0.03em] text-grey-50'>
            구매적립
          </p>
          <div className='flex flex-col items-end'>
            <p className='text-[16px] font-medium leading-[24px] -tracking-[0.03em] text-grey-20'>{`${formatToLocaleString(
              Math.floor(((totalPrice + totalDelivery) / 100) * 1),
            )}원`}</p>
            <p className='text-[14px] font-normal leading-[22px] -tracking-[0.03em] text-grey-60'>
              (멸치 등급 : 구매 적립 1%)
            </p>
          </div>
        </div>
        <div className='mt-4 flex items-center justify-between'>
          <p className='text-[16px] font-medium leading-[24px] -tracking-[0.03em] text-grey-50'>
            후기작성
          </p>
          <p className='text-[16px] font-medium leading-[24px] -tracking-[0.03em] text-grey-20'>{`최대 ${formatToLocaleString(
            650,
          )}원`}</p>
        </div>
        <div className='mb-[22px] mt-4 h-[1px] bg-grey-90' />
        <div className='flex items-start justify-between'>
          <p className='text-[16px] font-bold leading-[24px] -tracking-[0.03em] text-black'>
            예상 적립 금액
          </p>
          <p className='text-[20px] font-bold leading-[30px] -tracking-[0.03em] text-primary-50'>{`${formatToLocaleString(
            Math.floor(((totalPrice + totalDelivery) / 100) * 1) + 650,
          )}원`}</p>
        </div>
      </div>
      <div className='h-2 bg-grey-90' />

      {/* 개인정보 수집 이용 동의 -> (사업자 정보 임시) */}
      <div className='px-4 py-[22px]'>
        <p className='text-[13px] font-bold leading-[16px] -tracking-[0.05em] text-[#797979]'>
          (주) 맛신저 사업자정보
        </p>
        <div className='mt-[18px] flex flex-col gap-2'>
          <p className='leaidng-[16px] text-[12px] font-medium -tracking-[0.03em] text-grey-60'>
            COMPANY : 주식회사 맛신저 (matsinger inc.)
          </p>
          <p className='leaidng-[16px] text-[12px] font-medium -tracking-[0.03em] text-grey-60'>
            CEO : 신용진
          </p>
          <p className='leaidng-[16px] text-[12px] font-medium -tracking-[0.03em] text-grey-60'>
            ADDRESS : 서울특별시 서대문구 신촌로 25 2층, 2328호
          </p>
          <p className='leaidng-[16px] text-[12px] font-medium -tracking-[0.03em] text-grey-60'>
            TEL : 1668-4591
          </p>
          <p className='leaidng-[16px] text-[12px] font-medium -tracking-[0.03em] text-grey-60'>
            FAX : 0504-366-3633
          </p>
          <p className='leaidng-[16px] text-[12px] font-medium -tracking-[0.03em] text-grey-60'>
            BUSINESS LICENCE : 380-88-02372
          </p>
          <p className='leaidng-[16px] text-[12px] font-medium -tracking-[0.03em] text-grey-60'>
            ONLINE LICENCE : 2022-서울서대문-1579
          </p>
          <p className='leaidng-[16px] text-[12px] font-medium -tracking-[0.03em] text-grey-60'>
            PRIVACY OFFICER : 노승우 (help@barofish.com)
          </p>
        </div>
      </div>
      <div className='py-[22px]'>
        <button
          className='flex w-full items-center gap-2 px-4'
          onClick={() => setIsCheck(!isCheck)}
        >
          <Image
            alt='check'
            width={24}
            height={24}
            src={
              isCheck
                ? '/assets/icons/common/check-box-on.svg'
                : '/assets/icons/common/check-box-off.svg'
            }
          />
          <p className='flex-1 text-start text-[16px] font-medium leading-[24px] -tracking-[0.03em] text-grey-10'>
            개인정보 수집 이용 동의 (필수)
          </p>
          <button
            className=''
            onClick={e => {
              e.stopPropagation();
            }}
          >
            <Image
              src='/assets/icons/common/chevron-mypage.svg'
              alt='chevron'
              width={24}
              height={24}
              className='rotate-90'
            />
          </button>
        </button>
      </div>

      <div className='fixed bottom-0 z-50 w-[375px] bg-white px-4 pb-7 pt-2 max-md:w-full'>
        <button
          className={cm(
            'flex h-[52px] w-full items-center justify-center rounded-lg bg-[#D4D5D8]',
            { 'bg-primary-50': isCheck },
          )}
          onClick={async () => {
            if (isCheck) {
              console.log(
                selectedOption.map(x => {
                  return {
                    productId: x.productId,
                    optionId: x.optionId === -1 ? undefined : x.optionId,
                    amount: x.amount,
                  };
                }),
              );
              orderProduct({
                products: selectedOption.map(x => {
                  return {
                    productId: x.productId,
                    optionId: x.optionId === -1 ? undefined : x.optionId,
                    amount: x.amount,
                  };
                }),
                name,
                tel: phone,
                // point,
                deliverPlaceId: shippingAddress[0].id,
                totalPrice: totalPrice + totalDelivery,
              })
                .then(res => {
                  console.log(res.data);
                  if (res.data.isSuccess) {
                    const orderId = res.data.data?.id ?? '';
                    onIamport({
                      data: {
                        pg: `${IamportPg.TosspayPayment}.${'iamporttest_3'}`,
                        payMethod: IamportPayMethod.Card,
                        merchantUid: orderId,
                        mobileRedirectUrl: getMobileResultUrl(orderId),
                        productName: selectedOption[0]?.productName ?? '',
                        amount: totalPrice + totalDelivery,
                        email: '',
                        address: '',
                        postcode: '',
                        tel: phone,
                        name,
                      },
                      onSuccess: () => onIamportResult(orderId, true),
                      onFailure: () => onIamportResult(orderId, false),
                    });
                  } else {
                    console.log(res.data);
                    setAlert({ message: '2:' + res.data.errorMsg ?? '' });
                    return false;
                  }
                })
                .catch(err => {
                  setAlert({ message: '1:' + err });
                });
            }
          }}
        >
          <p className='text-[16px] font-bold -tracking-[0.03em] text-white'>
            {`${formatToLocaleString(totalPrice + totalDelivery)}원 결제하기`}
          </p>
        </button>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  };
};

Order.getLayout = page => (
  <Layout headerProps={{ disable: true }} footerProps={{ disable: true }}>
    {page}
  </Layout>
);

export default Order;
