import React from 'react';

import Modal from '../../../../modal/shared/Modal';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const AppLibraryModal: React.FC<Props> = function (props) {
  return (
    <Modal title="App Library" {...props}>
      <h1>hi</h1>
    </Modal>
  );
};

export default AppLibraryModal;
