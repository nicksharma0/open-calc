import React, { useState } from 'react';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';
import './AuthForm.css';

const AuthForm = ({ onAuth, message }) => {
  const [mode, setMode] = useState('login'); // 'login' or 'signup'
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [wantsEmails, setWantsEmails] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (mode === 'signup') {
        const userCred = await createUserWithEmailAndPassword(auth, email, password);
        if (name) {
          await updateProfile(userCred.user, { displayName: name });
        }
        // Store email preference in Firestore
        await setDoc(doc(db, 'users', userCred.user.uid), {
          wantsEmails: wantsEmails,
          email: userCred.user.email,
          name: name
        }, { merge: true });
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      if (onAuth) onAuth();
    } catch (err) {
      setError(err.message.replace('Firebase: ', ''));
    }
    setLoading(false);
  };

  return (
    <div className="auth-form-wrapper">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>{mode === 'signup' ? 'Sign Up' : 'Log In'}</h2>
        {message && <div className="auth-message">{message}</div>}
        {mode === 'signup' && (
          <>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
            <label className="auth-checkbox-label">
              <input
                type="checkbox"
                checked={wantsEmails}
                onChange={e => setWantsEmails(e.target.checked)}
              />
              I want to receive emails from OpenCalc about updates and news
            </label>
          </>
        )}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        {error && <div className="auth-error">{error}</div>}
        <button type="submit" disabled={loading}>
          {loading ? 'Loading...' : (mode === 'signup' ? 'Sign Up' : 'Log In')}
        </button>
        <div className="auth-switch">
          {mode === 'signup' ? (
            <>
              Already have an account?{' '}
              <span onClick={() => setMode('login')}>Log In</span>
            </>
          ) : (
            <>
              New here?{' '}
              <span onClick={() => setMode('signup')}>Sign Up</span>
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default AuthForm; 