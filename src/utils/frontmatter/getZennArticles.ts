export interface ZennArticle {
  id: number;
  title: string;
  slug: string;
  path: string;
  published_at: string;
  body_updated_at: string;
  emoji: string;
  body_letters_count: number;
  article_type: string;
  liked_count: number;
  bookmarked_count: number;
  comments_count: number;
  user: {
    id: number;
    username: string;
    name: string;
    avatar_small_url: string;
  };
}

export interface ZennResponse {
  articles: ZennArticle[];
  next_page: number | null;
  total_count: number;
}

export async function getZennArticles(
  username: string = 'kg98ztd',
  order: string = 'latest',
): Promise<ZennArticle[]> {
  try {
    const response = await fetch(
      `https://zenn.dev/api/articles?username=${username}&order=${order}`,
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: ZennResponse = await response.json();
    return data.articles;
  } catch (error) {
    console.error('Error fetching Zenn articles:', error);
    return [];
  }
}
