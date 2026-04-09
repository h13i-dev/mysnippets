/*global CollectionEntry*/

import { getCollection } from 'astro:content';
import { snippetsComponents, snippetsModules } from '@src/utils/frontmatter/getArticles';
import { getZennArticles } from '@src/utils/frontmatter/getZennArticles';

export const SnippetsFrontmatter = {
  modules: {
    heading: 'Modules',
    data: snippetsModules,
  },
  components: {
    heading: 'Components',
    data: snippetsComponents,
  },
};

export async function BlogFrontmatter() {
  // ブログを取得して日付の降順にソート
  const blogPosts = await getCollection('blog');
  const sortedBlogPosts = blogPosts.sort(
    (a: CollectionEntry, b: CollectionEntry) =>
      new Date(b.data.pubDate).getTime() - new Date(a.data.pubDate).getTime(),
  );
  const memoPosts = await getCollection('memo');
  const sortedMemoPosts = memoPosts.sort(
    (a: CollectionEntry, b: CollectionEntry) =>
      new Date(b.data.pubDate).getTime() - new Date(a.data.pubDate).getTime(),
  );

  // Zenn記事を実際のAPIから取得
  const zennArticles = await getZennArticles();

  const localNavigationData = {
    blog: {
      heading: 'ブログ',
      data: sortedBlogPosts,
      type: 'blog',
    },
    memo: {
      heading: 'メモ',
      data: sortedMemoPosts,
      type: 'memo',
    },
    zenn: {
      heading: 'Zenn記事',
      data: zennArticles,
      type: 'zenn',
    },
  };

  return localNavigationData;
}
