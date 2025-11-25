import React from 'react';
import './ProjectDetailModal.css';

function ProjectDetailModal({ project, isOpen, onClose }) {
  if (!isOpen || !project) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const modalContentRef = React.useRef(null);
  const originalStylesRef = React.useRef(null);

  // Effect to handle body scroll lock/unlock
  React.useEffect(() => {
    if (isOpen) {
      // Save the original overflow and padding values
      originalStylesRef.current = {
        overflow: document.body.style.overflow || '',
        paddingRight: document.body.style.paddingRight || '',
        htmlOverflow: document.documentElement.style.overflow || ''
      };
      
      // Calculate scrollbar width to prevent layout shift
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      
      // Prevent background scrolling
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      }
      
      // Reset scroll position of modal content when it opens
      if (modalContentRef.current) {
        modalContentRef.current.scrollTop = 0;
      }
      
      // Cleanup function that always restores scroll
      return () => {
        document.body.style.removeProperty('overflow');
        document.body.style.removeProperty('padding-right');
        document.documentElement.style.removeProperty('overflow');
        originalStylesRef.current = null;
      };
    } else {
      // When modal is closed, ensure scroll is restored
      // This handles the case when component re-renders with isOpen=false
      document.body.style.removeProperty('overflow');
      document.body.style.removeProperty('padding-right');
      document.documentElement.style.removeProperty('overflow');
      originalStylesRef.current = null;
    }
  }, [isOpen]);

  // Separate effect for keyboard handling
  React.useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <div className="project-modal-overlay" onClick={handleOverlayClick}>
      <div 
        ref={modalContentRef}
        className="project-modal-content" 
        onClick={(e) => e.stopPropagation()}
      >
        <button className="project-modal-close" onClick={onClose} aria-label="Close">
          ×
        </button>
        
        <div className="project-modal-header">
          <h2 className="project-modal-title">{project.title}</h2>
          {project.subtitle && (
            <p className="project-modal-subtitle">{project.subtitle}</p>
          )}
        </div>

        <div className="project-modal-body">
          {project.overview && (
            <section className="project-modal-section">
              <h3 className="project-modal-section-title">Overview</h3>
              <div className="project-modal-text">
                {project.overview.split('\n').map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            </section>
          )}

          <div className="project-modal-meta">
            {project.type && (
              <div className="project-meta-item">
                <span className="project-meta-label">Type:</span>
                <span className="project-meta-value">{project.type}</span>
              </div>
            )}
            {project.role && (
              <div className="project-meta-item">
                <span className="project-meta-label">Role:</span>
                <span className="project-meta-value">{project.role}</span>
              </div>
            )}
            {project.stack && (
              <div className="project-meta-item">
                <span className="project-meta-label">Stack:</span>
                <span className="project-meta-value">{project.stack}</span>
              </div>
            )}
            {project.tech && (
              <div className="project-meta-item">
                <span className="project-meta-label">Tech:</span>
                <span className="project-meta-value">{project.tech}</span>
              </div>
            )}
            {project.status && (
              <div className="project-meta-item">
                <span className="project-meta-label">Status:</span>
                <span className="project-meta-value">{project.status}</span>
              </div>
            )}
          </div>

          {project.problem && (
            <section className="project-modal-section">
              <h3 className="project-modal-section-title">The Problem</h3>
              <div className="project-modal-text">
                {project.problem.split('\n').map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            </section>
          )}

          {project.features && Object.keys(project.features).length > 0 && (
            <section className="project-modal-section">
              <h3 className="project-modal-section-title">Features</h3>
              {Object.entries(project.features).map(([featureName, featureDesc]) => (
                <div key={featureName} className="project-feature-item">
                  <h4 className="project-feature-title">{featureName}</h4>
                  <div className="project-modal-text">
                    {featureDesc.split('\n').map((paragraph, idx) => (
                      <p key={idx}>{paragraph}</p>
                    ))}
                  </div>
                </div>
              ))}
            </section>
          )}

          {project.futureVision && (
            <section className="project-modal-section">
              <h3 className="project-modal-section-title">Future Vision</h3>
              <div className="project-modal-text">
                {project.futureVision.split('\n').map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            </section>
          )}

          {project.architecture && (
            <section className="project-modal-section">
              <h3 className="project-modal-section-title">Architecture</h3>
              <div className="project-modal-text">
                {project.architecture.split('\n').map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            </section>
          )}

          {project.designPrinciples && (
            <section className="project-modal-section">
              <h3 className="project-modal-section-title">Design Principles</h3>
              <div className="project-modal-text">
                {project.designPrinciples.split('\n').map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            </section>
          )}

          {project.outcomes && (
            <section className="project-modal-section">
              <h3 className="project-modal-section-title">Outcomes</h3>
              <div className="project-modal-text">
                {project.outcomes.split('\n').map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            </section>
          )}

          {project.tagline && (
            <section className="project-modal-section project-modal-tagline">
              <p className="project-tagline-text">{project.tagline}</p>
            </section>
          )}

          {project.demoLink && (
            <div className="project-modal-actions">
              <a
                href={project.demoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="project-demo-link"
              >
                View Demo →
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProjectDetailModal;

