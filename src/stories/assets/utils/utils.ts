/** Storybookのプレビューエリアを視覚的に隠すスタイル（sr-only相当） */
export const sbdocsPreviewHiddenCss = `
  .sbdocs-preview.css-1esgs33,
  .sbdocs-preview-actions.css-ct7rbi {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  }
`;
