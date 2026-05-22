import { Comment } from '@components/index.tsx';
import type { BaseProps } from '@src/types/base';
import { createHtmlSource } from '@stories/assets/utils/htmlTransform';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<BaseProps> = {
  title: 'This-Site/固有モジュール/コメント',
  component: Comment,
  tags: ['autodocs'],
  parameters: {
    docs: {
      source: createHtmlSource(),
    },
  },
  // args: {
  //   children: "これはコメントの例です。重要な情報や注意事項を記載できます。",
  // },
  argTypes: {
    children: {
      description: '表示するコンテンツ',
      control: { type: 'text' },
    },
    className: {
      description: '追加のCSSクラス',
      control: { type: 'text' },
    },
  },
};

export default meta;
type Story = StoryObj<BaseProps>;

// export const Interactive: Story = {
//   name: "インタラクティブ",
//   tags: ["!dev", "!autodocs"],
// };

export const Default: Story = {
  name: '基本的なコメント',
  args: {
    children: 'これはコメントの例です。重要な情報や注意事項を記載できます。',
  },
};

export const MultilineComment: Story = {
  name: '複数行コメント',
  parameters: {
    docs: {
      description: {
        story: '長いテキストや複数行にわたるコメントの表示例です。',
      },
    },
  },
  render: () => (
    <Comment>
      これは複数行にわたるコメントの例です。
      <br />
      長い説明や詳細な情報を記載する場合に使用します。
      <br />
      改行タグを使用して複数行にすることができます。
    </Comment>
  ),
};

export const RichContentComment: Story = {
  name: 'リッチコンテンツ',
  parameters: {
    docs: {
      description: {
        story: 'HTML要素を含むリッチなコンテンツを表示する例です。',
      },
    },
  },
  render: () => (
    <Comment>
      <strong>重要：</strong>このAPIは<em>v2.0</em>で<code>deprecated</code>になります。
      <br />
      新しい実装については
      <a href="★★★" style={{ color: '#007bff' }}>
        こちらのドキュメント
      </a>
      を参照してください。
    </Comment>
  ),
};

export const CodeExample: Story = {
  name: 'コード例付きコメント',
  parameters: {
    docs: {
      description: {
        story: 'コード例や実装例を含むコメントの表示例です。',
      },
    },
  },
  render: () => (
    <Comment>
      📝 使用例：
      <br />
      <code>const result = processData(input);</code>
      <br />
      この関数は非同期で実行されるため、awaitキーワードの使用を推奨します。
    </Comment>
  ),
};
