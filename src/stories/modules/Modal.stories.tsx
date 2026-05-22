import Dialog from '@assets/js/modules/Dialog';
import checkScrollbar from '@assets/js/modules/utils/checkScrollbar.ts';
import { ContentsModal, PageModal } from '@components/index.tsx';
import { createHtmlSource } from '@stories/assets/utils/htmlTransform';
import { sbdocsPreviewHiddenCss } from '@stories/assets/utils/utils';
import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useEffect } from 'react';

checkScrollbar();
const meta = {
  title: 'Modules/モーダル',
  tags: ['autodocs'],
  parameters: {
    docs: {
      source: createHtmlSource('static'),
      description: {
        component: `
### オプション

| オプション | 概要 | デフォルト |
|-----------|------|-----------|
| selector | 対象のダイアログ要素のセレクタを指定 | \`'dialog'\` |
| openTrigger | モーダルを開くトリガー要素のセレクタを指定 | \`''\` |
| closeTrigger | モーダルを閉じるトリガー要素のセレクタを指定 | \`''\` |
| closeOnOutside | オーバーレイクリックでモーダルを閉じるかどうかを指定（ESCキーは常に閉じる） | \`false\` |

### オプション設定方法
\`\`\`javascript
Dialog.initAll({
  selector: 'dialog',                 // 対象のセレクター
  openTrigger: '.js-open',            // 開くボタンのセレクター
  closeTrigger: '.js-close',          // 閉じるボタンのセレクター
  closeOnOutside: true,               // オーバーレイクリックで閉じるか（デフォルト: false、ESCキーは常に閉じる）
});
\`\`\`

### モーダルの満たすべき仕様
#### 表示・非表示制御
<ul>
<li>開閉状態の管理（表示/非表示の切り替え）</li>
<li>プログラムによる開閉制御</li>
<li>開閉時のスクロールバーかくつき防止</li>
<li>背景スクロールの無効化</li>
<li>背景スクロール無効化時、背景スクロール位置の保持（position: fixed; での実装は背景スクロール位置をリセットしてしまうため注意が必要）</li>
<li>背景オーバーレイ（通常は半透明の暗い背景）</li>
</ul>

#### ユーザビリティ・アクセシビリティ
<ul>
<li>Escキーで閉じる機能</li>
<li>背景クリックで閉じる機能（オプション）</li>
<li>フォーカストラップ（モーダル外への移動防止）</li>
<li>開いた時の初期フォーカス設定</li>
<li>ARIA属性の実装（role="dialog", aria-labelledby, aria-describedby）</li>
<li>スクリーンリーダー対応</li>
</ul>

### 技術メモ
ポップオーバーを使用したモーダルでは、モーダル内にスクロールを実装した際に、backdrop クリックによる閉じる挙動が正しく動作しない問題があるため、ポップオーバーでの実装は難しい。
        `,
      },
    },
  },
  decorators: [
    (Story) => (
      <>
        <style>{sbdocsPreviewHiddenCss}</style>
        <Story />
      </>
    ),
  ],
} satisfies Meta<typeof ContentsModal>;

export default meta;
type RootStory = StoryObj<typeof ContentsModal>;

export const InternalScrollModalShort: RootStory = {
  name: 'コンテンツスクロール（スクロールなし）',
  parameters: {
    docs: {
      description: {
        story:
          'モーダル内にコンテンツが少ない場合の表示例です。コンテンツ量に応じて要素の大きさが変わります。',
      },
    },
  },
  render: () => {
    useEffect(() => {
      Dialog.initAll({
        openTrigger: '.js-dialogOpenBtn',
        closeTrigger: '.js-dialogCloseBtn',
        closeOnOutside: true,
      });
    }, []);
    return (
      <>
        <ContentsModal.OpenBtn modalId="modal-1" className="btn btn-primary js-dialogOpenBtn">
          コンテンツスクロール（スクロールなし）
        </ContentsModal.OpenBtn>
        <ContentsModal.Dialog modalId="modal-1" closeButtonClassName="js-dialogCloseBtn">
          <h5 className="p-heading-lv4 u-mb-sm">コンテンツスクロール（スクロールなし）</h5>
          <p>モーダル内にコンテンツが少ない場合、コンテンツ量に応じて要素の大きさが変わります。</p>
          <p>
            <a className="c-link" href="★★★">
              フォーカストラップ確認用リンク
            </a>
            ／
            <a className="c-link" href="★★★">
              フォーカストラップ確認用リンク
            </a>
            ／
            <a className="c-link" href="★★★">
              フォーカストラップ確認用リンク
            </a>
          </p>
        </ContentsModal.Dialog>
      </>
    );
  },
};

