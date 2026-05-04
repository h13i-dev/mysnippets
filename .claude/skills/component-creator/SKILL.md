---
name: component-creator
description: >
  Reactコンポーネントの新規作成を依頼されたときに呼び出す。
  TSXファイル・SCSSファイル（FLOCSS設計）を規約に従って一括生成し、
  Storybookストーリーの生成も担当する。
  「コンポーネントを作って」「新しいUIパーツを追加して」「〇〇コンポーネントが必要」
  などのリクエストに対してこのスキルを積極的に使用すること。
  Astro 5 / React 19 / TypeScript / FLOCSS / Storybook 10 プロジェクトに特化。
---

# Component Creator

Reactコンポーネントの新規作成を一貫した手順で行う。

## 生成するファイル

| ファイル | 役割 |
|---|---|
| `src/components/ComponentName.tsx` | Reactコンポーネント |
| `src/assets/sass/objects/components/_name.scss` | c-レイヤー（汎用構造） |
| `src/assets/sass/objects/projects/_name.scss` | p-レイヤー（プロジェクト固有デザイン） |
| `src/stories/components/ComponentName.stories.tsx` | Storybookストーリー（必要時） |

## Step 1: 情報収集

作成前に不明な点があれば確認する。通常は以下を把握すれば十分:

- **コンポーネント名**（PascalCase）と **役割**
- **Props** — どんなデータを受け取るか（型・必須/任意）
- **サブコンポーネント** — `Card.Figure` `Card.Body` のような複合構造が必要か
- **Storybookストーリーも生成するか**（省略時は生成する）

## Step 2: FLOCSS レイヤーを判断する

SCSSの分割方針:

| 状況 | 作るファイル |
|---|---|
| 色・幅・ブランド要素を持たない汎用モジュール（ボタン、カード、グリッドなど） | `components/` と `projects/` の **両方** |
| プロジェクト固有のデザインのみ（見出し、パンくず、ブログ固有パーツなど） | `projects/` **のみ** |

どちらか迷ったら「両方」を選ぶ。Componentは構造・余白の基礎定義、Projectはブランドカラー・フォント・ホバーなどの固有定義と考えると判断しやすい。

## Step 3: TSXファイルを作成する

### 基本テンプレート

```typescript
import type { BaseProps } from '@src/types/base';
import { clsx } from 'clsx';

export interface ComponentNameProps extends BaseProps {
  // BasePropsにない追加Propsのみ定義
  // as?: React.ElementType は BaseProps に含まれるため不要
}

const ComponentName = ({ className, children, ...rest }: ComponentNameProps) => {
  return (
    <div className={clsx('c-componentname', 'p-componentname', className)} {...rest}>
      {children}
    </div>
  );
};

export default ComponentName;
```

### サブコンポーネントがある場合

```typescript
const ComponentRoot = ({ className, children, ...rest }: ComponentNameProps) => {
  return (
    <div className={clsx('c-name', 'p-name', className)} {...rest}>
      {children}
    </div>
  );
};

const ComponentSub = ({ className, children, ...rest }: BaseProps) => {
  return (
    <div className={clsx('c-name_sub', className)} {...rest}>
      {children}
    </div>
  );
};

const ComponentName = Object.assign(ComponentRoot, {
  Sub: ComponentSub,
});

export default ComponentName;
```

### Propsの書き方チェックリスト

- `BaseProps` を必ず `extend` する — `as` / `className` / `children` / `[key: string]: any` はここに含まれる
- `import React from 'react'` はJSXを使うファイルかつ `React.xxx` を直接参照する場合のみ追加（型だけなら `import type React from 'react'`）
- `import { clsx } from 'clsx'` — 名前付きインポート
- `className` は `clsx('c-xxx', 'p-xxx', className)` の順に並べる
- ポリモーフィック要素: `const Tag = as || 'div'` で `as` prop に対応する

### インポート順

```typescript
import type { BaseProps } from '@src/types/base';  // 1. 型インポート
import { clsx } from 'clsx';                        // 2. 外部ライブラリ
import React from 'react';                           // 3. React本体（必要な場合のみ）
```

## Step 4: SCSSファイルを作成する

### src/assets/sass/objects/components/_name.scss

```scss
@use "@assets/sass/foundations/global/" as g;

@layer components {
  .c-name {
    // 汎用の構造・余白定義（色を持たない）
  }

  .c-name_element {
    // 要素スタイル
  }
}
```

### src/assets/sass/objects/projects/_name.scss

```scss
@use "@assets/sass/foundations/global/" as g;

@layer components {
  .p-name {
    // プロジェクト固有のデザイン（色・フォントサイズ・ホバーなど）

    @include g.hover {
      // ホバースタイル
    }
  }
}
```

### よく使うSCSSの道具

| 道具 | 用途 |
|---|---|
| `@include g.hover { }` | ホバースタイル（非タッチデバイスのみ） |
| `@include g.mq(md) { }` | メディアクエリ（sm / md / lg / xl / 2xl） |
| `@apply u-xxx;` | Tailwindユーティリティクラスの適用 |
| `var(--color-primary)` | CSS変数 |

## Step 5: master.scss に @use を追加する

`src/assets/sass/master.scss` に追記する。**配置場所が重要**:

```scss
// objects/components（他の要素を内包する場合は上部グループへ、単体は下部グループへ）
@use "objects/components/name" as name-component;

// objects/projects（componentsと対になるものは先頭グループへ、その他は後続へ）
@use "objects/projects/name";
```

既存のコメントブロックを参考に、同種のコンポーネントの近くに追加する。

## Step 6: Storybookストーリーを生成する

Storybookが必要な場合は **storybook-writer エージェントをスポーンする**。
自身でストーリーを書かず、生成したTSXファイルパスを渡して委譲する。

## Step 7: 完了報告

```
## 生成したファイル
- src/components/ComponentName.tsx
- src/assets/sass/objects/components/_name.scss  ← c-レイヤー
- src/assets/sass/objects/projects/_name.scss    ← p-レイヤー
- src/stories/components/ComponentName.stories.tsx

## 次のステップ
- Storybook で表示を確認: npm run storybook
- 型エラーがないか確認: npm run build
```
