/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://barofish.com',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    // 정책 설정
    policies: [
      {
        userAgent: '*', // 모든 agent 허용
        allow: '/', // 모든 페이지 주소 크롤링 허용
        disallow: [
          '/exclude', // exclude로 시작하는 페이지 주소 크롤링 금지
        ],
      },
      // 추가 정책이 필요할 경우 배열 요소로 추가 작성
    ],
  }, // robots.txt 옵션 설정
};
