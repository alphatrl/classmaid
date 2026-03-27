import {
  FloatingFocusManager,
  FloatingOverlay,
  FloatingPortal,
  useMergeRefs,
} from '@floating-ui/react';
import classnames from 'classnames';
import React from 'react';

import { useModalContext } from '../hooks/useModalContext';

const ModalContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLProps<HTMLDivElement>
>((props, propRef) => {
  const { children } = props;
  const { context: floatingContext, ...context } = useModalContext();
  const ref = useMergeRefs([context.refs.setFloating, propRef]);

  if (!floatingContext.open) {
    return null;
  }

  return (
    <FloatingPortal>
      <FloatingOverlay className="bg-black/80 grid place-items-center z-5">
        <FloatingFocusManager context={floatingContext}>
          <div
            ref={ref}
            aria-labelledby={context.labelId}
            aria-describedby={context.descriptionId}
            className={classnames(
              'w-4/5 max-w-200 max-h-[min(90%,800px)]',
              'overflow-y-scroll rounded-3xl box-border',
              'bg-white dark:bg-gray-900',
              'max-md:w-full max-md:h-[85%] max-md:max-h-none',
              'max-md:self-end max-md:rounded-b-none'
            )}
            {...context.getFloatingProps(props)}
          >
            {children}
          </div>
        </FloatingFocusManager>
      </FloatingOverlay>
    </FloatingPortal>
  );
});

ModalContent.displayName = 'ModalContent';
export default ModalContent;
