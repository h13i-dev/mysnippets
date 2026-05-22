import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

// Storybook の storyContext の型定義
type StoryContext = {
  originalStoryFn: (args: unknown) => React.ReactElement;
  args: unknown;
  component?: React.ComponentType<unknown>;
  title?: string;
  name?: string;
};

const formatStoryLabel = (storyContext: StoryContext): string => {
  const parts = [storyContext.title, storyContext.name].filter(Boolean);
  return parts.length > 0 ? `[${parts.join(' / ')}]` : '[unknown story]';
};

/**
 * 対応する終了タグの位置を探す
 */
const findClosingTag = (html: string, startIndex: number, tagName: string): number => {
  let depth = 1;
  let i = startIndex;
  const openTag = `<${tagName}`;
  const closeTag = `</${tagName}>`;

  while (i < html.length && depth > 0) {
    if (
      html.substring(i, i + openTag.length) === openTag &&
      html[i + openTag.length].match(/[\s>]/)
    ) {
      depth++;
      i += openTag.length;
    } else if (html.substring(i, i + closeTag.length) === closeTag) {
      depth--;
      if (depth === 0) {
        return i;
      }
      i += closeTag.length;
    } else {
      i++;
    }
  }

  return -1;
};

const VOID_ELEMENTS = new Set([
  'img',
  'br',
  'hr',
  'input',
  'meta',
  'link',
  'area',
  'base',
  'col',
  'embed',
  'param',
  'source',
  'track',
  'wbr',
]);

/**
 * HTMLを整形する
 * - 空の要素: <span></span> → 1行
 * - テキストのみの要素: <p>テキスト</p> → 1行
 * - 子要素を含む要素: 改行してインデント
 */
const formatHtml = (html: string, baseIndent = 0): string => {
  const result: string[] = [];
  let i = 0;

  const addLine = (content: string, indentLevel: number) => {
    result.push('  '.repeat(indentLevel) + content);
  };

  const appendFormattedContent = (content: string, indentLevel: number) => {
    formatHtml(content, indentLevel)
      .split('\n')
      .filter((line) => line.trim())
      .forEach((line) => result.push(line));
  };

  while (i < html.length) {
    if (html[i] !== '<' || html[i + 1] === '/') {
      i++;
      continue;
    }

    const tagEnd = html.indexOf('>', i);
    const fullTag = html.substring(i, tagEnd + 1);
    const tagNameMatch = fullTag.match(/^<([a-zA-Z0-9-]+)/);

    if (!tagNameMatch) {
      i = tagEnd + 1;
      continue;
    }

    const tagName = tagNameMatch[1];

    // void要素
    if (VOID_ELEMENTS.has(tagName)) {
      addLine(fullTag, baseIndent);
      i = tagEnd + 1;
      continue;
    }

    const closingTag = `</${tagName}>`;
    const closingTagIndex = findClosingTag(html, tagEnd + 1, tagName);

    if (closingTagIndex === -1) {
      addLine(fullTag, baseIndent);
      i = tagEnd + 1;
      continue;
    }

    const content = html.substring(tagEnd + 1, closingTagIndex);
    const hasChildElements = /<[a-zA-Z]/.test(content);

    if (!hasChildElements) {
      // 空またはテキストのみ
      addLine(fullTag + content + closingTag, baseIndent);
    } else {
      // 子要素がある場合
      const leadingText = content.match(/^([^<]+)/)?.[1] || '';
      const trailingText = content.match(/([^>]+)$/)?.[1] || '';
      const hasLeading = leadingText.trim().length > 0;
      const hasTrailing = trailingText.trim().length > 0;

      // 開始タグ（+ 先頭テキスト）
      addLine(fullTag + (hasLeading ? leadingText : ''), baseIndent);

      // 中間コンテンツ（子要素）
      const middleStart = hasLeading ? leadingText.length : 0;
      const middleEnd = content.length - (hasTrailing ? trailingText.length : 0);
      const middleContent = content.substring(middleStart, middleEnd);
      if (middleContent.trim()) {
        appendFormattedContent(middleContent, baseIndent + 1);
      }

      // 終了タグ（+ 末尾テキスト）
      addLine((hasTrailing ? trailingText : '') + closingTag, baseIndent);
    }

    i = closingTagIndex + closingTag.length;
  }

  return result.join('\n');
};

/**
 * JSXをHTMLに変換し、整形する
 */
export const jsxToHtml = (element: React.ReactElement): string => {
  let html = renderToStaticMarkup(element).replace(/\s*\/>/g, '>');

  // キャメルケース属性を小文字に変換
  html = html.replace(/\s([a-zA-Z][a-zA-Z0-9]*)=/g, (_match: string, attrName: string) => {
    return ` ${attrName.toLowerCase()}=`;
  });

  // Boolean属性の変換（itemScope="" → itemscope）
  html = html.replace(/\sitemscope=""/g, ' itemscope');

  return formatHtml(html);
};

