import React from 'react';

import { CardHeader } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export function WidgetHeader({
  className,
  ...props
}: React.ComponentProps<typeof CardHeader>) {
  return (
    <CardHeader
      className={cn(
        // neutralise shadcn CardHeader defaults (grid, gap, px-6)
        'gap-0',
        'box-border px-4 h-16 flex items-center bg-theme-100 dark:bg-theme-950',
        className
      )}
      {...props}
    />
  );
}

// Kept as an h2 (shadcn CardTitle renders a div) to preserve semantics
export function WidgetHeaderTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h2 className={cn('m-0 text-lg font-bold', className)} {...props} />;
}
