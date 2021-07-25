import axios from 'axios';
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import {
  AppLibraryProps,
  CalendarProps,
  CurrentEventProps,
  ImportantDateProps,
  SchoolYearProps,
} from '../Schema';
// import { APP_BOOKMARK_DEFAULT } from '../utils/appBookmarkDefaults';
import { getCurrentEvent, sortEventsByDate } from './utils';

interface ContextProps {
  schoolTerms: SchoolYearProps[];
  calendarEvents: CalendarProps | null;
  currentEvent: CurrentEventProps | null;
  // appBookmarks: AppLibraryProps;
  appLibrary: AppLibraryProps[];
  isMobile: boolean;
}

const DataContext = createContext<ContextProps>({
  // appBookmarks: APP_BOOKMARK_DEFAULT,
  appLibrary: [],
  schoolTerms: [],
  currentEvent: null,
  calendarEvents: {},
  isMobile: false,
});

export const DataWrapper: React.FC = (props) => {
  const { children } = props;
  // const [appBookmarks] = useState<AppLibraryProps>(APP_BOOKMARK_DEFAULT);
  const [appLibrary, setAppLibrary] = useState<AppLibraryProps[]>([]);
  const [schoolTerms, setSchoolTerms] = useState<SchoolYearProps[]>([]);
  const [importantDates, setImportantDates] = useState<ImportantDateProps[]>(
    []
  );
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    getSchoolTerm();
    getImportantDates();
    getAppLibrary();
  }, []);

  useEffect(() => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    // check if safari has touchpoint
    setIsMobile(
      /iphone|ipad|ipod/.test(userAgent) || // iOS or older iPadOS
        (/mac/.test(userAgent) && navigator.maxTouchPoints > 1) || // >= iPadOS 13
        /android/i.test(userAgent) // Android
    );
  }, []);

  /** Get school terms */
  const getSchoolTerm = async () =>
    axios(`${process.env.SERVER_URL}` + '/SMU/school_terms.json')
      .then((response) => {
        const terms: SchoolYearProps[] = response.data.years;
        setSchoolTerms(terms);
      })
      .catch((error) => {
        console.error('sch terms:', error);
      });

  /** Get important dates */
  const getImportantDates = async () =>
    axios(`${process.env.SERVER_URL}` + '/SMU/important_dates.json')
      .then((response) => {
        const dates: ImportantDateProps[] = response.data;
        setImportantDates(dates);
      })
      .catch((error) => {
        console.error('important dates:', error);
      });

  /** Get app library */
  const getAppLibrary = async () =>
    axios('/data/apps.json')
      .then((response) => {
        const results: AppLibraryProps[] = response.data.result;
        setAppLibrary(results);
      })
      .catch((error) => {
        console.error('app library', error);
      });

  /** Get today details */
  const currentEvent: CurrentEventProps | null = useMemo(() => {
    return getCurrentEvent(schoolTerms);
  }, [schoolTerms]);

  /** Split Important Dates by date */
  const calendarEvents: CalendarProps | null = useMemo(() => {
    if (importantDates.length === 0) {
      return null;
    }
    return sortEventsByDate(importantDates);
  }, [importantDates]);

  const sharedState = useMemo(
    () => ({
      appLibrary,
      schoolTerms,
      calendarEvents,
      currentEvent,
      isMobile,
    }),
    [appLibrary, calendarEvents, currentEvent, isMobile, schoolTerms]
  );

  return (
    <DataContext.Provider value={sharedState}>{children}</DataContext.Provider>
  );
};

export const useDataContext = (): ContextProps => {
  return useContext(DataContext);
};
