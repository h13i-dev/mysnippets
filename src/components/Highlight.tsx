import type { BaseProps } from '@src/types/base';
import clsx from 'clsx';

export interface HighlightProps extends Omit<BaseProps, 'as'> {
  as?: 'mark' | 'em' | 'strong';
}

const Highlight = ({ className, as, children, ...rest }: HighlightProps) => {
  const Tag = as || 'mark';
  const isDanger = as === 'strong';
  return (
    <Tag
      className={clsx('u-font-bold', 'u-not-italic', isDanger && 'u-text-danger', className)}
      {...rest}
    >
      {children}
    </Tag>
  );
};

export default Highlight;
