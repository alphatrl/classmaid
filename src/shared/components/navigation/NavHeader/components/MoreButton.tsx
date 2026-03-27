import classnames from 'classnames';
import { DropdownMenu } from 'radix-ui';
import React from 'react';

import useMediaQuery from '../../../../hooks/useMediaQuery';
import useMobileDevice from '../../../../hooks/useMobileDevice';
import Icon from '../../../Icon';
import AboutModal from './AboutModal';
import AddToHomeModal from './AddToHomeModal';

const ItemClassName = classnames(
  'text-base flex items-center gap-2 px-2 py-0.5 min-h-12',
  'bg-white dark:bg-gray-900 rounded-xl',
  'cursor-pointer hover:bg-gray-300 hover:dark:bg-gray-800',
  'outline-none'
);

const MoreButton: React.FC = function () {
  const [isAboutModalOpen, setIsAboutModalOpen] = React.useState(false);
  const [isAddToHomeOpen, setIsAddToHomeOpen] = React.useState(false);

  const { isMobile } = useMobileDevice();
  const isStandaloneWindow = useMediaQuery('(display-mode: standalone)');
  const shouldShowAddToHomeOptions = isMobile && !isStandaloneWindow;

  const handleOpenAboutModal = () => {
    setIsAboutModalOpen(true);
  };

  const handleCloseAboutModal = () => {
    setIsAboutModalOpen(false);
  };

  const handleOpenAddToHomeScreen = () => {
    setIsAddToHomeOpen(true);
  };

  const handleCloseAddToHomeScreen = () => {
    setIsAddToHomeOpen(false);
  };

  return (
    <>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <button
            className={classnames(
              'py-2.5 px-3 rounded-lg bg-transparent border-none',
              'text-white cursor-pointer flex items-center hover:bg-black/20'
            )}
          >
            <Icon name="pending" />
          </button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content
            align="end"
            sideOffset={0}
            className={classnames(
              'min-w-60 max-w-80 rounded-2xl p-1 overflow-hidden z-10',
              'bg-white dark:bg-gray-900 shadow-2xl'
            )}
          >
            <DropdownMenu.Arrow className="fill-white dark:fill-gray-900" />
            <DropdownMenu.Item
              className={ItemClassName}
              onSelect={handleOpenAboutModal}
            >
              <Icon name="info" />
              About Classmaid
            </DropdownMenu.Item>
            {shouldShowAddToHomeOptions && (
              <DropdownMenu.Item
                className={ItemClassName}
                onSelect={handleOpenAddToHomeScreen}
              >
                <Icon name="add_to_home_screen" />
                Add to Home Screen
              </DropdownMenu.Item>
            )}
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>

      {isAboutModalOpen && (
        <AboutModal isOpen={isAboutModalOpen} onClose={handleCloseAboutModal} />
      )}

      {isAddToHomeOpen && (
        <AddToHomeModal
          isOpen={isAddToHomeOpen}
          onClose={handleCloseAddToHomeScreen}
        />
      )}
    </>
  );
};

export default MoreButton;
