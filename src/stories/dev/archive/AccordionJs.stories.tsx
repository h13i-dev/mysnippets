import { createHtmlSource } from '@stories/assets/utils/htmlTransform';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useEffect } from 'react';
import '@stories/assets/sass/storybook/accordion-js.scss';

interface AccordionJsArgs {
  title: string;
  content: string;
  duration?: number;
  easing?: string;
}

const meta: Meta<AccordionJsArgs> = {
  title: '_Dev/Archive/アコーディオン（js版）',
  tags: ['autodocs'],
  parameters: {
    docs: {
      source: createHtmlSource({ extract: 'dynamic' }),
      description: {
        component: `
JavaScriptでアニメーションを制御するアコーディオンコンポーネントです。

### 使用方法

\`\`\`html
<details class="c-accordion-js">
  <summary class="c-accordion_summary-js">
    <span class="c-accordion_icon-js -question">Q</span>
    タイトル
    <span class="c-accordion_switch-js">
      <span></span>
      <span></span>
    </span>
  </summary>
  <div class="c-accordion_contents-js">
    <span class="c-accordion_icon-js -answer">A</span>
    <div class="c-accordion_answer-js">
      コンテンツ
    </div>
  </div>
</details>
\`\`\`

### JavaScript初期化

\`\`\`javascript
import { Accordion } from "@stories/assets/js/modules/Accordion.ts";
new Accordion(".c-accordion-js", {
  duration: 300,
  easing: "ease-out"
});
\`\`\`

### オプション

- \`duration\`: アニメーションの実行時間をミリ秒で指定（デフォルト: 150）
- \`easing\`: アニメーションのイージング関数を指定（デフォルト: "ease-out"）
        `,
      },
    },
  },
  args: {
    title: 'よくある質問のタイトルがここに入ります',
    content: 'こちらに回答テキストが表示されます。詳細な説明や解決方法などを記載できます。',
    duration: 150,
    easing: 'ease-out',
  },
  argTypes: {
    title: {
      description: 'アコーディオンのタイトル',
      control: { type: 'text' },
    },
    content: {
      description: 'アコーディオンのコンテンツ',
      control: { type: 'text' },
    },
    duration: {
      description: 'アニメーション実行時間（ミリ秒）',
      control: { type: 'number', min: 100, max: 3000, step: 50 },
    },
    easing: {
      description: 'イージング関数',
      control: { type: 'select' },
      options: ['ease', 'ease-in', 'ease-out', 'ease-in-out', 'linear', 'steps(5)'],
    },
  },
};

export default meta;
type Story = StoryObj<AccordionJsArgs>;

export const Interactive: Story = {
  name: 'インタラクティブ',
  tags: ['!dev', '!autodocs'],
  decorators: [
    (Story, context) => {
      useEffect(() => {
        import('@stories/assets/js/modules/Accordion').then(({ default: Accordion }) => {
          new Accordion('.interactive-accordion .c-accordion-js', {
            duration: context.args.duration || 150,
            easing: context.args.easing || 'ease-out',
          });
        });
      }, [context.args.duration, context.args.easing]);

      return (
        <div className="interactive-accordion">
          <Story {...context} />
        </div>
      );
    },
  ],
  render: ({ title, content }) => {
    return (
      <details className="c-accordion-js">
        <summary className="c-accordion_summary-js">
          <span className="c-accordion_icon-js -question">Q</span>
          {title}
          <span className="c-accordion_switch-js">
            <span></span>
            <span></span>
          </span>
        </summary>
        <div className="c-accordion_contents-js">
          <span className="c-accordion_icon-js -answer">A</span>
          <div className="c-accordion_answer-js">{content}</div>
        </div>
      </details>
    );
  },
};

export const Default: Story = {
  name: '基本的なアコーディオン',
  parameters: {
    docs: {
      description: {
        story:
          'JavaScriptでアニメーションを制御する基本的なアコーディオンです。Q&A形式のアイコンが付きます。',
      },
    },
  },
  decorators: [
    (Story, context) => {
      useEffect(() => {
        import('@stories/assets/js/modules/Accordion').then(({ default: Accordion }) => {
          new Accordion('.default-accordion .c-accordion-js');
        });
      }, []);

      return (
        <div className="default-accordion">
          <Story {...context} />
        </div>
      );
    },
  ],
  render: () => {
    return (
      <details className="c-accordion-js">
        <summary className="c-accordion_summary-js">
          <span className="c-accordion_icon-js -question">Q</span>
          よくある質問のタイトルがここに入ります
          <span className="c-accordion_switch-js">
            <span></span>
            <span></span>
          </span>
        </summary>
        <div className="c-accordion_contents-js">
          <span className="c-accordion_icon-js -answer">A</span>
          <div className="c-accordion_answer-js">
            <p>
              こちらに回答テキストが表示されます。詳細な説明や解決方法などを記載できます。
              <br />
              こちらに回答テキストが表示されます。詳細な説明や解決方法などを記載できます。
            </p>
          </div>
        </div>
      </details>
    );
  },
};

