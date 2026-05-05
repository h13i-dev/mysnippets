import { Accordion, Heading } from '@components/index.tsx';
import { createHtmlSource } from '@stories/assets/utils/htmlTransform';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta = {
  title: '_Dev/Tests/テスト_HtmlSource',
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
    source: createHtmlSource({ extract: 'dynamic' }),
  },
},
\`\`\`

## オプション

### \`extract\`（必須）

ソースコードの取得方法を指定します。

<table>
  <thead><tr><th>値</th><th>用途</th></tr></thead>
  <tbody>
    <tr><td><code>'dynamic'</code></td><td>args に追従してソースをリアルタイム更新</td></tr>
    <tr><td><code>'code'</code></td><td>ファイルに書いた render 関数のコードをそのまま表示</td></tr>
  </tbody>
</table>

\`\`\`typescript
// args を使うストーリー
parameters: {
  docs: { source: createHtmlSource({ extract: 'dynamic' }) },
},
args: { label: 'ボタン' },

// render を使うストーリー
parameters: {
  docs: { source: createHtmlSource({ extract: 'code' }) },
},
render: () => <Component><Child /></Component>,
\`\`\`

### \`format\`（省略可）

ソースの表示フォーマットを指定します。

<table>
  <thead><tr><th>値</th><th>表示内容</th></tr></thead>
  <tbody>
    <tr><td><code>'html'</code></td><td>レンダリング後のHTMLを表示</td></tr>
    <tr><td><code>'jsx'</code></td><td>JSXをそのまま表示</td></tr>
    <tr><td>省略</td><td>グローバル設定（<code>STORYBOOK_HTML_TRANSFORM</code> 環境変数）を使用</td></tr>
  </tbody>
</table>

\`\`\`typescript
createHtmlSource({ extract: 'code', format: 'html' })    // HTMLを表示
createHtmlSource({ extract: 'dynamic', format: 'jsx' })  // JSXを表示
createHtmlSource({ extract: 'dynamic' })                  // グローバル設定に従う
\`\`\`

## グローバル設定

\`STORYBOOK_HTML_TRANSFORM\` 環境変数で全体の動作を制御できます。

\`\`\`bash
STORYBOOK_HTML_TRANSFORM=true npm run build-storybook  # HTML変換ON
\`\`\`

デフォルトは \`false\`（JSX表示）です。
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

// ----------------------------------------------------------------
// extract: 'dynamic'
// ----------------------------------------------------------------

export const ArgsFormatDefault: Story = {
  name: 'dynamic / format: 省略',
  parameters: {
    docs: {
      source: createHtmlSource({ extract: 'dynamic' }),
      description: { story: "グローバル設定に従う<br>`createHtmlSource({ extract: 'dynamic' })`" },
    },
  },
  args: { lv: '2', children: '見出しレベル2' },
  render: ({ lv, children }) => <Heading lv={lv}>{children}</Heading>,
};

export const ArgsFormatJsx: Story = {
  name: 'dynamic / format: jsx',
  parameters: {
    docs: {
      source: createHtmlSource({ extract: 'dynamic', format: 'jsx' }),
      description: {
        story: "JSX を表示する<br>`createHtmlSource({ extract: 'dynamic', format: 'jsx' })`",
      },
    },
  },
  args: { lv: '2', children: '見出しレベル2' },
  render: ({ lv, children }) => <Heading lv={lv}>{children}</Heading>,
};

export const ArgsFormatHtml: Story = {
  name: 'dynamic / format: html',
  parameters: {
    docs: {
      source: createHtmlSource({ extract: 'dynamic', format: 'html' }),
      description: {
        story: "HTML を表示する<br>`createHtmlSource({ extract: 'dynamic', format: 'html' })`",
      },
    },
  },
  args: { lv: '2', children: '見出しレベル2' },
  render: ({ lv, children }) => <Heading lv={lv}>{children}</Heading>,
};

// ----------------------------------------------------------------
// extract: 'code'
// ----------------------------------------------------------------

export const RenderFormatDefault: Story = {
  name: 'code / format: 省略',
  parameters: {
    docs: {
      source: createHtmlSource({ extract: 'code' }),
      description: { story: "グローバル設定に従う<br>`createHtmlSource({ extract: 'code' })`" },
    },
  },
  render: () => (
    <Accordion>
      <Accordion.Summary>アコーディオンのタイトル</Accordion.Summary>
      <Accordion.Body>アコーディオンの本文です。</Accordion.Body>
    </Accordion>
  ),
};

export const RenderFormatJsx: Story = {
  name: 'code / format: jsx',
  parameters: {
    docs: {
      source: createHtmlSource({ extract: 'code', format: 'jsx' }),
      description: {
        story: "JSX を表示する<br>`createHtmlSource({ extract: 'code', format: 'jsx' })`",
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

export const RenderFormatHtml: Story = {
  name: 'code / format: html',
  parameters: {
    docs: {
      source: createHtmlSource({ extract: 'code', format: 'html' }),
      description: {
        story: "HTML を表示する<br>`createHtmlSource({ extract: 'code', format: 'html' })`",
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
