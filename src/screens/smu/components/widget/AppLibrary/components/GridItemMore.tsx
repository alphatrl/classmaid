import React from 'react';

import { cn } from '@/lib/utils';

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
