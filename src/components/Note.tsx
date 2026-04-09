import type { BaseProps } from '@src/types/base';
import clsx from 'clsx';
import React from 'react';

interface NoteProps extends BaseProps {
  children: React.ReactElement<typeof NoteItem>[] | string;
}
const NoteRoot = ({ as, className, children, ...rest }: NoteProps) => {
  const isTextOnly = typeof children === 'string';
  const isNumbered = className?.includes('-number');
  const Tag = as || (isTextOnly ? 'p' : isNumbered ? 'ol' : 'ul');
  return (
    <Tag className={clsx('p-note', className)} {...rest}>
      {children}
    </Tag>
  );
};

const NoteItem = ({ as, className, children, ...rest }: BaseProps) => {
  const Tag = as || 'li';
  return (
    <Tag className={className} {...rest}>
      {children}
    </Tag>
  );
};

const NoteMarker = ({ as, className, children, ...rest }: BaseProps) => {
  const Tag = as || 'span';
  return (
    <Tag className={clsx('p-note_type', className)} {...rest}>
      {children}
    </Tag>
  );
};

const Note = Object.assign(NoteRoot, {
  Item: NoteItem,
  Marker: NoteMarker,
});

export default Note;
