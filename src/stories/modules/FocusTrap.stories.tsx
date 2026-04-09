import FocusTrap from '@assets/js/modules/FocusTrap';
import { createHtmlSource } from '@stories/assets/utils/htmlTransform';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useEffect, useRef } from 'react';

const meta = {
  title: 'Modules/フォーカストラップ',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      source: createHtmlSource('dynamic'),
      description: {
        component: `
### 概要
フォーカスを特定の範囲内に閉じ込めるコンポーネントです。モーダルやドロワーなどで、キーボード操作時のフォーカス移動を制御します。

### HTMLコード
フォーカストラップは下記のコードにより実装されます。
\`\`\`html
<div class="u-flex u-gap-xs u-flex-wrap">
  <a class="js-focustrap-start" href="★★★">最初のリンク</a>
  <a href="★★★">リンク</a>
  <a href="★★★">リンク</a>
  <a class="js-focustrap-end" href="★★★">折り返しリンク</a>
  <a href="★★★">リンク</a>
</div>
\`\`\`

### 使い方
\`\`\`javascript
const focusTrap = new FocusTrap();
focusTrap.addFocusTrap(".js-focustrap-start", ".js-focustrap-end");
\`\`\`

### メソッド
| メソッド | 引数 | 概要 |
|---|---|---|
| \`addFocusTrap\` | \`firstSelector: string, lastSelector: string, direction?: string\` | フォーカストラップを追加 |
| \`removeFocusTrap\` | \`firstSelector: string, lastSelector: string\` | フォーカストラップを削除 |

### パラメータ
| パラメータ | 型 | 必須 | デフォルト | 概要 |
|---|---|---|---|---|
| firstSelector | \`string\` | ✓ | - | 最初の要素のセレクター |
| lastSelector | \`string\` | ✓ | - | 最後の要素のセレクター |
| direction | \`string\` | - | \`'both'\` | フォーカス移動の方向 (\`'both'\` / \`'forward'\` / \`'reverse'\`) |

### 主な機能
- Tabキーで最後の要素から最初の要素へ循環
- Shift+Tabキーで最初の要素から最後の要素へ循環
- 方向指定によるフォーカス制御（forward: 前方のみ、reverse: 後方のみ、both: 双方向）
- 複数のフォーカストラップ領域の管理
`,
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: '基本的な使い方（双方向）',
  tags: ['!dev', '!autodocs'],
  parameters: {
    docs: {
      description: {
        story:
          '最後のリンクでTabキーを押すと最初のリンクへ、最初のリンクでShift+Tabキーを押すと最後のリンクへフォーカスが移動します。',
      },
    },
  },
  render: () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const focusTrapInstanceRef = useRef<InstanceType<typeof FocusTrap> | null>(null);

    useEffect(() => {
      if (!containerRef.current || focusTrapInstanceRef.current) return;

      const focusTrap = new FocusTrap();
      focusTrap.addFocusTrap('.js-focustrap-start', '.js-focustrap-end');

      focusTrapInstanceRef.current = focusTrap;

      return () => {
        if (focusTrapInstanceRef.current) {
          focusTrapInstanceRef.current.removeFocusTrap('.js-focustrap-start', '.js-focustrap-end');
          focusTrapInstanceRef.current = null;
        }
      };
    }, []);

    return (
      <div ref={containerRef}>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <a className="js-focustrap-start btn btn-primary" href="#start">
            最初のリンク
          </a>
          <a className="btn btn-primary" href="#link1">
            リンク1
          </a>
          <a className="btn btn-primary" href="#link2">
            リンク2
          </a>
          <a className="js-focustrap-end btn btn-primary" href="#end">
            最後のリンク
          </a>
        </div>
        <p style={{ marginTop: '1rem', fontSize: '0.875rem', color: '#666' }}>
          最初/最後のリンクでTabキーまたはShift+Tabキーを押してみてください
        </p>
      </div>
    );
  },
};

