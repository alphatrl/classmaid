import React from 'react';

import { Modal as Wrapper } from '../styled';

interface Props extends React.PropsWithChildren {
  title?: string;
}

const ModalTemplate: React.FC<Props> = (props) => {
  const { title, children } = props;

  return (
    <Wrapper>
      {title && <h1>{title}</h1>}
      {children}
    </Wrapper>
  );
};

export default ModalTemplate;
