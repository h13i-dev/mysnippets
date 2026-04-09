/**
 * URLを正規化して一貫した形式に変換する
 * @param url 正規化するURL
 * @returns 正規化されたURL（末尾にスラッシュを付加し、index.htmlを削除）
 */
export function normalizePath(url: string): string {
  return url.replace(/index\.html$/, '').replace(/\/?$/, '/');
}
