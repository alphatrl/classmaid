export interface SchoolYearProps {
  name: string;
  terms: SchoolTermProp[];
}

export interface SchoolTermProp {
  label: string;
  periods: {
    date_start: string;
    date_end: string;
    type: SchoolPeriodType;
    week_no?: number;
  }[];
}

export type SchoolPeriodType = 'class' | 'exam' | 'recess' | 'vacation';

export interface ImportantDateProps {
  summary: string;
  startTime: number;
  endTime: number;
}

export interface CurrentEventProps {
  type: SchoolPeriodType;
  date_start: string;
  date_end: string;
  week_no?: number;
}

export interface CalendarEventProps {
  title: string;
  timeString: string;
  startDate: number;
  endDate: number;
}

export interface LibraryOccupancyProps {
  title: string;
  occupancy: number;
  maxOccupancy: number;
}

export interface AppLibraryShortcutsProps {
  id: string;
  title: string;
  logo: string;
  color: string;
  type: string;
  link: string;
  description?: string;
}

export interface AppLibraryProps {
  uid: string;
  title: string;
  shortcuts: AppLibraryShortcutsProps[];
}

export interface CalendarProps {
  [key: string]: CalendarEventProps[];
}

export interface CustomSVG {
  width?: number;
  height?: number;
}
