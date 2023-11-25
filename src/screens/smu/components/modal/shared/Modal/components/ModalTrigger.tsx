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
    return React.cloneElement(
      children,
      context.getReferenceProps({
        ref,
        ...props,
        ...children.props,
        'data-state': context.open ? 'open' : 'closed',
      })
    );
  }

  return (
    <button
      ref={ref}
      // The user can style the trigger based on the state
      data-state={context.open ? 'open' : 'closed'}
      {...context.getReferenceProps(props)}
    >
      {children}
    </button>
  );
});

ModalTrigger.displayName = 'ModalTrigger';
export default ModalTrigger;
