import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.input`
  width: 100%;
  max-height: 48px;
  height: 20%;
  box-sizing: border-box;
  font-size: 1.2rem;
  color: ${(props) => props.theme.textColor[10]};

  border-style: solid;
  border-radius: 12px;
  border-width: 2px;
  border-color: ${(props) => props.theme.appColor[90]};
  padding-inline-start: 8px;

  ::placeholder {
    color: ${(props) => props.theme.appColor[50]};
  }
`;

const SearchBar: React.FC = function () {
  return <Wrapper placeholder="Search"></Wrapper>;
};

export default SearchBar;
