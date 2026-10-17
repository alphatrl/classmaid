import React from 'react';

import { Dialog, DialogTrigger } from '@/components/ui/dialog';

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
    <Dialog defaultOpen={initialOpen} open={open} onOpenChange={onOpenChange}>
      {children}
    </Dialog>
  );
};

export default Modal;
export const ModalTrigger = DialogTrigger;
export { default as ModalContent } from './components/ModalContent';
export { default as ModalTitle } from './components/ModalTitle';
