import { useMutation, useQuery } from '@tanstack/react-query';
import { DefaultSeo } from 'next-seo';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Fragment, Key, useEffect, useMemo, useState } from 'react';
import { NumericFormat, PatternFormat } from 'react-number-format';
import { client } from 'src/api/client';
import {
  type Coupon,
  type DeliverPlace,
  type OrderReq,
  type PaymentMethodDto,
} from 'src/api/swagger/data-contracts';
import Layout from 'src/components/common/layout';
import {
  ProductCoupon,
  ProductRefundAccount,
  ProductShippingAddress,
} from 'src/components/product';
import { type miniOptionState, type OptionState } from 'src/components/product/bottom-sheet';
import { type RefundAccountType } from 'src/components/product/refund-account';
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
import { bToA, parseIamportPayMethod, parsePaymentWay, safeParse } from 'src/utils/parse';
import { REG_EXP } from 'src/utils/regex';
import { IamportPayMethod, impSuccessKey, useIamport, type vBankType } from 'src/utils/use-iamport';
import { VARIABLES } from 'src/variables';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';

const setOptionData = async (value: miniOptionState[]) =>
  (await client())
    .selectRecentViewList({ ids: value.map(v => v.productId).join(',') })
    .then((res: any) => {
      if (res.data.data && res.data.data.length > 0) {
        const optionData: OptionState[] = [];
        value.forEach(v => {
          const matched = res.data.data?.filter((x: { id: number }) => x.id === v.productId);
          if (matched && matched.length > 0) {
            optionData.push({
              isNeeded: true,
              optionId: v.optionId,
              productId: v.productId,
              name: v.name,
              amount: v.amount,
              price: matched[0].discountPrice ?? 0,
              additionalPrice: v.additionalPrice,
              deliveryFee: v.deliveryFee,
              stock: v.stock,
              maxAvailableStock: v.maxAvailableStock,
              productName: matched[0].title ?? '',
              productImage: matched[0].image ?? '',
              needTaxation: matched[0].isNeedTaxation ?? false,
              minOrderPrice: matched[0].minOrderPrice ?? 0,
              minStorePrice: matched[0].minStorePrice ?? 0,
              deliverFeeType: matched[0].deliverFeeType ?? 'FREE',
              storeId: matched[0].storeId ?? -1,
              storeImage: matched[0].storeImage ?? '',
              storeName: matched[0].storeName ?? '',
              pointRate: v.pointRate,
            });
          }
        });
        return optionData;
      }
    });

