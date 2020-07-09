import * as React from 'react';

interface IconProps {
  fill?: string;
  height?: string | number;
  width?: string | number;
}

export const Book: React.FC<IconProps> = ({ fill, width, height }: IconProps) => {
  return (
    <svg viewBox="0 0 24 24" fill={fill} width={width} height={height}>
      <g fill="none">
        <path d="M0 0h24v24H0z" />
        <path d="M0 0h24v24H0z" />
      </g>
      <path d="M17.5 4.5c-1.95 0-4.05.4-5.5 1.5-1.45-1.1-3.55-1.5-5.5-1.5-1.45 0-2.99.22-4.28.79C1.49 5.62 1 6.33 1 7.14v11.28c0 1.3 1.22 2.26 2.48 1.94.98-.25 2.02-.36 3.02-.36 1.56 0 3.22.26 4.56.92.6.3 1.28.3 1.87 0 1.34-.67 3-.92 4.56-.92 1 0 2.04.11 3.02.36 1.26.33 2.48-.63 2.48-1.94V7.14c0-.81-.49-1.52-1.22-1.85-1.28-.57-2.82-.79-4.27-.79zM21 17.23c0 .63-.58 1.09-1.2.98-.75-.14-1.53-.2-2.3-.2-1.7 0-4.15.65-5.5 1.5V8c1.35-.85 3.8-1.5 5.5-1.5.92 0 1.83.09 2.7.28.46.1.8.51.8.98v9.47z" />
      <path d="M13.98 11.01c-.32 0-.61-.2-.71-.52-.13-.39.09-.82.48-.94 1.54-.5 3.53-.66 5.36-.45.41.05.71.42.66.83-.05.41-.42.71-.83.66-1.62-.19-3.39-.04-4.73.39-.08.01-.16.03-.23.03zM13.98 13.67c-.32 0-.61-.2-.71-.52-.13-.39.09-.82.48-.94 1.53-.5 3.53-.66 5.36-.45.41.05.71.42.66.83-.05.41-.42.71-.83.66-1.62-.19-3.39-.04-4.73.39a.97.97 0 01-.23.03zM13.98 16.33c-.32 0-.61-.2-.71-.52-.13-.39.09-.82.48-.94 1.53-.5 3.53-.66 5.36-.45.41.05.71.42.66.83-.05.41-.42.7-.83.66-1.62-.19-3.39-.04-4.73.39a.97.97 0 01-.23.03z" />
    </svg>
  );
};

export const Umbrella: React.FC<IconProps> = ({ fill, width, height }: IconProps) => {
  return (
    <svg viewBox="0 0 24 24" fill={fill} width={width} height={height}>
      <path d="M0 0h24v24H0V0z" fill="none" />
      <path d="M13.13 14.56l1.43-1.43 5.73 5.73c.39.39.39 1.03 0 1.43-.39.39-1.03.39-1.43 0l-5.73-5.73zm4.29-5.73l1.27-1.27c.89-.89.77-2.43-.31-3.08a10.1 10.1 0 00-12.4 1.47c3.93-1.3 8.31-.25 11.44 2.88zM5.95 5.98c-3.36 3.37-3.85 8.51-1.48 12.4.66 1.08 2.19 1.21 3.08.31l1.27-1.27C5.7 14.29 4.65 9.91 5.95 5.98zm.02-.02l-.01.01c-.38 3.01 1.17 6.88 4.3 10.02l5.73-5.73c-3.13-3.13-7.01-4.68-10.02-4.3z" />
    </svg>
  );
};

export const Wallet: React.FC<IconProps> = ({ fill, width, height }: IconProps) => {
  return (
    <svg viewBox="0 0 24 24" fill={fill} width={width} height={height}>
      <path d="M0 0h24v24H0V0z" fill="none" />
      <path d="M10 16V8a2 2 0 012-2h9V5c0-1.1-.9-2-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2h14c1.1 0 2-.9 2-2v-1h-9a2 2 0 01-2-2zm3-8c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1h9V8h-9zm3 5.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
    </svg>
  );
};

export const Book_2: React.FC<IconProps> = ({ fill, width, height }: IconProps) => {
  return (
    <svg viewBox="0 0 24 24" fill={fill} width={width} height={height}>
      <path d="M0 0h24v24H0V0z" fill="none" />
      <path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z" />
    </svg>
  );
};

export const Print: React.FC<IconProps> = ({ fill, width, height }: IconProps) => {
  return (
    <svg viewBox="0 0 24 24" fill={fill} width={width} height={height}>
      <path d="M0 0h24v24H0V0z" fill="none" />
      <path d="M19 8H5c-1.66 0-3 1.34-3 3v4c0 1.1.9 2 2 2h2v2c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2v-2h2c1.1 0 2-.9 2-2v-4c0-1.66-1.34-3-3-3zm-4 11H9c-.55 0-1-.45-1-1v-4h8v4c0 .55-.45 1-1 1zm4-7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-2-9H7c-.55 0-1 .45-1 1v2c0 .55.45 1 1 1h10c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1z" />
    </svg>
  );
};

