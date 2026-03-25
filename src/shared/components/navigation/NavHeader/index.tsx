import classnames from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

import MoreButton from './components/MoreButton';

const NavBar: React.FC = function () {
  const { pathname } = useRouter();

  // NOTE: (amos@taskade.com) Capture the first part of the path "/X" in "/X/Y"
  const match = pathname.match(/\/[^/]+/);
  const redirectUrl = match?.[0] ?? '/';

  return (
    <div
      className={classnames(
        'w-full min-h-16 box-border fixed top-0 z-2',
        'pt-[max(8px,env(safe-area-inset-top))] pb-2',
        'pl-[max(16px,env(safe-area-inset-left))] pr-[max(16px,env(safe-area-inset-right))]',
        'bg-black/55 backdrop-blur-md backdrop-saturate-86',
        'flex items-center justify-between'
      )}
    >
      <Link href={redirectUrl} className="no-underline">
        <h1 className="m-0 text-white font-semibold text-xl py-1">Classmaid</h1>
      </Link>
      <MoreButton />
    </div>
  );
};

export default NavBar;
