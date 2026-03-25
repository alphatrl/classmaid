import classnames from 'classnames';
import React from 'react';

import Icon from '../../../../../../../shared/components/Icon';

interface Props {
  onClose: () => void;
}

const CloseButton: React.FC<Props> = function (props) {
  const { onClose } = props;

  return (
    <button
      onClick={onClose}
      className={classnames(
        'w-10 h-10 border-0 bg-transparent cursor-pointer',
        'flex items-center justify-center rounded-3xl',
        'hover:bg-gray-200 dark:hover:bg-gray-700'
      )}
    >
      <Icon
        name="cancel"
        size={32}
        className="text-gray-500 dark:text-gray-400"
      />
    </button>
  );
};

export default CloseButton;
