import React from 'react';

import { cn } from '@/lib/utils';
import TodaySummaryWidget from '@/screens/smu/components/widget/TodaySummary';
import GridCard, { GridCardProps } from '@/shared/components/GridCard';

const TodayCard = React.forwardRef<HTMLDivElement, GridCardProps>(
  ({ style, className, onMouseDown, onMouseUp, onTouchEnd, ...props }, ref) => {
    return (
      <GridCard
        ref={ref}
        style={style}
        // The widget link fills the card and carries the padding
        className={cn(className, 'p-0')}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onTouchEnd={onTouchEnd}
        {...props}
      >
        <TodaySummaryWidget />
      </GridCard>
    );
  }
);

TodayCard.displayName = 'TodayCard';

export default TodayCard;
