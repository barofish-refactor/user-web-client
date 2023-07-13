import { useMutation, useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Fragment, useEffect, useMemo, useState } from 'react';
import { NumericFormat, PatternFormat } from 'react-number-format';
import { client } from 'src/api/client';
import {
  type Coupon,
  type DeliverPlace,
  type OrderReq,
  type PaymentMethodDto,
} from 'src/api/swagger/data-contracts';
import Layout from 'src/components/common/layout';
import { ProductCoupon, ProductShippingAddress } from 'src/components/product';
import { type optionState } from 'src/components/product/bottom-sheet';
import { BackButton } from 'src/components/ui';
import { queryKey } from 'src/query-key';
import { useAlertStore } from 'src/store';
import { type NextPageWithLayout } from 'src/types/common';
import cm from 'src/utils/class-merge';
import {
  changeSectionOption,
  formatToLocaleString,
  formatToPhone,
  setSquareBrackets,
} from 'src/utils/functions';
import { bToA, parseIamportPayMethod, parsePaymentWay } from 'src/utils/parse';
import { REG_EXP } from 'src/utils/regex';
import { IamportPayMethod, impSuccessKey, useIamport, type vBankType } from 'src/utils/use-iamport';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';

const getSectionDeliverFee = (data: optionState[]) =>
  data
    .map(v => Math.ceil(v.amount / v.maxAvailableStock) * (data[0].deliveryFee ?? 0))
    .reduce((a, b) => a + b, 0);

