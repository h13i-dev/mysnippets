# AGENTS.md

## Astro と React

- 新規 UI パーツは Storybook で扱いやすい React（`.tsx`）を基本にする。
- `src/pages/` のページと `src/layouts/` のレイアウトは Astro（`.astro`）を使う。
- 既存の Astro コンポーネントは、作業上必要がない限り React に置き換えない。
- Astro ファイルから React コンポーネントをブラウザで動かす場合は、`client:load`、`client:idle`、`client:visible` などの `client:` ディレクティブを明示する。

## Props と型

- Astro コンポーネントではローカルの `interface Props` を定義し、`Astro.props` から分割代入する。
- React コンポーネントでは `export interface ButtonProps` のように、名前付きの props interface を export する。
- TypeScript は strict 前提。`any` は避け、明示的なドメイン型または狭く推論できる型を使う。
- `noUnusedLocals` と `noUnusedParameters` を守る。
