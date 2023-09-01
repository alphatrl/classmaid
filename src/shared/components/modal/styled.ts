import styled from 'styled-components';

export const PopperWrapper = styled.div`
  min-width: 250px;
  border-radius: 12px;
  padding: 12px;
  background-color: ${(props) => `${props.theme.appColor[100]}56`};
  backdrop-filter: blur(12px) saturate(86%);
  box-shadow: 0px 4px 25px rgba(0, 0, 0, 0.25);

  z-index: 10;
`;

export const PopperHeader = styled.h1`
  font-size: 1em;
  margin: 0;
  margin-bottom: 4px;
`;

export const MenuItemWrapper = styled.button`
  font-size: 1em;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 4px;
  margin: 0 -4px;
  border: unset;
  border-color: unset;
  background-color: unset;
  cursor: pointer;
  border-radius: 8px;

  :hover {
    background-color: ${(props) => `${props.theme.primary[30]}`};
  }
`;

export const MenuItemLabel = styled.span`
  margin-left: 8px;
`;
