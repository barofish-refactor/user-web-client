import { add, format } from 'date-fns';
import useScript from 'src/utils/use-script';
import { VARIABLES } from 'src/variables';

export const impSuccessKey = 'imp_success';

/** 아임포트 결제수단 */
export enum IamportPayMethod {
  /** 신용카드 */
  Card = 'card',
  /** 실시간계좌이체 */
  Trans = 'trans',
  /** 가상계좌 */
  Vbank = 'vbank',
  /** 휴대폰소액결제 */
  Phone = 'phone',
  /** 카카오페이 */
  Kakaopay = 'kakaopay',
  /** 네이버페이 */
  Naverpay = 'naverpay',
}

/** 아임포트 결제정보 */
export type IamportData = {
  /** 결제수단 */
  payMethod?: IamportPayMethod;
  /** 주문번호 */
  merchantUid: string;
  /** 상품명 */
  productName: string;
  /** 가격 */
  amount: number;
  /** 이메일 */
  email: string;
  /** 이름 */
  name: string;
  /** 연락처 */
  tel: string;
  /** 주소 */
  address: string;
  /** 우편번호 */
  postcode: string;
  /** 가상계좌입금기한 */
  vbankDueHour?: number;
  /** 모바일결제시 리다이렉트 url */
  mobileRedirectUrl: string;
};

/** 아임포트 props */
export interface IamportProps {
  /** 결제정보 */
  data: IamportData;
  /** 성공시 실행 함수 */
  onSuccess: () => void;
  /** 실패시 실행 함수 */
  onFailure: (message: string) => void;
}

export const useIamport = () => {
  const iamportScriptState = useScript('https://cdn.iamport.kr/v1/iamport.js');

  const onIamport = (p: IamportProps) => {
    if (iamportScriptState !== 'ready') return;

    const { IMP } = window;

    IMP.init(process.env.NEXT_PUBLIC_IAMPORT_KEY);

    const suffix =
      p.data.payMethod === IamportPayMethod.Naverpay
        ? process.env.NEXT_NAVER_PG_MID
        : p.data.payMethod === IamportPayMethod.Kakaopay
        ? process.env.NEXT_KAKAO_PG_MID
        : process.env.NEXT_PUBLIC_PG_MID;

    const value = {
      pg: `${
        [IamportPayMethod.Naverpay, IamportPayMethod.Kakaopay].includes(
          p.data.payMethod ?? IamportPayMethod.Card,
        )
          ? p.data.payMethod
          : 'tosspayments'
      }.${suffix}`,
      pay_method: p.data.payMethod ?? IamportPayMethod.Card,
      merchant_uid: p.data.merchantUid,
      name: p.data.productName,
      amount: p.data.amount,
      buyer_email: p.data.email,
      buyer_name: p.data.name,
      buyer_tel: p.data.tel,
      buyer_addr: p.data.address,
      buyer_postcode: p.data.postcode,
      vbank_due: format(add(new Date(), { hours: p.data.vbankDueHour ?? 24 }), 'yyyyMMddHHmm'),
      m_redirect_url: p.data.mobileRedirectUrl,
      notice_url: VARIABLES.END_POINT + '/callback/iamport_pay_result',
    };

    const callback = (response: any) => {
      if (response.error_code) {
        if (process.env.NODE_ENV === 'development') console.log(response);
        p.onFailure(response.error_msg);
      } else {
        p.onSuccess();
      }
    };

    IMP.request_pay(value, callback);
  };

  const onCertification = () => {
    const { IMP } = window;
    IMP.init(process.env.NEXT_PUBLIC_IAMPORT_KEY);
    IMP.certification(
      {
        pg: `html5_inicis.MIIiasTest`,
        merchant_uid: `mid_${new Date().getTime()}`,
        m_redirect_url: location.href,
      },
      response => {
        if (response.success) {
          console.log(response);
        } else {
          console.log(response);
        }
      },
    );
  };

  return { onIamport, onCertification };
};
