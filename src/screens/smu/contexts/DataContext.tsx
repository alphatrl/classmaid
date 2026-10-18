import axios from 'axios';
import React from 'react';

import { useContent } from '@/shared/contexts/ContentContext';
import { getCurrentEvent, sortEventsByDate } from '@/shared/contexts/utils';

import {
  DEFAULT_CALENDAR_KEYS,
  getImportantDatesUrl,
  getSchoolTermUrl,
} from '../constants';

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

  // The SMU keys apply until the content payload resolves; the URLs only
  // change (and refetch) when a school uses different keys.
  const { school } = useContent();
  const calendar = school?.calendar ?? DEFAULT_CALENDAR_KEYS;
  const schoolTermUrl = getSchoolTermUrl(calendar.semestersKey);
  const importantDatesUrl = getImportantDatesUrl(calendar.importantDatesKey);

  /** Get school terms */
  React.useEffect(() => {
    let ignore = false;
    axios(schoolTermUrl)
      .then((response) => {
        const terms: App.Calendar.SchoolTerm[] = response.data.terms;
        if (!ignore) setSchoolTerms(terms);
      })
      .catch((error) => {
        console.error('sch terms:', error);
      });
    return () => {
      ignore = true;
    };
  }, [schoolTermUrl]);

  /** Get important dates */
  React.useEffect(() => {
    let ignore = false;
    axios(importantDatesUrl)
      .then((response) => {
        const dates: App.Calendar.ImportantDate[] = response.data;
        if (!ignore) setImportantDates(dates);
      })
      .catch((error) => {
        console.error('important dates:', error);
      });
    return () => {
      ignore = true;
    };
  }, [importantDatesUrl]);

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
