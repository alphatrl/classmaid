import styled from 'styled-components';

export const CardTemplate = styled.div`
  box-sizing: border-box;
  padding: 16px;
  border-radius: 16px;
  background: #f1f1f1;
  box-shadow: 0px 4px 25px rgba(0, 0, 0, 0.25);

  @supports (backdrop-filter: ${(props) => props.theme.blur.blur}) {
    background: ${(props) => props.theme.blur.background};
    backdrop-filter: ${(props) => props.theme.blur.blur};
  }
`;
