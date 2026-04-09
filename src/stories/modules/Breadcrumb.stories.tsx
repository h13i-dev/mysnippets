import Breadcrumb from '@components/bases/Breadcrumb';
import { createHtmlSource } from '@stories/assets/utils/htmlTransform';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'This-Site/レイアウト/パンくずリスト',
  component: Breadcrumb,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="[&_*]:u-relative">
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      source: createHtmlSource('dynamic'),
      description: {
        component: `
### 概要
ページの階層構造を示すパンくずリストコンポーネントです。ユーザーが現在どのページにいるのかを視覚的に示し、上位階層へのナビゲーションを提供します。

### HTMLコード
\`\`\`html
<nav class="p-breadcrumb">
  <ol class="p-breadcrumb_items">
    <li class="p-breadcrumb_item">
      <a href="/">トップ</a>
      <span class="icon_arrow-forward" aria-hidden="true"></span>
    </li>
    <li class="p-breadcrumb_item">
      <a href="/snippets/">Snippets</a>
      <span class="icon_arrow-forward" aria-hidden="true"></span>
    </li>
    <li class="p-breadcrumb_item">現在のページ</li>
  </ol>
</nav>
\`\`\`

### 使い方
\`\`\`tsx
// オブジェクト配列でパス指定（推奨）
<Breadcrumb paths={[
  { title: "Snippets", path: "/snippets/" },
  { title: "Components", path: "/snippets/components/" }
]} />

// 文字列配列でパス指定（パス名から自動的にタイトルを生成）
<Breadcrumb paths={["/snippets/", "/snippets/components/"]} />

// currentPathから自動生成（Astroページで使用する場合）
<Breadcrumb currentPath={Astro.url.pathname} />
\`\`\`

### Props
| プロパティ | 型 | 必須 | デフォルト | 概要 |
|---|---|---|---|---|
| currentPath | \`string\` | - | \`'/'\` | 現在のパス（自動生成時に使用） |
| paths | \`string[] \\| { title: string; path?: string }[]\` | - | - | カスタムパス指定 |
| className | \`string\` | - | - | 追加のCSSクラス |

### 主な機能
- オブジェクト配列でタイトルとパスを完全にカスタマイズ可能
- 文字列配列でパスを指定すると、パス名から自動的にタイトルを生成
- currentPathを指定すると、階層構造を自動検出してパンくずリストを生成
- リンクなしのアイテム表示（pathが空文字列または未指定の場合）
- 最後のアイテムは現在のページとして通常テキストで表示
- ページタイトルのHTML（\`<br>\`タグなど）を自動的にスペースに変換
`,
      },
    },
  },
} satisfies Meta<typeof Breadcrumb>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: '基本的な使い方',
  args: {
    paths: [
      { title: 'Snippets', path: '/snippets/' },
      { title: 'Modules', path: '/snippets/modules/' },
      { title: 'パンくずリスト', path: '/snippets/modules/breadcrumb/' },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'pathsプロパティでタイトルとパスを指定してパンくずリストを表示します。',
      },
    },
  },
};

export const RootPath: Story = {
  name: 'ルートパス',
  args: {
    paths: [],
  },
  parameters: {
    docs: {
      description: {
        story: 'pathsが空配列の場合、トップページのみが表示されます。',
      },
    },
  },
};

export const DeepHierarchy: Story = {
  name: '深い階層',
  args: {
    paths: [
      { title: 'Snippets', path: '/snippets/' },
      { title: 'Components', path: '/snippets/components/' },
      { title: 'Card', path: '/snippets/components/card/' },
      { title: 'Example', path: '/snippets/components/card/example/' },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: '深い階層のパスでも、各階層を明示的に指定してパンくずリストを生成できます。',
      },
    },
  },
};

export const WithStringArray: Story = {
  name: 'シンプルなパス構造',
  args: {
    paths: [
      { title: 'Components', path: '/components/' },
      { title: 'Box', path: '/components/box/' },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'シンプルなパス構造の場合のパンくずリスト表示例です。',
      },
    },
  },
};

export const WithObjectArray: Story = {
  name: 'オブジェクト配列でのカスタマイズ',
  args: {
    paths: [
      { title: 'Components', path: '/components/' },
      { title: 'カスタムパス' },
      { title: 'カスタムタイトル', path: '/components/box/' },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          'オブジェクト配列でタイトルとパスを指定することで、自由にパンくずリストをカスタマイズできます。pathを省略するとリンクなしのテキストとして表示されます。',
      },
    },
  },
};

export const WithoutLink: Story = {
  name: 'リンクなしアイテム',
  args: {
    paths: [
      { title: 'Components', path: '/components/' },
      { title: 'リンクなし項目', path: '' },
      { title: 'Box' },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          'pathが空文字列または未指定の場合、そのアイテムはリンクなしのテキストとして表示されます。',
      },
    },
  },
};

export const WithCustomClassName: Story = {
  name: 'カスタムクラス名',
  args: {
    paths: [
      { title: 'Snippets', path: '/snippets/' },
      { title: 'Modules', path: '/snippets/modules/' },
    ],
    className: 'u-relative u-z-10',
  },
  parameters: {
    docs: {
      description: {
        story: 'classNameプロパティで追加のCSSクラスを指定できます。',
      },
    },
  },
};

export const LongTitles: Story = {
  name: '長いタイトル',
  args: {
    paths: [
      { title: 'とても長いカテゴリータイトルの例', path: '/category/' },
      { title: 'これも非常に長いサブカテゴリー名です', path: '/category/sub/' },
      { title: 'さらに長い現在のページタイトル' },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: '長いタイトルの場合でも適切に表示されます。',
      },
    },
  },
};
