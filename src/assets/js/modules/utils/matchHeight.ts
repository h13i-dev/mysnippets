// *************************************************
// 複数の要素の高さを揃える
// *************************************************
/**
 * usage:
 * matchHeight('.js-type_list', '>', 1000);
 * matchHeight('selector', 'operator', num)
 */
export default function matchHeight(
  selector: string,
  operator: string = '',
  num: number = 0,
): void {
  function getFormula(operator: string, num: number) {
    switch (operator) {
      case '>':
        return window.innerWidth > num;
      case '>=':
        return window.innerWidth >= num;
      case '<':
        return window.innerWidth < num;
      case '<=':
        return window.innerWidth <= num;
      default:
        return true;
    }
  }

  function adjustElementHeight(): void {
    const elements: HTMLElement[] = Array.from(document.querySelectorAll<HTMLElement>(selector));

    if (elements.length !== 0) {
      // Reset the height of all elements
      elements.forEach((element: HTMLElement) => (element.style.height = ''));

      if (getFormula(operator, num)) {
        // Find the highest height among all elements
        const highestHeight: number = Math.max(
          ...elements.map((element: HTMLElement) => element.offsetHeight),
        );

        // Apply the highest height to all elements
        elements.forEach(
          (element: HTMLElement) => (element.style.height = `${highestHeight.toString()}px`),
        );
      }
    }
  }

  adjustElementHeight(); // On load
  window.addEventListener('resize', adjustElementHeight); // On resize
}
