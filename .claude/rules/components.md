---
paths:
  - "**/*.astro"
  - "**/*.ts"
  - "**/*.tsx"
---

# Component Rules

## Astro vs React の使い分け

**基本方針: UI パーツは React（`.tsx`）で作る。Storybook との親和性を優先する。**

**Astro コンポーネント（`.astro`）を使う場合:**
- ページ（`src/pages/`）
- ページレイアウト（`src/layouts/`）

**React コンポーネント（`.tsx`）を使う場合:**
- 上記以外のすべての UI パーツ
- Storybook で Story を書くコンポーネント

## Props 型の定義

```typescript
// Astro コンポーネント
interface Props {
  title: string;
  description?: string;
}
const { title, description } = Astro.props;

// React コンポーネント
export interface ButtonProps {
  label: string;
  onClick: () => void;
}
```

## クライアントハイドレーション

`.astro` 内で React コンポーネントをブラウザで動かす場合は `client:` ディレクティブを明示する。

```astro
<MyComponent client:load />    <!-- 即時ハイドレーション -->
<MyComponent client:idle />    <!-- アイドル時 -->
<MyComponent client:visible /> <!-- ビューポート進入時 -->
```

## TypeScript

`tsconfig.json` は `strict: true` + `noUnusedLocals` + `noUnusedParameters` が有効。グローバル CLAUDE.md の規約（`any` 禁止、型推論の活用、`interface` vs `type`）も適用される。
