import { Popover } from '@components/index.tsx';
import { createHtmlSource } from '@stories/assets/utils/htmlTransform';
import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';

const meta = {
  title: 'Modules/ポップオーバー',
  tags: ['autodocs'],
  parameters: {
    docs: {
      source: createHtmlSource('code'),
      description: {
        component: `
### Popover API を使用した実装

このコンポーネントは HTML Popover API を使用しています。JavaScriptなしで動作します。

### Props

#### PopoverDialog
| Props | 型 | 概要 | デフォルト |
|-------|-----|------|-----------|
| popoverId | string | ポップオーバーの一意なID | - |
| popoverType | "auto" \\| "manual" | ポップオーバーのタイプ（autoは自動で閉じる、manualは手動で閉じる） | "auto" |

#### PopoverOpenBtn
| Props | 型 | 概要 |
|-------|-----|------|
| popoverId | string | 対象のポップオーバーID |

※ 閉じるボタンはDialogに自動で含まれます。

### 注意事項：スクロールについて

\`popover="auto"\` はライトディスミス機能（背景クリックで閉じる）を持っていますが、これはポップオーバー内部でスクロールする場合にのみ有効です。

ページ自体をスクロールさせてコンテンツを表示する場合、スタイルの変更が必要となり、ライトディスミスが機能しなくなります。そのため、**ページスクロールを伴うコンテンツの表示にはポップオーバーは適していません。** そのようなケースでは \`<dialog>\` 要素の使用を検討してください。
        `,
      },
    },
  },
} satisfies Meta<typeof Popover>;

export default meta;
type RootStory = StoryObj<typeof Popover>;

export const BasicPopover: RootStory = {
  name: '基本的なポップオーバー',
  parameters: {
    docs: {
      description: {
        story:
          '基本的なポップオーバーの表示例です。ボタンをクリックすると、シンプルな情報が表示されます。',
      },
    },
  },
  render: () => {
    return (
      <>
        <Popover.OpenBtn popoverId="popover-1" className="btn btn-primary">
          基本的なポップオーバーを開く
        </Popover.OpenBtn>
        <Popover.Dialog popoverId="popover-1">
          <h6 className="p-heading-lv5 u-mb-xs">ポップオーバータイトル</h6>
          <p className="u-text-sm">
            これは基本的なポップオーバーのコンテンツです。追加情報やヘルプテキストを表示できます。
          </p>
        </Popover.Dialog>
      </>
    );
  },
};

export const PopoverWithLink: RootStory = {
  name: 'リンク付きポップオーバー',
  parameters: {
    docs: {
      description: {
        story: 'リンクを含むポップオーバーの例です。詳細情報へのリンクなどを含めることができます。',
      },
    },
  },
  render: () => {
    return (
      <>
        <Popover.OpenBtn popoverId="popover-2" className="btn btn-primary">
          リンク付きポップオーバーを開く
        </Popover.OpenBtn>
        <Popover.Dialog popoverId="popover-2">
          <h6 className="p-heading-lv5 u-mb-xs">詳細情報</h6>
          <p className="u-text-sm u-mb-xs">この機能についての詳細は以下をご覧ください。</p>
          <a className="c-link" href="★★★">
            詳細ドキュメントを見る
          </a>
        </Popover.Dialog>
      </>
    );
  },
};

export const MultiplePopovers: RootStory = {
  name: '複数のポップオーバー',
  parameters: {
    docs: {
      description: {
        story: '複数のポップオーバーを同時に配置する例です。それぞれ独立して動作します。',
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="u-flex u-flex-wrap u-gap-4">
        <Story />
      </div>
    ),
  ],
  render: () => {
    return (
      <>
        <Popover.OpenBtn popoverId="popover-5-1" className="btn btn-primary">
          ポップオーバー1
        </Popover.OpenBtn>
        <Popover.Dialog popoverId="popover-5-1">
          <h6 className="p-heading-lv5 u-mb-xs">ポップオーバー1</h6>
          <p className="u-text-sm">最初のポップオーバーの内容です。</p>
        </Popover.Dialog>

        <Popover.OpenBtn popoverId="popover-5-2" className="btn btn-primary">
          ポップオーバー2
        </Popover.OpenBtn>
        <Popover.Dialog popoverId="popover-5-2">
          <h6 className="p-heading-lv5 u-mb-xs">ポップオーバー2</h6>
          <p className="u-text-sm">2番目のポップオーバーの内容です。</p>
        </Popover.Dialog>

        <Popover.OpenBtn popoverId="popover-5-3" className="btn btn-primary">
          ポップオーバー3
        </Popover.OpenBtn>
        <Popover.Dialog popoverId="popover-5-3">
          <h6 className="p-heading-lv5 u-mb-xs">ポップオーバー3</h6>
          <p className="u-text-sm">3番目のポップオーバーの内容です。</p>
        </Popover.Dialog>
      </>
    );
  },
};
