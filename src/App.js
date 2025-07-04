import React, { useRef, useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import UnitsGridSection from './components/UnitsGridSection';
import FeaturesSection from './components/FeaturesSection';
import AboutSection from './components/AboutSection';
import Footer from './components/Footer';
import AuthForm from './components/AuthForm';
import ProfilePage from './components/ProfilePage';
import UnitOverview from './components/UnitOverview';
import LessonViewer from './components/LessonViewer';
import { auth } from './firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { Routes, Route, useNavigate, useLocation, useParams } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';

function UnitOverviewRoute({ darkMode }) {
  const navigate = useNavigate();
  const { unitId } = useParams();
  const unitOrder = [
    '1-limits',
    '2-differentiation-definition',
    '3-differentiation-composite',
    '4-contextual-applications',
    '5-analytical-applications',
    '6-integration-accumulation',
    '7-differential-equations',
    '8-applications-integration',
  ];
  const handleBack = () => {
    const idx = unitOrder.indexOf(unitId);
    if (idx > 0) {
      navigate(`/units/${unitOrder[idx - 1]}`);
    } else {
      navigate('/');
    }
  };
  const handleContinue = () => {
    const idx = unitOrder.indexOf(unitId);
    if (idx !== -1 && idx < unitOrder.length - 1) {
      navigate(`/units/${unitOrder[idx + 1]}`);
    } else {
      navigate('/');
    }
  };
  const handleLessonClick = (unitId, lessonId) => {
    // Placeholder for lesson navigation
    // navigate(`/units/${unitId}/lessons/${lessonId}`);
    console.log(`Opening lesson ${lessonId} from unit ${unitId}`);
  };
  return (
    <UnitOverview
      unitId={unitId}
      onBack={handleBack}
      onLessonClick={handleLessonClick}
      onContinue={handleContinue}
      darkMode={darkMode}
    />
  );
}

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const stored = localStorage.getItem('darkMode');
    return stored === 'true';
  });
  const [showAuth, setShowAuth] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [user, setUser] = useState(null);
  const unitsRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const prevLocationRef = useRef('/');
  const [authMessage, setAuthMessage] = useState('');

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, setUser);
    return () => unsub();
  }, []);

  // Store previous location except when navigating to /profile
  useEffect(() => {
    if (location.pathname !== '/profile') {
      prevLocationRef.current = location.pathname + location.search;
    }
  }, [location]);

  const handleStartLearning = () => {
    if (user) {
      navigate('/units/1-limits');
    } else {
      setAuthMessage('You must sign in to access this course content!');
      setShowAuth(true);
    }
  };

  const handleBrowseUnits = () => {
    unitsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleProfileClick = () => navigate('/profile');
  const handleProfileBack = () => {
    navigate(prevLocationRef.current || '/');
  };
  const handleLogout = async () => {
    await signOut(auth);
    navigate('/');
  };

  const handleLogoClick = () => {
    navigate('/');
    setShowProfile(false);
    setShowAuth(false);
  };

  return (
    <div className={`App${darkMode ? ' dark' : ''}`}>
      <Navbar
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode((d) => !d)}
        user={user}
        onProfileClick={handleProfileClick}
        onSignUpClick={() => setShowAuth(true)}
        onLogoClick={handleLogoClick}
      />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <HeroSection
                darkMode={darkMode}
                onStartLearning={handleStartLearning}
                onBrowseUnits={handleBrowseUnits}
              />
              <div ref={unitsRef}>
                <UnitsGridSection 
                  darkMode={darkMode} 
                  user={user}
                  setShowAuth={setShowAuth}
                  setAuthMessage={setAuthMessage}
                />
              </div>
              <FeaturesSection darkMode={darkMode} />
              <AboutSection darkMode={darkMode} />
              <Footer darkMode={darkMode} />
            </>
          }
        />
        <Route path="/units/:unitId" element={
          <ProtectedRoute user={user}>
            <UnitOverviewRoute darkMode={darkMode} />
          </ProtectedRoute>
        } />
        <Route path="/units/:unitId/lessons/:lessonId" element={
          <ProtectedRoute user={user}>
            <LessonViewer darkMode={darkMode} />
          </ProtectedRoute>
        } />
        <Route
          path="/profile"
          element={user ? <ProfilePage user={user} onBack={handleProfileBack} onLogout={handleLogout} /> : null}
        />
      </Routes>
      {showAuth && !user && (
        <div className="auth-modal-bg" onClick={() => { setShowAuth(false); setAuthMessage(''); }}>
          <div className="auth-modal" onClick={e => e.stopPropagation()}>
            <AuthForm onAuth={() => setShowAuth(false)} message={authMessage} />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