export const Work: React.FC<IconProps> = ({ fill, width, height }: IconProps) => {
  return (
    <svg viewBox="0 0 24 24" fill={fill} width={width} height={height}>
      <path d="M0 0h24v24H0V0z" fill="none" />
      <path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z" />
    </svg>
  );
};

export const Bed: React.FC<IconProps> = ({ fill, width, height }: IconProps) => {
  return (
    <svg viewBox="0 0 24 24" fill={fill} width={width} height={height}>
      <g fill="none">
        <path d="M0 0h24v24H0z" />
        <path d="M0 0h24v24H0z" />
      </g>
      <path fill="none" d="M6 7h5v3H6zM13 7h5v3h-5z" />
      <path d="M20 10V7c0-1.1-.9-2-2-2H6c-1.1 0-2 .9-2 2v3c-1.1 0-2 .9-2 2v5h1.33l.51 1.53c.1.28.36.47.66.47a.7.7 0 00.66-.47L5.67 17h12.67l.51 1.53c.09.28.35.47.65.47a.7.7 0 00.66-.47l.51-1.53H22v-5c0-1.1-.9-2-2-2zm-9 0H6V8c0-.55.45-1 1-1h4v3zm7 0h-5V7h4c.55 0 1 .45 1 1v2z" />
    </svg>
  );
};

export const Guide: React.FC<IconProps> = ({ fill, width, height }: IconProps) => {
  return (
    <svg viewBox="0 0 24 24" fill={fill} width={width} height={height}>
      <path d="M0 0h24v24H0V0z" fill="none" />
      <path d="M11.5 2C6.81 2 3 5.81 3 10.5S6.81 19 11.5 19h.5v3c4.86-2.34 8-7 8-11.5C20 5.81 16.19 2 11.5 2zm1 14.5h-2v-2h2v2zm.4-4.78c-.01.01-.02.03-.03.05-.05.08-.1.16-.14.24-.02.03-.03.07-.04.11-.03.07-.06.14-.08.21-.07.21-.1.43-.1.68H10.5c0-.51.08-.94.2-1.3 0-.01 0-.02.01-.03.01-.04.04-.06.05-.1.06-.16.13-.3.22-.44.03-.05.07-.1.1-.15.03-.04.05-.09.08-.12l.01.01c.84-1.1 2.21-1.44 2.32-2.68.09-.98-.61-1.93-1.57-2.13-1.04-.22-1.98.39-2.3 1.28-.14.36-.47.65-.88.65h-.2c-.6 0-1.04-.59-.87-1.17a4.002 4.002 0 014.43-2.79c1.69.25 3.04 1.64 3.33 3.33.44 2.44-1.63 3.03-2.53 4.35z" />
    </svg>
  );
};

export const Chat: React.FC<IconProps> = ({ fill, width, height }: IconProps) => {
  return (
    <svg viewBox="0 0 24 24" fill={fill} width={width} height={height}>
      <path d="M0 0h24v24H0V0z" fill="none" />
      <path d="M20 6h-1v8c0 .55-.45 1-1 1H6v1c0 1.1.9 2 2 2h10l4 4V8c0-1.1-.9-2-2-2zm-3 5V4c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v13l4-4h9c1.1 0 2-.9 2-2z" />
    </svg>
  );
};

export const Missing: React.FC<IconProps> = ({ fill, width, height }: IconProps) => {
  return (
    <svg viewBox="0 0 24 24" fill={fill} width={width} height={height}>
      <path d="M0 0h24v24H0V0z" fill="none" />
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-4h2v2h-2zm1.61-9.96c-2.06-.3-3.88.97-4.43 2.79-.18.58.26 1.17.87 1.17h.2c.41 0 .74-.29.88-.67.32-.89 1.27-1.5 2.3-1.28.95.2 1.65 1.13 1.57 2.1-.1 1.34-1.62 1.63-2.45 2.88 0 .01-.01.01-.01.02-.01.02-.02.03-.03.05-.09.15-.18.32-.25.5-.01.03-.03.05-.04.08-.01.02-.01.04-.02.07-.12.34-.2.75-.2 1.25h2c0-.42.11-.77.28-1.07.02-.03.03-.06.05-.09.08-.14.18-.27.28-.39.01-.01.02-.03.03-.04.1-.12.21-.23.33-.34.96-.91 2.26-1.65 1.99-3.56-.24-1.74-1.61-3.21-3.35-3.47z" />
    </svg>
  );
};

Book.defaultProps = {
  fill: 'black',
  height: 'auto',
  width: 'auto',
};