export const CustomDuration: Story = {
  name: 'アニメーション時間のカスタマイズ',
  parameters: {
    docs: {
      description: {
        story: 'duration: 1000を指定して1秒のゆっくりとしたアニメーションに設定した例です。',
      },
    },
  },
  decorators: [
    (Story, context) => {
      useEffect(() => {
        import('@stories/assets/js/modules/Accordion').then(({ default: Accordion }) => {
          new Accordion('.custom-duration-accordion .c-accordion-js', {
            duration: 1000,
          });
        });
      }, []);

      return (
        <div className="custom-duration-accordion">
          <Story {...context} />
        </div>
      );
    },
  ],
  render: () => {
    return (
      <details className="c-accordion-js">
        <summary className="c-accordion_summary-js">
          <span className="c-accordion_icon-js -question">Q</span>
          duration: 1000を指定した場合のアコーディオン
          <span className="c-accordion_switch-js">
            <span></span>
            <span></span>
          </span>
        </summary>
        <div className="c-accordion_contents-js">
          <span className="c-accordion_icon-js -answer">A</span>
          <div className="c-accordion_answer-js">
            <p>こちらに回答テキストが表示されます。詳細な説明や解決方法などを記載できます。</p>
          </div>
        </div>
      </details>
    );
  },
};

export const CustomEasing: Story = {
  name: 'イージングのカスタマイズ',
  parameters: {
    docs: {
      description: {
        story:
          'easing: "steps(5)"を指定して、5回に分割されたステップでアニメーションが実行される例です。',
      },
    },
  },
  decorators: [
    (Story, context) => {
      useEffect(() => {
        import('@stories/assets/js/modules/Accordion').then(({ default: Accordion }) => {
          new Accordion('.custom-easing-accordion .c-accordion-js', {
            easing: 'steps(5)',
            duration: 3000,
          });
        });
      }, []);

      return (
        <div className="custom-easing-accordion">
          <Story {...context} />
        </div>
      );
    },
  ],
  render: () => {
    return (
      <details className="c-accordion-js">
        <summary className="c-accordion_summary-js">
          <span className="c-accordion_icon-js -question">Q</span>
          easing:
          "steps(5)"を指定しているため、5回に分割されたステップでアニメーションが実行されます
          <span className="c-accordion_switch-js">
            <span></span>
            <span></span>
          </span>
        </summary>
        <div className="c-accordion_contents-js">
          <span className="c-accordion_icon-js -answer">A</span>
          <div className="c-accordion_answer-js">
            <p>
              こちらに回答テキストが表示されます。詳細な説明や解決方法などを記載できます。こちらに回答テキストが表示されます。詳細な説明や解決方法などを記載できます。こちらに回答テキストが表示されます。詳細な説明や解決方法などを記載できます。こちらに回答テキストが表示されます。詳細な説明や解決方法などを記載できます。こちらに回答テキストが表示されます。詳細な説明や解決方法などを記載できます。こちらに回答テキストが表示されます。詳細な説明や解決方法などを記載できます。
            </p>
          </div>
        </div>
      </details>
    );
  },
};

export const MultipleAccordions: Story = {
  name: '複数のアコーディオン',
  parameters: {
    docs: {
      description: {
        story:
          '複数のJavaScript制御アコーディオンを並べて表示する場合の例です。それぞれ異なる設定で独立してアニメーション制御されます。',
      },
    },
  },
  decorators: [
    (Story, context) => {
      useEffect(() => {
        import('@stories/assets/js/modules/Accordion').then(({ default: Accordion }) => {
          // それぞれ異なる設定でアコーディオンを初期化
          new Accordion('.multiple-accordions .multiple-accordion-1 .c-accordion-js');
          new Accordion('.multiple-accordions .multiple-accordion-2 .c-accordion-js', {
            duration: 500,
          });
          new Accordion('.multiple-accordions .multiple-accordion-3 .c-accordion-js', {
            easing: 'ease-in-out',
          });
        });
      }, []);

      return (
        <div className="multiple-accordions">
          <Story {...context} />
        </div>
      );
    },
  ],
  render: () => {
    return (
      <>
        <div className="multiple-accordion-1">
          <details className="c-accordion-js">
            <summary className="c-accordion_summary-js">
              <span className="c-accordion_icon-js -question">Q</span>
              サービスについて
              <span className="c-accordion_switch-js">
                <span></span>
                <span></span>
              </span>
            </summary>
            <div className="c-accordion_contents-js">
              <span className="c-accordion_icon-js -answer">A</span>
              <div className="c-accordion_answer-js">
                <p>サービスに関する詳細な説明がここに入ります。機能や特徴について説明できます。</p>
              </div>
            </div>
          </details>
        </div>

        <div className="multiple-accordion-2">
          <details className="c-accordion-js">
            <summary className="c-accordion_summary-js">
              <span className="c-accordion_icon-js -question">Q</span>
              料金について（アニメーション時間: 500ms）
              <span className="c-accordion_switch-js">
                <span></span>
                <span></span>
              </span>
            </summary>
            <div className="c-accordion_contents-js">
              <span className="c-accordion_icon-js -answer">A</span>
              <div className="c-accordion_answer-js">
                <p>料金体系や支払い方法についての詳細な説明がここに入ります。</p>
              </div>
            </div>
          </details>
        </div>

        <div className="multiple-accordion-3">
          <details className="c-accordion-js">
            <summary className="c-accordion_summary-js">
              <span className="c-accordion_icon-js -question">Q</span>
              サポートについて（イージング: ease-in-out）
              <span className="c-accordion_switch-js">
                <span></span>
                <span></span>
              </span>
            </summary>
            <div className="c-accordion_contents-js">
              <span className="c-accordion_icon-js -answer">A</span>
              <div className="c-accordion_answer-js">
                <p>サポート体制や問い合わせ方法についての詳細な説明がここに入ります。</p>
              </div>
            </div>
          </details>
        </div>
      </>
    );
  },
};

