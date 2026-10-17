import React from 'react';

import { cn } from '@/lib/utils';

interface ColumnWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export const ColumnWrapper = React.forwardRef<
  HTMLDivElement,
  ColumnWrapperProps
>(({ className, ...props }, ref) =>
  React.createElement('div', {
    ref,
    className: cn(
      'box-border overflow-y-auto p-4 rounded-3xl bg-white dark:bg-black shadow-[0px_4px_25px_rgba(0,0,0,0.25)]',
      className
    ),
    ...props,
  })
);
ColumnWrapper.displayName = 'ColumnWrapper';
