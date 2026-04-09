// *************************************************
// ビューポートの最小値設定
// *************************************************
/**
 * 最小値以下の場合は、画面を固定縮小する
 * @param viewportContent - ビューポートのコンテンツ
 * @param minWidth - 最小幅（単位不要）
 *
 * 使い方：
 * resizeViewportContent('width=device-width, initial-scale=1, minimum-scale=1'); // headのmeta viewportと同じ値を入れる
 */

export default function resizeViewportContent(
  viewportContent: string,
  minWidth: number = 374,
): void {
  const viewport = document.querySelector('meta[name="viewport"]');

  function switchViewport(): void {
    if (!viewport) return;

    const value: string =
      window.outerWidth > minWidth ? viewportContent : `width=${minWidth.toString()}`;
    if (viewport.getAttribute('content') !== value) {
      viewport.setAttribute('content', value);
    }
  }

  switchViewport();
  addEventListener('resize', switchViewport);
}
