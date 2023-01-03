import styled from 'styled-components';

export const CardTemplate = styled.div<{ width: number; height?: number }>`
  box-sizing: border-box;
  padding: 16px;
  border-radius: 24px;
  background: #f1f1f1;
  box-shadow: 0px 4px 25px rgba(0, 0, 0, 0.25);
  margin: 15px;

  width: ${(props) => props.width}px;
  height: ${(props) => (props.height != null ? props.height : props.width)}px;

  @supports (backdrop-filter: ${(props) => props.theme.blur.blur}) {
    backdrop-filter: blur(12px);
  }
`;
