// src/pages/Courses.jsx
import React from 'react';
import './Courses.css';

const Courses = () => {
  const courses = [
    {
      id: 1,
      title: 'Java Course',
      description: 'Master Java programming from basics to advanced concepts',
      duration: '8 weeks',
      level: 'Beginner to Intermediate',
      driveLink: 'https://drive.google.com/file/d/1ZBpkkbpxARk8KjSL9Ci2TYkk5lDyAgKh/view?usp=drive_link'
    },
    {
      id: 2,
      title: 'Python Course',
      description: 'Learn Python for data science, web development, and automation',
      duration: '6 weeks',
      level: 'Beginner to Advanced',
      driveLink: 'https://drive.google.com/file/d/1lcTL__Oz-pDeEOk3dTF04FIGEC18995i/view?usp=drive_link'
    }
  ];

  const handleEnrollClick = (driveLink) => {
    window.open(driveLink, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="courses-container">
      <h1 className="courses-title">Available Courses</h1>
      <div className="courses-grid">
        {courses.map((course) => (
          <div key={course.id} className="course-card">
            <h2>{course.title}</h2>
            <p>{course.description}</p>
            <div className="course-details">
              <span>Duration: {course.duration}</span>
              <span>Level: {course.level}</span>
            </div>
            <button 
              className="enroll-btn"
              onClick={() => handleEnrollClick(course.driveLink)}
            >
              Enroll Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;