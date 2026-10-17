import React from 'react';

import { cn } from '@/lib/utils';

interface GridImageProps extends React.HTMLAttributes<HTMLDivElement> {
  $backgroundColor: string;
}

export function GridImage({
  $backgroundColor,
  className,
  ...props
}: GridImageProps) {
  return (
    <div
      className={cn(
        'flex justify-center items-center rounded-2xl',
        'h-14 w-14 md:h-16 md:w-16',
        '[&_svg]:text-white',
        className
      )}
      style={{ backgroundColor: $backgroundColor }}
      {...props}
    />
  );
}

export function GridText({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn(
        'text-center m-0 text-xs pt-2 font-medium leading-tight',
        'text-gray-700 dark:text-gray-200',
        'md:text-base',
        className
      )}
      {...props}
    />
  );
}
