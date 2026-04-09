import type { BaseProps } from '@src/types/base';
import clsx from 'clsx';
import React from 'react';

interface PopoverDialogProps extends BaseProps {
  popoverId: string;
  popoverType?: 'auto' | 'manual';
}

interface PopoverBtnProps extends BaseProps {
  popoverId: string;
}

const Popover = {
  Dialog: ({
    popoverId,
    popoverType = 'auto',
    className,
    children,
    ...rest
  }: PopoverDialogProps) => (
    <div id={popoverId} popover={popoverType} className={clsx('c-popover', className)} {...rest}>
      <div className="c-popover_contents">{children}</div>
      <button
        type="button"
        className="c-popover_close-btn"
        popoverTarget={popoverId}
        popoverTargetAction="hide"
        aria-label="ポップオーバーを閉じる"
      >
        &times;
      </button>
    </div>
  ),
  OpenBtn: ({ popoverId, className, children, ...rest }: PopoverBtnProps) => (
    <button type="button" className={className} popoverTarget={popoverId} {...rest}>
      {children}
    </button>
  ),
};

export default Popover;
