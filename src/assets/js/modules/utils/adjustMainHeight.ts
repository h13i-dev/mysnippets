// *************************************************
// mainの高さ調整（main内のコンテントの高さが少ない場合に調整する）
// *************************************************
export default function adjustMainHeight() {
  const main = document.querySelector('main');
  const headerHeight = document.querySelector('header')?.clientHeight;
  const footerHeight = document.querySelector('footer')?.clientHeight;

  if (main && headerHeight !== undefined && footerHeight !== undefined) {
    const windowHeight = window.innerHeight;
    const minHeight = windowHeight - headerHeight - footerHeight;
    main.style.minHeight = `${minHeight.toString()}px`;
  }
}