export const RichContent: Story = {
  name: 'リッチコンテンツ',
  parameters: {
    docs: {
      description: {
        story:
          'アコーディオンの中にはリストや段落など、様々なHTMLコンテンツを含めることができます。Q&Aアイコンと組み合わせて使用します。',
      },
    },
  },
  decorators: [
    (Story, context) => {
      useEffect(() => {
        import('@stories/assets/js/modules/Accordion').then(({ default: Accordion }) => {
          new Accordion('.rich-content-accordion .c-accordion-js');
        });
      }, []);

      return (
        <div className="rich-content-accordion">
          <Story {...context} />
        </div>
      );
    },
  ],
  render: () => {
    return (
      <details className="c-accordion-js">
        <summary className="c-accordion_summary-js">
          <span className="c-accordion_icon-js -question">Q</span>
          サービス機能一覧について教えてください
          <span className="c-accordion_switch-js">
            <span></span>
            <span></span>
          </span>
        </summary>
        <div className="c-accordion_contents-js">
          <span className="c-accordion_icon-js -answer">A</span>
          <div className="c-accordion_answer-js">
            <p>当サービスでは以下の機能を提供しています：</p>
            <ul>
              <li>データの可視化とレポート生成</li>
              <li>リアルタイム分析とアラート機能</li>
              <li>API連携による外部システム統合</li>
              <li>セキュアなデータ保存と管理</li>
            </ul>
            <p>詳細については各機能のドキュメントをご確認ください。</p>
          </div>
        </div>
      </details>
    );
  },
};

export const LongContent: Story = {
  name: '長いコンテンツ',
  parameters: {
    docs: {
      description: {
        story:
          '長いコンテンツを含むアコーディオンの例です。JavaScriptアニメーションでスムーズに開閉されます。',
      },
    },
  },
  decorators: [
    (Story, context) => {
      useEffect(() => {
        import('@stories/assets/js/modules/Accordion').then(({ default: Accordion }) => {
          new Accordion('.long-content-accordion .c-accordion-js', {
            duration: 800,
          });
        });
      }, []);

      return (
        <div className="long-content-accordion">
          <Story {...context} />
        </div>
      );
    },
  ],
  render: () => {
    return (
      <details className="c-accordion-js">
        <summary className="c-accordion_summary-js">
          <span className="c-accordion_icon-js -question">Q</span>
          利用規約についての詳細を教えてください
          <span className="c-accordion_switch-js">
            <span></span>
            <span></span>
          </span>
        </summary>
        <div className="c-accordion_contents-js">
          <span className="c-accordion_icon-js -answer">A</span>
          <div className="c-accordion_answer-js">
            <h3>第1条（目的）</h3>
            <p>
              本規約は、当社が提供するサービス（以下「本サービス」といいます）の利用条件を定めるものです。登録ユーザーの皆さま（以下「ユーザー」といいます）には、本規約に従って、本サービスをご利用いただきます。
            </p>

            <h3>第2条（利用登録）</h3>
            <p>
              登録希望者が当社の定める方法によって利用登録を申請し、当社がこれを承認することによって、利用登録が完了するものとします。当社は、利用登録の申請者に以下の事由があると判断した場合、利用登録の申請を承認しないことがあり、その理由については一切の開示義務を負わないものとします。
            </p>

            <h3>第3条（禁止事項）</h3>
            <p>
              ユーザーは、本サービスの利用にあたり、以下の行為をしてはなりません。法令または公序良俗に違反する行為、犯罪行為に関連する行為、当社のサーバーまたはネットワークの機能を破壊したり、妨害したりする行為。
            </p>
          </div>
        </div>
      </details>
    );
  },
};
