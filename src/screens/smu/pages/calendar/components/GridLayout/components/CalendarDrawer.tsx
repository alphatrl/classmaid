import { CalendarIcon } from 'lucide-react';
import React from 'react';

import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import InfoColumn from '@/screens/smu/pages/calendar/components/InfoColumn';

type InfoColumnProps = React.ComponentProps<typeof InfoColumn>;

interface Props {
  value: InfoColumnProps['value'];
  onValueChange: InfoColumnProps['onChange'];
}

/** Month calendar in a left drawer, for phones */
const CalendarDrawer: React.FC<Props> = function ({ value, onValueChange }) {
  const [open, setOpen] = React.useState(false);

  const handleChange = React.useCallback<InfoColumnProps['onChange']>(
    (newValue) => {
      onValueChange(newValue);
      setOpen(false);
    },
    [onValueChange]
  );

  // Focus the selected date instead of the first tile of the month view
  const handleOpenAutoFocus = React.useCallback((event: Event) => {
    const content = event.currentTarget as HTMLElement | null;
    const activeTile = content?.querySelector<HTMLElement>(
      '.react-calendar__tile--active'
    );
    if (activeTile != null) {
      event.preventDefault();
      activeTile.focus();
    }
  }, []);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Open calendar"
          className={cn(
            'rounded-full shadow-md',
            'bg-white/75 dark:bg-black/75 backdrop-blur-md',
            'hover:bg-white dark:hover:bg-black'
          )}
        >
          <CalendarIcon className="size-5" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="w-[min(20rem,90vw)] border-0 bg-white dark:bg-black"
        onOpenAutoFocus={handleOpenAutoFocus}
      >
        <SheetHeader className="pb-0">
          <SheetTitle>Calendar</SheetTitle>
          <SheetDescription className="sr-only">
            Select a date to show its events
          </SheetDescription>
        </SheetHeader>
        <div className="px-4">
          <InfoColumn value={value} onChange={handleChange} />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CalendarDrawer;
