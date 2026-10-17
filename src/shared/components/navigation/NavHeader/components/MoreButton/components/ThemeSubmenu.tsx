import React from 'react';

import {
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import Icon from '@/shared/components/Icon';
import { Theme, useTheme } from '@/shared/contexts/ThemeContext';

const themeMeta: Record<Theme, { dot: string; label: string }> = {
  blue: { dot: 'bg-blue-500', label: 'Blue' },
  red: { dot: 'bg-red-500', label: 'Red' },
  emerald: { dot: 'bg-emerald-500', label: 'Emerald' },
  pink: { dot: 'bg-pink-500', label: 'Pink' },
};

const ThemeSubmenu: React.FC = function () {
  const { theme, setTheme, themes } = useTheme();

  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>
        <Icon name="palette" />
        <DropdownMenuLabel className="p-0 text-base font-normal">
          Theme
        </DropdownMenuLabel>
      </DropdownMenuSubTrigger>
      <DropdownMenuPortal>
        <DropdownMenuSubContent sideOffset={0} className="min-w-44">
          {themes.map((t) => (
            <DropdownMenuItem key={t} onSelect={() => setTheme(t)}>
              <span className={cn('w-4 h-4 rounded-full', themeMeta[t].dot)} />
              {themeMeta[t].label}
              {theme === t && <Icon name="check" className="ml-auto" />}
            </DropdownMenuItem>
          ))}
        </DropdownMenuSubContent>
      </DropdownMenuPortal>
    </DropdownMenuSub>
  );
};

export default ThemeSubmenu;
