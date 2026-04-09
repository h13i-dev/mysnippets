/**
 * Tailwind CSS 設定ファイル
 *
 * Tailwind v4 では、Safari 16.4未満に対応していないため、Tailwind v3 を使用
 * docs: https://v3.tailwindcss.com/docs/installation
 * github discussions: https://github.com/tailwindlabs/tailwindcss/discussions/15284
 */

/** @type {import('tailwindcss').Config} */
import containerQueries from '@tailwindcss/container-queries';
import type { Config } from 'tailwindcss';
import defaultConfig from 'tailwindcss/defaultConfig';
import plugin from 'tailwindcss/plugin';
import resolveConfig from 'tailwindcss/resolveConfig';
import { tailwindConfig, v4 } from './utils/tailwind/config';
import { createMinMaxUtility } from './utils/tailwind/createMinMaxUtility';
import { minmax } from './utils/tailwind/minmax';
import { createSpacingMap } from './utils/tailwind/utils.ts';

// デフォルト設定を取得
const fullConfig = resolveConfig(defaultConfig);
const { spacing, transitionDuration, transitionTimingFunction } = fullConfig.theme;

export default {
  content: ['./src/**/*.{astro,js,jsx,ts,tsx,mdx}'],
  prefix: 'u-',
  important: true,
  theme: {
    extend: {
      spacing: {
        xs: minmax(spacing[2], spacing[4]), // 8px-16px: 極小
        sm: minmax(spacing[4], spacing[6]), // 16px-24px: 要素間 小
        md: minmax(spacing[6], spacing[8]), // 24px-32px: グリッド余白
        lg: minmax(spacing[8], spacing[12]), // 32px-48px: 要素間 大
        xl: minmax(spacing[12], spacing[20]), // 48px-80px: セクション間 小
        '2xl': minmax(spacing[20], spacing[32]), // 80px-128px: セクション間 大
        ...createSpacingMap(5, 100, 5, '%'), // 共通
        ...createSpacingMap(4, 160, 4, 'px'), // 余白の調整
        ...createSpacingMap(5, 10, 1, 'em'), // テーブルの調整
        ...createSpacingMap(200, 400, 100, 'px'), // ボタンの固定幅で使用
      },
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        text: 'var(--color-text)',
        info: 'var(--color-info)',
        success: 'var(--color-success)',
        warning: 'var(--color-warning)',
        danger: 'var(--color-danger)',
        disabled: 'var(--color-disabled)',
      },
      width: {
        screen: 'calc(100vw - (var(--scrollbar-width, 0px)))', // スクロールバーを考慮した画面幅
        ...createSpacingMap(2, 20, 1, 'em'), // テーブル調整で使用
      },
      maxWidth: {
        ...createSpacingMap(600, 800, 50, 'px'), // 図表・メディア（c-figure, c-media）で使用
        ...createSpacingMap(2, 20, 1, 'em'), // テーブル調整で使用
      },
      padding: {
        ...createSpacingMap(1, 5, 0.5, 'em'), // カスタムリストの調整
      },
      fontSize: {
        xs: [minmax('11px', '12px'), 'calc(1 / 0.75)'],
        sm: [minmax('12px', '14px'), 'calc(1.25 / 0.875)'],
        base: [minmax('14px', '16px'), 'calc(1.5 / 1)'], // デフォルト
        lg: [minmax('16px', '18px'), ' calc(1.75 / 1.125)'], // heading-lv6
        xl: [minmax('18px', '20px'), 'calc(1.75 / 1.25)'], // heading-lv5
        '2xl': [minmax('20px', '24px'), 'calc(2 / 1.5)'], // heading-lv4
        '3xl': [minmax('24px', '30px'), 'calc(2.25 / 1.875)'], // heading-lv3
        '4xl': [minmax('30px', '36px'), 'calc(2.5 / 2.25)'], // heading-lv1, heading-lv2
        '5xl': [minmax('36px', '48px'), '1'],
        '6xl': [minmax('48px', '60px'), '1'],
        '7xl': [minmax('60px', '72px'), '1'],
        '8xl': [minmax('72px', '96px'), '1'],
        '9xl': [minmax('96px', '128px'), '1'],
        ...createSpacingMap(12, 100, 2, 'px'), // フォントサイズの調整
      },
      boxShadow: {
        bg: '0 0 44px 0 rgb(0 0 0 / 22%)',
      },
      transitionDuration: {
        default: transitionDuration['DEFAULT'],
      },
      transitionTimingFunction: {
        default: transitionTimingFunction['DEFAULT'],
      },
    },
  },
  plugins: [
    containerQueries,
    plugin(function ({ addBase, theme, addUtilities, matchUtilities }) {
      addBase({
        html: {
          scrollBehavior: 'smooth',
        },
        body: {
          position: 'relative',
          'text-size-adjust': 'none',
          '-webkit-font-smoothing': 'antialiased',
          '-moz-osx-font-smoothing': 'grayscale',
        },
        // 埋め込みiframeのスタイル
        "iframe:where([src^='https://www.youtube.com'], [src^='https://player.vimeo.com'])": {
          border: 'none',
        },
      });
      addUtilities({
        ...v4,
        '.clearfix': {
          '&::after': {
            display: 'block',
            clear: 'both',
            content: '""',
          },
        },
        '.show': {
          display: 'revert',
        },
        '.wbr-loose': {
          'overflow-wrap': 'anywhere',
          'word-break': 'keep-all',
        },
        '.wbr-strict': {
          'overflow-wrap': 'anywhere',
          'white-space': 'nowrap',
        },
        '.mail::after': {
          content: '"@"',
        },
        '.vertical-writing': {
          'writing-mode': 'vertical-lr',
          'white-space': 'pre',
        },
        '.mx-bleed': {
          'margin-inline': 'calc(50% - 50cqw)',
        },
        '.ml-bleed': {
          'margin-left': 'calc(50% - 50cqw)',
        },
        '.mr-bleed': {
          'margin-right': 'calc(50% - 50cqw)',
        },
        // Generate gap utilities programmatically
        ...(() => {
          const sizes = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];
          return sizes.reduce(
            (gapUtilities: Record<string, Record<string, string>>, size) => {
              gapUtilities[`.gap-${size}`] = {
                '--column-gap': theme(`spacing.${size}`),
                '--row-gap': theme(`spacing.${size}`),
              };
              gapUtilities[`.gap-x-${size}`] = {
                '--column-gap': theme(`spacing.${size}`),
              };
              gapUtilities[`.gap-y-${size}`] = {
                '--row-gap': theme(`spacing.${size}`),
              };
              return gapUtilities;
            },
            {} as Record<string, Record<string, string>>,
          );
        })(),
      });
      matchUtilities(
        {
          gap: (value: string) => ({
            '--column-gap': value,
            '--row-gap': value,
            gap: `var(--row-gap) var(--column-gap)`,
          }),
          'gap-x': (value: string) => ({
            '--column-gap': value,
            'column-gap': 'var(--column-gap)',
          }),
          'gap-y': (value: string) => ({
            '--row-gap': value,
            'row-gap': 'var(--row-gap)',
          }),
        },
        {
          values: theme('spacing'),
          type: ['length', 'percentage'],
        },
      );
      matchUtilities({
        'text-overflow': (lines) => ({
          display: '-webkit-box',
          '-webkit-box-orient': 'vertical',
          '-webkit-line-clamp': `${lines}`,
          overflow: 'hidden',
        }),
        'grid-fill': (value) => ({
          display: 'grid',
          gridTemplateColumns: `repeat(auto-fill, minmax(${value}, 1fr))`,
        }),
        'grid-fit': (value) => ({
          display: 'grid',
          gridTemplateColumns: `repeat(auto-fit, minmax(${value}, 1fr))`,
        }),
        /**
         * 上部のline-height分の高さの余白を空ける（若干ずれる部分は微調整）
         * @param value // 要素の高さ
         */
        'mt-adjust': (value) => ({
          'margin-top': `calc((1lh - ${value}) / 2)`,
        }),
        'top-adjust': (value) => ({
          top: `calc((1lh - ${value}) / 2)`,
        }),
        ...Object.fromEntries(
          tailwindConfig.minmaxProperties.map(({ name, property }) => [
            `${name}-minmax`,
            createMinMaxUtility(property),
          ]),
        ),
      });
      matchUtilities(
        {
          btn: (value: string) => ({
            width: `min(${value}, 100%)`,
          }),
        },
        {
          values: theme('spacing'),
        },
      );
      matchUtilities(
        {
          'min-btn': (value: string) => ({
            minWidth: `min(${value}, 100%)`,
          }),
        },
        {
          values: theme('spacing'),
          type: ['length', 'percentage'],
        },
      );
    }),
  ],
} satisfies Config;
