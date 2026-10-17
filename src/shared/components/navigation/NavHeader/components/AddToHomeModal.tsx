import React from 'react';

import { cn } from '@/lib/utils';
import Icon from '@/shared/components/Icon';
import Modal, { ModalContent, ModalTitle } from '@/shared/components/Modal';
import useMobileDevice from '@/shared/hooks/useMobileDevice';

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
            <Icon
              name="share"
              className="inline text-theme-500 align-text-bottom"
            />
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
          <Icon
            name="ellipsis-vertical"
            className="inline text-theme-500 align-text-bottom"
          />
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
          className={cn(
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
