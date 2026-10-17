import { DropdownMenu as DropdownMenuPrimitive } from 'radix-ui';
import React from 'react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import Icon from '@/shared/components/Icon';
import useMediaQuery from '@/shared/hooks/useMediaQuery';
import useMobileDevice from '@/shared/hooks/useMobileDevice';

import AboutModal from '../AboutModal';
import AddToHomeModal from '../AddToHomeModal';
import ThemeSubmenu from './components/ThemeSubmenu';

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
      <DropdownMenu>
        <DropdownMenuTrigger
          className={cn(
            'py-3 px-3 rounded-lg bg-transparent border-none',
            'text-white cursor-pointer flex items-center hover:bg-black/20'
          )}
        >
          <Icon name="ellipsis" />
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          sideOffset={0}
          className="min-w-60 max-w-80"
        >
          <DropdownMenuPrimitive.Arrow className="fill-white dark:fill-gray-900" />
          <DropdownMenuItem onSelect={handleOpenAboutModal}>
            <Icon name="info" />
            About Classmaid
          </DropdownMenuItem>
          {shouldShowAddToHomeOptions && (
            <DropdownMenuItem onSelect={handleOpenAddToHomeScreen}>
              <Icon name="smartphone" />
              Add to Home Screen
            </DropdownMenuItem>
          )}
          <ThemeSubmenu />
        </DropdownMenuContent>
      </DropdownMenu>

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
