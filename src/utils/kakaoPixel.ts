export const KAKAO_TRACKING_ID = process.env.NEXT_PUBLIC_KAKAO_PIXEL_ID;
declare global {
  interface Window {
    kakaoPixel?: (command: string, ...args: any[]) => void;
  }
}
export const pageview = (url: URL) => {
  if (typeof window.kakaoPixel === 'function' && KAKAO_TRACKING_ID) {
    if (!KAKAO_TRACKING_ID) return;
    window.kakaoPixel('config', KAKAO_TRACKING_ID, {
      page_path: url,
    });
  }
};
