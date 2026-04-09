// Tailwindの共通設定
export const tailwindConfig = {
  // ベースフォントサイズ
  browserBaseFontSize: 16,

  // デフォルトのブレークポイント設定
  defaultBreakpoints: {
    minBreakpoint: 'sm',
    maxBreakpoint: 'xl',
  },

  // デフォルトの単位
  defaultUnit: 'rem',

  // ブレークポイント設定
  screens: {
    xs: '375px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
    '3xl': '1920px',
  } as Record<string, string>,

  /**
   * minmaxユーティリティで使用するプロパティ定義
   * name: ユーティリティ名のプレフィックス
   * property: 対応するCSSプロパティ
   */
  minmaxProperties: [
    { name: 'text', property: 'fontSize' },
    { name: 'w', property: 'width' },
    { name: 'min-w', property: 'minWidth' },
    { name: 'max-w', property: 'maxWidth' },
    { name: 'h', property: 'height' },
    { name: 'min-h', property: 'minHeight' },
    { name: 'max-h', property: 'maxHeight' },
    { name: 'm', property: 'margin' },
    { name: 'mx', property: 'marginInline' },
    { name: 'my', property: 'marginBlock' },
    { name: 'mt', property: 'marginTop' },
    { name: 'mr', property: 'marginRight' },
    { name: 'mb', property: 'marginBottom' },
    { name: 'ml', property: 'marginLeft' },
    { name: 'p', property: 'padding' },
    { name: 'px', property: 'paddingInline' },
    { name: 'py', property: 'paddingBlock' },
    { name: 'pt', property: 'paddingTop' },
    { name: 'pr', property: 'paddingRight' },
    { name: 'pb', property: 'paddingBottom' },
    { name: 'pl', property: 'paddingLeft' },
    { name: 'gap', property: 'gap' },
    { name: 'gap-x', property: 'columnGap' },
    { name: 'gap-y', property: 'rowGap' },
    { name: 'top', property: 'top' },
    { name: 'right', property: 'right' },
    { name: 'bottom', property: 'bottom' },
    { name: 'left', property: 'left' },
  ],
};

// Tailwind v4 Utility
export const v4 = {
  '.wrap-anywhere': {
    overflowWrap: 'anywhere',
  },
  '.wrap-break-word': {
    overflowWrap: 'break-word',
  },
  '.wrap-normal': {
    overflowWrap: 'normal',
  },
};
