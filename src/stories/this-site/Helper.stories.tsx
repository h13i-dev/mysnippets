import { createHtmlSource } from '@stories/assets/utils/htmlTransform';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'This-Site/ヘルパークラス',
  tags: ['autodocs'],
  parameters: {
    docs: {
      source: createHtmlSource('dynamic'),
      description: {
        component: `
### ヘルパークラス
レスポンシブ・汎用的なCSSクラスを提供するヘルパークラス群です。

### レスポンシブの実装方法
以下のプレフィックスをクラス名の前に付与することで、レスポンシブ対応が可能です。<br>また、プレフィックスの前に\`max-\`（例：\`max-sm:\`）を付けると、最大幅指定が可能です。

| プレフィックス | 画面幅 | デバイス目安 |
|-------------|--------|------------|
| xs: | 375px以上 | スマートフォン（360px～639px） |
| sm: | 640px以上 | スマートフォン（360px～639px） |
| md: | 768px以上 | タブレット（640~1279px） |
| lg: | 1024px以上 | タブレット（640~1279px） |
| xl: | 1280px以上 | デスクトップ（1280px以上） |
| 2xl: | 1536px以上 | デスクトップ（1280px以上） |
| 3xl: | 1920px以上 | フルHD・4K（1920px以上） |

### レスポンシブ対応例 サンプル
レスポンシブ対応のヘルパークラスの基本例です。画面幅を変更して動作を確認してください。

| プレフィックス | 画面幅 | デバイス目安 |
|-------------|--------|------------|
| なし | 全画面幅 | 常時適用 |
| sm: | 640px以上 | タブレット・デスクトップ |
| xl: | 1280px以上 | デスクトップ |
| max-sm: | 640px未満 | スマートフォン |
| max-xl: | 1280px以上 | スマートフォン・タブレット |
        `,
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const ResponsiveExample: Story = {
  name: 'レスポンシブ対応例 サンプル',
  tags: ['!dev', '!autodocs'],
  render: () => {
    return (
      <>
        <div className="u-underline">全画面幅でアンダーラインが適用（u-underline）</div>
        <div className="sm:u-underline">
          画面幅640px以上でアンダーラインが適用（sm:u-underline）
        </div>
        <div className="xl:u-underline">
          画面幅1280px以上でアンダーラインが適用（xl:u-underline）
        </div>
        <div className="max-sm:u-underline">
          画面幅640px未満でアンダーラインが適用（max-sm:u-underline）
        </div>
        <div className="max-xl:u-underline">
          画面幅1280px未満でアンダーラインが適用（max-xl:u-underline）
        </div>
      </>
    );
  },
};

export const Display: Story = {
  name: '表示・非表示',
  decorators: [
    (Story) => (
      <div className="[&_span]:u-font-bold [&_span]:u-text-danger">
        <Story />
      </div>
    ),
  ],
  render: () => {
    return (
      <>
        <p>
          常に表示「<span>表示されました</span>」
        </p>
        <p>
          画面幅640px以上で表示（640px未満で非表示）「
          <span className="max-sm:u-hidden">表示されました</span>」
        </p>
        <p>
          画面幅1280px以上で表示（1280px未満で非表示）「
          <span className="max-xl:u-hidden">表示されました</span>」
        </p>
        <p>
          常に非表示「<span className="u-hidden ">表示されました</span>」
        </p>
        <p>
          画面幅640px未満で表示（640px以上で非表示）「
          <span className="sm:u-hidden">表示されました</span>」
        </p>
        <p>
          画面幅1280px未満で表示（1280px以上で非表示）「
          <span className="xl:u-hidden">表示されました</span>」
        </p>
        <p>
          画面幅640px~1280pxで表示「
          <span className="max-sm:u-hidden xl:u-hidden">表示されました</span>」
        </p>
        <p>
          画面幅640px未満と1280px以上で表示「
          <span className="sm:u-hidden xl:u-show">表示されました</span>」
        </p>
      </>
    );
  },
};

export const WidthAuto: Story = {
  name: 'width: 自動幅・100%幅',
  render: () => {
    return (
      <>
        <div className="u-w-fit sg-item">u-w-fit（コンテンツ幅）</div>
        <div className="u-w-auto sg-item">u-w-auto（自動幅）</div>
        <div className="u-w-full sg-item">u-w-full（100%幅）</div>
      </>
    );
  },
};

export const WidthPercentage: Story = {
  name: 'width: パーセンテージ幅',
  parameters: {
    docs: {
      description: {
        story: '`u-w-5%`～`u-w-100%`まで5%刻みで設定可能',
      },
    },
  },
  render: () => {
    return (
      <>
        <div className="u-w-25% sg-item">u-w-25%（25%幅）</div>
        <div className="u-w-50% sg-item">u-w-50%（50%幅）</div>
        <div className="u-w-75% sg-item">u-w-75%（75%幅）</div>
        <div className="u-w-100% sg-item">u-w-100%（100%幅）</div>
      </>
    );
  },
};

export const WidthFraction: Story = {
  name: 'width: 分数幅',
  parameters: {
    docs: {
      description: {
        story: '`u-w-1/2, u-w-2/2, u-w-1/3, u-w-2/3, ..., u-w-11/12, u-w-12/12`まで設定可能',
      },
    },
  },
  render: () => {
    return (
      <>
        <div className="u-w-1/2 sg-item">u-w-1/2（1/2幅）</div>
        <div className="u-w-1/3 sg-item">u-w-1/3（1/3幅）</div>
        <div className="u-w-2/3 sg-item">u-w-2/3（2/3幅）</div>
        <div className="u-w-1/4 sg-item">u-w-1/4（1/4幅）</div>
        <div className="u-w-3/4 sg-item">u-w-3/4（3/4幅）</div>
      </>
    );
  },
};

export const Margin: Story = {
  name: 'margin',
  parameters: {
    docs: {
      description: {
        story: `要素の余白を設定するmargin ヘルパークラスです。

### margin 識別子表

| 識別子 | 画面幅sm（640px）時 | 画面幅xl（1280px）時 |
|----|-----|-------|
| xs | 8px | 16px |
| sm | 16px | 24px |
| md | 24px | 32px |
| lg | 32px | 48px |
| xl | 48px | 80px |
| 2xl | 80px | 128px |

### margin クラス一覧

| ヘルパークラス | 備考 |
|-------------|------|
| u-m-識別子 | margin左右上下の余白を設定 |
| u-mt-識別子 | margin上部の余白を設定 |
| u-mb-識別子 | margin下部の余白を設定 |
| u-mr-識別子 | margin右側の余白を設定 |
| u-ml-識別子 | margin左側の余白を設定 |
| u-mx-識別子 | margin左右の余白を設定 |
| u-my-識別子 | margin上下の余白を設定 |`,
      },
    },
  },
  render: () => {
    return (
      <>
        <div className="u-m-md sg-item">u-m-sm（margin md全方向）</div>
        <div className="sm:u-m-md sg-item">
          sm:u-m-sm（スクリーンサイズms（640px以上）margin md全方向）
        </div>
      </>
    );
  },
};

export const PixelMargin: Story = {
  name: 'margin ピクセル指定',
  parameters: {
    docs: {
      description: {
        story:
          "`u-mt-0, u-mt-4px, u-mt-8px, ..., u-mt-160px`まで設定可能<br><span className='u-text-danger u-font-bold' style='font-size: inherit;'>※まずは識別子を利用したmarginを優先的に使用することを検討してください。</span>",
      },
    },
  },
  render: () => {
    return (
      <>
        <h4 className="p-heading-lv4 u-mb-sm">ピクセル値margin サンプル</h4>
        <div>
          <div className="u-mt-0 sg-item">u-mt-0（margin 上部: 0px）</div>
          <div className="u-mt-4px sg-item">u-mt-4px（margin 上部: 4px）</div>
          <div className="u-mt-8px sg-item">u-mt-8px（margin 上部: 8px）</div>
          <div className="u-mt-16px sg-item">u-mt-16px（margin 上部: 16px）</div>
          <div className="u-mt-32px sg-item">u-mt-32px（margin 上部: 32px）</div>
          <div className="u-mt-64px sg-item">u-mt-64px（margin 上部: 64px）</div>
        </div>
      </>
    );
  },
};

export const Padding: Story = {
  name: 'padding',
  parameters: {
    docs: {
      description: {
        story: `要素の内部余白を設定するpaddingヘルパークラスです。

### padding 識別子表

| 識別子 | 画面幅sm（640px）時 | 画面幅xl（1280px）時 |
|----|-----|-------|
| xs | 8px | 16px |
| sm | 16px | 24px |
| md | 24px | 32px |
| lg | 32px | 48px |
| xl | 48px | 80px |
| 2xl | 80px | 128px |

### padding クラス一覧

| ヘルパークラス | 備考 |
|-------------|------|
| u-p-識別子 | padding左右上下の余白を設定 |
| u-pt-識別子 | padding上部の余白を設定 |
| u-pb-識別子 | padding下部の余白を設定 |
| u-pr-識別子 | padding右側の余白を設定 |
| u-pl-識別子 | padding左側の余白を設定 |
| u-px-識別子 | padding左右の余白を設定 |
| u-py-識別子 | padding上下の余白を設定 |`,
      },
    },
  },
  render: () => {
    return (
      <>
        <div className="u-p-md sg-item">u-p-md（padding md全方向）</div>
        <div className="u-p-0 sm:u-p-md sg-item">
          sm:u-p-md（スクリーンサイズsm（640px以上）padding md全方向）
        </div>
      </>
    );
  },
};

export const PixelPadding: Story = {
  name: 'padding ピクセル指定',
  parameters: {
    docs: {
      description: {
        story:
          "`u-pt-0, u-pt-4px, u-pt-8px, ..., u-pt-160px`まで設定可能<br><span className='u-text-danger u-font-bold' style='font-size: inherit;'>※まずは識別子を利用したpaddingを優先的に使用することを検討してください。</span>",
      },
    },
  },
  render: () => {
    return (
      <>
        <h4 className="p-heading-lv4 u-mb-sm">ピクセル値padding サンプル</h4>
        <div>
          <div className="u-pt-0 sg-item">u-pt-0（padding 上部: 0px）</div>
          <div className="u-pt-4px sg-item">u-pt-4px（padding 上部: 4px）</div>
          <div className="u-pt-8px sg-item">u-pt-8px（padding 上部: 8px）</div>
          <div className="u-pt-16px sg-item">u-pt-16px（padding 上部: 16px）</div>
          <div className="u-pt-32px sg-item">u-pt-32px（padding 上部: 32px）</div>
          <div className="u-pt-64px sg-item">u-pt-64px（padding 上部: 64px）</div>
        </div>
      </>
    );
  },
};

export const Uppercase: Story = {
  name: '小文字テキストを大文字変換',
  render: () => {
    return <p className="u-uppercase">this text will be converted to uppercase</p>;
  },
};

export const ScreenReaderOnly: Story = {
  name: 'スクリーンリーダー専用テキスト（視覚的には非表示）',
  render: () => {
    return (
      <p>
        スクリーンリーダー専用テキスト（視覚的には非表示）：「
        <span className="u-sr-only">このテキストは、スクリーンリーダーで読み上げられます。</span>」
      </p>
    );
  },
};

export const FocusOutlineColor: Story = {
  name: 'フォーカス時のアウトライン色設定',
  decorators: [
    (Story) => (
      <div className="u-flex u-flex-wrap u-gap-2 u-items-center [&_]:u-text-sky-700 [&_]:u-underline [&_]:hover:u-no-underline">
        <Story />
      </div>
    ),
  ],
  render: () => {
    return (
      <>
        <a href="★★★">デフォルト</a>
        <div className="u-bg-gray-300 u-p-2">
          <a href="★★★" className="focus:u-outline-white">
            白いアウトライン
          </a>
        </div>
      </>
    );
  },
};

export const Mail: Story = {
  name: 'メールアドレス表示',
  render: () => {
    return (
      <p>
        <span className="u-mail">xxxx</span>gmail.com
      </p>
    );
  },
};

export const Clearfix: Story = {
  name: 'clearfix',
  render: () => {
    return (
      <div className="u-clearfix">
        <div className="u-float-left sg-item">左側のfloat要素</div>
        <div className="u-float-right sg-item u-mt-0">右側のfloat要素</div>
      </div>
    );
  },
};

export const MinMaxWidth: Story = {
  name: 'clamp（レスポンシブ幅制御）',
  parameters: {
    docs: {
      description: {
        story:
          '`u-w-minmax-[200px,700px,sm,lg]`は、画面幅sm（640px）からmd（1024px）の間で、要素の幅が200pxから700pxの範囲に変更されます。画面幅は、`u-w-minmax-[300px,500px,640px,1280px]`のように、数値で指定することも可能です。値を入れる角括弧の中にはスペースを入れないよう注意してください。こちらは全てのTailwindクラスで利用可能です。',
      },
    },
  },
  render: () => {
    return (
      <>
        <p className="u-w-minmax-[200px,700px,sm,lg]">
          テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト
        </p>
        <p className="u-w-minmax-[200px,700px,640px,1280px] u-mt-xs">
          テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト
        </p>
      </>
    );
  },
};
