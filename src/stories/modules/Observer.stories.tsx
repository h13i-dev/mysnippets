import observer from '@assets/js/modules/utils/observer';
import { createHtmlSource } from '@stories/assets/utils/htmlTransform';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useEffect, useRef } from 'react';

const meta = {
  title: 'Modules/要素監視（Intersection Observer）',
  tags: ['autodocs'],
  parameters: {
    docs: {
      source: createHtmlSource({ mode: 'static' }),
      description: {
        component: `
### 概要
Intersection Observer APIを使用して要素の表示状態を監視し、画面に表示されたタイミングでクラスを付与します。スクロールアニメーションなどの実装に活用できます。

### HTMLコード
\`\`\`html
<div class="js-observe">監視対象の要素</div>
\`\`\`

### 使い方
\`\`\`javascript
import observer from "@assets/js/modules/utils/observer";

observer({
  selector: '.js-observe',
  activeClass: 'is-active',
  threshold: 0.1,
});
\`\`\`

### 設定オプション

| オプション | 型 | 必須 | デフォルト | 概要 |
|---|---|---|---|---|
| selector | \`string\` | ✓ | - | 監視対象要素のセレクター |
| activeClass | \`string\` | - | \`'is-active'\` | 付与するクラス名 |
| unobserve | \`boolean\` | - | \`true\` | 初回表示後に監視を解除するか |
| root | \`HTMLElement \\| null\` | - | \`null\` | 交差判定の基準となる要素 |
| rootMargin | \`string\` | - | \`'0px'\` | ルート要素のマージン |
| threshold | \`number\` | - | \`0.1\` | 交差判定の閾値（0.0〜1.0） |


### 主な機能
- 要素が画面に表示されたタイミングでクラスを付与
- 閾値による表示判定のカスタマイズ
- 継続的な監視または一度きりの監視を選択可能
- rootMarginによる早期発火設定
- CSSと組み合わせたアニメーション実装
`,
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: '基本的な使い方',
  parameters: {
    docs: {
      description: {
        story:
          '要素が画面に表示されると`is-active`クラスが付与されます。スクロールして要素を表示させてください。',
      },
    },
  },
  render: () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (!containerRef.current) return;

      observer({
        selector: '.js-observe-default',
      });
    }, []);

    return (
      <div ref={containerRef}>
        <div className="u-flex u-items-center u-justify-center u-text-gray-400 u-text-sm u-py-2">
          スクロールしてください ↓
        </div>
        <div className="js-observe-default u-slide-in-up u-p-8 u-bg-gray-100 u-rounded-lg u-text-center ">
          <p className="u-m-0">監視対象の要素</p>
          <p className="u-mt-2 u-mb-0 u-mx-0 u-text-sm u-opacity-70">
            画面に表示されると is-active クラスが付与されます
          </p>
        </div>
        <div className="u-flex u-items-center u-justify-center u-text-gray-400 u-text-sm u-py-2">
          ↑ スクロールして戻る
        </div>
      </div>
    );
  },
};

export const CustomClassName: Story = {
  name: 'カスタムクラス名',
  parameters: {
    docs: {
      description: {
        story: 'デフォルトの`is-active`以外のクラス名を指定できます。',
      },
      source: {
        code: null,
      },
    },
  },
  render: () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (!containerRef.current) return;

      observer({
        selector: '.js-observe-custom',
        activeClass: 'is-visible',
      });
    }, []);

    return (
      <div ref={containerRef}>
        <div className="u-flex u-items-center u-justify-center u-text-gray-400 u-text-sm u-py-2">
          スクロールしてください ↓
        </div>
        <div className="js-observe-custom u-slide-in-up u-p-8 u-bg-gray-100 u-rounded-lg u-text-center ">
          <p className="u-m-0">カスタムクラス名の要素</p>
          <p className="u-mt-2 u-mb-0 u-mx-0 u-text-sm u-opacity-70">
            画面に表示されると is-visible クラスが付与されます
          </p>
        </div>
        <div className="u-flex u-items-center u-justify-center u-text-gray-400 u-text-sm u-py-2">
          ↑ スクロールして戻る
        </div>
      </div>
    );
  },
};

export const ContinuousObserve: Story = {
  name: '継続監視モード',
  parameters: {
    docs: {
      description: {
        story:
          '`unobserve: false`を設定することで、要素が画面外に出たときにクラスを削除し、再度画面内に入ったときに再びクラスを付与します。',
      },
    },
  },
  render: () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (!containerRef.current) return;

      observer({
        selector: '.js-observe-continuous',
        unobserve: false,
      });
    }, []);

    return (
      <div ref={containerRef}>
        <div className="u-flex u-items-center u-justify-center u-text-gray-400 u-text-sm u-py-2">
          スクロールしてください ↓
        </div>
        <div className="js-observe-continuous u-slide-in-up u-p-8 u-bg-gray-100 u-rounded-lg u-text-center ">
          <p className="u-m-0">継続監視の要素</p>
          <p className="u-mt-2 u-mb-0 u-mx-0 u-text-sm u-opacity-70">
            画面外に出るとクラスが削除され、再度表示されると付与されます
          </p>
        </div>
        <div className="u-flex u-items-center u-justify-center u-text-gray-400 u-text-sm u-py-2">
          ↑ スクロールして戻る
        </div>
      </div>
    );
  },
};

