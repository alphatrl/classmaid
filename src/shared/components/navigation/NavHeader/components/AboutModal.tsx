import React from 'react';
import styled from 'styled-components';

import Modal from '../../../../../screens/smu/components/modal/shared/Modal';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const Wrapper = styled.div`
  padding: 0 16px;
  color: ${(props) => props.theme.textColor[10]};
  line-height: 1.5em;

  h3 {
    margin-bottom: 8px;
  }

  ul {
    margin-top: 4px;
  }
`;

const AboutModal: React.FC<Props> = function (props) {
  const { isOpen, onClose } = props;

  return (
    <Modal title="ClassMaid" isOpen={isOpen} onClose={onClose}>
      <Wrapper>
        Providing students a quick one-click bookmarks to commonly used sites in
        schools. <br />
        Designed by students for students This site is non-affiliated with any
        MOE-related institutions.
      </Wrapper>
    </Modal>
  );
};

export default AboutModal;
