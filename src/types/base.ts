import React from 'react';

export interface BaseProps {
  as?: React.ElementType;
  className?: string;
  children?: React.ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}
