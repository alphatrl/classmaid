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
  const [ upcomingEvents, setUpcomingEvents ] =  useState([]);

  useEffect(() => {
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
                    console.log('hi')
                    const days = (todayDate - weekStart) / (1000 * 3600 * 24);
                    console.log(todayDate, weekStart);
                    console.log(days)
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
    }
      const todayDate = Date.now();
      getSchoolTerm();
  }, []);

  const Today = () => {
    
    const [ todayDate, setTodayDate ] = useState("");
    
    useEffect(() => {
      const today = new Date();
      const todayList = today.toDateString().split(" ")
      setTodayDate(`${todayList[2]} ${todayList[1]} ${todayList[3]}`)
    }, [])

    return !schoolTerm.isBreak ? 
    (
      <>
        <h1>{schoolTerm.title.toUpperCase()}</h1>
      </>
    ) :
    (
      <>
        <div className="today-event">
          <h1>DAY {schoolTerm.daysIn}</h1>
          <h1>OF</h1>
          <h1>{schoolTerm.title.toUpperCase()}</h1>
        </div>
        <div className="timer">
          {todayDate}
        </div>
        
      </>
    )
  }

  return (
    <Card style={cardStyle}>
      <div className="today">
        <Today />
      </div>
    </Card>
  )
}

export default TodayView;