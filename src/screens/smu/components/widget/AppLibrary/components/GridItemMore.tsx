import classNames from 'classnames';
import React from 'react';

export function GridItemMore({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={classNames(
        'flex flex-col justify-center items-center',
        'no-underline cursor-pointer',
        'transition-all duration-200 ease-in hover:scale-105',
        className
      )}
      {...props}
    />
  );
}
