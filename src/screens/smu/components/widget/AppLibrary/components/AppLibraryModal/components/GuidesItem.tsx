import React from 'react';

import { cn } from '@/lib/utils';
import { GridItemMore } from '@/screens/smu/components/widget/AppLibrary/components/GridItemMore';
import {
  GridImage,
  GridText,
} from '@/screens/smu/components/widget/AppLibrary/components/styled';
import Icon from '@/shared/components/Icon';
import { useContent } from '@/shared/contexts/ContentContext';

import GuidesDialog from './GuidesDialog';
import { getGuidesStatus, toGuideGroups } from './GuidesDialog/guides';

interface Props {
  bookmark: Content.Bookmark;
}

/**
 * The School Guides tile. Opens the guides dialog, or shows as disabled when
 * the private sheet is unavailable or holds no guides.
 */
const GuidesItem: React.FC<Props> = function (props) {
  const { bookmark } = props;
  const { guides, sheetStatus, meta } = useContent();

  const groups = React.useMemo(() => toGuideGroups(guides), [guides]);
  const status = getGuidesStatus(sheetStatus, groups);

  const tileImage = (
    <GridImage $backgroundColor={bookmark.color}>
      <Icon name={bookmark.icon} size={32} />
    </GridImage>
  );

  if (status === 'unavailable') {
    return (
      <div
        role="link"
        aria-disabled="true"
        title={`${bookmark.title} are unavailable right now`}
        className={cn(
          'flex flex-col justify-center items-center',
          'w-4/5 max-w-30 cursor-not-allowed select-none',
          'opacity-50 grayscale'
        )}
      >
        {tileImage}
        <GridText>{bookmark.title}</GridText>
        <span className="text-[0.7rem] leading-tight text-gray-600 dark:text-gray-300">
          Unavailable
        </span>
      </div>
    );
  }

  return (
    <GuidesDialog
      title={bookmark.title}
      groups={groups}
      note={meta.guides_note}
    >
      <GridItemMore role="button" className="w-4/5 max-w-30">
        {tileImage}
        <GridText>{bookmark.title}</GridText>
      </GridItemMore>
    </GuidesDialog>
  );
};

export default GuidesItem;
