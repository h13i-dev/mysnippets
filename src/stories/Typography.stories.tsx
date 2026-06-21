import { createHtmlSource } from '@stories/assets/utils/htmlTransform';
import type { Meta, StoryObj } from '@storybook/react-vite';
import clsx from 'clsx';
import Highlight from '../components/Highlight';

interface TypographyArgs {
  size?: string;
  class?: string;
  text: string;
}

const meta: Meta<TypographyArgs> = {
  title: 'タイポグラフィー',
  tags: ['autodocs'],
  parameters: {
    docs: {
      source: createHtmlSource(),
    },
  },
  args: {
    size: '',
    class: '',
    text: '吾輩は猫である。名前はまだ無い。どこで生れたかとんと見当がつかぬ。何でも薄暗いじめじめした所でニャーニャー泣いていた事だけは記憶している。吾輩はここで始めて人間というものを見た。',
  },
  argTypes: {
    size: {
      description: 'ヘルパークラスの指定',
      control: { type: 'select' },
      options: ['', 'u-text-sm', 'u-text-base', 'u-text-lg'],
    },
    class: {
      description: '追加のクラス名の指定',
      control: { type: 'text' },
    },
    text: {
      description: '表示するテキスト',
      control: { type: 'text' },
    },
  },
};

export default meta;
type Story = StoryObj<TypographyArgs>;

export const Interactive: Story = {
  name: 'インタラクティブ',
  tags: ['!dev', '!autodocs'],
  render: ({ size, text, class: className }) => {
    const classes = clsx(size, className);
    return <p className={classes || undefined}>{text}</p>;
  },
};

export const Text: Story = {
  name: '通常サイズのテキスト',
  render: () => {
    return (
      <p>
        吾輩は猫である。名前はまだ無い。どこで生れたかとんと見当がつかぬ。何でも薄暗いじめじめした所でニャーニャー泣いていた事だけは記憶している。吾輩はここで始めて人間というものを見た。
      </p>
    );
  },
};

export const BaseSizeText: Story = {
  name: '通常サイズのテキスト（明示的にヘルパークラスを指定）',
  render: () => {
    return (
      <p className="u-text-base">
        吾輩は猫である。名前はまだ無い。どこで生れたかとんと見当がつかぬ。何でも薄暗いじめじめした所でニャーニャー泣いていた事だけは記憶している。吾輩はここで始めて人間というものを見た。
      </p>
    );
  },
};

export const SmallSizeText: Story = {
  name: '小サイズのテキスト',
  render: () => {
    return (
      <p className="u-text-sm">
        吾輩は猫である。名前はまだ無い。どこで生れたかとんと見当がつかぬ。何でも薄暗いじめじめした所でニャーニャー泣いていた事だけは記憶している。吾輩はここで始めて人間というものを見た。
      </p>
    );
  },
};

export const LargeSizeText: Story = {
  name: '大サイズのテキスト',
  render: () => {
    return (
      <p className="u-text-lg">
        吾輩は猫である。名前はまだ無い。どこで生れたかとんと見当がつかぬ。何でも薄暗いじめじめした所でニャーニャー泣いていた事だけは記憶している。吾輩はここで始めて人間というものを見た。
      </p>
    );
  },
};