/** 주문하기 */
const Order: NextPageWithLayout = () => {
  const router = useRouter();
  const { options } = router.query;
  const { setAlert } = useAlertStore();

  const [isAddressVisible, setIsAddressVisible] = useState<boolean>(false);
  const [isCouponVisible, setIsCouponVisible] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [shippingAddress, setShippingAddress] = useState<DeliverPlace>();
  const [point, setPoint] = useState<string>('');
  const [isOpenProduct, setIsOpenProduct] = useState<boolean>(false);
  const [isCheck, setIsCheck] = useState<boolean>(false);
  const [selectCoupon, setSelectCoupon] = useState<Coupon>();
  const [isOpenPayList, setIsOpenPayList] = useState<boolean>(true);
  const [payMethod, setPayMethod] = useState<IamportPayMethod | undefined>(
    IamportPayMethod.Kakaopay,
  );
  const [selectedCard, setSelectedCard] = useState<PaymentMethodDto>();
  const { onIamport } = useIamport();
  const { mutateAsync: orderProduct } = useMutation(
    async (args: OrderReq) => await (await client()).orderProduct(args),
  );

  const selectedOption: optionState[] = router.isReady ? JSON.parse(bToA(options as string)) : [];
  const sectionOption = changeSectionOption(selectedOption);
  const totalPrice =
    selectedOption.length > 0
      ? selectedOption
          .map(x => (x.price + x.additionalPrice) * x.amount)
          .reduce((a: number, b: number) => a + b)
      : 0;

  const totalDelivery = changeSectionOption(selectedOption)
    .map(x => {
      const sectionTotal = x.data
        .map(v => (v.price + (v.additionalPrice ?? 0)) * (v.amount ?? 0))
        .reduce((a, b) => a + b, 0);
      const sectionDeliverFee = getSectionDeliverFee(x.data);
      return x.data[0].deliverFeeType === 'FREE'
        ? 0
        : x.data[0].deliverFeeType === 'FIX'
        ? sectionDeliverFee
        : sectionTotal >= (x.data[0].minOrderPrice ?? 0)
        ? 0
        : sectionDeliverFee;
    })
    .reduce((a, b) => a + b, 0);

  const { data: user } = useQuery(queryKey.user, async () => {
    const res = await (await client()).selectUserSelfInfo();
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
  });

  const { data: paymentMethodData } = useQuery(queryKey.paymentMethod, async () => {
    const res = await (await client()).selectPaymentMethodList();
    if (res.data.isSuccess) {
      return res.data.data;
    } else {
      setAlert({ message: res.data.errorMsg ?? '' });
      throw new Error(res.data.errorMsg);
    }
  });

  const { data: pointData } = useQuery(queryKey.pointRule, async () => {
    const res = await (await client()).selectPointRule();
    if (res.data.isSuccess) {
      return res.data.data;
    } else {
      setAlert({ message: res.data.errorMsg ?? '' });
      throw new Error(res.data.errorMsg);
    }
  });

  // 보유 쿠폰
  const { data: couponData } = useQuery(
    queryKey.downloadedCoupon.lists,
    async () => {
      const res = await (await client()).selectDownloadedCoupon();
      if (res.data.isSuccess) {
        return res.data.data;
      } else {
        throw new Error('[selectDownloadedCoupon]' + res.data.code + ': ' + res.data.errorMsg);
      }
    },
    { staleTime: 0 },
  );

  /** 쿠폰 할인금액 */
  const couponDiscountPoint = !selectCoupon
    ? 0
    : selectCoupon.type === 'RATE'
    ? totalPrice * ((selectCoupon.amount ?? 1) / 100)
    : selectCoupon.amount ?? 0;

  /** 최종결제금액 (적립금 제외) */
  const finalPrice = totalPrice + totalDelivery - couponDiscountPoint;

  /** 구매 적립금 */
  const buyPoint =
    Math.round(
      Math.floor(((finalPrice - Number(point)) / 100) * (user?.grade?.pointRate ?? 1)) / 10,
    ) * 10;
  /** 후기 작성 적립금 */
  const writeReviewPoint = pointData?.maxReviewPoint;
  /** 예상 적립 금액 */
  const expectPoint = useMemo(
    () => buyPoint + (pointData?.maxReviewPoint ?? 0),
    [buyPoint, pointData?.maxReviewPoint],
  );

  const onIamportResult = (
    orderId: string,
    isSuccess: boolean,
    error_msg?: string,
    vBankData?: vBankType,
  ) => {
    if (vBankData) {
      setAlert({ message: '가상계좌 정보가 문자로 전송되었습니다.', type: 'success' });
      router.push('/mypage');
      return;
    }
    router.push({
      pathname: '/product/payment',
      query: {
        ...router.query,
        [impSuccessKey]: isSuccess,
        orderId,
        error_msg: !isSuccess && error_msg,
        vb: vBankData ? 'true' : undefined,
      },
    });
  };

  const getMobileResultUrl = (orderId: string) => {
    const url = new URL(`${location.origin}${'/product/payment'}`);
    url.searchParams.set('id', router.query.id as string);
    url.searchParams.set('orderId', orderId);
    url.searchParams.set('options', options as string);

    return url.href;
  };

  async function onPayment() {
    if (Number(point) !== 0 && Number(point) < 100) {
      return setAlert({ message: '적립금은 100원 이상 사용할 수 있습니다.' });
    }
    if (isCheck) {
      if (!shippingAddress) return setAlert({ message: '배송지를 입력해주세요' });

      orderProduct({
        products: selectedOption.map(x => {
          return {
            productId: x.productId,
            optionId: x.optionId === -1 ? undefined : x.optionId,
            amount: x.amount,
          };
        }),
        name,
        tel: phone.replace(/-/g, ''),
        couponId: selectCoupon?.id ?? undefined,
        point: Number(point),
        deliverPlaceId: shippingAddress.id,
        totalPrice: finalPrice - Number(point),
        couponDiscountPrice: couponDiscountPoint,
        paymentMethodId: selectedCard?.id,
        paymentWay: parsePaymentWay(payMethod),
      })
        .then(res => {
          if (res.data.isSuccess) {
            if (selectedCard) {
              router.push({
                pathname: '/product/payment',
                query: {
                  ...router.query,
                  [impSuccessKey]: true,
                  orderId: res.data.data?.id,
                },
              });
              return;
            }
            const orderId = res.data.data?.id ?? '';
            onIamport({
              data: {
                payMethod,
                merchantUid: orderId,
                mobileRedirectUrl: getMobileResultUrl(orderId),
                productName: selectedOption[0]?.productName ?? '',
                amount: finalPrice - Number(point),
                email: '',
                address: '',
                postcode: '',
                tel: phone,
                name,
              },
              onSuccess: (vBankData?: vBankType) => onIamportResult(orderId, true, '', vBankData),
              onFailure: (error_msg: string) => onIamportResult(orderId, false, error_msg),
            });
          } else {
            setAlert({ message: res.data.errorMsg ?? '' });
          }
        })
        .catch(err => {
          setAlert({ message: '1:' + err });
        });
    }
  }

  /** 적립금 모두 사용 버튼 클릭 */
  const setAllPoint = () => {
    if (finalPrice < (user?.point ?? 0)) setPoint(String(finalPrice));
    else setPoint(String(user?.point ?? 0));
  };

  useEffect(() => {
    if (!user) return;
    setName(user?.name ?? '');
    setPhone(user?.phone ?? '');

    const deliver = (user?.deliverPlaces ?? []).filter(x => x.isDefault === true);
    setShippingAddress(deliver && deliver.length > 0 ? deliver[0] : undefined);
  }, [user]);

  useEffect(() => {
    if (
      phone.replaceAll('-', '').trim().length === 11 &&
      name.trim().length > 0 &&
      (payMethod || selectedCard)
    ) {
      setIsCheck(true);
    } else {
      setIsCheck(false);
    }
  }, [phone, name, payMethod, selectedCard]);

  useEffect(() => {
    const close = () => {
      setIsAddressVisible(false);
      setIsCouponVisible(false);
    };
    window.addEventListener('popstate', close, { passive: false });

    return () => {
      window.removeEventListener('popstate', close);
    };
  }, []);

  useEffect(() => {
    if (isAddressVisible || isCouponVisible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'overlay';
    }
  }, [isAddressVisible, isCouponVisible]);

  return (
    <div className='pb-[100px] max-md:w-[100vw]'>
      {/* 배송지 변경 */}
      <div className='sticky top-0 z-[100] w-full'>
        {isAddressVisible && (
          <div className='absolute top-0 z-[100] flex h-[100dvb] w-full flex-col justify-end bg-black/50'>
            <ProductShippingAddress
              setIsVisible={setIsAddressVisible}
              onClick={setShippingAddress}
            />
          </div>
        )}
      </div>
      {/* 쿠폰 선택 */}
      <div className='sticky top-0 z-[100] w-full'>
        {isCouponVisible && (
          <ProductCoupon
            setIsVisible={setIsCouponVisible}
            setCoupon={setSelectCoupon}
            data={couponData}
            totalPrice={totalPrice + totalDelivery}
          />
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
            onChange={e => {
              setName(e.target.value.replaceAll(REG_EXP.emoji, ''));
            }}
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
              setIsAddressVisible(true);
              history.pushState(location.href, '', '');
            }}
          >
            <p className='text-[14px] font-semibold leading-[22px] -tracking-[0.03em] text-primary-50'>
              배송지 변경
            </p>
          </button>
        </div>
        {shippingAddress && (
          <Fragment>
            <div className='mt-[22px] flex items-center gap-2'>
              <p className='text-[16px] font-bold leading-[24px] -tracking-[0.03em] text-grey-10'>
                {shippingAddress.name ?? ''}
              </p>
              {shippingAddress.isDefault === true && (
                <div className='flex h-[22px] items-center justify-center rounded-full bg-primary-90 px-2'>
                  <p className='text-[13px] font-medium leading-[20px] -tracking-[0.03em] text-primary-60'>
                    기본배송지
                  </p>
                </div>
              )}
            </div>
            <p className='mt-1 text-[16px] font-medium leading-[24px] -tracking-[0.03em] text-grey-10'>
              {`${shippingAddress.receiverName}, ${formatToPhone(shippingAddress.tel)}`}
            </p>
            <div className='my-2.5 h-[1px] bg-grey-90' />
            <p className='text-[16px] font-medium leading-[24px] -tracking-[0.03em] text-grey-10'>
              {`(${shippingAddress.postalCode}) ${shippingAddress.address} ${shippingAddress.addressDetail}`}
            </p>
            <p className='mt-1 text-[14px] font-medium leading-[22px] -tracking-[0.03em] text-grey-70'>
              {/* 부재 시 연락주세요 */}
              {shippingAddress.deliverMessage}
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
          {`${selectedOption[0]?.productName}`}
          {`${selectedOption.length > 1 ? ` 외 ${selectedOption.length - 1}개` : ''}`}
        </p>
        <Image
          unoptimized
          src='/assets/icons/common/chevron-mypage.svg'
          alt='chevron'
          width={24}
          height={24}
          className={cm(!isOpenProduct ? 'rotate-90' : 'rotate-[270deg]')}
        />
      </button>
      {isOpenProduct &&
        sectionOption.map(x => {
          const sectionDeliverFee = getSectionDeliverFee(x.data);
          return (
            <Fragment key={`${x.storeId}`}>
              <div className='flex items-center justify-between px-4'>
                <div className='flex items-center gap-2'>
                  <Image
                    unoptimized
                    src={x.storeImage}
                    alt=''
                    width={28}
                    height={28}
                    className='h-7 w-7 rounded-full border border-grey-90 object-cover'
                  />
                  <p className='text-[16px] font-semibold leading-[24px] -tracking-[0.03em] text-grey-10'>
                    {x.storeName}
                  </p>
                </div>
                <div className='flex items-center gap-1'>
                  <p className='text-[13px] font-medium leading-[20px] -tracking-[0.03em] text-grey-50'>
                    배송비
                  </p>
                  <p className='text-[13px] font-bold leading-[20px] -tracking-[0.03em] text-grey-20'>
                    {x.data[0].deliverFeeType === 'FREE'
                      ? '무료'
                      : x.data[0].deliverFeeType === 'FIX'
                      ? formatToLocaleString(sectionDeliverFee)
                      : sectionDeliverFee >= (x.data[0].minOrderPrice ?? 0)
                      ? '무료'
                      : sectionDeliverFee}
                  </p>
                </div>
              </div>
              <div>
                {x.data.map((v, idx) => {
                  return (
                    <div key={`option${idx}`} className='px-4'>
                      <div className='mt-[13px] flex items-center gap-3'>
                        <Image
                          unoptimized
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
                            {v.name === '' ? '기본' : v.name} : {v.amount}개
                          </p>
                        </div>
                      </div>
                      <div className='mb-4 flex items-center justify-end'>
                        <p className='text-[16px] font-bold leading-[24px] text-grey-10'>
                          {formatToLocaleString((v.price + v.additionalPrice) * v.amount)}원
                        </p>
                      </div>
                      {idx !== selectedOption.length - 1 && (
                        <div className='mb-4 h-[1px] bg-grey-90' />
                      )}
                    </div>
                  );
                })}
              </div>
            </Fragment>
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
            <p className='whitespace-pre text-[14px] font-semibold leading-[22px] -tracking-[0.03em] text-primary-50'>{` ${
              couponData?.length ?? 0
            }`}</p>
            <p className='text-[14px] font-medium leading-[22px] -tracking-[0.03em] text-grey-20'>
              장
            </p>
          </div>
        </div>
        <div className='mt-4 flex items-center gap-2'>
          <div className='flex h-[44px] flex-1 items-center rounded-lg border border-grey-80 bg-grey-90 px-4'>
            <p className='text-[14px] font-medium leading-[22px] -tracking-[0.03em] text-grey-60'>
              {selectCoupon?.title ||
                ((couponData ?? []).length > 0
                  ? '쿠폰을 선택해주세요'
                  : '사용 가능한 쿠폰이 없습니다')}
            </p>
          </div>
          <button
            className='flex h-[44px] w-[93px] items-center justify-center rounded-lg border border-grey-80'
            type='button'
            disabled={!couponData?.length}
            onClick={() => {
              setIsCouponVisible(true);
              history.pushState(location.href, '', '');
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
          <NumericFormat
            className='flex h-[44px] w-[calc(100%-101px)] items-center rounded-lg border border-grey-80 px-4 text-grey-10 placeholder:text-grey-60'
            spellCheck={false}
            placeholder='0원'
            thousandSeparator=','
            inputMode='numeric'
            value={point}
            disabled={!user?.point}
            isAllowed={e => (e.floatValue ?? 0) <= (finalPrice || (user?.point ?? 0))}
            onValueChange={e => setPoint(String(Math.min(e.floatValue ?? 0, user?.point ?? 0)))}
          />
          <button
            type='button'
            className='flex h-[44px] w-[93px] items-center justify-center rounded-lg border border-grey-40'
            disabled={!user?.point}
            onClick={setAllPoint}
          >
            <p className='text-[14px] font-semibold -tracking-[0.03em] text-grey-10'>모두 사용</p>
          </button>
        </div>
        <div className='mt-2 flex items-center'>
          <p className='text-[14px] font-medium leading-[22px] -tracking-[0.03em] text-grey-20'>
            보유 적립금
          </p>
          <p className='whitespace-pre text-[14px] font-semibold leading-[22px] -tracking-[0.03em] text-primary-50'>{` ${formatToLocaleString(
            user?.point,
          )}원`}</p>
        </div>
      </div>
      <div className='h-2 bg-grey-90' />

      {/* 결제수단 */}
      <button
        className='flex h-[68px] w-full items-center gap-1.5 px-4'
        onClick={() => setIsOpenPayList(!isOpenPayList)}
      >
        <p className='text-[16px] font-bold leading-[24px] -tracking-[0.03em] text-grey-10'>
          결제수단
        </p>
        <p className='flex-1 text-end text-[16px] font-semibold leading-[24px] -tracking-[0.03em] text-grey-10'>
          {payMethod ? parseIamportPayMethod(payMethod) : '등록된 카드'}
        </p>
        <Image
          unoptimized
          src='/assets/icons/common/chevron-mypage.svg'
          alt='chevron'
          width={24}
          height={24}
          className={isOpenPayList ? 'rotate-[270deg]' : 'rotate-90'}
        />
      </button>
      {isOpenPayList && (
        <div className='grid grid-cols-2 gap-2 px-4 pb-[22px]'>
          {(
            [
              { image: '/assets/icons/product/payment-kakao.png', type: IamportPayMethod.Kakaopay },
              {
                image: '/assets/icons/product/payment-naver.png',
                activeImage: '/assets/icons/product/payment-naver-active.png',
                type: IamportPayMethod.Naverpay,
              },
              {}, // 등록된 카드
              { type: IamportPayMethod.Card },
              { type: IamportPayMethod.Phone },
              { type: IamportPayMethod.Vbank },
              { type: IamportPayMethod.Trans },
            ] as { image?: string; activeImage?: string; type?: IamportPayMethod }[]
          ).map((v, i) => {
            const isActive = payMethod === v.type;
            return (
              <Fragment key={`payment${i}`}>
                <button
                  className={cm(
                    'flex h-[48px] w-full items-center justify-center gap-3 rounded-lg border border-[#E2E2E2]',
                    {
                      'col-span-2': i < 3,
                      'bg-[#FEE33A]': i === 0 && isActive,
                      'bg-[#03C75A]': i === 1 && isActive,
                      'bg-primary-50': (i > 2 || selectedCard !== undefined) && isActive,
                      'rounded-b-none': i === 2 && isActive,
                      'border-0': isActive && selectedCard !== undefined,
                    },
                  )}
                  onClick={() => {
                    if (v.type === IamportPayMethod.Naverpay)
                      return setAlert({ message: '준비중입니다.' });
                    setPayMethod(v.type);
                    setSelectedCard(undefined);
                  }}
                >
                  {v.image && (
                    <Image
                      unoptimized
                      src={isActive ? v.activeImage ?? v.image : v.image}
                      alt='icon'
                      width={20}
                      height={20}
                    />
                  )}
                  <p
                    className={cm(
                      'text-[14px] font-medium -tracking-[0.03em]',
                      (isActive && ![0, 2].includes(i)) ||
                        (i === 2 && isActive && selectedCard !== undefined)
                        ? 'text-grey-90'
                        : 'text-grey-10',
                    )}
                  >
                    {v.type ? parseIamportPayMethod(v.type) : '등록된 카드'}
                  </p>
                </button>
                {i === 2 && isActive && (
                  <div className='col-span-2 -mt-2 rounded-b-lg border-[#E2E2E2] bg-grey-90'>
                    <Swiper
                      loop={false}
                      slidesPerView={1.1}
                      spaceBetween={16}
                      style={{
                        paddingLeft: '32px',
                        paddingRight: '32px',
                      }}
                    >
                      {(paymentMethodData ?? []).length > 0 ? (
                        (paymentMethodData ?? []).map((x, idx) => {
                          return (
                            <SwiperSlide key={`${idx}`} className='py-6'>
                              <button
                                draggable={false}
                                className='flex h-[84px] w-full items-center justify-between rounded-lg bg-white px-4 text-start shadow-[0px_2px_4px_0px_rgba(0,0,0,0.15)]'
                                onClick={() => {
                                  setSelectedCard(x);
                                }}
                              >
                                <div className='flex flex-col gap-1'>
                                  <p className='line-clamp-1 shrink-0 break-all text-[16px] font-medium leading-[24px] -tracking-[0.03em] text-grey-20'>
                                    {`${setSquareBrackets(x.cardName)} ${x.name}`}
                                  </p>
                                  <p className='line-clamp-1 shrink-0 break-all text-[16px] font-medium leading-[24px] -tracking-[0.03em] text-grey-50'>
                                    {x.cardNo}
                                  </p>
                                </div>
                                <div
                                  className={cm(
                                    'h-5 w-5 shrink-0 rounded-full border border-[#E2E2E2]',
                                    {
                                      'border-[6px] border-primary-50': selectedCard?.id === x.id,
                                    },
                                  )}
                                />
                              </button>
                            </SwiperSlide>
                          );
                        })
                      ) : (
                        <div className='grid h-[132px] flex-1 place-items-center'>
                          <div className='flex flex-col items-center gap-2'>
                            <Image
                              unoptimized
                              src='/assets/icons/search/search-error.svg'
                              alt='up'
                              width={40}
                              height={40}
                            />
                            <p className='whitespace-pre text-center text-[14px] font-medium leading-[20px] -tracking-[0.05em] text-[#B5B5B5]'>
                              등록된 카드가 없습니다.
                            </p>
                          </div>
                        </div>
                      )}
                    </Swiper>
                  </div>
                )}
              </Fragment>
            );
          })}
        </div>
      )}
      {/* {isOpenPayList && (
        <div className='px-4 pb-[22px]'>
          <div className='h-[1px] bg-grey-90' />
          <div className='flex flex-col items-start gap-2 pt-2'>
            {
              // 신용카드, 카카오페이, 네이버페이, 휴대폰결제, 가상계좌, 실시간계좌이체
              (
                [
                  IamportPayMethod.Card,
                  IamportPayMethod.Kakaopay,
                  IamportPayMethod.Naverpay,
                  IamportPayMethod.Phone,
                  IamportPayMethod.Vbank,
                  IamportPayMethod.Trans,
                ] as IamportPayMethod[]
              ).map((v, i) => {
                return (
                  <button
                    key={`payment${i}`}
                    className='flex h-[38px] w-full items-center gap-4'
                    onClick={() => {
                      setPayMethod(v);
                      setIsOpenPayList(false);
                    }}
                  >
                    <div
                      className={cm('h-5 w-5 rounded-full border border-[#E2E2E2]', {
                        'border-[6px] border-primary-50': payMethod === v,
                      })}
                    />
                    <p className='text-[14px] font-semibold leading-[22px] -tracking-[0.03em] text-black'>
                      {parseIamportPayMethod(v)}
                    </p>
                  </button>
                );
              })
            }
          </div>
        </div>
      )} */}

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
            <p className='text-[16px] font-medium leading-[24px] -tracking-[0.03em] text-grey-20'>{`${
              totalDelivery === 0 ? '' : '+'
            }${formatToLocaleString(totalDelivery)}원`}</p>
          </div>
          <div className='flex items-center justify-between'>
            <p className='text-[16px] font-medium leading-[24px] -tracking-[0.03em] text-grey-50'>
              쿠폰할인
            </p>
            <p className='text-[16px] font-medium leading-[24px] -tracking-[0.03em] text-grey-20'>{`${
              couponDiscountPoint === 0 ? '' : '-'
            }${formatToLocaleString(couponDiscountPoint)}원`}</p>
          </div>
          <div className='flex items-center justify-between'>
            <p className='text-[16px] font-medium leading-[24px] -tracking-[0.03em] text-grey-50'>
              적립금사용
            </p>
            <p className='text-[16px] font-medium leading-[24px] -tracking-[0.03em] text-grey-20'>{`${
              Number(point) === 0 ? '' : '-'
            }${formatToLocaleString(point)}원`}</p>
          </div>
        </div>
        <div className='mb-[22px] mt-4 h-[1px] bg-grey-90' />
        <div className='flex items-start justify-between'>
          <p className='text-[16px] font-bold leading-[24px] -tracking-[0.03em] text-grey-10'>
            최종 결제 금액
          </p>
          <p className='text-[20px] font-bold leading-[30px] -tracking-[0.03em] text-grey-10'>{`${formatToLocaleString(
            finalPrice - Number(point),
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
              buyPoint,
            )}원`}</p>
            <p className='text-[14px] font-normal leading-[22px] -tracking-[0.03em] text-grey-60'>
              {`(${user?.grade?.name ?? '멸치'} 등급 : 구매 적립 ${user?.grade?.pointRate ?? 1}%)`}
            </p>
          </div>
        </div>
        <div className='mt-4 flex items-center justify-between'>
          <p className='text-[16px] font-medium leading-[24px] -tracking-[0.03em] text-grey-50'>
            후기작성
          </p>
          <p className='text-[16px] font-medium leading-[24px] -tracking-[0.03em] text-grey-20'>{`최대 ${formatToLocaleString(
            writeReviewPoint,
          )}원`}</p>
        </div>
        <div className='mb-[22px] mt-4 h-[1px] bg-grey-90' />
        <div className='flex items-start justify-between'>
          <p className='text-[16px] font-bold leading-[24px] -tracking-[0.03em] text-black'>
            예상 적립 금액
          </p>
          <p className='text-[20px] font-bold leading-[30px] -tracking-[0.03em] text-primary-50'>{`${formatToLocaleString(
            expectPoint,
          )}원`}</p>
        </div>
      </div>
      <div className='h-2 bg-grey-90' />
      <BusinessInformation />

      <div className='fixed bottom-0 z-50 w-[375px] bg-white px-4 pb-7 pt-2 max-md:w-full'>
        <button
          className={cm(
            'flex h-[52px] w-full items-center justify-center rounded-lg bg-[#D4D5D8]',
            { 'bg-primary-50': isCheck },
          )}
          onClick={onPayment}
        >
          <p className='text-[16px] font-bold -tracking-[0.03em] text-white'>
            {`${formatToLocaleString(finalPrice - Number(point))}원 결제하기`}
          </p>
        </button>
      </div>
    </div>
  );
};

function BusinessInformation() {
  const { data: info } = useQuery(queryKey.footer, async () => {
    const res = await (await client()).selectSiteInfo('TC_FOOTER');
    if (res.data.isSuccess) {
      return res.data.data;
    } else {
      throw new Error(res.data.code + ': ' + res.data.errorMsg);
    }
  });

  return (
    <div className='px-4 py-[22px]'>
      <p className='text-[13px] font-bold leading-[16px] -tracking-[0.05em] text-[#797979]'>
        (주) 맛신저 사업자정보
      </p>
      <div className='leaidng-[16px] mt-[18px] flex flex-col gap-2 text-[12px] font-medium -tracking-[0.03em] text-grey-60'>
        {info?.tcContent?.map((v, i) => {
          return <p key={i}>{`${v.title} : ${v.content}`}</p>;
        })}
      </div>
    </div>
  );
}

Order.getLayout = page => (
  <Layout headerProps={{ disable: true }} footerProps={{ disable: true }}>
    {page}
  </Layout>
);

export default Order;
