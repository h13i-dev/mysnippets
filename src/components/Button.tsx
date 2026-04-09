import type { BaseProps } from '@src/types/base';
import clsx from 'clsx';
import React from 'react';

type IconType = 'external' | 'pdf' | 'arrow-right' | 'arrow-left' | '!external';

export interface ButtonProps extends BaseProps {
  /** リンク */
  href?: string;
  /** アイコン */
  icon?: IconType[];
  /** ラベルタグ（`c-btn_label`）直前にコンテンツを追加 */
  prefix?: React.ReactNode;
  /** ラベルタグ（`c-btn_label`）直後にコンテンツを追加 */
  suffix?: React.ReactNode;
}

const ICON_COMPONENTS = {
  'arrow-left': <span role="img" className="icon_caret-left" />,
  external: <span role="img" className="icon_external" aria-label="新規タブで開く" />,
  pdf: <span role="img" className="icon_pdf" aria-label="PDFファイルを開く" />,
  'arrow-right': <span role="img" className="icon_caret-right" />,
} as const;

function getIconArray(icon: IconType[] = [], hasTargetBlank: boolean): IconType[] {
  const hasExternalDisabled = icon.includes('!external');
  const filteredIcons = icon.filter((i) => i !== '!external');

  const shouldAddExternal =
    hasTargetBlank && !filteredIcons.includes('external') && !hasExternalDisabled;

  return shouldAddExternal ? [...filteredIcons, 'external'] : filteredIcons;
}

function renderIcons(iconArray: IconType[], children: React.ReactNode) {
  return (
    <>
      {iconArray.includes('arrow-left') && ICON_COMPONENTS['arrow-left']}
      {children}
      {iconArray.includes('external') && ICON_COMPONENTS['external']}
      {iconArray.includes('pdf') && ICON_COMPONENTS['pdf']}
      {iconArray.includes('arrow-right') && ICON_COMPONENTS['arrow-right']}
    </>
  );
}

const Button = ({ href, className, icon, children, prefix, suffix, as, ...rest }: ButtonProps) => {
  const Tag = as || (href ? 'a' : 'button');
  const { prefix: _, suffix: __, ...cleanRest } = rest; // prefix, suffixをrestから除外
  const attributes = href
    ? { href: href === '' ? '★★★' : href, ...cleanRest }
    : { type: 'button', ...cleanRest };
  const hasTargetBlank = 'target' in cleanRest && cleanRest.target === '_blank';
  const iconArray = getIconArray(icon, hasTargetBlank);
  return (
    <Tag {...attributes} className={clsx('c-btn', 'p-btn', className)}>
      {prefix}
      <span className="c-btn_label p-btn_label">{renderIcons(iconArray, children)}</span>
      {suffix}
    </Tag>
  );
};

export default Button;
