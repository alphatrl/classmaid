import orderBy from 'lodash/orderBy';
import React, { useMemo } from 'react';
import styled from 'styled-components';

import { AppLibraryShortcutsProps } from '../../../../Schema';
import App from './App';

interface Props {
  isSorted?: boolean;
  shortcuts: AppLibraryShortcutsProps[];
}

const Wrapper = styled.div`
  padding-top: 12px;
  padding-bottom: 24px;
`;

const AppWrapper = styled.div`
  box-sizing: border-box;
  padding-top: 12px;
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));

  @media screen and (max-width: ${(props) => props.theme.mobileSize}) {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 12px;
  }
`;

const Section: React.FC<Props> = (props) => {
  const { shortcuts, isSorted = true } = props;

  const shortcutsSort = useMemo(
    () =>
      !isSorted
        ? shortcuts
        : orderBy(shortcuts, [(app) => app.title.toLowerCase()], ['asc']),
    [isSorted, shortcuts]
  );

  if (shortcuts.length === 0) {
    return null;
  }

  return (
    <Wrapper>
      <AppWrapper>
        {shortcutsSort.map((shortcut) => (
          <App key={shortcut.id} shortcut={shortcut} />
        ))}
      </AppWrapper>
    </Wrapper>
  );
};

export default Section;
