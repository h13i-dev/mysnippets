# AGENTS.md

## SCSS

- CSS は FLOCSS で設計する。
- 詳細度は低い順に Foundation、Layout、Component、Project、Utility とする。
- Tailwind はヘルパー用途のユーティリティクラスだけに使う。
- コンポーネント定義、ブランドカラー、アニメーション、ユーティリティ以外のスタイルは SCSS で書く。

## レイヤー

- `foundations/`: ベーススタイル。クラス接頭辞なし。
- `layouts/`: body、main、sidebar などページ単位のレイアウト。`l-` を使う。
- `objects/components/`: 抽象化された再利用モジュール。`c-` を使う。
- `objects/projects/`: プロジェクト固有の UI。`p-` を使う。
- `objects/utilities/`: ユーティリティクラス。`u-` を使う。

## FLOCSS ルール

- 新規スタイルはまず Project に定義する。同じパターンが複数回出た場合だけ Component に切り出す。
- header / footer のスタイルは Layout ではなく Project に定義する。Component から再利用できる状態を保つため。
- Layout から Component のスタイルを上書きしない。
- `.c-dialog .c-button` や `.p-articles .p-comments` のような同一レイヤー内カスケーディングは避ける。
- バリエーションは `.c-button.-large` のように modifier で表現する。
- 同一レイヤー内カスケーディングは、密な依存を持たない余白や配置の微調整に限り許容する。

## 命名

- クラス名は予測可能で簡潔にする。
- `prefix-block_element-name -modifier` の形式に従う。例: `p-block_sample-btn -modifier`。
