/*global Articles, ArticleData*/
import { normalizePath } from '@src/utils/frontmatter/normalizePath';

/**
 * ページ情報を取得する
 */
export function getArticleData(href: string, articles: Articles): ArticleData | null {
  const article = Object.values(articles).find(
    (article) => normalizePath(article.url) === normalizePath(href),
  );
  return article || null;
}
