/**
 * パターンベースのsafelist生成
 * @param type - クラス名のタイプ（例: 'mt', 'mb', 'max-w'）
 * @param values - 値の配列（例: ['4px', '8px', '12px']）
 * @param variants - レスポンシブvariantsの配列（例: ['sm', 'lg']）。空配列の場合はvariantsなし
 * @example
 * ```ts
 * safelist: [
 *   createSafelistPattern('max-w', generateStepValues(650, 800, 50, 'px')), // 画像・図表の最大幅調整
 *   createSafelistPattern('mt', generateStepValues(0, 40, 4, 'px'), ['sm', 'lg']), // 余白の調整
 *   createSafelistPattern('mb', generateStepValues(0, 40, 4, 'px'), ['sm', 'lg']), // 余白の調整
 *   createSafelistPattern('pl', generateStepValues(1, 5, 0.5, 'em')), // カスタムリストの調整
 *   createSafelistPattern('w', generateStepValues(5, 10, 1, 'em'), ['sm']), // テーブルの調整
 * ]
 * ```
 */
export function createSafelistPattern(
  type: string,
  values: string[],
  variants: string[] = [],
): { pattern: RegExp; variants?: string[] } {
  const pattern = new RegExp(`^u-${type}-(${values.join('|')})$`);
  return variants.length > 0 ? { pattern, variants } : { pattern };
}

/**
 * safelist用の値配列を生成
 * @param min - 最小値
 * @param max - 最大値
 * @param step - ステップ
 * @param unit - 単位（例: 'px', 'em', '%'）
 * @example
 * ```ts
 * generateStepValues(0, 40, 4, 'px')
 * // => ['0', '4px', '8px', '12px', '16px', '20px', '24px', '28px', '32px', '36px', '40px']
 *
 * generateStepValues(1, 5, 0.5, 'em')
 * // => ['1em', '1.5em', '2em', '2.5em', '3em', '3.5em', '4em', '4.5em', '5em']
 * ```
 */
export function generateStepValues(min: number, max: number, step: number, unit: string): string[] {
  const result: string[] = [];
  for (let i = min; i <= max; i += step) {
    if (i === 0) {
      result.push('0');
    } else {
      result.push(`${i}${unit}`);
    }
  }
  return result;
}

/**
 * theme.extend用のスペーシングマップを生成
 * @param min - 最小値
 * @param max - 最大値
 * @param step - ステップ（デフォルト: 1）
 * @param unit - 単位（デフォルト: 'px'）
 * @param toRemFlag - remに変換するかどうか（デフォルト: false）
 * @example
 * ```ts
 * theme: {
 *   extend: {
 *     spacing: {
 *       ...createSpacingMap(4, 160, 4, 'px'), // 余白の調整
 *       ...createSpacingMap(1, 5, 0.5, 'em'), // カスタムリストの調整
 *       ...createSpacingMap(5, 100, 5, '%'), // パーセント指定
 *     },
 *     width: {
 *       ...createSpacingMap(5, 100, 5, '%'),
 *     },
 *   },
 * }
 * ```
 */
export function createSpacingMap(
  min: number,
  max: number,
  step: number = 1,
  unit: string = 'px',
  toRemFlag: boolean = false,
): Record<string, string> {
  const result: Record<string, string> = {};
  for (let i = min; i <= max; i += step) {
    const key = `${i}${unit}`;
    result[key] = toRemFlag ? `${i / 16}rem` : `${i}${unit}`;
  }
  return result;
}