export const OtherSizeText: Story = {
  name: 'その他フォントサイズの指定',
  parameters: {
    docs: {
      description: {
        story: `<table>
<tr>
  <th>ヘルパークラス</th>
  <th>余白サイズ範囲</th>
  <th>レスポンシブ幅</th>
  <th>備考</th>
</tr>
<tr>
  <td>u-text-xs</td>
  <td>11px~12px</td>
  <td>640px~1280px</td>
  <td></td>
</tr>
<tr>
  <td>u-text-sm</td>
  <td>12px~14px</td>
  <td>640px~1280px</td>
  <td></td>
</tr>
<tr>
  <td>u-text-base</td>
  <td>14px~16px</td>
  <td>640px~1280px</td>
  <td>デフォルト</td>
</tr>
<tr>
  <td>u-text-lg</td>
  <td>16px~18px</td>
  <td>640px~1280px</td>
  <td></td>
</tr>
<tr>
  <td>u-text-xl</td>
  <td>18px~20px</td>
  <td>640px~1280px</td>
  <td></td>
</tr>
<tr>
  <td>u-text-2xl</td>
  <td>20px~24px</td>
  <td>640px~1280px</td>
  <td>見出しレベル4</td>
</tr>
<tr>
  <td>u-text-3xl</td>
  <td>24px~30px</td>
  <td>640px~1280px</td>
  <td>見出しレベル3</td>
</tr>
<tr>
  <td>u-text-4xl</td>
  <td>30px~16px</td>
  <td>640px~1280px</td>
  <td>見出しレベル2</td>
</tr>
<tr>
  <td>u-text-5xl</td>
  <td>36px~48px</td>
  <td>640px~1280px</td>
  <td>見出しレベル1</td>
</tr>
<tr>
  <td>u-text-6xl</td>
  <td>48px~60px</td>
  <td>640px~1280px</td>
  <td></td>
</tr>
<tr>
  <td>u-text-7xl</td>
  <td>60px~72px</td>
  <td>640px~1280px</td>
  <td></td>
</tr>
<tr>
  <td>u-text-8xl</td>
  <td>72px~96px</td>
  <td>640px~1280px</td>
  <td></td>
</tr>
<tr>
  <td>u-text-9xl</td>
  <td>96px~128px</td>
  <td>640px~1280px</td>
  <td></td>
</tr>
</table>`,
      },
    },
  },
  render: () => {
    return (
      <>
        <p className="u-text-xs">u-text-xs</p>
        <p className="u-text-sm">u-text-sm</p>
        <p className="u-text-base">u-text-base</p>
        <p className="u-text-lg">u-text-lg</p>
        <p className="u-text-xl">u-text-xl</p>
        <p className="u-text-2xl">u-text-2xl</p>
        <p className="u-text-3xl">u-text-3xl</p>
        <p className="u-text-4xl">u-text-4xl</p>
        <p className="u-text-5xl">u-text-5xl</p>
        <p className="u-text-6xl">u-text-6xl</p>
        <p className="u-text-7xl">u-text-7xl</p>
        <p className="u-text-8xl">u-text-8xl</p>
        <p className="u-text-9xl">u-text-9xl</p>
      </>
    );
  },
};

export const TailwindText: Story = {
  name: 'Tailwindによるフォントサイズの指定',
  parameters: {
    docs: {
      description: {
        story: `\`u-text-*\`は、px指定も可能です。12pxから100pxまで2px刻みで設定できます。\`例: u-text-12px, u-text-14px, ..., u-text-100px\`<br>
<strong className="u-text-danger">※ただし、まずは<a href="#anchor--components-タイポグラフィー--other-size-text">\`*-sm\`や\`*-lg\`などの識別子を利用したヘルパークラス</a>を優先的に使用することを検討してください。</strong>
`,
      },
    },
  },
  render: () => {
    return (
      <>
        <p className="u-text-14px">u-text-14px</p>
        <p className="u-text-18px">u-text-18px</p>
        <p className="u-text-24px">u-text-24px</p>
        <p className="u-text-40px">u-text-40px</p>
      </>
    );
  },
};

export const NotLineBreak: Story = {
  name: '改行しないテキストの指定',
  render: () => {
    return (
      <p>
        テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト
        <span className="u-inline-block">【途中改行されないテキスト】</span>
        テキストテキストテキストテキストテキストテキスト
      </p>
    );
  },
};

export const WbrLineBreakLoose: Story = {
  name: 'テキストの改行ポイント指定（Loose）',
  parameters: {
    docs: {
      description: {
        story:
          '改行ポイントを指定したい箇所に`<wbr />`を挿入してください。指定箇所以外でも必要に応じて柔軟に改行されます。',
      },
    },
  },
  render: () => {
    return (
      <p className="u-wbr-loose">
        テキストテキストテキスト【改行ポイント】
        <wbr aria-hidden="true" />
        テキストテキストテキスト【改行ポイント】
        <wbr aria-hidden="true" />
        テキストテキストテキスト【改行ポイント】
        <wbr aria-hidden="true" />
        テキストテキストテキスト【改行ポイント】
        <wbr aria-hidden="true" />
        テキストテキストテキスト【改行ポイント】
        <wbr aria-hidden="true" />
        テキストテキストテキスト【改行ポイント】
      </p>
    );
  },
};

