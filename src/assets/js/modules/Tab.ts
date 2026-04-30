interface TabOptions {
  tabSelector: string;
  contentSelector: string;
  scrollSelector?: string;
  persistState?: boolean;
  pathBasedActive?: boolean;
  searchable?: boolean;
  activeClass?: string;
}

export default class Tab {
  private readonly options: TabOptions;
  private readonly tabElements: HTMLElement[];
  private readonly contentElements: HTMLElement[];
  private readonly scrollElement: HTMLElement | null;
  private readonly persistState: boolean;
  private readonly pathBasedActive: boolean;
  private readonly searchable: boolean;
  private readonly activeClass: string | null;
  private readonly storageKey: string;

  constructor(options: TabOptions) {
    this.options = options;
    this.tabElements = Array.from(document.querySelectorAll(options.tabSelector));
    this.contentElements = Array.from(document.querySelectorAll(options.contentSelector));
    this.scrollElement = options.scrollSelector
      ? document.querySelector(options.scrollSelector)
      : null;
    this.persistState = options.persistState || false;
    this.pathBasedActive = options.pathBasedActive || false;
    this.searchable = options.searchable || false;
    this.activeClass = options.activeClass || null;
    this.storageKey = `tab-state-${options.tabSelector.replace(/[^a-zA-Z0-9]/g, '')}`;

    if (this.validateElements()) {
      this.initialize();
    }
  }

  /**
   * 要素の存在をバリデーション
   */
  private validateElements(): boolean {
    if (!this.options.tabSelector || !this.options.contentSelector) {
      return false;
    }

    if (this.tabElements.length === 0 || this.contentElements.length === 0) {
      return false;
    }

    if (this.tabElements.length !== this.contentElements.length) {
      return false;
    }

    return true;
  }

  /**
   * 初期化処理
   */
  private initialize(): void {
    this.setupTablist();
    const activeTabIndex = this.determineActiveTabIndex();
    this.setupTabElements(activeTabIndex);
    this.finalizeInitialization(activeTabIndex);
  }

  /**
   * タブリストのセットアップ
   */
  private setupTablist(): void {
    if (this.tabElements.length === 0) return;
    const parentElement = this.tabElements[0].parentElement;
    if (!parentElement) return;
    if (!parentElement.getAttribute('role')) parentElement.setAttribute('role', 'tablist');
  }

  /**
   * アクティブタブのインデックスを決定
   */
  private determineActiveTabIndex(): number {
    if (this.pathBasedActive) {
      return this.getPathBasedActiveIndex();
    }

    if (this.persistState) {
      const savedIndex = this.getSavedTabIndex();
      return Math.min(savedIndex, this.tabElements.length - 1);
    }

    return this.getActiveIndexFromHTML();
  }

  /**
   * タブ要素のセットアップ
   */
  private setupTabElements(activeTabIndex: number): void {
    this.tabElements.forEach((tabElement, index) => {
      this.setupSingleTab(tabElement, index, activeTabIndex);
      this.attachTabEvents(tabElement, index);
    });

    if (this.searchable) {
      this.setupBeforeMatchEvents();
    }
  }

  /**
   * 個別タブのセットアップ
   */
  private setupSingleTab(tabElement: HTMLElement, index: number, activeTabIndex: number): void {
    const uniqueId = this.generateUniqueId(tabElement);
    const contentElement = this.contentElements[index];

    // ARIA属性の設定
    this.setTabAttributes(tabElement, contentElement, uniqueId, index === activeTabIndex);
  }

  /**
   * ユニークIDを生成
   */
  private generateUniqueId(element: HTMLElement): string {
    const rect = element.getBoundingClientRect();
    return `${Math.round(rect.top)}-${Math.round(rect.left)}-${Date.now()}`;
  }

  /**
   * タブのARIA属性設定
   */
  private setTabAttributes(
    tabElement: HTMLElement,
    contentElement: HTMLElement,
    uniqueId: string,
    isActive: boolean,
  ): void {
    // タブ要素の属性設定
    tabElement.setAttribute('role', 'tab');
    tabElement.id = `tab-${uniqueId}`;
    tabElement.setAttribute('aria-controls', `tabpanel-${uniqueId}`);

    // コンテンツ要素の属性設定
    contentElement.setAttribute('role', 'tabpanel');
    contentElement.id = `tabpanel-${uniqueId}`;
    contentElement.setAttribute('aria-labelledby', `tab-${uniqueId}`);

    // アクティブ状態の設定
    if (isActive) {
      this.setActiveState(tabElement, contentElement);
    } else {
      this.setInactiveState(tabElement, contentElement);
    }
  }

