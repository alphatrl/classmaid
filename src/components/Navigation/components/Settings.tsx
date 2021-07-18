import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { useDarkMode } from '../../../contexts/ThemeContext';
import firebase from '../../../utils/firebase';
import Icon from '../../Icon';

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
  const { theme, toggleTheme } = useDarkMode();
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    const userAgent = window.navigator.userAgent.toLowerCase();

    // detect standalone mode
    const customNavigator = window.navigator as CustomNavigator;
    setIsStandalone(
      ('standalone' in customNavigator && customNavigator.standalone) ||
        window.matchMedia('(display-mode: standalone)').matches
    );

    // check if safari has touchpoint
    setIsMobile(
      /iphone|ipad|ipod/.test(userAgent) || // iOS or older iPadOS
        (/mac/.test(userAgent) && navigator.maxTouchPoints > 1) || // >= iPadOS 13
        /android/i.test(userAgent) // Android
    );
  }, []);

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
      {isMobile && !isStandalone && (
        <StyledIcon onClick={handleAddHomeScreen}>
          <Icon name="add_to_home_screen" />
        </StyledIcon>
      )}
      <StyledIcon onClick={handleToggleTheme}>
        <Icon name={theme === 'light' ? 'light_mode' : 'dark_mode'} />
      </StyledIcon>
    </Wrapper>
  );
};

export default Settings;
