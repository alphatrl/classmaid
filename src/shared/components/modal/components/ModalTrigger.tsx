import * as Dialog from '@radix-ui/react-dialog';
import React from 'react';

const ModalTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<typeof Dialog.Trigger>
>((props, ref) => {
  return <Dialog.Trigger ref={ref} {...props} />;
});

ModalTrigger.displayName = 'ModalTrigger';
export default ModalTrigger;
