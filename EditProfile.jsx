import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateProfile } from 'firebase/auth';
import { ref, update, get } from 'firebase/database';
import { auth, realtimeDb } from '../firebase';
import './EditProfile.css';

const EditProfile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    studentName: '',
    email: '',
    college: '',
    course: '',
    pinNumber: '',
    phoneNumber: '',
    dateOfBirth: ''
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (auth.currentUser) {
          const userRef = ref(realtimeDb, `users/${auth.currentUser.uid}`);
          const snapshot = await get(userRef);
          
          if (snapshot.exists()) {
            setUserData(snapshot.val());
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError('Failed to load profile data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      // Update Firebase Auth profile
      await updateProfile(auth.currentUser, {
        displayName: userData.studentName
      });

      // Update Realtime Database
      const updates = {};
      updates[`users/${auth.currentUser.uid}`] = userData;
      await update(ref(realtimeDb), updates);

      setIsSuccess(true);
      setTimeout(() => navigate('/dashboard'), 1500);
    } catch (error) {
      console.error("Error updating profile:", error);
      if (error.code === 'PERMISSION_DENIED') {
        setError('You do not have permission to update this profile');
      } else {
        setError('Error updating profile: ' + error.message);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="edit-profile-page">
        <div className="edit-profile-card">
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Loading profile data...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="edit-profile-page">
      <div className="edit-profile-card">
        <h2>Edit Profile</h2>
        
        {error && <div className="error-message">{error}</div>}
        {isSuccess && <div className="success-message">Profile updated successfully!</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              name="studentName"
              value={userData.studentName || ''}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={userData.email || ''}
              onChange={handleChange}
              required
              disabled
            />
          </div>

          <div className="form-group">
            <label>College</label>
            <input
              type="text"
              name="college"
              value={userData.college || ''}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Course</label>
            <input
              type="text"
              name="course"
              value={userData.course || ''}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>PIN Number</label>
            <input
              type="text"
              name="pinNumber"
              value={userData.pinNumber || ''}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="tel"
              name="phoneNumber"
              value={userData.phoneNumber || ''}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Date of Birth</label>
            <input
              type="date"
              name="dateOfBirth"
              value={userData.dateOfBirth || ''}
              onChange={handleChange}
            />
          </div>

          <div className="form-actions">
            <button 
              type="button" 
              className="cancel-btn"
              onClick={() => navigate('/dashboard')}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="submit-btn"
              disabled={isLoading}
            >
              {isLoading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;