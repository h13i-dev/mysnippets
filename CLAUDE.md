# CLAUDE.md

このリポジトリで Claude Code が作業する際のガイダンスです。

## 技術スタック

| | |
|---|---|
| フレームワーク | Astro 5 |
| UI | React 19 + TypeScript（strict） |
| スタイル | SCSS（FLOCSS）+ Tailwind CSS 3 |
| テスト | Vitest 4 / Playwright 1.57 |
| ドキュメント | Storybook 10 |
| リント | ESLint（Flat Config）/ Stylelint / Biome |
| フォーマット | Prettier + prettier-plugin-astro |

## プロジェクト構造

```
src/
├── assets/
│   ├── images/     # 画像
│   ├── js/         # ブラウザ実行用 JS（TypeScript 不可）
│   └── sass/       # SCSS（FLOCSS 設計）
│       ├── foundations/
│       ├── layouts/
│       ├── objects/
│       └── master.scss
├── components/     # React / Astro コンポーネント
│   ├── bases/      # Header, Footer 等の共通コンポーネント
│   └── mdx/        # MDX 内で使用するコンポーネント
├── content/        # Astro Content Collections（Markdown/MDX）
├── data/           # データファイル（JSON等）
├── layouts/        # Astro レイアウト
├── pages/          # ファイルベースルーティング
├── stories/        # Storybook ストーリー
├── types/          # 型定義
└── utils/          # フロント側ユーティリティ
note/               # 設計ドキュメント（CSS設計.mdx 等）
utils/              # Node.js ユーティリティ（ビルド時実行）
```

## 開発コマンド

パッケージマネージャーは **pnpm** を使用。

```bash
pnpm install          # 初回セットアップ
npm run dev           # 開発サーバー起動（ポート 4321、ブラウザ自動起動）
npm run build         # 本番ビルド
npm run preview       # ビルド結果をローカルプレビュー
npm run lint          # ESLint 実行
```

### テスト

```bash
npm run test:unit        # ユニットテスト（Vitest）
npm run test:unit:watch  # ユニットテスト監視モード
npm run vrt              # Visual Regression Test
npm run vrt:update       # VRT スナップショット更新
npm run e2e              # E2E テスト（Playwright）
npm run e2e:ui           # E2E テスト UI モード
npm run axe              # アクセシビリティテスト（axe-core）
npm run nu               # HTML バリデーション
```

### Storybook

```bash
npm run storybook        # 開発サーバー（ポート 6006）
npm run build-storybook  # ビルド（出力先: dist/_styleguide）
npm run build:all        # ビルド + Storybook ビルド
```

## パスエイリアス

```typescript
@src/*        → src/*
@assets/*     → src/assets/*
@layouts/*    → src/layouts/*
@components/* → src/components/*
@pages/*      → src/pages/*
@data/*       → src/data/*
@stories/*    → src/stories/*
@utils/*      → utils/*
```
