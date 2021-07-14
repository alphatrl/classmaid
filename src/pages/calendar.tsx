import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import DefaultLayout from '../layouts/DefaultLayout';

const Container = styled.div`
  width: 100%;
  padding: 12px;
  border: 3px solid #2b2b2b;
  box-sizing: border-box;
  margin-bottom: 16px;

  h2 {
    margin: 0;
  }
`;

const EventView = styled.div`
  margin: 24px 0;

  h3 {
    margin-top: 0;
    margin-bottom: 8px;
  }

  p {
    margin: 0;
    font-weight: 600;
    font-size: 1.1em;
    color: #5a5a5a;
  }
`;

interface EventProps {
  heading: string;
  events: {
    summary: string;
    startTime: number;
    endTime: number;
  }[];
}

interface EventDescriptionProps {
  calendar: {
    summary: string;
    startTime: number;
    endTime: number;
  };
}

export const Calendar: React.FC = () => {
  const [current, setCurrent] = useState([
    {
      summary: '',
      startTime: 0,
      endTime: 0,
    },
  ]);
  const [upcoming, setUpcoming] = useState([
    {
      summary: '',
      startTime: 0,
      endTime: 0,
    },
  ]);
  const maxUpcomingEvents = 10;

  useEffect(() => {
    const getEvents = async () => {
      // fetch calendar json
      await fetch(`/temp/important_dates.json`)
        .then((r: Response) => r.json())
        .then(async (response: Record<string, undefined>) => {
          const current = [];
          const upcoming = [];

          for (const num in response) {
            const event = response[num] || {
              summary: '',
              startTime: 0,
              endTime: 0,
            };

            // event is considered current if the date 'today' matches with the 'event' date
            // time is ignored

            // to do this, the date object got to be converted to singapore time,
            // and stripping the time data to compare
            const startDate = new Date(event.startTime).setHours(0, 0, 0, 0);
            const endDate = new Date(event.endTime).setHours(0, 0, 0, 0);

            // console.log(startDate, now);
            // check if event is current
            if (now >= startDate && now <= endDate) {
              current.push(event);
            } else if (startDate > now) {
              upcoming.push(event);
            }
          }

          // update state here
          setCurrent(current);
          setUpcoming(upcoming);
        });
    };
    const now = new Date().setHours(0, 0, 0, 0);
    getEvents();
  }, []);

  const Event: React.FC<EventProps> = (props) => {
    const { events, heading } = props;

    return events.length > 0 ? (
      <Container>
        <h2>{heading}</h2>
        {events.map((calendar, index) => {
          return <EventDescription calendar={calendar} key={index} />;
        })}
      </Container>
    ) : null;
  };

  const getDateTimeString = (dateTime: string) => {
    const splitDateTime = dateTime.split(' ');
    const date = `${splitDateTime[2]} ${splitDateTime[1]}`;
    const splitTime = splitDateTime[4].split(':');
    const time =
      parseInt(splitTime[0]) > 12
        ? `${parseInt(splitTime[0]) - 12}:${splitTime[1]} PM`
        : `${splitTime[0]}:${splitTime[1]} AM`;

    return date + ' ' + time;
  };

  const EventDescription: React.FC<EventDescriptionProps> = (props) => {
    const { calendar } = props;
    const startDateTime = new Date(calendar.startTime).toString();
    const endDateTime = new Date(calendar.endTime).toString();
    const start = getDateTimeString(startDateTime);
    const end = getDateTimeString(endDateTime);

    // console.log(start, end);

    return (
      <EventView>
        <h3>{calendar.summary}</h3>
        <p>{start === end ? start : start + ' - ' + end}</p>
      </EventView>
    );
  };

  return (
    <DefaultLayout title="Academic Calendar">
      <Event events={current} heading={'Ongoing Events'} />
      <Event events={upcoming} heading={'Upcoming Events'} />
    </DefaultLayout>
  );
};

export default Calendar;
