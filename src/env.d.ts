/// <reference types="astro/client" />

/**
 * SVGファイルのモジュール型定義
 */
declare module '*.svg' {
  const content: string;
  export default content;
}

/**
 * 記事Frontmatterの型定義
 */
interface Frontmatter {
  title: string; // 記事のタイトル
  description: string; // 記事の説明
  order?: number; // 記事の表示順
}

/**
 * 記事のデータ型定義
 */
interface ArticleData {
  readonly frontmatter: Frontmatter;
  default: {
    isAstroComponentFactory: boolean;
    moduleId: string;
    propagation: undefined | unknown;
  };
  readonly file: string;
  readonly url: string;
  [key: string]: unknown;
}

interface Articles {
  [key: string]: ArticleData;
}

/**
 * ブログ・メモコレクションのデータ型定義
 */
interface CollectionData {
  icon?: string;
  title: string;
  description: string;
  pubDate: Date;
  updatedDate?: Date;
  tags?: string[];
  draft: boolean;
}

interface CollectionEntry {
  id: string;
  slug: string;
  body: string;
  collection: string;
  data: CollectionData;
}
