import { Breakpoint, ResponsiveLayouts } from 'react-grid-layout';

import { cn } from '@/lib/utils';

import { DashboardKey } from '../types';

/**
 * Cells are square (see `getSquareRowHeight`). The container is about
 * 1184px wide on lg (284px cells), 736-1184px on md (172-284px cells) and
 * 352px on sm (168px cells). The spans keep each widget at least about
 * 280px on its short side and fill each row.
 */
export const DashboardLayouts: ResponsiveLayouts<Breakpoint> = {
  lg: [
    { i: DashboardKey.TODAY, x: 0, y: 0, w: 1, h: 2 },
    { i: DashboardKey.APPS, x: 1, y: 0, w: 3, h: 1 },
    { i: DashboardKey.LIBRARY, x: 1, y: 1, w: 3, h: 1 },
  ],
  md: [
    { i: DashboardKey.TODAY, x: 0, y: 0, w: 2, h: 2 },
    { i: DashboardKey.APPS, x: 2, y: 0, w: 2, h: 2 },
    { i: DashboardKey.LIBRARY, x: 0, y: 2, w: 4, h: 2 },
  ],
  sm: [
    { i: DashboardKey.TODAY, x: 0, y: 0, w: 2, h: 2 },
    { i: DashboardKey.APPS, x: 0, y: 2, w: 2, h: 2 },
    { i: DashboardKey.LIBRARY, x: 0, y: 4, w: 2, h: 2 },
  ],
};

export const DashboardBreakpoints: Record<Breakpoint, number> = {
  lg: 1000,
  md: 700,
  sm: 480,
};

export const DashboardCols: Record<Breakpoint, number> = {
  lg: 4,
  md: 4,
  sm: 2,
};

export const DashboardMargin = 16;

/** Row height before the container is measured */
export const DashboardFallbackRowHeight = 240;

/**
 * Row height that makes each cell square. The grid has no container
 * padding, so the column width is the container width minus the gaps,
 * divided by the number of columns.
 */
export function getSquareRowHeight(width: number, cols: number): number {
  if (!width) return DashboardFallbackRowHeight;
  return (width - (cols - 1) * DashboardMargin) / cols;
}

/** Grid container: width caps and gutters per viewport */
export const DashboardContainerClassName = cn(
  'w-full h-full max-w-96 mx-auto p-4',
  'md:max-w-4xl md:px-4',
  'xl:max-w-7xl xl:px-12'
);
