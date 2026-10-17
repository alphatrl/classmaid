import React from 'react';

import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

type GridCardVariant = 'default' | 'blur';

export interface GridCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: GridCardVariant;
}

const VARIANT_CLASSES: Record<GridCardVariant, string> = {
  default: 'bg-white dark:bg-black',
  blur: cn(
    'backface-hidden',
    'bg-white/25 dark:bg-black/25',
    'backdrop-blur-md backdrop-saturate-86'
  ),
};

/**
 * Base card for a react-grid-layout item.
 *
 * react-grid-layout clones its direct children and injects `ref`, `style`,
 * `className` and the mouse/touch handlers. This card spreads them onto the
 * root element, so the card itself is the `.react-grid-item` and no wrapper
 * `<div>` sits between the grid and the card.
 */
const GridCard = React.forwardRef<HTMLDivElement, GridCardProps>(
  (
    {
      style,
      className,
      children,
      variant = 'default',
      onMouseDown,
      onMouseUp,
      onTouchEnd,
      ...props
    },
    ref
  ) => {
    return (
      <Card
        ref={ref}
        style={style}
        className={cn(
          // neutralise shadcn Card defaults (flex, gap, border, py, text colour)
          'block gap-0 border-0 py-0 text-inherit',
          'box-border p-4 rounded-4xl overflow-clip',
          'shadow-xl',
          VARIANT_CLASSES[variant],
          // `!` because the unlayered react-grid-layout stylesheet sets
          // `transition-property` on `.react-grid-item`, which wins over
          // Tailwind's layered utilities
          'transition-all! duration-200! ease-in! hover:scale-105',
          className
        )}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onTouchEnd={onTouchEnd}
        {...props}
      >
        {children}
      </Card>
    );
  }
);

GridCard.displayName = 'GridCard';

export default GridCard;
