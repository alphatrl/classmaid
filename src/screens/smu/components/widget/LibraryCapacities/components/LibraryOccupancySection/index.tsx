import classnames from 'classnames';
import React from 'react';

import Library from './components/Library';
import { KGC_LIBRARY_TEMPLATE, LKS_LIBRARY_TEMPLATE } from './constants';
import { LibraryOccupancyAPI } from './types';

const LibraryOccupancySection: React.FC = function () {
  const [isFetchingOccupancy, setFetchingOccupancy] = React.useState(true);
  const [currentOccupancy, setCurrentOccupancy] = React.useState<
    LibraryOccupancyAPI[]
  >([]);

  const getLibrariesOccupancy = React.useCallback(async () => {
    setFetchingOccupancy(true);
    const response = await fetch('/api/smusg/getLibrariesOccupancy');
    const resJson: LibraryOccupancyAPI[] = await response.json();

    setCurrentOccupancy(resJson);
    setFetchingOccupancy(false);
  }, []);

  React.useEffect(() => {
    getLibrariesOccupancy();
  }, [getLibrariesOccupancy]);

  return (
    <div
      className={classnames(
        'p-4 grid flex-1 gap-4 grid-cols-2',
        "[grid-template-areas:'lks_kgc']",
        "lg:grid-cols-1 lg:[grid-template-areas:'lks'_'kgc']",
        'max-md:p-3 max-md:gap-3'
      )}
    >
      {[LKS_LIBRARY_TEMPLATE, KGC_LIBRARY_TEMPLATE].map((template) => {
        const key = template.key;
        const occupancyInfo =
          currentOccupancy.find((occupancy) => occupancy.key === key) ?? null;

        return (
          <Library
            key={key}
            id={key}
            template={template}
            occupancyInfo={occupancyInfo}
            loading={isFetchingOccupancy}
          />
        );
      })}
    </div>
  );
};

export default LibraryOccupancySection;
