import type { NextPage } from 'next';
import React from 'react';

import GridLayout from '@/screens/smu/pages/home/components/GridLayout';
import DefaultLayout from '@/shared/components/layouts/DefaultLayout';

export const Home: NextPage = function () {
  return (
    <DefaultLayout title="SMU">
      <GridLayout />
    </DefaultLayout>
  );
};

export default Home;
