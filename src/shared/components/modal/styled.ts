import classnames from 'classnames';
import React from 'react';

interface PopperWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export const PopperWrapper = React.forwardRef<
  HTMLDivElement,
  PopperWrapperProps
>(({ className, ...props }, ref) =>
  React.createElement('div', {
    ref,
    className: classnames(
      'min-w-[250px] rounded-xl p-3 bg-white dark:bg-black shadow-[0px_4px_25px_rgba(0,0,0,0.25)] z-5',
      className
    ),
    ...props,
  })
);
PopperWrapper.displayName = 'PopperWrapper';

export function PopperHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return React.createElement('h1', {
    className: classnames(
      'text-gray-700 dark:text-gray-200 text-base m-0 mb-1',
      className
    ),
    ...props,
  });
}

export function MenuItemWrapper({
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return React.createElement('button', {
    className: classnames(
      'text-base w-full flex items-center p-1 -mx-1 border-none bg-transparent cursor-pointer rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700',
      className
    ),
    ...props,
  });
}

export function MenuItemLabel({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return React.createElement('span', {
    className: classnames('ml-2', className),
    ...props,
  });
}
