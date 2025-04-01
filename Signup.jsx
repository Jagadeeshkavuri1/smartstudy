import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { ref, set } from 'firebase/database';
import { auth, realtimeDb } from '../firebase';
import './Signup.css';

const Signup = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    studentName: '',
    pinNumber: '',
    education: '',
    course: '',
    college: '',
    dateOfBirth: '',
    phoneNumber: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [firebaseError, setFirebaseError] = useState('');

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
    if (!formData.studentName.trim()) newErrors.studentName = 'Student name is required';
    if (!formData.pinNumber.trim()) newErrors.pinNumber = 'PIN number is required';
    if (!formData.education.trim()) newErrors.education = 'Education is required';
    if (!formData.course.trim()) newErrors.course = 'Course is required';
    if (!formData.college.trim()) newErrors.college = 'College is required';
    if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
    if (!formData.phoneNumber.trim()) newErrors.phoneNumber = 'Phone number is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setFirebaseError('');

    try {
      // 1. Create auth user
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCredential.user;

      // 2. Save ALL user data to Realtime Database
      await set(ref(realtimeDb, `users/${user.uid}`), {
        studentName: formData.studentName,
        pinNumber: formData.pinNumber,
        education: formData.education,
        course: formData.course,
        college: formData.college,
        dateOfBirth: formData.dateOfBirth,
        phoneNumber: formData.phoneNumber,
        email: formData.email,
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString() // Adding last login timestamp
      });

      setIsAuthenticated(true);
      navigate('/dashboard', { replace: true });

    } catch (error) {
      console.error("Signup error:", error);
      setFirebaseError(getFirebaseErrorMessage(error.code));
      
      // If auth succeeds but DB fails, delete the auth user to maintain consistency
      if (auth.currentUser) {
        try {
          await auth.currentUser.delete();
        } catch (deleteError) {
          console.error("Error cleaning up auth user:", deleteError);
        }
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const getFirebaseErrorMessage = (code) => {
    switch (code) {
      case 'auth/email-already-in-use':
        return 'Email is already registered';
      case 'auth/invalid-email':
        return 'Invalid email address';
      case 'auth/weak-password':
        return 'Password should be at least 6 characters';
      case 'auth/operation-not-allowed':
        return 'Email/password accounts are not enabled';
      default:
        return 'Signup failed. Please try again';
    }
  };

  return (
    <div className="fullscreen-container">
      <h1 className="black-heading">Student Signup Form</h1>
      
      <div className="signup-form-wrapper">
        {firebaseError && (
          <div className="error-message" style={{ marginBottom: '1rem' }}>
            {firebaseError}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          {/* Student Name */}
          <div className={`form-group ${errors.studentName ? 'has-error' : ''}`}>
            <label htmlFor="studentName">Student Name</label>
            <input
              id="studentName"
              type="text"
              name="studentName"
              value={formData.studentName}
              onChange={handleChange}
              required
            />
            {errors.studentName && <span className="error-message">{errors.studentName}</span>}
          </div>

          {/* PIN Number */}
          <div className={`form-group ${errors.pinNumber ? 'has-error' : ''}`}>
            <label htmlFor="pinNumber">PIN Number</label>
            <input
              id="pinNumber"
              type="text"
              name="pinNumber"
              value={formData.pinNumber}
              onChange={handleChange}
              required
            />
            {errors.pinNumber && <span className="error-message">{errors.pinNumber}</span>}
          </div>

          {/* Education */}
          <div className={`form-group ${errors.education ? 'has-error' : ''}`}>
            <label htmlFor="education">Education</label>
            <input
              id="education"
              type="text"
              name="education"
              value={formData.education}
              onChange={handleChange}
              required
            />
            {errors.education && <span className="error-message">{errors.education}</span>}
          </div>

          {/* Course */}
          <div className={`form-group ${errors.course ? 'has-error' : ''}`}>
            <label htmlFor="course">Course</label>
            <input
              id="course"
              type="text"
              name="course"
              value={formData.course}
              onChange={handleChange}
              required
            />
            {errors.course && <span className="error-message">{errors.course}</span>}
          </div>

          {/* College */}
          <div className={`form-group ${errors.college ? 'has-error' : ''}`}>
            <label htmlFor="college">College</label>
            <input
              id="college"
              type="text"
              name="college"
              value={formData.college}
              onChange={handleChange}
              required
            />
            {errors.college && <span className="error-message">{errors.college}</span>}
          </div>

          {/* Date of Birth */}
          <div className={`form-group ${errors.dateOfBirth ? 'has-error' : ''}`}>
            <label htmlFor="dateOfBirth">Date of Birth</label>
            <input
              id="dateOfBirth"
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              required
            />
            {errors.dateOfBirth && <span className="error-message">{errors.dateOfBirth}</span>}
          </div>

          {/* Phone Number */}
          <div className={`form-group ${errors.phoneNumber ? 'has-error' : ''}`}>
            <label htmlFor="phoneNumber">Phone Number</label>
            <input
              id="phoneNumber"
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
            {errors.phoneNumber && <span className="error-message">{errors.phoneNumber}</span>}
          </div>

          {/* Email */}
          <div className={`form-group ${errors.email ? 'has-error' : ''}`}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          {/* Password */}
          <div className={`form-group ${errors.password ? 'has-error' : ''}`}>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>

          {/* Confirm Password */}
          <div className={`form-group ${errors.confirmPassword ? 'has-error' : ''}`}>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
          </div>

          <button 
            type="submit" 
            className="submit-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Creating Account...' : 'Submit'}
          </button>
        </form>

        <p className="login-link">
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;