import * as Dialog from '@radix-ui/react-dialog';
import classnames from 'classnames';
import React from 'react';

import Icon from '../../../../../../../shared/components/Icon';

const ModalTitle = React.forwardRef<
  HTMLHeadingElement,
  React.ComponentPropsWithoutRef<typeof Dialog.Title>
>(function ModalTitle({ children, ...props }, ref) {
  return (
    <div
      className={classnames(
        'min-h-12 py-1 flex flex-row items-center',
        children != null ? 'justify-between' : 'justify-end'
      )}
    >
      <Dialog.Title
        className="text-2xl font-bold m-0 capitalize text-gray-700 dark:text-gray-200"
        {...props}
        ref={ref}
      >
        {children}
      </Dialog.Title>
      <Dialog.Close asChild>
        <button
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
      </Dialog.Close>
    </div>
  );
});

ModalTitle.displayName = 'ModalTitle';
export default ModalTitle;
