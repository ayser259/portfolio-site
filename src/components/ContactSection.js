import React, { useState, useRef, useEffect } from 'react';
import './ContactSection.css';
import siteContent from '../content';

function ContactSection() {
  const contact = siteContent.contact;
  const [copied, setCopied] = useState(false);
  const [showResumeForm, setShowResumeForm] = useState(false);
  const [showNoteForm, setShowNoteForm] = useState(false);
  const [resumeEmail, setResumeEmail] = useState('');
  const [resumeEmailError, setResumeEmailError] = useState('');
  const [noteEmail, setNoteEmail] = useState('');
  const [noteEmailError, setNoteEmailError] = useState('');
  const [noteMessage, setNoteMessage] = useState('');
  const [noteMessageError, setNoteMessageError] = useState('');
  const [emailRevealed, setEmailRevealed] = useState(false);
  const [resumeSubmitted, setResumeSubmitted] = useState(false);
  const [noteSubmitted, setNoteSubmitted] = useState(false);
  const noteComposeRef = useRef(null);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contact.email);
      setCopied(true);
      setEmailRevealed(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy email:', err);
    }
  };

  const isValidEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  const handleResumeSubmit = async (e) => {
    e.preventDefault();
    let hasError = false;

    if (!resumeEmail.trim()) {
      setResumeEmailError('Please enter your email address.');
      hasError = true;
    } else if (!isValidEmail(resumeEmail.trim())) {
      setResumeEmailError('Please enter a valid email address.');
      hasError = true;
    } else {
      setResumeEmailError('');
    }

    if (hasError) {
      return;
    }

    try {
      const formData = new FormData();
      formData.append('email', resumeEmail.trim());

      const response = await fetch('https://formspree.io/f/xrbwbdoq', {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json',
        },
      });

      if (response.ok) {
        setResumeSubmitted(true);
        setResumeEmail('');
        setResumeEmailError('');
      }
    } catch (err) {
      console.error('Failed to submit resume request:', err);
    }
  };

  const handleNoteSubmit = async (e) => {
    e.preventDefault();
    let hasError = false;

    if (!noteEmail.trim()) {
      setNoteEmailError('Please enter your email address.');
      hasError = true;
    } else if (!isValidEmail(noteEmail.trim())) {
      setNoteEmailError('Please enter a valid email address.');
      hasError = true;
    } else {
      setNoteEmailError('');
    }

    if (!noteMessage.trim()) {
      setNoteMessageError('Please add a short note.');
      hasError = true;
    } else if (noteMessage.trim().length < 5) {
      setNoteMessageError('Your note should be at least 5 characters.');
      hasError = true;
    } else {
      setNoteMessageError('');
    }

    if (hasError) {
      return;
    }

    try {
      const formData = new FormData();
      formData.append('email', noteEmail.trim());
      formData.append('message', noteMessage.trim());

      const response = await fetch('https://formspree.io/f/xnnknryd', {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json',
        },
      });

      if (response.ok) {
        setNoteSubmitted(true);
        setNoteEmail('');
        setNoteMessage('');
        setNoteEmailError('');
        setNoteMessageError('');
      }
    } catch (err) {
      console.error('Failed to submit note:', err);
    }
  };

  useEffect(() => {
    if (showNoteForm && noteComposeRef.current) {
      noteComposeRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }, [showNoteForm]);

  return (
    <section id="contact" className="contact-section">
      <div className="contact-container">
        <h2 className="contact-title">{contact.title}</h2>
        <p className="contact-description">{contact.description}</p>
        
        <div className="contact-content">
          <div className="contact-info">
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

            <div className="contact-actions">
              <div className="contact-action">
                <div className="contact-card">
                  <h3 className="contact-card-title">Get my email</h3>
                  <p className="contact-card-text">
                    Prefer reaching out directly? Reveal and copy my email in one click.
                  </p>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="email-button"
                    aria-label="Get and copy email address"
                    title={copied ? 'Copied!' : 'Click to copy my email'}
                  >
                    <div className="email-button-left">
                      <i className="fas fa-envelope"></i>
                      <span>
                        {emailRevealed ? contact.email : 'Copy email address'}
                      </span>
                    </div>
                    <div className="email-button-right">
                      {copied ? (
                        <i className="fas fa-check"></i>
                      ) : (
                        <i className="fas fa-copy"></i>
                      )}
                    </div>
                  </button>
                </div>
              </div>

              <div className="contact-action">
                <div className="contact-card">
                  <h3 className="contact-card-title">Request my resume</h3>
                  <p className="contact-card-text">
                    Share your email and I’ll send over my full resume within 24–48 hours.
                  </p>

                  {resumeSubmitted ? (
                    <p className="success-text">
                      Thanks — your resume request is in. I’ll follow up soon.
                    </p>
                  ) : showResumeForm ? (
                    <form
                      className="resume-form"
                      onSubmit={handleResumeSubmit}
                    >
                      <label className="resume-label">
                        Email address
                        <input
                          type="email"
                          name="email"
                          required
                          className={`resume-input ${resumeEmailError ? 'input-error' : ''}`}
                          placeholder="you@example.com"
                          value={resumeEmail}
                          onChange={(e) => setResumeEmail(e.target.value)}
                        />
                      </label>
                      {resumeEmailError && (
                        <p className="error-text">{resumeEmailError}</p>
                      )}
                      <button type="submit" className="resume-submit-button">
                        Send request
                      </button>
                    </form>
                  ) : (
                    <button
                      type="button"
                      className="resume-button"
                      onClick={() => {
                        setShowResumeForm(true);
                        setResumeSubmitted(false);
                      }}
                    >
                      Request Resume
                    </button>
                  )}
                </div>
              </div>

              <div className="contact-action">
                <div className="contact-card">
                  <h3 className="contact-card-title">Send me a note</h3>
                  <p className="contact-card-text">
                    Have a question or idea? Drop me a short note and I’ll get back to you.
                  </p>

                  <button
                    type="button"
                    className="note-button"
                    onClick={() => setShowNoteForm(true)}
                  >
                    Send me a note
                  </button>
                </div>
              </div>
            </div>

            {showNoteForm && (
              <div className="note-compose" ref={noteComposeRef}>
                <div className="note-compose-inner">
                  <h3 className="note-compose-title">Send me a note</h3>
                  <p className="note-compose-text">
                    Share your email and a bit of context. I read everything and do my best to respond.
                  </p>
                  {noteSubmitted ? (
                    <p className="success-text">
                      Thanks for reaching out — I’ll read this and get back to you.
                    </p>
                  ) : (
                    <form
                      className="note-form"
                      onSubmit={handleNoteSubmit}
                    >
                      <label className="note-label">
                        Your email
                        <input
                          type="email"
                          name="email"
                          required
                          className={`note-input ${noteEmailError ? 'input-error' : ''}`}
                          placeholder="you@example.com"
                          value={noteEmail}
                          onChange={(e) => setNoteEmail(e.target.value)}
                        />
                      </label>
                      {noteEmailError && (
                        <p className="error-text">{noteEmailError}</p>
                      )}
                      <label className="note-label">
                        Your note
                        <textarea
                          name="message"
                          required
                          className={`note-textarea ${noteMessageError ? 'input-error' : ''}`}
                          rows="6"
                          placeholder="What would you like to share?"
                          value={noteMessage}
                          onChange={(e) => setNoteMessage(e.target.value)}
                        />
                      </label>
                      {noteMessageError && (
                        <p className="error-text">{noteMessageError}</p>
                      )}
                      <div className="note-compose-actions">
                        <button
                          type="button"
                          className="note-cancel-button"
                          onClick={() => {
                            setShowNoteForm(false);
                            setNoteSubmitted(false);
                          }}
                        >
                          Cancel
                        </button>
                        <button type="submit" className="note-submit-button">
                          Send note
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;


