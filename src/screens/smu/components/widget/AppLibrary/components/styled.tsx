import classnames from 'classnames';
import React from 'react';

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
      className={classnames(
        'h-18 w-18 flex justify-center items-center rounded-xl',
        '[&_span]:text-[42px] [&_span]:text-white [&_svg]:text-white',
        'lg:max-md:h-13.5 lg:max-md:w-13.5 lg:max-md:[&_span]:text-[32px]',
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
      className={classnames(
        'text-center m-0 text-[0.95em] pt-2 font-medium',
        'text-gray-700 dark:text-gray-200',
        'lg:max-md:leading-tight lg:max-md:text-[0.85em]',
        className
      )}
      {...props}
    />
  );
}
