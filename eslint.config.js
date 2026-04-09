// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format

import js from '@eslint/js';
import json from '@eslint/json';
import html from '@html-eslint/eslint-plugin';
import htmlParser from '@html-eslint/parser';
import storybook from 'eslint-plugin-storybook';
import globals from 'globals';
import ts from 'typescript-eslint';

/**
 * 共通の設定（すべてのファイルに適用）
 */
const commonConfig = {
  linterOptions: {
    reportUnusedDisableDirectives: 'error', // eslint-disable-next-lineでエラー無効化
  },
};

/**
 * JavaScriptの設定
 */
const jsRules = {
  ...js.configs.recommended.rules, // JavaScript推奨ルール
  // Possible Problems（https://eslint.org/docs/latest/rules/#possible-problems）
  'array-callback-return': 'error', // 配列のメソッドにはreturn必須
  'no-await-in-loop': 'error', // ループ内でawaitの使用を警告
  'no-constructor-return': 'error', // コンストラクタ内でreturnを警告
  'no-duplicate-imports': 'error', // import文で重複を警告
  'no-promise-executor-return': 'error', // Promiseのexecutor関数内でreturnを警告
  'no-self-compare': 'error', // 自分自身との比較を警告
  'no-template-curly-in-string': 'error', // テンプレートリテラル内での変数展開を警告
  'no-unmodified-loop-condition': 'error', // ループ条件が変わらない場合を警告
  'no-unreachable-loop': 'error', // 到達不可能なループを警告
  'no-unused-vars': [
    'error',
    {
      args: 'all', // 名前付き引数をどこまでチェックするかを指定(default: after-used)
      argsIgnorePattern: '^_', // チェックしない例外パターンを指定（ここではアンダースコアで書けば無視)
    },
  ],
  'no-use-before-define': 'error', // 定義前の変数を使わない
  'require-atomic-updates': 'error', // 非同期処理の競合を防ぐ

  // Suggestions（https://eslint.org/docs/latest/rules/#suggestions）
  'consistent-this': 'error', // thisを変数に定義する場合、変数名をthatとする
  eqeqeq: ['error', 'always', { null: 'ignore' }], // 厳密等価演算子を使う
  'new-cap': 'error', // コンストラクタとして実行される関数は大文字から始める
  'no-bitwise': 'error', // ビット演算子の禁止
  'no-empty-function': 'error', // 空の関数を定義しない
  'no-eval': 'error', // eval関数の禁止
  'no-lone-blocks': 'error', // 不要なブロックを作らない
  'no-var': 'error', // varの使用禁止（let もしくは constを使う）
  'prefer-const': 'error', // const推奨
  camelcase: 'error', // 変数と関数の命名にはキャメルケースを使う
};

const jsBrowserConfig = {
  files: ['{src/assets,public}/**/*.js'],
  languageOptions: {
    globals: {
      ...globals.browser,
    },
  },
  rules: {
    ...jsRules,
  },
};

const jsNodeConfig = {
  files: ['**/*.js'],
  ignores: ['{src/assets,public}/**/*.js'],
  languageOptions: {
    globals: {
      ...globals.nodeBuiltin,
    },
  },
  rules: {
    ...jsRules,
  },
};

/**
 * TypeScriptの設定
 */
const tsBrowserConfig = ts.configs.recommendedTypeChecked.map((config) => ({
  ...config,
  files: ['{src/assets,public}/**/*.ts', '.storybook/**/*.ts'],
  languageOptions: {
    ...config.languageOptions,
    globals: {
      ...config.languageOptions?.globals,
      ...globals.browser,
    },
    parserOptions: {
      ...config.languageOptions?.parserOptions,
      project: true,
      tsconfigRootDir: import.meta.dirname,
    },
  },
  rules: {
    ...jsRules,
    ...config.rules, // TypeScript推奨ルール
    // TypeScript Rules を下記に定義（https://typescript-eslint.io/rules/）
  },
}));

