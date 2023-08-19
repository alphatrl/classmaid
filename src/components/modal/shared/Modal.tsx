import React from 'react';
import styled from 'styled-components';

import ModalPortal from './ModalPortal';

const OverlayWrapper = styled.div`
  position: absolute;
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
  height: 80%;
  max-height: 800px;
  border-radius: 24px;
  padding: 16px;
  box-sizing: border-box;
  background-color: ${(props) => props.theme.appColor[100]};
`;

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const Modal: React.FC<React.PropsWithChildren<Props>> = function (props) {
  const { isOpen, onClose, children } = props;

  if (!isOpen) {
    return null;
  }

  return (
    <ModalPortal>
      <OverlayWrapper onClick={onClose}>
        <ModalWrapper>{children}</ModalWrapper>
      </OverlayWrapper>
    </ModalPortal>
  );
};

export default Modal;
