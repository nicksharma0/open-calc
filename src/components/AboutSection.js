import React from 'react';
import './AboutSection.css';

const AboutSection = ({ darkMode }) => (
  <section className={`about-section${darkMode ? ' dark' : ''}`} id="about">
    <h2 className="about-title">About the Creator</h2>
    <div className="about-content">
      <div className="profile-pic-wrapper">
        <img className="profile-pic" src={`${process.env.PUBLIC_URL}/profile-placeholder.jpg`} alt="Nick Sharma profile" />
      </div>
      <p>
        "I was fortunate enough to have amazing math teachers in high school, but I know that not everyone has that experience."
      </p>
      <p>
        <strong>Nick Sharma</strong> &mdash; Texas A&amp;M University '29<br/>
        My mission: Make calculus visual, intuitive, and free for every student.
      </p>
    </div>
  </section>
);

export default AboutSection; 