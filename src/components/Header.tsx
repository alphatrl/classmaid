import React, { useEffect } from 'react';
import styled from 'styled-components';
import ReactGA from 'react-ga';
import { useRouter } from 'next/router';

const Wrapper = styled.div`
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

interface Props {
  title: string;
}

const Header: React.FC<Props> = function (props) {
  const { title } = props;

  const router = useRouter();

  useEffect(() => {
    ReactGA.pageview(router.asPath);
  }, [router.asPath]);

  return (
    <Wrapper>
      <img
        src="/images/logo-nobg.png"
        className="shortcutsLogo"
        alt="smu-shortcut icon"
      ></img>
      <h1>{title}</h1>
    </Wrapper>
  );
};

export default Header;
