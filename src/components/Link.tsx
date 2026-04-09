import type { BaseProps } from '@src/types/base';
import clsx from 'clsx';
import React from 'react';

export interface LinkProps extends BaseProps {
  href: string;
  children: string;
  icon?: 'external' | 'pdf';
}

const Link = ({ href, className, children, icon, ...rest }: LinkProps) => {
  return (
    <a className={clsx('c-link', 'p-link', className)} href={href} {...rest}>
      {children}
      {icon === 'external' && (
        <span role="img" className="icon_external" aria-label="新規タブで開く" />
      )}
      {icon === 'pdf' && <span role="img" className="icon_pdf" aria-label="PDFファイルを開く" />}
    </a>
  );
};

export default Link;
