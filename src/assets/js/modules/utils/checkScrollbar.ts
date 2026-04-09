// *************************************************
// スクロールバーの有無を判定
// *************************************************
export default function checkScrollbar(): void {
  function updateScrollbarClass(): void {
    const hasScrollbar = document.documentElement.scrollHeight > window.innerHeight;
    document.documentElement.classList.toggle('has-scrollbar', hasScrollbar);
  }

  updateScrollbarClass();
  window.addEventListener('resize', updateScrollbarClass);
}
