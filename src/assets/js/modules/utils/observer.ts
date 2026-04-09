interface ObserverOptions {
  selector: string; // 対象のセレクター
  activeClass?: string; // 付与するクラス名
  unobserve?: boolean; // 一度クラスを付与した後に監視を停止するかどうか
  root?: HTMLElement | null; // ルート要素
  rootMargin?: string; // ルートのマージン
  threshold?: number; // 交差の閾値
}

export default function observer(options: ObserverOptions): void {
  const {
    selector,
    activeClass = 'is-active',
    unobserve = true,
    root = null,
    rootMargin = '0px',
    threshold = 0.1,
  } = options;

  let observerInstance: IntersectionObserver;

  const observerCallback = (entries: IntersectionObserverEntry[]): void => {
    entries.forEach((entry) => {
      const { target, isIntersecting } = entry;

      if (isIntersecting) {
        target.classList.add(activeClass);
        if (unobserve) observerInstance.unobserve(target); // 修正
      } else {
        target.classList.remove(activeClass);
      }
    });
  };

  const observerConfig: IntersectionObserverInit = {
    root,
    rootMargin,
    threshold,
  };

  observerInstance = new IntersectionObserver(observerCallback, observerConfig);
  const elements = document.querySelectorAll(selector);

  elements.forEach((element) => {
    observerInstance.observe(element);
  });
}
