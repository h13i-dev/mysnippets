import { Accordion, Heading } from '@components/index.tsx';
import { createHtmlSource } from '@stories/assets/utils/htmlTransform';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof Heading> = {
  title: '_Dev/Docs/Storybookのコード設定',
  component: Heading,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
ストーリーのコードパネルに表示するソースを制御する関数です。

## 基本の使い方

\`\`\`typescript
import { createHtmlSource } from "@stories/assets/utils/htmlTransform";

parameters: {
  docs: {
    source: createHtmlSource({ mode: 'dynamic' }),
  },
},
\`\`\`

## オプション

### \`mode\`（省略可）

ソースコードパネルの表示モードを指定します。

<table>
  <thead><tr><th>値</th><th>表示内容</th><th>args 連動</th></tr></thead>
  <tbody>
    <tr><td><code>'dynamic'</code>（default）</td><td>JSX を表示</td><td>○</td></tr>
    <tr><td><code>'static'</code></td><td>render に書いた JSX をそのまま表示</td><td>×（静的）</td></tr>
    <tr><td><code>'html'</code></td><td>HTML を表示</td><td>○</td></tr>
  </tbody>
</table>

> **注意**: \`'static'\` は \`render\` のコードを抽出して表示する仕組みなので、**\`render\` を使うストーリーでしか機能しません**。\`args\` のみのストーリーに \`'static'\` を指定すると、意図しない表示になります。

#### 用語

- **args 連動（○）**: Storybook の Controls パネルで args を変更すると、コードパネルの表示も追従して更新される
- **静的（×）**: render 関数に書いたコードがそのまま固定で表示される。args を変えてもコードパネルの表示は変わらない

#### 使い分けの目安

<table>
  <thead><tr><th>状況</th><th>推奨</th></tr></thead>
  <tbody>
    <tr><td>args を変えてコントロールパネルから操作したい</td><td>省略（<code>'dynamic'</code> default）</td></tr>
    <tr><td>Compound Components や複数の子要素を表示したい</td><td><code>'static'</code></td></tr>
    <tr><td>args を使わず、固定の JSX を見せたい</td><td><code>'static'</code></td></tr>
    <tr><td>コードを書いたままのフォーマットで見せたい</td><td><code>'static'</code></td></tr>
    <tr><td>HTML として表示したい</td><td><code>'html'</code></td></tr>
  </tbody>
</table>

#### dynamic と static の表示の違い

<table>
  <thead><tr><th></th><th><code>'dynamic'</code>（default）</th><th><code>'static'</code></th></tr></thead>
  <tbody>
    <tr><td>コードの整形・改行</td><td>Storybook の再生成に依存</td><td>書いたまま保持</td></tr>
    <tr><td>コメント</td><td>消える</td><td>残る</td></tr>
    <tr><td>変数・式</td><td>評価後の値になる</td><td>そのまま残る</td></tr>
    <tr><td>コンポーネント名</td><td><code>displayName</code> に置き換わる</td><td>import した名前のまま</td></tr>
    <tr><td>args 連動</td><td>○</td><td>×</td></tr>
  </tbody>
</table>

\`\`\`typescript
// args を使うストーリー（デフォルト）
parameters: {
  docs: { source: createHtmlSource() },
},
args: { label: 'ボタン' },

// render に書いた JSX を静的に表示するストーリー
parameters: {
  docs: { source: createHtmlSource({ mode: 'static' }) },
},
render: () => <Component><Child /></Component>,
\`\`\`

        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

// ----------------------------------------------------------------
// 各モードのデモストーリー
// ----------------------------------------------------------------

export const ModeDynamic: Story = {
  name: 'mode: dynamic（明示）',
  parameters: {
    docs: {
      source: createHtmlSource({ mode: 'dynamic' }),
      description: {
        story: `\`\`\`tsx
args: { lv: '2', children: '見出しレベル2' },
parameters: { docs: { source: createHtmlSource({ mode: 'dynamic' }) } },
\`\`\``,
      },
    },
  },
  args: { lv: '2', children: '見出しレベル2' },
};

export const ModeDefault: Story = {
  name: 'mode: 省略（dynamic 相当）',
  parameters: {
    docs: {
      source: createHtmlSource(),
      description: {
        story: `\`\`\`tsx
args: { lv: '2', children: '見出しレベル2' },
parameters: { docs: { source: createHtmlSource() } },
\`\`\``,
      },
    },
  },
  args: { lv: '2', children: '見出しレベル2' },
};

export const ModeStatic: Story = {
  name: 'mode: static',
  parameters: {
    docs: {
      source: createHtmlSource({ mode: 'static' }),
      description: {
        story: `\`\`\`tsx
render: () => (
  <Accordion>
    <Accordion.Summary>アコーディオンのタイトル</Accordion.Summary>
    <Accordion.Body>アコーディオンの本文です。</Accordion.Body>
  </Accordion>
),
parameters: { docs: { source: createHtmlSource({ mode: 'static' }) } },
\`\`\``,
      },
    },
  },
  render: () => (
    <Accordion>
      <Accordion.Summary>アコーディオンのタイトル</Accordion.Summary>
      <Accordion.Body>アコーディオンの本文です。</Accordion.Body>
    </Accordion>
  ),
};

export const ModeHtml: Story = {
  name: 'mode: html',
  parameters: {
    docs: {
      source: createHtmlSource({ mode: 'html' }),
      description: {
        story: `\`\`\`tsx
args: { lv: '2', children: '見出しレベル2' },
parameters: { docs: { source: createHtmlSource({ mode: 'html' }) } },
\`\`\``,
      },
    },
  },
  args: { lv: '2', children: '見出しレベル2' },
};
