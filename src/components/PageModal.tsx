import type { BaseProps } from '@src/types/base';
import clsx from 'clsx';

interface PageModalDialogProps extends BaseProps {
  modalId: string;
  closeButtonClassName?: string;
}

interface PageModalOpenBtnProps extends BaseProps {
  modalId: string;
}

const PageModal = {
  Dialog: ({
    modalId,
    closeButtonClassName,
    className,
    children,
    ...rest
  }: PageModalDialogProps) => (
    <dialog id={modalId} className={clsx('c-modal', 'p-modal-page', className)} {...rest}>
      <div className="c-modal_contents">
        {children}
        <button
          type="button"
          className={clsx('c-modal_close-btn', closeButtonClassName)}
          aria-label="モーダルを閉じる"
        >
          <span className="icon_close"></span>
        </button>
      </div>
    </dialog>
  ),
  OpenBtn: ({ modalId, className, children, ...rest }: PageModalOpenBtnProps) => (
    <button type="button" className={className} data-dialog={modalId} {...rest}>
      {children}
    </button>
  ),
};

export default PageModal;
