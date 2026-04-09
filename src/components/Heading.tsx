import type { BaseProps } from '@src/types/base';
import { clsx } from 'clsx';

export interface HeadingProps extends BaseProps {
  lv: '1' | '2' | '3';
}

// tailwindで使用可能なクラス名を定義
const levelClasses = {
  // "1": "p-contents-title",
  '1': 'p-heading-lv1',
  '2': 'p-heading-lv2',
  '3': 'p-heading-lv3',
} as const;

const Heading = ({ lv, className, as, children, ...rest }: HeadingProps) => {
  const Tag: React.ElementType = as || (`h${Number(lv) + 1}` as React.ElementType);

  return (
    <Tag {...rest} className={clsx(levelClasses[lv], className)}>
      {children}
    </Tag>
  );
};

export default Heading;
