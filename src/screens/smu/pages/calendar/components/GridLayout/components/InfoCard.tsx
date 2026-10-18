import React from 'react';

import { cn } from '@/lib/utils';
import InfoColumn from '@/screens/smu/pages/calendar/components/InfoColumn';
import GridCard, { GridCardProps } from '@/shared/components/GridCard';

import { CalendarCardClassName } from './styles';

type InfoColumnProps = React.ComponentProps<typeof InfoColumn>;

interface Props extends GridCardProps {
  value: InfoColumnProps['value'];
  onValueChange: InfoColumnProps['onChange'];
}

const InfoCard = React.forwardRef<HTMLDivElement, Props>(
  (
    {
      style,
      className,
      onMouseDown,
      onMouseUp,
      onTouchEnd,
      value,
      onValueChange,
      ...props
    },
    ref
  ) => {
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
        <InfoColumn value={value} onChange={onValueChange} />
      </GridCard>
    );
  }
);

InfoCard.displayName = 'InfoCard';

export default InfoCard;
