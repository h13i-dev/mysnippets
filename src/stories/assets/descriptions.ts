export const imageDescription = `### loading属性について
デフォルトでは画像に\`loading="lazy"\`属性が付与されます。ページ読み込み直後に表示されるメディア（ファーストビュー内の画像）には\`loading="eager"\`を明示的に指定してください。

### width・height属性について
\`width\`と\`height\`属性は、レイアウトシフト（CLS）を防止するために必須です。これらの属性には**画像ファイルの固有のサイズ**を指定してください。表示サイズの調整は、CSSやヘルパークラスを使用して行ってください。
また、パフォーマンス向上のため、画像ファイルは表示サイズに応じて事前にリサイズ（縮小）することを推奨します。

#### 参考（[MDN - img要素](https://developer.mozilla.org/ja/docs/Web/HTML/Element/img)より）
- \`width\`: 画像固有の幅をピクセル単位で指定します（単位なしの整数）
- \`height\`: 画像固有の高さをピクセル単位で指定します（単位なしの整数）`;

export const listMarkerDescription =
  'リストマーカーのインデントは、`u-pl-1em`〜`u-pl-5em`（0.5em刻み）のヘルパークラスで調整できます。';

export const tableWidthDescription =
  'テーブルの幅は、`u-w-5em`～`u-w-10em`（1em刻み）のヘルパークラスで調整できます。';

export const GridSystemDescription =
  'グリッドシステムを使用して複数カラムレイアウトを作成することができます。';

export function helperClassDescription(helperClass: string, possible: string): string {
  return `ヘルパークラス\`${helperClass}\`を使用することで、${possible}することが可能です。`;
}
