import classnames from 'classnames';
import React from 'react';

import Modal, {
  ModalContent,
  ModalTitle,
} from '../../../../../screens/smu/components/modal/shared/Modal';
import useMobileDevice from '../../../../hooks/useMobileDevice';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const AddToHomeModal: React.FC<Props> = function (props) {
  const { isOpen, onClose } = props;
  const { mobileOS } = useMobileDevice();

  const contents = React.useMemo(() => {
    if (mobileOS === 'ios') {
      return (
        <ol className="list-decimal leading-8 px-4">
          <li>
            Tap{' '}
            <span className="material-symbols-rounded text-sky-500 dark:text-sky-500 align-text-bottom">
              {'ios_share'}
            </span>
            .
          </li>
          <li>{'Select "Add to Home Screen"'}</li>
        </ol>
      );
    }

    return (
      <ol className="list-decimal leading-8 px-4">
        <li>
          Tap on <b>More Options</b>
          <span className="material-symbols-rounded text-sky-500 dark:text-sky-500 align-text-bottom">
            {'more_vert'}
          </span>
          .
        </li>
        <li>{'Select "Add to Home Screen"'}</li>
      </ol>
    );
  }, [mobileOS]);

  return (
    <Modal open={isOpen} onOpenChange={onClose}>
      <ModalContent>
        <div
          className={classnames(
            'px-6 py-4 leading-6 font-normal',
            'text-gray-700 dark:text-gray-200'
          )}
        >
          <ModalTitle>Add Classmaid to your Home Screen</ModalTitle>
          {contents}
        </div>
      </ModalContent>
    </Modal>
  );
};

export default AddToHomeModal;
