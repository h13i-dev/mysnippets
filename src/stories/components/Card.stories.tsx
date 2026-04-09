import type { CardProps } from '@components/Card';
import Card from '@components/Card.tsx';
import { createHtmlSource } from '@stories/assets/utils/htmlTransform';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<CardProps> = {
  title: 'Components/カード',
  component: Card,
  tags: ['autodocs'],
  parameters: {
    docs: {
      source: createHtmlSource('code'),
    },
  },
};

export default meta;
type Story = StoryObj<CardProps>;

export const Default: Story = {
  name: '基本的なカード',
  parameters: {
    docs: {
      description: {
        story: '会社名とタグを含む、より詳細な情報を持つカードの例です。',
      },
    },
  },
  decorators: [
    (Story) => (
      <ul className="c-grid" data-config="[1][md:2][lg:3]" data-subgrid="4">
        <Story />
      </ul>
    ),
  ],
  render: () => {
    return (
      <>
        <Card href="★★★" className="c-subgrid">
          <Card.Figure src="https://placehold.jp/600x400.png" width="600" height="400" />
          <Card.Body className="c-subgrid">
            <div className="p-card_header">
              <p className="p-card_subtitle">テクノロジー</p>
              <h3 className="p-card_title">記事タイトル記事タイトル記事タイトル記事タイトル</h3>
            </div>
            <p className="p-card_company">株式会社サンプルクリエイティブソリューションズ</p>
            <ul className="p-card_tags">
              <li className="p-card_tag">React</li>
              <li className="p-card_tag">TypeScript</li>
              <li className="p-card_tag">Astro</li>
            </ul>
          </Card.Body>
        </Card>
        <Card href="★★★" className="c-subgrid">
          <Card.Figure src="https://placehold.jp/600x400.png" width="600" height="400" />
          <Card.Body className="c-subgrid">
            <div className="p-card_header">
              <p className="p-card_subtitle">デザイン</p>
              <h3 className="p-card_title">
                記事タイトル記事タイトル記事タイトル記事タイトル記事タイトル
              </h3>
            </div>
            <p className="p-card_company">デザイン株式会社</p>
            <ul className="p-card_tags">
              <li className="p-card_tag">UI/UX</li>
              <li className="p-card_tag">Figma</li>
              <li className="p-card_tag">CSS</li>
            </ul>
          </Card.Body>
        </Card>
        <Card href="★★★" className="c-subgrid">
          <Card.Figure src="https://placehold.jp/600x400.png" width="600" height="400" />
          <Card.Body className="c-subgrid">
            <div className="p-card_header">
              <p className="p-card_subtitle">マーケティング</p>
              <h3 className="p-card_title">記事タイトル</h3>
            </div>
            <p className="p-card_company">マーケティング合同会社</p>
            <ul className="p-card_tags">
              <li className="p-card_tag">SEO</li>
              <li className="p-card_tag">SNS</li>
              <li className="p-card_tag">Analytics</li>
              <li className="p-card_tag">広告運用</li>
              <li className="p-card_tag">コンテンツ</li>
            </ul>
          </Card.Body>
        </Card>
      </>
    );
  },
};

export const CoverImage: Story = {
  name: '縦横比が異なる画像を余白なく表示させる',
  parameters: {
    docs: {
      description: {
        story:
          '縦横比が3:2ではない画像であり、かつ画像周りの余白を埋めたい要望の場合は、`object-fit: cover;`（）で画像を表示させる。',
      },
    },
  },
  decorators: [
    (Story) => (
      <ul className="c-grid" data-config="[1][md:2][lg:3]">
        <Story />
      </ul>
    ),
  ],
  render: () => {
    return (
      <>
        <Card href="★★★">
          <Card.Figure src="https://placehold.jp/500x300.png" width="500" height="300" />
          <Card.Body></Card.Body>
        </Card>
      </>
    );
  },
};

export const ContainImage: Story = {
  name: '縦横比が異なる画像を全て表示させる',
  parameters: {
    docs: {
      description: {
        story:
          '縦横比が3:2ではない画像であり、かつ画像を切れさせたくない要望の場合は、`object-fit: contain;`で画像を表示させる。',
      },
    },
  },
  decorators: [
    (Story) => (
      <ul className="c-grid" data-config="[1][md:2][lg:3]">
        <Story />
      </ul>
    ),
  ],
  render: () => {
    return (
      <>
        <Card href="★★★">
          <Card.Figure
            src="https://placehold.jp/500x300.png"
            width="500"
            height="300"
            className="[&_img]:u-object-contain"
          />
          <Card.Body></Card.Body>
        </Card>
      </>
    );
  },
};