export const WbrLineBreak: Story = {
  name: 'テキストの改行ポイント指定（Strict）',
  parameters: {
    docs: {
      description: {
        story:
          '改行ポイントを指定したい箇所に`<wbr />`を挿入してください。レスポンシブで柔軟に改行されないため、レイアウトが崩れる可能性があることに注意してください。<a href="#anchor--components-タイポグラフィー--wbr-line-break-loose">Loose</a>を優先的に使用することを推奨します。',
      },
    },
  },
  render: () => {
    return (
      <p className="u-wbr-strict">
        テキストテキストテキスト【改行ポイント】
        <wbr aria-hidden="true" />
        テキストテキストテキスト【改行ポイント】
        <wbr aria-hidden="true" />
        テキストテキストテキスト【改行ポイント】
        <wbr aria-hidden="true" />
        テキストテキストテキスト【改行ポイント】
        <wbr aria-hidden="true" />
        テキストテキストテキスト【改行ポイント】
        <wbr aria-hidden="true" />
        テキストテキストテキスト【改行ポイント】
      </p>
    );
  },
};

export const VerticalWriting: Story = {
  name: '縦文字',
  render: () => {
    return <p className="u-vertical-writing">吾輩は猫である</p>;
  },
};

export const TextOverflow: Story = {
  name: 'テキストオーバーフロー',
  render: () => {
    return (
      <p className="u-text-overflow-[2]">
        吾輩は猫である。名前はまだ無い。どこで生れたかとんと見当がつかぬ。何でも薄暗いじめじめした所でニャーニャー泣いていた事だけは記憶している。吾輩はここで始めて人間というものを見た。吾輩は猫である。名前はまだ無い。どこで生れたかとんと見当がつかぬ。何でも薄暗いじめじめした所でニャーニャー泣いていた事だけは記憶している。吾輩はここで始めて人間というものを見た。吾輩は猫である。名前はまだ無い。どこで生れたかとんと見当がつかぬ。何でも薄暗いじめじめした所でニャーニャー泣いていた事だけは記憶している。吾輩はここで始めて人間というものを見た。吾輩は猫である。名前はまだ無い。どこで生れたかとんと見当がつかぬ。何でも薄暗いじめじめした所でニャーニャー泣いていた事だけは記憶している。吾輩はここで始めて人間というものを見た。吾輩は猫である。名前はまだ無い。どこで生れたかとんと見当がつかぬ。何でも薄暗いじめじめした所でニャーニャー泣いていた事だけは記憶している。吾輩はここで始めて人間というものを見た。吾輩は猫である。名前はまだ無い。どこで生れたかとんと見当がつかぬ。何でも薄暗いじめじめした所でニャーニャー泣いていた事だけは記憶している。吾輩はここで始めて人間というものを見た。
      </p>
    );
  },
};

export const TextInlinePosition: Story = {
  name: 'テキスト左右配置',
  render: () => {
    return (
      <>
        <p className="u-text-left">左寄せ（デフォルト）</p>
        <p className="u-text-right">右寄せ</p>
        <p className="u-text-center">中央寄せ</p>
      </>
    );
  },
};

export const TextBlockPosition: Story = {
  name: 'テキスト上下配置',
  decorators: [
    (Story) => (
      <div className="u-flex u-flex-col u-gap-y-xs [&_img]:u-mr-16px">
        <Story />
      </div>
    ),
  ],
  render: () => {
    return (
      <>
        <p>
          <img
            className="u-inline"
            src="https://placehold.jp/120x80.png"
            alt=""
            width="120"
            height="80"
          />
          <span className="u-align-top">縦方向上揃え（u-align-top）</span>
        </p>
        <p>
          <img
            className="u-inline"
            src="https://placehold.jp/120x80.png"
            alt=""
            width="120"
            height="80"
          />
          <span className="u-align-middle">縦方向中央（u-align-middle）</span>
        </p>
        <p>
          <img
            className="u-inline"
            src="https://placehold.jp/120x80.png"
            alt=""
            width="120"
            height="80"
          />
          <span className="u-align-bottom">縦方向下揃え（u-align-bottom）</span>
        </p>
      </>
    );
  },
};

