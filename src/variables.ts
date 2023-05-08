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
  ACCESS_TOKEN: 'atk',
  /** refreshToken 이름 */
  REFRESH_TOKEN: 'rtk',
  TOKEN_MAX_AGE: 60 * 60 * 24 * 7, // 7 days
};
