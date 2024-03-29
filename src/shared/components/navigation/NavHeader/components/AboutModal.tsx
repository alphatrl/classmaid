import React from 'react';
import styled from 'styled-components';

import Modal, {
  ModalContent,
  ModalTitle,
} from '../../../../../screens/smu/components/modal/shared/Modal';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const Wrapper = styled.div`
  padding: 1em 1.5em;
  color: ${(props) => props.theme.textColor[10]};
  line-height: 1.5em;
  font-weight: 400;
`;

const SubtitleHeader = styled.h3`
  font-size: 1.2em;
  margin-top: 1.5em;
  margin-bottom: 0.5em;
  color: ${(props) => props.theme.textColor[20]};
`;

const ListWrapper = styled.ul`
  margin: 4px 0;

  a {
    color: ${(props) => props.theme.primary[50]};
  }
`;

const AboutModal: React.FC<Props> = function (props) {
  const { isOpen, onClose } = props;

  return (
    <Modal open={isOpen} onOpenChange={onClose}>
      <ModalContent>
        <Wrapper>
          <ModalTitle>About Classmaid</ModalTitle>
          Providing students a quick one-click bookmarks to commonly used sites
          in schools. <br />
          Designed by students for students This site is non-affiliated with any
          institutions in Singapore.
          <SubtitleHeader>Contribute</SubtitleHeader>
          Want to add more sites or offer suggestions?
          <ListWrapper>
            <li>
              {'Current or incoming student? Make a suggestion '}
              <a href="https://bit.ly/30SRyIo">here</a>
            </li>
            <li>
              {'Developer? Add an issue or make a pull request on '}
              <a href="https://github.com/alphatrl/classmaid">Github</a>
            </li>
          </ListWrapper>
        </Wrapper>
      </ModalContent>
    </Modal>
  );
};

export default AboutModal;
