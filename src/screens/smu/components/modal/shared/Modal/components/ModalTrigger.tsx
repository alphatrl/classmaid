import { useMergeRefs } from '@floating-ui/react';
import React from 'react';

import { useModalContext } from '../hooks/useModalContext';

interface Props {
  asChild?: boolean;
}

const ModalTrigger = React.forwardRef<
  HTMLElement,
  React.HTMLProps<HTMLElement> & React.PropsWithChildren<Props>
>((props, propRef) => {
  const { asChild = false, children } = props;

  const context = useModalContext();
  const childrenRef = (children as any).ref;
  const ref = useMergeRefs([context.refs.setReference, propRef, childrenRef]);

  // `asChild` allows the user to pass any element as the anchor
  if (asChild && React.isValidElement(children)) {
    const mergedProps = context.getReferenceProps({
      ...props,
      ...children.props,
      'data-state': context.open ? 'open' : 'closed',
    });
    // eslint-disable-next-line react-hooks/refs
    return React.cloneElement(children, { ...mergedProps, ref });
  }

  const buttonProps = context.getReferenceProps({
    ...props,
    ...({ 'data-state': context.open ? 'open' : 'closed' } as Record<string, string>),
  });

  return (
    <button
      ref={ref}
      // The user can style the trigger based on the state
      {...buttonProps}
    >
      {children}
    </button>
  );
});

ModalTrigger.displayName = 'ModalTrigger';
export default ModalTrigger;
