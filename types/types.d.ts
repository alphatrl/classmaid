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

/** Content served by /api/content: public config from data/*.json, private guides from Google Sheets */
declare namespace Content {
  /** Public school profile (data/schools/<slug>.json without bookmarks, links and meta) */
  interface School {
    /** Lowercase slug; equals the JSON filename and the URL segment */
    slug: string;
    name: string;
    shortName: string;
    enabled: boolean;
    sso: { domain: string };
    lms: { name: string; url: string };
    /** Keys used to build the school-semesters and scraper URLs */
    calendar: { semestersKey: string; importantDatesKey: string };
    /** Branding-neutral colours (never the school's trademark colours) */
    colors: { accent: string };
    /** Feature flags, e.g. `library_occupancy`, `boss_export`, `calendar` */
    features: string[];
  }

  /** Shape of data/schools/<slug>.json */
  interface SchoolConfig extends School {
    bookmarks: Section[];
    links: Links;
    meta: Meta;
  }

  type BookmarkType = 'url' | 'internal' | 'guides';

  interface Bookmark {
    id: string;
    title: string;
    /** Lucide icon name (kebab-case), or a custom SVG fallback name */
    icon: string;
    /** Hex background colour */
    color: string;
    type: BookmarkType;
    /** URL for `url` (unless `linkKey` is set), route key for `internal`, absent for `guides` */
    link?: string;
    /**
     * `url` bookmarks only: key of a private link in the sheet `links` tab.
     * Resolved into `link` at request time; unresolved bookmarks are omitted.
     */
    linkKey?: string;
    description?: string;
  }

  interface Section {
    id: string;
    title: string;
    showOnHome: boolean;
    items: Bookmark[];
  }

  interface Guide {
    title: string;
    link: string;
    description?: string;
  }

  interface GuideCategory {
    title: string;
    /** Lucide icon name; empty string when none */
    icon: string;
    guides: Guide[];
  }

  interface GuideGroup {
    title: string;
    /** Lucide icon name; empty string when none */
    icon: string;
    /** Rows with a blank `category`, in row order */
    guides: Guide[];
    categories: GuideCategory[];
  }

  interface Link {
    url: string;
    label?: string;
  }

  /** Links keyed by name */
  type Links = Record<string, Link>;

  /** Text values keyed by name */
  type Meta = Record<string, string>;

  /** `unavailable` when the private sheet could not be read and nothing is cached */
  type SheetStatus = 'ok' | 'unavailable';

  /** Shape of data/site.json */
  interface SiteConfig {
    links: Links;
    meta: Meta;
  }

  /** GET /api/content/site */
  interface SitePayload {
    /** data/site.json links merged with the sheet's global links (sheet wins) */
    links: Links;
    meta: Meta;
    sheetStatus: SheetStatus;
  }

  /** GET /api/content/[school]/all */
  interface SchoolPayload {
    school: School;
    bookmarks: Section[];
    guides: GuideGroup[];
    sheetStatus: SheetStatus;
    /** JSON links (global, then school) merged with the sheet's (global, then school); sheet wins */
    links: Links;
    /** JSON meta (global, then school), then the sheet `meta` tab (global, then school) */
    meta: Meta;
    /** Ids of bookmarks dropped because their `linkKey` did not resolve */
    omittedBookmarks: string[];
  }
}
