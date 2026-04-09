import type { BaseProps } from '@src/types/base';
import clsx from 'clsx';
import React from 'react';

interface DescriptionProps extends BaseProps {
  children:
    | React.ReactElement<typeof DescriptionTerm>
    | React.ReactElement<typeof DescriptionDetails>[];
}
const DescriptionRoot = ({ className, children, ...rest }: DescriptionProps) => {
  return (
    <dl className={clsx('p-description', className)} {...rest}>
      {children}
    </dl>
  );
};

const DescriptionTerm = ({ className, children, ...rest }: BaseProps) => {
  return (
    <dt className={className} {...rest}>
      {children}
    </dt>
  );
};

const DescriptionDetails = ({ className, children, ...rest }: BaseProps) => {
  return (
    <dd className={className} {...rest}>
      {children}
    </dd>
  );
};

interface DescriptionMarkerProps extends BaseProps {
  as?: keyof React.JSX.IntrinsicElements;
  children: string;
}
const DescriptionMarker = ({ className, as, children, ...rest }: DescriptionMarkerProps) => {
  const Tag = as || 'span';

  return (
    <Tag className={clsx('p-description_marker', className)} {...rest}>
      {children}
    </Tag>
  );
};

const Description = Object.assign(DescriptionRoot, {
  Term: DescriptionTerm,
  Details: DescriptionDetails,
  Marker: DescriptionMarker,
});

export default Description;
