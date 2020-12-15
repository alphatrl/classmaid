import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ReactGA from 'react-ga';

import { NavBar, List } from '../components';
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
  padding: 12px;
  border: 3px solid #2b2b2b;
  box-sizing: border-box;
`;

const Loader = styled.div`
  margin: 0 auto;
  border: 8px solid #dcdcdc;
  border-top: 8px solid #e4a925;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  animation: spin 2s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }
`;

export const Community: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [links, setLinks] = useState({
    intro: [
      {
        title: '',
        link: '',
      },
    ],
  });

  useEffect(() => {
    const load = async () => {
      const link = await fetch(`${process.env.SERVER_URL}/guides.json`).then(
        (r) => {
          return r.json();
        }
      );
      setLinks(link);
      setLoading(false);
    };

    document.title = 'SMU Shortcuts | Guides';
    load();
  }, []);

  return (
    <>
      <Header>
        <img src={logo} className="shortcutsLogo" alt="smu-shortcut icon"></img>
        <h1>Guides</h1>
      </Header>

      <NavBar />

      <Container>
        {loading ? <Loader /> : <List title="Intro" data={links.intro} />}
      </Container>
    </>
  );
};

export default Community;
