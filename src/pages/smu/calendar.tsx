import type { GetStaticProps, NextPage } from 'next';

import { SmuEventsProvider } from '../../screens/smu/contexts/SmuEventsContext';
import Calendar from '../../screens/smu/pages/calendar';
import getSchoolTermsAndImportantDates from '../../screens/smu/utils/getSchoolTermsAndImportantDates';
import DefaultLayout from '../../shared/components/layouts/DefaultLayout';

export interface SMUCalendarServerSideProps {
  schoolTerms: App.Calendar.SchoolTerm[];
  importantDates: App.Calendar.ImportantDate[];
}

export const getStaticProps = (async () => {
  const { schoolTerms, importantDates } =
    await getSchoolTermsAndImportantDates();

  return {
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 60 seconds
    revalidate: 60, // In seconds
    props: {
      schoolTerms,
      importantDates,
    },
  };
}) satisfies GetStaticProps<SMUCalendarServerSideProps>;

const SMUCalendar: NextPage<SMUCalendarServerSideProps> = function (props) {
  return (
    <DefaultLayout title="SMU Calendar">
      <SmuEventsProvider {...props}>
        <div className="box-border h-[calc(100dvh-64px)] p-4">
          <Calendar />
        </div>
      </SmuEventsProvider>
    </DefaultLayout>
  );
};

export default SMUCalendar;
