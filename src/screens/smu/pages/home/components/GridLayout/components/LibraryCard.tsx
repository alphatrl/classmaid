import React from 'react';

import { cn } from '@/lib/utils';
import LibraryCapacities from '@/screens/smu/components/widget/LibraryCapacities';
import GridCard, { GridCardProps } from '@/shared/components/GridCard';

const LibraryCard = React.forwardRef<HTMLDivElement, GridCardProps>(
  ({ style, className, onMouseDown, onMouseUp, onTouchEnd, ...props }, ref) => {
    return (
      <GridCard
        ref={ref}
        style={style}
        className={cn(className, 'flex flex-col p-0')}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onTouchEnd={onTouchEnd}
        {...props}
      >
        <LibraryCapacities />
      </GridCard>
    );
  }
);

LibraryCard.displayName = 'LibraryCard';

export default LibraryCard;
