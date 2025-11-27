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

  const demoEmbedUrl = getEmbedUrl(project.demoLink);

  return (
    <div className="project-detail-page">
      <div className="project-detail-container">
        <button onClick={() => navigate('/')} className="back-button">
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
            <div className="project-detail-media-column">
              {demoEmbedUrl && (
                <section className="project-detail-media-section">
                  <h2 className="project-detail-media-title">Interactive Demo</h2>
                  <div className="project-detail-video-wrapper">
                    <iframe
                      src={demoEmbedUrl}
                      title="Financial Wellness Demos"
                      loading="lazy"
                    />
                  </div>
                  <p className="project-detail-video-caption">
                    The live React demo I use to align stakeholders around a modern financial wellness experience.
                  </p>
                </section>
              )}
            </div>

            <div className="project-detail-content-column">
              {project.overview && (
                <section className="project-detail-section">
                  <h2 className="project-detail-section-title">Overview</h2>
                  <div className="project-detail-text">
                    {project.overview.split('\n').map((paragraph, idx) => (
                      <p key={idx}>{paragraph}</p>
                    ))}
                  </div>
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
                  <h2 className="project-detail-section-title">Inspiration & Philosophy</h2>
                  <div className="project-detail-text">
                    {project.problem.split('\n').map((paragraph, idx) => (
                      <p key={idx}>{paragraph}</p>
                    ))}
                  </div>
                </section>
              )}

              {project.features && Object.keys(project.features).length > 0 && (
                <section className="project-detail-section">
                  <h2 className="project-detail-section-title">What’s in the Demo Today</h2>
                  {Object.entries(project.features).map(([featureName, featureDesc]) => (
                    <div key={featureName} className="project-detail-feature-item">
                      <h3 className="project-detail-feature-title">{featureName}</h3>
                      <div className="project-detail-text">
                        {featureDesc.split('\n').map((paragraph, idx) => (
                          <p key={idx}>{paragraph}</p>
                        ))}
                      </div>
                    </div>
                  ))}
                </section>
              )}

              {project.futureVision && (
                <section className="project-detail-section">
                  <h2 className="project-detail-section-title">Where It’s Going</h2>
                  <div className="project-detail-text">
                    {project.futureVision.split('\n').map((paragraph, idx) => (
                      <p key={idx}>{paragraph}</p>
                    ))}
                  </div>
                </section>
              )}

              {project.architecture && (
                <section className="project-detail-section">
                  <h2 className="project-detail-section-title">How I Built It</h2>
                  <div className="project-detail-text">
                    {project.architecture.split('\n').map((paragraph, idx) => (
                      <p key={idx}>{paragraph}</p>
                    ))}
                  </div>
                </section>
              )}

              {project.designPrinciples && (
                <section className="project-detail-section">
                  <h2 className="project-detail-section-title">Design & Demo Principles</h2>
                  <div className="project-detail-text">
                    {project.designPrinciples.split('\n').map((paragraph, idx) => (
                      <p key={idx}>{paragraph}</p>
                    ))}
                  </div>
                </section>
              )}

              {project.outcomes && (
                <section className="project-detail-section">
                  <h2 className="project-detail-section-title">Outcomes</h2>
                  <div className="project-detail-text">
                    {project.outcomes.split('\n').map((paragraph, idx) => (
                      <p key={idx}>{paragraph}</p>
                    ))}
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

          {project.demoLink && (
            <div className="project-detail-actions">
              <a
                href={project.demoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="project-detail-demo-link"
              >
                Open interactive demo in a new tab →
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CKFDPage;

