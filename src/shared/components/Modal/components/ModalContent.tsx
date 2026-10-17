import { Dialog as DialogPrimitive } from 'radix-ui';
import React from 'react';

import { DialogOverlay, DialogPortal } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

const ModalContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>((props, ref) => {
  const { children, className, ...rest } = props;

  return (
    <DialogPortal>
      <DialogOverlay
        className={cn(
          'z-auto bg-black/70 ease-in-out duration-300',
          'data-[state=open]:animate-none! data-[state=closed]:animate-none!'
        )}
      />
      <DialogPrimitive.Content
        ref={ref}
        className={cn(
          'fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
          'bg-white dark:bg-gray-900 shadow-2xl',
          'w-4/5 max-w-3xl max-h-[80vh]',
          'rounded-3xl overflow-hidden',
          'max-md:w-full max-md:h-[85%] max-md:max-h-none',
          'max-md:translate-y-0 max-md:top-auto max-md:bottom-0',
          'max-md:rounded-b-none',
          className
        )}
        {...rest}
      >
        <div className="max-h-[inherit] overflow-y-auto overscroll-contain">
          {children}
        </div>
      </DialogPrimitive.Content>
    </DialogPortal>
  );
});

ModalContent.displayName = 'ModalContent';
export default ModalContent;
