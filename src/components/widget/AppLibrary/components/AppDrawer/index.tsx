import React from 'react';
import styled from 'styled-components';

import { MOBILE_WIDTH_SIZE_S } from '../../../../../themes/size';

const CustomBackdrop = styled.div`
  position: absolute;

  width: 100vw;
  height: 100vh;
  height: 100dvh;
`;

const DialogWrapper = styled.dialog`
  height: 70%;
  width: 90%;
  border-radius: 16px;
  border-color: none;
  overflow-y: auto;

  @media screen and (max-width: ${MOBILE_WIDTH_SIZE_S}) {
    width: 100%;
    height: 80%;
    position: absolute;
    margin: 0;
    top: unset;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }

  ::backdrop {
    background-color: #00000080;
  }
`;

interface Props {
  apps: App.AppLibrary.LibraryItem[];
}

export interface AppDrawerRef {
  open: () => void;
  close: () => void;
}

const AppLibrary: React.FC<Props> = React.forwardRef<AppDrawerRef, Props>(
  function (props, ref) {
    const { apps } = props;
    const dialogRef = React.useRef<HTMLDialogElement>(null);

    const handleBackdropClick = React.useCallback((event: MouseEvent) => {
      const rect = dialogRef.current?.getBoundingClientRect();

      if (rect == null) {
        return;
      }

      if (
        rect.left > event.clientX ||
        rect.right < event.clientX ||
        rect.top > event.clientY ||
        rect.bottom < event.clientY
      ) {
        dialogRef.current?.close();
      }
    }, []);

    React.useEffect(() => {
      dialogRef.current?.addEventListener('click', handleBackdropClick);

      return () => {
        dialogRef.current?.removeEventListener('click', handleBackdropClick);
      };
    }, [handleBackdropClick]);

    React.useImperativeHandle(
      ref,
      () => {
        return {
          open() {
            dialogRef.current?.showModal();
          },
          close() {
            dialogRef.current?.close();
          },
        };
      },
      []
    );
    return (
      <>
        <CustomBackdrop />
        <DialogWrapper ref={dialogRef}></DialogWrapper>
      </>
    );
  }
);

AppLibrary.displayName = 'AppLibrary';
export default AppLibrary;
