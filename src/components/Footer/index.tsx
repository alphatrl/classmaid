import React from 'react';
import './styles.scss';

export const Footer = ():JSX.Element => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="copyrights">&copy; {currentYear} SMU Shortcuts</div>
      <div className="linkView">
        <a href="/" className="link">
          Links
        </a>
        <a href="/" className="link">
          About
        </a>
      </div>
    </footer>
  );
};
