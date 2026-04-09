/**
 * スクロールバーの幅を取得して、カスタムプロパティにセット
 */
export function setScrollbarWidth() {
  const updateScrollbarWidth = () => {
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    // カスタムプロパティの値を更新する
    document.documentElement.style.setProperty(
      '--scrollbar-width',
      `${scrollbarWidth.toString()}px`,
    );
  };

  updateScrollbarWidth();
  window.addEventListener('resize', updateScrollbarWidth); // リサイズしたとき
}

/**
 * ビューポートの高さを取得して、カスタムプロパティにセット
 */
export function setInnerHeight() {
  const updateScrollbarWidth = () => {
    const innerHeight = window.innerHeight;
    // カスタムプロパティの値を更新する
    document.documentElement.style.setProperty('--inner-height', `${innerHeight.toString()}px`);
  };

  updateScrollbarWidth();
  window.addEventListener('resize', updateScrollbarWidth); // リサイズしたとき
}

/**
 * ヘッダーの高さを取得して、カスタムプロパティにセット
 */
export function setHeaderHeight() {
  const updateHeaderHeight = () => {
    const header = document.querySelector('header');
    if (header)
      document.documentElement.style.setProperty(
        '--header-height',
        `${header.offsetHeight.toString()}px`,
      );
  };

  updateHeaderHeight();
  window.addEventListener('resize', updateHeaderHeight); // リサイズしたとき
}

/**
 * フッターの高さを取得して、カスタムプロパティにセット
 */
export function setFooterHeight() {
  const updateFooterHeight = () => {
    const footer = document.querySelector('footer');
    if (footer)
      document.documentElement.style.setProperty(
        '--footer-height',
        `${footer.offsetHeight.toString()}px`,
      );
  };

  updateFooterHeight();
  window.addEventListener('resize', updateFooterHeight); // リサイズしたとき
}
