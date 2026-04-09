export default class ProgressBar {
  private element: HTMLElement | null;
  private valueElement: HTMLElement;
  private currentProgressValue: number;

  constructor(private elementName: string) {
    this.element = document.querySelector(this.elementName);
    this.valueElement = document.createElement('div') as HTMLElement;
    this.currentProgressValue = 0;
    this.init();
  }

  private init(): void {
    if (this.element) {
      this.element.appendChild(this.valueElement);
      this.element.classList.add('m-progress-bar');
      this.valueElement.classList.add('m-progress-bar_value');
      this.setupEventListeners();
    }
  }

  private setupEventListeners(): void {
    window.addEventListener('scroll', this.updateProgress.bind(this));
    window.addEventListener('resize', this.updateProgress.bind(this));
  }

  private get scrollTop(): number {
    return document.documentElement.scrollTop || document.body.scrollTop;
  }

  private get pageHeight(): number {
    return document.body.scrollHeight;
  }

  private get clientHeight(): number {
    return document.documentElement.clientHeight;
  }

  private updateProgress(): void {
    this.currentProgressValue = (this.scrollTop / (this.pageHeight - this.clientHeight)) * 100;
    this.valueElement.style.width = `${this.currentProgressValue.toString()}%`;
  }
}
