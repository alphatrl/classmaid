declare namespace App {
  /** For AppLibrary-related props */
  declare namespace AppLibrary {
    interface LibraryItem {
      uid: string;
      title: string;
      shortcuts: ItemShortcut[];
    }

    interface LibraryItemShortcut {
      id: string;
      title: string;
      logo: string;
      color: string;
      type: string;
      link: string;
      description?: string;
    }
  }

  /** For Calendar-related props */
  declare namespace Calendar {
    interface CalendarAppEvents {
      [key: string]: Event[];
    }

    interface Event {
      title: string;
      timeString: string;
      startDate: number;
      endDate: number;
    }

    interface CurrentEvent {
      type: PeriodType;
      date_start: string;
      date_end: string;
      week_no?: number;
    }

    interface ImportantDate {
      summary: string;
      startTime: number;
      endTime: number;
    }

    interface SchoolPeriod {
      date_start: string;
      date_end: string;
      type: PeriodType;
      week_no?: number;
    }

    type PeriodType = 'class' | 'exam' | 'recess' | 'vacation';

    interface SchoolTerm {
      label: string;
      periods: SchoolPeriod[];
    }

    interface SchoolYear {
      name: string;
      terms: SchoolTerm[];
    }
  }

  /** For SMU-related props */
  declare namespace SMU {
    interface LibraryOccupancy {
      title: string;
      occupancy: number;
      maxOccupancy: number;
    }
  }

  interface CustomSVG {
    width?: number;
    height?: number;
  }
}
