import type { ArticleCardProps } from '@components/ArticleCard';
import { ArticleCard } from '@components/index.tsx';
import { createHtmlSource } from '@stories/assets/utils/htmlTransform';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<ArticleCardProps> = {
  title: 'This-Site/固有モジュール/記事カード',
  component: ArticleCard,
  tags: ['autodocs'],
  parameters: {
    docs: {
      source: createHtmlSource({ extract: 'dynamic' }),
    },
  },
  argTypes: {
    type: {
      description: 'カードの種類（zenn形式など）',
      control: { type: 'select' },
      options: [undefined, 'zenn'],
    },
    icon: {
      description: 'カードに表示するアイコン',
      control: { type: 'text' },
    },
    title: {
      description: 'カードのタイトル',
      control: { type: 'text' },
    },
    href: {
      description: 'リンク先のURL',
      control: { type: 'text' },
    },
    date: {
      description: '表示する日付（YYYY.MM.DD形式）',
      control: { type: 'text' },
    },
    tags: {
      description: '表示するタグの配列',
      control: { type: 'object' },
    },
    tagLinkBase: {
      description: 'タグリンクのベースURL',
      control: { type: 'text' },
    },
    target: {
      description: 'リンクの開き方',
      control: { type: 'radio' },
      options: [undefined, '_blank', '_self'],
    },
    liked: {
      description: 'いいね数（zennタイプのカード用）',
      control: { type: 'number' },
    },
    className: {
      description: '追加のCSSクラス',
      control: { type: 'text' },
    },
  },
};

export default meta;
type Story = StoryObj<ArticleCardProps>;

export const Default: Story = {
  name: '基本的なテキストカード',
  parameters: {
    docs: {
      description: {
        story: '基本的なブログカードの表示です。アイコン、タイトル、日付、タグが表示されます。',
      },
    },
  },
  args: {
    title: 'ブログのタイトルが入ります',
    href: '/blog/sample-post',
    date: '2024.03.01',
    tags: ['React', 'TypeScript'],
    icon: '📝',
  },
};

export const WithoutIcon: Story = {
  name: 'アイコンなしカード',
  parameters: {
    docs: {
      description: {
        story: 'アイコンが指定されていない場合の表示例です。',
      },
    },
  },
  args: {
    title: 'アイコンなしのブログタイトル',
    href: '/blog/no-icon-post',
    date: '2024.02.15',
    tags: ['JavaScript', 'Web開発'],
  },
};

export const LongTitle: Story = {
  name: '長いタイトルのカード',
  parameters: {
    docs: {
      description: {
        story: 'タイトルが長い場合の表示例です。2行で省略されて表示されます。',
      },
    },
  },
  args: {
    title:
      'Reactで始めるモダンWebフロントエンド開発：TypeScriptとの組み合わせでより型安全で保守性の高いアプリケーションを構築する方法について詳しく解説',
    href: '/blog/long-title-post',
    date: '2024.01.20',
    tags: ['React', 'TypeScript', 'Web開発', 'フロントエンド'],
    icon: '⚛️',
  },
};

export const ManyTags: Story = {
  name: '多数のタグ付きカード',
  parameters: {
    docs: {
      description: {
        story: 'タグが多い場合の表示例です。3つまで表示され、残りは「他○個」で表示されます。',
      },
    },
  },
  args: {
    title: 'フルスタック開発の完全ガイド',
    href: '/blog/many-tags-post',
    date: '2024.03.10',
    tags: [
      'React',
      'TypeScript',
      'Node.js',
      'Express',
      'MongoDB',
      'Docker',
      'AWS',
      'GraphQL',
      'REST API',
      'Jest',
    ],
    icon: '🚀',
  },
};

export const ExternalLink: Story = {
  name: '外部リンクカード',
  parameters: {
    docs: {
      description: {
        story: 'target="_blank"を指定した場合、外部リンクアイコンが表示されます。',
      },
    },
  },
  args: {
    title: '外部サイトの記事タイトル',
    href: 'https://example.com/external-article',
    date: '2024.02.28',
    tags: ['外部記事', '参考資料'],
    icon: '🔗',
    target: '_blank',
  },
};

export const ZennType: Story = {
  name: 'Zenn形式のカード',
  parameters: {
    docs: {
      description: {
        story:
          'type="zenn"を指定するとZenn形式の表示になります。いいね数やタグの表示形式が変わります。',
      },
    },
  },
  args: {
    type: 'zenn',
    title: 'Zenn記事のタイトルが入ります',
    href: 'https://zenn.dev/example/articles/sample',
    date: '2025.07.21',
    tags: ['tech', 'frontend'],
    icon: '👍',
    target: '_blank',
    liked: 42,
  },
};

export const ZennWithoutLike: Story = {
  name: 'いいね数なしのZennカード',
  parameters: {
    docs: {
      description: {
        story: 'Zenn形式でいいね数が0または未指定の場合の表示例です。',
      },
    },
  },
  args: {
    type: 'zenn',
    title: 'いいね数なしのZenn記事',
    href: 'https://zenn.dev/example/articles/no-like',
    date: '2025.06.15',
    tags: ['tutorial', 'beginner'],
    icon: '📚',
    target: '_blank',
    liked: 0,
  },
};

export const WithoutTags: Story = {
  name: 'タグなしカード',
  parameters: {
    docs: {
      description: {
        story: 'タグが指定されていない場合の表示例です。',
      },
    },
  },
  args: {
    title: 'タグなしの記事タイトル',
    href: '/blog/no-tags-post',
    date: '2024.01.10',
    icon: '📄',
  },
};

export const CustomTagBase: Story = {
  name: 'カスタムタグベースURL',
  parameters: {
    docs: {
      description: {
        story: 'tagLinkBaseを変更してタグリンクのベースURLをカスタマイズした例です。',
      },
    },
  },
  args: {
    title: 'カスタムタグベースの記事',
    href: '/blog/custom-tag-base',
    date: '2024.04.05',
    tags: ['React', 'カスタマイズ'],
    icon: '⚙️',
    tagLinkBase: '/categories/',
  },
};

export const MultipleCards: Story = {
  name: '複数のカード表示',
  parameters: {
    docs: {
      description: {
        story: '複数のテキストカードを並べて表示する場合の例です。記事一覧などで使用されます。',
      },
    },
  },
  render: () => {
    return (
      <div className="c-grid" data-config="[1][md:2]">
        <ArticleCard
          title="最新のReact開発手法"
          href="/blog/latest-react"
          date="2024.03.15"
          tags={['React', 'Hooks']}
          icon="⚛️"
        />
        <ArticleCard
          title="TypeScriptベストプラクティス"
          href="/blog/typescript-best-practices"
          date="2024.03.10"
          tags={['TypeScript', 'ベストプラクティス']}
          icon="🔷"
        />
        <ArticleCard
          type="zenn"
          title="Next.js 14の新機能解説"
          href="https://zenn.dev/example/next14"
          date="2024.03.05"
          tags={['nextjs', 'react']}
          icon="🚀"
          target="_blank"
          liked={28}
        />
      </div>
    );
  },
};
