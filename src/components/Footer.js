import React from 'react';
import './Footer.css';

const Footer = ({ darkMode }) => (
  <footer className={`footer${darkMode ? ' dark' : ''}`}>
    <div className="footer-links">
      <a href="mailto:contact.opencalc@gmail.com">contact.opencalc@gmail.com</a>
    </div>
    <div className="footer-copy">&copy; {new Date().getFullYear()} OpenCalc</div>
  </footer>
);

export default Footer; 