/** 주문하기 */
const Order: NextPageWithLayout = () => {
  const router = useRouter();
  const { options } = router.query;

  const { setAlert } = useAlertStore();
  const [refundBankData, setRefundBankData] = useState<RefundAccountType>({
    name: '',
    bankCode: '',
    accountNumber: '',
  });
  const [isAddressVisible, setIsAddressVisible] = useState<boolean>(false);
  const [isCouponVisible, setIsCouponVisible] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [shippingAddress, setShippingAddress] = useState<DeliverPlace>();
  const [point, setPoint] = useState<string>('');
  const [isOpenProduct, setIsOpenProduct] = useState<boolean>(false);
  const [isOpenProductPoint, setIsOpenProductPoint] = useState<boolean>(false);
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

  const [tmpOption, setTmpOption] = useState<OptionState[]>([]);

  const [coponValid, setCoponValid] = useState<Coupon[]>();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const selectedOption: OptionState[] = tmpOption ?? [];
  const sectionOption = changeSectionOption(selectedOption);
  const totalPrice =
    selectedOption.length > 0
      ? selectedOption
          .map(x => (x.price + x.additionalPrice) * x.amount)
          .reduce((a: number, b: number) => a + b)
      : 0;

  // const totalDelivery = changeSectionOption(selectedOption)
  //   .map(x => {
  //     return x.deliverFee;
  //   })
  //   .reduce((a, b) => a + b, 0);
  // console.log(totalDelivery);
  const totalDelivery = selectedOption[0]?.deliveryFee;
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
  const { data: couponData } = useQuery(queryKey.downloadedCoupon.lists, async () => {
    const res = await (await client()).selectDownloadedCoupon();
    if (res.data.isSuccess) {
      return res.data.data;
    } else {
      throw new Error('[selectDownloadedCoupon]' + res.data.code + ': ' + res.data.errorMsg);
    }
  });

  /** 쿠폰 할인금액 */
  const couponDiscountPoint = !selectCoupon
    ? 0
    : selectCoupon.type === 'RATE'
    ? totalPrice * ((selectCoupon.amount ?? 1) / 100)
    : selectCoupon.amount ?? 0;

  /** 최종결제금액 (적립금 제외) */
  const finalPrice = totalPrice + totalDelivery - couponDiscountPoint;
  /** 결제 금액 (적립금 사용 포함) */
  const orderPrice = finalPrice - Number(point);

  /** 구매 적립금 */
  const buyPoint =
    Math.round(Math.floor(Math.max(totalPrice, 0) * (user?.grade?.pointRate ?? 1)) / 10) * 10;
  /** 상품 적립금 */
  const productPoint = Math.floor(
    selectedOption.length > 0
      ? selectedOption.map(v => v.price * v.pointRate * v.amount).reduce((a, b) => a + b, 0)
      : 0,
  );

  /** 후기 작성 적립금 */
  const imageReviewPoint = pointData?.imageReviewPoint;
  /** 예상 적립 금액 */
  const expectPoint = useMemo(
    () => buyPoint + (imageReviewPoint ?? 0) + productPoint,
    [buyPoint, imageReviewPoint, productPoint],
  );
  useEffect(() => {
    if (!selectedOption) return;
    localStorage.setItem(
      'ga',
      JSON.stringify({
        action: 'purchase',
        value: totalPrice,
        name: selectedOption[0]?.productName,
        category: '상품',
        currency: 'KRW',
        transaction_id: new Date().toTimeString().split(' ')[0],
        shipping: 4000,
        tax: 0,
        affiliation: '바로피쉬',
        items: selectedOption.map(item => {
          return {
            item_id: item.storeId,
            item_name: item.productName + item.name,
            list_name: '해산물',
            item_category: 'product',
            variant: '해산물',
            affiliation: '바로피쉬',
            list_position: '스토어',
            item_brand: item.storeName,
            price: (item.price + item.additionalPrice) * item.amount,
            quantity: item.amount,
          };
        }),
      }),
    );
    localStorage.setItem(
      'fp',
      JSON.stringify({
        content_id: new Date().toTimeString().split(' ')[0],
        value: formatToLocaleString(totalPrice).replace(',', '.'),
        currency: 'KRW',
        content_type: 'product',
        items: selectedOption.map(item => {
          return {
            item_id: item.storeId,
            item_name: item.productName + item.name,
            affiliation: '바로피쉬',
            item_brand: item.storeName,
            price: formatToLocaleString((item.price + item.additionalPrice) * item.amount).replace(
              ',',
              '.',
            ),
            quantity: item.amount,
          };
        }),
      }),
    );
    localStorage.setItem(
      'kakaoP',
      JSON.stringify({
        total_quantity: `${selectedOption.length}`,
        total_price: `${totalPrice}`, // 주문 총 가격(optional)
        currency: 'KRW',
        tag: '상품구매',
        products: selectedOption.map(item => {
          return {
            id: `${item.storeId}`,
            name: `${item.productName + item.name}`,
            quantity: `${item.amount}`,
            price: `${formatToLocaleString(
              (item.price + item.additionalPrice) * item.amount,
            ).replace(',', '.')}`,
          };
        }),
      }),
    );
  }, [selectedOption, totalPrice]);

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

  const getMobileResultUrl = (orderId: string, payMethod?: IamportPayMethod) => {
    const url = new URL(
      `${location.origin}${payMethod === IamportPayMethod.Vbank ? '/mypage' : '/product/payment'}`,
    );
    url.searchParams.set('id', router.query.id as string);
    if (payMethod !== IamportPayMethod.Vbank) {
      url.searchParams.set('orderId', orderId);
      url.searchParams.set('options', options as string);
    }
    return url.href;
  };

  /**
   * 과세, 면세금액 계산
   * @returns zeroList : 과세 금액 0으로 표시
   * @returns allList : 과세 금액도 그대로 표시
   * @returns sum : 과세 금액 0 으로 더한거
   */
  const getTaxFreePrice = () => {
    const eachPriceList = selectedOption.map(x => (x.price + x.additionalPrice) * x.amount);
    const priceList = selectedOption.map(
      x =>
        Math.round(
          ((couponDiscountPoint + Number(point)) * ((x.price + x.additionalPrice) * x.amount)) /
            totalPrice /
            10,
        ) * 10,
    );
    const priceListReduce = priceList.reduce((a, b) => a + b, 0);
    const taxValueList = selectedOption.map(x => x.needTaxation);
    const priceListAdd = [...priceList];
    const lastIndex = priceListAdd.length - 1;
    priceListAdd[lastIndex] =
      priceListAdd[lastIndex] + -(priceListReduce - (couponDiscountPoint + Number(point)));
    const priceListAddAll = [...priceListAdd];
    priceListAdd.forEach((element, index) => {
      if (!taxValueList[index]) {
        priceListAdd[index] = eachPriceList[index] - element;
      } else {
        priceListAdd[index] = 0;
      }
      priceListAddAll[index] = eachPriceList[index] - element;
    });
    return {
      zeroList: priceListAdd,
      allList: priceListAddAll,
      sum: priceListAdd.reduce((a, b) => a + b, 0),
    };
  };

  async function onPayment() {
    if (Number(point) !== 0 && Number(point) < 100) {
      return setAlert({ message: '적립금은 100원 이상 사용할 수 있습니다.' });
    }
    // if (orderPrice > 0 && orderPrice < 100) {
    // return setAlert({ message: `최소 결제금액(100원) 이상\n또는 0원 결제로 진행해주세요.` });
    if (orderPrice < 100) {
      return setAlert({ message: `최소 결제금액(100원) 이상으로\n결제를 진행해주세요.` });
    }
    if (isCheck) {
      if (!shippingAddress) return setAlert({ message: '배송지를 입력해주세요' });
      if (payMethod === IamportPayMethod.Vbank) {
        if (!refundBankData.name) return setAlert({ message: '예금주명을 입력해 주세요.' });
        else if (!refundBankData.bankCode)
          return setAlert({ message: '입금 은행을 선택해 주세요.' });
        else if (!refundBankData.accountNumber)
          return setAlert({ message: '계좌번호을 입력해 주세요.' });
      }
      const taxFreePrice = getTaxFreePrice();

      orderProduct({
        products: selectedOption.map((x, i) => {
          return {
            productId: x.productId,
            optionId: x.optionId === -1 ? undefined : x.optionId,
            amount: x.amount,
            deliveryFee: x.deliveryFee,
            needTaxation: x.needTaxation, //
            taxFreeAmount: taxFreePrice.allList[i],
          };
        }),
        name,
        tel: phone.replace(/-/g, ''),
        couponId: selectCoupon?.id ?? undefined,
        point: Number(point),
        deliverPlaceId: shippingAddress.id,
        totalPrice: orderPrice,
        couponDiscountPrice: couponDiscountPoint,
        paymentMethodId: selectedCard?.id,
        paymentWay: parsePaymentWay(payMethod),
        taxFreeAmount: taxFreePrice.sum,
        vbankRefundInfo:
          payMethod === IamportPayMethod.Vbank
            ? {
                bankHolder: refundBankData.name,
                bankCodeId: Number(refundBankData.bankCode),
                bankAccount: refundBankData.accountNumber,
              }
            : undefined,
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
                // mobileRedirectUrl: '',
                mobileRedirectUrl: getMobileResultUrl(orderId, payMethod),
                productName: selectedOption[0]?.productName ?? '',
                amount: orderPrice,
                email: '',
                address: '',
                postcode: '',
                tel: phone,
                name,
                taxFree: taxFreePrice.sum,
              },
              onSuccess: async (vBankData?: vBankType) => {
                onIamportResult(orderId, true, '', vBankData);
              },
              onFailure: (error_msg: string) => onIamportResult(orderId, false, error_msg),
            });
          } else {
            setAlert({ message: res.data.errorMsg ?? '' });
          }
        })
        .catch(err => {
          setAlert({ message: err.response.data.errorMsg });
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

    const deliver = (user?.deliverPlaces ?? []).filter(
      (x: { isDefault: boolean }) => x.isDefault === true,
    );
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

  useEffect(() => {
    const tmpMiniOption: miniOptionState[] | undefined = router.isReady
      ? safeParse(bToA(options as string))
      : [];

    if (tmpMiniOption && tmpMiniOption.length > 0) {
      setOptionData(tmpMiniOption).then(res => {
        if (res) {
          setTmpOption(res);
        }
      });
    }
  }, [options, router.isReady]);
  useEffect(() => {
    sessionStorage.removeItem('Paths');
  }, []);
  useEffect(() => {
    if (couponData) {
      const totalPrices = totalDelivery + totalPrice;
      const filter = couponData.filter(
        (item: { minPrice: number }) => item?.minPrice <= totalPrices,
      );
      setCoponValid(filter);
    }
  }, [couponData, totalDelivery, totalPrice]);
  return (
    <>
      <DefaultSeo title='주문 | 바로피쉬' description='주문' />
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
          <p className='text-[18px] font-bold -tracking-[0.03em] text-grey-10'>주문하기</p>
          <div className='w-6' />
        </div>

        {/* 주문자 정보 */}
        <div className='flex flex-col gap-4 px-4 py-5'>
          <p className='text-[18px] font-bold leading-[24px] -tracking-[0.03em] text-grey-10'>
            주문자 정보
          </p>
          <div className='flex w-full items-center justify-between'>
            <p className='w-[20%] text-[18px] font-medium leading-[24px] -tracking-[0.03em] text-grey-10'>
              이름
            </p>
            <input
              maxLength={10}
              className='h-[44px] w-[80%] flex-1 rounded-lg border border-grey-80 px-3 text-[16px] font-normal leading-[22px] -tracking-[0.03em] text-grey-10 placeholder:text-grey-60 focus:border-primary-50'
              placeholder='이름을 입력해주세요'
              value={name}
              onChange={e => {
                setName(e.target.value.replaceAll(REG_EXP.emoji, ''));
              }}
            />
          </div>
          <div className='flex w-full items-center justify-between'>
            <p className='w-[20%] text-[18px] font-medium leading-[24px] -tracking-[0.03em] text-grey-10'>
              연락처
            </p>
            <PatternFormat
              format='###-####-####'
              placeholder='휴대폰 번호를 입력해주세요'
              inputMode='numeric'
              spellCheck={false}
              value={phone}
              className='h-[44px] w-[80%] flex-1 rounded-lg border border-grey-80 px-3 text-[16px] font-normal leading-[22px] -tracking-[0.03em] text-grey-10 placeholder:text-grey-60 focus:border-primary-50'
              onChange={e => setPhone(e.target.value)}
            />
          </div>
        </div>
        <div className='h-2 bg-grey-90' />

        {/* 배송지 */}
        <div className='flex flex-col px-4 py-[22px]'>
          <div className='flex items-center justify-between'>
            <p className='text-[18px] font-bold leading-[24px] -tracking-[0.03em] text-grey-10'>
              배송지
            </p>
            <button
              className=''
              onClick={() => {
                setIsAddressVisible(true);
                history.pushState(location.href, '', '');
              }}
            >
              <p className='text-[16px] font-semibold leading-[22px] -tracking-[0.03em] text-primary-50'>
                배송지 변경
              </p>
            </button>
          </div>
          {shippingAddress && (
            <Fragment>
              <div className='mt-[22px] flex items-center gap-2'>
                <p className='text-[18px] font-bold leading-[24px] -tracking-[0.03em] text-grey-10'>
                  {shippingAddress.name ?? ''}
                </p>
                {shippingAddress.isDefault === true && (
                  <div className='flex h-[22px] items-center justify-center rounded-full bg-primary-90 px-2'>
                    <p className='text-[15px] font-medium leading-[20px] -tracking-[0.03em] text-primary-60'>
                      기본배송지
                    </p>
                  </div>
                )}
              </div>
              <p className='mt-1 text-[18px] font-medium leading-[24px] -tracking-[0.03em] text-grey-10'>
                {`${shippingAddress.receiverName}, ${formatToPhone(shippingAddress.tel)}`}
              </p>
              <div className='my-2.5 h-[1px] bg-grey-90' />
              <p className='text-[18px] font-medium leading-[24px] -tracking-[0.03em] text-grey-10'>
                {`(${shippingAddress.postalCode}) ${shippingAddress.address} ${shippingAddress.addressDetail}`}
              </p>
              <p className='mt-1 text-[15px] font-medium leading-[22px] -tracking-[0.03em] text-grey-70'>
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
          <p className='w-[20%] text-[18px] font-bold leading-[24px] -tracking-[0.03em] text-grey-10'>
            주문 상품
          </p>
          <p className='line-clamp-1 w-[65%] flex-1 text-end text-[18px] font-medium leading-[24px] -tracking-[0.03em] text-grey-20'>
            {/* {`${data?.data?.title}`}{`${product.length > 1 ? ' 외 1개' :''}`} */}
            {`${selectedOption[0]?.productName}`}
          </p>
          {selectedOption.length > 1 && (
            <p className='w-[13%] text-end text-[18px] font-medium leading-[24px] -tracking-[0.03em] text-grey-20'>{`${
              selectedOption.length > 1 ? ` 외 ${selectedOption.length - 1}개` : ''
            }`}</p>
          )}
          <Image
            unoptimized
            src='/assets/icons/common/chevron-mypage.svg'
            alt='chevron'
            width={24}
            height={24}
            className={cm(!isOpenProduct ? 'w-[5%] rotate-90' : 'w-[5%] rotate-[270deg]')}
          />
        </button>
        {isOpenProduct &&
          sectionOption.map(x => {
            const deliverText =
              x.deliverFee === 0 ? '무료' : formatToLocaleString(x.deliverFee, { suffix: '원' });

            return (
              <Fragment key={`${x.storeId}`}>
                <div className='flex items-center justify-between px-4'>
                  <div className='flex items-center gap-2'>
                    <Image
                      unoptimized
                      src={x.storeImage}
                      alt='cartImg'
                      width={28}
                      height={28}
                      className='h-7 w-7 rounded-full border border-grey-90 object-cover'
                    />
                    <p className='text-[18px] font-semibold leading-[24px] -tracking-[0.03em] text-grey-10'>
                      {x.storeName}
                    </p>
                  </div>
                  <div className='flex items-center gap-1'>
                    <p className='text-[15px] font-medium leading-[20px] -tracking-[0.03em] text-grey-50'>
                      배송비
                    </p>
                    <p className='text-[15px] font-bold leading-[20px] -tracking-[0.03em] text-grey-20'>
                      {deliverText}
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
                            alt='productImage'
                            width={70}
                            height={70}
                            className='h-[70px] w-[70px] rounded object-cover'
                            src={v.productImage}
                          />
                          <div className='flex flex-col gap-1'>
                            <p className='text-[15px] font-medium leading-[22px] text-grey-10'>
                              {v.productName}
                            </p>
                            <p className='text-[15px] font-medium leading-[22px] text-grey-40'>
                              {v.name === '' ? '기본' : v.name} : {v.amount}개
                            </p>
                          </div>
                        </div>
                        <div className='mb-4 flex items-center justify-end'>
                          <p className='text-[18px] font-bold leading-[24px] text-grey-10'>
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
            <p className='text-[18px] font-bold leading-[24px] -tracking-[0.03em] text-grey-10'>
              쿠폰
            </p>
            <div className='flex items-center'>
              <p className='text-[15px] font-medium leading-[22px] -tracking-[0.03em] text-grey-20'>
                사용가능한 쿠폰
              </p>
              <p className='whitespace-pre text-[15px] font-semibold leading-[22px] -tracking-[0.03em] text-primary-50'>{` ${
                coponValid?.length ?? 0
              }`}</p>
              <p className='text-[15px] font-medium leading-[22px] -tracking-[0.03em] text-grey-20'>
                장
              </p>
              {selectCoupon && (
                <button className='ml-1.5' onClick={() => setSelectCoupon(undefined)}>
                  <p className='text-[15px] font-medium leading-[22px] -tracking-[0.03em] text-grey-50'>
                    적용 취소
                  </p>
                </button>
              )}
            </div>
          </div>
          <div className='mt-4 flex items-center gap-2'>
            <div className='flex h-[44px] flex-1 items-center rounded-lg border border-grey-80 bg-grey-90 px-4'>
              <p className='text-[15px] font-medium leading-[22px] -tracking-[0.03em] text-grey-60'>
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
              <p className='text-[15px] font-semibold -tracking-[0.03em] text-grey-10'>쿠폰 선택</p>
            </button>
          </div>
        </div>
        <div className='h-2 bg-grey-90' />

        {/* 적립금 */}
        <div className='px-4 py-[22px]'>
          <div className='flex items-center justify-between'>
            <p className='text-[18px] font-bold leading-[24px] -tracking-[0.03em] text-grey-10'>
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
              <p className='text-[15px] font-semibold -tracking-[0.03em] text-grey-10'>모두 사용</p>
            </button>
          </div>
          <div className='mt-2 flex items-center'>
            <p className='text-[14px] font-medium leading-[22px] -tracking-[0.03em] text-grey-20'>
              보유 적립금
            </p>
            <p className='whitespace-pre text-[15px] font-semibold leading-[22px] -tracking-[0.03em] text-primary-50'>{` ${formatToLocaleString(
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
          <p className='text-[18px] font-bold leading-[24px] -tracking-[0.03em] text-grey-10'>
            결제수단
          </p>
          <p className='flex-1 text-end text-[18px] font-semibold leading-[24px] -tracking-[0.03em] text-grey-10'>
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
                {
                  image: '/assets/icons/product/payment-kakao.png',
                  type: IamportPayMethod.Kakaopay,
                },
                {
                  image: '/assets/icons/product/payment-naver.png',
                  activeImage: '/assets/icons/product/payment-naver-active.png',
                  type: IamportPayMethod.Naverpay,
                },
                {
                  image: '/assets/icons/product/payment-toss.png',
                  activeImage: '/assets/icons/product/payment-toss-active.png',
                  type: IamportPayMethod.Tosspay,
                },
                {}, // 등록된 카드
                { type: IamportPayMethod.Card },
                { type: IamportPayMethod.Phone },
                { type: IamportPayMethod.Vbank },
                { type: IamportPayMethod.Trans },
              ] as { image?: string; activeImage?: string; type?: IamportPayMethod }[]
            ).map((v, i) => {
              const isActive = payMethod === v.type;
              // 네이버 페이 숨김
              if (v.type === IamportPayMethod.Naverpay) return null;
              // 등록된 카드 숨김
              if (i === 3 && VARIABLES.IS_MASTER) return null;
              return (
                <Fragment key={`payment${i}`}>
                  <button
                    className={cm(
                      'flex h-[48px] w-full items-center justify-center gap-3 rounded-lg border border-[#E2E2E2]',
                      {
                        'col-span-2': i < 4,
                        'bg-[#FEE33A]': i === 0 && isActive,
                        'bg-[#03C75A]': i === 1 && isActive,
                        'bg-[#0064FF]': i === 2 && isActive,
                        'bg-primary-50': (i > 3 || selectedCard !== undefined) && isActive,
                        'rounded-b-none': i === 3 && isActive,
                        'border-0': isActive && selectedCard !== undefined,
                      },
                    )}
                    onClick={() => {
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
                        'text-[15px] font-medium -tracking-[0.03em]',
                        (isActive && ![0, 3].includes(i)) ||
                          (i === 3 && isActive && selectedCard !== undefined)
                          ? 'text-grey-90'
                          : 'text-grey-10',
                      )}
                    >
                      {v.type ? parseIamportPayMethod(v.type) : '등록된 카드'}
                    </p>
                  </button>
                  {i === 3 && isActive && (
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
                          (paymentMethodData ?? []).map((x: any, idx: number) => {
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
                                    <p className='line-clamp-1 shrink-0 break-all text-[18px] font-medium leading-[24px] -tracking-[0.03em] text-grey-20'>
                                      {`${setSquareBrackets(x.cardName)} ${x.name}`}
                                    </p>
                                    <p className='line-clamp-1 shrink-0 break-all text-[18px] font-medium leading-[24px] -tracking-[0.03em] text-grey-50'>
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
                              <p className='whitespace-pre text-center text-[15px] font-medium leading-[20px] -tracking-[0.05em] text-[#B5B5B5]'>
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
        {payMethod === IamportPayMethod.Vbank && (
          <Fragment>
            <div className='h-2 bg-grey-90' />
            <ProductRefundAccount setRefundData={setRefundBankData} />
          </Fragment>
        )}

        <div className='h-2 bg-grey-90' />
        {/* 결제 금액 */}
        <div className='px-4 py-[22px]'>
          <p className='text-[18px] font-bold leading-[24px] -tracking-[0.03em] text-grey-10'>
            결제 금액
          </p>
          <div className='mt-4 flex flex-col gap-2.5'>
            <div className='flex items-center justify-between'>
              <p className='text-[18px] font-medium leading-[24px] -tracking-[0.03em] text-grey-50'>
                주문금액
              </p>
              <p className='text-[18px] font-medium leading-[24px] -tracking-[0.03em] text-grey-20'>{`${formatToLocaleString(
                totalPrice,
              )}원`}</p>
            </div>
            <div className='flex items-center justify-between'>
              <p className='text-[18px] font-medium leading-[24px] -tracking-[0.03em] text-grey-50'>
                배송비
              </p>
              <p className='text-[18px] font-medium leading-[24px] -tracking-[0.03em] text-grey-20'>{`${
                totalDelivery === 0 ? '' : '+'
              }${formatToLocaleString(totalDelivery)}원`}</p>
            </div>
            <div className='flex items-center justify-between'>
              <p className='text-[18px] font-medium leading-[24px] -tracking-[0.03em] text-grey-50'>
                쿠폰할인
              </p>
              <p className='text-[18px] font-medium leading-[24px] -tracking-[0.03em] text-grey-20'>{`${
                couponDiscountPoint === 0 ? '' : '-'
              }${formatToLocaleString(couponDiscountPoint)}원`}</p>
            </div>
            <div className='flex items-center justify-between'>
              <p className='text-[18px] font-medium leading-[24px] -tracking-[0.03em] text-grey-50'>
                적립금사용
              </p>
              <p className='text-[18px] font-medium leading-[24px] -tracking-[0.03em] text-grey-20'>{`${
                Number(point) === 0 ? '' : '-'
              }${formatToLocaleString(point)}원`}</p>
            </div>
          </div>
          <div className='mb-[22px] mt-4 h-[1px] bg-grey-90' />
          <div className='flex items-start justify-between'>
            <p className='text-[18px] font-bold leading-[24px] -tracking-[0.03em] text-grey-10'>
              최종 결제 금액
            </p>
            <p className='text-[20px] font-bold leading-[30px] -tracking-[0.03em] text-grey-10'>{`${formatToLocaleString(
              orderPrice,
            )}원`}</p>
          </div>
        </div>
        <div className='h-2 bg-grey-90' />

        {/* 적립금 혜택 */}
        <div className='px-4 py-[22px]'>
          <p className='text-[18px] font-bold leading-[24px] -tracking-[0.03em] text-grey-10'>
            적립금 혜택
          </p>
          <div className='mt-4 flex items-start justify-between'>
            <p className='text-[18px] font-medium leading-[24px] -tracking-[0.03em] text-grey-50'>
              구매적립
            </p>
            <div className='flex flex-col items-end'>
              <p className='text-[18px] font-medium leading-[24px] -tracking-[0.03em] text-grey-20'>{`${formatToLocaleString(
                buyPoint,
              )}원`}</p>
              <p className='text-[14px] font-normal leading-[22px] -tracking-[0.03em] text-grey-60'>
                {`(${user?.grade?.name ?? '멸치'} 등급 : 구매 적립 ${
                  Number(user?.grade?.pointRate) * 100 ?? 1
                }%)`}
              </p>
            </div>
          </div>
          {/* <button
          className='flex h-[68px] w-full items-center gap-1.5 px-4'
          onClick={() => setIsOpenProduct(!isOpenProduct)}
        ></button> */}
          <button
            className='flex h-[50px] w-full items-center justify-between'
            onClick={() => setIsOpenProductPoint(!isOpenProductPoint)}
          >
            <p className='flex text-[18px] font-medium leading-[24px] -tracking-[0.03em]  text-grey-50'>
              상품적립
              <Image
                unoptimized
                src='/assets/icons/common/chevron-mypage.svg'
                alt='chevron'
                width={24}
                height={24}
                className={cm(!isOpenProductPoint ? 'rotate-90' : 'rotate-[270deg]')}
              />
            </p>
            <div className='flex flex-col items-end'>
              <p className=' text-[18px] font-medium leading-[24px] -tracking-[0.03em] text-grey-20'>
                {`${formatToLocaleString(productPoint)}원`}
              </p>
            </div>
          </button>
          {isOpenProductPoint &&
            selectedOption.map((item, idx) => {
              return (
                <Fragment key={idx}>
                  <div className='flex items-center justify-between'>
                    <p className='text-[14px] font-medium leading-[10px] -tracking-[0.03em] text-grey-50'>
                      {item.productName}
                    </p>
                    <p className='text-[14px] font-medium leading-[24px] -tracking-[0.03em] text-grey-60'>{`${formatToLocaleString(
                      Math.floor(item.price * item.pointRate) * item.amount,
                    )}원`}</p>
                  </div>
                  <p className='mb-2 mt-2 text-[14px] font-medium leading-[10px] -tracking-[0.03em] text-grey-60'>
                    옵션: {item.name}
                  </p>
                </Fragment>
              );
            })}
          <div className='mt-4 flex items-center justify-between'>
            <p className='text-[18px] font-medium leading-[24px] -tracking-[0.03em] text-grey-50'>
              후기작성
            </p>
            <p className='text-[18px] font-medium leading-[24px] -tracking-[0.03em] text-grey-20'>{`최대 ${formatToLocaleString(
              imageReviewPoint,
            )}원`}</p>
          </div>
          <div className='mb-[22px] mt-4 h-[1px] bg-grey-90' />
          <div className='flex items-start justify-between'>
            <p className='text-[18px] font-bold leading-[24px] -tracking-[0.03em] text-black'>
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
            <p className='text-[18px] font-bold -tracking-[0.03em] text-white'>
              {`${formatToLocaleString(orderPrice)}원 결제하기`}
            </p>
          </button>
        </div>
      </div>
    </>
  );
};

function BusinessInformation() {
  const [showInfo, setShowInfo] = useState<boolean>(false);
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
      <p className='text-[13px] font-medium leading-[18px] -tracking-[0.05em] text-[#969696]'>
        (주) 맛신저는 통신판매중개자이며, 통신판매의 당사자가 아닙니다. 따라서 (주) 맛신저는 상품,
        거래정보 및 거래에 대하여 책임을 지지 않습니다.
      </p>
      <div className='pt-[23px]'>
        <button onClick={() => setShowInfo(!showInfo)}>
          <div className='flex items-center gap-[5px]'>
            <p className='text-[13px] font-bold leading-[16px] -tracking-[0.05em] text-[#797979]'>
              (주) 맛신저 사업자정보
            </p>
            <Image
              unoptimized
              src='/assets/icons/common/chevron-footer.svg'
              alt='footerImg'
              width={13}
              height={8}
              className={cm({ 'rotate-180': showInfo })}
            />
          </div>
        </button>
        {showInfo && info?.tcContent && (
          <div className='leaidng-[16px] mt-[18px] flex flex-col gap-2 text-[12px] font-medium -tracking-[0.03em] text-grey-60'>
            {info.tcContent.map((v: { title: string; content: string }, i: number) => {
              return <p key={i}>{`${v.title} : ${v.content}`}</p>;
            })}
          </div>
        )}
        <div className='mt-[18px] flex items-center gap-[3px] text-[12px] font-medium leading-[16px] -tracking-[0.05em] text-[#B5B5B5]'>
          <p>Copyright</p>
          <p>©</p>
          <p>바로피쉬.</p>
          <p>All rights reserved.</p>
        </div>
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
