import React from 'react';
import { useNavigate } from 'react-router-dom';
import projectDetails from '../data/projectDetails';
import './ProjectDetailPage.css';

function PRDSystemPage() {
  const navigate = useNavigate();
  const project = projectDetails['PRDSystem'];

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
            {project.stack && (
              <div className="project-detail-meta-item">
                <span className="project-detail-meta-label">Stack:</span>
                <span className="project-detail-meta-value">{project.stack}</span>
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
                {project.problem.split('\n').map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            </section>
          )}

          {project.features && Object.keys(project.features).length > 0 && (
            <section className="project-detail-section">
              <h2 className="project-detail-section-title">Features</h2>
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
              <h2 className="project-detail-section-title">Future Vision</h2>
              <div className="project-detail-text">
                {project.futureVision.split('\n').map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            </section>
          )}

          {project.architecture && (
            <section className="project-detail-section">
              <h2 className="project-detail-section-title">Architecture</h2>
              <div className="project-detail-text">
                {project.architecture.split('\n').map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            </section>
          )}

          {project.designPrinciples && (
            <section className="project-detail-section">
              <h2 className="project-detail-section-title">Design Principles</h2>
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

          {project.demoLink && (
            <div className="project-detail-actions">
              <a
                href={project.demoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="project-detail-demo-link"
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

export default PRDSystemPage;

