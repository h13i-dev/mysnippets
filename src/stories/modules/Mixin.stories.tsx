import type { Meta, StoryObj } from '@storybook/react-vite';
import '@stories/assets/sass/storybook/mixin.scss';

interface MixinArgs {}

const meta: Meta<MixinArgs> = {
  title: 'Modules/Sass Mixin',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Sass Mixinの使用例を紹介します。矢印要素、三角形要素、疑似要素の3つのMixinがあります。',
      },
    },
  },
};

export default meta;
type Story = StoryObj<MixinArgs>;

export const Arrow: Story = {
  name: '矢印要素 (arrow)',
  parameters: {
    docs: {
      description: {
        story: `方向付きの矢印シェイプを生成するmixinです。引数で方向（up, right, down, left）、サイズ、線の太さ、色をカスタマイズできます。

\`\`\`css
@include g.arrow('up', 12px);
@include g.arrow('right', 12px);
@include g.arrow('down', 12px);
@include g.arrow('left', 12px);
\`\`\``,
      },
    },
  },
  render: () => (
    <div className="u-flex u-gap-x-md u-items-center">
      <span className="p-mixin-arrow -up"></span>
      <span className="p-mixin-arrow -right"></span>
      <span className="p-mixin-arrow -down"></span>
      <span className="p-mixin-arrow -left"></span>
    </div>
  ),
};

export const Triangle: Story = {
  name: '三角形要素 (triangle)',
  parameters: {
    docs: {
      description: {
        story: `様々な方向の三角形シェイプを作成するmixinです。8パターン（上下左右＋4隅）の方向に対応しています。

\`\`\`css
@include g.triangle('up', 12px, 12px);
@include g.triangle('top-left', 12px, 12px);
\`\`\``,
      },
    },
  },
  render: () => (
    <div className="u-flex u-gap-x-md u-items-center">
      <span className="p-mixin-triangle -up"></span>
      <span className="p-mixin-triangle -right"></span>
      <span className="p-mixin-triangle -down"></span>
      <span className="p-mixin-triangle -left"></span>
      <span className="p-mixin-triangle -top-left"></span>
      <span className="p-mixin-triangle -top-right"></span>
      <span className="p-mixin-triangle -bottom-left"></span>
      <span className="p-mixin-triangle -bottom-right"></span>
    </div>
  ),
};

export const Pseudo: Story = {
  name: '疑似要素 (pseudo)',
  parameters: {
    docs: {
      description: {
        story: `疑似要素の基本スタイルと中央配置を設定するmixinです。\`pseudo-base\`で疑似要素の基本設定を行い、\`pseudo-center\`で中央配置にします。

\`\`\`css
&::before {
  @include g.pseudo-base('before');
}

&::after {
  @include g.pseudo-base('after');
  @include g.pseudo-center;
}
\`\`\``,
      },
    },
  },
  render: () => (
    <div className="u-relative u-w-[200px] u-h-[100px] u-border u-border-solid u-border-gray-300">
      <div className="p-mixin-pseudo u-w-full u-h-full"></div>
    </div>
  ),
};
