import React from 'react';

import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

// Geometry of the original 230x64 viewBox. The original react-content-loader
// used the same colour for background and foreground, so it rendered as
// static blocks: animate-none keeps that.
const barClassName = cn(
  'absolute left-0 h-[46.875%] rounded-none',
  'bg-[#999999] animate-none'
);

const TodayEventLoading: React.FC = function () {
  return (
    <div className="relative w-full aspect-[230/64]">
      <Skeleton className={cn(barClassName, 'top-0 w-[65.2174%]')} />
      <Skeleton className={cn(barClassName, 'top-[53.125%] w-[86.9565%]')} />
    </div>
  );
};

export default TodayEventLoading;
