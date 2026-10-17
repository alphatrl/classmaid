import React from 'react';

import { cn } from '@/lib/utils';
import Modal, { ModalContent, ModalTitle } from '@/shared/components/Modal';
import { useContent } from '@/shared/contexts/ContentContext';

const DEFAULT_ABOUT_TEXT =
  'Providing students a quick one-click bookmarks to commonly used sites in schools. Designed by students for students. This site is non-affiliated with any institutions in Singapore.';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

function ExternalLink(props: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={props.href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-theme-500"
    >
      {props.children}
    </a>
  );
}

const AboutModal: React.FC<Props> = function (props) {
  const { isOpen, onClose } = props;
  const { links, meta } = useContent();

  // Each item shows only when its link key is in the content payload
  const feedback = links.feedback?.url;
  const github = links.github?.url;
  const contactUs = links.contact_us?.url;
  const hasContribute = feedback != null || github != null || contactUs != null;

  return (
    <Modal open={isOpen} onOpenChange={onClose}>
      <ModalContent aria-describedby={undefined}>
        <div
          className={cn(
            'px-6 py-4 leading-6 font-normal',
            'text-gray-700 dark:text-gray-200'
          )}
        >
          <ModalTitle>About Classmaid</ModalTitle>
          <p className="m-0">{meta.about_text ?? DEFAULT_ABOUT_TEXT}</p>
          {hasContribute && (
            <>
              <h3 className="text-[1.2em] mt-6 mb-2 text-gray-500 dark:text-gray-300">
                Contribute
              </h3>
              Want to add more sites or offer suggestions?
              <ul className="my-1">
                {feedback != null && (
                  <li>
                    {'Current or incoming student? Make a suggestion '}
                    <ExternalLink href={feedback}>here</ExternalLink>
                  </li>
                )}
                {github != null && (
                  <li>
                    {'Developer? Add an issue or make a pull request on '}
                    <ExternalLink href={github}>GitHub</ExternalLink>
                  </li>
                )}
                {contactUs != null && (
                  <li>
                    {'Something else? '}
                    <ExternalLink href={contactUs}>Contact us</ExternalLink>
                  </li>
                )}
              </ul>
            </>
          )}
        </div>
      </ModalContent>
    </Modal>
  );
};

export default AboutModal;
