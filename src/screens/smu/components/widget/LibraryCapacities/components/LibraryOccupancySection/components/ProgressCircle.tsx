import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: -8px;
`;

const Circle = styled.circle`
  fill: transparent;
  stroke: ${(props) => props.theme.primary[10]};
  stroke-linecap: round;
`;

const FilledCircle = styled(Circle)`
  stroke: ${(props) => props.theme.primary[50]};
  transform: rotate(-90deg);
  transform-origin: 50% 50%;
  transition: stroke-dashoffset 0.5s ease-out;
`;

interface Props {
  label: string;
  progress: number;
}

const width = 40;
const strokeWidth = 12;
const radius = 100 / 2 - strokeWidth * 2;
const circumference = radius * 2 * Math.PI;

const ProgressCircle: React.FC<Props> = function (props) {
  const { label, progress } = props;
  const offset = circumference - progress * circumference;

  return (
    <Wrapper>
      <svg
        aria-label={label}
        aria-valuemax={100}
        aria-valuemin={0}
        aria-valuenow={Math.round(progress * 100)}
        height={width}
        width={width}
        role="progressbar"
        viewBox="0 0 100 100"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <Circle cx="50" cy="50" r={radius} strokeWidth={strokeWidth} />
        <FilledCircle
          cx="50"
          cy="50"
          r={radius}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={offset}
          strokeWidth={strokeWidth}
        />
      </svg>
    </Wrapper>
  );
};

export default ProgressCircle;
