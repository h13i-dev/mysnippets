import Tab from '@assets/js/modules/Tab';
import { Link } from '@components/index.tsx';
import { createHtmlSource } from '@stories/assets/utils/htmlTransform';
import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useEffect } from 'react';

const meta = {
  title: 'Modules/タブ',
  tags: ['autodocs'],
  parameters: {
    docs: {
      source: createHtmlSource({ extract: 'code' }),
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
<div className="js-tabContent" data-state="/profile/">プロフィールタブ</div>
<div className="js-tabContent" data-state="/settings/">設定タブ</div>
<div className="js-tabContent" data-state="/messages/">メッセージタブ</div>
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
        tabSelector: '.js-tabBtn',
        contentSelector: '.js-tabContent',
        activeClass: 'active',
      });
    }, []);
    return (
      <>
        <ul className="nav nav-tabs u-mb-4" role="tablist">
          <li className="nav-item" role="presentation">
            <button className="nav-link js-tabBtn active" type="button">
              Home
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button className="nav-link js-tabBtn" type="button">
              Profile
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button className="nav-link js-tabBtn" type="button">
              Contact
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button className="nav-link js-tabBtn" type="button" disabled>
              Disabled
            </button>
          </li>
        </ul>
        <div className="tab-content">
          <div className="js-tabContent active">
            <p>
              Welcome to the home page. This is where you'll find the latest updates and
              information.
            </p>
          </div>
          <div className="js-tabContent">
            <p>View and edit your profile information here.</p>
          </div>
          <div className="js-tabContent">
            <p>Get in touch with us through our contact form.</p>
          </div>
          <div className="js-tabContent">
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
        tabSelector: '.js-tabBtnScroll',
        contentSelector: '.js-tabContentScroll',
        scrollSelector: '.scroll-target',
        activeClass: 'active',
      });
    }, []);
    return (
      <div>
        <div className="scroll-target"></div>
        <ul className="nav nav-tabs u-mb-4" role="tablist">
          <li className="nav-item" role="presentation">
            <button className="nav-link js-tabBtnScroll active" type="button">
              Home
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button className="nav-link js-tabBtnScroll" type="button">
              Profile
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button className="nav-link js-tabBtnScroll" type="button">
              Contact
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button className="nav-link js-tabBtnScroll" type="button">
              Messages
            </button>
          </li>
        </ul>
        <div className="tab-content">
          <div className="js-tabContentScroll active">
            <p>
              Welcome to the home page. This is where you'll find the latest updates and
              information.
            </p>
          </div>
          <div className="js-tabContentScroll">
            <p>View and edit your profile information here.</p>
          </div>
          <div className="js-tabContentScroll">
            <p>Get in touch with us through our contact form.</p>
          </div>
          <div className="js-tabContentScroll">
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
        tabSelector: '.js-tabBtnPersist',
        contentSelector: '.js-tabContentPersist',
        persistState: true,
        activeClass: 'active',
      });
    }, []);
    return (
      <div>
        <ul className="nav nav-tabs u-mb-4" role="tablist">
          <li className="nav-item" role="presentation">
            <button className="nav-link js-tabBtnPersist active" type="button">
              Home
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button className="nav-link js-tabBtnPersist" type="button">
              Profile
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button className="nav-link js-tabBtnPersist" type="button">
              Contact
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button className="nav-link js-tabBtnPersist" type="button">
              Messages
            </button>
          </li>
        </ul>
        <div className="tab-content">
          <div className="js-tabContentPersist active">
            <p>
              Welcome to the home page. This is where you'll find the latest updates and
              information.
            </p>
          </div>
          <div className="js-tabContentPersist">
            <p>View and edit your profile information here.</p>
          </div>
          <div className="js-tabContentPersist">
            <p>Get in touch with us through our contact form.</p>
          </div>
          <div className="js-tabContentPersist">
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
        tabSelector: '.js-tabBtnSearch',
        contentSelector: '.js-tabContentSearch',
        searchable: true,
        activeClass: 'active',
      });
    }, []);
    return (
      <div>
        <ul className="nav nav-tabs u-mb-4" role="tablist">
          <li className="nav-item" role="presentation">
            <button className="nav-link js-tabBtnSearch active" type="button">
              Home
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button className="nav-link js-tabBtnSearch" type="button">
              Profile
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button className="nav-link js-tabBtnSearch" type="button">
              Contact
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button className="nav-link js-tabBtnSearch" type="button">
              Messages
            </button>
          </li>
        </ul>
        <div className="tab-content">
          <div className="js-tabContentSearch active">
            <p>
              Welcome to the home page. This is where you'll find the latest updates and
              information.
            </p>
          </div>
          <div className="js-tabContentSearch">
            <p>View and edit your profile information here.</p>
          </div>
          <div className="js-tabContentSearch">
            <p>Get in touch with us through our contact form.</p>
          </div>
          <div className="js-tabContentSearch">
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
        tabSelector: '.js-tabBtnPath',
        contentSelector: '.js-tabContentPath',
        pathBasedActive: true,
        activeClass: 'active',
      });
    }, []);
    return (
      <div>
        <ul className="nav nav-tabs u-mb-4" role="tablist">
          <li className="nav-item" role="presentation">
            <button className="nav-link js-tabBtnPath active" data-state="/home/" type="button">
              Home
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button className="nav-link js-tabBtnPath" data-state="/profile/" type="button">
              Profile
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button className="nav-link js-tabBtnPath" data-state="/contact/" type="button">
              Contact
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button className="nav-link js-tabBtnPath" data-state="/messages/" type="button">
              Messages
            </button>
          </li>
        </ul>
        <div className="tab-content">
          <div className="js-tabContentPath active">
            <p>
              Welcome to the home page. This is where you'll find the latest updates and
              information.
            </p>
          </div>
          <div className="js-tabContentPath">
            <p>View and edit your profile information here.</p>
          </div>
          <div className="js-tabContentPath">
            <p>Get in touch with us through our contact form.</p>
          </div>
          <div className="js-tabContentPath">
            <p>Check your messages and notifications in this section.</p>
          </div>
        </div>
      </div>
    );
  },
};

