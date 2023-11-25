import React from 'react';

import useModal, { Options as ModalOptions } from './hooks/useModal';
import { ModalContext } from './hooks/useModalContext';

const Modal: React.FC<React.PropsWithChildren<ModalOptions>> = function (
  props
) {
  const { children, ...options } = props;
  const dialog = useModal(options);

  return (
    <ModalContext.Provider value={dialog}>{children}</ModalContext.Provider>
  );
};

export default Modal;
export { default as ModalContent } from './components/ModalContent';
export { default as ModalTitle } from './components/ModalTitle';
export { default as ModalTrigger } from './components/ModalTrigger';
