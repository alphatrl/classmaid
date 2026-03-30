import React from 'react';

interface Props {
  label: string;
  progress: number;
}

const width = 40;
const strokeWidth = 10;
const radius = 100 / 2 - strokeWidth * 2;
const circumference = radius * 2 * Math.PI;

const ProgressCircle: React.FC<Props> = function (props) {
  const { label, progress } = props;
  const offset = circumference - progress * circumference;

  return (
    <div className="relative flex justify-center items-center -ml-2">
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
        <circle
          className="fill-transparent stroke-theme-200 dark:stroke-theme-300"
          cx="50"
          cy="50"
          r={radius}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
        <circle
          className="fill-transparent stroke-theme-500 dark:stroke-theme-600 -rotate-90 origin-center transition-[stroke-dashoffset] duration-500 ease-out"
          cx="50"
          cy="50"
          r={radius}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={offset}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};

export default ProgressCircle;
