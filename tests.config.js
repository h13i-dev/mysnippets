import parseUrlsFromSitemap from './tests/utils/parseUrlsFromSitemap.js';

const site = 'http://localhost:4000/';

// sitemapからページURLを取得
const sitemapUrl = new URL('sitemap-index.xml', site).href;
const pages = await parseUrlsFromSitemap(sitemapUrl, { pathOnly: true });

const config = {
  site,
  pages,
  axeOptions: {
    // tags: https://www.deque.com/axe/core-documentation/api-documentation/#axe-core-tags
    withTags: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'],
    disableRules: [],
  },
};

if (process.argv.includes('--dry-run') || process.argv.includes('-d')) {
  console.log(JSON.stringify(config.pages, null, 2), `${config.pages.length} pages found`);
}

export default config;
