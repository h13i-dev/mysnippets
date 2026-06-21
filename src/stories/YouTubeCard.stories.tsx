import { YouTubeCard } from '@components/index.tsx';
import type { YouTubeCardProps } from '@components/YouTubeCard';
import { createHtmlSource } from '@stories/assets/utils/htmlTransform';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<YouTubeCardProps> = {
  title: 'YouTubeカード',
  component: YouTubeCard,
  tags: ['autodocs'],
  parameters: {
    docs: {
      source: createHtmlSource(),
      description: {
        component: `
### 対応するYouTube URL形式

- \`https://www.youtube.com/watch?v=VIDEO_ID\`
- \`https://youtu.be/VIDEO_ID\`
- \`https://www.youtube.com/embed/VIDEO_ID\`
        `,
      },
    },
  },
  argTypes: {
    url: {
      description: 'YouTube動画のURL',
      control: { type: 'text' },
    },
    videoId: {
      description: 'YouTube動画ID（省略可、URLから自動抽出）',
      control: { type: 'text' },
    },
    title: {
      description: '動画のタイトル',
      control: { type: 'text' },
    },
    channelName: {
      description: 'チャンネル名',
      control: { type: 'text' },
    },
    className: {
      description: '追加のCSSクラス',
      control: { type: 'text' },
    },
  },
};

export default meta;
type Story = StoryObj<YouTubeCardProps>;

export const Default: Story = {
  name: '基本的なYouTubeカード',
  parameters: {
    docs: {
      description: {
        story: '基本的なYouTubeカードの表示です。標準的なYouTube動画リンクとして使用します。',
      },
    },
  },
  args: {
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    title: 'YouTube動画のタイトルがここに表示されます',
    channelName: 'サンプルチャンネル',
  },
};

export const ShortUrl: Story = {
  name: '短縮URL形式',
  parameters: {
    docs: {
      description: {
        story: 'youtu.be形式の短縮URLから動画IDを自動抽出する例です。',
      },
    },
  },
  args: {
    url: 'https://youtu.be/dQw4w9WgXcQ',
    title: '短縮URL形式のYouTube動画',
    channelName: 'Short URL Channel',
  },
};

export const EmbedUrl: Story = {
  name: '埋め込みURL形式',
  parameters: {
    docs: {
      description: {
        story: 'YouTube埋め込み用URL形式から動画IDを自動抽出する例です。',
      },
    },
  },
  args: {
    url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    title: '埋め込み用URL形式のYouTube動画',
    channelName: 'Embed Channel',
  },
};

export const LongTitle: Story = {
  name: '長いタイトルの動画',
  parameters: {
    docs: {
      description: {
        story:
          '動画タイトルが長い場合の表示例です。タイトルが適切に表示され、必要に応じて省略されます。',
      },
    },
  },
  args: {
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    title:
      'とても長い動画タイトルの例です。とても長い動画タイトルの例です。とても長い動画タイトルの例です。とても長い動画タイトルの例です。',
    channelName: 'Long Title Channel',
  },
};

export const LongChannelName: Story = {
  name: '長いチャンネル名の動画',
  parameters: {
    docs: {
      description: {
        story: 'チャンネル名が長い場合の表示例です。チャンネル名が適切に表示されます。',
      },
    },
  },
  args: {
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    title: 'チャンネル名が長い場合のYouTube動画',
    channelName: 'とても長いチャンネル名の例です。とても長いチャンネル名の例です。',
  },
};

export const WithVideoId: Story = {
  name: '動画ID直接指定',
  parameters: {
    docs: {
      description: {
        story:
          'videoIdプロパティを使って動画IDを直接指定する例です。URLからの自動抽出をスキップできます。',
      },
    },
  },
  args: {
    url: 'https://www.youtube.com/watch?v=custom-video-id',
    videoId: 'dQw4w9WgXcQ',
    title: '動画IDを直接指定したYouTube動画',
    channelName: 'Direct ID Channel',
  },
};
