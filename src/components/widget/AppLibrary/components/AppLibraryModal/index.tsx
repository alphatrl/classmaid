import React from 'react';
import styled from 'styled-components';

import Modal from '../../../../modal/shared/Modal';
import Section from './components/Section';

const Wrapper = styled.div`
  height: calc(100% - 56px);
  overflow-y: scroll;
  padding: 0 16px;
`;

interface Props {
  apps: App.AppLibrary.LibraryItem[];
  isOpen: boolean;
  onClose: () => void;
}

const AppLibraryModal: React.FC<Props> = function (props) {
  const { apps, ...modalProps } = props;

  return (
    <Modal title="App Library" {...modalProps}>
      <Wrapper>
        {apps.map((library) => {
          return <Section key={library.uid} library={library} />;
        })}
      </Wrapper>
    </Modal>
  );
};

export default AppLibraryModal;
