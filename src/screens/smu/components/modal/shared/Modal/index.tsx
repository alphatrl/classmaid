import React from 'react';
import styled from 'styled-components';

import useModal, { Options as ModalOptions } from './hooks/useModal';
import { ModalContext } from './hooks/useModalContext';

const HeaderWrapper = styled.div<{ showTitle: boolean }>`
  height: 48px;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 16px;
  justify-content: ${(props) =>
    props.showTitle ? 'space-between' : 'flex-end'};

  h1 {
    font-size: 1.6em;
    margin: 0;
    text-transform: capitalize;
    color: ${(props) => props.theme.textColor[10]};
  }
`;

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
