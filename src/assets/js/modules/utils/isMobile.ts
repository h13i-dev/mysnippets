// *************************************************
// モバイル実機の判定
// *************************************************
export default function isMobile(): string {
  // 全てのクラスを初期化
  document.documentElement.classList.remove('is-mobile', 'is-ios', 'is-android');
  const ua = window.navigator.userAgent;

  // ユーザーエージェントに応じてクラスを追加
  if (ua.match(/iPhone|iPod/)) {
    // iOSの場合
    document.documentElement.classList.add('is-mobile', 'is-ios');
    return 'is-mobile is-ios';
  } else if (ua.match(/Android/)) {
    // Androidの場合
    document.documentElement.classList.add('is-mobile', 'is-android');
    return 'is-mobile is-android';
  } else if (ua.match(/Mobile/)) {
    // その他のモバイル端末の場合
    document.documentElement.classList.add('is-mobile');
    return 'is-mobile';
  }
  return '';
}
