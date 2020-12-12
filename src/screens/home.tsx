import React, { useEffect, useState } from 'react';
import ReactGA from 'react-ga';

import { NavBar, Ticker, CardLink, TodayView } from '../components';
import logo from '../images/logo-nobg.png';

import './styles.scss';
import '../styles/home.scss';

export const Home: React.FC = () => {
  useEffect(() => {
    // ReactGA.pageview(window.location.pathname);
  }, []);

  return (
    <>
      <header className="header">
        <img src={logo} className="shortcutsLogo" alt="smu-shortcut icon"></img>
        <h1>SMU Shortcuts</h1>
      </header>

      <NavBar />
      <Ticker />

      <div className="container">
        <TodayView cardStyle={{ gridArea: 'b1' }} />

        <CardLink
          cardStyle={{ gridArea: 's1' }}
          title="eLearn"
          logo="menu_book"
          link="https://elearn.smu.edu.sg"
        />
        <CardLink
          cardStyle={{ gridArea: 's2' }}
          title="Oasis"
          logo="beach_access"
          link="https://oasis.smu.edu.sg"
        />
        <CardLink
          cardStyle={{ gridArea: 's3' }}
          title="Facility Bookings"
          logo="airline_seat_individual_suite"
          link="https://fbs.intranet.smu.edu.sg"
        />
        <CardLink
          cardStyle={{ gridArea: 's4' }}
          title="Print Services"
          logo="print"
          link="https://smu.sg/print"
        />

        <CardLink
          cardStyle={{ gridArea: 's5' }}
          title="Library"
          logo="book"
          link="https://library.smu.edu.sg/"
        />
        <CardLink
          cardStyle={{ gridArea: 's6' }}
          title="Student Wellness"
          logo="favorite"
          link="https://www.smu.edu.sg/campus-life/student-wellness"
        />
        <CardLink
          cardStyle={{ gridArea: 's7' }}
          title="Guides"
          logo="forum"
          link="/guides"
        />
        <CardLink
          cardStyle={{ gridArea: 's8' }}
          title="Community"
          logo="groups"
          link="/community"
        />

        <CardLink
          cardStyle={{ gridArea: 'c1' }}
          title="Boss"
          logo="account_balance_wallet"
          link="https://boss.intranet.smu.edu.sg"
        />
        <CardLink
          cardStyle={{ gridArea: 'c2' }}
          title="onTRAC II"
          logo="work"
          link="https://ontrac.smu.edu.sg"
        />
        <CardLink
          cardStyle={{ gridArea: 'c3' }}
          title="SPS"
          logo="biotech"
          link="https://sps.intranet.smu.edu.sg"
        />
        <CardLink
          cardStyle={{ gridArea: 'c4' }}
          title="Upcoming Events"
          logo="event"
          link="https://inet.smu.edu.sg/sites/courses/Pages/Online-Critical-Dates.aspx"
        />
        <CardLink
          cardStyle={{ gridArea: 'c5' }}
          title="Course Offerings"
          logo="payments"
          link="https://inet.smu.edu.sg/sites/courses/Pages/Course-Offerings.aspx"
        />
        <CardLink
          cardStyle={{ gridArea: 'c6' }}
          title="Contribute"
          logo="construction"
          link="https://github.com/bottleneckco/smu-shortcuts"
        />
      </div>
    </>
  );
};

export default Home;
