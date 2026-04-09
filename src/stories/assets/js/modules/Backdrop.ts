interface IOptions {
  button: string; // トグルボタンのセレクター
  backdrop: string; // オーバーレイのセレクター
  closeButton?: string; // 閉じるボタンのセレクター（オーバーレイ内にあるボタンを想定）
  closeOnResize?: boolean; // windowリサイズ時にオーバーレイを閉じるかどうか
  excludeClose?: Array<string>; // クリックイベントを無視するエリアのセレクター
  activeClass?: string; // アクティブ時に付与されるクラス名
}

export default class Backdrop {
  private options: IOptions;
  private btns!: HTMLElement[];
  private closeBtns!: HTMLElement[];
  private backdrop!: HTMLElement | null;
  private excludeCloseAreas!: Array<HTMLElement[]>;
  private activeClass: string;

  constructor(options: IOptions) {
    this.options = options;
    this.activeClass = options.activeClass || 'is-active';

    this.initializeElements();
    if (!this.validateElements()) return;

    this.init();
    this.addEventListeners();
  }

  private initializeElements(): void {
    this.btns = Array.from(document.querySelectorAll(this.options.button));
    this.closeBtns = this.options.closeButton
      ? Array.from(document.querySelectorAll(this.options.closeButton))
      : [];
    this.backdrop = document.querySelector(this.options.backdrop) as HTMLElement;
    this.excludeCloseAreas = this.options.excludeClose
      ? this.options.excludeClose.map((selector) => Array.from(document.querySelectorAll(selector)))
      : [];
  }

  private validateElements(): boolean {
    if (!this.backdrop) {
      console.warn(`Backdrop element not found: ${this.options.backdrop}`);
      return false;
    }
    if (this.btns.length === 0) {
      console.warn(`No button elements found: ${this.options.button}`);
      return false;
    }
    return true;
  }

  private init() {
    // ページ読み込み時にボタンとオーバーレイの属性を設定
    this.btns.forEach((btn) => {
      btn.setAttribute('aria-expanded', 'false');
    });
  }

  private addEventListeners() {
    // ボタンのクリックイベント
    this.btns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        this.handleButtonClick(e, btn);
      });
    });

    // 閉じるボタンのクリックイベント
    this.closeBtns.forEach((closeBtn) => {
      closeBtn.addEventListener('click', this.handleCloseButtonClick.bind(this));
    });

    // オーバーレイのクリックイベント
    this.backdrop?.addEventListener('click', this.handleBackdropClick.bind(this));

    // ドキュメントのクリックイベントは自分のボタンのみ登録
    this.btns.forEach((btn) => {
      btn.addEventListener('click', () => {
        // ボタンクリック時にドキュメントクリックリスナーを一時的に追加
        const documentClickHandler = (docEvent: Event) => {
          if (!this.isInstanceActive()) {
            document.removeEventListener('click', documentClickHandler, true);
            return;
          }

          // 自分のボタンクリックは除外
          if (Array.from(this.btns).some((b) => b.contains(docEvent.target as HTMLElement))) {
            return;
          }

          // 除外エリアのクリックは無視
          if (this.shouldIgnoreClick(docEvent.target as HTMLElement)) {
            return;
          }

          this.deactivate();
          document.removeEventListener('click', documentClickHandler, true);
        };

        setTimeout(() => {
          document.addEventListener('click', documentClickHandler, true);
        }, 0);
      });
    });

    // ESCキーのキーダウンイベント
    document.addEventListener('keydown', this.handleKeyDown.bind(this));

    // ウィンドウのリサイズイベント（closeOnResizeがtrueの場合のみ）
    if (this.options.closeOnResize) {
      window.addEventListener('resize', this.handleResize.bind(this));
    }
  }

  private handleButtonClick(e: Event, btn: Element) {
    e.stopPropagation();

    // オーバーレイの状態をチェック
    const isBackdropActive = this.backdrop?.classList.contains(this.activeClass);

    if (isBackdropActive) {
      this.deactivate();
    } else {
      this.activate(btn);
    }
  }

  private handleCloseButtonClick(e: Event) {
    e.stopPropagation();
    this.deactivate();
  }

  private handleBackdropClick(e: Event) {
    if (!this.isInstanceActive()) return;

    // ボタンクリックは handleButtonClick で処理するため除外
    if (Array.from(this.btns).some((btn) => btn.contains(e.target as HTMLElement))) return;

    // 除外エリアのクリックは無視
    if (this.shouldIgnoreClick(e.target as HTMLElement)) return;

    this.deactivate();
  }

  private handleKeyDown(e: KeyboardEvent) {
    if (!this.isInstanceActive()) return;
    if (e.key === 'Escape') {
      e.stopPropagation();
      this.deactivate();
    }
  }

  private handleResize() {
    if (!this.isInstanceActive()) return;
    this.deactivate();
  }

  private isInstanceActive(): boolean {
    return this.backdrop?.classList.contains(this.activeClass) ?? false;
  }

  private activate(btn: Element, backdrop?: HTMLElement) {
    const targetBackdrop = backdrop || this.backdrop;
    if (!targetBackdrop) return;

    targetBackdrop.classList.add(this.activeClass);
    btn.classList.add(this.activeClass);
    btn.setAttribute('aria-expanded', 'true');
  }
  private deactivate(btns: HTMLElement[] = this.btns, backdrop?: HTMLElement) {
    // すべてのボタンのアクティブクラスを削除し、`aria-expanded` を `false` に設定
    btns.forEach((btn) => {
      btn.classList.remove(this.activeClass);
      btn.setAttribute('aria-expanded', 'false');
    });

    const targetBackdrop = backdrop || this.backdrop;
    if (targetBackdrop) {
      targetBackdrop.classList.remove(this.activeClass);
    }
  }

  private shouldIgnoreClick(target: HTMLElement): boolean {
    return this.excludeCloseAreas.some((areaNodeList) =>
      Array.from(areaNodeList).some((area) => area.contains(target)),
    );
  }
}
