import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Card } from '../index';

interface CardProps {
  cardStyle?: Record<string, unknown>;
}

const WeekContainer = styled.div`
  height: 55%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  color: #ffffff;
  background-color: #2b2b2b;

  .highlight {
    color: #e4a925;
  }

  h1 {
    margin: 0;
    font-size: 3rem;
    font-weight: 800;
    line-height: 96%;
  }

  span {
    font-weight: 700;
    padding: 4px 0;
    font-size: 1.5em;
  }

  @media screen and (max-width: 1100px) {
    h1 {
      font-size: 2.25rem;
    }

    span {
      font-size: 1.2em;
    }
  }

  @media screen and (max-width: 720px) {
    h1 {
      font-size: 12vw;
    }

    span {
      font-size: 8vw;
    }
  }
`;

const TimerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  height: 10%;

  font-weight: 800;
  font-size: 1.35rem;
  color: #272727;

  border-bottom: 3px solid #272727;

  @media screen and (max-width: 1100px) {
    font-size: 2vw;
  }

  @media screen and (max-width: 720px) {
    font-size: 6vw;
  }
`;

const UpcomingContainer = styled.div`
  height: 35%;
  padding: 0 8px;
  text-align: center;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h2 {
    margin: 0;
    font-size: 1.2rem;
    text-overflow: ellipsis;
  }

  p {
    margin: 4px 0;
    font-weight: 500;
    font-size: 1.2rem;
  }

  @media screen and (max-width: 1100px) {
    padding: 0 4px;
    h2 {
      font-size: 2vw;
    }
    p {
      font-size: 1.75vw;
    }
  }

  @media screen and (max-width: 720px) {
    padding: 0 16px;
    h2 {
      font-size: 5.65vw;
      margin-bottom: 0.5vw;
    }
    p {
      margin: 8px 0;
      font-size: 4vw;
    }
  }
`;

const TodayView: React.FC<CardProps> = ({ cardStyle }: CardProps) => {
  const [schoolTerm, setSchoolTerm] = useState({
    title: '',
    isBreak: false,
    daysIn: 0,
  });

  const [todayDate, setTodayDate] = useState(Date.now());
  const maxUpcomingEvents = 1;

  useEffect(() => {
    /**
     *  Finds the current schedule in school
     *    E.g. Week 2, Vacation, Recess Week.
     *  Returns an object
     */
    const getSchoolTerm = async () => {
      const currentSchTerm = await fetch(
        `${process.env.SERVER_URL}` + '/sch_terms.json'
      )
        .then((r: Response) => r.json())
        .then(async (annualYear: any) => {
          for await (const year of annualYear) {
            for (const num in year) {
              const term = year[num];
              const termStart = Date.parse(term.startdate + ' GMT+0800');
              const termEnd = Date.parse(term.enddate + ' GMT+0800');

              // we found our term with 2 conditions
              // current date is more than term start date
              // current date is less than term end date
              if (todayDate > termStart && todayDate < termEnd) {
                for (const week of term.weeks) {
                  const weekStart = Date.parse(week.startdate + ' GMT+0800');
                  const weekEnd = Date.parse(week.enddate + ' GMT+0800');

                  if (todayDate > weekStart && todayDate < weekEnd) {
                    const title = week.name;
                    const days = (todayDate - weekStart) / (1000 * 3600 * 24);
                    // console.log(todayDate, weekStart);
                    // console.log(days)
                    return {
                      title: title,
                      isBreak: title === 'Vacation' || title === 'Recess',
                      daysIn: Math.ceil(days),
                    };
                  }
                }
              }
            }
          }
        });

      if (currentSchTerm) setSchoolTerm(currentSchTerm);
    };
    getSchoolTerm();
  }, []);

  const Today = () => {
    return !schoolTerm.isBreak ? (
      <WeekContainer>
        <h1 className="highlight">{schoolTerm.title.toUpperCase()}</h1>
      </WeekContainer>
    ) : (
      <WeekContainer>
        <h1>DAY {schoolTerm.daysIn}</h1>
        <span>OF</span>
        <h1 className="highlight">{schoolTerm.title.toUpperCase()}</h1>
      </WeekContainer>
    );
  };

  const DateNow = () => {
    const [today, setToday] = useState('');

    useEffect(() => {
      const todayList = new Date(todayDate).toDateString().split(' ');
      setToday(`${todayList[2]} ${todayList[1]} ${todayList[3]}`);
    }, []);

    return <TimerContainer>{today}</TimerContainer>;
  };

  const Upcoming = () => {
    const [upcoming, setUpcoming] = useState({
      summary: '',
      startTime: 0,
      endTime: 0,
    });
    const [date, setDate] = useState('');

    useEffect(() => {
      /**
       * Return the upcoming events as an array containing objects.
       */
      const getUpcoming = async () => {
        const upcoming = await fetch(
          `${process.env.SERVER_URL}` + '/important_dates.json'
        )
          .then((r: Response) => r.json())
          .then(async (dates: any) => {
            const topEvents = [];

            for await (const date of dates) {
              const startDate = date.startTime;

              // if found, add to array
              if (todayDate < startDate) {
                topEvents.push(date);
              }

              // break loop at what is set at maxUpcomingEvents
              if (topEvents.length === maxUpcomingEvents) {
                break;
              }
            }
            return topEvents.length > 0
              ? topEvents
              : [
                  {
                    summary: '',
                    startTime: 0,
                    endTime: 0,
                  },
                ];
          });

        setUpcoming(upcoming[0]);
        const dateList = new Date(upcoming[0].startTime)
          .toDateString()
          .split(' ');
        setDate(`(${dateList[2]} ${dateList[1]})`);
      };

      getUpcoming();
    }, []);

    return upcoming.summary === '' ? (
      <UpcomingContainer>
        <h2>No Upcoming Event</h2>
      </UpcomingContainer>
    ) : (
      <UpcomingContainer>
        <h2>Upcoming Event {date}</h2>
        <p>{upcoming.summary}</p>
      </UpcomingContainer>
    );
  };

  return (
    <Card style={cardStyle}>
      <>
        <Today />
        <DateNow />
        <Upcoming />
      </>
    </Card>
  );
};

export default TodayView;
