import * as Dialog from '@radix-ui/react-dialog';
import React from 'react';

interface ModalOptions {
  initialOpen?: boolean;
  open?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
}

const Modal: React.FC<React.PropsWithChildren<ModalOptions>> = function (
  props
) {
  const { children, initialOpen = false, open, onOpenChange } = props;

  return (
    <Dialog.Root
      defaultOpen={initialOpen}
      open={open}
      onOpenChange={onOpenChange}
    >
      {children}
    </Dialog.Root>
  );
};

export default Modal;
export const ModalTrigger = Dialog.Trigger;
export { default as ModalContent } from './components/ModalContent';
export { default as ModalTitle } from './components/ModalTitle';
