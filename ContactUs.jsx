import React from 'react';
import { FaPhone, FaEnvelope, FaLinkedin, FaFacebook, FaTwitter } from 'react-icons/fa';
import './ContactUs.css';

const ContactUs = () => {
  return (
    <div className="contact-us-container">
      <div className="contact-content">
        <h1>Contact Information</h1>
        <p>Feel free to reach out through any of these channels</p>
        
        <div className="contact-details">
          <div className="contact-method">
            <FaPhone className="contact-icon" />
            <div>
              <h3>Phone Number</h3>
              <a href="tel:+919701887395">+91 9701887395</a>
            </div>
          </div>
          
          <div className="contact-method">
            <FaEnvelope className="contact-icon" />
            <div>
              <h3>Email Address</h3>
              <a href="mailto:jagadeeshkavuri3@gmail.com">jagadeeshkavuri3@gmail.com</a>
            </div>
          </div>
          
          <div className="contact-method">
            <FaLinkedin className="contact-icon" />
            <div>
              <h3>LinkedIn</h3>
              <a 
                href="https://www.linkedin.com/in/kavuri-jagadeesh" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                linkedin.com/in/kavuri-jagadeesh
              </a>
            </div>
          </div>
          
          <div className="social-media-links">
            <h3>Follow Me</h3>
            <div className="social-icons">
              <a href="#" target="_blank" rel="noopener noreferrer">
                <FaFacebook />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <FaTwitter />
              </a>
              <a 
                href="https://www.linkedin.com/in/kavuri-jagadeesh" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <FaLinkedin />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;