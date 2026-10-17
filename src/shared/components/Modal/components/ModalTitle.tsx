import * as Dialog from '@radix-ui/react-dialog';
import React from 'react';

import { cn } from '@/lib/utils';
import Icon from '@/shared/components/Icon';

const ModalTitle = React.forwardRef<
  HTMLHeadingElement,
  React.ComponentPropsWithoutRef<typeof Dialog.Title>
>(function ModalTitle({ children, ...props }, ref) {
  return (
    <div
      className={cn(
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
          className={cn(
            'w-10 h-10 border-0 bg-transparent cursor-pointer',
            'flex items-center justify-center rounded-3xl',
            'hover:bg-gray-200 dark:hover:bg-gray-700'
          )}
        >
          <Icon
            name="circle-x"
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
