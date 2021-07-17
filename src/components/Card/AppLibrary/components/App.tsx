import { useRouter } from 'next/router';
import React, { useCallback, useMemo } from 'react';
import styled from 'styled-components';

import { AppLibraryShortcutsProps } from '../../../../Schema';
import firebase from '../../../../utils/firebase';
import Icon from '../../../Icon';

interface Props {
  shortcut: AppLibraryShortcutsProps;
}

const Wrapper = styled.a`
  padding: 0 16px;
  height: 72px;
  background-color: ${(props) => props.theme.icon.background};
  border-radius: 16px;
  display: flex;
  flex-direction: row;
  align-items: center;
  color: ${(props) => props.theme.icon.color};
  cursor: pointer;
  text-decoration: none;

  p {
    margin: 0;
    padding-left: 8px;
    font-weight: 600;
    font-size: 1.05em;
  }

  .material-icons-round {
    font-size: 36px;
    font-weight: normal;
  }

  :hover {
    background-color: ${(props) => props.theme.primary.blue}56;
    color: ${(props) => props.theme.primary.blue};
  }

  @media screen and (max-width: ${(props) => props.theme.mobileSize}) {
    font-size: 0.95em;
  }
`;

const App: React.FC<Props> = (props) => {
  const {
    shortcut: { id, title, logo, type, link },
  } = props;
  const router = useRouter();

  const handleClick = useCallback(() => {
    firebase?.analytics().logEvent('go_to_app', { description: id });

    if (type === 'internal') {
      router.push(`/${link}`);
    }
  }, [type, router, link, id]);

  const targetType = useMemo(() => {
    if (type == 'internal') {
      return '_self';
    }
    return '_blank_shortcuts';
  }, [type]);

  const url = useMemo(() => {
    if (type == 'internal') {
      return undefined;
    }
    return link;
  }, [link, type]);

  return (
    <Wrapper onClick={handleClick} href={url} target={targetType}>
      <Icon name={logo} width={30} height={30} />
      <p>{title}</p>
    </Wrapper>
  );
};

export default App;
