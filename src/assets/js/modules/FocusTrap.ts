export default class FocusTrap {
  private listeners: WeakMap<
    HTMLElement,
    {
      tabOnly?: (this: HTMLElement, e: KeyboardEvent) => void;
      tabShift?: (this: HTMLElement, e: KeyboardEvent) => void;
    }
  > = new WeakMap();

  tabOnly = (firstElem: HTMLElement): ((this: HTMLElement, e: KeyboardEvent) => void) => {
    return function (this: HTMLElement, e: KeyboardEvent) {
      if (e.key === 'Tab' && !e.shiftKey) {
        e.preventDefault();
        firstElem.focus(); // Tabキーが押されると最初の要素にフォーカスを移動
      }
    };
  };

  tabShift = (lastElem: HTMLElement): ((this: HTMLElement, e: KeyboardEvent) => void) => {
    return function (this: HTMLElement, e: KeyboardEvent) {
      if (e.key === 'Tab' && e.shiftKey) {
        e.preventDefault();
        lastElem.focus(); // Shift + Tabキーが押されると最後の要素にフォーカスを移動
      }
    };
  };

  addFocusTrap(firstSelector: string, lastSelector: string, direction: string = 'both') {
    const firstElems = Array.from(document.querySelectorAll(firstSelector));
    const lastElems = Array.from(document.querySelectorAll(lastSelector));

    firstElems.forEach((firstElem, index) => {
      const lastElem = lastElems[index] as HTMLElement | undefined;

      if (lastElem) {
        const listenerInfo: {
          tabOnly?: (this: HTMLElement, e: KeyboardEvent) => void;
          tabShift?: (this: HTMLElement, e: KeyboardEvent) => void;
        } = {};

        if (direction === 'both' || direction === 'forward') {
          listenerInfo.tabOnly = this.tabOnly(firstElem as HTMLElement);
          lastElem.addEventListener('keydown', listenerInfo.tabOnly);
        }

        if (direction === 'both' || direction === 'reverse') {
          listenerInfo.tabShift = this.tabShift(lastElem);
          (firstElem as HTMLElement).addEventListener('keydown', listenerInfo.tabShift);
        }

        this.listeners.set(firstElem as HTMLElement, listenerInfo);
        this.listeners.set(lastElem, listenerInfo);
      }
    });
  }

  removeFocusTrap(firstSelector: string, lastSelector: string) {
    const firstElems = document.querySelectorAll(firstSelector);
    const lastElems = document.querySelectorAll(lastSelector);

    firstElems.forEach((firstElem) => {
      const listener = this.listeners.get(firstElem as HTMLElement);
      if (listener?.tabShift) {
        (firstElem as HTMLElement).removeEventListener('keydown', listener.tabShift);
        delete listener.tabShift;
      }
    });

    lastElems.forEach((lastElem) => {
      const listener = this.listeners.get(lastElem as HTMLElement);
      if (listener?.tabOnly) {
        (lastElem as HTMLElement).removeEventListener('keydown', listener.tabOnly);
        delete listener.tabOnly;
      }
    });
  }
}
