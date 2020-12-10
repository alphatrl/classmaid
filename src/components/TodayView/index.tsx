import { number, object, string } from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Card } from '../index';

import './styles.scss';

interface CardProps {
  cardStyle?: object;
}

const TodayView: React.FC<CardProps> = ({ cardStyle }: CardProps) => {
  const [ schoolTerm, setSchoolTerm ] = useState({
    title: "",
    isBreak: false,
    daysIn: 0,
  });
  const [ upcomingEvents, setUpcomingEvents ] =  useState([
    {
      summary: "",
      startDate: 0,
      endDate: 0,
    }
  ]);
  const maxUpcomingEvents = 3;

  useEffect(() => {
    /**
     *  Finds the current schedule in school
     *    E.g. Week 2, Vacation, Recess Week.
     *  Returns an object
     */
    const getSchoolTerm = async () => {
      const currentSchTerm = await fetch(`${process.env.SERVER_URL}` + "/sch_terms.json")
        .then((r: Response) => r.json())
        .then(async (annualYear: any) => {
          for await (let year of annualYear) {
            for (let num in year) {
              const term = year[num];
              const termStart = Date.parse(term.startdate + " GMT+0800");
              const termEnd = Date.parse(term.enddate + " GMT+0800");
              
              // we found our term with 2 conditions
              // current date is more than term start date
              // current date is less than term end date
              if (todayDate > termStart && todayDate < termEnd) {                
                for (let week of term.weeks) {
                  const weekStart = Date.parse(week.startdate + " GMT+0800")
                  const weekEnd = Date.parse(week.enddate + " GMT+0800");

                  if (todayDate > weekStart && todayDate < weekEnd) {
                    const title = week.name;
                    const days = (todayDate - weekStart) / (1000 * 3600 * 24);
                    // console.log(todayDate, weekStart);
                    // console.log(days)
                    return {
                      title: title,
                      isBreak: title === "Vacation" || title === "Recess",
                      daysIn: Math.ceil(days),
                    }
                  }
                }
              }
            }
          }
        });

        if (currentSchTerm) 
          setSchoolTerm(await currentSchTerm);
    };

    /**
     * Return the upcoming events as an array containing objects.
     */
    const getUpcoming = async () => {
      const upcoming = await fetch(`${process.env.SERVER_URL}` + "/important_dates.json")
        .then((r: Response) => r.json())
        .then(async (dates: any) => {
          const topThree = [];
          let count = 0;

          for await (let date of dates) {
            const startDate = date.startTime;
            const endDate = date.endTime;
            
            // if found, add to array
            if (todayDate > startDate && todayDate < endDate) {
              topThree.push(date);
              count++;
            }

            // break loop at what is set at maxUpcomingEvents
            if (topThree.length === maxUpcomingEvents) { 
              break; 
            }
          }
          return topThree;
        });

        setUpcomingEvents(upcoming);
    }

    const todayDate = Date.now();
    getSchoolTerm();
    getUpcoming();

  }, []);

  const Today = () => {
    
    return !schoolTerm.isBreak ? 
    (
      <div className="today">
        <h1 className="highlight">{schoolTerm.title.toUpperCase()}</h1>
      </div>
    ) :
    (
      <div className="today">
          <h1>DAY {schoolTerm.daysIn}</h1>
          <h1>OF</h1>
          <h1 className="highlight">{schoolTerm.title.toUpperCase()}</h1>

      </div>
    );
  };

  const DateNow = () => {
    const [ todayDate, setTodayDate ] = useState("");
    
    useEffect(() => {
      const today = new Date();
      const todayList = today.toDateString().split(" ");
      setTodayDate(`${todayList[2]} ${todayList[1]} ${todayList[3]}`);
    }, []);

    return (
      <div className="timer">
        {todayDate}
      </div>
    )
  }

  const Upcoming = () => {
    const [ upcoming, setUpcoming] = useState([]);
    
    useEffect(() => {
      console.log(upcomingEvents)
    }, []);

    return  (
      null
    )

  };

  return (
    <Card style={cardStyle}>
      <>
        <Today />
        <DateNow />
      </>
    </Card>
  )
}

export default TodayView;