import React from 'react';
import { redirect } from 'next/navigation';

export const ClassMaidHome: React.FC = function () {
  // NOTE: (hello@amostan.me) Temp redirect to `/smu` page
  // TODO: (hello@amostan.me) Build home page to select different schools
  redirect('/smu');
};

export default ClassMaidHome;
