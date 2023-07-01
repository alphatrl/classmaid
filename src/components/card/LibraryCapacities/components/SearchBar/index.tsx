import React from 'react';
import styled from 'styled-components';

import Icon from '../../../../Icon';

const Wrapper = styled.form`
  grid-area: search;
  display: grid;
  gap: 12px;
  grid-template-columns: 1fr 64px;
  box-sizing: border-box;
`;

const SearchInput = styled.input`
  box-sizing: border-box;
  height: 100%;
  font-size: 1.15rem;
  color: ${(props) => props.theme.textColor[10]};
  text-indent: 8px;

  border-style: solid;
  border-radius: 16px;
  border-width: 2px;
  border-color: ${(props) => props.theme.appColor[90]};

  &:focus {
    outline-color: ${(props) => props.theme.primary[50]};
  }

  ::placeholder {
    color: ${(props) => props.theme.appColor[50]};
  }
`;

const SearchButton = styled.button<{ isDisabled: boolean }>`
  box-sizing: border-box;

  display: flex;
  justify-content: center;
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
    background-color: ${(props) => props.theme.primary[20]};
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
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const libraryUrlParams = new URL(
        'https://search.library.smu.edu.sg/discovery/search'
      );
      libraryUrlParams.searchParams.append('vid', '65SMU_INST:SMU_NUI');
      libraryUrlParams.searchParams.append('tab', 'Everything');
      libraryUrlParams.searchParams.append(
        'query',
        `any,contains,${searchText}`
      );
      libraryUrlParams.searchParams.append('search_scope', 'Everything');

      window.open(libraryUrlParams, '_blank');
      setSearchText('');
    },
    [searchText]
  );

  return (
    <Wrapper onSubmit={handleSubmit}>
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
      >
        <Icon name="search" />
      </SearchButton>
    </Wrapper>
  );
};

export default SearchBar;
