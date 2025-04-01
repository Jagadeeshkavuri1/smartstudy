import React, { useState } from 'react';
import { FaPaperPlane } from 'react-icons/fa';

const Feedback = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [submittedData, setSubmittedData] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage("Sending....");
    
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("phone", formData.phone);
    formDataToSend.append("subject", formData.subject);
    formDataToSend.append("message", formData.message);
    formDataToSend.append("access_key", "a8dc9666-3239-48aa-a4b6-66ff5fd24abe");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formDataToSend
      });

      const data = await response.json();

      if (data.success) {
        setSubmitMessage("Thank you! Your feedback has been sent successfully.");
        setSubmittedData({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          subject: formData.subject
        });
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });
      } else {
        console.log("Error", data);
        setSubmitMessage(data.message || "Failed to send feedback. Please try again.");
      }
    } catch (error) {
      console.error('Failed to send feedback:', error);
      setSubmitMessage('Failed to send feedback. Please try again.');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitMessage(''), 5000);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: '#f0fff0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '800px',
        padding: '2rem',
        background: '#fff',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{ color: '#2e8b57', textAlign: 'center' }}>Feedback Form</h1>
        <p style={{ textAlign: 'center', marginBottom: '2rem' }}>Share your thoughts or ask any questions</p>
        
        {submittedData ? (
          <div style={{
            padding: '1.5rem',
            border: '1px solid #d4edda',
            borderRadius: '4px',
            backgroundColor: '#d4edda',
            color: '#155724'
          }}>
            <h3 style={{ marginTop: 0, color: '#2e8b57' }}>Submitted Information</h3>
            <p><strong>Name:</strong> {submittedData.name}</p>
            <p><strong>Email:</strong> {submittedData.email}</p>
            <p><strong>Phone:</strong> {submittedData.phone}</p>
            <p><strong>Subject:</strong> {submittedData.subject}</p>
            <button 
              onClick={() => setSubmittedData(null)}
              style={{
                marginTop: '1rem',
                backgroundColor: '#2e8b57',
                color: 'white',
                border: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Submit Another Feedback
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem'
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontWeight: '500', color: '#1e90ff' }}>Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                style={{
                  padding: '0.8rem',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '1rem'
                }}
              />
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontWeight: '500', color: '#1e90ff' }}>Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                style={{
                  padding: '0.8rem',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '1rem'
                }}
              />
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontWeight: '500', color: '#1e90ff' }}>Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                style={{
                  padding: '0.8rem',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '1rem'
                }}
              />
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontWeight: '500', color: '#1e90ff' }}>Subject</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                style={{
                  padding: '0.8rem',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '1rem'
                }}
              />
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontWeight: '500', color: '#1e90ff' }}>Your Feedback/Doubts</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="5"
                required
                style={{
                  padding: '0.8rem',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '1rem',
                  resize: 'vertical'
                }}
              ></textarea>
            </div>
            
            <button 
              type="submit" 
              disabled={isSubmitting}
              style={{
                backgroundColor: '#2e8b57',
                color: 'white',
                border: 'none',
                padding: '0.8rem 1.5rem',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                transition: 'background-color 0.3s'
              }}
            >
              {isSubmitting ? 'Sending...' : (
                <>
                  <FaPaperPlane /> Submit Feedback
                </>
              )}
            </button>
            
            {submitMessage && (
              <div style={{
                marginTop: '1rem',
                padding: '0.8rem',
                borderRadius: '4px',
                backgroundColor: submitMessage.includes('Thank') ? '#d4edda' : '#f8d7da',
                color: submitMessage.includes('Thank') ? '#155724' : '#721c24',
                textAlign: 'center'
              }}>
                {submitMessage}
              </div>
            )}
          </form>
        )}
      </div>
    </div>
  );
};
 
export default Feedback;