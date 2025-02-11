export default function robots() {
  const baseUrl = 'https://bdyana.com';
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/private/',
    },
    sitemap: ` ${baseUrl}/sitemap.xml`,
  };
}
