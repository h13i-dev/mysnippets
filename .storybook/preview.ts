import type { Preview } from '@storybook/react-vite';
import '@src/stories/assets/sass/storybook/base.scss';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo',
    },
    docs: {
      toc: true,
      codePanel: true,
    },
    options: {
      storySort: {
        order: [
          'This-Site',
          [
            // 基本要素（テキスト関連）
            '見出し',
            'コンテンツタイトル',
            'タイポグラフィー',
            'リスト',
            '説明リスト',
            '注釈',

            // レイアウト
            'グリッドシステム',
            ['グリッドシステム_Gridプロパティ', 'グリッドシステム_Flexboxプロパティ'],
            'ボックス',

            // コンテンツ
            'テーブル',
            '図表・メディア',
            '画像レイアウト',
            '引用',

            // インタラクティブ
            'リンク',
            'ボタン',

            // その他
            'レイアウト',
            '固有モジュール',
            'ヘルパークラス',
          ],
          'Components',
          'Modules',
          '_Dev',
          ['Docs', 'Demo', 'Memo', 'Tests', 'Archive', 'Example'],
        ],
      },
    },
  },
};

export default preview;