export const TextColor: Story = {
  name: 'テキストカラーの変更',
  render: () => {
    return (
      <>
        <p className="u-text-primary">メインカラー（u-text-primary）</p>
        <p className="u-text-secondary">サブカラー（u-text-secondary）</p>
        <p className="u-text-danger">警告（u-text-danger）</p>
      </>
    );
  },
};

export const FontStyle: Story = {
  name: '太文字、通常の太さ、下線、欧文フォント',
  render: () => {
    return (
      <>
        <p className="u-font-bold">太文字テキスト（u-font-bold）</p>
        <p className="u-font-medium">中間の太さのテキスト（u-font-medium）</p>
        <p className="u-font-normal">通常の太さのテキスト（u-font-normal）</p>
        <p className="u-font-light">細いウェイトのテキスト（u-font-light）</p>
        <p className="u-underline">下線テキスト（u-underline）</p>
        <address className="u-not-italic">斜体を正体に変更する（u-not-italic）</address>
      </>
    );
  },
};

export const HighlightDefault: Story = {
  name: 'ハイライト（markタグ）',
  parameters: {
    docs: {
      description: {
        story: 'ハイライト表示に使用。視覚的に目立たせたい箇所に使用します。',
      },
    },
  },
  render: () => {
    return (
      <>
        <p>
          この文章で<Highlight>重要な部分</Highlight>をハイライト表示します。
        </p>
        <p>
          検索結果で<Highlight>キーワード</Highlight>が強調表示されています。
        </p>
        <p>
          文書内の<Highlight>更新箇所</Highlight>を視覚的に示します。
        </p>
      </>
    );
  },
};

export const HighlightStrong: Story = {
  name: 'ハイライト（strongタグ）',
  parameters: {
    docs: {
      description: {
        story: '重要性を示す強調：コンテンツの重要度を示したい箇所に使用します。',
      },
    },
  },
  render: () => {
    return (
      <>
        <p>
          <Highlight as="strong">警告</Highlight>: この操作は元に戻せません。
        </p>
        <p>
          会議の<Highlight as="strong">必須参加者</Highlight>は全員出席してください。
        </p>
        <p>
          <Highlight as="strong">重要</Highlight>: パスワードは定期的に変更してください。
        </p>
      </>
    );
  },
};

export const HighlightEmphasis: Story = {
  name: 'ハイライト（emタグ）',
  parameters: {
    docs: {
      description: {
        story: '意味的な強調：読み方や意味を強調したい箇所に使用します。',
      },
    },
  },
  render: () => {
    return (
      <>
        <p>
          私は<Highlight as="em">本当に</Highlight>そう思います。
        </p>
        <p>
          この商品は<Highlight as="em">今だけ</Highlight>特別価格です。
        </p>
        <p>
          彼女は<Highlight as="em">絶対に</Highlight>来ると言っていました。
        </p>
      </>
    );
  },
};

export const HighlightLongText: Story = {
  name: 'ハイライト（長いテキスト）',
  render: () => {
    return (
      <p>
        吾輩は猫である。名前はまだ無い。
        <Highlight>
          どこで生れたかとんと見当がつかぬ。何でも薄暗いじめじめした所でニャーニャー泣いていた事だけは記憶している。
        </Highlight>
        吾輩はここで始めて人間というものを見た。
      </p>
    );
  },
};

export const HighlightWithCustomClass: Story = {
  name: 'ハイライト（カスタムクラス）',
  parameters: {
    docs: {
      description: {
        story: 'カスタマイズが必要な場合は、ヘルパークラスを使用してください。',
      },
    },
  },
  render: () => {
    return (
      <p>
        この文章には<Highlight className="u-text-danger">カスタムクラスを持つハイライト</Highlight>
        が含まれています。
      </p>
    );
  },
};
