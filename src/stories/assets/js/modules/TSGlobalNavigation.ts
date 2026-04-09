interface Options {
  button: string; // トグルボタンのセレクター
  navigation: string; // グローバルナビゲーションのセレクター
  closeButton?: string; // 閉じるボタンのセレクター
  closeOnResize?: boolean; // windowリサイズ時にナビゲーションを閉じるかどうか
  excludeClose?: Array<string>; // クリックイベントを無視するエリアのセレクター
  focusTrap?: [string, string]; // フォーカストラップの最初と最後の要素のセレクター
  activeClass?: string; // アクティブ時に付与されるクラス名
}

import FocusTrap from '@assets/js/modules/FocusTrap.ts';

export default class GlobalNavigation {
  private options: Options;
  private btns!: HTMLElement[];
  private navigations!: HTMLElement[];
  private closeButtons!: HTMLElement[];
  private excludeCloseAreas!: Array<HTMLElement[]>;
  private focusTrap?: FocusTrap;
  private activeClass: string;

  constructor(options: Options) {
    this.options = options;
    this.activeClass = options.activeClass || 'is-active';

    this.initializeElements();
    if (!this.validateElements()) return;

    this.init();
    this.addEventListeners();
  }

  private initializeElements(): void {
    this.btns = Array.from(document.querySelectorAll(this.options.button));
    this.navigations = Array.from(document.querySelectorAll(this.options.navigation));
    this.closeButtons = this.options.closeButton
      ? Array.from(document.querySelectorAll(this.options.closeButton))
      : [];
    this.excludeCloseAreas = this.options.excludeClose
      ? this.options.excludeClose.map((selector) => Array.from(document.querySelectorAll(selector)))
      : [];
    this.focusTrap = this.options.focusTrap ? new FocusTrap() : undefined;
  }

  private validateElements(): boolean {
    if (this.navigations.length === 0) {
      console.warn(`No navigation elements found: ${this.options.navigation}`);
      return false;
    }
    if (this.btns.length === 0) {
      console.warn(`No button elements found: ${this.options.button}`);
      return false;
    }
    return true;
  }

  private init() {
    this.btns.forEach((btn) => {
      btn.setAttribute('aria-expanded', 'false');
    });

    this.navigations.forEach((navigation) => {
      navigation.setAttribute('aria-hidden', 'true');
    });
  }

  private addEventListeners() {
    this.btns.forEach((btn, index) => {
      btn.addEventListener('click', (e) => {
        this.handleButtonClick(e, index);
      });
    });

    // 閉じるボタンのクリックイベント
    this.closeButtons.forEach((closeBtn) => {
      closeBtn.addEventListener('click', (e) => {
        this.handleCloseButtonClick(e);
      });
    });

    // ナビゲーション要素のクリックイベント
    this.navigations.forEach((navigation) => {
      navigation.addEventListener('click', this.handleNavigationClick.bind(this));
    });

    document.addEventListener('click', this.handleDocumentClick.bind(this));
    document.addEventListener('keydown', this.handleKeyDown.bind(this));

    if (this.options.closeOnResize) {
      window.addEventListener('resize', this.handleResize.bind(this));
    }
  }

  private handleButtonClick(e: Event, index: number) {
    e.stopPropagation();
    const navigation = this.navigations[index];
    const btn = e.currentTarget as HTMLElement;

    // グローバルナビゲーションの状態をチェック
    const isNavigationActive = navigation.classList.contains(this.activeClass);

    if (isNavigationActive) {
      this.deactivate();
    } else {
      this.deactivate();
      this.activate(navigation, btn);
    }
  }

  private handleNavigationClick(e: Event) {
    if (!this.isInstanceActive()) return;

    // 除外エリアのクリックは無視
    if (this.shouldIgnoreClick(e.target as HTMLElement)) return;

    // ナビゲーション内のリンクやボタンをクリックした場合は閉じる
    const target = e.target as HTMLElement;
    if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('a, button')) {
      this.deactivate();
    }
  }

  private handleDocumentClick(e: Event) {
    if (!this.isInstanceActive()) return;

    // ボタンクリックは handleButtonClick で処理するため除外
    if (Array.from(this.btns).some((btn) => btn.contains(e.target as HTMLElement))) return;

    // ナビゲーション内のクリックは handleNavigationClick で処理するため除外
    for (const navigation of this.navigations) {
      if (navigation.contains(e.target as HTMLElement)) return;
    }

    this.deactivate();
  }

  private handleKeyDown(e: KeyboardEvent) {
    if (!this.isInstanceActive()) return;
    if (e.key === 'Escape') {
      e.stopPropagation();
      this.deactivate();
    }
  }

  private handleCloseButtonClick(e: Event) {
    e.stopPropagation();
    this.deactivate();
  }

  private handleResize() {
    if (!this.isInstanceActive()) return;
    this.deactivate();
  }

  private activate(navigation: HTMLElement, btn: HTMLElement) {
    btn.classList.add(this.activeClass);
    btn.setAttribute('aria-expanded', 'true');

    navigation.classList.add(this.activeClass);
    navigation.setAttribute('aria-hidden', 'false');

    if (this.focusTrap && this.options.focusTrap) {
      // 単一ナビゲーション要素の場合は直接セレクターを使用、複数の場合はアクティブなもののみ
      if (this.navigations.length === 1) {
        this.focusTrap.addFocusTrap(this.options.focusTrap[0], this.options.focusTrap[1]);
      } else {
        const firstSelector = `${this.options.navigation}.${this.activeClass} ${this.options.focusTrap[0]}`;
        const lastSelector = `${this.options.navigation}.${this.activeClass} ${this.options.focusTrap[1]}`;
        this.focusTrap.addFocusTrap(firstSelector, lastSelector);
      }
    }
  }

  private deactivate(
    btns: HTMLElement[] = this.btns,
    navigations: HTMLElement[] = this.navigations,
  ) {
    btns.forEach((btn) => {
      btn.classList.remove(this.activeClass);
      btn.setAttribute('aria-expanded', 'false');
    });

    navigations.forEach((navigation) => {
      navigation.classList.remove(this.activeClass);
      navigation.setAttribute('aria-hidden', 'true');
    });

    if (this.focusTrap && this.options.focusTrap) {
      // 単一ナビゲーション要素の場合は直接セレクターを使用、複数の場合はアクティブなもののみ
      if (this.navigations.length === 1) {
        this.focusTrap.removeFocusTrap(this.options.focusTrap[0], this.options.focusTrap[1]);
      } else {
        const firstSelector = `${this.options.navigation}.${this.activeClass} ${this.options.focusTrap[0]}`;
        const lastSelector = `${this.options.navigation}.${this.activeClass} ${this.options.focusTrap[1]}`;
        this.focusTrap.removeFocusTrap(firstSelector, lastSelector);
      }
    }
  }

  private isInstanceActive(): boolean {
    return Array.from(this.navigations).some((navigation) =>
      navigation.classList.contains(this.activeClass),
    );
  }

  private shouldIgnoreClick(target: HTMLElement): boolean {
    return this.excludeCloseAreas.some((areaNodeList) =>
      Array.from(areaNodeList).some((area) => area.contains(target)),
    );
  }
}
