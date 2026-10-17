import React from 'react';

import { cn } from '@/lib/utils';
import {
  GridImage,
  GridText,
} from '@/screens/smu/components/widget/AppLibrary/components/styled';
import Icon from '@/shared/components/Icon';

import GuidesItem from './GuidesItem';
import useInternalApps from '../hooks/useInternalApps';

interface Props {
  bookmark: Content.Bookmark;
}

const AppItem: React.FC<Props> = function (props) {
  const { bookmark } = props;

  const { render: renderInternalApps } = useInternalApps({ bookmark });

  if (bookmark.type === 'internal') {
    return renderInternalApps();
  }

  if (bookmark.type === 'guides') {
    return <GuidesItem bookmark={bookmark} />;
  }

  return (
    <a
      href={bookmark.link}
      target="_blank"
      rel="noopener noreferrer"
      title={bookmark.description}
      className={cn(
        'flex flex-col justify-center items-center',
        'no-underline cursor-pointer w-4/5 max-w-30',
        'transition-all duration-100 ease-in hover:scale-105'
      )}
    >
      <GridImage $backgroundColor={bookmark.color}>
        <Icon name={bookmark.icon} size={32} />
      </GridImage>
      <GridText>{bookmark.title}</GridText>
    </a>
  );
};

export default AppItem;