export const ForwardOnly: Story = {
  name: '前方向のみ',
  parameters: {
    docs: {
      description: {
        story:
          '最後のリンクでTabキーを押したときのみ、最初のリンクへフォーカスが移動します。Shift+Tabでの逆方向の移動は制御されません。',
      },
    },
  },
  render: () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const focusTrapInstanceRef = useRef<InstanceType<typeof FocusTrap> | null>(null);

    useEffect(() => {
      if (!containerRef.current || focusTrapInstanceRef.current) return;

      const focusTrap = new FocusTrap();
      focusTrap.addFocusTrap('.js-focustrap-forward-start', '.js-focustrap-forward-end', 'forward');

      focusTrapInstanceRef.current = focusTrap;

      return () => {
        if (focusTrapInstanceRef.current) {
          focusTrapInstanceRef.current.removeFocusTrap(
            '.js-focustrap-forward-start',
            '.js-focustrap-forward-end',
          );
          focusTrapInstanceRef.current = null;
        }
      };
    }, []);

    return (
      <div ref={containerRef}>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <a className="js-focustrap-forward-start btn btn-primary" href="#start">
            最初のリンク
          </a>
          <a className="btn btn-primary" href="#link1">
            リンク1
          </a>
          <a className="btn btn-primary" href="#link2">
            リンク2
          </a>
          <a className="js-focustrap-forward-end btn btn-primary" href="#end">
            最後のリンク
          </a>
        </div>
        <p style={{ marginTop: '1rem', fontSize: '0.875rem', color: '#666' }}>
          最後のリンクでTabキーを押してみてください（前方向のみ制御されます）
        </p>
      </div>
    );
  },
};

export const ReverseOnly: Story = {
  name: '後方向のみ',
  parameters: {
    docs: {
      description: {
        story:
          '最初のリンクでShift+Tabキーを押したときのみ、最後のリンクへフォーカスが移動します。Tabでの前方向の移動は制御されません。',
      },
    },
  },
  render: () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const focusTrapInstanceRef = useRef<InstanceType<typeof FocusTrap> | null>(null);

    useEffect(() => {
      if (!containerRef.current || focusTrapInstanceRef.current) return;

      const focusTrap = new FocusTrap();
      focusTrap.addFocusTrap('.js-focustrap-reverse-start', '.js-focustrap-reverse-end', 'reverse');

      focusTrapInstanceRef.current = focusTrap;

      return () => {
        if (focusTrapInstanceRef.current) {
          focusTrapInstanceRef.current.removeFocusTrap(
            '.js-focustrap-reverse-start',
            '.js-focustrap-reverse-end',
          );
          focusTrapInstanceRef.current = null;
        }
      };
    }, []);

    return (
      <div ref={containerRef}>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <a className="js-focustrap-reverse-start btn btn-primary" href="#start">
            最初のリンク
          </a>
          <a className="btn btn-primary" href="#link1">
            リンク1
          </a>
          <a className="btn btn-primary" href="#link2">
            リンク2
          </a>
          <a className="js-focustrap-reverse-end btn btn-primary" href="#end">
            最後のリンク
          </a>
        </div>
        <p style={{ marginTop: '1rem', fontSize: '0.875rem', color: '#666' }}>
          最初のリンクでShift+Tabキーを押してみてください（後方向のみ制御されます）
        </p>
      </div>
    );
  },
};

