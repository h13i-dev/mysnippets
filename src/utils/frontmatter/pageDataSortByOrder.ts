/*global Articles, ArticleData*/

export function pageDataSortByOrder(pages: Articles) {
  return Object.values(pages).sort((a, b) => {
    const orderA = a.frontmatter?.order ?? 0;
    const orderB = b.frontmatter?.order ?? 0;

    if (orderA !== orderB) {
      return orderA - orderB;
    }

    const titleA = a.frontmatter?.title || '';
    const titleB = b.frontmatter?.title || '';
    return titleA.localeCompare(titleB, 'ja');
  });
}
