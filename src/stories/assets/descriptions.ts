export const imageDescription = `### loading属性について
デフォルトでは画像に\`loading="lazy"\`属性が付与されます。ページ読み込み直後に表示されるメディア（ファーストビュー内の画像）には\`loading="eager"\`を明示的に指定してください。

### width・height属性について
\`width\`と\`height\`属性は、レイアウトシフト（CLS）を防止するために必須です。これらの属性には**画像ファイルの固有のサイズ**を指定してください。表示サイズの調整は、CSSやヘルパークラスを使用して行ってください。
また、パフォーマンス向上のため、画像ファイルは表示サイズに応じて事前にリサイズ（縮小）することを推奨します。

#### 参考（[MDN - img要素](https://developer.mozilla.org/ja/docs/Web/HTML/Element/img)より）
- \`width\`: 画像固有の幅をピクセル単位で指定します（単位なしの整数）
- \`height\`: 画像固有の高さをピクセル単位で指定します（単位なしの整数）`;

export const listMarkerDescription =
  'リストマーカーのインデントは、`u-pl-1em`〜`u-pl-5em`（0.5em刻み）のヘルパークラスで調整可能。';

export const breakpointPrefixDescription =
  '接頭辞に `sm:` を付与することで、640px以上のスクリーンサイズにのみ適用可能。';

export const tableWidthDescription = `テーブルの幅（col指定）は、\`u-w-5em\`～\`u-w-15em\`（1em刻み）のヘルパークラスで調整可能です。${breakpointPrefixDescription}`;

export const GridSystemDescription =
  'グリッドシステムを使用して複数カラムレイアウトを作成することが可能。';

export function helperClassDescription(helperClass: string, possible: string): string {
  return `ヘルパークラス\`${helperClass}\`を使用することで、${possible}することが可能。`;
}

export const maxWidthDescription = `画像の最大幅を制御したい場合は、\`u-max-w-200px\`〜\`u-max-w-800px\`（50px刻み）のヘルパークラスが利用可能。`;

export const gridDescription = `### グリッドシステムについて

メインコンテンツエリアは12カラム構成で、カラム数を指定することでレイアウトを柔軟に制御できます。

<div class="c-grid u-gap-1" data-config="[6][lg:12]">
  <div class="sg-grid-item u-text-[14px]">1/12</div>
  <div class="sg-grid-item u-text-[14px]">1/12</div>
  <div class="sg-grid-item u-text-[14px]">1/12</div>
  <div class="sg-grid-item u-text-[14px]">1/12</div>
  <div class="sg-grid-item u-text-[14px]">1/12</div>
  <div class="sg-grid-item u-text-[14px]">1/12</div>
  <div class="sg-grid-item u-text-[14px]">1/12</div>
  <div class="sg-grid-item u-text-[14px]">1/12</div>
  <div class="sg-grid-item u-text-[14px]">1/12</div>
  <div class="sg-grid-item u-text-[14px]">1/12</div>
  <div class="sg-grid-item u-text-[14px]">1/12</div>
  <div class="sg-grid-item u-text-[14px]">1/12</div>
</div>

### ブレークポイント

以下のブレークポイントが設定されています。<br>各ブレークポイントごとにカラム数を自由に変更することが可能です。

| 接頭辞 | 適用範囲 |
|---|---|
| \`sm:\` | \`@media (width >= 640px) { ... }\` |
| \`md:\` | \`@media (width >= 768px) { ... }\` |
| \`lg:\` | \`@media (width >= 1024px) { ... }\` |
| \`xl:\` | \`@media (width >= 1280px) { ... }\` |
| \`2xl:\` | \`@media (width >= 1536px) { ... }\` |
`;

export const gridSystemNote = `<a href="/?path=/docs/this-site-グリッドシステム-gridプロパティ--docs">※レイアウトの制御にはGridプロパティのグリッドシステムを使用してください。Gridプロパティで実現できない実装がある場合のみ、Flexboxを使用してください。</a>`;
