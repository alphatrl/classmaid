import React from 'react';
import styled from 'styled-components';

import ModalPortal from '../ModalPortal';
import CloseButton from './components/CloseButton';

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
  height: 80%;
  max-height: 800px;
  border-radius: 24px;
  padding: 16px;
  box-sizing: border-box;
  background-color: ${(props) => props.theme.appColor[100]};
`;

const HeaderWrapper = styled.div<{ showTitle: boolean }>`
  height: 48px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: ${(props) =>
    props.showTitle ? 'space-between' : 'flex-end'};

  h1 {
    margin: 0;
    text-transform: capitalize;
  }
`;

interface Props {
  title?: string;
  isOpen: boolean;
  onClose: () => void;
}

const Modal: React.FC<React.PropsWithChildren<Props>> = function (props) {
  const { title, isOpen, onClose, children } = props;

  const handleModalClicked = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <ModalPortal>
      <OverlayWrapper onClick={onClose}>
        <ModalWrapper onClick={handleModalClicked}>
          <HeaderWrapper showTitle={title != null}>
            {title != null && <h1>{title}</h1>}
            <CloseButton onClose={onClose} />
          </HeaderWrapper>
          {children}
        </ModalWrapper>
      </OverlayWrapper>
    </ModalPortal>
  );
};

export default Modal;
