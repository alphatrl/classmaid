import parse from 'csv-parse/lib/sync';
import { capitalize, isEqual, uniqBy } from 'lodash';
import moment from 'moment';
import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';

import ModalTemplate from '../../../../components/modal/shared/ModalTemplate';
import {
  DisabledPrimaryBtn,
  PrimaryBtn,
} from '../../../../components/modal/styled';
import { ModalOverlay } from '../../../../components/modal/styled';
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

const Wrapper = styled.div`
  fieldset {
    margin: 0;
    margin-top: 12px;
    display: flex;
    flex-direction: column;
    border-radius: 12px;
    box-sizing: border-box;
    min-height: 50px;
    padding: 8px 16px;
    border: 2px solid ${(props) => props.theme.textColor[30]};
    margin-bottom: 16px;

    legend {
      float: left;
      font-size: 12px;
      font-weight: 600;
      color: ${(props) => props.theme.textColor[40]};
    }

    .content {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;

      label {
        color: ${(props) => props.theme.textColor[50]};
        margin-top: 4px;
        padding-right: 1rem;
      }
    }
  }

  .error {
    margin: 0;
    margin-top: 8px;
    font-size: 12px;
    font-weight: 600;
    color: ${(props) => props.theme.error};
  }
`;

const CustomPrimaryBtn = styled(PrimaryBtn)`
  align-self: flex-end;
`;

const CustomDisabledBtn = styled(DisabledPrimaryBtn)`
  align-self: flex-end;
`;

const HelperText = styled.div`
  margin: 0;
  margin-top: 8px;
  font-size: 12px;
  font-weight: 600;
  color: ${(props) => props.theme.textColor[50]};

  p {
    margin: 0;
  }
`;

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

const BOSSTimetable: React.FC = () => {
  const router = useRouter();
  const [fileContents, setFileContents] = React.useState<string | null>(null);
  const [errorFile, setErrorFile] = React.useState(false);
  const [allowedModules, setAllowedModules] = React.useState<string[]>([]);

  const closeModal = () => {
    router.replace('/');
  };

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
      uniqBy(csvContents.slice(1), (event) => event[3]).map((event) => event[3])
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
    <>
      <ModalTemplate title="Boss Timetable Export">
        <Wrapper>
          <FilePicker handleFiles={handleFile} fileType=".csv" />
          {errorFile && <p className="error">Invalid file</p>}
          <HelperText>
            <p>
              Head over to BOSS {'>'} Plan {'&'} Bid.
            </p>
            <p>
              Click the {'"'}Download class and exam timetable{'"'} link.
            </p>
            <p>Right click and save page as a .csv file format.</p>
            <p>Upload the saved .csv file here.</p>
          </HelperText>
          {csvContents !== null && (
            <fieldset>
              <legend>Modules to Export</legend>
              <div className="content">
                {uniqBy(csvContents.slice(1), (event) => event[3]).map(
                  (event) => (
                    <label key={event[3]}>
                      <input
                        type="checkbox"
                        value={event[3]}
                        checked={allowedModules.indexOf(event[3]) !== -1}
                        onChange={handleAllowedModuleToggled}
                      />
                      {event[4]}
                    </label>
                  )
                )}
              </div>
            </fieldset>
          )}
        </Wrapper>
        {csvContents !== null ? (
          <CustomPrimaryBtn
            href={hrefDownload}
            download="boss_timetable_export.ics"
            role="button"
          >
            Download
          </CustomPrimaryBtn>
        ) : (
          <CustomDisabledBtn role="button" aria-disabled={true}>
            Download
          </CustomDisabledBtn>
        )}
      </ModalTemplate>
      <ModalOverlay onClick={closeModal} />
    </>
  );
};

export default BOSSTimetable;
