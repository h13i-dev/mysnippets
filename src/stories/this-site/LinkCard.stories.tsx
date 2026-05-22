import { LinkCard } from '@components/index.tsx';
import type { LinkCardProps } from '@components/LinkCard';
import { createHtmlSource } from '@stories/assets/utils/htmlTransform';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<LinkCardProps> = {
  title: 'This-Site/固有モジュール/リンクカード',
  component: LinkCard,
  tags: ['autodocs'],
  parameters: {
    docs: {
      source: createHtmlSource(),
    },
  },
  argTypes: {
    url: {
      description: 'リンク先のURL',
      control: { type: 'text' },
    },
    title: {
      description: 'ページのタイトル',
      control: { type: 'text' },
    },
    description: {
      description: 'ページの説明文',
      control: { type: 'text' },
    },
    image: {
      description: 'サムネイル画像のURL',
      control: { type: 'text' },
    },
    siteName: {
      description: 'サイト名',
      control: { type: 'text' },
    },
    favicon: {
      description: 'faviconのURL',
      control: { type: 'text' },
    },
    target: {
      description: 'リンクの開き方',
      control: { type: 'radio' },
      options: ['_blank', '_self'],
    },
    className: {
      description: '追加のCSSクラス',
      control: { type: 'text' },
    },
  },
};

export default meta;
type Story = StoryObj<LinkCardProps>;

export const Default: Story = {
  name: '基本的なリンクカード',
  parameters: {
    docs: {
      description: {
        story: '基本的なリンクカードの表示です。外部サイトへのリンクとして使用します。',
      },
    },
  },
  args: {
    url: 'https://example.com',
    title: 'タイトルが入ります',
    description:
      '説明文が入ります。説明文が入ります。説明文が入ります。説明文が入ります。説明文が入ります。説明文が入ります。説明文が入ります。説明文が入ります。説明文が入ります。',
    image: 'https://placehold.jp/1200x630.png',
    siteName: 'My Snippets',
    favicon: '/favicon.ico',
    target: '_blank',
  },
};

export const WithoutImage: Story = {
  name: '画像なしのリンクカード',
  parameters: {
    docs: {
      description: {
        story:
          'サムネイル画像が指定されていない場合の表示例です。テキスト情報のみでカードが構成されます。',
      },
    },
  },
  args: {
    url: 'https://example.com',
    title: '画像なしリンクカードのタイトル',
    description: 'こちらは画像を含まないリンクカードの例です。テキスト情報のみで構成されています。',
    siteName: 'Example Site',
    favicon: '/favicon.ico',
    target: '_blank',
  },
};

export const WithoutFavicon: Story = {
  name: 'faviconなしのリンクカード',
  parameters: {
    docs: {
      description: {
        story: 'faviconが指定されていない場合の表示例です。アイコン部分は表示されません。',
      },
    },
  },
  args: {
    url: 'https://example.com',
    title: 'faviconなしリンクカードのタイトル',
    description: 'こちらはfaviconを含まないリンクカードの例です。アイコン部分が表示されません。',
    image: 'https://placehold.jp/1200x630.png',
    siteName: 'Example Site',
    target: '_blank',
  },
};

export const SamePage: Story = {
  name: '同じページで開くリンクカード',
  parameters: {
    docs: {
      description: {
        story:
          'target="_self"を指定した場合、外部リンクアイコンが表示されず、同じページで開きます。',
      },
    },
  },
  args: {
    url: '/internal-page',
    title: '内部ページへのリンク',
    description:
      'このリンクカードは同じページで開かれます。内部ページへのナビゲーションに使用できます。',
    image: 'https://placehold.jp/1200x630.png',
    siteName: 'My Site',
    favicon: '/favicon.ico',
    target: '_self',
  },
};

export const LongTitle: Story = {
  name: '長いタイトルのリンクカード',
  parameters: {
    docs: {
      description: {
        story: 'タイトルが長い場合の表示例です。適切に折り返されて表示されます。',
      },
    },
  },
  args: {
    url: 'https://example.com',
    title:
      'とても長いタイトルのリンクカードです。とても長いタイトルのリンクカードです。とても長いタイトルのリンクカードです。とても長いタイトルのリンクカードです。',
    description:
      '長いタイトルを持つページの説明文です。タイトルが長い場合でもカードのレイアウトが崩れないように設計されています。',
    image: 'https://placehold.jp/1200x630.png',
    siteName: 'Example Long Site Name',
    favicon: '/favicon.ico',
    target: '_blank',
  },
};

export const YouTube: Story = {
  name: 'YouTubeリンクカード',
  parameters: {
    docs: {
      description: {
        story: 'YouTubeページへのリンクカードの例です。動画コンテンツの紹介に使用できます。',
      },
    },
  },
  args: {
    url: 'https://www.youtube.com/watch?v=example',
    title:
      'YotubeTitleが入ります。YotubeTitleが入ります。YotubeTitleが入ります。YotubeTitleが入ります。YotubeTitleが入ります。YotubeTitleが入ります。YotubeTitleが入ります。',
    description:
      'https://youtube.com/@tbs_bloomberg👆チャンネル登録・高評価をよろしくお願いしますTBSアナウンサー篠原梨菜がMCを務める番組「Human Insight」。ウェルビーイング、メンタルヘルスや人間とAIの違いなど、ビジネス視点から人間の心身の謎を解き明かします。今回のテーマは「幸',
    image: 'https://placehold.jp/1200x630.png',
    siteName: 'YouTube',
    favicon: 'https://www.youtube.com/s/desktop/30100020/img/logos/favicon.ico',
    target: '_blank',
  },
};
