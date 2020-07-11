import React from 'react';
import './styles.scss';

interface ListProps {
  title?: string;
  data: {
    title: string;
    link: string;
  }[];
}

const List: React.FC<ListProps> = ({ title, data }: ListProps) => {
  const header = !title ? undefined : <div className="listHeader">{title}</div>;
  return (
    <div className="list">
      {header}

      <div className="listView">
        <ul>
          {data.map((entry, index) => {
            return (
              <li key={index} className="listChild">
                <a href={entry.link}>{entry.title}</a>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default List;
