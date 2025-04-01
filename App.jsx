import { Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import Home from './Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import EditProfile from './pages/EditProfile';
import Courses from './pages/Courses';
import Materials from './pages/Materials';
import ContactUs from './pages/ContactUs';
import ModelPapers from './pages/ModelPapers';
import Feedback from './pages/Feedback';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });

    const savedMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedMode);
    document.documentElement.classList.toggle('dark-mode', savedMode);

    return () => unsubscribe();
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    document.documentElement.classList.toggle('dark-mode', newMode);
    localStorage.setItem('darkMode', newMode);
  };

  return (
    <div className={`app-container ${darkMode ? 'dark-mode' : ''}`}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route 
          path="/signup" 
          element={
            <div className="route-transition">
              <Signup setIsAuthenticated={setIsAuthenticated} />
            </div>
          } 
        />
        <Route 
          path="/login" 
          element={
            <div className="route-transition">
              <Login setIsAuthenticated={setIsAuthenticated} />
            </div>
          } 
        />
        <Route 
          path="/dashboard" 
          element={
            isAuthenticated ? (
              <div className="route-transition">
                <Dashboard 
                  setIsAuthenticated={setIsAuthenticated} 
                  darkMode={darkMode}
                  toggleDarkMode={toggleDarkMode}
                />
              </div>
            ) : (
              <Navigate to="/login" replace />
            )
          } 
        />
        <Route 
          path="/profile/edit" 
          element={
            isAuthenticated ? (
              <div className="route-transition">
                <EditProfile setIsAuthenticated={setIsAuthenticated} />
              </div>
            ) : (
              <Navigate to="/login" replace />
            )
          } 
        />
        <Route 
          path="/courses"
          element={
            isAuthenticated ? (
              <div className="route-transition">
                <Courses />
              </div>
            ) : (
              <Navigate to="/login" replace />
            )
          } 
        />
        <Route 
          path="/materials" 
          element={
            isAuthenticated ? (
              <div className="route-transition">
                <Materials />
              </div>
            ) : (
              <Navigate to="/login" replace />
            )
          } 
        />
        <Route 
          path="/contact-us" 
          element={
            isAuthenticated ? (
              <div className="route-transition">
                <ContactUs />
              </div>
            ) : (
              <Navigate to="/login" replace />
            )
          } 
        />
        <Route 
          path="/model-papers" 
          element={
            isAuthenticated ? (
              <div className="route-transition">
                <ModelPapers />
              </div>
            ) : (
              <Navigate to="/login" replace />
            )
          } 
        />
        <Route 
          path="/feedback" 
          element={
            isAuthenticated ? (
              <div className="route-transition">
                <Feedback />
              </div>
            ) : (
              <Navigate to="/login" replace />
            )
          } 
        />
      </Routes>
    </div>
  );
}

export default App;