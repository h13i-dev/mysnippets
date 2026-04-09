import type { BaseProps } from '@src/types/base';
import clsx from 'clsx';

interface GridRootProps extends BaseProps {
  config?: string;
  subgrid?: string;
}

const GridRoot = ({ className, as = 'ul', children, config, subgrid, ...rest }: GridRootProps) => {
  const Tag = as;
  const attrs: Record<string, any> = { ...rest };
  if (config) attrs['data-config'] = config;
  if (subgrid) attrs['data-subgrid'] = subgrid;

  return (
    <Tag className={clsx('c-grid', className)} {...attrs}>
      {children}
    </Tag>
  );
};

interface GridItemProps extends BaseProps {
  span?: string;
}

const GridItem = ({ className, as = 'li', children, span, ...rest }: GridItemProps) => {
  const Tag = as;
  const attrs: Record<string, any> = { ...rest };
  if (span) attrs['data-span'] = span;

  return (
    <Tag className={className} {...attrs}>
      {children}
    </Tag>
  );
};

const Grid = Object.assign(GridRoot, {
  Item: GridItem,
});

export default Grid;
