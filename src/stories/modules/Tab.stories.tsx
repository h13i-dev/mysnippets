import Tab from '@assets/js/modules/Tab';
import { createHtmlSource } from '@stories/assets/utils/htmlTransform';
import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useEffect } from 'react';

const meta = {
  title: 'Modules/タブ',
  tags: ['autodocs'],
  parameters: {
    docs: {
      source: createHtmlSource('code'),
      description: {
        component: `
### オプション

| オプション | 概要 | デフォルト |
|-----------|------|-----------|
| tabSelector | タブボタン要素のセレクタを指定 | 必須 |
| contentSelector | タブコンテンツ要素のセレクタを指定 | 必須 |
| scrollSelector | タブボタンを押した際に、戻りたい位置のセレクタを指定（オプション） | \`null\` |
| persistState | タブの状態をページリロード後も維持する | \`false\` |
| pathBasedActive | コンテンツの\`data-state\`属性と現在のパスを比較してアクティブタブを決定 | \`false\` |
| searchable | ブラウザ検索機能で非表示タブコンテンツを見つけられるようにする（until-found） | \`false\` |
| activeClass | アクティブなタブとコンテンツに付与するクラス名を指定 | \`null\` |

### オプション設定方法
\`\`\`javascript
new Tab({
  tabSelector: '.js-tabBtn',      // タブボタンのセレクター
  contentSelector: '.js-tabContent', // タブコンテンツのセレクター
  scrollSelector: '.tab-section', // スクロール位置指定（オプション）
  persistState: true,             // 状態の永続化（オプション）
  pathBasedActive: true,          // パスベースでアクティブタブを決定（オプション）
  searchable: true,               // ブラウザ検索機能対応（オプション）
  activeClass: 'active'           // アクティブ時に付与するクラス名（オプション）
});
\`\`\`

### pathBasedActiveオプション

\`pathBasedActive: true\` を設定すると、現在のURLパスとタブコンテンツの\`data-state\`属性を比較して、アクティブタブを自動決定します。

\`\`\`html
<div className="js-tab-content" data-state="/profile/">プロフィールタブ</div>
<div className="js-tab-content" data-state="/settings/">設定タブ</div>
<div className="js-tab-content" data-state="/messages/">メッセージタブ</div>
\`\`\`

現在のURLが\`/profile/edit\`の場合、\`data-state="/profile/"\`のタブがアクティブになります。

### アクセシビリティ対応

タブコンポーネントはW3Cドキュメントに準拠：
https://www.w3.org/WAI/ARIA/apg/patterns/tabs/

### 使用方法

1. HTMLにタブの構造を作成
2. \`role="tablist"\` をタブボタンのコンテナに手動で設定
3. \`role="presentation"\` を各タブボタンのラップ要素に手動で設定（必要であれば）
4. JavaScriptでTabクラスを初期化

参考: https://www.tak-dcxi.com/article/accessibility-conscious-tab-menu/
        `,
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const BasicTab: Story = {
  name: '基本的なタブ',
  tags: ['!autodocs'],
  parameters: {
    docs: {
      description: {
        story: '基本的なタブの表示例です。テキストコンテンツを切り替えることができます。',
      },
    },
  },
  render: () => {
    useEffect(() => {
      new Tab({
        tabSelector: '.js-tab-btn',
        contentSelector: '.js-tab-content',
        activeClass: 'active',
      });
    }, []);
    return (
      <>
        <ul className="nav nav-tabs u-mb-4" role="tablist">
          <li className="nav-item" role="presentation">
            <button className="nav-link js-tab-btn active" type="button">
              Home
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button className="nav-link js-tab-btn" type="button">
              Profile
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button className="nav-link js-tab-btn" type="button">
              Contact
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button className="nav-link js-tab-btn" type="button" disabled>
              Disabled
            </button>
          </li>
        </ul>
        <div className="tab-content">
          <div className="js-tab-content active">
            <p>
              Welcome to the home page. This is where you'll find the latest updates and
              information.
            </p>
          </div>
          <div className="js-tab-content">
            <p>View and edit your profile information here.</p>
          </div>
          <div className="js-tab-content">
            <p>Get in touch with us through our contact form.</p>
          </div>
          <div className="js-tab-content">
            <p>This tab is currently disabled and cannot be accessed.</p>
          </div>
        </div>
      </>
    );
  },
};

export const WithScrollSelector: Story = {
  name: 'スクロール位置制御付きタブ',
  parameters: {
    docs: {
      description: {
        story:
          'scrollSelector オプションを使用すると、タブ切り替え時に指定した要素まで自動的にスムーススクロールします。長いコンテンツでタブが画面外にある場合に便利です。',
      },
    },
  },
  decorators: [
    (Story) => (
      <>
        <div
          style={{
            height: '400px',
            background: '#f0f0f0',
            padding: '20px',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <h3>スクロール効果確認用コンテンツ</h3>
        </div>
        <Story />
        <div
          style={{
            height: '400px',
            background: '#f0f0f0',
            padding: '20px',
            marginTop: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <h3>下部コンテンツ</h3>
        </div>
      </>
    ),
  ],
  render: () => {
    useEffect(() => {
      new Tab({
        tabSelector: '.js-tab-btn-scroll',
        contentSelector: '.js-tab-content-scroll',
        scrollSelector: '.scroll-target',
        activeClass: 'active',
      });
    }, []);
    return (
      <div>
        <div className="scroll-target"></div>
        <ul className="nav nav-tabs u-mb-4" role="tablist">
          <li className="nav-item" role="presentation">
            <button className="nav-link js-tab-btn-scroll active" type="button">
              Home
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button className="nav-link js-tab-btn-scroll" type="button">
              Profile
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button className="nav-link js-tab-btn-scroll" type="button">
              Contact
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button className="nav-link js-tab-btn-scroll" type="button">
              Messages
            </button>
          </li>
        </ul>
        <div className="tab-content">
          <div className="js-tab-content-scroll active">
            <p>
              Welcome to the home page. This is where you'll find the latest updates and
              information.
            </p>
          </div>
          <div className="js-tab-content-scroll">
            <p>View and edit your profile information here.</p>
          </div>
          <div className="js-tab-content-scroll">
            <p>Get in touch with us through our contact form.</p>
          </div>
          <div className="js-tab-content-scroll">
            <p>Check your messages and notifications in this section.</p>
          </div>
        </div>
      </div>
    );
  },
};

export const OptionPersistState: Story = {
  name: 'リロード時もタブを保持',
  parameters: {
    docs: {
      description: {
        story:
          'persistState オプションを有効にすると、ページをリロードした後も選択されていたタブの状態が保持されます。localStorageを使用してタブの状態を記憶します。',
      },
    },
  },
  render: () => {
    useEffect(() => {
      new Tab({
        tabSelector: '.js-tab-btn-persist',
        contentSelector: '.js-tab-content-persist',
        persistState: true,
        activeClass: 'active',
      });
    }, []);
    return (
      <div>
        <ul className="nav nav-tabs u-mb-4" role="tablist">
          <li className="nav-item" role="presentation">
            <button className="nav-link js-tab-btn-persist active" type="button">
              Home
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button className="nav-link js-tab-btn-persist" type="button">
              Profile
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button className="nav-link js-tab-btn-persist" type="button">
              Contact
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button className="nav-link js-tab-btn-persist" type="button">
              Messages
            </button>
          </li>
        </ul>
        <div className="tab-content">
          <div className="js-tab-content-persist active">
            <p>
              Welcome to the home page. This is where you'll find the latest updates and
              information.
            </p>
          </div>
          <div className="js-tab-content-persist">
            <p>View and edit your profile information here.</p>
          </div>
          <div className="js-tab-content-persist">
            <p>Get in touch with us through our contact form.</p>
          </div>
          <div className="js-tab-content-persist">
            <p>Check your messages and notifications in this section.</p>
          </div>
        </div>
      </div>
    );
  },
};

export const WithHiddenUntilFound: Story = {
  name: '検索対応タブ (hidden=until-found)',
  parameters: {
    docs: {
      description: {
        story:
          'hidden="until-found" を使用することで、ブラウザの検索機能（Ctrl+F）で非表示のタブコンテンツが見つかったときに自動的にそのタブを表示します。検索してみてください：「スキルアップ」「ダークモード」「システム更新」など。',
      },
    },
  },
  render: () => {
    useEffect(() => {
      new Tab({
        tabSelector: '.js-tab-btn-search',
        contentSelector: '.js-tab-content-search',
        searchable: true,
        activeClass: 'active',
      });
    }, []);
    return (
      <div>
        <ul className="nav nav-tabs u-mb-4" role="tablist">
          <li className="nav-item" role="presentation">
            <button className="nav-link js-tab-btn-search active" type="button">
              Home
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button className="nav-link js-tab-btn-search" type="button">
              Profile
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button className="nav-link js-tab-btn-search" type="button">
              Contact
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button className="nav-link js-tab-btn-search" type="button">
              Messages
            </button>
          </li>
        </ul>
        <div className="tab-content">
          <div className="js-tab-content-search active">
            <p>
              Welcome to the home page. This is where you'll find the latest updates and
              information.
            </p>
          </div>
          <div className="js-tab-content-search">
            <p>View and edit your profile information here.</p>
          </div>
          <div className="js-tab-content-search">
            <p>Get in touch with us through our contact form.</p>
          </div>
          <div className="js-tab-content-search">
            <p>Check your messages and notifications in this section.</p>
          </div>
        </div>
      </div>
    );
  },
};

export const WithPathBasedActive: Story = {
  name: 'URLパスベースでタブ状態を決定',
  parameters: {
    docs: {
      description: {
        story:
          'pathBasedActive オプションを有効にすると、コンテンツの data-state 属性と現在のURLパスを比較してアクティブタブを決定します。',
      },
    },
  },
  render: () => {
    useEffect(() => {
      new Tab({
        tabSelector: '.js-tab-btn-path',
        contentSelector: '.js-tab-content-path',
        pathBasedActive: true,
        activeClass: 'active',
      });
    }, []);
    return (
      <div>
        <ul className="nav nav-tabs u-mb-4" role="tablist">
          <li className="nav-item" role="presentation">
            <button className="nav-link js-tab-btn-path active" data-state="/home/" type="button">
              Home
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button className="nav-link js-tab-btn-path" data-state="/profile/" type="button">
              Profile
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button className="nav-link js-tab-btn-path" data-state="/contact/" type="button">
              Contact
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button className="nav-link js-tab-btn-path" data-state="/messages/" type="button">
              Messages
            </button>
          </li>
        </ul>
        <div className="tab-content">
          <div className="js-tab-content-path active">
            <p>
              Welcome to the home page. This is where you'll find the latest updates and
              information.
            </p>
          </div>
          <div className="js-tab-content-path">
            <p>View and edit your profile information here.</p>
          </div>
          <div className="js-tab-content-path">
            <p>Get in touch with us through our contact form.</p>
          </div>
          <div className="js-tab-content-path">
            <p>Check your messages and notifications in this section.</p>
          </div>
        </div>
      </div>
    );
  },
};
