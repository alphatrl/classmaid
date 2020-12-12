import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const NavBarContainer = styled.div`
  width: 100%;
  padding: 16px 0;
  letter-spacing: 1.2px;
  display: flex;

  @media screen and (max-width: 720px) {
    justify-content: center;
  }
`;

const StyledLink = styled(NavLink)`
  text-decoration: none;
  text-transform: uppercase;
  font-weight: 600;
  color: #2b2b2b;
  padding-right: 16px;
`;

const NavBar: React.FC = () => {
  return (
    <NavBarContainer>
      <StyledLink to="/">
        <span>Home</span>
      </StyledLink>
      <StyledLink to="/about">
        <span>About</span>
      </StyledLink>
    </NavBarContainer>
  );
};

export default NavBar;
