import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import ReactGA from 'react-ga';

import logo from '../images/logo-nobg.png';
import { useCallback } from 'react';
import { NavBar } from '../components';

import parse from 'csv-parse/lib/sync';
import moment from 'moment';
import { capitalize } from 'lodash';

const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 12px 0;

  .shortcutsLogo {
    width: 100px;
    image-rendering: -webkit-optimize-contrast;
  }

  h1 {
    margin: 0;
    font-size: 1.5em;
  }
`;

function convert(data: string[][]) {
  const relevantData = data.slice(1);

  const events = relevantData.map((event) => {
    const classCode = event[3];
    const classDesc = event[4];

    const section = event[5];
    const type = event[7];

    const startDate = event[8]; // of the whole term, not the actual event!
    const endDate = event[9];
    const startTime = event[11];
    const endTime = event[12];

    const venue = event[13];
    const instructor = event[14];

    const dayOfWeek = event[10];
    const startDateActual = moment(startDate);
    startDateActual.day(dayOfWeek);

    const dtStart = moment(
      `${startDateActual.format('DD-MMM-yyyy')} ${startTime}`
    );
    const dtEnd = moment(`${startDateActual.format('DD-MMM-yyyy')} ${endTime}`);
    const repeatEnd = moment(`${endDate} ${endTime}`);

    return `BEGIN:VEVENT
SUMMARY:${classCode} (${classDesc}) ${capitalize(type)}
DESCRIPTION:Section: ${section}\\nInstructor: ${instructor}
LOCATION:${venue}
DTSTART;TZID=Asia/Singapore:${dtStart.format('yyyyMMDDTHHmmss')}
DTEND;TZID=Asia/Singapore:${dtEnd.format('yyyyMMDDTHHmmss')}
RRULE:FREQ=WEEKLY;UNTIL=${repeatEnd.format('yyyyMMDDTHHmmss')}
BEGIN:VALARM
TRIGGER:-PT10M
ACTION:DISPLAY
DESCRIPTION:Alert before event
END:VALARM
END:VEVENT`;
  });

  return `BEGIN:VCALENDAR
VERSION:2.0
CALSCALE:GREGORIAN
PRODID:-//calendarserver.org//Zonal//EN
BEGIN:VTIMEZONE
TZID:Asia/Singapore
BEGIN:STANDARD
DTSTART:19010101T000000
RDATE:19010101T000000
TZNAME:SMT
TZOFFSETFROM:+065525
TZOFFSETTO:+065525
END:STANDARD
BEGIN:STANDARD
DTSTART:19050601T000000
RDATE:19050601T000000
TZNAME:MALT
TZOFFSETFROM:+065525
TZOFFSETTO:+0700
END:STANDARD
BEGIN:STANDARD
DTSTART:19330101T000000
RDATE:19330101T000000
TZNAME:MALST
TZOFFSETFROM:+0700
TZOFFSETTO:+0720
END:STANDARD
BEGIN:STANDARD
DTSTART:19360101T000000
RDATE:19360101T000000
TZNAME:MALT
TZOFFSETFROM:+0720
TZOFFSETTO:+0720
END:STANDARD
BEGIN:STANDARD
DTSTART:19410901T000000
RDATE:19410901T000000
TZNAME:MALT
TZOFFSETFROM:+0720
TZOFFSETTO:+0730
END:STANDARD
BEGIN:STANDARD
DTSTART:19420216T000000
RDATE:19420216T000000
TZNAME:JST
TZOFFSETFROM:+0730
TZOFFSETTO:+0900
END:STANDARD
BEGIN:STANDARD
DTSTART:19450912T000000
RDATE:19450912T000000
TZNAME:MALT
TZOFFSETFROM:+0900
TZOFFSETTO:+0730
END:STANDARD
BEGIN:STANDARD
DTSTART:19650809T000000
RDATE:19650809T000000
TZNAME:SGT
TZOFFSETFROM:+0730
TZOFFSETTO:+0730
END:STANDARD
BEGIN:STANDARD
DTSTART:19820101T000000
RDATE:19820101T000000
TZNAME:SGT
TZOFFSETFROM:+0730
TZOFFSETTO:+0800
END:STANDARD
END:VTIMEZONE
${events.join('\n')}
END:VCALENDAR`;
}

export const BOSSTimetable: React.FC = () => {
  const [fileContents, setFileContents] = useState<string | null>(null);
  const csvContents = useMemo<string[][] | null>(() => {
    if (fileContents === null) {
      return null;
    }

    return parse(fileContents);
  }, [fileContents]);

  useEffect(() => {
    document.title = 'SMU Shortcuts | About';
    ReactGA.pageview(window.location.pathname);
  }, []);

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { files } = e.target;

      if (files === null || files.length === 0) {
        return;
      }

      const file = files[0];

      const reader = new FileReader();
      reader.readAsText(file);

      reader.onload = () => {
        const { result } = reader;
        if (typeof result === 'string') {
          setFileContents(result);
        }
      };
      reader.onerror = console.error;
    },
    []
  );

  const iCalBlob = useMemo(() => {
    if (csvContents === null) {
      return null;
    }

    return new Blob([convert(csvContents)], {
      type: 'text/calendar',
    });
  }, [csvContents]);

  return (
    <>
      <Header>
        <img src={logo} className="shortcutsLogo" alt="smu-shortcut icon"></img>
        <h1>About</h1>
      </Header>
      <NavBar />

      <input
        type="file"
        placeholder="Upload CSV here"
        onChange={handleFileChange}
      />
      <pre>{csvContents ? convert(csvContents) : null}</pre>
      {iCalBlob !== null && (
        <a href={window.URL.createObjectURL(iCalBlob)}>Download iCal</a>
      )}
    </>
  );
};

export default BOSSTimetable;
