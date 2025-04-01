// src/pages/Materials.jsx
import React from 'react';
import './Materials.css';

const Materials = () => {
  const materials = [
    {
      id: 1,
      title: 'Java Materials',
      description: 'Comprehensive collection of Java learning resources and reference materials',
      category: 'Programming',
      format: 'PDFs, Code Samples, Exercises',
      driveLink: 'https://drive.google.com/file/d/1mof_4gV0pdYHQLo7uXkdBVq_A8tRExkk/view?usp=drive_link'
    },
    {
      id: 2,
      title: 'Python Materials',
      description: 'Complete set of Python tutorials, cheat sheets, and project templates',
      category: 'Data Science',
      format: 'Jupyter Notebooks, Documentation',
      driveLink: 'https://drive.google.com/file/d/1pafnFJJk0awETb7JDLqAVQnH_3TjRgpV/view?usp=drive_link'
    }
  ];

  const handleAccessClick = (driveLink) => {
    window.open(driveLink, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="materials-container">
      <h1 className="materials-title">Learning Materials</h1>
      <div className="materials-grid">
        {materials.map((material) => (
          <div key={material.id} className="material-card">
            <h2>{material.title}</h2>
            <p>{material.description}</p>
            <div className="material-details">
              <span>Category: {material.category}</span>
              <span>Format: {material.format}</span>
            </div>
            <button 
              className="access-btn"
              onClick={() => handleAccessClick(material.driveLink)}
            >
              Access Materials
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Materials;