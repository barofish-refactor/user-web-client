export const VARIABLES = {
  /** 백엔드 api 주소 */
  get END_POINT() {
    const endpoint = process.env.NEXT_PUBLIC_END_POINT;
    if (!endpoint) throw new Error('엔드포인트가 설정이 안되었습니다.');
    return endpoint;
  },
  SOCKET_URL: `ws${
    process.env.NEXT_PUBLIC_END_POINT.match(/https:\/\//) ? 's' : ''
  }://${process.env.NEXT_PUBLIC_END_POINT.replace(/https?:\/\//, '')}`,
  /** accessToken 이름 */
  ACCESS_TOKEN: 'barofish-atk',
  /** refreshToken 이름 */
  REFRESH_TOKEN: 'barofish-rtk',
  TOKEN_MAX_AGE: 70,
  // 60 * 60 * 24 * 7, // 7 days

  DAUM_POSTCODE_URL: '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js',
  IS_MASTER:
    process.env.NODE_ENV === 'development'
      ? false
      : process.env.NEXT_PUBLIC_PRODUCTION_ENV === 'master',
  PRODUCTION_URL:
    process.env.NEXT_PUBLIC_PRODUCTION_ENV === 'master'
      ? 'https://barofish.com'
      : 'https://dev.barofish.com',
};
