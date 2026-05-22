import CountUpAnimation from '@assets/js/modules/CountUpAnimation';
import { createHtmlSource } from '@stories/assets/utils/htmlTransform';
import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useEffect } from 'react';

const meta = {
  title: 'Modules/カウントアップ',
  parameters: {
    layout: 'centered',
    docs: {
      source: createHtmlSource(),
      description: {
        component: `
### ライブラリのインストール
\`npm install gsap\`

### 設定オプション
設定できるオプションです。HTML属性の設定が優先されます。

| オプション | 型 | デフォルト | 概要 |
|---|---|---|---|
| duration | \`number\` | \`1\` | アニメーション時間（秒） |
| start | \`string\` | \`'top 70%'\` | スクロールトリガーの開始位置 |
| ease | \`string\` | \`'none'\` | アニメーションのイージング |
| toggleActions | \`string\` | \`'play none none none'\` | スクロールトリガーのアクション |
| markers | \`boolean\` | \`false\` | デバッグ用マーカーの表示 |
`,
      },
    },
  },
  decorators: [
    (Story) => (
      <>
        <style>{`
          [class^="js-countup"] {
            font-size: 32px;
            font-weight: bold;
          }
        `}</style>
        <Story />
      </>
    ),
  ],
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: '基本的なカウントアップ',
  parameters: {
    docs: {
      description: {
        story: '`to`属性は必須です。カウントアップ後に最終的に表示させたい数値を入力してください。',
      },
    },
  },
  render: () => {
    useEffect(() => {
      new CountUpAnimation('.js-countup-default');
    }, []);
    return (
      <>
        <data value="100" className="js-countup-default" data-config="[to:100]">
          0
        </data>
        ％
      </>
    );
  },
  decorators: [
    (Story) => (
      <div className="u-text-center">
        <Story />
      </div>
    ),
  ],
};

export const CountDown: Story = {
  name: 'カウントダウン',
  render: () => {
    useEffect(() => {
      new CountUpAnimation('.js-countup-countdown');
    }, []);

    return (
      <>
        <data value="1" className="js-countup-countdown" data-config="[to:1]">
          500
        </data>
        位
      </>
    );
  },
  decorators: [
    (Story) => (
      <div className="u-text-center">
        <Story />
      </div>
    ),
  ],
};

export const WithComma: Story = {
  name: 'カンマ区切り表示',
  render: () => {
    useEffect(() => {
      new CountUpAnimation('.js-countup-comma');
    }, []);

    return (
      <data value="2000" className="js-countup-comma" data-config="[to:2,000]">
        0
      </data>
    );
  },
  decorators: [
    (Story) => (
      <div className="u-text-center">
        <Story />
      </div>
    ),
  ],
};

export const Decimal: Story = {
  name: '小数点表示',
  render: () => {
    useEffect(() => {
      new CountUpAnimation('.js-countup-decimal');
    }, []);

    return (
      <data value="7777.77" className="js-countup-decimal" data-config="[to:7777.77]">
        0
      </data>
    );
  },
  decorators: [
    (Story) => (
      <div className="u-text-center">
        <Story />
      </div>
    ),
  ],
};

export const Negative: Story = {
  name: 'マイナス値',
  render: () => {
    useEffect(() => {
      new CountUpAnimation('.js-countup-negative');
    }, []);

    return (
      <data value="-100" className="js-countup-negative" data-config="[to:-100]">
        100
      </data>
    );
  },
  decorators: [
    (Story) => (
      <div className="u-text-center">
        <Story />
      </div>
    ),
  ],
};

export const DurationComparison: Story = {
  name: '[js設定] アニメーション時間の変更',
  decorators: [
    (Story) => (
      <div className="u-flex u-gap-sm u-text-center">
        <Story />
      </div>
    ),
  ],
  render: () => {
    useEffect(() => {
      new CountUpAnimation('.js-countup-duration-3', {
        duration: 3,
      });
      new CountUpAnimation('.js-countup-duration-10', {
        duration: 10,
      });
    }, []);
    return (
      <>
        <p>
          <data value="100" className="js-countup-duration-3" data-config="[to:100]">
            0
          </data>
          <br />
          （3秒）
        </p>
        <p>
          <data value="100" className="js-countup-duration-10" data-config="[to:100]">
            0
          </data>
          <br />
          （10秒）
        </p>
      </>
    );
  },
};