/**
 * コンポーネントからHTMLを生成
 */
const renderComponentToHtml = (
  component: React.ComponentType<unknown>,
  args: unknown,
): string | null => {
  try {
    const element = React.createElement(component, args as React.Attributes);
    return jsxToHtml(element);
  } catch {
    return null;
  }
};

/**
 * Storybook の source.transform 用の変換関数を生成
 */
export const createHtmlTransform = () => {
  return (code: string, storyContext: StoryContext): string => {
    // render 関数からの変換を試みる
    try {
      const story = storyContext.originalStoryFn(storyContext.args);
      if (React.isValidElement(story)) {
        return jsxToHtml(story);
      }
    } catch (error) {
      console.warn(
        `[htmlTransform] ${formatStoryLabel(storyContext)} render 関数の評価に失敗しました:`,
        error,
      );
    }

    // component + args からの変換を試みる
    if (storyContext.component) {
      const html = renderComponentToHtml(storyContext.component, storyContext.args);
      if (html) return html;
    }

    console.warn(
      `[htmlTransform] ${formatStoryLabel(storyContext)} HTML変換に失敗しました。元のコードを返します。`,
    );
    return code;
  };
};

/**
 * render のコードからコンポーネント部分のみを抽出する transform 関数
 *
 * 既知の制約:
 * - 正規表現ベースのため、以下のケースでは抽出が不完全になる可能性がある
 *   - render の引数に複雑な分割代入（ネストした関数呼び出し）が含まれる
 *   - JSX 内の文字列リテラルに `<` や `>` を含む
 *   - render 内に複数の return 文がある
 *   - コメント内に `<` や JSX 風の記述がある
 * - 抽出に失敗した場合は元のコード全体を返す（フォールバック）
 */
const extractComponentFromRender = (code: string): string => {
  // render: から始まるセクションを抽出（decorators などを除外）
  const renderMatch = code.match(/render\s*:\s*\([^)]*\)\s*=>\s*([\s\S]*?)(?:,\s*\}|$)/);
  let extractedCode = code;
  if (renderMatch && renderMatch[1]) {
    extractedCode = renderMatch[1].trim();
  }

  // JSXコンポーネント部分を抽出（<Component>...</Component> または <p>...</p> など）
  // 最初の < から対応する終了タグまでを抽出
  const jsxStart = extractedCode.indexOf('<');
  if (jsxStart === -1) return code;

  // 開始タグ名を取得（大文字のReactコンポーネントと小文字のHTML要素の両方に対応）
  const tagNameMatch = extractedCode.substring(jsxStart).match(/^<([a-zA-Z][a-zA-Z0-9.]*)/);
  if (!tagNameMatch) return code;

  const tagName = tagNameMatch[1];
  const closingTag = `</${tagName}>`;
  const closingTagIndex = findClosingTag(extractedCode, jsxStart + tagName.length + 1, tagName);

  if (closingTagIndex !== -1) {
    return extractedCode.substring(jsxStart, closingTagIndex + closingTag.length);
  }

  // 自己終了タグの場合
  const selfClosingMatch = extractedCode
    .substring(jsxStart)
    .match(new RegExp(`<${tagName}[^>]*/>`));
  if (selfClosingMatch) {
    return selfClosingMatch[0];
  }

  return code;
};

type HtmlSourceMode = 'dynamic' | 'static' | 'html';

/**
 * Storybook の source 設定を生成する
 *
 * | mode               | 表示内容             | args 連動 |
 * | ------------------ | -------------------- | --------- |
 * | 'dynamic' (default)| JSX                  | ○         |
 * | 'static'           | render に書いた JSX  | ×         |
 * | 'html'             | HTML                 | ○         |
 *
 * 注: `'static'` は `render` のコードを抽出する仕組みなので、`render` を使うストーリーでのみ機能する。
 *
 * @example
 * // デフォルト（args 連動の JSX）。明示的に書くなら 'dynamic' でも可
 * parameters: { docs: { source: createHtmlSource() } }
 *
 * @example
 * // render に書いた JSX を静的に表示（Compound Components 等）
 * parameters: { docs: { source: createHtmlSource('static') } }
 *
 * @example
 * // HTML を表示
 * parameters: { docs: { source: createHtmlSource('html') } }
 */
export const createHtmlSource = (mode: HtmlSourceMode = 'dynamic') => {
  if (mode === 'html') {
    return { language: 'html' as const, transform: createHtmlTransform() };
  }

  if (mode === 'static') {
    return {
      type: 'code' as const,
      transform: extractComponentFromRender,
    };
  }

  return { type: 'dynamic' as const };
};
