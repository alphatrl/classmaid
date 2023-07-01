import React from 'react';
import styled from 'styled-components';

import Icon from '../../../../Icon';

const Wrapper = styled.form`
  box-sizing: border-box;
  width: 100%;
  max-height: 48px;
  height: 20%;
  display: flex;
  flex-direction: row;
  gap: 12px;
`;

const SearchInput = styled.input`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  font-size: 1.15rem;
  color: ${(props) => props.theme.textColor[10]};
  text-indent: 8px;

  border-style: solid;
  border-radius: 16px;
  border-width: 2px;
  border-color: ${(props) => props.theme.appColor[90]};

  ::placeholder {
    color: ${(props) => props.theme.appColor[50]};
  }
`;

const SearchButton = styled.button<{ isDisabled: boolean }>`
  box-sizing: border-box;
  width: 64px;

  border: none;
  border-radius: 16px;
  font-size: 1.15rem;
  padding: 12px;
  color: ${(props) => props.theme.textColor[50]};
  background-color: ${(props) => props.theme.primary[50]};
  cursor: pointer;

  transition: background-color 0.3s ease-out;

  :disabled {
    cursor: default;
    color: ${(props) => props.theme.textColor[50]};
    background-color: ${(props) => props.theme.primary[30]};
  }
`;

const SearchBar: React.FC = function () {
  const [searchText, setSearchText] = React.useState('');
  const isSearchButtonDisabled = searchText.length === 0;

  const handleChangeText = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchText(event.target.value);
    },
    []
  );

  const handleSubmit = React.useCallback(
    (event: React.FormEvent<HTMLButtonElement>) => {
      const encodeSearchTerm = encodeURI(searchText);
      const libraryUrlString = `https://search.library.smu.edu.sg/discovery/search?vid=65SMU_INST:SMU_NUI&tab=Everything&query=any,contains,${encodeSearchTerm}&search_scope=Everything`;
      window.open(libraryUrlString, '_blank');
      event.preventDefault();
    },
    [searchText]
  );

  return (
    <Wrapper>
      <SearchInput
        value={searchText}
        placeholder="Search"
        onChange={handleChangeText}
      />
      <SearchButton
        type="submit"
        aria-label="Search SMU Libraries"
        disabled={isSearchButtonDisabled}
        isDisabled={isSearchButtonDisabled}
        onSubmit={handleSubmit}
      >
        <Icon name="search" />
      </SearchButton>
    </Wrapper>
  );
};

export default SearchBar;
