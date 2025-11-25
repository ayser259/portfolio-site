import React, { useState } from 'react';
import './ContactSection.css';
import siteContent from '../content';

function ContactSection() {
  const contact = siteContent.contact;
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contact.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy email:', err);
    }
  };

  return (
    <section id="contact" className="contact-section">
      <div className="contact-container">
        <h2 className="contact-title">{contact.title}</h2>
        <p className="contact-description">{contact.description}</p>
        
        <div className="contact-content">
          <div className="contact-info">
            <div className="contact-email-wrapper">
              <a href={`mailto:${contact.email}`} className="email-link">
                <i className="fas fa-envelope"></i>
                {contact.email}
              </a>
              <button 
                onClick={handleCopyEmail}
                className="copy-button"
                aria-label="Copy email to clipboard"
                title={copied ? 'Copied!' : 'Copy email'}
              >
                {copied ? (
                  <i className="fas fa-check"></i>
                ) : (
                  <i className="fas fa-copy"></i>
                )}
              </button>
            </div>
            
            <div className="social-links">
              <a 
                href="https://linkedin.com/in/ayser-ca" 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-link"
                aria-label="LinkedIn"
              >
                <img 
                  src="/assets/images/social/linkedin.png" 
                  alt="LinkedIn"
                  className="social-logo"
                />
              </a>
              <a 
                href="https://github.com/ayser259" 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-link"
                aria-label="GitHub"
              >
                <img 
                  src="/assets/images/social/github.png" 
                  alt="GitHub"
                  className="social-logo"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;


