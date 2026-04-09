import type { BaseProps } from '@src/types/base';
import clsx from 'clsx';
import { Children, isValidElement } from 'react';

interface QuoteRootProps extends BaseProps {
  as?: 'blockquote' | 'q';
  cite?: string;
}

const QuoteRoot = ({ as, className, children, cite, ...rest }: QuoteRootProps) => {
  // asが指定されていない場合、childrenの内容から自動判定
  const hasReactElements = Children.toArray(children).some((child) => isValidElement(child));
  const Tag = as || (hasReactElements ? 'blockquote' : 'q');
  const citeAttr = Tag === 'q' && cite ? { cite } : {};

  return (
    <Tag className={className} {...citeAttr} {...rest}>
      {children}
    </Tag>
  );
};

const QuoteCite = ({ className, children, ...rest }: BaseProps) => {
  return (
    <cite className={className} {...rest}>
      {children}
    </cite>
  );
};

const Quote = Object.assign(QuoteRoot, {
  Cite: QuoteCite,
});

export default Quote;
