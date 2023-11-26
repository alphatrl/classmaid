import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';

import { CardTemplate } from '../screens/smu/components/widget/styled';
import TodaySummaryWidget from '../screens/smu/components/widget/TodaySummary';
import useWidgetSize from '../shared/hooks/useWidgetSize';
import { MOBILE_WIDTH_SIZE_L } from '../shared/themes/size';

const MainWrapper = styled.div`
  display: grid;
  height: 100dvh;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: ${MOBILE_WIDTH_SIZE_L}) {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }
`;

const ContentWrapper = styled.div`
  display: grid;
  gap: 1em;
  align-content: center;
  align-items: center;
  grid-template-areas: 'image message';

  @media screen and (max-width: ${MOBILE_WIDTH_SIZE_L}) {
    display: flex;
    flex-direction: column;
    gap: 0;
  }
`;

const WidgetWrapper = styled.div`
  grid-area: image;
  display: flex;
  justify-content: flex-end;
`;

const MessageWrapper = styled.div`
  grid-area: message;
  display: flex;
`;

const Header = styled.h1`
  font-size: 2.25rem;
  margin: 0;
  color: ${(props) => props.theme.textColor[10]};

  @media screen and (max-width: ${MOBILE_WIDTH_SIZE_L}) {
    font-size: 1.85rem;
  }
`;

const Message = styled.p`
  margin-top: 8px;
  margin-bottom: 8px;
  font-size: 1.35rem;
  color: ${(props) => props.theme.textColor[20]};
  line-height: 2rem;
  font-weight: 500;

  a {
    color: ${(props) => props.theme.primary[50]};
    text-decoration-color: ${(props) => props.theme.primary[50]};
  }

  @media screen and (max-width: ${MOBILE_WIDTH_SIZE_L}) {
    font-size: 1rem;
    line-height: 1.5rem;
  }
`;

export const ClassMaidHome: NextPage = function () {
  const router = useRouter();
  const widgetSize = useWidgetSize('large');
  const redirectUrl = `${process.env.CLASSMAID_URL ?? 'http://localhost:3000'}`;

  console.log(redirectUrl);

  React.useEffect(() => {
    const redirect = setTimeout(() => {
      router.push(redirectUrl);
    }, 5000);

    return () => clearTimeout(redirect);
  }, [redirectUrl, router]);

  return (
    <MainWrapper>
      <ContentWrapper>
        <WidgetWrapper>
          <TodaySummaryWidget />
        </WidgetWrapper>
        <MessageWrapper>
          <CardTemplate width={widgetSize.width} height={widgetSize.height}>
            <Header>We have rebranded!</Header>
            <Message>
              {
                "Don't worry, everything you loved about SMU Shortcuts can be found in "
              }
              <a href={redirectUrl}>Classmaid.sg</a>!
            </Message>
            <Message>
              You will be redirected in 5 seconds. Click the link if you are not
              redirected immediately.
            </Message>
          </CardTemplate>
        </MessageWrapper>
      </ContentWrapper>
    </MainWrapper>
  );
};

export default ClassMaidHome;
