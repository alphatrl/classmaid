import React from 'react';
import * as Icon from '../images/icons';

export const getIcon = (name?: string): JSX.Element => {
  switch (name) {
    case 'book':
      return <Icon.Book fill="white" width="65%" height="65%" />;

    case 'umbrella':
      return <Icon.Umbrella fill="white" width="65%" height="65%" />;

    case 'wallet':
      return <Icon.Wallet fill="white" width="65%" height="65%" />;

    case 'book_2':
      return <Icon.Book_2 fill="white" width="65%" height="65%" />;

    case 'print':
      return <Icon.Print fill="white" width="65%" height="65%" />;

    case 'work':
      return <Icon.Work fill="white" width="65%" height="65%" />;

    case 'bed':
      return <Icon.Bed fill="white" width="65%" height="65%" />;

    case 'guide':
      return <Icon.Guide fill="white" width="65%" height="65%" />;

    case 'chat':
      return <Icon.Chat fill="white" width="65%" height="65%" />;

    default:
      return <Icon.Missing fill="white" width="65%" height="65%" />;
  }
};
