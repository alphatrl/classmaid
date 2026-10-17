import { cn } from '@/lib/utils';

/** Look of the former calendar ColumnWrapper, on top of GridCard */
export const CalendarCardClassName = cn(
  'rounded-3xl overflow-y-auto',
  'shadow-[0px_4px_25px_rgba(0,0,0,0.25)]',
  'bg-white/75 dark:bg-black/75',
  'backdrop-blur-md backdrop-saturate-86',
  'hover:scale-100'
);