  /**
   * アクティブ状態を設定
   */
  private setActiveState(tabElement: HTMLElement, contentElement: HTMLElement): void {
    tabElement.setAttribute('aria-selected', 'true');
    tabElement.setAttribute('tabindex', '0');
    contentElement.removeAttribute('hidden');

    // activeClassが指定されている場合はクラスを追加
    if (this.activeClass) {
      tabElement.classList.add(this.activeClass);
      contentElement.classList.add(this.activeClass);
    }

    // タブパネルにフォーカス可能要素があるか、または最初の要素がフォーカス可能かチェック
    if (!this.shouldTabpanelBeFocusable(contentElement)) {
      contentElement.removeAttribute('tabindex');
    } else {
      contentElement.setAttribute('tabindex', '0');
    }
  }

  /**
   * タブパネルがフォーカス可能であるべきかどうか判定
   */
  private shouldTabpanelBeFocusable(contentElement: HTMLElement): boolean {
    const focusableSelectors = [
      'button:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      'a[href]',
      '[tabindex]:not([tabindex="-1"])',
      'iframe',
      'object',
      'embed',
      'area[href]',
      'audio[controls]',
      'video[controls]',
      '[contenteditable="true"]',
    ].join(',');

    return contentElement.querySelectorAll(focusableSelectors).length === 0;
  }

  /**
   * 非アクティブ状態を設定
   */
  private setInactiveState(tabElement: HTMLElement, contentElement: HTMLElement): void {
    tabElement.setAttribute('aria-selected', 'false');
    tabElement.setAttribute('tabindex', '-1');
    contentElement.removeAttribute('tabindex');

    // activeClassが指定されている場合はクラスを削除
    if (this.activeClass) {
      tabElement.classList.remove(this.activeClass);
      contentElement.classList.remove(this.activeClass);
    }

    // searchableオプションに応じてhidden属性を設定
    if (this.searchable) {
      contentElement.setAttribute('hidden', 'until-found');
    } else {
      contentElement.setAttribute('hidden', '');
    }
  }

  /**
   * タブイベントの設定
   */
  private attachTabEvents(tabElement: HTMLElement, index: number): void {
    // クリックイベント
    tabElement.addEventListener('click', () => {
      this.activateTab(tabElement, index);
    });

    // キーボードイベント
    tabElement.addEventListener('keydown', (event) => {
      this.handleKeyboardNavigation(event, index);
    });
  }

  /**
   * beforematchイベントの設定（hidden="until-found"対応）
   */
  private setupBeforeMatchEvents(): void {
    this.contentElements.forEach((contentElement, index) => {
      contentElement.addEventListener('beforematch', () => {
        // hidden="until-found"要素が検索で発見されたときに対応するタブを表示
        this.activateTab(this.tabElements[index], index);
      });
    });
  }

  /**
   * 初期化の最終処理
   */
  private finalizeInitialization(activeTabIndex: number): void {
    setTimeout(() => {
      if (!this.pathBasedActive && !this.persistState) {
        this.ensureActiveTabExists();
      } else if (activeTabIndex >= 0) {
        this.activateTab(this.tabElements[activeTabIndex], activeTabIndex);
      }
    }, 0);
  }

  /**
   * アクティブタブが存在することを保証
   */
  private ensureActiveTabExists(): void {
    const hasActiveTab = this.contentElements.some((content) => !content.hasAttribute('hidden'));

    if (!hasActiveTab) {
      this.activateTab(this.tabElements[0], 0);
    }
  }

  /**
   * キーボードナビゲーション処理
   */
  private handleKeyboardNavigation(event: KeyboardEvent, currentIndex: number): void {
    const targetIndex = this.getTargetIndexFromKey(event.key, currentIndex);

    if (targetIndex === null) return;

    event.preventDefault();
    const targetTab = this.tabElements[targetIndex];
    this.activateTab(targetTab, targetIndex);
    targetTab.focus();
  }

