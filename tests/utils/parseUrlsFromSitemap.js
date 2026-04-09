import Sitemapper from 'sitemapper';
import { parseStringPromise } from 'xml2js';

/**
 * sitemap-indexから全てのURLを取得する
 * @param {string} sitemapIndexUrl - sitemap-indexのURL
 * @param {Object} options - オプション
 * @param {boolean} options.pathOnly - trueの場合、パス部分のみを返す（例: https://example.com/about/ → /about/）
 * @returns {Promise<string[]>} - ページURLまたはパスの配列
 */
async function parseUrlsFromSitemap(sitemapIndexUrl, options = {}) {
  const { pathOnly = false } = options;
  const sitemap = new Sitemapper();

  try {
    // sitemap-indexを取得
    const indexResponse = await fetch(sitemapIndexUrl);
    const indexXml = await indexResponse.text();
    const indexResult = await parseStringPromise(indexXml);

    // sitemap-index内の全てのsitemapのURLを取得
    const sitemapUrls = indexResult.sitemapindex.sitemap.map((s) => s.loc[0]);

    console.log(`${sitemapUrls.length}個のsitemapファイルを検出しました。`);

    // sitemapIndexUrlからベースURLを取得
    const baseUrl = new URL(sitemapIndexUrl);
    const sitemapBaseUrl = `${baseUrl.protocol}//${baseUrl.host}`;

    // 各sitemapからURLを取得（並列処理）
    const urlArrays = await Promise.all(
      sitemapUrls.map(async (sitemapUrl) => {
        // 外部URLをsitemapIndexUrlと同じホストに変換
        const filename = sitemapUrl.split('/').pop();
        const localhostUrl = `${sitemapBaseUrl}/${filename}`;

        console.log(`取得中: ${localhostUrl}`);

        const { sites } = await sitemap.fetch(localhostUrl);
        return sites;
      }),
    );

    // 全てのURLを統合
    const allUrls = urlArrays.flat();

    // sitemap を含まないURL（実際のページURL）のみ抽出
    let pageUrls = allUrls.filter((url) => !url.includes('sitemap'));

    // pathOnlyオプションが有効な場合、パス部分のみを抽出
    if (pathOnly) {
      pageUrls = pageUrls.map((url) => {
        const urlObj = new URL(url);
        return urlObj.pathname;
      });
    }

    return pageUrls;
  } catch (error) {
    if (error.cause?.code === 'ECONNREFUSED') {
      const baseUrl = new URL(sitemapIndexUrl);
      throw new Error(`\x1b[31m${baseUrl.origin} に接続できませんでした。\x1b[0m`);
    }
    console.error('エラーが発生しました:', error);
    throw error;
  }
}

export default parseUrlsFromSitemap;
