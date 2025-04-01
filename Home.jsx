import React, { useState } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Feature data
  const learningStrategies = [
    {
      title: "Active Recall",
      description: "Train your brain to retrieve information through self-testing, proven to boost long-term retention by 50% or more.",
      icon: "🧠",
      bgColor: isDarkMode ? "rgba(74, 111, 165, 0.3)" : "rgba(58, 86, 168, 0.2)",
      hoverColor: "#3a56a8",
      textColor: "#ffffff"
    },
    {
      title: "Spaced Repetition",
      description: "Our algorithm schedules reviews at optimal intervals to maximize memory retention with minimal effort.",
      icon: "⏳",
      bgColor: isDarkMode ? "rgba(46, 133, 110, 0.3)" : "rgba(46, 133, 110, 0.2)",
      hoverColor: "#2e856e",
      textColor: "#ffffff"
    },
    {
      title: "Interleaved Practice",
      description: "Mix different topics during study sessions to enhance learning and problem-solving skills.",
      icon: "🔄",
      bgColor: isDarkMode ? "rgba(184, 134, 11, 0.3)" : "rgba(184, 134, 11, 0.2)",
      hoverColor: "#b8860b",
      textColor: "#ffffff"
    },
    {
      title: "Elaboration",
      description: "Connect new information to what you already know by explaining concepts in your own words.",
      icon: "💡",
      bgColor: isDarkMode ? "rgba(138, 43, 226, 0.3)" : "rgba(138, 43, 226, 0.2)",
      hoverColor: "#8a2be2",
      textColor: "#ffffff"
    },
    {
      title: "Dual Coding",
      description: "Combine words with visuals to create multiple mental representations of the same information.",
      icon: "🎨",
      bgColor: isDarkMode ? "rgba(210, 105, 30, 0.3)" : "rgba(210, 105, 30, 0.2)",
      hoverColor: "#d2691e",
      textColor: "#ffffff"
    },
    {
      title: "Metacognition",
      description: "Develop awareness of your own learning process to identify what works best for you.",
      icon: "🔍",
      bgColor: isDarkMode ? "rgba(70, 130, 180, 0.3)" : "rgba(70, 130, 180, 0.2)",
      hoverColor: "#4682b4",
      textColor: "#ffffff"
    }
  ];

  // Base styles with conditional dark mode
  const styles = {
    pageContainer: {
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      backgroundColor: isDarkMode ? "#0a192f" : "#f8fafc", // Updated to peaceful light gray
      minHeight: "100vh",
      width: "100vw",
      margin: 0,
      padding: 0,
      boxSizing: "border-box",
      color: isDarkMode ? "#e0e0e0" : "#333",
      display: "flex",
      flexDirection: "column",
      transition: "background-color 0.3s ease"
    },
    // Header Styles
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "15px 30px",
      backgroundColor: isDarkMode ? "rgba(10, 25, 47, 0.9)" : "rgba(248, 250, 252, 0.9)",
      boxShadow: isDarkMode
        ? "0 2px 10px rgba(0, 0, 0, 0.3)"
        : "0 2px 10px rgba(0, 0, 0, 0.1)",
      width: "100%",
      boxSizing: "border-box",
      position: "sticky",
      top: 0,
      zIndex: 100,
      backdropFilter: "blur(8px)"
    },
    logoContainer: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
      cursor: "pointer",
      transition: "all 0.3s ease",
    },
    logoIcon: {
      fontSize: "28px",
    },
    logoText: {
      fontSize: "22px",
      fontWeight: "bold",
      color: isDarkMode ? "#66b0ff" : "#4B5EAA",
      letterSpacing: "0.5px",
    },
    headerButtons: {
      display: "flex",
      alignItems: "center",
      gap: "15px",
    },
    headerButton: {
      backgroundColor: isDarkMode ? "rgba(102, 176, 255, 0.1)" : "rgba(75, 94, 170, 0.1)",
      color: isDarkMode ? "#66b0ff" : "#4B5EAA",
      border: "none",
      fontSize: "16px",
      cursor: "pointer",
      padding: "10px 20px",
      borderRadius: "8px",
      transition: "all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)",
      fontWeight: "600",
      display: "flex",
      alignItems: "center",
      gap: "8px",
    },
    headerButtonHover: {
      transform: "scale(1.05)",
      backgroundColor: isDarkMode ? "rgba(102, 176, 255, 0.3)" : "rgba(75, 94, 170, 0.3)",
      color: "#ffffff",
    },
    darkModeButton: {
      backgroundColor: isDarkMode ? "rgba(102, 176, 255, 0.1)" : "rgba(75, 94, 170, 0.1)",
      color: isDarkMode ? "#66b0ff" : "#4B5EAA",
      border: "none",
      borderRadius: "8px",
      padding: "10px 20px",
      cursor: "pointer",
      fontSize: "14px",
      transition: "all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)",
      fontWeight: "600",
      display: "flex",
      alignItems: "center",
      gap: "8px",
    },
    darkModeButtonHover: {
      transform: "scale(1.05)",
      backgroundColor: isDarkMode ? "rgba(102, 176, 255, 0.3)" : "rgba(75, 94, 170, 0.3)",
      color: "#ffffff",
    },
    // Main Section Styles
    main: {
      textAlign: "center",
      padding: "60px 20px 40px",
      flex: 1,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
    title: {
      fontSize: "3.5rem",
      fontWeight: "800",
      color: isDarkMode ? "#ffffff" : "#2c3e50",
      marginBottom: "15px",
      transition: "all 0.3s ease",
      cursor: "default",
      position: "relative",
      display: "inline-block",
      lineHeight: "1.2",
    },
    titleHover: {
      color: isDarkMode ? "#66b0ff" : "#4B5EAA",
      textShadow: isDarkMode 
        ? "0 0 15px rgba(102, 176, 255, 0.6)" 
        : "0 0 15px rgba(75, 94, 170, 0.4)",
    },
    titleUnderline: {
      position: "absolute",
      bottom: "-8px",
      left: "0",
      width: "0",
      height: "4px",
      backgroundColor: isDarkMode ? "#66b0ff" : "#4B5EAA",
      transition: "width 0.4s ease, opacity 0.3s ease",
      borderRadius: "2px",
    },
    subtitle: {
      fontSize: "1.3rem",
      color: isDarkMode ? "#b0b0b0" : "#666",
      marginBottom: "30px",
      maxWidth: "700px",
      lineHeight: "1.6",
    },
    getStartedButton: {
      backgroundColor: isDarkMode ? "#66b0ff" : "#4B5EAA",
      color: "white",
      padding: "15px 40px",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      fontSize: "18px",
      fontWeight: "600",
      transition: "all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)",
      marginTop: "10px",
      boxShadow: isDarkMode 
        ? "0 4px 15px rgba(102, 176, 255, 0.3)" 
        : "0 4px 15px rgba(75, 94, 170, 0.3)",
      display: "flex",
      alignItems: "center",
      gap: "10px",
    },
    getStartedButtonHover: {
      transform: "scale(1.05)",
      backgroundColor: isDarkMode ? "#4B5EAA" : "#3a4a85",
      boxShadow: isDarkMode 
        ? "0 6px 20px rgba(75, 94, 170, 0.4)" 
        : "0 6px 20px rgba(75, 94, 170, 0.4)",
    },
    // Features Section Styles
    featuresContainer: {
      width: "100%",
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "0 20px 60px",
    },
    sectionTitle: {
      fontSize: "2rem",
      fontWeight: "700",
      color: isDarkMode ? "#ffffff" : "#2c3e50",
      margin: "40px 0 30px",
      textAlign: "center",
    },
    strategiesGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
      gap: "30px",
      padding: "0 20px",
    },
    strategyCard: {
      backgroundColor: isDarkMode ? "rgba(16, 42, 87, 0.5)" : "rgba(255, 255, 255, 0.8)",
      borderRadius: "15px",
      padding: "30px",
      transition: "all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)",
      cursor: "pointer",
      boxShadow: isDarkMode 
        ? "0 6px 15px rgba(0, 0, 0, 0.2)" 
        : "0 6px 15px rgba(0, 0, 0, 0.1)",
      border: "1px solid transparent",
      minHeight: "220px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      position: "relative",
      overflow: "hidden",
      backdropFilter: "blur(5px)",
    },
    strategyCardHover: {
      transform: "scale(1.03)",
      boxShadow: isDarkMode 
        ? "0 10px 25px rgba(0, 0, 0, 0.3)" 
        : "0 10px 25px rgba(0, 0, 0, 0.2)",
    },
    strategyIcon: {
      fontSize: "3rem",
      marginBottom: "20px",
      transition: "all 0.3s ease",
      zIndex: 2,
      color: "#ffffff"
    },
    strategyIconHover: {
      transform: "scale(1.2)",
    },
    strategyTitle: {
      fontSize: "1.5rem",
      fontWeight: "600",
      color: "#ffffff",
      marginBottom: "15px",
      transition: "all 0.3s ease",
      zIndex: 2,
    },
    strategyText: {
      fontSize: "1rem",
      color: "rgba(255, 255, 255, 0.9)",
      lineHeight: "1.6",
      transition: "all 0.3s ease",
      zIndex: 2,
    },
    strategyOverlay: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: "linear-gradient(135deg, currentColor 0%, rgba(0,0,0,0.7) 100%)",
      opacity: 0.7,
      transition: "all 0.3s ease",
    },
    strategyOverlayHover: {
      opacity: 0.9,
    },
    // Footer
    footer: {
      backgroundColor: isDarkMode ? "rgba(10, 25, 47, 0.9)" : "rgba(248, 250, 252, 0.9)",
      padding: "30px 20px",
      textAlign: "center",
      borderTop: isDarkMode ? "1px solid rgba(102, 176, 255, 0.1)" : "1px solid rgba(75, 94, 170, 0.1)",
      backdropFilter: "blur(8px)"
    },
    footerText: {
      color: isDarkMode ? "rgba(255, 255, 255, 0.7)" : "rgba(75, 94, 170, 0.8)",
      fontSize: "0.9rem",
    }
  };

  // Hover state management
  const [hoverStates, setHoverStates] = useState({
    title: false,
    logo: false,
    getStarted: false,
    login: false,
    signup: false,
    darkMode: false,
    strategyCards: Array(learningStrategies.length).fill(false),
  });

  const handleHover = (element, isHovering) => {
    setHoverStates(prev => ({ ...prev, [element]: isHovering }));
  };

  const handleStrategyHover = (index, isHovering) => {
    setHoverStates(prev => {
      const newStrategyCards = [...prev.strategyCards];
      newStrategyCards[index] = isHovering;
      return { ...prev, strategyCards: newStrategyCards };
    });
  };

  return (
    <div style={styles.pageContainer}>
      {/* Header */}
      <header style={styles.header}>
        <div 
          style={{ 
            ...styles.logoContainer,
            transform: hoverStates.logo ? "scale(1.05)" : "scale(1)"
          }}
          onMouseEnter={() => handleHover('logo', true)}
          onMouseLeave={() => handleHover('logo', false)}
        >
          <span style={styles.logoIcon}>📖</span>
          <span style={styles.logoText}>Smart Study</span>
        </div>
        <div style={styles.headerButtons}>
          <Link to="/login">
            <button 
              style={{ 
                ...styles.headerButton,
                ...(hoverStates.login ? styles.headerButtonHover : {})
              }}
              onMouseEnter={() => handleHover('login', true)}
              onMouseLeave={() => handleHover('login', false)}
            >
              🔑 Login
            </button>
          </Link>
          <Link to="/signup">
            <button 
              style={{ 
                ...styles.headerButton,
                ...(hoverStates.signup ? styles.headerButtonHover : {})
              }}
              onMouseEnter={() => handleHover('signup', true)}
              onMouseLeave={() => handleHover('signup', false)}
            >
              ✍️ Sign Up
            </button>
          </Link>
          <button 
            style={{ 
              ...styles.darkModeButton,
              ...(hoverStates.darkMode ? styles.darkModeButtonHover : {})
            }}
            onClick={toggleDarkMode}
            onMouseEnter={() => handleHover('darkMode', true)}
            onMouseLeave={() => handleHover('darkMode', false)}
          >
            {isDarkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>
        </div>
      </header>

      {/* Main Section */}
      <main style={styles.main}>
        <h1 
          style={{ 
            ...styles.title,
            ...(hoverStates.title ? styles.titleHover : {})
          }}
          onMouseEnter={() => handleHover('title', true)}
          onMouseLeave={() => handleHover('title', false)}
        >
          Welcome to Smart Study
          <span 
            style={{ 
              ...styles.titleUnderline,
              width: hoverStates.title ? "100%" : "0",
              opacity: hoverStates.title ? "1" : "0.8"
            }} 
          />
        </h1>
        <p style={styles.subtitle}>
          Master the science of learning with our evidence-based strategies and 
          transform your study sessions into powerful knowledge-building experiences.
        </p>
        <Link to="/signup">
          <button 
            style={{ 
              ...styles.getStartedButton,
              ...(hoverStates.getStarted ? styles.getStartedButtonHover : {})
            }}
            onMouseEnter={() => handleHover('getStarted', true)}
            onMouseLeave={() => handleHover('getStarted', false)}
          >
            🚀 Get Started Now
          </button>
        </Link>
      </main>

      {/* Learning Strategies Section */}
      <div style={styles.featuresContainer}>
        <h2 style={styles.sectionTitle}>Proven Learning Strategies</h2>
        <div style={styles.strategiesGrid}>
          {learningStrategies.map((strategy, index) => (
            <div 
              key={index}
              style={{ 
                ...styles.strategyCard,
                backgroundColor: strategy.bgColor,
                borderColor: strategy.hoverColor,
                ...(hoverStates.strategyCards[index] ? { 
                  ...styles.strategyCardHover,
                  backgroundColor: strategy.hoverColor,
                  borderColor: strategy.hoverColor
                } : {})
              }}
              onMouseEnter={() => handleStrategyHover(index, true)}
              onMouseLeave={() => handleStrategyHover(index, false)}
            >
              <div 
                style={{ 
                  ...styles.strategyOverlay,
                  backgroundColor: strategy.hoverColor,
                  ...(hoverStates.strategyCards[index] ? styles.strategyOverlayHover : {})
                }} 
              />
              <div 
                style={{ 
                  ...styles.strategyIcon,
                  ...(hoverStates.strategyCards[index] ? styles.strategyIconHover : {})
                }}
              >
                {strategy.icon}
              </div>
              <h3 style={styles.strategyTitle}>
                {strategy.title}
              </h3>
              <p style={styles.strategyText}>
                {strategy.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer style={styles.footer}>
        <p style={styles.footerText}>© {new Date().getFullYear()} Smart Study. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;