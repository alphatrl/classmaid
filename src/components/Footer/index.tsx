import React from 'react';
import './styles.scss';

const Footer: React.FC = (): JSX.Element => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="copyrights">&copy; {currentYear} SMU Shortcuts</div>
      <div className="linkView">
        <a href="/" className="link">
          Home
        </a>
        <a href="/about" className="link">
          About
        </a>
      </div>
    </footer>
  );
};

export default Footer;
