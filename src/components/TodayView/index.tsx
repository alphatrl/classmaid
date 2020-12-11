import { number, object, string } from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Card } from '../index';

import './styles.scss';

interface CardProps {
  cardStyle?: object;
}

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
      <div className="today">
        <h1 className="highlight">{schoolTerm.title.toUpperCase()}</h1>
      </div>
    ) : (
      <div className="today">
        <h1>DAY {schoolTerm.daysIn}</h1>
        <h1>OF</h1>
        <h1 className="highlight">{schoolTerm.title.toUpperCase()}</h1>
      </div>
    );
  };

  const DateNow = () => {
    const [today, setToday] = useState('');

    useEffect(() => {
      const todayList = new Date(todayDate).toDateString().split(' ');
      setToday(`${todayList[2]} ${todayList[1]} ${todayList[3]}`);
    }, []);

    return <div className="timer">{today}</div>;
  }

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
              const endDate = date.endTime;

              // if found, add to array
              console.log(endDate);
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
        console.log(dateList);
        setDate(`(${dateList[2]} ${dateList[1]})`);
      };

      getUpcoming();
    }, []);

    return upcoming.summary === '' ? (
      <div className="upcoming">
        <h2>No Upcoming Event</h2>
      </div>
    ) : (
      <div className="upcoming">
        <h2>Upcoming Event {date}</h2>
        <p>{upcoming.summary}</p>
      </div>
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
