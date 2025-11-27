import React from 'react';
import { useNavigate } from 'react-router-dom';
import projectDetails from '../data/projectDetails';
import './ProjectDetailPage.css';

function CKFDPage() {
  const navigate = useNavigate();
  const project = projectDetails['CKFD'];

  const getEmbedUrl = (url) => {
    if (!url) return null;
    // For web demos, just return the URL as-is; browser will sandbox appropriately
    return url;
  };

  // Helper function to render text with proper bullet point lists
  const renderTextWithBullets = (text) => {
    if (!text) return null;
    
    const lines = text.split('\n');
    const elements = [];
    let currentList = [];
    let currentParagraph = [];

    const flushParagraph = () => {
      if (currentParagraph.length > 0) {
        elements.push(
          <p key={`p-${elements.length}`}>{currentParagraph.join(' ')}</p>
        );
        currentParagraph = [];
      }
    };

    const flushList = () => {
      if (currentList.length > 0) {
        elements.push(
          <ul key={`ul-${elements.length}`}>
            {currentList.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        );
        currentList = [];
      }
    };

    lines.forEach((line, idx) => {
      const trimmedLine = line.trim();
      
      if (!trimmedLine) {
        flushList();
        flushParagraph();
        return;
      }

      // Check if line starts with a bullet point
      if (trimmedLine.startsWith('- ')) {
        flushParagraph();
        const bulletText = trimmedLine.substring(2).trim();
        currentList.push(bulletText);
      } else {
        flushList();
        if (trimmedLine) {
          currentParagraph.push(trimmedLine);
        }
      }
    });

    flushList();
    flushParagraph();

    return elements.length > 0 ? elements : null;
  };

  const demoEmbedUrl = getEmbedUrl(project.demoLink);

  return (
    <div className="project-detail-page">
      <div className="project-detail-container">
        <button
          onClick={() => navigate('/', { state: { scrollToProjects: true } })}
          className="back-button"
        >
          ← Back to Home
        </button>

        <div className="project-detail-header">
          <h1 className="project-detail-title">{project.title}</h1>
          {project.subtitle && (
            <p className="project-detail-subtitle">{project.subtitle}</p>
          )}
        </div>

        <div className="project-detail-body">
          <div className="project-detail-layout">
            <div className="project-detail-content-column">
              {project.overview && (
                <section className="project-detail-section">
                  <h2 className="project-detail-section-title">Overview</h2>
                  <div className="project-detail-text">
                    {renderTextWithBullets(project.overview)}
                  </div>
                </section>
              )}

              {demoEmbedUrl && (
                <section className="project-detail-media-section">
                  <h2 className="project-detail-media-title">Interactive Demo</h2>
                  <div className="project-detail-mobile-frame">
                    <div className="project-detail-mobile-frame-inner">
                      <iframe
                        src={demoEmbedUrl}
                        title="Personalized Feed Engagement Demo"
                        loading="lazy"
                        allow="fullscreen"
                      />
                    </div>
                  </div>
                  <p className="project-detail-video-caption">
                    A mobile-first prototype exploring personalized content feeds for financial wellness. Scroll and click around to try it out—explore the feed, tap through modules, and see how personalized content discovery works in practice.
                  </p>
                  {project.demoLink && (
                    <div className="project-detail-cta-card" style={{ marginTop: '1.5rem' }}>
                      <h3 className="project-detail-cta-title">Try it on your phone</h3>
                      <p className="project-detail-cta-text">
                        This demo is designed mobile-first. Open it on your phone for the best experience—swipe through the feed, explore the modules, and see how personalized content discovery feels in practice.
                      </p>
                      <a
                        href={project.demoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-detail-cta-link"
                      >
                        Open the demo app
                      </a>
                    </div>
                  )}
                </section>
              )}

              <div className="project-detail-meta">
                {project.type && (
                  <div className="project-detail-meta-item">
                    <span className="project-detail-meta-label">Type:</span>
                    <span className="project-detail-meta-value">{project.type}</span>
                  </div>
                )}
                {project.role && (
                  <div className="project-detail-meta-item">
                    <span className="project-detail-meta-label">Role:</span>
                    <span className="project-detail-meta-value">{project.role}</span>
                  </div>
                )}
                {project.tech && (
                  <div className="project-detail-meta-item">
                    <span className="project-detail-meta-label">Tech:</span>
                    <span className="project-detail-meta-value">{project.tech}</span>
                  </div>
                )}
                {project.status && (
                  <div className="project-detail-meta-item">
                    <span className="project-detail-meta-label">Status:</span>
                    <span className="project-detail-meta-value">{project.status}</span>
                  </div>
                )}
              </div>

              {project.problem && (
                <section className="project-detail-section">
                  <h2 className="project-detail-section-title">The Problem</h2>
                  <div className="project-detail-text">
                    {renderTextWithBullets(project.problem)}
                  </div>
                </section>
              )}

              {project.features && Object.keys(project.features).length > 0 && (
                <section className="project-detail-section">
                  <h2 className="project-detail-section-title">Key Features</h2>
                  {Object.entries(project.features).map(([featureName, featureDesc]) => (
                    <div key={featureName} className="project-detail-feature-item">
                      <h3 className="project-detail-feature-title">{featureName}</h3>
                      <div className="project-detail-text">
                        {renderTextWithBullets(featureDesc)}
                      </div>
                    </div>
                  ))}
                </section>
              )}

              {project.futureVision && (
                <section className="project-detail-section">
                  <h2 className="project-detail-section-title">Where It's Going</h2>
                  <div className="project-detail-text">
                    {renderTextWithBullets(project.futureVision)}
                  </div>
                </section>
              )}

              {project.architecture && (
                <section className="project-detail-section">
                  <h2 className="project-detail-section-title">How I Built It</h2>
                  <div className="project-detail-text">
                    {renderTextWithBullets(project.architecture)}
                  </div>
                </section>
              )}

              {project.designPrinciples && (
                <section className="project-detail-section">
                  <h2 className="project-detail-section-title">Design Principles</h2>
                  <div className="project-detail-text">
                    {renderTextWithBullets(project.designPrinciples)}
                  </div>
                </section>
              )}

              {project.outcomes && (
                <section className="project-detail-section">
                  <h2 className="project-detail-section-title">Outcomes</h2>
                  <div className="project-detail-text">
                    {renderTextWithBullets(project.outcomes)}
                  </div>
                </section>
              )}

              {project.tagline && (
                <section className="project-detail-section project-detail-tagline">
                  <p className="project-detail-tagline-text">{project.tagline}</p>
                </section>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CKFDPage;

