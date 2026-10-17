import React from 'react';

import { cn } from '@/lib/utils';
import EventsColumn from '@/screens/smu/pages/calendar/components/EventsColumn';
import GridCard, { GridCardProps } from '@/shared/components/GridCard';

import { CalendarCardClassName } from './styles';

const EventsCard = React.forwardRef<HTMLDivElement, GridCardProps>(
  ({ style, className, onMouseDown, onMouseUp, onTouchEnd, ...props }, ref) => {
    return (
      <GridCard
        ref={ref}
        style={style}
        className={cn(className, CalendarCardClassName)}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onTouchEnd={onTouchEnd}
        {...props}
      >
        <EventsColumn />
      </GridCard>
    );
  }
);

EventsCard.displayName = 'EventsCard';

export default EventsCard;
