import classnames from 'classnames';
import React from 'react';

import Modal, { ModalContent, ModalTitle } from '../../../Modal';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const AboutModal: React.FC<Props> = function (props) {
  const { isOpen, onClose } = props;

  return (
    <Modal open={isOpen} onOpenChange={onClose}>
      <ModalContent>
        <div
          className={classnames(
            'px-6 py-4 leading-6 font-normal',
            'text-gray-700 dark:text-gray-200'
          )}
        >
          <ModalTitle>About Classmaid</ModalTitle>
          Providing students a quick one-click bookmarks to commonly used sites
          in schools. <br />
          Designed by students for students This site is non-affiliated with any
          institutions in Singapore.
          <h3 className="text-[1.2em] mt-6 mb-2 text-gray-500 dark:text-gray-300">
            Contribute
          </h3>
          Want to add more sites or offer suggestions?
          <ul className="my-1">
            <li>
              {'Current or incoming student? Make a suggestion '}
              <a
                href="https://bit.ly/30SRyIo"
                className="text-theme-500"
              >
                here
              </a>
            </li>
            <li>
              {'Developer? Add an issue or make a pull request on '}
              <a
                href="https://github.com/alphatrl/classmaid"
                className="text-theme-500"
              >
                Github
              </a>
            </li>
          </ul>
        </div>
      </ModalContent>
    </Modal>
  );
};

export default AboutModal;
