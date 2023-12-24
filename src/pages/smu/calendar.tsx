import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from 'next';
import React from 'react';
import styled from 'styled-components';

import {
  IMPORTANT_DATES_URL,
  SCHOOL_TERM_URL,
} from '../../screens/smu/constants';
import DefaultLayout from '../../shared/components/layouts/DefaultLayout';
import { getCurrentEvent } from '../../shared/contexts/utils';
import { MOBILE_MEDIA_QUERY } from '../../shared/themes/size';

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

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  background-color: pink;
  flex: 1;

  @media screen and ${MOBILE_MEDIA_QUERY} {
    padding: 16px 0;
    justify-content: center;
  }
`;

export const getServerSideProps = (async () => {
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
    props: {
      currentEvent,
      schoolTerms,
      importantDates: importantDatesJson,
    },
  };
}) satisfies GetServerSideProps<SMUCalendarServerSideProps>;

const SMUCalendar: NextPage<SMUCalendarServerSideProps> = function (props) {
  return (
    <DefaultLayout title="SMU">
      <ContentWrapper>
        <Wrapper>
          <h1>WIP</h1>
        </Wrapper>
      </ContentWrapper>
    </DefaultLayout>
  );
};

export default SMUCalendar;
