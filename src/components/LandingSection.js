import React from 'react';
import './LandingSection.css';

const LandingSection = ({ onCurriculumClick }) => (
  <section className="landing-section">
    <div className="landing-content">
      <h1 className="platform-name">OpenCalc</h1>
      <p className="tagline">Calculus, Clear and Free.</p>
      <p className="intro">
        OpenCalc is a free, interactive platform designed to help students master AP Calculus AB, built by someone who went through the course.<br/>
        It covers every topic with visual demos, plain-English explanations, and exam-style practice.
      </p>
      <div className="cta-buttons">
        <a href="/signup" className="cta-btn primary">Sign Up Now</a>
        <button className="cta-btn secondary" onClick={onCurriculumClick}>View Curriculum</button>
      </div>
    </div>
  </section>
);

export default LandingSection; 