export const DataConfigDuration: Story = {
  name: '[属性設定] アニメーション時間の変更',
  decorators: [
    (Story) => (
      <div className="u-flex u-gap-sm u-text-center">
        <Story />
      </div>
    ),
  ],
  render: () => {
    useEffect(() => {
      new CountUpAnimation('.js-countup-duration');
    }, []);
    return (
      <>
        <p>
          <data value="100" className="js-countup-duration" data-config="[to:100][duration:3]">
            0
          </data>
          <br />
          （3秒）
        </p>
        <p>
          <data value="100" className="js-countup-duration" data-config="[to:100][duration:10]">
            0
          </data>
          <br />
          （10秒）
        </p>
      </>
    );
  },
};

export const EasingComparison: Story = {
  name: '[js設定] イージング効果の比較',
  decorators: [
    (Story) => (
      <div className="u-flex u-gap-sm u-text-center">
        <Story />
      </div>
    ),
  ],
  render: () => {
    useEffect(() => {
      new CountUpAnimation('.js-countup-ease-none');
      new CountUpAnimation('.js-countup-ease-power2', {
        ease: 'power2.out',
      });
      new CountUpAnimation('.js-countup-ease-bounce', {
        ease: 'bounce.out',
      });
    }, []);
    return (
      <>
        {/* リニア（等速） */}
        <p>
          <data value="100" className="js-countup-ease-none" data-config="[to:100]">
            0
          </data>
          <br />
          （none）
        </p>
        {/* スムーズな開始 */}
        <p>
          <data value="100" className="js-countup-ease-power2" data-config="[to:100]">
            0
          </data>
          <br />
          （power2.out）
        </p>
        {/* バウンス効果 */}
        <p>
          <data value="100" className="js-countup-ease-bounce" data-config="[to:100]">
            0
          </data>
          <br />
          （bounce）
        </p>
      </>
    );
  },
};

export const DataConfigEase: Story = {
  name: '[属性設定] イージング効果の比較',
  decorators: [
    (Story) => (
      <div className="u-flex u-gap-sm u-text-center">
        <Story />
      </div>
    ),
  ],
  render: () => {
    useEffect(() => {
      new CountUpAnimation('.js-countup-ease');
    }, []);

    return (
      <>
        <p>
          <data value="100" className="js-countup-ease" data-config="[to:100][duration:5]">
            0
          </data>
          <br />
          （none）
        </p>
        <p>
          <data
            value="100"
            className="js-countup-ease"
            data-config="[to:100][ease:power2.out][duration:5]"
          >
            0
          </data>
          <br />
          （power2.out）
        </p>
        <p>
          <data
            value="100"
            className="js-countup-ease"
            data-config="[to:100][ease:bounce.out][duration:5]"
          >
            0
          </data>
          <br />
          （bounce）
        </p>
      </>
    );
  },
};

export const TriggerPosition: Story = {
  name: '[js設定] スクロールトリガー位置の変更',
  decorators: [
    (Story) => (
      <div className="u-flex u-gap-sm u-text-center">
        <Story />
      </div>
    ),
  ],
  render: () => {
    useEffect(() => {
      new CountUpAnimation('.js-countup-trigger-70', {
        start: 'top 70%',
      });
      new CountUpAnimation('.js-countup-trigger-50', {
        start: 'top 50%',
      });
      new CountUpAnimation('.js-countup-trigger-bottom', {
        start: 'bottom bottom',
      });
    }, []);
    return (
      <>
        {/* ビューポートの70%位置でトリガー */}
        <p>
          <data value="100" className="js-countup-trigger-70" data-config="[to:100]">
            0
          </data>
          <br />
          （top 70%）
        </p>
        {/* ビューポートの50%位置でトリガー */}
        <p>
          <data value="100" className="js-countup-trigger-50" data-config="[to:100]">
            0
          </data>
          <br />
          （top 50%）
        </p>
        {/* ビューポートの下端でトリガー */}
        <p>
          <data value="100" className="js-countup-trigger-bottom" data-config="[to:100]">
            0
          </data>
          <br />
          （bottom bottom）
        </p>
      </>
    );
  },
};

