interface PageTopOptions {
  target?: string;
  threshold?: number;
  activeClass?: string;
  bottomClass?: string;
  fixed?: boolean;
}

interface PositionData {
  position: string;
  bottom: string;
  isAtBottom: boolean;
}

interface ScrollMeasurements {
  pageHeight: number;
  scrollBottomPosition: number;
  targetOffsetTop: number;
}

const DEFAULTS = {
  THRESHOLD: 200,
  ACTIVE_CLASS: 'is-active',
  BOTTOM_CLASS: 'is-bottom',
} as const;

const POSITIONS = {
  FIXED: 'fixed',
  ABSOLUTE: 'absolute',
  DEFAULT_BOTTOM: '0',
} as const;

const ARIA_STATES = {
  HIDDEN: 'true',
  VISIBLE: 'false',
} as const;

export default class PageTop {
  private readonly element: HTMLElement;
  private readonly target: HTMLElement | null;
  private readonly threshold: number;
  private readonly activeClass: string;
  private readonly bottomClass: string;
  private readonly fixed: boolean;

  constructor(selector: string, options: PageTopOptions = {}) {
    const {
      target,
      threshold = DEFAULTS.THRESHOLD,
      activeClass = DEFAULTS.ACTIVE_CLASS,
      bottomClass = DEFAULTS.BOTTOM_CLASS,
      fixed = true,
    } = options;

    this.element = this.getElement(selector);
    this.target = target ? this.getElement(target) : null;
    this.threshold = threshold;
    this.activeClass = activeClass;
    this.bottomClass = bottomClass;
    this.fixed = fixed;

    this.init();
  }

  private getElement(selector: string): HTMLElement {
    const element = document.querySelector(selector);
    if (!element) {
      throw new Error(`Element not found: ${selector}`);
    }
    return element as HTMLElement;
  }

  private init(): void {
    this.element.setAttribute('aria-hidden', ARIA_STATES.HIDDEN);
    this.updateVisibility();
    this.attachEventHandlers();
  }

  private attachEventHandlers(): void {
    const updateState = () => {
      this.updateVisibility();
      this.updatePosition();
    };

    window.addEventListener('scroll', updateState);
    window.addEventListener('resize', updateState);
  }

  private updatePosition(): void {
    const positionData = this.calculatePosition();

    this.element.classList.toggle(this.bottomClass, positionData.isAtBottom);

    if (this.fixed) {
      this.element.style.position = positionData.position;
      this.element.style.bottom = positionData.bottom;
    } else {
      this.element.style.position = POSITIONS.FIXED;
      this.element.style.bottom = POSITIONS.DEFAULT_BOTTOM;
    }
  }

  private calculatePosition(): PositionData {
    if (!this.target) return this.calculatePositionWithoutTarget();
    return this.calculatePositionWithTarget();
  }

  private calculatePositionWithoutTarget(): PositionData {
    const isAtPageBottom = this.isAtPageBottom();

    return {
      position: POSITIONS.FIXED,
      bottom: POSITIONS.DEFAULT_BOTTOM,
      isAtBottom: isAtPageBottom,
    };
  }

  private isAtPageBottom(): boolean {
    const scrollTop = document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const tolerance = 10;

    return scrollTop + windowHeight >= documentHeight - tolerance;
  }

  private calculatePositionWithTarget(): PositionData {
    const measurements = this.getScrollMeasurements();
    const { pageHeight, scrollBottomPosition, targetOffsetTop } = measurements;

    const targetElementHeight = pageHeight - targetOffsetTop;
    const offsetBottom = pageHeight - scrollBottomPosition;
    const isAtBottom = offsetBottom <= targetElementHeight;

    return {
      position: isAtBottom ? POSITIONS.ABSOLUTE : POSITIONS.FIXED,
      bottom: isAtBottom ? `${String(pageHeight - targetOffsetTop)}px` : POSITIONS.DEFAULT_BOTTOM,
      isAtBottom,
    };
  }

  private getScrollMeasurements(): ScrollMeasurements {
    if (!this.target) throw new Error('Target element is required for scroll measurements');

    return {
      pageHeight: document.body.scrollHeight,
      scrollBottomPosition: window.innerHeight + window.scrollY,
      targetOffsetTop: this.target.offsetTop,
    };
  }

  private updateVisibility(): void {
    const shouldShow = this.shouldShowButton();
    this.toggleVisibility(shouldShow);
  }

  private shouldShowButton(): boolean {
    const scrollTop = document.documentElement.scrollTop;
    return this.threshold <= 0 || scrollTop >= this.threshold;
  }

  private toggleVisibility(show: boolean): void {
    this.element.classList.toggle(this.activeClass, show);
    this.element.setAttribute('aria-hidden', show ? ARIA_STATES.VISIBLE : ARIA_STATES.HIDDEN);
  }
}
