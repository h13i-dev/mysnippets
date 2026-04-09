// *************************************************
// Blank Link
// *************************************************
/**
 * 仕様
 * ドメインが同じ + target付き → そのまま
 * ドメインが同じ + targetなし → そのまま（一般的な仕様）
 * ドメインが違う + target付き → そのまま（一般的な仕様）
 * ドメインが違う + targetなし → target="_blank" 付与
 */
export default function addBlank(options = { exclude: [] }) {
  if (options.exclude.length && options.exclude.some((path) => location.pathname.startsWith(path)))
    return;

  const aTags = document.querySelectorAll('a');
  const officeExtensions = ['.pdf', '.xls', '.xlsx', '.doc', '.docx'];

  aTags.forEach((aTag) => {
    /**
     * 条件
     * href属性がある
     * 現在表示しているドメイと、設定リンクのドメインが違う
     * targetが設定されていない
     * 拡張子が指定したものの場合
     */
    // prettier-ignore
    if (
      aTag.hasAttribute('href') &&
      aTag.target === '' &&
      (location.origin !== aTag.origin || officeExtensions.some(ext => aTag.href.endsWith(ext)))
    ) {
      aTag.target = '_blank';
    }
  });
}
