import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { ref, get, set } from 'firebase/database';
import { auth, realtimeDb } from '../firebase';
import './Signup.css';

const Login = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [firebaseError, setFirebaseError] = useState('');
  const [showForgotPasswordMessage, setShowForgotPasswordMessage] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    setFirebaseError('');
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.password) newErrors.password = 'Password is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const checkUserRecord = async (userId) => {
    try {
      const userRef = ref(realtimeDb, `users/${userId}`);
      const snapshot = await get(userRef);
      
      if (snapshot.exists()) {
        await set(ref(realtimeDb, `users/${userId}/lastLogin`), new Date().toISOString());
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error checking user record:", error);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setFirebaseError('');

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      
      const hasRecord = await checkUserRecord(userCredential.user.uid);
      
      if (hasRecord) {
        setIsAuthenticated(true);
        navigate('/dashboard', { replace: true });
      } else {
        await auth.signOut();
        setFirebaseError('Account not properly set up. Please sign up first.');
      }
    } catch (error) {
      console.error("Login error:", error);
      setFirebaseError(getFirebaseErrorMessage(error.code));
    } finally {
      setIsLoading(false);
    }
  };

  const getFirebaseErrorMessage = (code) => {
    switch (code) {
      case 'auth/user-not-found':
        return 'No user found with this email';
      case 'auth/wrong-password':
        return 'Incorrect password';
      case 'auth/invalid-email':
        return 'Invalid email address';
      case 'auth/invalid-credential':
        return 'Invalid email or password';
      case 'auth/too-many-requests':
        return 'Too many attempts. Please try again later';
      case 'auth/user-disabled':
        return 'Account disabled. Contact support';
      default:
        return 'Login failed. Please try again';
    }
  };

  const handleForgotPasswordClick = (e) => {
    e.preventDefault();
    setShowForgotPasswordMessage(true);
  };

  return (
    <div className="fullscreen-container" style={{ color: '#000000' }}>
      <h1 className="black-heading" style={{ color: '#000000' }}>Student Login</h1>
      
      <div className="signup-form-wrapper" style={{ color: '#000000' }}>
        {firebaseError && (
          <div className="error-message" style={{ 
            marginBottom: '1rem',
            color: '#ff0000'
          }}>
            {firebaseError}
          </div>
        )}
        
        {showForgotPasswordMessage && (
          <div className="info-message" style={{ 
            marginBottom: '1rem',
            color: '#000000',
            backgroundColor: '#f0f0f0',
            padding: '10px',
            borderRadius: '4px'
          }}>
            This feature is coming soon
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className={`form-group ${errors.email ? 'has-error' : ''}`}>
            <label htmlFor="email" style={{ color: '#000000' }}>Email</label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              autoComplete="username"
              style={{ 
                color: '#ffffff',
                backgroundColor: '#4B5EAA',
                border: errors.email ? '1px solid #ff0000' : '1px solid #ddd',
                padding: '10px',
                borderRadius: '4px',
                width: '100%',
                boxSizing: 'border-box'
              }}
            />
            {errors.email && (
              <span className="error-message" style={{ color: '#ff0000' }}>
                {errors.email}
              </span>
            )}
          </div>

          <div className={`form-group ${errors.password ? 'has-error' : ''}`}>
            <label htmlFor="password" style={{ color: '#000000' }}>Password</label>
            <input
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              autoComplete="current-password"
              style={{ 
                color: '#ffffff',
                backgroundColor: '#4B5EAA',
                border: errors.password ? '1px solid #ff0000' : '1px solid #ddd',
                padding: '10px',
                borderRadius: '4px',
                width: '100%',
                boxSizing: 'border-box'
              }}
            />
            {errors.password && (
              <span className="error-message" style={{ color: '#ff0000' }}>
                {errors.password}
              </span>
            )}
          </div>

          <button 
            type="submit" 
            className="submit-btn"
            disabled={isLoading}
            style={{ 
              backgroundColor: '#4B5EAA',
              color: '#ffffff',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              opacity: isLoading ? 0.7 : 1,
              padding: '10px',
              borderRadius: '4px',
              border: 'none',
              width: '100%',
              fontSize: '16px',
              fontWeight: '500',
              marginTop: '10px'
            }}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="auth-links" style={{ color: '#000000', marginTop: '20px' }}>
          <p className="login-link" style={{ color: '#000000', marginBottom: '10px' }}>
            Don't have an account?{' '}
            <Link 
              to="/signup" 
              style={{ 
                color: '#000000', 
                textDecoration: 'underline',
                fontWeight: '500'
              }}
            >
              Sign up here
            </Link>
          </p>
          <p className="login-link" style={{ color: '#000000' }}>
            <Link 
              to="#" 
              onClick={handleForgotPasswordClick}
              style={{ 
                color: '#000000', 
                textDecoration: 'underline',
                fontWeight: '500'
              }}
            >
              Forgot password?
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
