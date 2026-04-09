import FocusTrap from '@assets/js/modules/FocusTrap.ts';

type Breakpoint = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

interface Options {
  button: string;
  focusTrap?: [string, string];
  breakpoint?: Breakpoint;
}

interface Instance {
  button: HTMLElement;
  popover: HTMLElement;
  focusTrap?: FocusTrap;
  originalPopoverValue: string | null;
  originalPopovertargetValue: string | null;
}

export default class GlobalNavigation {
  private instances: Instance[] = [];
  private mediaQuery?: MediaQueryList;
  private readonly BREAKPOINTS: Record<Breakpoint, string> = {
    sm: '(min-width: 640px)',
    md: '(min-width: 768px)',
    lg: '(min-width: 1024px)',
    xl: '(min-width: 1280px)',
    '2xl': '(min-width: 1536px)',
  };

  constructor(private options: Options) {
    if (!this.isPopoverAPISupported()) {
      console.error('[GlobalNavigation] Popover API is not supported');
      return;
    }

    this.initializeElements();
    if (this.options.breakpoint) {
      this.setupMediaQuery();
    }
  }

  private isPopoverAPISupported(): boolean {
    return 'popover' in HTMLElement.prototype;
  }

  private initializeElements(): void {
    const buttons = document.querySelectorAll(this.options.button);

    buttons.forEach((element) => {
      const instance = this.createInstance(element as HTMLElement);
      if (instance) {
        this.instances.push(instance);
        this.addEventListeners(instance);
      }
    });

    // チラツキを防ぐため、初期化後にポップオーバーを準備完了としてマーク
    this.instances.forEach((instance) => {
      instance.popover.setAttribute('data-popover-ready', '');
    });
  }

  private createInstance(button: HTMLElement): Instance | null {
    const popovertarget = button.getAttribute('popovertarget');
    if (!popovertarget) {
      console.warn('[GlobalNavigation] Button has no popovertarget attribute');
      return null;
    }

    const popover = document.getElementById(popovertarget);
    if (!popover) {
      console.warn('[GlobalNavigation] Popover not found:', popovertarget);
      return null;
    }

    return {
      button,
      popover,
      focusTrap: this.options.focusTrap ? new FocusTrap() : undefined,
      originalPopoverValue: popover.getAttribute('popover'),
      originalPopovertargetValue: button.getAttribute('popovertarget'),
    };
  }

  private setupMediaQuery(): void {
    if (!this.options.breakpoint) return;

    const query = this.BREAKPOINTS[this.options.breakpoint];
    this.mediaQuery = window.matchMedia(query);

    this.handleBreakpointChange(this.mediaQuery);
    this.mediaQuery.addEventListener('change', (e) => this.handleBreakpointChange(e));
  }

  private handleBreakpointChange(e: MediaQueryList | MediaQueryListEvent): void {
    if (e.matches) {
      this.disablePopoverAPI();
    } else {
      this.enablePopoverAPI();
    }
  }

  private disablePopoverAPI(): void {
    this.instances.forEach((instance) => {
      instance.popover.removeAttribute('popover');
      instance.button.removeAttribute('popovertarget');
    });
  }

  private enablePopoverAPI(): void {
    this.instances.forEach((instance) => {
      if (instance.originalPopoverValue) {
        instance.popover.setAttribute('popover', instance.originalPopoverValue);
      }
      if (instance.originalPopovertargetValue) {
        instance.button.setAttribute('popovertarget', instance.originalPopovertargetValue);
      }
    });
  }

  private addEventListeners(instance: Instance): void {
    instance.popover.addEventListener('toggle', (e: Event) => {
      const event = e as ToggleEvent;

      if (event.newState === 'open') {
        this.handleOpen(instance);
      } else if (event.newState === 'closed') {
        this.handleClose(instance);
      }
    });

    instance.popover.addEventListener('click', (e: Event) => {
      if ((e.target as HTMLElement).closest('a, button')) {
        instance.popover.hidePopover();
      }
    });
  }

  private handleOpen(instance: Instance): void {
    if (!instance.focusTrap || !this.options.focusTrap) return;

    const [firstSelector, lastSelector] = this.options.focusTrap;
    const firstElement = document.querySelector(firstSelector) as HTMLElement;
    const lastElement = document.querySelector(lastSelector) as HTMLElement;

    if (firstElement && lastElement) {
      instance.focusTrap.addFocusTrap(firstSelector, lastSelector);
      requestAnimationFrame(() => firstElement.focus({ preventScroll: true }));
    }
  }

  private handleClose(instance: Instance): void {
    if (instance.focusTrap && this.options.focusTrap) {
      const [firstSelector, lastSelector] = this.options.focusTrap;
      instance.focusTrap.removeFocusTrap(firstSelector, lastSelector);
    }
    instance.button.focus({ preventScroll: true });
  }
}
