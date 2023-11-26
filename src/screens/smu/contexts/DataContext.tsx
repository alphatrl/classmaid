import axios from 'axios';
import React from 'react';

import {
  getCurrentEvent,
  sortEventsByDate,
} from '../../../shared/contexts/utils';
import { IMPORTANT_DATES_URL, SCHOOL_TERM_URL } from '../constants';

interface ContextProps {
  schoolTerms: App.Calendar.SchoolTerm[];
  calendarEvents: App.Calendar.CalendarAppEvents | null;
  currentEvent: App.Calendar.CurrentEvent | null;
}

const DataContext = React.createContext<ContextProps>({
  schoolTerms: [],
  currentEvent: null,
  calendarEvents: {},
});

export const DataWrapper: React.FC<React.PropsWithChildren> = (props) => {
  const { children } = props;

  const [schoolTerms, setSchoolTerms] = React.useState<
    App.Calendar.SchoolTerm[]
  >([]);
  const [importantDates, setImportantDates] = React.useState<
    App.Calendar.ImportantDate[]
  >([]);

  React.useEffect(() => {
    getSchoolTerm();
    getImportantDates();
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

  const sharedState = React.useMemo(
    () => ({
      schoolTerms,
      calendarEvents,
      currentEvent,
    }),
    [calendarEvents, currentEvent, schoolTerms]
  );

  return (
    <DataContext.Provider value={sharedState}>{children}</DataContext.Provider>
  );
};

export const useDataContext = (): ContextProps => {
  return React.useContext(DataContext);
};
