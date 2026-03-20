import classnames from 'classnames';
import Image from 'next/image';
import React from 'react';

import { LibraryData, LibraryOccupancyAPI } from '../types';
import ProgressCircle from './ProgressCircle';

interface Props {
  id: string;
  loading: boolean;
  template: LibraryData;
  occupancyInfo?: LibraryOccupancyAPI | null;
}

const Library: React.FC<Props> = function (props) {
  const { id, template, occupancyInfo, loading } = props;
  const { name, backgroundImage } = template;

  const currentOccupancy = occupancyInfo?.currentOccupancy ?? 0;
  const maxOccupancy = occupancyInfo?.maxOccupancy ?? template.maxOccupancy;

  const {
    fileUrl,
    attribution: { author, license },
  } = backgroundImage;

  return (
    <div
      className="box-border rounded-2xl relative overflow-clip"
      style={{ gridArea: id }}
    >
      <Image
        src={fileUrl}
        alt=""
        fill={true}
        priority={true}
        sizes="(min-width: 300px)"
        className="object-cover"
      />
      {/* Backdrop blur layer — kept separate so backdrop-filter doesn't break parent overflow-clip */}
      <div className="absolute inset-0 rounded-2xl bg-black/25 backdrop-blur-sm backdrop-saturate-80 z-1" />
      <div
        className={classnames(
          'box-border relative h-full p-3 z-2',
          'flex flex-col justify-between'
        )}
      >
        <div>
          <h1 className="m-0 mb-1 text-[1.15em] text-white capitalize">
            {name.toLowerCase()}
          </h1>
          <div className="flex flex-row items-center">
            <ProgressCircle
              label={`${name} Occupancy Level`}
              progress={currentOccupancy / maxOccupancy}
            />
            <p className="m-0 pl-1 text-white text-base font-semibold">
              {loading ? 'Loading' : `${currentOccupancy} / ${maxOccupancy}`}
            </p>
          </div>
        </div>

        <span
          className={classnames(
            'text-[0.65em] text-gray-50',
            '[&_a:link]:text-sky-500 [&_a:link]:dark:text-sky-500'
          )}
        >
          {author}, <a href={license.externalUrl}>{license.type}</a>
          {', '}
          {license.additional}
        </span>
      </div>
    </div>
  );
};

export default Library;
