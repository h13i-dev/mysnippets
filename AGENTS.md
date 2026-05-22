# AGENTS.md

## リポジトリ

- フレームワークは Astro 5。
- UI は React 19 + TypeScript strict mode。
- スタイルは SCSS の FLOCSS 設計を基本とし、Tailwind CSS 3 はユーティリティ用途に限る。
- テストは Vitest と Playwright。
- UI ドキュメントは Storybook。
- lint / format は ESLint flat config、Stylelint、Biome、Prettier、prettier-plugin-astro。
- パッケージマネージャーは pnpm。別のパッケージマネージャーを追加しない。

## コマンド

- 依存関係のインストールは `pnpm install`。
- 開発サーバー起動は `npm run dev`。
- 本番ビルドは `npm run build`。
- ビルド結果のプレビューは `npm run preview`。
- Storybook 起動は `npm run storybook`。
- Storybook ビルドは `npm run build-storybook`。
- アプリと Storybook の同時ビルドは `npm run build:all`。
- 画像圧縮は `npm run compress`。
- `package.json` に追加されるまでは、`npm run lint`、`npm run test:unit`、`npm run vrt` が存在すると仮定しない。

## テスト

- E2E テストは `npm run e2e`。UI モードは `npm run e2e:ui`。
- アクセシビリティテストは `npm run axe`。
- HTML バリデーションは `npm run nu`。
- ユニットテストは `*.spec.ts` / `*.spec.tsx` を使う。
- インテグレーションテストは `*.test.ts` / `*.test.tsx` を使う。
- unit / VRT 系の script が追加された場合も、このファイルの命名規則とカバレッジ方針を維持する。

## パスエイリアス

- `@src/*` は `src/*` に対応する。
- `@assets/*` は `src/assets/*` に対応する。
- `@layouts/*` は `src/layouts/*` に対応する。
- `@components/*` は `src/components/*` に対応する。
- `@pages/*` は `src/pages/*` に対応する。
- `@data/*` は `src/data/*` に対応する。
- `@stories/*` は `src/stories/*` に対応する。
- `@utils/*` は `utils/*` に対応する。

## プロジェクト構成

- `src/assets/images/`: 画像。
- `src/assets/js/`: ブラウザ実行用スクリプト。
- `src/assets/sass/`: SCSS と FLOCSS 構成。
- `src/components/`: React / Astro コンポーネント。
- `src/components/bases/`: header / footer などの共通ベースコンポーネント。
- `src/components/mdx/`: MDX から使うコンポーネント。
- `src/content/`: Astro content collections。
- `src/data/`: JSON などのデータファイル。
- `src/layouts/`: Astro レイアウト。
- `src/pages/`: ファイルベースルーティング。
- `src/stories/`: Storybook stories。
- `src/types/`: 共通型定義。
- `src/utils/`: フロントエンド用ユーティリティ。
- `note/`: 設計ドキュメント。
- `utils/`: ビルド時に使う Node.js ユーティリティ。

## コミット規約

- Conventional Commits 形式: `type: 説明`
- `feat:` 新機能 / `fix:` バグ修正 / `refactor:` リファクタ / `docs:` ドキュメント / `test:` テスト / `chore:` その他
- 1コミット1変更を原則とする。