const tsNodeConfig = ts.configs.recommendedTypeChecked.map((config) => ({
  ...config,
  files: ['**/*.ts'],
  ignores: ['{src/assets,public}/**/*.ts'],
  languageOptions: {
    ...config.languageOptions,
    globals: {
      ...config.languageOptions?.globals,
      ...globals.nodeBuiltin,
    },
    parserOptions: {
      ...config.languageOptions?.parserOptions,
      project: true,
      tsconfigRootDir: import.meta.dirname,
    },
  },
  rules: {
    ...jsRules,
    ...config.rules, // TypeScript推奨ルール
    // TypeScript Rules を下記に定義（https://typescript-eslint.io/rules/）
  },
}));

/**
 * HTML、Astroの設定
 */
const htmlConfig = {
  files: ['**/*.{html,astro}'],
  plugins: {
    '@html-eslint': html,
  },
  languageOptions: {
    parser: htmlParser,
  },
  rules: {
    ...html.configs['flat/recommended'].rules,

    // Best Practice
    '@html-eslint/no-duplicate-class': 'error', // 重複するクラス名を禁止
    '@html-eslint/no-duplicate-in-head': 'error', // head内の重複を禁止
    '@html-eslint/no-ineffective-attrs': 'error', // 効力のない属性を禁止
    '@html-eslint/no-inline-styles': 'warn', // インラインスタイルの使用を警告
    '@html-eslint/no-invalid-entity': 'error', // 無効なHTMLエンティティを禁止
    '@html-eslint/no-nested-interactive': 'error', // ネストされたインタラクティブ要素を禁止
    // 特定の属性名の属性値のパターンを禁止
    '@html-eslint/no-restricted-attr-values': [
      'error',
      {
        // prettier-ignore
        attrPatterns: [
          'id',
          'class',
          'className',
          'href',
          'src',
          'width',
          'height',
          'type',
          'role',
          'aria-label',
          'title',
          'aria-hidden',
          'datetime',
          'loading',
        ],
        attrValuePatterns: ['^$'], // 空文字
        message: '空の属性値は許可されていません。',
      },
      {
        // prettier-ignore
        attrPatterns: [
          'width',
          'height',
          'maxlength',
          'minlength',
          'cols',
          'rows',
          'colspan',
          'rowspan',
          'tabindex',
        ],
        attrValuePatterns: ['[^-0-9]'], // 数字とマイナス記号以外の文字
        message: '単位の指定は禁止されています。数値のみを指定してください。',
      },
      {
        attrPatterns: ['.*'],
        attrValuePatterns: ['★'],
        message: '値が決まり次第、適切な値に置き換えてください。',
      },
      {
        // prettier-ignore
        attrPatterns: ['href', 'src', 'cite'],
        attrValuePatterns: ['^(?!https://|/|#|\\{|★).*?'], // "https://" や "/" で始まらないものをエラー
        message: 'パスは "https://" から始まるか "/" から始まる相対パスを指定してください。',
      },
    ],
    // 制限された属性の使用を禁止
    '@html-eslint/no-restricted-attrs': [
      'error',
      {
        tagPatterns: ['.*'],
        attrPatterns: ['data-grid-col'],
        message: 'data-grid-col属性の代わりに、data-config属性を使用してください。',
      },
    ],
    '@html-eslint/no-restricted-tags': [
      'error',
      {
        tagPatterns: ['^b$', '^i$', '^u$'],
        message: 'mark、strong、em などのセマンティックな要素を使用してください。',
      },
    ],
    '@html-eslint/no-script-style-type': 'error', // scriptタグのtype属性にtext/javascriptを使用しない
    '@html-eslint/prefer-https': 'error', // httpではなくhttpsを使用する
    // 特定のタグに特定の属性を必須にする
    '@html-eslint/require-attrs': [
      'warn',
      // {
      //   // 例: brタグにaria-hidden属性をtrueにする
      //   tag: 'br',
      //   attr: 'aria-hidden',
      //   value: 'true',
      // },
      // {
      //   tag: 'wbr',
      //   attr: 'aria-hidden',
      //   value: 'true',
      // },
      {
        tag: 'time',
        attr: 'datetime',
      },
      {
        tag: 'div',
        attr: 'class',
        message: "Consider adding 'class' attribute to 'div'",
      },
      {
        tag: 'span',
        attr: 'class',
        message: "Consider adding 'class' attribute to 'span'",
      },
      {
        tag: 'img',
        attr: 'loading',
        message: "Consider adding 'loading' attribute to 'img' tags",
      },
    ],
    // '@html-eslint/require-button-type': 'error', // buttonタグにtype属性を必須にする
    '@html-eslint/require-closing-tags': 'off', // Astroで自己終了タグを使うため無効化
    '@html-eslint/require-explicit-size': 'warn', // imgタグに明示的なwidthとheightを必須にする
    '@html-eslint/require-meta-charset': 'error', // meta charsetタグを必須にする
    '@html-eslint/use-baseline': 'warn', // ベースラインを使用することを推奨

    // SEO
    '@html-eslint/require-meta-description': 'error', // meta descriptionを必須にする
    '@html-eslint/require-open-graph-protocol': 'error', // Open Graphプロトコルを必須にする

    // Accessibility
    '@html-eslint/no-abstract-roles': 'error', // 抽象的なrole属性の使用を禁止
    '@html-eslint/no-accesskey-attrs': 'error', // accesskey属性の使用を禁止
    '@html-eslint/no-aria-hidden-body': 'error', // bodyタグにaria-hidden属性を使用しない
    '@html-eslint/no-aria-hidden-on-focusable': 'error', // フォーカス可能な要素にaria-hiddenを使用しない
    '@html-eslint/no-empty-headings': 'error', // 空の見出しを禁止
    '@html-eslint/no-heading-inside-button': 'error', // buttonタグ内に見出しを使用しない
    '@html-eslint/no-invalid-role': 'error', // 無効なrole属性の使用を禁止
    '@html-eslint/no-non-scalable-viewport': 'error', // スケール不可のviewportの使用を禁止
    '@html-eslint/no-positive-tabindex': 'error', // 正の値のtabindex属性の使用を禁止
    '@html-eslint/no-skip-heading-levels': 'error', // 見出しレベルの飛び越しを禁止
    '@html-eslint/require-form-method': 'error', // formタグにmethod属性を必須にする
    '@html-eslint/require-frame-title': 'error', // frameタグにtitle属性を必須にする
    '@html-eslint/require-input-label': 'error', // inputタグにラベルを必須にする
    '@html-eslint/require-meta-viewport': 'error', // meta viewportタグを必須にする

    // Style
    '@html-eslint/attrs-newline': 'off', // 属性ごとに改行しない
    '@html-eslint/element-newline': 'off', // 要素ごとに改行しない
    '@html-eslint/indent': 'off', // インデントはPrettierで管理
    '@html-eslint/no-extra-spacing-attrs': ['error', { enforceBeforeSelfClose: true }], // 属性の余分なスペースを禁止
    '@html-eslint/no-extra-spacing-text': 'error', // テキストの余分なスペースを禁止
    '@html-eslint/no-multiple-empty-lines': ['error', { max: 1 }], // 複数の空行を禁止
    '@html-eslint/no-trailing-spaces': 'error', // 行末の余分なスペースを禁止
    '@html-eslint/quotes': 'off', // クォートはPrettierで管理
    // 属性の順序を強制
    '@html-eslint/sort-attrs': [
      'error',
      {
        // prettier-ignore
        priority: [
          'slot',
          'type',
          'role',
          'http-equiv',
          'property',
          'rel',
          'as',
          'fetchpriority', // 役割や挙動を定義する属性
          'id',
          'class',
          'className',
          'name', // 主要識別子
          'value',
          'content',
          'href',
          'src',
          'srcset',
          'sizes', // コンテンツ定義
          'alt',
          'aria-label',
          'title', // アクセシビリティ
          'width',
          'height',
          'colspan',
          'rowspan',
          'cols',
          'rows', // 表示・レイアウト
          'data-config', // データ属性
        ],
      },
    ],
  },
};

const jsonConfig = {
  files: ['**/*.json'],
  ignores: ['package-lock.json'],
  plugins: { json },
  language: 'json/json',
  rules: {
    ...json.configs.recommended.rules,
  },
};

const jsoncConfig = {
  files: ['**/*.jsonc'],
  plugins: { json },
  language: 'json/jsonc',
  rules: {
    ...json.configs.recommended.rules,
  },
};

export default [
  commonConfig,
  jsBrowserConfig,
  jsNodeConfig,
  ...tsBrowserConfig,
  ...tsNodeConfig,
  htmlConfig,
  jsonConfig,
  jsoncConfig,
  ...storybook.configs['flat/recommended'],
];
