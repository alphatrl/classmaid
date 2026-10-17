import React from 'react';

import { cn } from '@/lib/utils';

interface CardTemplateProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export const CardTemplate = React.forwardRef<HTMLDivElement, CardTemplateProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'box-border p-4 rounded-4xl bg-white dark:bg-black overflow-clip w-full h-full',
        'shadow-xl',
        'transition-all duration-200 ease-in hover:scale-105',
        className
      )}
      {...props}
    />
  )
);
CardTemplate.displayName = 'CardTemplate';

interface WidgetHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export const WidgetHeader = React.forwardRef<HTMLDivElement, WidgetHeaderProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'box-border px-4 h-16 flex items-center bg-theme-100 dark:bg-theme-950',
        className
      )}
      {...props}
    />
  )
);
WidgetHeader.displayName = 'WidgetHeader';

export function WidgetHeaderTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h2 className={cn('m-0 text-lg font-bold', className)} {...props} />;
}
