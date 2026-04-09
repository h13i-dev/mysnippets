async function copyToClipboard(): Promise<boolean> {
  const url = window.location.href;
  if (navigator.clipboard && navigator.clipboard.writeText) {
    try {
      await navigator.clipboard.writeText(url);
      console.log('コピー成功');
      return true;
    } catch (err) {
      console.error('コピー失敗:', err);
      return false;
    }
  }
  return false;
}

export default function copyLink(selector: string, callback: (success: boolean) => void): void {
  const element = document.querySelector(selector);
  if (element) {
    element.addEventListener('click', () => {
      void (async () => {
        const result = await copyToClipboard();
        callback(result);
      })();
    });
  }
}