export const MultipleTrapAreas: Story = {
  name: '複数のトラップ領域',
  parameters: {
    docs: {
      description: {
        story:
          '複数のフォーカストラップ領域を同時に管理できます。各領域で独立してフォーカスが循環します。',
      },
    },
  },
  render: () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const focusTrapInstanceRef = useRef<InstanceType<typeof FocusTrap> | null>(null);

    useEffect(() => {
      if (!containerRef.current || focusTrapInstanceRef.current) return;

      const focusTrap = new FocusTrap();
      focusTrap.addFocusTrap('.js-trap-area1-start', '.js-trap-area1-end');
      focusTrap.addFocusTrap('.js-trap-area2-start', '.js-trap-area2-end');

      focusTrapInstanceRef.current = focusTrap;

      return () => {
        if (focusTrapInstanceRef.current) {
          focusTrapInstanceRef.current.removeFocusTrap(
            '.js-trap-area1-start',
            '.js-trap-area1-end',
          );
          focusTrapInstanceRef.current.removeFocusTrap(
            '.js-trap-area2-start',
            '.js-trap-area2-end',
          );
          focusTrapInstanceRef.current = null;
        }
      };
    }, []);

    return (
      <div ref={containerRef}>
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>エリア1</h3>
          <div
            style={{
              display: 'flex',
              gap: '0.5rem',
              flexWrap: 'wrap',
              padding: '1rem',
              backgroundColor: '#f0f8ff',
              borderRadius: '4px',
            }}
          >
            <a className="js-trap-area1-start btn btn-primary" href="#area1-start">
              エリア1 開始
            </a>
            <a className="btn btn-primary" href="#area1-link1">
              リンク1
            </a>
            <a className="js-trap-area1-end btn btn-primary" href="#area1-end">
              エリア1 終了
            </a>
          </div>
        </div>
        <div>
          <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>エリア2</h3>
          <div
            style={{
              display: 'flex',
              gap: '0.5rem',
              flexWrap: 'wrap',
              padding: '1rem',
              backgroundColor: '#fff0f5',
              borderRadius: '4px',
            }}
          >
            <a className="js-trap-area2-start btn btn-primary" href="#area2-start">
              エリア2 開始
            </a>
            <a className="btn btn-primary" href="#area2-link1">
              リンク1
            </a>
            <a className="btn btn-primary" href="#area2-link2">
              リンク2
            </a>
            <a className="js-trap-area2-end btn btn-primary" href="#area2-end">
              エリア2 終了
            </a>
          </div>
        </div>
        <p style={{ marginTop: '1rem', fontSize: '0.875rem', color: '#666' }}>
          各エリアで独立してフォーカスが循環します
        </p>
      </div>
    );
  },
};

export const WithButtons: Story = {
  name: 'ボタン要素での使用',
  parameters: {
    docs: {
      description: {
        story: 'リンクだけでなく、ボタンやその他のフォーカス可能な要素でも使用できます。',
      },
    },
  },
  render: () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const focusTrapInstanceRef = useRef<InstanceType<typeof FocusTrap> | null>(null);

    useEffect(() => {
      if (!containerRef.current || focusTrapInstanceRef.current) return;

      const focusTrap = new FocusTrap();
      focusTrap.addFocusTrap('.js-button-trap-start', '.js-button-trap-end');

      focusTrapInstanceRef.current = focusTrap;

      return () => {
        if (focusTrapInstanceRef.current) {
          focusTrapInstanceRef.current.removeFocusTrap(
            '.js-button-trap-start',
            '.js-button-trap-end',
          );
          focusTrapInstanceRef.current = null;
        }
      };
    }, []);

    return (
      <div ref={containerRef}>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <button className="js-button-trap-start btn btn-primary">ボタン1（開始）</button>
          <button className="btn btn-primary">ボタン2</button>
          <input type="text" placeholder="入力欄" style={inputStyle} />
          <button className="js-button-trap-end btn btn-primary">ボタン3（終了）</button>
        </div>
        <p style={{ marginTop: '1rem', fontSize: '0.875rem', color: '#666' }}>
          ボタンや入力欄でもフォーカストラップが機能します
        </p>
      </div>
    );
  },
};

// スタイル定義
const inputStyle: React.CSSProperties = {
  padding: '0.5rem',
  border: '1px solid #ccc',
  borderRadius: '4px',
  fontSize: '1rem',
};