export const InternalScrollModalLong: RootStory = {
  name: 'コンテンツスクロール（スクロールあり）',
  render: () => {
    useEffect(() => {
      Dialog.initAll({
        openTrigger: '.js-dialogOpenBtn',
        closeTrigger: '.js-dialogCloseBtn',
        closeOnOutside: true,
      });
    }, []);
    return (
      <>
        <ContentsModal.OpenBtn modalId="modal-2" className="btn btn-primary js-dialogOpenBtn">
          コンテンツスクロール（スクロールあり）
        </ContentsModal.OpenBtn>
        <ContentsModal.Dialog modalId="modal-2" closeButtonClassName="js-dialogCloseBtn">
          <h5 className="p-heading-lv4 u-mb-sm">コンテンツスクロール（スクロールあり）</h5>
          <p className="u-mt-sm">
            モーダル内にコンテンツが多い場合、モーダル内でスクロールされます。
          </p>
          <p className="u-mt-sm">
            モーダル内にコンテンツが多い場合、モーダル内でスクロールされます。
          </p>
          <p className="u-mt-sm">
            モーダル内にコンテンツが多い場合、モーダル内でスクロールされます。
          </p>
          <p className="u-mt-sm">
            モーダル内にコンテンツが多い場合、モーダル内でスクロールされます。
          </p>
          <p className="u-mt-sm">
            モーダル内にコンテンツが多い場合、モーダル内でスクロールされます。
          </p>
          <p className="u-mt-sm">
            モーダル内にコンテンツが多い場合、モーダル内でスクロールされます。
          </p>
          <p className="u-mt-sm">
            モーダル内にコンテンツが多い場合、モーダル内でスクロールされます。
          </p>
          <p className="u-mt-sm">
            モーダル内にコンテンツが多い場合、モーダル内でスクロールされます。
          </p>
          <p className="u-mt-sm">
            モーダル内にコンテンツが多い場合、モーダル内でスクロールされます。
          </p>
          <p className="u-mt-sm">
            モーダル内にコンテンツが多い場合、モーダル内でスクロールされます。
          </p>
          <p className="u-mt-sm">
            モーダル内にコンテンツが多い場合、モーダル内でスクロールされます。
          </p>
          <p className="u-mt-sm">
            モーダル内にコンテンツが多い場合、モーダル内でスクロールされます。
          </p>
          <p className="u-mt-sm">
            モーダル内にコンテンツが多い場合、モーダル内でスクロールされます。
          </p>
          <p className="u-mt-sm">
            モーダル内にコンテンツが多い場合、モーダル内でスクロールされます。
          </p>
          <p className="u-mt-sm">
            モーダル内にコンテンツが多い場合、モーダル内でスクロールされます。
          </p>
          <p className="u-mt-sm">
            モーダル内にコンテンツが多い場合、モーダル内でスクロールされます。
          </p>
          <p className="u-mt-sm">
            <a className="c-link" href="★★★">
              フォーカストラップ確認用リンク
            </a>
            ／
            <a className="c-link" href="★★★">
              フォーカストラップ確認用リンク
            </a>
            ／
            <a className="c-link" href="★★★">
              フォーカストラップ確認用リンク
            </a>
          </p>
        </ContentsModal.Dialog>
      </>
    );
  },
};

export const ExternalScrollModalShort: RootStory = {
  name: 'ページスクロール（スクロールなし）',
  render: () => {
    useEffect(() => {
      Dialog.initAll({
        openTrigger: '.js-dialogOpenBtn',
        closeTrigger: '.js-dialogCloseBtn',
        closeOnOutside: true,
      });
    }, []);
    return (
      <>
        <PageModal.OpenBtn modalId="modal-3" className="btn btn-primary js-dialogOpenBtn">
          ページスクロール（スクロールなし）
        </PageModal.OpenBtn>
        <PageModal.Dialog modalId="modal-3" closeButtonClassName="js-dialogCloseBtn">
          <h5 className="p-heading-lv4 u-mb-sm">モーダル外スクロール（スクロールなし）</h5>
          <p>モーダル内にコンテンツが少ない場合、コンテンツ量に応じて要素の大きさが変わります。</p>
          <p>
            <a className="c-link" href="★★★">
              フォーカストラップ確認用リンク
            </a>
            ／
            <a className="c-link" href="★★★">
              フォーカストラップ確認用リンク
            </a>
            ／
            <a className="c-link" href="★★★">
              フォーカストラップ確認用リンク
            </a>
          </p>
        </PageModal.Dialog>
      </>
    );
  },
};

