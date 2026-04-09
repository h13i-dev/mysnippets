// *************************************************
// SPのみ電話を有効にする
// *************************************************
export default function setupTelLinks() {
  const isMobile = /iPhone|iPod|Android|Mobile/.test(window.navigator.userAgent);
  const tabindex = isMobile ? null : '-1';

  const telLinks = document.querySelectorAll('a[href^="tel:"]');

  telLinks.forEach((link) => {
    if (tabindex !== null) {
      link.setAttribute('tabindex', tabindex);
      (link as HTMLElement).style.pointerEvents = 'none';
    }
  });
}
