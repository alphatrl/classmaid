import React from 'react';

import { DialogClose, DialogTitle } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import Icon from '@/shared/components/Icon';

const ModalTitle: React.FC<React.ComponentProps<typeof DialogTitle>> =
  function ModalTitle({ children, ...props }) {
    return (
      <div
        className={cn(
          'min-h-12 py-1 flex flex-row items-center',
          children != null ? 'justify-between' : 'justify-end'
        )}
      >
        <DialogTitle
          className="text-2xl font-bold m-0 capitalize text-gray-700 dark:text-gray-200"
          {...props}
        >
          {children}
        </DialogTitle>
        <DialogClose
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
        </DialogClose>
      </div>
    );
  };
export default ModalTitle;