export const ExternalScrollModalLong: RootStory = {
  name: 'ページスクロール（スクロールあり）',
  render: () => {
    useEffect(() => {
      Dialog.initAll({
        openTrigger: '.js-dialogOpenBtn',
        closeTrigger: '.js-dialogCloseBtn',
        closeOnOutside: true,
      });
    }, []);
    return (
      <>
        <PageModal.OpenBtn modalId="modal-4" className="btn btn-primary js-dialogOpenBtn">
          ページスクロール（スクロールあり）
        </PageModal.OpenBtn>
        <PageModal.Dialog modalId="modal-4" closeButtonClassName="js-dialogCloseBtn">
          <h5 className="p-heading-lv4 u-mb-sm">モーダル外スクロール（スクロールあり）</h5>
          <p className="u-mt-sm">
            モーダル内にコンテンツが多い場合、モーダル外でスクロールされます。
          </p>
          <p className="u-mt-sm">
            モーダル内にコンテンツが多い場合、モーダル外でスクロールされます。
          </p>
          <p className="u-mt-sm">
            モーダル内にコンテンツが多い場合、モーダル外でスクロールされます。
          </p>
          <p className="u-mt-sm">
            モーダル内にコンテンツが多い場合、モーダル外でスクロールされます。
          </p>
          <p className="u-mt-sm">
            モーダル内にコンテンツが多い場合、モーダル外でスクロールされます。
          </p>
          <p className="u-mt-sm">
            モーダル内にコンテンツが多い場合、モーダル外でスクロールされます。
          </p>
          <p className="u-mt-sm">
            モーダル内にコンテンツが多い場合、モーダル外でスクロールされます。
          </p>
          <p className="u-mt-sm">
            モーダル内にコンテンツが多い場合、モーダル外でスクロールされます。
          </p>
          <p className="u-mt-sm">
            モーダル内にコンテンツが多い場合、モーダル外でスクロールされます。
          </p>
          <p className="u-mt-sm">
            モーダル内にコンテンツが多い場合、モーダル外でスクロールされます。
          </p>
          <p className="u-mt-sm">
            モーダル内にコンテンツが多い場合、モーダル外でスクロールされます。
          </p>
          <p className="u-mt-sm">
            モーダル内にコンテンツが多い場合、モーダル外でスクロールされます。
          </p>
          <p className="u-mt-sm">
            モーダル内にコンテンツが多い場合、モーダル外でスクロールされます。
          </p>
          <p className="u-mt-sm">
            モーダル内にコンテンツが多い場合、モーダル外でスクロールされます。
          </p>
          <p className="u-mt-sm">
            モーダル内にコンテンツが多い場合、モーダル外でスクロールされます。
          </p>
          <p className="u-mt-sm">
            モーダル内にコンテンツが多い場合、モーダル外でスクロールされます。
          </p>
          <p className="u-mt-sm">
            <a className="c-link" href="★★★">
              フォーカストラップ確認用リンク
            </a>
            ／
            <a className="c-link" href="★★★">
              フォーカストラップ確認用リンク
            </a>
            ／
            <a className="c-link" href="★★★">
              フォーカストラップ確認用リンク
            </a>
          </p>
        </PageModal.Dialog>
      </>
    );
  },
};

export const OptionSelector: RootStory = {
  name: '【オプション】セレクター・開閉ボタンの指定',
  render: () => {
    useEffect(() => {
      Dialog.initAll({
        selector: '.costom-modal-class',
        openTrigger: '.js-open',
        closeTrigger: '.js-close',
        closeOnOutside: true,
      });
    }, []);
    return (
      <>
        <ContentsModal.OpenBtn modalId="modal-5" className="btn btn-primary js-open">
          【オプション】セレクター・開閉ボタンの指定
        </ContentsModal.OpenBtn>
        <ContentsModal.Dialog
          modalId="modal-5"
          className="costom-modal-class"
          closeButtonClassName="js-close"
        >
          <h5 className="p-heading-lv4 u-mb-sm">モーダルタイトル</h5>
          <p>
            モーダルテキストモーダルテキストモーダルテキストモーダルテキストモーダルテキストモーダルテキストモーダルテキストモーダルテキストモーダルテキストモーダルテキスト
          </p>
        </ContentsModal.Dialog>
      </>
    );
  },
};

