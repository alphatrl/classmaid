import React from 'react';

import { Card, CardHeader } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export function CardTemplate({
  className,
  ...props
}: React.ComponentProps<typeof Card>) {
  return (
    <Card
      className={cn(
        // neutralise shadcn Card defaults (flex, gap, border, py, text colour)
        'block gap-0 border-0 py-0 text-inherit',
        'box-border p-4 rounded-4xl bg-white dark:bg-black overflow-clip w-full h-full',
        'shadow-xl',
        'transition-all duration-200 ease-in hover:scale-105',
        className
      )}
      {...props}
    />
  );
}

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
