import axios from 'axios';
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { IMPORTANT_DATES_URL, SCHOOL_TERM_URL } from './constants';
import { getCurrentEvent, sortEventsByDate } from './utils';

interface ContextProps {
  schoolTerms: App.Calendar.SchoolTerm[];
  calendarEvents: App.Calendar.CalendarAppEvents | null;
  currentEvent: App.Calendar.CurrentEvent | null;
  appLibrary: App.AppLibrary.LibraryItem[];
  isMobile: boolean;
}

const DataContext = createContext<ContextProps>({
  appLibrary: [],
  schoolTerms: [],
  currentEvent: null,
  calendarEvents: {},
  isMobile: false,
});

export const DataWrapper: React.FC = (props) => {
  const { children } = props;
  // const [appBookmarks] = React.useState<AppLibraryProps>(APP_BOOKMARK_DEFAULT);
  const [appLibrary, setAppLibrary] = React.useState<
    App.AppLibrary.LibraryItem[]
  >([]);
  const [schoolTerms, setSchoolTerms] = React.useState<
    App.Calendar.SchoolTerm[]
  >([]);
  const [importantDates, setImportantDates] = React.useState<
    App.Calendar.ImportantDate[]
  >([]);
  const [isMobile, setIsMobile] = React.useState(false);

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
    axios(SCHOOL_TERM_URL)
      .then((response) => {
        const terms: App.Calendar.SchoolTerm[] = response.data.terms;
        setSchoolTerms(terms);
      })
      .catch((error) => {
        console.error('sch terms:', error);
      });

  /** Get important dates */
  const getImportantDates = async () =>
    axios(IMPORTANT_DATES_URL)
      .then((response) => {
        const dates: App.Calendar.ImportantDate[] = response.data;
        setImportantDates(dates);
      })
      .catch((error) => {
        console.error('important dates:', error);
      });

  /** Get app library */
  const getAppLibrary = async () =>
    axios('/data/apps.json')
      .then((response) => {
        const results: App.AppLibrary.LibraryItem[] = response.data.result;
        setAppLibrary(results);
      })
      .catch((error) => {
        console.error('app library', error);
      });

  /** Get today details */
  const currentEvent: App.Calendar.CurrentEvent | null = React.useMemo(() => {
    return getCurrentEvent(schoolTerms);
  }, [schoolTerms]);

  /** Split Important Dates by date */
  const calendarEvents: App.Calendar.CalendarAppEvents | null =
    React.useMemo(() => {
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
