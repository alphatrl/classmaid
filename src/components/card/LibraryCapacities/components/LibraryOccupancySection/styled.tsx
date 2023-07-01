import styled from 'styled-components';

export const LibraryCard = styled.div`
  box-sizing: border-box;
  border-radius: 16px;

  position: relative;
  overflow: hidden;
  background-color: pink;
`;

export const LibraryDataWrapper = styled.div`
  box-sizing: border-box;
  position: relative;
  z-index: 1;
  padding: 8px;
`;

export const LibraryTitle = styled.h1`
  margin: 0;
  margin-bottom: 4px;
  font-size: 1.15em;
  color: ${(props) => props.theme.textColor[10]};
`;
