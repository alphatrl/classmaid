import React from 'react';
import styled from 'styled-components';

interface ListProps {
  title?: string;
  data: {
    title: string;
    link: string;
  }[];
}

const Container = styled.div`
  h3 {
    margin: 0;
    font-size: 1.2em;
  }
`;
const ContentView = styled.div`
  ul,
  ol {
    margin: 0;
    padding-top: 8px;
    padding-left: 0.4em;
    margin-left: 0.8em 0;
  }

  li {
    margin-left: 1em;
    margin-bottom: 0;
    margin-top: 0;
    line-height: 1.65em;
  }

  li a {
    color: #2b2b2b;
    font-weight: 600;
  }

  li a:hover {
    color: #946c14;
  }
`;

const List: React.FC<ListProps> = ({ title, data }: ListProps) => {
  const header = !title ? undefined : <h3>{title}</h3>;
  return (
    <Container>
      {header}

      <ContentView>
        <ul>
          {data.map((entry, index) => {
            return (
              <li key={index}>
                <a href={entry.link}>{entry.title}</a>
              </li>
            );
          })}
        </ul>
      </ContentView>
    </Container>
  );
};

export default List;
