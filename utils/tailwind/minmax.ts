import { tailwindConfig } from './config';

// 単位を削除する関数
const removePx = (value: string): number => {
  if (typeof value === 'string' && value.endsWith('px')) return parseFloat(value);
  if (typeof value === 'string' && value.endsWith('rem'))
    return parseFloat(value) * tailwindConfig.browserBaseFontSize;
  console.warn('値はpxまたはremで指定してください。');
  return 0;
};

// ブレークポイントの値を取得する関数
const getBreakpointValue = (
  breakpoint: string,
  screens: Record<string, string> = tailwindConfig.screens,
): string => {
  return screens[breakpoint] || breakpoint;
};

export const minmax = (
  minValue: string, // 最小値
  maxValue: string, // 最大値
  minBreakpoint: string = tailwindConfig.defaultBreakpoints.minBreakpoint, // 最小ブレークポイント
  maxBreakpoint: string = tailwindConfig.defaultBreakpoints.maxBreakpoint, // 最大ブレークポイント
  unit: string = tailwindConfig.defaultUnit, // 出力単位（pxまたはrem）
  screens: Record<string, string> = tailwindConfig.screens, // スクリーン設定
) => {
  const minSize = Number(removePx(minValue));
  const maxSize = Number(removePx(maxValue));
  const minViewPort = Number(removePx(getBreakpointValue(minBreakpoint, screens)));
  const maxViewPort = Number(removePx(getBreakpointValue(maxBreakpoint, screens)));

  // スロープ計算
  const slope = (maxSize - minSize) / (maxViewPort - minViewPort);
  const vwValue = `${(slope * 100).toFixed(2)}vw`;

  // 単位に応じた出力を生成
  if (unit === 'px') {
    const interceptPx = maxSize - maxViewPort * slope;
    return `clamp(${minSize}px, ${interceptPx.toFixed(3)}px + ${vwValue}, ${maxSize}px)`;
  } else {
    const minSizeRem = minSize / tailwindConfig.browserBaseFontSize;
    const maxSizeRem = maxSize / tailwindConfig.browserBaseFontSize;
    const interceptRem = maxSizeRem - (maxViewPort * slope) / tailwindConfig.browserBaseFontSize;

    return `clamp(${minSizeRem.toFixed(3)}rem, ${interceptRem.toFixed(3)}rem + ${vwValue}, ${maxSizeRem.toFixed(3)}rem)`;
  }
};
