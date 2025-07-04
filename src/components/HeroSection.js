import React from 'react';
import './HeroSection.css';

const HeroSection = ({ onStartLearning, onBrowseUnits, darkMode }) => (
  <section className={`hero-section${darkMode ? ' dark' : ''}`}>
    <div className="hero-content">
      <h1 className="hero-title">
        Learn Calculus AB Visually, Intuitively, and at Your Pace
      </h1>
      <p className="hero-subtitle">
        A free, modern course that turns textbook topics into real understanding.
      </p>
      <div className="hero-cta-buttons">
        <button className="hero-btn primary" onClick={onStartLearning}>
          <span role="img" aria-label="book">📘</span> Start Learning
        </button>
        <button className="hero-btn secondary" onClick={onBrowseUnits}>
          <span role="img" aria-label="folder">📂</span> Browse All Units
        </button>
      </div>
      <div className="hero-svg">
        {/* Placeholder SVG: animated function curve */}
        <svg width="320" height="100" viewBox="0 0 320 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,80 Q80,10 160,80 T320,80" stroke="#5b6ee1" strokeWidth="4" fill="none">
            <animate attributeName="d" values="M0,80 Q80,10 160,80 T320,80;M0,80 Q80,40 160,20 T320,80;M0,80 Q80,10 160,80 T320,80" dur="3s" repeatCount="indefinite" />
          </path>
          <circle cx="160" cy="80" r="6" fill="#7c88b6">
            <animate attributeName="cy" values="80;20;80" dur="3s" repeatCount="indefinite" />
          </circle>
        </svg>
      </div>
    </div>
  </section>
);

export default HeroSection; 