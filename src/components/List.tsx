import type { BaseProps } from '@src/types/base';
import clsx from 'clsx';
import React from 'react';

const ListRoot = ({ className, as = 'ul', children, ...rest }: BaseProps) => {
  const shouldUseOl = className && (className.includes('-number') || className.includes('-paren'));
  const Tag = shouldUseOl ? 'ol' : as;

  return (
    <Tag className={clsx('p-list', className)} {...rest}>
      {children}
    </Tag>
  );
};

const ListItem = ({ className, as = 'li', children, ...rest }: BaseProps) => {
  const Tag = as;

  return (
    <Tag className={className} {...rest}>
      {children}
    </Tag>
  );
};

const ListMarker = ({ className, as = 'span', children, ...rest }: BaseProps) => {
  const Tag = as;

  return (
    <Tag className={clsx('p-list_marker', className)} {...rest}>
      {children}
    </Tag>
  );
};

const List = Object.assign(ListRoot, {
  Item: ListItem,
  Marker: ListMarker,
});
export default List;
