import { useRouter } from 'next/router';
import React, { useMemo, useState } from 'react';
import styled from 'styled-components';

import { ModalTemplate } from '../components';
import { ModalOverlay, Tab } from '../styled';

const Wrapper = styled.div`
  ol {
    margin: 0;
    padding: 0 24px;
  }

  li {
    padding: 4px 0;
  }

  a {
    color: ${(props) => props.theme.primary.blue};
    font-weight: 600;
  }

  p {
    margin: 0;
    padding: 4px 0;
  }

  .material-icons-round {
    vertical-align: -3px;
  }

  @media screen and (max-width: ${(props) => props.theme.mobileSize}) {
    font-size: 1.05em;
    li {
      padding: 6px 0;
    }

    p {
      padding: 6px 0;
    }
  }
`;

const TabsWrapper = styled.div`
  display: flex;
  padding-bottom: 4px;
  margin-bottom: 1em;
`;

const AddHomeScreen: React.FC = () => {
  const router = useRouter();
  const [tabActive, setTabActive] = useState('info');

  const closeModal = () => {
    router.replace('/');
  };

  const handlePressInfo = () => {
    setTabActive('info');
  };

  const handlePressiOS = () => {
    setTabActive('iOS');
  };

  const handlePressAndroid = () => {
    setTabActive('android');
  };

  const message = useMemo(() => {
    switch (tabActive) {
      case 'info':
        return (
          <>
            <p>
              For better convenience, add SMU Shortcuts to your Home Screen.
            </p>
            <p>
              Tap on your mobile OS and follow the steps to add SMU Shortcuts to
              your phone
            </p>
          </>
        );
      case 'iOS':
        return (
          <ol>
            <li>
              Open <b>SMU Shortcuts{"'"} Home</b> page on <b>Safari</b>
            </li>
            <li>
              Tap on the{' '}
              <b>
                Share{' '}
                <span className="material-icons-round">{'ios_share'}</span>
              </b>
            </li>
            <li>
              Tap on <b>Add to Home Screen</b>
            </li>
          </ol>
        );
      default:
        return (
          <ol>
            <li>
              Open <b>SMU Shortcuts{"'"} Home</b> page on your web browser
            </li>
            <li>
              Tap on <b>More Options</b>
            </li>
            <li>
              Tap on <b>Add to Home Screen</b>
            </li>
          </ol>
        );
    }
  }, [tabActive]);

  return (
    <>
      <ModalTemplate title="Add to Home Screen">
        <TabsWrapper>
          <Tab
            role="button"
            isActive={tabActive === 'info'}
            onClick={handlePressInfo}
          >
            About
          </Tab>
          <Tab
            role="button"
            isActive={tabActive === 'iOS'}
            onClick={handlePressiOS}
          >
            iOS
          </Tab>
          <Tab
            role="button"
            isActive={tabActive === 'android'}
            onClick={handlePressAndroid}
          >
            Android
          </Tab>
        </TabsWrapper>
        <Wrapper>{message}</Wrapper>
      </ModalTemplate>
      <ModalOverlay onClick={closeModal} />
    </>
  );
};

export default AddHomeScreen;
