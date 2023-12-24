import type { GetStaticProps, NextPage } from 'next';
import React from 'react';
import styled from 'styled-components';

import {
  IMPORTANT_DATES_URL,
  SCHOOL_TERM_URL,
} from '../../screens/smu/constants';
import Calendar from '../../screens/smu/pages/Calendar';
import DefaultLayout from '../../shared/components/layouts/DefaultLayout';
import { getCurrentEvent } from '../../shared/contexts/utils';

export interface SMUCalendarServerSideProps {
  currentEvent: App.Calendar.CurrentEvent | null;
  schoolTerms: App.Calendar.SchoolTerm[];
  importantDates: App.Calendar.ImportantDate[];
}

const ContentWrapper = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: center;
`;

export const getStaticProps = (async () => {
  const requestPromises = await Promise.all([
    fetch(SCHOOL_TERM_URL),
    fetch(IMPORTANT_DATES_URL),
  ]);

  const schoolTermsJson = await requestPromises[0].json();
  const importantDatesJson =
    (await requestPromises[1].json()) as App.Calendar.ImportantDate[];

  const schoolTerms = schoolTermsJson.terms as App.Calendar.SchoolTerm[];
  const currentEvent = getCurrentEvent(schoolTerms);

  return {
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 60 seconds
    revalidate: 60, // In seconds
    props: {
      currentEvent,
      schoolTerms,
      importantDates: importantDatesJson,
    },
  };
}) satisfies GetStaticProps<SMUCalendarServerSideProps>;

const SMUCalendar: NextPage<SMUCalendarServerSideProps> = function (props) {
  return (
    <DefaultLayout title="SMU">
      <ContentWrapper>
        <Calendar />
      </ContentWrapper>
    </DefaultLayout>
  );
};

export default SMUCalendar;
