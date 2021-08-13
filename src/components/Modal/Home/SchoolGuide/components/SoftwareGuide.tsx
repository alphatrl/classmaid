import { shuffle } from 'lodash';
import React from 'react';
import styled from 'styled-components';

import {
  SOFTWARE_LINKS,
  SoftwareProp,
} from '../../../../../utils/softwareLinks';

const Wrapper = styled.div`
  padding-bottom: 1em;

  h3 {
    margin-top: 0;
    margin-bottom: 0.4em;
  }
`;

const SoftwareGuide: React.FC = () => {
  const shuffleLinks = (software: SoftwareProp) => {
    const shuffledSoftware = shuffle(software.links);
    return (
      <Wrapper>
        <h3>{software.name}</h3>
        <ul>
          {shuffledSoftware.map((link) => (
            <li key={link.id}>
              <a
                target="_blank"
                href={link.link}
                rel="noreferrer"
                aria-label={`Go to ${link.title}`}
              >
                {link.title}
              </a>
            </li>
          ))}
        </ul>
      </Wrapper>
    );
  };

  return (
    <>
      {SOFTWARE_LINKS.map((software) => (
        <>{shuffleLinks(software)}</>
      ))}
    </>
  );
};

export default SoftwareGuide;
