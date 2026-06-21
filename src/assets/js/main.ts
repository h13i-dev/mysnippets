import GlobalNavigation from '@assets/js/modules/GlobalNavigation.ts';
import checkScrollbar from '@assets/js/modules/utils/checkScrollbar.ts';
import {
  setHeaderHeight,
  setInnerHeight,
  setScrollbarWidth,
} from '@assets/js/modules/utils/SetCustomProperties';
import twemoji from '@twemoji/api';

/**
 * Apple OSかどうかを判定する
 * @returns {boolean} Apple OSの場合はtrue
 */
export function isAppleOS() {
  const userAgent = navigator.userAgent;
  return /Mac|iPhone|iPad|iPod/.test(userAgent);
}

export function generateInternalLink(linkText: string) {
  const internalText = linkText.trim().replace(/\s+/g, '-').toLowerCase();
  return encodeURIComponent(internalText);
}

export function addHeadingLink() {
  const headings = document.querySelectorAll('.p-heading-lv1, .p-heading-lv2, .p-heading-lv3');
  const markdownHeadings = document.querySelectorAll(
    '.markdown-contents h2, .markdown-contents h3, .markdown-contents h4',
  );

  const allHeadings = [...headings, ...markdownHeadings];

  if (allHeadings.length) {
    allHeadings.forEach((heading) => {
      // 見出しにリンク追加を除外する条件
      if (heading.getAttribute('data-progress') === 'false') return;
      if (heading.closest('dialog')) return;
      if (heading.querySelector('a')) return;

      // 見出しのテキストを取得し、リンクを生成
      const headingText = heading.textContent || '';
      const link = document.createElement('a');
      link.href = `#${generateInternalLink(headingText)}`;
      link.className = 'p-heading-internal-link';
      link.setAttribute('aria-hidden', 'true');
      link.setAttribute('tabindex', '-1');

      heading.innerHTML = '';
      heading.appendChild(link);
      heading.appendChild(document.createTextNode(headingText));
    });
  }
}

/**
 * 特定の要素内の絵文字をTwemojiに変換（OS判定付き）
 * @param {HTMLElement} element - 対象の要素
 * @param {Object} options - Twemojiのオプション
 */
export function parseTwemoji(element: HTMLElement, options = {}) {
  // Apple OSの場合は何もしない（ネイティブ絵文字を使用）
  if (isAppleOS()) return element;

  const defaultOptions = {
    folder: 'svg',
    ext: '.svg',
    className: 'emoji',
    ...options,
  };

  return twemoji.parse(element, defaultOptions);
}

/**
 * ページ全体のTwemoji設定を初期化
 */
export function initTwemojiSettings() {
  const shouldUseTwemoji = !isAppleOS();
  document.body.setAttribute('data-use-twemoji', shouldUseTwemoji.toString());

  return shouldUseTwemoji;
}

/**
 * 記事タイトルや見出しの絵文字をTwemojiに変換
 */
export function initTitleEmoji() {
  // 記事タイトル、見出し、カードタイトルの絵文字を変換
  const selectors = [
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    '.p-contents-title',
    '.p-heading-lv2',
    '.p-heading-lv3',
    '.p-heading-lv4',
    '.p-heading-lv5',
    '[data-emoji="true"]',
  ];

  selectors.forEach((selector) => {
    const elements = document.querySelectorAll(selector);
    elements.forEach((element) => {
      parseTwemoji(element as HTMLElement, {
        className: 'emoji emoji--title',
      });
    });
  });
}

/**
 * グローバルナビゲーションのオーバーフローコンテンツを制御
 */
export function overflowContent() {
  const header = document.querySelector('header');
  const gnav = document.querySelector('#gnav');

  if (!header || !gnav) return;

  if (window.innerHeight - header.offsetHeight > gnav.scrollHeight) {
    gnav.classList.remove('is-overflow');
  } else {
    gnav.classList.add('is-overflow');
  }
}

/**
 * オーバーフローコンテンツの初期化
 */
function initOverflowContent() {
  const gnav = document.querySelector('#gnav');
  if (!gnav) return;

  // ポップオーバーを開いたときに判定を実行
  gnav.addEventListener('toggle', (e: Event) => {
    const event = e as ToggleEvent;
    if (event.newState === 'open') overflowContent();
  });

  // ポップオーバーが開いている状態でリサイズされたときに再判定
  window.addEventListener('resize', () => {
    if (gnav.matches(':popover-open')) overflowContent();
  });
}

/**
 * スクリプト読み込み直後に実行する初期化処理
 */
function init() {
  checkScrollbar();
  initTwemojiSettings();
  setScrollbarWidth();
  setInnerHeight();
  setHeaderHeight();
  addHeadingLink();
  initTitleEmoji();
  initOverflowContent();

  new GlobalNavigation({
    button: '.js-gnavSpBtn',
    focusTrap: ['#gnav-btn', '.js-gnav-end'],
    breakpoint: 'lg', // 1024px以上で無効化
  });
}

init();
