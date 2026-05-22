import { Accordion } from '@components/index.tsx';
import { createHtmlSource } from '@stories/assets/utils/htmlTransform';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta = {
  title: 'Modules/アコーディオン',
  tags: ['autodocs'],
  parameters: {
    docs: {
      source: createHtmlSource({ mode: 'static' }),
      description: {
        component: `
### 実装について
\`interpolate-size: allow-keywords:\`が、未対応ブラウザがあることから、gridを使用したアコーディオンで実装。

#### ※注意点
\`::details-content:\` ChromeとFirefoxサポート注視（[Can I use](https://caniuse.com/?search=%3A%3Adetails-content)）<br>
\`interpolate-size: allow-keywords:\` SarafiとFirefox未対応（[Can I use](https://caniuse.com/?search=interpolate-size%3A+allow-keywords)）<br>
参考：[Browserslist](https://browsersl.ist/#q=defaults)
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  name: '基本的なアコーディオン',
  render: () => {
    return (
      <Accordion>
        <Accordion.Summary>よくある質問のタイトルがここに入ります</Accordion.Summary>
        <Accordion.Body>
          こちらに回答テキストが表示されます。詳細な説明や解決方法などを記載できます。
          <br />
          こちらに回答テキストが表示されます。詳細な説明や解決方法などを記載できます。
        </Accordion.Body>
      </Accordion>
    );
  },
};

export const DefaultOpen: Story = {
  name: 'デフォルトで開いたアコーディオン',
  render: () => {
    return (
      <Accordion open>
        <Accordion.Summary>よくある質問のタイトルがここに入ります</Accordion.Summary>
        <Accordion.Body>
          こちらに回答テキストが表示されます。詳細な説明や解決方法などを記載できます。
          <br />
          こちらに回答テキストが表示されます。詳細な説明や解決方法などを記載できます。
        </Accordion.Body>
      </Accordion>
    );
  },
};

export const MultipleAccordions: Story = {
  name: '複数のアコーディオン',
  render: () => {
    return (
      <>
        <Accordion>
          <Accordion.Summary>アコーディオン1</Accordion.Summary>
          <Accordion.Body>
            1つ目のアコーディオンの内容です。ここには詳細な説明やリンク、画像などを含めることができます。
          </Accordion.Body>
        </Accordion>

        <Accordion>
          <Accordion.Summary>アコーディオン2</Accordion.Summary>
          <Accordion.Body>
            2つ目のアコーディオンの内容です。複数のアコーディオンを同時に開くことができます。
          </Accordion.Body>
        </Accordion>

        <Accordion>
          <Accordion.Summary>アコーディオン3</Accordion.Summary>
          <Accordion.Body>
            3つ目のアコーディオンの内容です。それぞれのコンテンツは独立して管理されます。
          </Accordion.Body>
        </Accordion>
      </>
    );
  },
};

export const ExclusiveAccordions: Story = {
  name: '排他制御のアコーディオン',
  render: () => {
    return (
      <>
        <Accordion name="faq">
          <Accordion.Summary>よくある質問1：サービスについて</Accordion.Summary>
          <Accordion.Body>
            サービスに関する回答がここに表示されます。詳細な説明や手順を記載できます。
          </Accordion.Body>
        </Accordion>

        <Accordion name="faq">
          <Accordion.Summary>よくある質問2：料金について</Accordion.Summary>
          <Accordion.Body>
            料金に関する回答がここに表示されます。価格表や支払い方法などを説明できます。
          </Accordion.Body>
        </Accordion>

        <Accordion name="faq">
          <Accordion.Summary>よくある質問3：サポートについて</Accordion.Summary>
          <Accordion.Body>
            サポートに関する回答がここに表示されます。問い合わせ方法や営業時間などを記載できます。
          </Accordion.Body>
        </Accordion>
      </>
    );
  },
};

export const RichContent: Story = {
  name: 'リッチコンテンツ（コンテンツの中にHTMLを含めた例）',
  render: () => {
    return (
      <Accordion>
        <Accordion.Summary>サービス機能一覧</Accordion.Summary>
        <Accordion.Body>
          <p>当サービスでは以下の機能を提供しています：</p>
          <ul className="p-list u-mt-xs">
            <li>データの可視化とレポート生成</li>
            <li>リアルタイム分析とアラート機能</li>
            <li>API連携による外部システム統合</li>
            <li>セキュアなデータ保存と管理</li>
          </ul>
          <p className="u-mt-xs">詳細については各機能のドキュメントをご確認ください。</p>
        </Accordion.Body>
      </Accordion>
    );
  },
};
