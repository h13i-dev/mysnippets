interface CustomDropdownConfig {
  value: string;
  text: string;
}

interface CustomDropdownOptions {
  selector?: string;
}

export default class CustomDropdown {
  private static readonly SELECTORS = {
    SELECTED_DISPLAY: '[role="combobox"]',
    OPTIONS_LIST: '[role="listbox"]',
    OPTIONS: '[role="option"]',
    HIDDEN_INPUT: 'input[type="hidden"]',
  } as const;

  private static readonly KEYS = {
    ENTER: 'Enter',
    SPACE: ' ',
    ARROW_DOWN: 'ArrowDown',
    ARROW_UP: 'ArrowUp',
    HOME: 'Home',
    END: 'End',
    ESCAPE: 'Escape',
    TAB: 'Tab',
  } as const;

  private static readonly CLASSES = {
    ACTIVE: 'is-active',
    SELECTED: 'is-selected',
  } as const;

  private static readonly OPEN_KEYS = [
    CustomDropdown.KEYS.ENTER,
    CustomDropdown.KEYS.SPACE,
    CustomDropdown.KEYS.ARROW_DOWN,
    CustomDropdown.KEYS.ARROW_UP,
  ] as const;

  private readonly dropdown!: HTMLElement;
  private readonly selectedDisplay!: HTMLElement;
  private readonly optionsList!: HTMLElement;
  private readonly options!: HTMLElement[];
  private readonly hiddenInput!: HTMLInputElement | null;

  private currentFocusedIndex: number = -1;
  private isOpen: boolean = false;

  constructor(elementOrOptions: HTMLElement | CustomDropdownOptions = {}) {
    // オプションオブジェクトが渡された場合は複数要素を初期化
    if (!(elementOrOptions instanceof HTMLElement)) {
      this.initializeMultiple(elementOrOptions);
      return;
    }

    // 単一要素の初期化
    const element = elementOrOptions;
    this.dropdown = element;
    this.selectedDisplay = this.getRequiredElement(
      element,
      CustomDropdown.SELECTORS.SELECTED_DISPLAY,
    );
    this.optionsList = this.getRequiredElement(element, CustomDropdown.SELECTORS.OPTIONS_LIST);
    this.options = Array.from(element.querySelectorAll(CustomDropdown.SELECTORS.OPTIONS));
    this.hiddenInput = element.querySelector(CustomDropdown.SELECTORS.HIDDEN_INPUT);

    if (this.validateElements()) {
      this.init();
    }
  }

  private initializeMultiple(options: CustomDropdownOptions): void {
    const selector = options.selector || '.js-customDropdown';
    const elements = document.querySelectorAll<HTMLElement>(selector);

    if (elements.length === 0) {
      console.warn(`CustomDropdown: No elements found with selector "${selector}"`);
      return;
    }

    elements.forEach((element: HTMLElement) => {
      new CustomDropdown(element);
    });
  }

  private getRequiredElement(parent: HTMLElement, selector: string): HTMLElement {
    const element = parent.querySelector<HTMLElement>(selector);
    if (!element) {
      throw new Error(`CustomDropdown: Required element not found: ${selector}`);
    }
    return element;
  }

  private validateElements(): boolean {
    return this.options.length > 0;
  }

  private init(): void {
    this.bindEvents();
    this.setupInitialState();
  }

  private setupInitialState(): void {
    // 初期状態の設定
  }

  private bindEvents(): void {
    this.selectedDisplay.addEventListener('click', (e: MouseEvent) => {
      this.handleDisplayClick(e);
    });

    this.selectedDisplay.addEventListener('keydown', (e: KeyboardEvent) => {
      this.handleDisplayKeydown(e);
    });

    this.options.forEach((option: HTMLElement) => {
      option.addEventListener('click', (e: MouseEvent) => {
        this.handleOptionClick(e, option);
      });
      option.addEventListener('keydown', (e: KeyboardEvent) => {
        this.handleOptionKeydown(e);
      });
    });

    document.addEventListener('click', (e: MouseEvent) => {
      this.handleDocumentClick(e);
    });

    document.addEventListener('keydown', (e: KeyboardEvent) => {
      this.handleDocumentKeydown(e);
    });
  }

  private updateAriaStates(expanded: boolean): void {
    this.selectedDisplay.setAttribute('aria-expanded', expanded.toString());

    if (!expanded) {
      this.clearOptionsFocus();
    }

    this.optionsList.setAttribute('aria-hidden', (!expanded).toString());
    this.isOpen = expanded;
  }

  private clearOptionsFocus(): void {
    this.options.forEach((option: HTMLElement) => {
      option.blur();
    });
  }

  private isValidOptionIndex(index: number): boolean {
    return index >= 0 && index < this.options.length;
  }