  /**
   * キーから対象インデックスを取得
   */
  private getTargetIndexFromKey(key: string, currentIndex: number): number | null {
    const tabCount = this.tabElements.length;

    switch (key) {
      case 'ArrowRight':
        return this.findNextEnabledIndex(currentIndex, 1);
      case 'ArrowLeft':
        return this.findNextEnabledIndex(currentIndex, -1);
      case 'Home':
        return this.findNextEnabledIndex(-1, 1);
      case 'End':
        return this.findNextEnabledIndex(tabCount, -1);
      default:
        return null;
    }
  }

  /**
   * 指定方向で次のdisabledでないタブのインデックスを取得
   */
  private findNextEnabledIndex(currentIndex: number, direction: 1 | -1): number | null {
    const tabCount = this.tabElements.length;
    let index = currentIndex;

    for (let i = 0; i < tabCount; i++) {
      index = (index + direction + tabCount) % tabCount;
      if (!(this.tabElements[index] as HTMLButtonElement).disabled) {
        return index;
      }
    }

    return null;
  }

  /**
   * タブをアクティブ化
   */
  private activateTab(targetTabElement: HTMLElement, targetIndex: number): void {
    // スクロール処理
    if (this.scrollElement) {
      this.scrollElement.scrollIntoView({ behavior: 'smooth' });
    }

    // 全てのタブを非アクティブ化
    this.deactivateAllTabs();

    // 対象タブをアクティブ化
    this.setActiveState(targetTabElement, this.contentElements[targetIndex]);

    // 状態の永続化
    if (this.persistState) {
      this.saveTabIndex(targetIndex);
    }
  }

  /**
   * 全てのタブを非アクティブ化
   */
  private deactivateAllTabs(): void {
    this.tabElements.forEach((tabElement, index) => {
      this.setInactiveState(tabElement, this.contentElements[index]);
    });
  }

  /**
   * 保存されたタブインデックスを取得
   */
  private getSavedTabIndex(): number {
    try {
      const savedIndex = localStorage.getItem(this.storageKey);
      if (savedIndex !== null) {
        const index = parseInt(savedIndex, 10);
        return isNaN(index) ? 0 : index;
      }
    } catch (error) {
      console.warn('localStorage読み取りエラー:', error);
    }
    return 0;
  }

  /**
   * タブインデックスを保存
   */
  private saveTabIndex(index: number): void {
    try {
      localStorage.setItem(this.storageKey, index.toString());
    } catch (error) {
      console.warn('localStorage保存エラー:', error);
    }
  }

  /**
   * パスベースでアクティブタブのインデックスを取得
   */
  private getPathBasedActiveIndex(): number {
    const currentPath = window.location.pathname;

    for (let i = 0; i < this.tabElements.length; i++) {
      const dataState = this.tabElements[i].getAttribute('data-state');
      if (dataState && currentPath.startsWith(dataState)) {
        return i;
      }
    }

    return 0;
  }

  /**
   * HTMLの初期状態からアクティブタブのインデックスを取得
   */
  private getActiveIndexFromHTML(): number {
    // hidden属性がないコンテンツを探す
    for (let i = 0; i < this.contentElements.length; i++) {
      if (!this.contentElements[i].hasAttribute('hidden')) {
        return i;
      }
    }

    return 0;
  }

  /**
   * 公開API: 指定されたインデックスのタブをアクティブ化
   */
  public activateTabByIndex(index: number): void {
    if (index < 0 || index >= this.tabElements.length) {
      throw new Error(`無効なタブインデックス: ${index}`);
    }
    this.activateTab(this.tabElements[index], index);
  }

  /**
   * 公開API: 現在のアクティブタブのインデックスを取得
   */
  public getActiveTabIndex(): number {
    return this.contentElements.findIndex((content) => !content.hasAttribute('hidden'));
  }

  /**
   * 公開API: タブを破棄
   */
  public destroy(): void {
    // イベントリスナーの除去は自動的に行われるため、特別な処理は不要
    if (this.persistState) {
      try {
        localStorage.removeItem(this.storageKey);
      } catch (error) {
        console.warn('localStorage削除エラー:', error);
      }
    }
  }
}
