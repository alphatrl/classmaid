import React from 'react';

import { ToolTipsWrapper } from './styled';

interface Props {
  description: string;
}

const ToolTips: React.FC<Props> = (props) => {
  const { description } = props;
  return <ToolTipsWrapper>{description}</ToolTipsWrapper>;
};

export default ToolTips;
