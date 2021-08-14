import { sortBy } from 'lodash';
import React, { useMemo } from 'react';

import { Welcome_Guide_Links } from '../../../../../utils/schoolGuide/welcomeLinks';

const SchoolSurvival: React.FC = () => {
  const links = useMemo(() => {
    return sortBy(Welcome_Guide_Links, 'title');
  }, []);

  return (
    <ul>
      {links.map((link) => (
        <li key={link.id}>
          <a target="_blank" href={link.link} rel="noreferrer">
            {link.title}
          </a>{' '}
        </li>
      ))}
    </ul>
  );
};

export default SchoolSurvival;
