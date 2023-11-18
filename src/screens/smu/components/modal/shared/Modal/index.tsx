import React from 'react';
import styled from 'styled-components';

import { MOBILE_WIDTH_SIZE_L } from '../../../../../../shared/themes/size';
import ModalPortal from '../ModalPortal';
import CloseButton from './components/CloseButton';
import useModal, { Options as ModalOptions } from './hooks/useModal';
import { ModalContext } from './hooks/useModalContext';

const OverlayWrapper = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  width: 100dvw;
  height: 100%;
  height: 100dvh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #00000087;
`;

const ModalWrapper = styled.div`
  width: 80%;
  max-width: 800px;
  // height: 80%;
  max-height: 800px;
  overflow: hidden;
  padding: 16px 0;
  border-radius: 24px;
  box-sizing: border-box;
  background-color: ${(props) => props.theme.appColor[100]};

  @media screen and (max-width: ${MOBILE_WIDTH_SIZE_L}) {
    width: 100%;
    height: 85%;
    align-self: flex-end;
    border-radius: 24px 24px 0 0;
  }
`;

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
export { default as ModalTrigger } from './components/ModalTrigger';
