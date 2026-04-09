import type { BaseProps } from '@src/types/base';
import clsx from 'clsx';
import React from 'react';

export interface LinkCardProps extends BaseProps {
  url: string;
  title?: string;
  description?: string;
  image?: string;
  siteName?: string;
  favicon?: string;
  target?: '_blank' | '_self';
}

const LinkCard: React.FC<LinkCardProps> = ({
  url,
  title = '',
  description = '',
  image = '',
  siteName = '',
  favicon = '',
  className,
  target = '_blank',
  ...rest
}) => {
  return (
    <a href={url} className={clsx('p-link-card', className)} target={target} {...rest}>
      <div className="p-link-card_meta">
        <p className="p-link-card_page-title">{title}</p>
        <p className="p-link-card_description u-text-overflow-[2]">{description}</p>

        <div className="p-link-card_info">
          {favicon && (
            <div className="p-link-card_icon">
              <img src={favicon} alt="" width="100" height="100" loading="lazy" />
            </div>
          )}
          <div className="p-link-card_site-info">
            <p className="p-link-card_site-title">{siteName}</p>
            <p className="p-link-card_url">{url}</p>
          </div>
        </div>
      </div>
      {image && (
        <figure className="p-link-card_img">
          <img src={image} alt={`${title}のサムネイル`} width="200" height="105" loading="lazy" />
        </figure>
      )}
      {target === '_blank' && (
        <span role="img" className="icon_external" aria-label="新規タブで開く"></span>
      )}
    </a>
  );
};

export default LinkCard;
