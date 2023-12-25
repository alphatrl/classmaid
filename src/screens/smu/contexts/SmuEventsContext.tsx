import React from 'react';

import {
  getCurrentEvent,
  sortEventsByDate,
} from '../../../shared/contexts/utils';

interface EventsState {
  schoolTerms: App.Calendar.SchoolTerm[];
  calendarEvents: App.Calendar.CalendarAppEvents | null;
  currentEvent: App.Calendar.CurrentEvent | null;
}

const SmuEventsContext = React.createContext<EventsState>({
  schoolTerms: [],
  currentEvent: null,
  calendarEvents: {},
});

interface Props {
  schoolTerms: App.Calendar.SchoolTerm[];
  importantDates: App.Calendar.ImportantDate[];
}

export const SmuEventsProvider: React.FC<React.PropsWithChildren<Props>> =
  function (props) {
    const { schoolTerms, importantDates, children } = props;

    const currentEvent = React.useMemo(() => {
      return getCurrentEvent(schoolTerms);
    }, [schoolTerms]);

    const calendarEvents: App.Calendar.CalendarAppEvents | null =
      React.useMemo(() => {
        if (importantDates.length === 0) {
          return null;
        }
        return sortEventsByDate(importantDates);
      }, [importantDates]);

    const value = React.useMemo<EventsState>(() => {
      return { schoolTerms, currentEvent, calendarEvents };
    }, [calendarEvents, currentEvent, schoolTerms]);

    return (
      <SmuEventsContext.Provider value={value}>
        {children}
      </SmuEventsContext.Provider>
    );
  };

export function useSmuEvents(): EventsState {
  const value = React.useContext(SmuEventsContext);
  return value;
}
