import type { BaseProps } from '@src/types/base.ts';
import { clsx } from 'clsx';
import React from 'react';

interface ImageLayoutRootProps extends BaseProps {
  config?: string;
  children: React.ReactElement<typeof ImageLayoutImage | typeof ImageLayoutContents>[];
}
const ImageLayoutRoot = ({ config, as, className, children, ...rest }: ImageLayoutRootProps) => {
  const Tag = as || 'div';
  return (
    <Tag className={clsx('c-img-layout', className)} data-config={config} {...rest}>
      {children}
    </Tag>
  );
};

interface ImageLayoutImageProps extends BaseProps {
  src: string;
  width: string;
  height: string;
  alt?: string;
  loading?: 'eager' | 'lazy';
}
const ImageLayoutImage = ({
  src,
  width,
  height,
  alt = '',
  loading = 'lazy',
  as,
  className,
  children,
  ...rest
}: ImageLayoutImageProps) => {
  const Tag = as || 'figure';
  return (
    <Tag className={clsx('c-img-layout_figure', className)} {...rest}>
      <img src={src} alt={alt} width={width} height={height} loading={loading} />
      {children && (
        <figcaption className="c-img-layout_caption p-img-layout_caption">{children}</figcaption>
      )}
    </Tag>
  );
};

const ImageLayoutContents = ({ as, className, children, ...rest }: BaseProps) => {
  const Tag = as || 'div';
  return (
    <Tag className={clsx('c-img-layout_contents', className)} {...rest}>
      {children}
    </Tag>
  );
};

const ImageLayout = Object.assign(ImageLayoutRoot, {
  Image: ImageLayoutImage,
  Contents: ImageLayoutContents,
});

export default ImageLayout;
