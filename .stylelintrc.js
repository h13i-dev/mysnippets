/**
 * Docs
 * stylelint: https://stylelint.io/user-guide/rules/
 * styleint-scss: https://github.com/stylelint-scss/stylelint-scss
 *
 * Extends
 * recommended: https://github.com/stylelint/stylelint-config-recommended/blob/main/index.js
 * standard: https://github.com/stylelint/stylelint-config-standard
 * recommended-scss: https://github.com/stylelint-scss/stylelint-config-recommended-scss
 * standard-scss: https://github.com/stylelint-scss/stylelint-config-standard-scss
 * recess-order: https://github.com/stormwarning/stylelint-config-recess-order
 *
 * Plugins
 * use-baseline: https://github.com/ryo-manba/stylelint-plugin-use-baseline
 * ignored-properties: https://github.com/kristerkari/stylelint-declaration-block-no-ignored-properties
 */

export default {
  extends: [
    'stylelint-config-recommended',
    'stylelint-config-standard',
    'stylelint-config-recommended-scss',
    'stylelint-config-standard-scss',
    'stylelint-config-recess-order',
  ],
  plugins: ['stylelint-plugin-use-baseline', 'stylelint-declaration-block-no-ignored-properties'],
  rules: {
    /**
     * CSS
     */
    // Avoid errors - Descending
    'no-descending-specificity': [true, { severity: 'warning' }], // 降順のセレクタの優先順位を警告
    // Avoid errors - Duplicate
    'declaration-block-no-duplicate-properties': [true, { disableFix: true }], // 重複するプロパティを禁止
    // Avoid errors - Invalid
    'color-no-invalid-hex': true, // 無効な16進カラーを禁止
    'declaration-no-important': [true, { severity: 'warning' }], // !importantを警告
    // Avoid errors - Non-standard
    'function-linear-gradient-no-nonstandard-direction': true, // 線形グラデーションの非標準方向を禁止
    // Avoid errors - Unknown
    'declaration-property-value-no-unknown': [
      true,
      { ignoreProperties: { '/.*$/': '/theme\\(.+?\\)/' } }, // Tailwindのtheme()関数を無視
    ],
    'function-no-unknown': /* 未知の関数を禁止 */ [
      true,
      {
        ignoreFunctions: [
          'theme',
          'grid-selector',
          'get-selector',
          'convert-to-px',
          'get-breakpoint-value',
          'resolve-breakpoint',
          'subgrid-selector',
          'span-selector',
          'progress',
        ],
      },
    ],
    'no-unknown-animations': [true, { severity: 'warning' }], // 未知のアニメーションを禁止
    'no-unknown-custom-media': true, // 未知のカスタムメディアを禁止
    'unit-no-unknown': true, // 未知の単位を禁止

    // Enforce conventions - Allowed, disallowed & required
    'color-named': 'never', // 色の名前指定を禁止
    'declaration-property-unit-allowed-list': /* 許可するプロパティと単位のを指定 */ {
      'line-height': [],
    },
    'length-zero-no-unit': [
      true,
      {
        ignore: ['custom-properties'],
        ignoreFunctions: ['progress'],
      },
    ],
    'function-url-no-scheme-relative': true, // スキーム相対URLを禁止
    'rule-nesting-at-rule-required-list': ['layer'], // ネスト可能なatルールを指定
    // Enforce conventions - Notation
    'font-weight-notation': 'named-where-possible', // font-weightを名前で指定（例: bold, normal）
    // Enforce conventions - Pattern
    'selector-class-pattern': [
      '^(-?([a-z][a-z0-9]*)(-[a-z0-9]+|_[a-z0-9]+)*|js-[a-z][a-zA-Z0-9]*)$',
      {
        message: (selector) =>
          `Expected class selector "${selector}" to be kebab-case, snake_case, or camelCase with "js-" prefix`,
      },
    ],

    /**
     * SCSS
     */
    'scss/at-rule-conditional-no-parentheses': null, // @ifの括弧を省略（minmax functionで使用）
    'scss/at-rule-no-unknown': [true, { ignoreAtRules: ['tailwind', 'screen'] }], // Tailwindのatルールを無視

    /**
     * Plugin
     */
    // Baseline準拠のCSS機能チェック
    'plugin/use-baseline': [
      true,
      {
        severity: 'warning',
        available: 'widely',
        ignoreSelectors: ['nesting', '/^has/'],
        ignoreProperties: {
          '/^mask/': [],
          '/^grid/': ['subgrid'],
          '/backdrop-filter/': [],
        },
        ignoreAtRules: ['function'],
      },
    ],
    // 使用できないプロパティの組み合わせを検出
    'plugin/declaration-block-no-ignored-properties': true,
  },
  ignoreFiles: ['node_modules/**/*', 'dist/**/*'],
};
