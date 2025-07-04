import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './UnitsGridSection.css';

const units = [
  {
    id: '1-limits',
    icon: '∞',
    title: 'Limits and Continuity',
    desc: 'Understand what limits really mean, visually.'
  },
  {
    id: '2-differentiation-definition',
    icon: 'f′',
    title: 'Differentiation: Definition and Fundamental Properties',
    desc: 'Master the power of instantaneous rates of change.'
  },
  {
    id: '3-differentiation-composite',
    icon: '📈',
    title: 'Differentiation: Composite, Implicit, and Inverse Functions',
    desc: 'Advanced differentiation techniques for complex functions.'
  },
  {
    id: '4-contextual-applications',
    icon: '🌍',
    title: 'Contextual Applications of Differentiation',
    desc: 'Apply derivatives to real-world problems and scenarios.'
  },
  {
    id: '5-analytical-applications',
    icon: '📊',
    title: 'Analytical Applications of Differentiation',
    desc: 'Use derivatives for function analysis and optimization.'
  },
  {
    id: '6-integration-accumulation',
    icon: '∫',
    title: 'Integration and Accumulation of Change',
    desc: 'Discover the beautiful connection between area and antiderivatives.'
  },
  {
    id: '7-differential-equations',
    icon: 'dy/dx',
    title: 'Differential Equations',
    desc: 'Visualize how functions grow and change over time.'
  },
  {
    id: '8-applications-integration',
    icon: '🔄',
    title: 'Applications of Integration',
    desc: 'Use integrals to find volumes, work, and more.'
  }
];

const UnitsGridSection = ({ darkMode, user, setShowAuth, setAuthMessage }) => {
  const navigate = useNavigate();
  const handleStart = (unitId) => {
    if (user) {
      navigate(`/units/${unitId}`);
    } else {
      setAuthMessage && setAuthMessage('You must sign in to access this course content!');
      setShowAuth && setShowAuth(true);
    }
  };
  return (
    <section className={`units-grid-section${darkMode ? ' dark' : ''}`} id="units">
      <h2 className="units-title">Course Units</h2>
      <div className="units-grid">
        {units.map((unit) => (
          <div className="unit-card" key={unit.title}>
            <div className="unit-icon">{unit.icon}</div>
            <div className="unit-name">{unit.title}</div>
            <div className="unit-desc">{unit.desc}</div>
            {user ? (
              <Link className="unit-btn" to={`/units/${unit.id}`}>
                Start
              </Link>
            ) : (
              <button className="unit-btn" onClick={() => handleStart(unit.id)}>
                Start
              </button>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default UnitsGridSection; 