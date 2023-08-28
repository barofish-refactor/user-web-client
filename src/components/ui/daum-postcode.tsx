import { Content, Overlay, Portal, Root, type DialogProps } from '@radix-ui/react-dialog';
import Script from 'next/script';
import { useEffect, useRef, useState } from 'react';
import { VARIABLES } from 'src/variables';

// interface Postcode {
//   open(openOptions?: OpenOptions): void;
//   embed(element: HTMLElement, embedOptions?: EmbedOptions): void;
// }

// interface EmbedOptions {
//   q?: string;
//   autoClose?: boolean;
// }

// interface OpenOptions {
//   q?: string;
//   left?: number | string;
//   top?: number | string;
//   popupTitle?: string;
//   popupKey?: string;
//   autoClose?: boolean;
// }

// interface Size {
//   width: number;
//   height: number;
// }

interface Address {
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

// type State = 'FORCE_CLOSE' | 'COMPLETE_CLOSE';

// interface Search {
//   q: string;
//   count: number;
// }

// interface Theme {
//   bgColor?: string;
//   searchBgColor?: string;
//   contentBgColor?: string;
//   pageBgColor?: string;
//   textColor?: string;
//   queryTextColor?: string;
//   postcodeTextColor?: string;
//   emphTextColor?: string;
//   outlineColor?: string;
// }

// interface PostcodeOptions {
//   oncomplete?: (address: Address) => void;
//   onresize?: (size: Size) => void;
//   onclose?: (state: State) => void;
//   onsearch?: (search: Search) => void;
//   width?: string | number;
//   height?: string | number;
//   animation?: boolean;
//   focusInput?: boolean;
//   focusContent?: boolean;
//   autoMapping?: boolean;
//   shorthand?: boolean;
//   pleaseReadGuide?: number;
//   pleaseReadGuideTimer?: number;
//   maxSuggestItems?: number;
//   showMoreHName?: boolean;
//   hideMapBtn?: boolean;
//   hideEngBtn?: boolean;
//   alwaysShowEngAddr?: boolean;
//   submitMode?: boolean;
//   useBannerLink?: boolean;
//   theme?: Theme;
//   useSuggest?: boolean;
// }

interface DaumEmbedProps {
  onComplete: (address: Address) => void;
}

type DaumPostcodeProps = DialogProps & DaumEmbedProps;

export default function DaumPostcode({
  onComplete,
  open,
  onOpenChange,
  ...props
}: DaumPostcodeProps) {
  const [scriptStatus, setScriptStatus] = useState<'' | 'ready'>('');

  return (
    <>
      <Script src={VARIABLES.DAUM_POSTCODE_URL} onLoad={() => setScriptStatus('ready')} />
      <Root open={open} onOpenChange={onOpenChange} {...props}>
        <Portal>
          <Overlay className='alert-backdrop' />
          <Content className='alert-content'>
            <DaumEmbed
              key={scriptStatus}
              onComplete={address => {
                onComplete?.(address);
                onOpenChange?.(false);
              }}
            />
          </Content>
        </Portal>
      </Root>
    </>
  );
}

function DaumEmbed({ onComplete }: DaumEmbedProps) {
  const ref = useRef<HTMLDivElement>(null);
  const called = useRef(false);

  useEffect(() => {
    if (called.current) return;
    if (!open) return;
    if (!ref.current) return;
    new window.daum.Postcode({
      width: '100%',
      height: '100%',
      oncomplete: onComplete,
    }).embed(ref.current);
    called.current = true;
  }, [onComplete]);

  return <div ref={ref} className='aspect-square' />;
}
