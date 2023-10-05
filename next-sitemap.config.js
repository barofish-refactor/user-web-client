/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_END_POINT || 'https://barofish.com',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [{ userAgent: '*', allow: '/' }],
    additionalSitemaps: [`${process.env.SITE_URL || 'https://barofish.com'}server-sitemap.xml`],
  },
};
