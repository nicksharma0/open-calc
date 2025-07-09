import React from 'react';
import './WhyOpenCalcSection.css';

const features = [
  { icon: '📚', title: 'Complete AP Calculus AB Course', desc: 'All 8 units covering every topic from limits to integration with detailed lessons.' },
  { icon: '💡', title: 'Clear Concept Explanations', desc: 'No confusing jargon—just clear, intuitive explanations in plain English.' },
  { icon: '🌙', title: 'Dark Mode & Modern Design', desc: 'Beautiful, responsive interface that adapts to your preferences.' },
  { icon: '✍️', title: 'Built by Students, for Students', desc: 'Created by someone who actually went through the struggle.' },
];

const WhyOpenCalcSection = () => (
  <section className="why-opencalc-section">
    <h2>Why OpenCalc?</h2>
    <div className="features-row">
      {features.map((f) => (
        <div className="feature-col" key={f.title}>
          <div className="feature-icon">{f.icon}</div>
          <div className="feature-title">{f.title}</div>
          <div className="feature-desc">{f.desc}</div>
        </div>
      ))}
    </div>
  </section>
);

export default WhyOpenCalcSection; 