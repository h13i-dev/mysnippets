import type { BaseProps } from '@src/types/base';
import clsx from 'clsx';

interface ContentsModalDialogProps extends BaseProps {
  modalId: string;
  closeButtonClassName?: string;
}

interface ContentsModalOpenBtnProps extends BaseProps {
  modalId: string;
}

const ContentsModal = {
  Dialog: ({
    modalId,
    closeButtonClassName,
    className,
    children,
    ...rest
  }: ContentsModalDialogProps) => (
    <dialog id={modalId} className={clsx('c-modal', 'p-modal-contents', className)} {...rest}>
      <div className="c-modal_contents">{children}</div>
      <button
        type="button"
        className={clsx('c-modal_close-btn', closeButtonClassName)}
        aria-label="モーダルを閉じる"
      >
        <span className="icon_close"></span>
      </button>
    </dialog>
  ),
  OpenBtn: ({ modalId, className, children, ...rest }: ContentsModalOpenBtnProps) => (
    <button type="button" className={className} data-dialog={modalId} {...rest}>
      {children}
    </button>
  ),
};

export default ContentsModal;
