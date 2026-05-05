import { Button } from '@components/index.tsx';
import { createHtmlSource } from '@stories/assets/utils/htmlTransform';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'This-Site/ボタン',
  component: Button,
  parameters: {
    docs: {
      source: createHtmlSource({ extract: 'dynamic' }),
    },
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: 'text',
      table: { category: '基本' },
    },
    href: {
      control: 'text',
      table: { category: '基本' },
    },
    icon: {
      control: 'check',
      options: ['external', 'pdf', 'arrow-right', 'arrow-left'],
      table: { category: '基本' },
    },
    target: {
      control: 'select',
      description: '外部リンク',
      options: ['', '_blank'],
      table: { category: '基本' },
    },
    className: {
      control: 'text',
      table: { category: '任意の設定' },
    },
    tag: {
      control: 'text',
      table: { category: '任意の設定' },
    },
    prefix: {
      control: 'text',
      table: { category: '高度な設定' },
    },
    suffix: {
      control: 'text',
      table: { category: '高度な設定' },
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  name: '通常のボタン',
  tags: ['!dev'],
  args: {
    children: 'ボタンラベル',
    href: '★★★',
  },
};

export const HTML: Story = {
  name: 'HTMLタグの切り替え',
  args: {
    href: '',
    children: 'HTMLタグの切り替え',
  },
  parameters: {
    docs: {
      description: {
        story:
          ' `href`属性を付与すると`<a>`タグとしてレンダリングされ、リンクとして機能します。`href`属性がない場合は`<button>`タグとしてレンダリングされます。また、`tag`属性を使用して明示的にタグを指定することも可能です。',
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="u-flex u-flex-wrap u-gap-y-xs u-gap-x-sm">
        <Story />
      </div>
    ),
  ],
  render: () => (
    <>
      <Button href="★★★">aタグ</Button>
      <Button>buttonタグ</Button>
      <Button as="span">HTMLタグの指定（span指定）</Button>
    </>
  ),
};

export const ExternalIconButton: Story = {
  name: '外部リンクアイコン付与',
  parameters: {
    docs: {
      description: {
        story:
          '`target="_blank"`が指定されたリンクボタンに自動的に外部リンクアイコンを付与します。`icon`プロパティで`!external`を指定すると、外部リンクアイコンの付与を抑制できます。',
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="u-flex u-flex-wrap u-gap-y-xs u-gap-x-sm">
        <Story />
      </div>
    ),
  ],
  render: () => (
    <>
      <Button href="https://mysnippets.tech/" target="_blank">
        httpsリンク
      </Button>
      <Button href="https://mysnippets.tech/" target="_blank" icon={['!external']}>
        httpsリンク（アイコンなし）
      </Button>
    </>
  ),
};

export const OtherIconButton: Story = {
  name: 'その他アイコン付与',
  decorators: [
    (Story) => (
      <div className="u-flex u-flex-wrap u-gap-y-xs u-gap-x-sm">
        <Story />
      </div>
    ),
  ],
  render: () => (
    <>
      <Button href="https://mysnippets.tech/" target="_blank">
        httpsリンク
      </Button>
      <Button href="https://mysnippets.tech/" target="_blank" icon={['pdf', '!external']}>
        PDFアイコン付与
      </Button>
      <Button href="★★★" icon={['arrow-right', '!external']}>
        右矢印アイコン付与
      </Button>
      <Button href="★★★" icon={['arrow-left', '!external']}>
        左矢印アイコン付与
      </Button>
    </>
  ),
};

export const InactiveButton: Story = {
  name: '非活性ボタン',
  decorators: [
    (Story) => (
      <div className="u-flex u-flex-wrap u-gap-y-xs u-gap-x-sm">
        <Story />
      </div>
    ),
  ],
  render: () => (
    <>
      <Button href="https://mysnippets.tech/" inert>
        inertによる非活性（読み上げなし）
      </Button>
      <Button href="https://mysnippets.tech/" tabindex={-1}>
        tabindexによる非活性（読み上げあり）
      </Button>
    </>
  ),
};

export const CustomIconButton: Story = {
  name: '独自アイコンの付与',
  parameters: {
    docs: {
      description: {
        story:
          '`prefix`、`suffix`プロパティを使用して、ボタン全体の前後に任意のHTML要素を追加できます。これにより、独自のアイコンや装飾をボタンに付与することが可能です。',
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="u-flex u-flex-col u-gap-y-xs u-gap-x-sm">
        <Story />
      </div>
    ),
  ],
  render: () => (
    <>
      <Button href="★★★">
        <span className="u-text-[red]">★</span>
        1.ラベル内のテキスト前にHTMLを追加
      </Button>
      <Button href="★★★">
        2.ラベル内のテキスト後にHTMLを追加
        <span className="u-text-[red]">●</span>
      </Button>
      <Button href="★★★" prefix={<span className="u-text-[red]">■</span>}>
        3.ラベルタグ前にHTMLを追加
      </Button>
      <Button href="★★★" suffix={<span className="u-text-[red]">▲</span>}>
        4.ラベルタグ後にHTMLを追加
      </Button>
      <Button
        href="★★★"
        prefix={<span className="u-text-[red]">■</span>}
        suffix={<span className="u-text-[red]">▲</span>}
      >
        <span className="u-text-[red]">★</span>
        全ての位置にHTMLを追加
        <span className="u-text-[red]">●</span>
      </Button>
    </>
  ),
};

export const WidthButton: Story = {
  name: '固定幅ボタン（テキスト折り返しあり）',
  parameters: {
    docs: {
      description: {
        story: '',
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="u-flex u-flex-col u-gap-y-xs u-gap-x-sm">
        <Story />
      </div>
    ),
  ],
  render: () => (
    <>
      <Button href="★★★" className="sm:u-btn-200px">
        ボタン小
      </Button>
      <Button href="★★★" className="sm:u-btn-300px">
        ボタン中
      </Button>
      <Button href="★★★" className="sm:u-btn-400px">
        ボタン大
      </Button>
    </>
  ),
};

export const MinWidthButton: Story = {
  name: '最小幅設定ボタン（テキスト量に応じてボタン幅が変動）',
  parameters: {
    docs: {
      description: {
        story: '',
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="u-flex u-flex-col u-gap-y-xs u-gap-x-sm">
        <Story />
      </div>
    ),
  ],
  render: () => (
    <>
      <Button href="★★★" className="sm:u-min-btn-200px">
        ボタン小
      </Button>
      <Button href="★★★" className="sm:u-min-btn-300px">
        ボタン中
      </Button>
      <Button href="★★★" className="sm:u-min-btn-400px">
        ボタン大
      </Button>
    </>
  ),
};
