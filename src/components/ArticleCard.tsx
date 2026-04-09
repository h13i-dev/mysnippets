import type { BaseProps } from '@src/types/base';
import clsx from 'clsx';
import React from 'react';

export interface ArticleCardProps extends BaseProps {
  type?: string;
  icon?: string;
  title: string;
  href: string;
  date: string;
  tags?: string[];
  tagLinkBase?: string;
  target?: '_blank' | '_self';
  liked?: number;
}

const ArticleCard: React.FC<ArticleCardProps> = ({
  type,
  icon,
  title,
  href,
  date,
  tags,
  tagLinkBase = '/tags/',
  target,
  liked = 0,
  className,
  ...rest
}) => {
  const formatDate = (dateStr: string) =>
    dateStr?.replace(/[./]/g, '-').replace(/\b(\d)\b/g, '0$1');

  const formattedDate = formatDate(date);

  const classes = clsx('p-article-card', type, className);

  return (
    <div className={classes} {...rest}>
      <div className="p-article-card_title-section">
        {icon && (
          <div className="p-article-card_icon" aria-hidden="true" data-emoji="true">
            {icon}
          </div>
        )}
        <h2
          className="p-article-card_title u-text-overflow-[2]"
          data-emoji="true"
          data-progress="false"
        >
          {title}
        </h2>
      </div>
      <div className="p-article-card_card-bottom">
        {tags && tags.length > 0 && (
          <div className="c-tags">
            {type === 'zenn' ? (
              tags.map((tag: string, index: number) => (
                <span key={index} className="c-tag u-uppercase">
                  {tag}
                </span>
              ))
            ) : (
              <>
                {tags.slice(0, 3).map((tag: string, index: number) => (
                  <a
                    key={index}
                    className="c-tag"
                    href={`${tagLinkBase}${tag.replace(' ', '%20')}/`}
                  >
                    #{tag}
                  </a>
                ))}
                {tags.length > 3 && <span className="c-tag -more">他{tags.length - 3}個</span>}
              </>
            )}
          </div>
        )}
        <time className="p-article-card_date" dateTime={formattedDate}>
          {formattedDate?.replace(/-/g, '.')}
        </time>
        {type === 'zenn' && liked > 0 && (
          <span className="p-article-card_favorite">
            <span className="icon_favorite" data-emoji="true" />
            {liked}
          </span>
        )}
      </div>
      <a className="p-article-card_link" href={href} target={target} aria-label={title}></a>
      {target === '_blank' && (
        <span role="img" className="icon_external" aria-label="新規タブで開く" />
      )}
    </div>
  );
};

export default ArticleCard;
