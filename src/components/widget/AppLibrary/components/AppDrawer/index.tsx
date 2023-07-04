import React from 'react';
import styled from 'styled-components';

const DialogWrapper = styled.dialog``;

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
    return <DialogWrapper ref={dialogRef}></DialogWrapper>;
  }
);

AppLibrary.displayName = 'AppLibrary';
export default AppLibrary;
