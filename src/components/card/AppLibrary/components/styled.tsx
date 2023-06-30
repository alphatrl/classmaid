import styled from 'styled-components';

// App.tsx
export const AppWrapper = styled.a`
  text-decoration: none;
  color: ${(props) => props.theme.textColor[50]};
  cursor: pointer;
  margin-bottom: 12px;
`;

export const AppView = styled.div<{ color?: string }>`
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

  ${AppWrapper}:hover & {
    background-color: ${(props) => props.theme.primary.blue}56;
    color: ${(props) => props.theme.primary.blue};
    transition: all 0.2s ease-in;
  }
`;

export const AppTitle = styled.h1`
  margin: 8px 0 0 4px;
  font-size: 1.2rem;
  font-weight: 600;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  display: -webkit-box;
  overflow: hidden;

  @media screen and (max-width: ${(props) => props.theme.mobileSize}) {
    font-size: 1.1rem;
    text-align: center;
    margin: 8px 4px 0 4px;
  }

  ${AppWrapper}:hover & {
    color: ${(props) => props.theme.primary.blue};
    transition: all 0.2s ease-in;
  }
`;

// Section.tsx
export const SectionWrapper = styled.div`
  padding: 24px 0;
  box-sizing: border-box;
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));

  @media screen and (max-width: ${(props) => props.theme.mobileSize}) {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 12px;
  }
`;

// Tooltips.tsx
export const ToolTipsWrapper = styled.span`
  visibility: hidden;
  padding: 4px 8px;
  background-color: ${(props) => props.theme.tooltips.background};
  color: ${(props) => props.theme.tooltips.text};
  text-align: left;
  border-radius: 8px;
  opacity: 0;
  font-size: 0.8em;

  position: absolute;
  z-index: 1;

  ${AppWrapper}: hover & {
    visibility: visible;
    opacity: 1;
    transition: all 0.2s ease-in;
  }

  @media screen and (max-width: ${(props) => props.theme.mobileSize}) {
    text-align: center;
  }
`;
