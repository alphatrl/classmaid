import classnames from 'classnames';
import React from 'react';

import NavHeader from '../navigation/NavHeader';
import SEO from '../SEO';

interface Props {
  title?: string;
}

const DefaultLayout: React.FC<React.PropsWithChildren<Props>> = function (
  props
) {
  const { title = 'Classmaid', children } = props;

  return (
    <div
      className={classnames(
        'w-full h-dvh flex flex-row',
        'md:max-lg:h-auto max-md:h-auto'
      )}
    >
      <SEO title={title} />
      <main className="flex flex-col flex-1">
        <NavHeader />
        <div className="mt-[calc(64px+env(safe-area-inset-top))]">
          {children}
        </div>
      </main>
    </div>
  );
};

export default DefaultLayout;
