import React from 'react';

import useModal from './useModal';

type ContextType = ReturnType<typeof useModal> | null;

export const ModalContext = React.createContext<ContextType>(null);

export const useModalContext = function () {
  const context = React.useContext(ModalContext);

  if (context == null) {
    throw new Error('Modal components must be wrapped in <Modal />');
  }

  return context;
};
