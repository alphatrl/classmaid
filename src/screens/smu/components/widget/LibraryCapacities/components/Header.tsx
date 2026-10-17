import React from 'react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  WidgetHeader,
  WidgetHeaderTitle,
} from '@/screens/smu/components/widget/styled';
import Icon from '@/shared/components/Icon';

const Header: React.FC = function () {
  return (
    <WidgetHeader className="justify-between">
      <WidgetHeaderTitle>Library</WidgetHeaderTitle>

      <Button
        variant="ghost"
        size="icon"
        asChild
        className={cn(
          'size-auto cursor-pointer no-underline rounded-2xl transition-none',
          'flex p-2 -mr-2 items-center border-none bg-transparent',
          'hover:bg-theme-200 dark:hover:bg-theme-200 hover:text-inherit',
          "[&_svg:not([class*='size-'])]:size-6"
        )}
      >
        <a href="https://library.smu.edu.sg" target="_blank">
          <Icon name="external-link" className="text-theme-500" />
        </a>
      </Button>
    </WidgetHeader>
  );
};

export default Header;
