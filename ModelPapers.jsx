import React from 'react';
import { FaFilePdf, FaJava, FaPython } from 'react-icons/fa';
import './ModelPapers.css';

const ModelPapers = () => {
  const modelPapers = [
    {
      id: 1,
      title: 'Java Model Papers',
      description: 'Access previous year question papers and sample papers for Java',
      icon: <FaJava size={24} />,
      color: '#5382A1',
      link: 'https://drive.google.com/file/d/13wXarlKzpCVJr3fjRLzsa9SZSUD2nq1R/view?usp=drive_link'
    },
    {
      id: 2,
      title: 'Python Model Papers',
      description: 'Access previous year question papers and sample papers for Python',
      icon: <FaPython size={24} />,
      color: '#3776AB',
      link: 'https://drive.google.com/file/d/1bNcahTIZ_c403xuDKWPUoP-Pqgilq8W9/view?usp=drive_link'
    }
  ];

  const handleModelPaperClick = (link) => {
    try {
      window.open(link, '_blank', 'noopener,noreferrer');
    } catch (error) {
      console.error('Error opening link:', error);
      // You could use navigate here if you had error handling page
      // navigate('/error', { state: { error: 'Failed to open model papers' } });
    }
  };

  return (
    <div className="model-papers-container">
      <h1 className="model-papers-title">Model Papers</h1>
      <p className="model-papers-subtitle">Access previous year question papers and sample papers</p>
      
      <div className="model-papers-grid">
        {modelPapers.map((paper) => (
          <div 
            key={paper.id} 
            className="model-paper-card"
            onClick={() => handleModelPaperClick(paper.link)}
            style={{ borderLeft: `4px solid ${paper.color}` }}
            aria-label={`Open ${paper.title}`}
          >
            <div className="paper-icon" style={{ color: paper.color }}>
              {paper.icon}
            </div>
            <div className="paper-content">
              <h2>{paper.title}</h2>
              <p>{paper.description}</p>
            </div>
            <FaFilePdf className="pdf-icon" size={20} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ModelPapers;