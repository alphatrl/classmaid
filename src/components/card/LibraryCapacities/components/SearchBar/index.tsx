import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  box-sizing: border-box;
  width: 100%;
  max-height: 48px;
  height: 20%;
  display: flex;
  flex-direction: row;
  gap: 12px;
`;

const InputWrapper = styled.input`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  font-size: 1.15rem;
  color: ${(props) => props.theme.textColor[10]};
  text-indent: 8px;

  border-style: solid;
  border-radius: 12px;
  border-width: 2px;
  border-color: ${(props) => props.theme.appColor[90]};

  ::placeholder {
    color: ${(props) => props.theme.appColor[50]};
  }
`;

const SearchButton = styled.button`
  box-sizing: border-box;
  width: 20%;
  max-width: 92px;

  border: none;
  font-size: 1.15rem;
  padding: 12px;
`;

const SearchBar: React.FC = function () {
  return (
    <Wrapper>
      <InputWrapper placeholder="Search" />
      <SearchButton>Search</SearchButton>
    </Wrapper>
  );
};

export default SearchBar;
