import type { BaseProps } from '@src/types/base';
import clsx from 'clsx';
import type { ReactNode } from 'react';

export interface CardProps extends BaseProps {
  /** hrefの指定 */
  href?: string;
}
const Card = ({ href, className, children, ...rest }: CardProps) => {
  const Tag = href ? 'a' : 'div';
  const props = href ? { href, ...rest } : rest;

  return (
    <li className="u-contents">
      <Tag className={clsx('c-card', 'p-card', className)} {...props}>
        {children}
      </Tag>
    </li>
  );
};

export interface CardFigureProps extends BaseProps {
  /** 画像パス */
  src: string;
  /** 画像の幅 */
  width: string;
  /** 画像の高さ */
  height: string;
  /** 画像の代替テキスト */
  alt?: string;
  /** 画像の読み込み方法 */
  loading?: 'eager' | 'lazy';
}

const CardFigure = ({
  src,
  width,
  height,
  loading = 'lazy',
  className,
  ...rest
}: CardFigureProps) => {
  return (
    <div className={clsx('c-card_figure', className)} {...rest}>
      <img src={src} alt="" width={width} height={height} loading={loading} />
    </div>
  );
};

const CardBody = ({ className, children, ...rest }: BaseProps) => {
  return (
    <div className={clsx('c-card_body', className)} {...rest}>
      {children}
    </div>
  );
};

Card.Figure = CardFigure;
Card.Body = CardBody;

export default Card;
