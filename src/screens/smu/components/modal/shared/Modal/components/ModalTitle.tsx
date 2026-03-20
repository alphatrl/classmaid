import { useId } from '@floating-ui/react';
import classnames from 'classnames';
import React from 'react';

import Icon from '../../../../../../../shared/components/Icon';
import { useModalContext } from '../hooks/useModalContext';

const ModalHeading = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLProps<HTMLHeadingElement>
>(function DialogHeading({ children, ...props }, ref) {
  const { setLabelId, setOpen } = useModalContext();
  const id = useId();

  const handleClose = () => {
    setOpen(false);
  };

  // Only sets `aria-labelledby` on the Dialog root element
  // if this component is mounted inside it.
  React.useLayoutEffect(() => {
    setLabelId(id);
    return () => setLabelId(undefined);
  }, [id, setLabelId]);

  return (
    <div
      className={classnames(
        'min-h-12 py-1 flex flex-row items-center',
        children != null ? 'justify-between' : 'justify-end'
      )}
    >
      <h2
        className="text-2xl font-bold m-0 capitalize text-gray-700 dark:text-gray-200"
        {...props}
        ref={ref}
        id={id}
      >
        {children}
      </h2>
      <button
        onClick={handleClose}
        className={classnames(
          'w-10 h-10 border-0 bg-transparent cursor-pointer',
          'flex items-center justify-center rounded-3xl',
          'hover:bg-gray-200 dark:hover:bg-gray-700',
          '[&_span]:text-[32px] [&_span]:text-gray-500 [&_span]:dark:text-gray-400'
        )}
      >
        <Icon name="cancel" />
      </button>
    </div>
  );
});

ModalHeading.displayName = 'ModalHeading';
export default ModalHeading;
