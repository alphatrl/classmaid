import React from 'react';
import * as Icon from '../images/icons';

export const getIcon = (name?: string) => {
  switch (name) {
    case 'book':
      return <Icon.Book fill="white" width="65%" />;

    case 'umbrella':
      return <Icon.Umbrella fill="white" width="65%" />;

    case 'wallet':
      return <Icon.Wallet fill="white" width="65%" />;

    default:
      return null;
  }
};
