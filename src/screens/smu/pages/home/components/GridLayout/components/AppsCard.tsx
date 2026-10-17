import React from 'react';

import { cn } from '@/lib/utils';
import AppLibrary from '@/screens/smu/components/widget/AppLibrary';
import GridCard, { GridCardProps } from '@/shared/components/GridCard';

const AppsCard = React.forwardRef<HTMLDivElement, GridCardProps>(
  ({ style, className, onMouseDown, onMouseUp, onTouchEnd, ...props }, ref) => {
    return (
      <GridCard
        ref={ref}
        style={style}
        variant="blur"
        className={cn(
          className,
          'flex items-center justify-center hover:scale-100'
        )}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onTouchEnd={onTouchEnd}
        {...props}
      >
        <AppLibrary />
      </GridCard>
    );
  }
);

AppsCard.displayName = 'AppsCard';

export default AppsCard;
