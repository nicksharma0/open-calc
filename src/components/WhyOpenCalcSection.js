import React from 'react';
import './WhyOpenCalcSection.css';

const features = [
  { icon: '🔍', title: 'Visual Demos of Every Topic', desc: 'Interactive graphs and animations that make abstract concepts click.' },
  { icon: '🎯', title: 'AP Practice Questions', desc: 'Targeted problems that mirror the actual AP Calculus AB exam.' },
  { icon: '💬', title: 'Concept Explanations in Plain English', desc: 'No confusing jargon—just clear, intuitive explanations.' },
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