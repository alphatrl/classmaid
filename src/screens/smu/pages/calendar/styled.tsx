import React from 'react';

import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export function ColumnWrapper({
  className,
  ...props
}: React.ComponentProps<typeof Card>) {
  return (
    <Card
      className={cn(
        // neutralise shadcn Card defaults (flex, gap, border, py, text colour)
        'block gap-0 border-0 py-0 text-inherit',
        'box-border overflow-y-auto p-4 rounded-3xl bg-white dark:bg-black',
        'shadow-[0px_4px_25px_rgba(0,0,0,0.25)]',
        className
      )}
      {...props}
    />
  );
}
