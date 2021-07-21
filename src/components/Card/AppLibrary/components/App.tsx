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
  text-decoration: none;
  color: ${(props) => props.theme.text900};
  cursor: pointer;
  margin-bottom: 12px;
`;

const AppView = styled.div<{ color?: string }>`
  padding: 0 16px;
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 16px;
  background-color: ${(props) => props.color ?? props.theme.icon.background};
  color: ${(props) =>
    props.color ? props.theme.icon.colorCustom : props.theme.icon.color};
  filter: ${(props) => props.theme.icon.filter};

  .material-icons-round {
    font-size: 36px;
    font-weight: normal;
  }
`;

const Title = styled.h1`
  margin: 8px 0 0 4px;
  font-size: 1.2rem;
  font-weight: 600;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  display: -webkit-box;
  overflow: hidden;

  @media screen and (max-width: ${(props) => props.theme.mobileSize}) {
    font-size: 1.1rem;
  }
`;

const App: React.FC<Props> = (props) => {
  const {
    shortcut: { id, title, logo, type, link, color },
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
      <AppView color={color}>
        <Icon name={logo} width={30} height={30} />
      </AppView>
      <Title>{title}</Title>
    </Wrapper>
  );
};

export default App;
