export const KAKAO_TRACKING_ID = process.env.NEXT_PUBLIC_KAKAO_PIXEL_ID;
declare global {
  interface Window {
    kakaoPixel?: (command: string, ...args: any[]) => any;
  }
}
