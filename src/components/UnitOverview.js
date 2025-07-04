import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './UnitOverview.css';

const UnitOverview = ({ unitId, onBack, onLessonClick, darkMode, onContinue }) => {
  const [unitData, setUnitData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUnitData = async () => {
      try {
        setLoading(true);
        const url = `/content/units/${unitId}/unit-overview.json`;
        console.log('Trying to fetch:', url);
        const response = await fetch(url);
        console.log('Response status:', response.status);
        console.log('Response headers:', response.headers);
        
        if (!response.ok) {
          const text = await response.text();
          console.log('Error response text:', text.substring(0, 200));
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        console.log('Successfully loaded data:', data);
        setUnitData(data);
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUnitData();
  }, [unitId]);

  if (loading) {
    return (
      <div className="unit-overview">
        <div className="unit-loading">Loading unit overview...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="unit-overview">
        <div className="unit-error">Error: {error}</div>
      </div>
    );
  }

  if (!unitData) {
    return (
      <div className="unit-overview">
        <div className="unit-error">Unit not found</div>
      </div>
    );
  }

  return (
    <div className={`unit-overview${darkMode ? ' dark' : ''}`}>
      <div className="unit-header">
        <div className="unit-title-section">
          <div className="unit-navigation">
            <button className="unit-back-btn" onClick={onBack}>
              {unitId === '1-limits' ? '← Back to Units' : '← Back to Previous Unit'}
            </button>
            {onContinue && (
              <button className="unit-continue-btn" onClick={onContinue}>
                {unitId === '1-limits' ? 'Continue to Unit 2 →' : 
                 unitId === '2-differentiation-definition' ? 'Continue to Unit 3 →' :
                 unitId === '3-differentiation-composite' ? 'Continue to Unit 4 →' :
                 unitId === '4-contextual-applications' ? 'Continue to Unit 5 →' :
                 unitId === '5-analytical-applications' ? 'Continue to Unit 6 →' :
                 unitId === '6-integration-accumulation' ? 'Continue to Unit 7 →' :
                 unitId === '7-differential-equations' ? 'Continue to Unit 8 →' :
                 'Back to Units →'}
              </button>
            )}
          </div>
          <div className="unit-icon-large">
            {unitData.icon || '📚'}
          </div>
          <div className="unit-title-info">
            <h1 className="unit-title">{unitData.title}</h1>
            <div className="unit-exam-badge">
              <span className="exam-icon">📊</span>
              <span className="exam-text">AP Exam Weighting: {unitData.examWeighting}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="unit-content">
        {/* Two-column grid for Learning Objectives and Big Ideas */}
        <div className="unit-top-grid">
          <div className="unit-section objectives-card">
            <div className="section-header">
              <span className="section-icon">📘</span>
              <h2 className="section-title">Learning Objectives</h2>
            </div>
            <ul className="objectives-list">
              {unitData.objectives.map((objective, index) => (
                <li key={index} className="objective-item">
                  {objective}
                </li>
              ))}
            </ul>
          </div>

          <div className="unit-section big-ideas-card">
            <div className="section-header">
              <span className="section-icon">💡</span>
              <h2 className="section-title">Big Ideas</h2>
            </div>
            <ul className="big-ideas-list">
              {unitData.bigIdeas.map((idea, index) => (
                <li key={index} className="big-idea-item">
                  {idea}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Lessons */}
        <div className="unit-section">
          <h2 className="section-title">Lessons</h2>
          <div className="lessons-grid">
            {unitData.lessons.map((lesson, index) => (
              <div key={index} className="lesson-card">
                <div className="lesson-header">
                  <span className="lesson-number">Lesson {index + 1}</span>
                </div>
                <h3 className="lesson-title">{lesson.title}</h3>
                <p className="lesson-description">{lesson.description}</p>
                <button 
                  className="lesson-btn"
                  onClick={() => navigate(`/units/${unitId}/lessons/${lesson.id}`)}
                >
                  Start Lesson
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnitOverview; 