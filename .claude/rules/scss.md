---
paths:
  - "**/*.scss"
---

# SCSS Rules

CSSはFLOCSSで設計する。

## FLOCSS レイヤー構成

詳細度はこの順番（上が低い）:

1. Foundation
2. Layout
3. Component
4. Project
5. Utility

| レイヤー | ファイル場所 | クラスプレフィックス |
|---|---|---|
| Foundation | `sass/foundations/` | なし |
| Layout | `sass/layouts/` | `l-` |
| Component | `sass/objects/components/` | `c-` |
| Project | `sass/objects/projects/` | `p-` |
| Utility | `sass/objects/utilities/` | `u-` |

## 各レイヤーの役割

### Layout（`l-`）

body・main・サイドバーなどページ単位で唯一存在するレイアウト配置（grid等）を定義する。

- header・footer は Layout ではなく **Project** に定義する（Layout に置くと Component から再利用できなくなるため）
- Layout から Component のスタイルを上書きしない（詳細度が逆転するため）

### Component（`c-`）

CSSを抽象化したスタイルを定義する。単に繰り返すパーツではなく、固有の幅・色・特色を持たない最小単位のモジュール。

### Project（`p-`）

**基本はまず Project に定義する。** 同じパターンが複数回現れたら Component に切り出す。

## カスケーディングと詳細度

同一レイヤー内のカスケーディングは基本的に避ける。

```scss
// NG
.c-dialog .c-button { ... }
.p-articles .p-comments { ... }
```

バリエーションはモディファイアで対応する:

```scss
// OK
.c-button.-large { ... }
```

例外: 余白・配置の微調整など、密な依存を持たない場合に限り同一レイヤー内カスケーディングを許容する。

## 命名規則

- クラス名は予測可能・簡潔な命名とする
- 形式: `接頭辞-ブロック名_要素名1-要素名2 -修飾子名`（例: `p-block_sample-btn -modifier`）

## Tailwind との使い分け

- **Tailwind**: ヘルパークラス（ユーティリティ）のみ
- **SCSS**: それ以外すべて（コンポーネント定義、ブランドカラー、アニメーション等）
