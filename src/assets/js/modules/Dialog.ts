interface DialogOptions {
  dialog: string;
  openTrigger: string;
  closeTrigger?: string;
  closeOnOutside?: boolean;
}

interface DialogInitOptions {
  selector?: string;
  openTrigger?: string;
  closeTrigger?: string;
  activeClass?: string;
  closeOnOutside?: boolean;
}

export default class Dialog {
  private readonly options: DialogOptions;
  private readonly dialog: HTMLDialogElement | null;
  private readonly openButtons: HTMLElement[];
  private readonly closeButtons: HTMLElement[];
  private scrollY: number = 0;

  private static readonly DEFAULT_INIT_OPTIONS: Required<DialogInitOptions> = {
    selector: 'dialog',
    openTrigger: '',
    closeTrigger: '',
    activeClass: 'is-active',
    closeOnOutside: false,
  };

  private static readonly FOCUSABLE_SELECTORS = [
    'a[href]',
    'button:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
  ].join(',');

  constructor(options: DialogOptions) {
    this.options = options;

    this.dialog = document.querySelector(this.options.dialog);
    this.openButtons = Array.from(document.querySelectorAll(this.options.openTrigger));
    this.closeButtons = Array.from(document.querySelectorAll(this.options.closeTrigger || ''));

    if (!this.dialog) {
      console.warn(`[Dialog Error]: ダイアログ要素が見つかりません: ${this.options.dialog}`);
      return;
    }

    this.init();
  }

  private init(): void {
    this.setupEventListeners();
    this.setupAccessibility();
  }

  private setupEventListeners(): void {
    if (!this.dialog) return;

    this.openButtons.forEach((button) => {
      button.addEventListener('click', () => {
        this.open();
      });
    });

    this.closeButtons.forEach((button) => {
      button.addEventListener('click', () => {
        this.close();
      });
    });

    // バックドロップクリック処理
    if (this.options.closeOnOutside) {
      this.dialog.addEventListener('click', (e) => {
        if (e.target === this.dialog) {
          this.close();
        }
      });
    } else {
      // closeOnOutsideがfalseの場合、attentionアニメーションを表示
      this.dialog.addEventListener('click', (e) => {
        if (e.target === this.dialog) {
          this.attention();
        }
      });
    }

    // モーダルが閉じられた時の処理
    this.dialog.addEventListener('close', () => {
      this.cleanupClasses();
    });

    this.dialog.addEventListener('keydown', (e) => {
      this.handleFocusTrap(e);
    });
  }

  private setupAccessibility(): void {
    if (!this.dialog) return;
    const heading = this.dialog.querySelector('h1, h2, h3, h4, h5, h6');
    if (heading) {
      if (!heading.id) heading.id = `modal-title-${Date.now().toString()}`;
      this.dialog.setAttribute('aria-labelledby', heading.id);
    }
  }

  private getFocusableElements(): HTMLElement[] {
    if (!this.dialog) return [];
    return Array.from(this.dialog.querySelectorAll(Dialog.FOCUSABLE_SELECTORS));
  }

  private cleanupClasses(): void {
    if (!this.dialog) return;
    this.dialog.classList.remove('dialog-attention');
  }

  private attention(): void {
    if (!this.dialog) return;
    this.dialog.classList.add('dialog-attention');
    setTimeout(() => {
      if (!this.dialog) return;
      this.dialog.classList.remove('dialog-attention');
    }, 1000);
  }

  private handleFocusTrap(e: KeyboardEvent): void {
    if (e.key !== 'Tab') return;

    const focusableElements = this.getFocusableElements();
    if (focusableElements.length === 0) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (e.shiftKey) {
      if (document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      }
    } else {
      if (document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    }
  }

  public open(): void {
    if (this.dialog && !this.isOpen()) {
      this.scrollY = window.scrollY; // 現在のスクロール位置を保存
      this.cleanupClasses();
      this.dialog.showModal();

      // フォーカスを外した後にスクロール位置をリセット
      requestAnimationFrame(() => {
        if (!this.dialog) return;
        this.dialog.scrollTop = 0;
        Array.from(this.dialog.children).forEach((element) => {
          (element as HTMLElement).scrollTop = 0;
        });
      });
    }
  }

  public close(): void {
    if (this.dialog && this.isOpen()) {
      this.dialog.close();
    }
  }

  public isOpen(): boolean {
    return Boolean(this.dialog?.open);
  }

  public static initAll(options?: DialogInitOptions): Dialog[] {
    const config = { ...Dialog.DEFAULT_INIT_OPTIONS, ...options };
    const instances: Dialog[] = [];
    const dialogs = Array.from(document.querySelectorAll(config.selector));

    dialogs.forEach((dialogElement) => {
      const dialogId = dialogElement.id;
      if (dialogId) {
        const openButton = document.querySelector(
          `${config.openTrigger}[data-dialog="${dialogId}"]`,
        );
        if (openButton) {
          const instance = new Dialog({
            dialog: `#${dialogId}`,
            openTrigger: `[data-dialog="${dialogId}"]`,
            closeTrigger: `#${dialogId} ${config.closeTrigger}`,
            closeOnOutside: config.closeOnOutside,
          });
          instances.push(instance);
        }
      }
    });

    return instances;
  }
}
