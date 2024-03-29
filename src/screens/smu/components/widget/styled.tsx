import styled from 'styled-components';

export const CardTemplate = styled.div<{ width: number; height?: number }>`
  box-sizing: border-box;
  padding: 16px;
  border-radius: 24px;
  background-color: ${(props) => props.theme.appColor[100]};
  box-shadow: 0px 4px 25px rgba(0, 0, 0, 0.25);
  margin: 15px;
  overflow: hidden;

  width: ${(props) => props.width}px;
  height: ${(props) => (props.height != null ? props.height : props.width)}px;

  transition: all 0.2s ease-in;
  &:hover {
    transform: scale(1.05);
  }
`;

export const WidgetHeader = styled.div`
  box-sizing: border-box;
  padding: 0 16px;
  height: 64px;
  display: flex;
  align-items: center;
  background-color: ${(props) => props.theme.primary[10]};
`;

export const WidgetHeaderTitle = styled.h2`
  margin: 0;
  font-size: 1.15rem;
`;
