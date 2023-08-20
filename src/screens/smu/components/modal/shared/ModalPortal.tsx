import React from 'react';
import { createPortal } from 'react-dom';

const modalId = 'modal-root';

const ModalPortal: React.FC<React.PropsWithChildren> = function (props) {
  const { children } = props;
  const [wrapperElement, setWrapperElement] = React.useState<Element | null>(
    null
  );

  React.useLayoutEffect(() => {
    let newElement = document.getElementById(modalId);

    if (newElement == null) {
      newElement = document.createElement('div');
      newElement.setAttribute('id', modalId);
      document.body.appendChild(newElement);
    }

    setWrapperElement(newElement);

    return () => {
      if (wrapperElement?.parentNode != null) {
        wrapperElement.parentNode.removeChild(wrapperElement);
        setWrapperElement(null);
      }
    };
  }, [wrapperElement]);

  if (wrapperElement == null) {
    return null;
  }

  return createPortal(children, wrapperElement as Element);
};

export default ModalPortal;