export const WithLinksInContent: Story = {
  name: 'コンテンツ内にリンクがあるタブ',
  parameters: {
    docs: {
      description: {
        story:
          'タブコンテンツ内にリンクが含まれるパターンです。リンクがある場合、タブパネル自体には tabindex が付与されず、リンクが直接フォーカスを受け取ります。',
      },
    },
  },
  render: () => {
    useEffect(() => {
      new Tab({
        tabSelector: '.js-tabBtnLinks',
        contentSelector: '.js-tabContentLinks',
        activeClass: 'active',
      });
    }, []);
    return (
      <>
        <ul className="nav nav-tabs u-mb-4" role="tablist">
          <li className="nav-item" role="presentation">
            <button className="nav-link js-tabBtnLinks active" type="button">
              ニュース
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button className="nav-link js-tabBtnLinks" type="button">
              製品
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button className="nav-link js-tabBtnLinks" type="button">
              サポート
            </button>
          </li>
        </ul>
        <div className="tab-content">
          <div className="js-tabContentLinks active">
            <ul className="p-list">
              <li>
                <Link href="★★★">新機能リリースのお知らせ</Link>
              </li>
              <li>
                <Link href="★★★">メンテナンス情報</Link>
              </li>
              <li>
                <Link href="★★★">キャンペーンのご案内</Link>
              </li>
            </ul>
          </div>
          <div className="js-tabContentLinks">
            <ul className="p-list">
              <li>
                <Link href="★★★">プランA - 詳細を見る</Link>
              </li>
              <li>
                <Link href="★★★">プランB - 詳細を見る</Link>
              </li>
              <li>
                <Link href="★★★">プランC - 詳細を見る</Link>
              </li>
            </ul>
          </div>
          <div className="js-tabContentLinks">
            <ul className="p-list">
              <li>
                <Link href="★★★">よくある質問</Link>
              </li>
              <li>
                <Link href="★★★">お問い合わせフォーム</Link>
              </li>
              <li>
                <Link href="★★★">マニュアルをダウンロード</Link>
              </li>
            </ul>
          </div>
        </div>
      </>
    );
  },
};
