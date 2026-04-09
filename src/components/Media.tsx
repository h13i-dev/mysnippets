import type { BaseProps } from '@src/types/base';
import clsx from 'clsx';
import React from 'react';

interface IframeMediaProps extends BaseProps {
  src?: never;
  width?: never;
  height?: never;
  alt?: never;
  loading?: never;
  children: React.ReactElement<HTMLIFrameElement>;
}

interface ImageMediaProps extends BaseProps {
  src: string;
  width: string;
  height: string;
  alt?: string;
  loading?: 'eager' | 'lazy';
  children?: string;
}

type MediaProps = IframeMediaProps | ImageMediaProps;
const Media = ({
  src,
  width,
  height,
  alt = '',
  loading = 'lazy',
  as,
  className,
  children,
  ...rest
}: MediaProps) => {
  const hasIframe = React.Children.toArray(children).some(
    (child) => React.isValidElement(child) && child.type === 'iframe',
  );

  if (hasIframe) {
    const Tag = as || 'div';
    return (
      <Tag className={clsx('c-media', className)} {...rest}>
        {children}
      </Tag>
    );
  }

  const Tag = as || 'figure';
  return (
    <Tag className={clsx('c-figure', 'p-figure', className)} {...rest}>
      <img src={src} alt={alt} width={width} height={height} loading={loading} />
      {children && (
        <figcaption className={clsx('c-figure_caption', 'p-figure_caption')}>{children}</figcaption>
      )}
    </Tag>
  );
};

export default Media;
