import React, { useEffect } from 'react';
// import ReactGA from 'react-ga';
import styled from 'styled-components';

import { NavBar, Ticker, CardLink, TodayView } from '../components';
import logo from '../images/logo-nobg.png';

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

const Container = styled.main`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-gap: 8px;
  grid-template-areas:
    'b1 b1 s1 s2 s5 s6'
    'b1 b1 s3 s4 s7 s8'
    'c1 c2 c3 c4 c5 c6';

  @media screen and (max-width: 720px) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-areas:
      'b1 b1'
      'b1 b1'
      's1 s2'
      's3 s4'
      's5 s6'
      's7 s8'
      'c1 c2'
      'c3 c4'
      'c5 c6';
  }
`;

export const Home: React.FC = () => {
  useEffect(() => {
    // ReactGA.pageview(window.location.pathname);
  }, []);

  return (
    <>
      <Header>
        <img src={logo} className="shortcutsLogo" alt="smu-shortcut icon"></img>
        <h1>SMU Shortcuts</h1>
      </Header>

      <NavBar />
      <Ticker />

      <Container>
        <TodayView gridArea="b1" />

        <CardLink
          gridArea="s1"
          title="eLearn"
          logo="menu_book"
          link="https://elearn.smu.edu.sg"
        />
        <CardLink
          gridArea="s2"
          title="Oasis"
          logo="beach_access"
          link="https://oasis.smu.edu.sg"
        />
        <CardLink
          gridArea="s3"
          title="Facility Bookings"
          logo="airline_seat_individual_suite"
          link="https://fbs.intranet.smu.edu.sg"
        />
        <CardLink
          gridArea="s4"
          title="Print Services"
          logo="print"
          link="https://smu.sg/print"
        />

        <CardLink
          gridArea="s5"
          title="Library"
          logo="book"
          link="https://library.smu.edu.sg/"
        />
        <CardLink
          gridArea="s6"
          title="Student Wellness"
          logo="favorite"
          link="https://www.smu.edu.sg/campus-life/student-wellness"
        />
        <CardLink
          gridArea="s7"
          title="Guides"
          logo="forum"
          link="/guides"
          newTab={false}
        />
        <CardLink
          gridArea="s8"
          title="Community"
          logo="groups"
          link="/community"
          newTab={false}
        />

        <CardLink
          gridArea="c1"
          title="Boss"
          logo="account_balance_wallet"
          link="https://boss.intranet.smu.edu.sg"
        />
        <CardLink
          gridArea="c2"
          title="onTRAC II"
          logo="work"
          link="https://ontrac.smu.edu.sg"
        />
        <CardLink
          gridArea="c3"
          title="SPS"
          logo="biotech"
          link="https://sps.intranet.smu.edu.sg"
        />
        <CardLink
          gridArea="c4"
          title="Upcoming Events"
          logo="event"
          link="https://inet.smu.edu.sg/sites/courses/Pages/Online-Critical-Dates.aspx"
        />
        <CardLink
          gridArea="c5"
          title="Course Offerings"
          logo="payments"
          link="https://inet.smu.edu.sg/sites/courses/Pages/Course-Offerings.aspx"
        />
        <CardLink
          gridArea="c6"
          title="Contribute"
          logo="construction"
          link="https://github.com/bottleneckco/smu-shortcuts"
        />
      </Container>
    </>
  );
};

export default Home;
