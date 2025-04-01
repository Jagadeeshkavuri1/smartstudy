import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  signOut, 
  onAuthStateChanged, 
} from 'firebase/auth';
import { ref, get } from 'firebase/database';
import { auth, realtimeDb } from '../firebase';
import './Dashboard.css';
import { FaSun, FaMoon, FaUserCircle, FaChevronDown, FaCrown, FaFileAlt, FaEnvelope, FaComment } from 'react-icons/fa';

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [studentDetails, setStudentDetails] = useState(null);
  const [isPremiumUser, setIsPremiumUser] = useState(false);
  const [showPremiumMessage, setShowPremiumMessage] = useState(false);

  // Toggle dark/light mode
  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    document.body.classList.toggle('dark-mode', newMode);
    localStorage.setItem('darkMode', newMode);
  };

  // Fetch student details from Realtime DB
  useEffect(() => {
    const fetchStudentDetails = async () => {
      if (user) {
        try {
          const studentRef = ref(realtimeDb, `users/${user.uid}`);
          const snapshot = await get(studentRef);
          if (snapshot.exists()) {
            const data = snapshot.val();
            setStudentDetails(data);
            setIsPremiumUser(data?.isPremium || false);
          }
        } catch (error) {
          console.error("Error fetching student details:", error);
        }
      }
    };

    fetchStudentDetails();
  }, [user]);

  // Auth state listener and theme initialization
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        navigate('/login', { replace: true });
      }
      setIsLoading(false);
    });

    // Initialize theme from localStorage
    const savedMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedMode);
    document.body.classList.toggle('dark-mode', savedMode);

    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login', { replace: true });
    } catch (error) {
      console.error("Error signing out:", error.message);
    }
  };

  const handlePremiumClick = () => {
    setShowPremiumMessage(true);
    setTimeout(() => setShowPremiumMessage(false), 3000);
  };

  if (isLoading) {
    return (
      <div className="dashboard-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  const displayName = studentDetails?.studentName || user?.displayName || 'Student';

  return (
    <div className={`dashboard-container ${darkMode ? 'dark-mode' : ''}`}>
      <header className="dashboard-header">
        <div className="header-content">
          <h1 className="welcome-message">Welcome, {displayName}</h1>
          
          <div className="header-controls">
            <button 
              onClick={toggleDarkMode} 
              className="theme-toggle"
              aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              data-testid="theme-toggle"
            >
              {darkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
            </button>
            
            <div className="profile-dropdown">
              <button 
                className="profile-btn"
                onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                aria-expanded={showProfileDropdown}
                aria-label="User profile dropdown"
              >
                <FaUserCircle size={28} />
                <FaChevronDown 
                  size={14} 
                  className={`dropdown-arrow ${showProfileDropdown ? 'open' : ''}`}
                />
              </button>
              
              {showProfileDropdown && (
                <div className="dropdown-content" data-testid="profile-dropdown">
                  <div className="profile-header">
                    <FaUserCircle size={48} className="profile-icon" />
                    <h3 className="profile-name">{displayName}</h3>
                    <p className="profile-email">{user?.email}</p>
                  </div>
                  
                  {studentDetails && (
                    <div className="student-details">
                      <div className="detail-item">
                        <span className="detail-label">College:</span>
                        <span className="detail-value">{studentDetails.college || 'N/A'}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Course:</span>
                        <span className="detail-value">{studentDetails.course || 'N/A'}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">PIN Number:</span>
                        <span className="detail-value">{studentDetails.pinNumber || 'N/A'}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Phone Number:</span>
                        <span className="detail-value">{studentDetails.phoneNumber || 'N/A'}</span>
                      </div>
                    </div>
                  )}
                  
                  <div className="dropdown-actions">
                    <button 
                      onClick={() => {
                        navigate('/profile/edit');
                        setShowProfileDropdown(false);
                      }}
                      className="dropdown-btn edit-profile"
                    >
                      Edit Profile
                    </button>
                    <button 
                      onClick={handleLogout}
                      className="dropdown-btn logout"
                      aria-label="Logout"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="dashboard-main">
        <div className="dashboard-layout">
          <div className="sidebar-buttons">
            {/* Existing Buttons */}
            <button 
              className="sidebar-btn" 
              onClick={() => navigate('/courses')}
              style={{
                backgroundColor: '#4CAF50',
                color: 'white',
                padding: '12px 20px',
                borderRadius: '4px',
                border: 'none',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: 'bold',
                margin: '8px 0',
                width: '100%',
                textAlign: 'left',
                transition: 'background-color 0.3s'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#45a049'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#4CAF50'}
            >
              <FaFileAlt style={{ marginRight: '8px' }} />
              Courses
            </button>
            
            <button 
              className="sidebar-btn" 
              onClick={() => navigate('/materials')}
              style={{
                backgroundColor: '#4B5EAA',
                color: 'white',
                padding: '12px 20px',
                borderRadius: '4px',
                border: 'none',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: 'bold',
                margin: '8px 0',
                width: '100%',
                textAlign: 'left',
                transition: 'background-color 0.3s'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#3a4a85'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#4B5EAA'}
            >
              <FaFileAlt style={{ marginRight: '8px' }} />
              Materials
            </button>
            
            <button 
              className="sidebar-btn premium-btn"
              onClick={handlePremiumClick}
              style={{
                backgroundColor: '#FF9800',
                color: 'white',
                padding: '12px 20px',
                borderRadius: '4px',
                border: 'none',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: 'bold',
                margin: '8px 0',
                width: '100%',
                textAlign: 'left',
                transition: 'background-color 0.3s',
                position: 'relative'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#e68a00'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#FF9800'}
            >
              <FaCrown style={{ marginRight: '8px' }} />
              Premium Features
              {isPremiumUser && (
                <span 
                  className="active-premium-badge"
                  style={{
                    position: 'absolute',
                    right: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    padding: '2px 8px',
                    borderRadius: '10px',
                    fontSize: '12px',
                    fontWeight: 'bold'
                  }}
                >
                  Active
                </span>
              )}
            </button>

            {/* New Buttons */}
            <button 
              className="sidebar-btn" 
              onClick={() => navigate('/model-papers')}
              style={{
                backgroundColor: '#9C27B0',
                color: 'white',
                padding: '12px 20px',
                borderRadius: '4px',
                border: 'none',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: 'bold',
                margin: '8px 0',
                width: '100%',
                textAlign: 'left',
                transition: 'background-color 0.3s'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#7B1FA2'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#9C27B0'}
            >
              <FaFileAlt style={{ marginRight: '8px' }} />
              Model Papers
            </button>
            
            <button 
              className="sidebar-btn" 
              onClick={() => navigate('/contact-us')}
              style={{
                backgroundColor: '#2196F3',
                color: 'white',
                padding: '12px 20px',
                borderRadius: '4px',
                border: 'none',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: 'bold',
                margin: '8px 0',
                width: '100%',
                textAlign: 'left',
                transition: 'background-color 0.3s'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#1976D2'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#2196F3'}
            >
              <FaEnvelope style={{ marginRight: '8px' }} />
              Contact Us
            </button>
            
            <button 
              className="sidebar-btn" 
              onClick={() => navigate('/feedback')}
              style={{
                backgroundColor: '#FF5722',
                color: 'white',
                padding: '12px 20px',
                borderRadius: '4px',
                border: 'none',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: 'bold',
                margin: '8px 0',
                width: '100%',
                textAlign: 'left',
                transition: 'background-color 0.3s'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#E64A19'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#FF5722'}
            >
              <FaComment style={{ marginRight: '8px' }} />
              Feedback
            </button>
          </div>
          
          <section className="dashboard-content">
            <div className="content-section">
              <h2 style={{ color: darkMode ? '#fff' : '#000' }}>Your Dashboard</h2>
              <p style={{ color: darkMode ? '#ddd' : '#000' }}>Welcome to your student portal. Here you can access all your academic information.</p>
              
              {showPremiumMessage && (
                <div 
                  className="premium-message"
                  style={{
                    backgroundColor: darkMode ? '#333' : '#f8f9fa',
                    borderLeft: '4px solid #FF9800',
                    padding: '16px',
                    margin: '20px 0',
                    borderRadius: '4px',
                    color: darkMode ? '#fff' : '#333',
                    animation: 'fadeIn 0.3s ease-in-out'
                  }}
                >
                  <h3 style={{ marginTop: 0, color: '#FF9800' }}>Premium Features Coming Soon!</h3>
                  <p>We're working hard to bring you exclusive premium features. Stay tuned!</p>
                </div>
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;