export const DataConfigStart: Story = {
  name: '[属性設定] スクロールトリガー位置の変更',
  decorators: [
    (Story) => (
      <div className="u-flex u-gap-sm u-text-center">
        <Story />
      </div>
    ),
  ],
  render: () => {
    useEffect(() => {
      new CountUpAnimation('.js-countup-start');
    }, []);
    return (
      <>
        <p>
          <data value="100" className="js-countup-start" data-config="[to:100]">
            0
          </data>
          <br />
          （70%）
        </p>
        <p>
          <data value="100" className="js-countup-start" data-config="[to:100][start:top 50%]">
            0
          </data>
          <br />
          （50%）
        </p>
        <p>
          <data
            value="100"
            className="js-countup-start"
            data-config="[to:100][start:bottom bottom]"
          >
            0
          </data>
          <br />
          （下端）
        </p>
      </>
    );
  },
};

export const ToggleActions: Story = {
  name: '[js設定] スクロールアクションの設定',
  decorators: [
    (Story) => (
      <div className="u-flex u-gap-sm u-text-center">
        <Story />
      </div>
    ),
  ],
  render: () => {
    useEffect(() => {
      new CountUpAnimation('.js-countup-toggle-once', {
        toggleActions: 'play none none none',
      });
      new CountUpAnimation('.js-countup-toggle-reverse', {
        toggleActions: 'play pause resume reverse',
      });
      new CountUpAnimation('.js-countup-toggle-restart', {
        toggleActions: 'restart none restart none',
      });
    }, []);
    return (
      <>
        <p>
          <data value="100" className="js-countup-toggle-once" data-config="[to:100]">
            0
          </data>
          <br />
          （一度だけ実行）
        </p>
        <p>
          <data value="100" className="js-countup-toggle-reverse" data-config="[to:100]">
            0
          </data>
          <br />
          （上から下方向へのスクロールでのみ実行）
        </p>
        <p>
          <data value="100" className="js-countup-toggle-restart" data-config="[to:100]">
            0
          </data>
          <br />
          （スクロールで毎回実行）
        </p>
      </>
    );
  },
};

export const DataConfigToggleActions: Story = {
  name: '[属性設定] スクロールアクションの設定',
  decorators: [
    (Story) => (
      <div className="u-flex u-gap-sm u-text-center">
        <Story />
      </div>
    ),
  ],
  render: () => {
    useEffect(() => {
      new CountUpAnimation('.js-countup-toggle');
    }, []);
    return (
      <>
        <p>
          <data
            value="100"
            className="js-countup-toggle"
            data-config="[to:100][toggleActions:play none none none]"
          >
            0
          </data>
          <br />
          （一度のみ）
        </p>
        <p>
          <data
            value="100"
            className="js-countup-toggle"
            data-config="[to:100][toggleActions:play pause resume reverse]"
          >
            0
          </data>
          <br />
          （上から下方向へのスクロールでのみ実行）
        </p>
        <p>
          <data
            value="100"
            className="js-countup-toggle"
            data-config="[to:100][toggleActions:restart none restart none]"
          >
            0
          </data>
          <br />
          （スクロールで毎回実行）
        </p>
      </>
    );
  },
};

/**
 * 以下マーカー表示方法（storybookの全ページに適用されてしまうためコメントアウト）
 */
// export const MarkersComparison: Story = {
//   name: "[js設定] マーカー表示",
//   parameters: {
//     docs: {
//       description: {
//         story: "※公開時には必ず消すようにしてください。",
//       },
//     },
//   },
//   decorators: [
//     (Story) => (
//       <div className="u-text-center">
//         <Story />
//       </div>
//     ),
//   ],
//   render: () => {
//     useEffect(() => {
//       new CountUpAnimation(".js-countup-markers", {
//         markers: true,
//       });
//     }, []);
//     return (
//       <p>
//         <data value="100" className="js-countup-markers" data-config="[to:100]">
//           0
//         </data>
//         <br />
//         （マーカー表示）
//       </p>
//     );
//   },
// };

// export const DataConfigMarkers: Story = {
//   name: "[属性設定] マーカー表示",
//   parameters: {
//     docs: {
//       description: {
//         story: "※公開時には必ず消すようにしてください。",
//       },
//     },
//   },
//   decorators: [
//     (Story) => (
//       <div className="u-text-center">
//         <Story />
//       </div>
//     ),
//   ],
//   render: () => {
//     useEffect(() => {
//       new CountUpAnimation(".js-countup-markers-config");
//     }, []);

//     return (
//       <p>
//         <data value="100" className="js-countup-markers-config" data-config="[to:100][markers]">
//           0
//         </data>
//         <br />
//         （マーカー表示）
//       </p>
//     );
//   },
// };
