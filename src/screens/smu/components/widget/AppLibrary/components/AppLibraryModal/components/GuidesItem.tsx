import React from 'react';

import { cn } from '@/lib/utils';
import {
  GridImage,
  GridText,
} from '@/screens/smu/components/widget/AppLibrary/components/styled';
import Icon from '@/shared/components/Icon';

interface Props {
  bookmark: Content.Bookmark;
}

/** The School Guides tile. Disabled while the guides cannot be shown. */
const GuidesItem: React.FC<Props> = function (props) {
  const { bookmark } = props;

  return (
    <div
      role="link"
      aria-disabled="true"
      title="School Guides are unavailable right now"
      className={cn(
        'flex flex-col justify-center items-center',
        'w-4/5 max-w-30 cursor-not-allowed select-none',
        'opacity-50 grayscale'
      )}
    >
      <GridImage $backgroundColor={bookmark.color}>
        <Icon name={bookmark.icon} size={32} />
      </GridImage>
      <GridText>{bookmark.title}</GridText>
      <span className="text-[0.7rem] leading-tight text-gray-600 dark:text-gray-300">
        Unavailable
      </span>
    </div>
  );
};

export default GuidesItem;
