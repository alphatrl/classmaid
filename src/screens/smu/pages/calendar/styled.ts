import styled from 'styled-components';

export const ColumnWrapper = styled.div`
  box-sizing: border-box;
  overflow-y: auto;
  padding: 16px;

  border-radius: 24px;
  background-color: ${(props) => props.theme.appColor[100]};
  box-shadow: 0px 4px 25px rgba(0, 0, 0, 0.25);
`;
