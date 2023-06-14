import { add, format } from 'date-fns';
import useScript from 'src/utils/use-script';
import { VARIABLES } from 'src/variables';

export const impSuccessKey = 'imp_success';

/** 아임포트 pg사 종류 */
export enum IamportPg {
  /** 이니시스웹표준 */
  Html5Inicis = 'html5_inicis',
  /** 이니시스ActiveX결제창 */
  Inicis = 'inicis',
  /** NHN KCP */
  Kcp = 'kcp',
  /** NHN KCP 정기결제 */
  KcpBilling = 'kcp_billing',
  /** 토스페이먼츠(구 LG U+) */
  Uplus = 'uplus',
  /** 나이스페이 */
  Nice = 'nice',
  /** JTNet */
  Jtnet = 'jtnet',
  /** 한국정보통신 */
  Kicc = 'kicc',
  /** 블루월넛 */
  Bluewalnut = 'bluewalnut',
  /** 카카오페이 */
  Kakaopay = 'kakaopay',
  /** 다날휴대폰소액결제 */
  Danal = 'danal',
  /** 다날일반결제 */
  DanalTpay = 'danal_tpay',
  /** 모빌리언스 휴대폰소액결제 */
  Mobilians = 'mobilians',
  /** 차이 간편결제 */
  Chai = 'chai',
  /** 시럽페이 */
  Syrup = 'syrup',
  /** 페이코 */
  Payco = 'payco',
  /** 페이팔 */
  Paypal = 'paypal',
  /** 엑심베이 */
  Eximbay = 'eximbay',
  /** 네이버페이-결제형 */
  Naverpay = 'naverpay',
  /** 네이버페이-주문형 */
  Naverco = 'naverco',
  /** 스마일페이 */
  Smilepay = 'smilepay',
  /** 알리페이 */
  Alipay = 'alipay',
  /** 페이먼트월 */
  Paymentwall = 'paymentwall',
  /** 페이플 */
  Payple = 'payple',
  /** 토스간편결제 */
  Tosspay = 'tosspay',
  /** 스마트로 */
  Smartro = 'smartro',
  /** 세틀뱅크 */
  Settle = 'settle',
  TosspayPayment = 'tosspayments',
}

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
  /** 삼성페이 / 이니시스, KCP 전용 */
  Samsung = 'samsung',
  /** KPay앱 직접호출 / 이니시스 전용 */
  Kpay = 'kpay',
  /** 카카오페이 직접호출 / 이니시스, KCP, 나이스페이먼츠 전용 */
  Kakaopay = 'kakaopay',
  /** 페이코 직접호출 / 이니시스, KCP 전용 */
  Payco = 'payco',
  /** LPAY 직접호출 / 이니시스 전용 */
  Lpay = 'lpay',
  /** SSG페이 직접호출 / 이니시스 전용 */
  Ssgpay = 'ssgpay',
  /** 토스간편결제 직접호출 / 이니시스 전용 */
  Tosspay = 'tosspay',
  /** 문화상품권 / 이니시스, 토스페이먼츠(구 LG U+), KCP 전용 */
  Cultureland = 'cultureland',
  /** 스마트문상 / 이니시스, 토스페이먼츠(구 LG U+), KCP 전용 */
  Smartculture = 'smartculture',
  /** 해피머니 / 이니시스, KCP 전용 */
  Happymoney = 'happymoney',
  /** 도서문화상품권 / 토스페이먼츠(구 LG U+), KCP 전용 */
  Booknlife = 'booknlife',
  /** 베네피아 포인트 등 포인트 결제 / KCP 전용 */
  Point = 'point',
  /** 위쳇페이 / 엑심베이 전용 */
  Wechat = 'wechat',
  /** 알리페이 / 엑심베이 전용 */
  Alipay = 'alipay',
  /** 유니온페이 / 엑심베이 전용 */
  Unionpay = 'unionpay',
  /** 텐페이 / 엑심베이 전용 */
  Tenpay = 'tenpay',
}

/** 아임포트 결제정보 */
export type IamportData = {
  /** pg사 종류 */
  pg?: IamportPg | any;
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

    const value = {
      pg: p.data.pg ?? IamportPg.Html5Inicis,
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
      // notice_url: 'http://43.201.240.47:8080/callback/iamport_pay_result',
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

  return onIamport;
};
