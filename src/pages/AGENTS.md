# AGENTS.md

## ページ

- ページは Astro ファイルで、Astro のファイルベースルーティングに従う。
- ページではルート単位のデータ取得とページ構成を扱い、再利用する UI は `src/components/` に移す。
- `client:` hydration directive は、ブラウザ実行が必要なコンポーネントにだけ付ける。