  private focusOption(index: number): void {
    if (this.isValidOptionIndex(index)) {
      this.currentFocusedIndex = index;
      const targetOption = this.options[this.currentFocusedIndex];
      targetOption.focus();
    }
  }

  private setInitialFocusIndex(): void {
    this.currentFocusedIndex = this.findSelectedOptionIndex();
    if (this.currentFocusedIndex === -1) {
      this.currentFocusedIndex = 0;
    }
  }

  public open(): void {
    this.dropdown.classList.add(CustomDropdown.CLASSES.ACTIVE);
    this.updateAriaStates(true);
    this.setInitialFocusIndex();
    this.focusOption(this.currentFocusedIndex);
  }

  public close(shouldFocus: boolean = false): void {
    this.clearActiveFocus();
    this.dropdown.classList.remove(CustomDropdown.CLASSES.ACTIVE);
    this.updateAriaStates(false);
    this.currentFocusedIndex = -1;

    if (shouldFocus) {
      this.selectedDisplay.focus();
    }
  }

  private clearActiveFocus(): void {
    const focusedOption = this.options.find((option) => document.activeElement === option);
    focusedOption?.blur();
  }

  private findSelectedOptionIndex(): number {
    return this.options.findIndex((option: HTMLElement) =>
      option.classList.contains(CustomDropdown.CLASSES.SELECTED),
    );
  }

  private clearAllSelections(): void {
    this.options.forEach((option: HTMLElement) => {
      option.classList.remove(CustomDropdown.CLASSES.SELECTED);
      option.setAttribute('aria-selected', 'false');
    });
  }

  private setSelectedOption(option: HTMLElement): void {
    option.classList.add(CustomDropdown.CLASSES.SELECTED);
    option.setAttribute('aria-selected', 'true');
  }

  private updateDisplayAndInput(value: string, text: string, optionId?: string): void {
    this.selectedDisplay.textContent = text;
    if (optionId) {
      this.selectedDisplay.setAttribute('aria-activedescendant', optionId);
    }
    if (this.hiddenInput) {
      this.hiddenInput.value = value;
    }
  }

  public selectOption(option: HTMLElement): void {
    this.clearAllSelections();
    this.setSelectedOption(option);

    const value = option.getAttribute('data-value') || '';
    const text = option.textContent || '';
    const optionId = option.getAttribute('id') || '';

    this.updateDisplayAndInput(value, text, optionId);
    this.close();
    this.dispatchChangeEvent(value, text);
  }

  private dispatchChangeEvent(value: string, text: string): void {
    const event = new CustomEvent('dropdownChange', {
      detail: { value, text } as CustomDropdownConfig,
    });
    this.dropdown.dispatchEvent(event);
  }

  private handleDisplayClick(e: MouseEvent): void {
    e.stopPropagation();
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  private handleDisplayKeydown(e: KeyboardEvent): void {
    if (CustomDropdown.OPEN_KEYS.includes(e.key as (typeof CustomDropdown.OPEN_KEYS)[number])) {
      e.preventDefault();
      if (!this.isOpen) this.open();
    } else if (e.key === CustomDropdown.KEYS.ESCAPE && this.isOpen) {
      e.preventDefault();
      this.close(true);
    }
  }

  private handleOptionClick(e: MouseEvent, option: HTMLElement): void {
    e.stopPropagation();
    this.selectOption(option);
  }

  private handleOptionKeydown(e: KeyboardEvent): void {
    const target = e.target as HTMLElement;
    e.preventDefault();

    switch (e.key) {
      case CustomDropdown.KEYS.ENTER:
      case CustomDropdown.KEYS.SPACE:
        this.selectOption(target);
        break;

      case CustomDropdown.KEYS.ARROW_DOWN:
        this.focusNextOption();
        break;

      case CustomDropdown.KEYS.ARROW_UP:
        this.focusPreviousOption();
        break;

      case CustomDropdown.KEYS.HOME:
        this.focusOption(0);
        break;

      case CustomDropdown.KEYS.END:
        this.focusOption(this.options.length - 1);
        break;

      case CustomDropdown.KEYS.ESCAPE:
        this.close(true);
        break;
    }
  }

  private focusNextOption(): void {
    if (this.currentFocusedIndex < this.options.length - 1) {
      this.focusOption(this.currentFocusedIndex + 1);
    }
  }

  private focusPreviousOption(): void {
    if (this.currentFocusedIndex > 0) {
      this.focusOption(this.currentFocusedIndex - 1);
    }
  }

  private handleDocumentClick(e: MouseEvent): void {
    const target = e.target as HTMLElement;
    if (!this.dropdown.contains(target)) {
      this.close();
    }
  }

  private handleDocumentKeydown(e: KeyboardEvent): void {
    if (!this.isOpen) return;

    if (e.key === CustomDropdown.KEYS.ESCAPE) {
      this.close(true);
    } else if (e.key === CustomDropdown.KEYS.TAB) {
      this.close();
    }
  }
}
