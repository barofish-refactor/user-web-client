import useScript from './use-script';

export interface Postcode {
  open(openOptions?: OpenOptions): void;
  embed(element: HTMLElement, embedOptions?: EmbedOptions): void;
}

export interface EmbedOptions {
  q?: string;
  autoClose?: boolean;
}

export interface OpenOptions {
  q?: string;
  left?: number | string;
  top?: number | string;
  popupTitle?: string;
  popupKey?: string;
  autoClose?: boolean;
}

export interface Size {
  width: number;
  height: number;
}

export interface Address {
  /**
   * @description 국가기초구역번호. 2015년 8월 1일부터 시행될 새 우편번호.
   * @example 13494
   */
  zonecode: string;
  /**
   * @description 기본 주소(검색 결과에서 첫줄에 나오는 주소, 검색어의 타입(지번/도로명)에 따라 달라집니다.)
   * @example 경기 성남시 분당구 판교역로 235
   */
  address: string;
  /**
   * @description 기본 영문 주소
   * @example 235 Pangyoyeok-ro, Bundang-gu, Seongnam-si, Gyeonggi-do, korea
   */
  addressEnglish: string;
  /**
   * @description 검색된 기본 주소 타입: R(도로명), J(지번)
   * @example "R" | "J"
   */
  addressType: 'R' | 'J';
  /**
   * @description 검색 결과에서 사용자가 선택한 주소의 타입
   * @example "R" | "J"
   */
  userSelectedType: 'R' | 'J';
  /**
   * @description 연관 주소에서 "선택 안함" 부분을 선택했을때를 구분할 수 있는 상태변수
   * @example "Y" | "N"
   */
  noSelected: 'Y' | 'N';
  userLanguageType: 'K' | 'E';
  roadAddress: string;
  roadAddressEnglish: string;
  jibunAddress: string;
  jibunAddressEnglish: string;
  autoRoadAddress: string;
  autoRoadAddressEnglish: string;
  autoJibunAddress: string;
  autoJibunAddressEnglish: string;
  buildingCode: string;
  buildingName: string;
  apartment: 'Y' | 'N';
  sido: string;
  sidoEnglish: string;
  sigungu: string;
  sigunguEnglish: string;
  sigunguCode: string;
  roadnameCode: string;
  bcode: string;
  roadname: string;
  roadnameEnglish: string;
  bname: string;
  bnameEnglish: string;
  bname1: string;
  bname1English: string;
  bname2: string;
  bname2English: string;
  hname: string;
  query: string;
}

export type State = 'FORCE_CLOSE' | 'COMPLETE_CLOSE';

export interface Search {
  q: string;
  count: number;
}

export interface Theme {
  bgColor?: string;
  searchBgColor?: string;
  contentBgColor?: string;
  pageBgColor?: string;
  textColor?: string;
  queryTextColor?: string;
  postcodeTextColor?: string;
  emphTextColor?: string;
  outlineColor?: string;
}

export interface PostcodeOptions {
  oncomplete?: (address: Address) => void;
  onresize?: (size: Size) => void;
  onclose?: (state: State) => void;
  onsearch?: (search: Search) => void;
  width?: string | number;
  height?: string | number;
  animation?: boolean;
  focusInput?: boolean;
  focusContent?: boolean;
  autoMapping?: boolean;
  shorthand?: boolean;
  pleaseReadGuide?: number;
  pleaseReadGuideTimer?: number;
  maxSuggestItems?: number;
  showMoreHName?: boolean;
  hideMapBtn?: boolean;
  hideEngBtn?: boolean;
  alwaysShowEngAddr?: boolean;
  submitMode?: boolean;
  useBannerLink?: boolean;
  theme?: Theme;
  useSuggest?: boolean;
}

declare global {
  interface Window {
    daum: {
      Postcode: {
        new (postcodeOptions: PostcodeOptions): Postcode;
      };
    };
  }
}

const width = 500;
const height = 500;

/** 다음 주소찾기 Hooks */
export default function useDaumPostcode() {
  useScript('//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js');
  const openDaum = (oncomplete: (address: Address) => void) => {
    new window.daum.Postcode({ oncomplete, width, height }).open({
      popupTitle: '우편번호 검색',
      popupKey: 'popup1',
      left: document.body.offsetWidth / 2 - width / 2 + window.screenLeft,
      top: window.screen.height / 2 - height / 2,
    });
  };

  return [openDaum];
}
