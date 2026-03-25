import classnames from 'classnames';
import parse from 'csv-parse/lib/sync';
import { capitalize, isEqual, uniqBy } from 'lodash';
import moment from 'moment';
import React from 'react';

import { ModalTitle } from '../../../../components/modal/shared/Modal';
import FilePicker from '../../../../shared/components/FilePicker';
import generateICal from './utils/generateICal';
import { Event } from './utils/generateICal';
import parseMeetings from './utils/parseMeetings';

const CSVHeader = [
  'Course Career',
  'Term',
  'Course Type',
  'Code',
  'Description',
  'Sect',
  'Status',
  'Meeting Type',
  'Start Date',
  'End Date',
  'Day(s)',
  'Start Time',
  'End Time',
  'Venue',
  'Instructor(s)',
];

function convert(data: string[][], allowedModules: string[] = []) {
  // Remove CSV header
  const relevantData = data.slice(1);
  const meetings = parseMeetings(relevantData);

  const events: Event[] = meetings
    .filter((meeting) => {
      const { classCode } = meeting;

      return (
        allowedModules.length === 0 || allowedModules.indexOf(classCode) !== -1
      );
    })
    .map((meeting) => {
      const {
        classCode,
        classDesc,
        section,
        type,
        termStart,
        termEnd,
        timeStart,
        timeEnd,
        venue,
        instructor,
        dayOfWeek,
      } = meeting;

      // Get the first occurrence of this event
      const firstDate = termStart.clone();
      firstDate.day(dayOfWeek);

      const dtStart = moment(
        `${firstDate.format('DD-MMM-yyyy')} ${timeStart}`,
        'DD-MMM-yyyy HH:mm'
      );
      const dtEnd = moment(
        `${firstDate.format('DD-MMM-yyyy')} ${timeEnd}`,
        'DD-MMM-yyyy HH:mm'
      );
      const repeatEnd = moment(
        `${termEnd.format('DD-MMM-yyyy')} ${timeEnd}`,
        'DD-MMM-yyyy HH:mm'
      );

      return {
        summary: `${classCode} (${classDesc}) ${capitalize(type)}`,
        description: `Section: ${section}\\nInstructor: ${instructor}`,
        location: venue,
        dtStart,
        dtEnd,
        repeatFreq: 'weekly',
        repeatEnd,
        tzid: 'Asia/Singapore',
        alarms: ['-PT10M', '-PT1H'],
      };
    });

  return generateICal(events);
}

const BOSSTimetableModal: React.FC = () => {
  const [fileContents, setFileContents] = React.useState<string | null>(null);
  const [errorFile, setErrorFile] = React.useState(false);
  const [allowedModules, setAllowedModules] = React.useState<string[]>([]);

  // Raw CSV contents
  const csvContents = React.useMemo<string[][] | null>(() => {
    if (fileContents === null) {
      return null;
    }

    const parsedFile = parse(fileContents);

    if (!isEqual(CSVHeader, parsedFile[0])) {
      setErrorFile(true);
      return null;
    }

    return parsedFile;
  }, [fileContents]);

  React.useEffect(() => {
    if (csvContents === null || allowedModules.length > 0) {
      return;
    }

    setAllowedModules(
      uniqBy(csvContents.slice(1), (event) => event[3])
        .filter((event) => event[6].toLowerCase() === 'enrolled')
        .map((event) => event[3])
    );
  }, [csvContents, allowedModules]);

  // Generated ICS data, if available
  const generatedData = React.useMemo(() => {
    if (csvContents === null) {
      return null;
    }
    return convert(csvContents, allowedModules);
  }, [csvContents, allowedModules]);

  const iCalBlob = React.useMemo(() => {
    if (generatedData === null) {
      return null;
    }
    return new Blob([generatedData], {
      type: 'text/calendar',
    });
  }, [generatedData]);

  const hrefDownload = React.useMemo(() => {
    if (iCalBlob == null) {
      return '/';
    }
    return window.URL.createObjectURL(iCalBlob);
  }, [iCalBlob]);

  const handleFile = React.useCallback((files: FileList) => {
    setErrorFile(false);
    const file = files[0];
    const reader = new FileReader();
    reader.readAsText(file);

    reader.onload = () => {
      const { result } = reader;
      if (typeof result === 'string') {
        setFileContents(result);
      }
    };

    reader.onerror = () => {
      console.error;
      setErrorFile(true);
    };
  }, []);

  const handleAllowedModuleToggled = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { checked, value } = e.target;

      if (checked) {
        setAllowedModules((modules) => [...modules, value]);
      } else {
        setAllowedModules((modules) => modules.filter((mod) => mod !== value));
      }
    },
    []
  );

  return (
    <div
      className="min-h-50 px-6 py-4"
    >
      <ModalTitle>BOSS Timetable Export</ModalTitle>

      <FilePicker handleFiles={handleFile} fileType=".csv" />

      {errorFile && (
        <p className="m-0 mt-2 text-xs font-semibold text-red-600 dark:text-red-500">
          Invalid file
        </p>
      )}

      <div
        className={classnames(
          'm-0 mt-2 text-xs font-semibold mb-4',
          'text-gray-400 dark:text-gray-400 [&_p]:m-[0.3em]'
        )}
      >
        <p>
          Head over to BOSS {'>'} Plan {'&'} Bid.
        </p>
        <p>
          Click the {'"'}Download class and exam timetable{'"'} link.
        </p>
        <p>Right click and save page as a .csv file format.</p>
        <p>Upload the saved .csv file here.</p>
      </div>

      {csvContents !== null && (
        <fieldset
          className={classnames(
            'm-0 mt-3 flex flex-col rounded-xl box-border min-h-12.5',
            'px-4 py-2 border-2 border-gray-200 dark:border-gray-700 mb-4'
          )}
        >
          <legend className="float-left text-xs font-semibold text-gray-500 dark:text-gray-300">
            Modules to Export
          </legend>
          <div className="flex flex-wrap justify-start">
            {uniqBy(csvContents.slice(1), (event) => event[3])
              .filter((event) => event[6].toLowerCase() === 'enrolled')
              .map((event) => (
                <label
                  key={event[3]}
                  className="text-gray-700 dark:text-gray-200 mt-1 pr-4"
                >
                  <input
                    type="checkbox"
                    value={event[3]}
                    checked={allowedModules.indexOf(event[3]) !== -1}
                    onChange={handleAllowedModuleToggled}
                  />
                  {event[4]}
                </label>
              ))}
          </div>
        </fieldset>
      )}

      {csvContents !== null ? (
        <a
          href={hrefDownload}
          download="boss_timetable_export.ics"
          role="button"
          className={classnames(
            'flex justify-center font-medium text-base p-3',
            'text-white rounded-xl no-underline',
            'border-2 border-sky-300 dark:border-sky-300',
            'bg-sky-500 dark:bg-sky-500',
            'hover:text-sky-500 hover:bg-sky-100',
            'dark:hover:text-sky-500 dark:hover:bg-sky-100'
          )}
        >
          Download
        </a>
      ) : (
        <button
          role="button"
          aria-disabled={true}
          className={classnames(
            'box-border text-center font-medium text-base',
            'w-full py-3 px-4 rounded-xl self-end',
            'text-gray-400 dark:text-gray-400',
            'border-2 border-gray-200 dark:border-gray-700'
          )}
        >
          Download
        </button>
      )}
    </div>
  );
};

export default BOSSTimetableModal;
