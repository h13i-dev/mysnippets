import type { BaseProps } from '@src/types/base';
import clsx from 'clsx';
import React from 'react';

const Comment: React.FC<BaseProps> = ({ children, className, ...rest }) => {
  return (
    <div className={clsx('p-comment', className)} {...rest}>
      {children}
    </div>
  );
};

export default Comment;
