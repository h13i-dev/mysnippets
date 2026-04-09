// アコーディオンのオプション設定
interface AccordionOptions {
  duration: number; // アニメーション時間（ミリ秒）
  easing: string; // イージング関数
}

// アニメーション時の状態を定義
interface AnimationState extends Partial<Record<string, string | number>> {
  height: string | number;
  opacity: number;
  marginTop: string | number;
  marginBottom: string | number;
  paddingTop: string | number;
  paddingBottom: string | number;
}

export default class Accordion {
  // デフォルト設定
  private readonly defaultOptions: AccordionOptions = {
    duration: 150,
    easing: 'ease-out',
  };

  constructor(selector?: string, options?: Partial<AccordionOptions>) {
    this.init(selector, options);
  }

  /**
   * アコーディオンの初期化
   * セレクタ指定のみ対応
   */
  private init(selector?: string, options?: Partial<AccordionOptions>): void {
    const globalConfig: AccordionOptions = { ...this.defaultOptions, ...options };

    // セレクタ指定がある場合の処理
    if (selector) {
      const accordionElements = document.querySelectorAll(selector);
      accordionElements.forEach((accordionElement) => {
        if (!(accordionElement instanceof HTMLDetailsElement)) return;

        const summary = accordionElement.querySelector('summary');
        if (!summary) return;

        summary.addEventListener('click', (event) => {
          this.handleAccordionClick(event, accordionElement, globalConfig);
        });
      });
    }
  }

  /**
   * アコーディオンのクリックイベント処理
   */
  private handleAccordionClick(
    event: MouseEvent,
    detailsElement: HTMLDetailsElement,
    options: AccordionOptions,
  ): void {
    const target = event.target as HTMLElement;
    // リンク要素の場合は通常の動作を許可
    if (target.tagName === 'A') return;

    event.preventDefault();

    // アニメーション中は処理をスキップ
    if (this.isAnimating(detailsElement)) return;

    const contentElement = this.getContentElement(detailsElement);
    if (!contentElement) return;

    // 現在の状態に応じて開閉処理を実行
    if (detailsElement.open) {
      this.closeAccordion(detailsElement, contentElement, options);
    } else {
      this.openAccordion(detailsElement, contentElement, options);
    }
  }

  /**
   * アニメーション実行中かチェック
   */
  private isAnimating(detailsElement: HTMLDetailsElement): boolean {
    return detailsElement.dataset.animStatus === 'running';
  }

  /**
   * アコーディオンのコンテンツ要素を取得
   */
  private getContentElement(detailsElement: HTMLDetailsElement): HTMLElement | null {
    const summary = detailsElement.querySelector('summary');
    return summary?.nextElementSibling as HTMLElement | null;
  }

  /**
   * アニメーション用の開く/閉じる状態を取得
   */
  private getAnimationStates(contentElement: HTMLElement): {
    open: AnimationState;
    close: AnimationState;
  } {
    const styles = window.getComputedStyle(contentElement);
    const { marginTop, marginBottom, paddingTop, paddingBottom } = styles;

    // 開いた状態のスタイル
    const open: AnimationState = {
      height: `${String(contentElement.offsetHeight)}px`,
      opacity: 1,
      marginTop,
      marginBottom,
      paddingTop,
      paddingBottom,
    };

    // 閉じた状態のスタイル
    const close: AnimationState = {
      height: 0,
      opacity: 0,
      marginTop: 0,
      marginBottom: 0,
      paddingTop: 0,
      paddingBottom: 0,
    };

    return { open, close };
  }

  /**
   * アコーディオンを閉じるアニメーション
   */
  private closeAccordion(
    detailsElement: HTMLDetailsElement,
    contentElement: HTMLElement,
    options: AccordionOptions,
  ): void {
    const { open, close } = this.getAnimationStates(contentElement);

    this.setAnimationStatus(detailsElement, 'running');
    detailsElement.classList.remove('open');

    const animation = contentElement.animate([open, close], {
      duration: options.duration,
      easing: options.easing,
    });

    animation.onfinish = () => {
      detailsElement.removeAttribute('open');
      this.setAnimationStatus(detailsElement, '');
    };
  }

  /**
   * アコーディオンを開くアニメーション
   */
  private openAccordion(
    detailsElement: HTMLDetailsElement,
    contentElement: HTMLElement,
    options: AccordionOptions,
  ): void {
    this.setAnimationStatus(detailsElement, 'running');
    detailsElement.setAttribute('open', 'true');

    const { open, close } = this.getAnimationStates(contentElement);
    // 開く際の高さを再計算
    open.height = `${String(contentElement.offsetHeight)}px`;

    detailsElement.classList.add('open');

    const animation = contentElement.animate([close, open], {
      duration: options.duration,
      easing: options.easing,
    });

    animation.onfinish = () => {
      this.setAnimationStatus(detailsElement, '');
    };
  }

  /**
   * アニメーション状態を設定
   */
  private setAnimationStatus(detailsElement: HTMLDetailsElement, status: string): void {
    detailsElement.dataset.animStatus = status;
  }
}
