import React from 'react';
import './CurriculumSection.css';

const units = [
  { emoji: '∞', title: 'Limits & Continuity', desc: 'Understand what limits really mean, visually.' },
  { emoji: 'f′', title: 'Derivatives: Rules & Basics', desc: 'Master the power of instantaneous rates of change.' },
  { emoji: '📈', title: 'Applications of Derivatives', desc: 'Solve real-world problems with derivative techniques.' },
  { emoji: '∫', title: 'Integrals: Antiderivatives & Area', desc: 'Discover the beautiful connection between area and antiderivatives.' },
  { emoji: '🔄', title: 'Applications of Integrals', desc: 'Use integrals to find volumes, work, and more.' },
  { emoji: 'dy/dx', title: 'Differential Equations & Slope Fields', desc: 'Visualize how functions grow and change over time.' },
  { emoji: '🎯', title: 'Final Review & Practice', desc: 'Master the AP exam with targeted practice.' },
];

const CurriculumSection = ({ loggedIn, onSignUp }) => (
  <section className="curriculum-section" id="curriculum">
    <h2>Curriculum</h2>
    <div className="units-grid">
      {units.map((unit, idx) => (
        <div className="unit-card" key={unit.title}>
          <div className="unit-emoji">{unit.emoji}</div>
          <div className="unit-title">{unit.title}</div>
          <div className="unit-desc">{unit.desc}</div>
          <button
            className="start-unit-btn"
            onClick={() => {
              if (!loggedIn) onSignUp();
              else window.location.href = `/unit/${idx + 1}`;
            }}
          >
            Start Unit
          </button>
        </div>
      ))}
    </div>
  </section>
);

export default CurriculumSection; 