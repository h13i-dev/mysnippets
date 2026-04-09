import type { Meta, StoryObj } from '@storybook/react-vite';
import { createHtmlSource } from '../../assets/utils/htmlTransform';
import './pipe-separator.scss';

const meta = {
  title: '_Dev/Demo/縦線区切り（Pipe Separator）',
  tags: ['autodocs'],
  parameters: {
    docs: {
      source: createHtmlSource('dynamic'),
      description: {
        component:
          'HTMLリスト要素を縦線（パイプ記号）で区切るための3つの実装方法を比較するデモです。',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const FlexGap: Story = {
  name: 'flex + gap',
  parameters: {
    docs: {
      description: {
        story:
          "記述が冗長で、スタイルの記述量は一番簡潔。`<span class='pipe'></span>`要素を各リンク間に配置する方式。",
      },
    },
  },
  render: () => {
    return (
      <div className="p-pipe_flex-gap">
        <a className="c-link" href="★★★">
          ホームページへ戻る
        </a>
        <span className="pipe"></span>
        <a className="c-link" href="★★★">
          お問い合わせフォーム
        </a>
        <span className="pipe"></span>
        <a className="c-link" href="★★★">
          よくある質問とその回答
        </a>
        <span className="pipe"></span>
        <a className="c-link" href="★★★">
          プライバシーポリシーと利用規約
        </a>
        <span className="pipe"></span>
        <a className="c-link" href="★★★">
          サイトマップ
        </a>
        <span className="pipe"></span>
        <a className="c-link" href="★★★">
          会社概要・アクセス情報
        </a>
        <span className="pipe"></span>
        <a className="c-link" href="★★★">
          採用情報
        </a>
      </div>
    );
  },
};

export const Border: Story = {
  name: 'border',
  parameters: {
    docs: {
      description: {
        story:
          '縦棒の高さを変化させる際は、line-heightを変える必要がある。`<span>`要素の間にborderを使用する方式。',
      },
    },
  },
  render: () => {
    return (
      <div className="p-pipe_border">
        <a className="c-link" href="★★★">
          ホームページへ戻る
        </a>
        <a className="c-link" href="★★★">
          お問い合わせフォーム
        </a>
        <a className="c-link" href="★★★">
          よくある質問とその回答
        </a>
        <a className="c-link" href="★★★">
          プライバシーポリシーと利用規約
        </a>
        <a className="c-link" href="★★★">
          サイトマップ
        </a>
        <a className="c-link" href="★★★">
          会社概要・アクセス情報
        </a>
        <a className="c-link" href="★★★">
          採用情報
        </a>
      </div>
    );
  },
};

export const PseudoElement: Story = {
  name: '::after（疑似要素）',
  parameters: {
    docs: {
      description: {
        story:
          '一番バランスは良さそう。リンク要素のみで、疑似要素で縦線を生成する方式。HTMLがシンプルで保守性が良い。',
      },
    },
  },
  render: () => {
    return (
      <div className="p-pipe_after">
        <a className="c-link" href="★★★">
          ホームページへ戻る
        </a>
        <a className="c-link" href="★★★">
          お問い合わせフォーム
        </a>
        <a className="c-link" href="★★★">
          よくある質問とその回答
        </a>
        <a className="c-link" href="★★★">
          プライバシーポリシーと利用規約
        </a>
        <a className="c-link" href="★★★">
          サイトマップ
        </a>
        <a className="c-link" href="★★★">
          会社概要・アクセス情報
        </a>
        <a className="c-link" href="★★★">
          採用情報
        </a>
      </div>
    );
  },
};
