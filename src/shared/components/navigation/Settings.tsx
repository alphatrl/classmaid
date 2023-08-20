import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { useDataContext } from '../../../screens/smu/contexts/DataContext';
import { useThemeProvider } from '../../contexts/ThemeContext';
import firebase from '../../utils/firebase';
import Icon from '../Icon';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledIcon = styled.div`
  height: 48px;
  width: 48px;
  color: ${(props) => props.theme.icon.color};

  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 16px;
  cursor: pointer;
  margin-top: 1em;

  &:hover {
    background-color: ${(props) => props.theme.text300}AA;
    transform: scale(1);
  }
`;

interface Props {
  hideNavigation?: () => void;
}

interface CustomNavigator extends Navigator {
  standalone: boolean;
}

const Settings: React.FC<Props> = (props) => {
  const { hideNavigation } = props;
  const { theme, toggleTheme } = useThemeProvider();
  const router = useRouter();
  const { isMobile } = useDataContext();

  const handleToggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark_mode' : 'light_mode';
    firebase?.analytics().logEvent('toggle', {
      type: 'dark_light_appearance',
      description: `Change to ${newTheme}`,
    });
    toggleTheme();
  };

  const handleAddHomeScreen = () => {
    if (hideNavigation) {
      hideNavigation();
    }
    router.push('/#add-to-homescreen');
  };

  return (
    <Wrapper>
      <StyledIcon onClick={handleToggleTheme}>
        <Icon name={theme === 'light' ? 'light_mode' : 'dark_mode'} />
      </StyledIcon>
    </Wrapper>
  );
};

export default Settings;
