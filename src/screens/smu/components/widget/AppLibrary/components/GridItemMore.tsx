import React from 'react';

import { cn } from '@/lib/utils';

// Intentionally not built on shadcn Button/buttonVariants: it is the child of
// a Radix `asChild` trigger and buttonVariants would need nearly every
// default overridden (size, radius, hover bg, svg size) to keep pixel parity.
export function GridItemMore({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'flex flex-col justify-center items-center',
        'no-underline cursor-pointer',
        'transition-all duration-200 ease-in hover:scale-105',
        className
      )}
      {...props}
    />
  );
}