export const OptionCloseOnOutsideInteraction: RootStory = {
  name: '【オプション】オーバーレイクリックで閉じない',
  render: () => {
    useEffect(() => {
      Dialog.initAll({
        selector: '.outside-interaction-disabled',
        openTrigger: '.js-dialogOpenBtn',
        closeTrigger: '.js-dialogCloseBtn',
      });
    }, []);
    return (
      <>
        <ContentsModal.OpenBtn modalId="modal-6" className="btn btn-primary js-dialogOpenBtn">
          オーバーレイクリックで閉じない
        </ContentsModal.OpenBtn>
        <ContentsModal.Dialog
          modalId="modal-6"
          className="outside-interaction-disabled"
          closeButtonClassName="js-dialogCloseBtn"
        >
          <h5 className="p-heading-lv4 u-mb-sm">モーダルタイトル</h5>
          <p>
            モーダルテキストモーダルテキストモーダルテキストモーダルテキストモーダルテキストモーダルテキストモーダルテキストモーダルテキストモーダルテキストモーダルテキスト
          </p>
        </ContentsModal.Dialog>
      </>
    );
  },
};

export const MultipleModal: RootStory = {
  name: '複数のモーダルに適用（処理競合の確認）',
  decorators: [
    (Story) => (
      <div className="u-flex u-flex-wrap u-gap-4">
        <Story />
      </div>
    ),
  ],
  render: () => {
    useEffect(() => {
      Dialog.initAll({
        selector: '.modal-default',
        openTrigger: '.js-dialogOpenBtn',
        closeTrigger: '.js-dialogCloseBtn',
        closeOnOutside: true,
      });
      Dialog.initAll({
        selector: '.modal-3',
        openTrigger: '.js-dialogOpenBtn',
        closeTrigger: '.js-dialogCloseBtn',
      });
    }, []);
    return (
      <>
        <ContentsModal.OpenBtn modalId="modal-8-1" className="btn btn-primary js-dialogOpenBtn">
          1つ目のモーダル
        </ContentsModal.OpenBtn>
        <ContentsModal.Dialog
          modalId="modal-8-1"
          className="modal-default"
          closeButtonClassName="js-dialogCloseBtn"
        >
          <h5 className="p-heading-lv4 u-mb-sm">1つ目のモーダル</h5>
          <p>
            モーダルテキストモーダルテキストモーダルテキストモーダルテキストモーダルテキストモーダルテキストモーダルテキストモーダルテキストモーダルテキストモーダルテキスト
          </p>
        </ContentsModal.Dialog>

        <ContentsModal.OpenBtn modalId="modal-8-2" className="btn btn-primary js-dialogOpenBtn">
          2つ目のモーダル
        </ContentsModal.OpenBtn>
        <ContentsModal.Dialog
          modalId="modal-8-2"
          className="modal-default"
          closeButtonClassName="js-dialogCloseBtn"
        >
          <h5 className="p-heading-lv4 u-mb-sm">2つ目のモーダル</h5>
          <p>
            モーダルテキストモーダルテキストモーダルテキストモーダルテキストモーダルテキストモーダルテキストモーダルテキストモーダルテキストモーダルテキストモーダルテキスト
          </p>
        </ContentsModal.Dialog>

        <ContentsModal.OpenBtn modalId="modal-8-3" className="btn btn-primary js-dialogOpenBtn">
          3つ目のモーダル（外部操作で閉じない）
        </ContentsModal.OpenBtn>
        <ContentsModal.Dialog
          modalId="modal-8-3"
          className="modal-3"
          closeButtonClassName="js-dialogCloseBtn"
        >
          <h5 className="p-heading-lv4 u-mb-sm">3つ目のモーダル</h5>
          <p>
            モーダルテキストモーダルテキストモーダルテキストモーダルテキストモーダルテキストモーダルテキストモーダルテキストモーダルテキストモーダルテキストモーダルテキスト
          </p>
        </ContentsModal.Dialog>
      </>
    );
  },
};
