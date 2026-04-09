import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface CountUpOptions {
  duration?: number;
  start?: string;
  ease?: string;
  toggleActions?: string;
  markers?: boolean;
}

interface ParsedConfig {
  to: string;
  duration: number;
  start: string;
  ease: string;
  toggleActions: string;
  markers: boolean;
  hasComma: boolean;
}

interface CountData {
  from: number;
  to: number;
}

type CountUpSelector = string;

/**
 * カウントアップ機能を提供するクラス
 */
export default class CountUpAnimation {
  private selector: string;
  private options: CountUpOptions;

  constructor(selector: CountUpSelector, options: CountUpOptions = {}) {
    this.selector = selector;
    this.options = options;
    this.init();
  }

  /**
   * カウントアップアニメーションを初期化・実行
   */
  public init(): void {
    gsap.registerPlugin(ScrollTrigger);
    this.processElements();
  }

  /**
   * セレクターに該当する全要素を処理
   */
  private processElements(): void {
    const targets = document.querySelectorAll(this.selector);
    if (!targets.length) return;
    targets.forEach((target) => this.processCountUpElement(target));
  }

  /**
   * data-config属性からオプションを解析
   */
  private parseDataConfig(dataConfig: string | undefined): ParsedConfig {
    const defaults = {
      to: '0',
      duration: this.options.duration || 1,
      start: this.options.start || 'top 70%',
      ease: this.options.ease || 'none',
      toggleActions: this.options.toggleActions || 'play none none none',
      markers: this.options.markers || false,
      hasComma: false,
    };
    if (!dataConfig) return defaults;

    const patterns = {
      to: /\[to:(-?[\d,]+(?:\.\d+)?)\]/,
      duration: /\[duration:(\d+(?:\.\d+)?)\]/,
      start: /\[start:([^\]]+)\]/,
      ease: /\[ease:([^\]]+)\]/,
      toggleActions: /\[toggleActions:([^\]]+)\]/,
      markers: /\[markers\]/,
    };

    const toMatch = dataConfig.match(patterns.to);
    const durationMatch = dataConfig.match(patterns.duration);
    const startMatch = dataConfig.match(patterns.start);
    const easeMatch = dataConfig.match(patterns.ease);
    const toggleActionsMatch = dataConfig.match(patterns.toggleActions);
    const markersMatch = dataConfig.match(patterns.markers);

    const rawTo = toMatch ? toMatch[1] : defaults.to;
    const hasComma = rawTo.includes(',');
    const to = rawTo.replace(/,/g, '');

    return {
      to,
      duration: durationMatch ? parseFloat(durationMatch[1]) : defaults.duration,
      start: startMatch ? startMatch[1] : defaults.start,
      ease: easeMatch ? easeMatch[1] : defaults.ease,
      toggleActions: toggleActionsMatch ? toggleActionsMatch[1] : defaults.toggleActions,
      markers: markersMatch ? true : defaults.markers,
      hasComma,
    };
  }

  /**
   * テキストから数値を抽出
   */
  private extractNumber(text: string | null): string {
    if (!text) return '0';
    const cleanedText = text.replace(/[,\s]/g, '');
    const numberMatch = cleanedText.match(/-?\d+(?:\.\d+)?/);
    return numberMatch ? numberMatch[0] : '0';
  }

  /**
   * カウントデータを作成
   */
  private createCountData(target: Element, config: ParsedConfig): CountData {
    const from = parseFloat(this.extractNumber(target.textContent));
    const to = parseFloat(config.to);

    return { from, to };
  }

  /**
   * 数値フォーマット処理
   */
  private formatNumber(value: number, countData: CountData, hasComma: boolean): string {
    const hasDecimal = countData.to % 1 !== 0 || countData.from % 1 !== 0;

    if (hasDecimal) {
      const decimalPlaces = Math.max(
        (countData.to.toString().split('.')[1] || '').length,
        (countData.from.toString().split('.')[1] || '').length,
      );
      return value.toFixed(decimalPlaces);
    } else {
      return hasComma ? Math.floor(value).toLocaleString() : Math.floor(value).toString();
    }
  }

  /**
   * 単一要素のカウントアップ処理
   */
  private processCountUpElement(target: Element): void {
    const dataConfig = (target as HTMLElement).dataset.config;
    const config = this.parseDataConfig(dataConfig);

    // data-configが無い場合は、textContentから数値を抽出してtoに設定
    if (!dataConfig) {
      config.to = this.extractNumber(target.textContent);
    }

    this.animateElement(target, config);
  }

  /**
   * 要素のアニメーション実行
   */
  private animateElement(target: Element, config: ParsedConfig): void {
    const countData = this.createCountData(target, config);
    const countObj = { count: countData.from };

    gsap.to(countObj, {
      count: countData.to,
      duration: config.duration,
      ease: config.ease,
      scrollTrigger: {
        trigger: target,
        start: config.start,
        toggleActions: config.toggleActions,
        markers: config.markers,
      },
      onUpdate: () => {
        const formattedValue = this.formatNumber(countObj.count, countData, config.hasComma);
        target.textContent = formattedValue;
      },
    });
  }
}