export const ThresholdExample: Story = {
  name: '閾値の設定',
  parameters: {
    docs: {
      description: {
        story:
          '`threshold`を設定することで、要素がどの程度表示されたらクラスを付与するかを制御できます。0.5の場合、要素の50%が表示されたタイミングで発火します。',
      },
    },
  },
  render: () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (!containerRef.current) return;

      observer({
        selector: '.js-observe-threshold',
        threshold: 0.5,
        unobserve: false,
      });
    }, []);

    return (
      <div ref={containerRef}>
        <div className="u-flex u-items-center u-justify-center u-text-gray-400 u-text-sm u-py-2">
          スクロールしてください ↓
        </div>
        <div className="js-observe-threshold u-slide-in-up u-p-8 u-bg-gray-100 u-rounded-lg u-text-center  u-min-h-[300px]">
          <p className="u-m-0">閾値50%の要素</p>
          <p className="u-mt-2 u-mb-0 u-mx-0 u-text-sm u-opacity-70">
            要素の50%が画面内に入るとクラスが付与されます
          </p>
        </div>
        <div className="u-flex u-items-center u-justify-center u-text-gray-400 u-text-sm u-py-2">
          ↑ スクロールして戻る
        </div>
      </div>
    );
  },
};

export const RootMarginExample: Story = {
  name: 'マージンオフセット',
  parameters: {
    docs: {
      description: {
        story:
          '`rootMargin`を設定することで、画面の表示領域を仮想的に拡張または縮小できます。負の値を指定すると、要素が画面内に深く入ってから発火します。',
      },
    },
  },
  render: () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (!containerRef.current) return;

      observer({
        selector: '.js-observe-margin',
        rootMargin: '-100px',
        unobserve: false,
      });
    }, []);

    return (
      <div ref={containerRef}>
        <div className="u-flex u-items-center u-justify-center u-text-gray-400 u-text-sm u-py-2">
          スクロールしてください ↓
        </div>
        <div className="js-observe-margin u-slide-in-up u-p-8 u-bg-gray-100 u-rounded-lg u-text-center">
          <p className="u-m-0">マージンオフセット -100px</p>
          <p className="u-mt-2 u-mb-0 u-mx-0 u-text-sm u-opacity-70">
            画面内に100px深く入ってからクラスが付与されます
          </p>
        </div>
        <div className="u-flex u-items-center u-justify-center u-text-gray-400 u-text-sm u-py-2">
          ↑ スクロールして戻る
        </div>
      </div>
    );
  },
};

export const CustomRootExample: Story = {
  name: '特定要素内でのスクロール監視',
  parameters: {
    docs: {
      description: {
        story:
          '`root`オプションを使用することで、ビューポートではなく特定の要素内でのスクロールを監視できます。スクロール可能なコンテナ内の要素を監視する場合に便利です。',
      },
    },
  },
  render: () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (!containerRef.current || !scrollContainerRef.current) return;

      observer({
        selector: '.js-observe-in-container',
        root: scrollContainerRef.current,
        threshold: 0.3,
        unobserve: false,
      });
    }, []);

    return (
      <div ref={containerRef}>
        <div className="u-mb-4 u-text-sm u-text-gray-600">
          <p className="u-m-0">下のスクロール可能なコンテナ内で要素を監視しています</p>
        </div>
        <div
          ref={scrollContainerRef}
          className="u-border u-border-gray-300 u-rounded-lg u-h-[300px] u-overflow-y-auto u-bg-gray-50"
        >
          <div className="u-p-4">
            <div className="u-h-[200px] u-flex u-items-center u-justify-center u-text-gray-400 u-text-sm">
              コンテナ内でスクロールしてください ↓
            </div>
            <div className="js-observe-in-container u-slide-in-up u-p-8 u-bg-white u-rounded-lg u-text-center u-my-4">
              <p className="u-m-0">監視対象の要素 1</p>
              <p className="u-mt-2 u-mb-0 u-mx-0 u-text-sm u-opacity-70">
                コンテナ内で30%表示されるとクラスが付与されます
              </p>
            </div>
            <div className="u-h-[200px] u-flex u-items-center u-justify-center u-text-gray-400 u-text-sm">
              さらにスクロール ↓
            </div>
            <div className="js-observe-in-container u-slide-in-up u-p-8 u-bg-white u-rounded-lg u-text-center u-my-4">
              <p className="u-m-0">監視対象の要素 2</p>
              <p className="u-mt-2 u-mb-0 u-mx-0 u-text-sm u-opacity-70">
                コンテナ内で30%表示されるとクラスが付与されます
              </p>
            </div>
            <div className="u-h-[200px] u-flex u-items-center u-justify-center u-text-gray-400 u-text-sm">
              ↑ スクロールして戻る
            </div>
          </div>
        </div>
      </div>
    );
  },
};
