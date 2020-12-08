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
                  console.log(weekStart, weekEnd)

                  if (todayDate > weekStart && todayDate < weekEnd) {
                    const title = week.name;
                    console.log('hi')
                    const days = Math.floor((todayDate - weekStart) / (1000 * 3600 * 24));
                    console.log(days)
                    return {
                      title: title,
                      isBreak: title === "Vacation" || title === "Recess",
                      daysIn: days
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
  }, [])

  return (
    <Card style={cardStyle}>
      <>{schoolTerm.title}</>
    </Card>
  )
}

export default TodayView;