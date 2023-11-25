import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react';

export const ClassMaidHome: NextPage = function () {
  // NOTE: (hello@amostan.me) Temp redirect to `/smu` page
  // TODO: (hello@amostan.me) Build home page to select different schools
  const { push } = useRouter();

  React.useEffect(() => {
    push('/smu');
  }, [push]);

  return <div></div>;
};

export default ClassMaidHome;
