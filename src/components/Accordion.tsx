import type { BaseProps } from '@src/types/base';
import clsx from 'clsx';
import type React from 'react';

const AccordionRoot = ({ className, children, ...rest }: BaseProps) => {
  return (
    <details className={clsx('c-accordion', 'p-accordion', className)} {...rest}>
      {children}
    </details>
  );
};

const AccordionSummary = ({ className, children, ...rest }: BaseProps) => {
  return (
    <summary className={clsx('p-accordion_summary', className)} {...rest}>
      <span className="p-accordion_switch">
        <span></span>
        <span></span>
      </span>
      {children}
    </summary>
  );
};

const AccordionBody = ({ className, children, ...rest }: BaseProps) => {
  return (
    <div className={clsx('c-accordion_body', 'p-accordion_body', className)} {...rest}>
      {children}
    </div>
  );
};

const Accordion = Object.assign(AccordionRoot, {
  Summary: AccordionSummary,
  Body: AccordionBody,
});

export default Accordion;
