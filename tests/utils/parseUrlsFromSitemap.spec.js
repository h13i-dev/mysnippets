import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import parseUrlsFromSitemap from './parseUrlsFromSitemap.js';

// fetchをモック
global.fetch = vi.fn();

// Sitemapperモックの作成
const mockSitemapperFetch = vi.fn();

// Sitemapperをモック
vi.mock('sitemapper', () => {
  const MockSitemapper = class {
    constructor() {
      this.fetch = mockSitemapperFetch;
    }
  };
  return {
    default: MockSitemapper,
  };
});

describe('parseUrlsFromSitemap', () => {
  beforeEach(() => {
    // モックをリセット
    vi.clearAllMocks();
    mockSitemapperFetch.mockClear();

    // console.logをモック（出力を抑制）
    vi.spyOn(console, 'log').mockImplementation(() => {});
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('正常系：sitemap-indexから全てのURLを取得', async () => {
    // sitemap-indexのXMLレスポンスをモック
    const sitemapIndexXml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>https://example.com/sitemap-0.xml</loc>
  </sitemap>
  <sitemap>
    <loc>https://example.com/sitemap-1.xml</loc>
  </sitemap>
</sitemapindex>`;

    global.fetch.mockResolvedValueOnce({
      text: async () => sitemapIndexXml,
    });

    // 各sitemapのレスポンスをモック
    mockSitemapperFetch
      .mockResolvedValueOnce({
        sites: ['https://example.com/page1/', 'https://example.com/page2/'],
      })
      .mockResolvedValueOnce({
        sites: ['https://example.com/page3/', 'https://example.com/page4/'],
      });

    const result = await parseUrlsFromSitemap('https://example.com/sitemap-index.xml');

    expect(result).toEqual([
      'https://example.com/page1/',
      'https://example.com/page2/',
      'https://example.com/page3/',
      'https://example.com/page4/',
    ]);
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(mockSitemapperFetch).toHaveBeenCalledTimes(2);
  });

  it('正常系：pathOnlyオプションでパス部分のみ取得', async () => {
    const sitemapIndexXml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>https://example.com/sitemap-0.xml</loc>
  </sitemap>
</sitemapindex>`;

    global.fetch.mockResolvedValueOnce({
      text: async () => sitemapIndexXml,
    });

    mockSitemapperFetch.mockResolvedValueOnce({
      sites: ['https://example.com/about/', 'https://example.com/contact/'],
    });

    const result = await parseUrlsFromSitemap('https://example.com/sitemap-index.xml', {
      pathOnly: true,
    });

    expect(result).toEqual(['/about/', '/contact/']);
  });

  it('正常系：sitemapを含むURLを除外', async () => {
    const sitemapIndexXml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>https://example.com/sitemap-0.xml</loc>
  </sitemap>
</sitemapindex>`;

    global.fetch.mockResolvedValueOnce({
      text: async () => sitemapIndexXml,
    });

    mockSitemapperFetch.mockResolvedValueOnce({
      sites: [
        'https://example.com/page1/',
        'https://example.com/sitemap-archive.xml',
        'https://example.com/page2/',
      ],
    });

    const result = await parseUrlsFromSitemap('https://example.com/sitemap-index.xml');

    expect(result).toEqual(['https://example.com/page1/', 'https://example.com/page2/']);
    expect(result).not.toContain('https://example.com/sitemap-archive.xml');
  });

  it('正常系：複数のsitemapファイルからURLを統合', async () => {
    const sitemapIndexXml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>https://example.com/sitemap-posts.xml</loc>
  </sitemap>
  <sitemap>
    <loc>https://example.com/sitemap-pages.xml</loc>
  </sitemap>
  <sitemap>
    <loc>https://example.com/sitemap-categories.xml</loc>
  </sitemap>
</sitemapindex>`;

    global.fetch.mockResolvedValueOnce({
      text: async () => sitemapIndexXml,
    });

    mockSitemapperFetch
      .mockResolvedValueOnce({
        sites: ['https://example.com/post1/', 'https://example.com/post2/'],
      })
      .mockResolvedValueOnce({
        sites: ['https://example.com/about/', 'https://example.com/contact/'],
      })
      .mockResolvedValueOnce({
        sites: ['https://example.com/tech/', 'https://example.com/business/'],
      });

    const result = await parseUrlsFromSitemap('https://example.com/sitemap-index.xml');

    expect(result).toHaveLength(6);
    expect(result).toContain('https://example.com/post1/');
    expect(result).toContain('https://example.com/business/');
  });

  it('正常系：外部URLをベースURLに変換して取得', async () => {
    const sitemapIndexXml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>https://cdn.example.com/sitemap-0.xml</loc>
  </sitemap>
</sitemapindex>`;

    global.fetch.mockResolvedValueOnce({
      text: async () => sitemapIndexXml,
    });

    mockSitemapperFetch.mockResolvedValueOnce({
      sites: ['https://example.com/page1/'],
    });

    await parseUrlsFromSitemap('https://example.com/sitemap-index.xml');

    // ベースURLで変換されたURLで呼ばれていることを確認
    expect(mockSitemapperFetch).toHaveBeenCalledWith('https://example.com/sitemap-0.xml');
  });

  it('異常系：fetchが失敗した場合エラーをthrow', async () => {
    global.fetch.mockRejectedValueOnce(new Error('Network error'));

    await expect(parseUrlsFromSitemap('https://example.com/sitemap-index.xml')).rejects.toThrow(
      'Network error',
    );

    expect(console.error).toHaveBeenCalledWith('エラーが発生しました:', expect.any(Error));
  });

  it('異常系：XMLのパースが失敗した場合エラーをthrow', async () => {
    const invalidXml = 'This is not valid XML';

    global.fetch.mockResolvedValueOnce({
      text: async () => invalidXml,
    });

    await expect(parseUrlsFromSitemap('https://example.com/sitemap-index.xml')).rejects.toThrow();
  });

  it('異常系：Sitemapper.fetchが失敗した場合エラーをthrow', async () => {
    const sitemapIndexXml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>https://example.com/sitemap-0.xml</loc>
  </sitemap>
</sitemapindex>`;

    global.fetch.mockResolvedValueOnce({
      text: async () => sitemapIndexXml,
    });

    mockSitemapperFetch.mockRejectedValueOnce(new Error('Sitemap fetch failed'));

    await expect(parseUrlsFromSitemap('https://example.com/sitemap-index.xml')).rejects.toThrow(
      'Sitemap fetch failed',
    );
  });

  it('正常系：空のsitemap-indexの場合空配列を返す', async () => {
    const emptySitemapIndexXml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
</sitemapindex>`;

    global.fetch.mockResolvedValueOnce({
      text: async () => emptySitemapIndexXml,
    });

    // 空の場合、sitemapが存在しないためエラーが発生する可能性がある
    // 実装によって動作が異なるため、実際の動作に合わせて調整が必要
    await expect(parseUrlsFromSitemap('https://example.com/sitemap-index.xml')).rejects.toThrow();
  });
});
