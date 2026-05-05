import { Media } from '@components/index.tsx';
import { GridSystemDescription, imageDescription } from '@src/stories/assets/descriptions';
import { createHtmlSource } from '@stories/assets/utils/htmlTransform';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'This-Site/図表・メディア',
  component: Media,
  parameters: {
    docs: {
      description: {
        component: `${imageDescription}`,
      },
      source: createHtmlSource({ extract: 'dynamic' }),
    },
  },
  tags: ['autodocs'],
  argTypes: {
    src: {
      control: 'text',
      description: '画像のURL',
      table: { category: '基本' },
    },
    width: {
      control: 'text',
      description: '画像の幅',
      table: { category: '基本' },
    },
    height: {
      control: 'text',
      description: '画像の高さ',
      table: { category: '基本' },
    },
    alt: {
      control: 'text',
      description: '代替テキスト',
      table: { category: '基本' },
    },
    loading: {
      control: 'select',
      options: ['eager', 'lazy'],
      description: '画像の読み込み方法',
      table: { category: '基本' },
    },
    children: {
      control: 'text',
      description: 'キャプションテキスト',
      table: { category: '基本' },
    },
    as: {
      control: 'text',
      description: 'HTMLタグを指定',
      table: { category: '任意の設定' },
    },
    className: {
      control: 'text',
      description: 'CSSクラス名',
      table: { category: '任意の設定' },
    },
  },
} satisfies Meta<typeof Media>;

export default meta;
type Story = StoryObj<typeof Media>;

export const DefaultFigure: Story = {
  name: '通常の画像',
  args: {
    src: 'https://placehold.jp/600x400.png',
    alt: 'altが入ります',
    width: '600',
    height: '400',
    children:
      'キャプションが入りますキャプションが入りますキャプションが入りますキャプションが入りますキャプションが入りますキャプションが入りますキャプションが入りますキャプションが入ります',
    className: 'u-px-figure',
  },
};

export const GridFigure: Story = {
  name: '2カラムの画像',
  parameters: {
    docs: {
      source: {
        type: 'dynamic',
        transform: (code: string) => code.replace(/className/g, 'class'),
      },
      description: {
        story: GridSystemDescription,
      },
    },
  },
  render: () => (
    <div className="c-grid" data-config="[1][sm:2]">
      <Media src="https://placehold.jp/600x400.png" alt="altが入ります" width="600" height="400">
        キャプションが入りますキャプションが入りますキャプションが入ります
      </Media>
      <Media src="https://placehold.jp/600x400.png" alt="altが入ります" width="600" height="400">
        キャプションが入りますキャプションが入りますキャプションが入ります
      </Media>
    </div>
  ),
};

export const SmallSizeFigure: Story = {
  name: '小さい画像',
  args: {
    src: 'https://placehold.jp/300x200.png',
    alt: 'altが入ります',
    width: '300',
    height: '200',
    children:
      'キャプションが入りますキャプションが入りますキャプションが入りますキャプションが入りますキャプションが入りますキャプションが入りますキャプションが入りますキャプションが入ります',
    className: 'u-px-figure',
  },
};

export const PortlateFigure: Story = {
  name: '縦長の画像',
  args: {
    src: 'https://placehold.jp/200x300.png',
    alt: 'altが入ります',
    width: '200',
    height: '300',
    children:
      'キャプションが入りますキャプションが入りますキャプションが入りますキャプションが入りますキャプションが入りますキャプションが入りますキャプションが入りますキャプションが入ります',
    className: 'u-px-figure',
  },
};

export const LargeFigure: Story = {
  name: '最大幅の変更',
  parameters: {
    docs: {
      description: {
        story:
          '画像の最大幅を制御したい場合は、`u-max-w-600px`〜`u-max-w-800px`（50px刻み）のヘルパークラスが使用できます。',
      },
    },
  },
  args: {
    src: 'https://placehold.jp/1000x667.png',
    alt: 'altが入ります',
    width: '1000',
    height: '667',
    children:
      'キャプションが入りますキャプションが入りますキャプションが入りますキャプションが入りますキャプションが入りますキャプションが入りますキャプションが入りますキャプションが入ります',
    className: 'u-px-figure u-max-w-800px',
  },
};

export const FullSizeFigure: Story = {
  name: '左右余白の削除',
  parameters: {
    docs: {
      description: {
        story: '画像の左右余白が不要な場合は、`u-px-figure`クラスを外してください。',
      },
    },
  },
  args: {
    src: 'https://placehold.jp/1000x667.png',
    alt: 'altが入ります',
    width: '1000',
    height: '667',
    children:
      'キャプションが入りますキャプションが入りますキャプションが入りますキャプションが入りますキャプションが入りますキャプションが入りますキャプションが入りますキャプションが入ります',
  },
};

export const TopCaptionFigure: Story = {
  name: '画像上部のキャプション',
  parameters: {
    docs: {
      description: {
        story: 'キャプションを上部に配置するには、`u-flex-col-reverse`を追加してください。',
      },
    },
  },
  args: {
    src: 'https://placehold.jp/600x400.png',
    alt: 'altが入ります',
    width: '600',
    height: '400',
    children: 'キャプションが入ります',
    className: 'u-max-w-600px u-px-figure u-flex-col-reverse',
  },
};

export const YouTubeMedia: Story = {
  name: 'YouTube の埋め込み',
  tags: ['!test'],
  render: () => (
    <>
      <Media className="u-px-figure">
        <iframe
          src="https://www.youtube.com/embed/kIsiitITIes?si=e2V0ZjcWrXdFqyRy"
          title="YouTube video player"
          width="768"
          height="432"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
          referrerpolicy="strict-origin-when-cross-origin"
        ></iframe>
      </Media>
    </>
  ),
};

export const GoogleMapMedia: Story = {
  name: 'Google Map の埋め込み',
  tags: ['!test'],
  render: () => (
    <>
      <Media className="u-px-figure">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3240.6680410866384!2d139.74842213488762!3d35.685175!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60188c0d02d8064d%3A0xd11a5f0b379e6db7!2z55qH5bGF!5e0!3m2!1sja!2sjp!4v1745923403144!5m2!1sja!2sjp"
          title="google map"
          width="768"
          height="432"
          allowfullscreen
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
          style={{ border: 0 }}
        ></iframe>
      </Media>
    </>
  ),
};
