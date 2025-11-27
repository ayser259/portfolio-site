import React from 'react';
import { useNavigate } from 'react-router-dom';
import projectDetails from '../data/projectDetails';
import './ProjectDetailPage.css';

function ByteMePage() {
  const navigate = useNavigate();
  const project = projectDetails['ByteMe'];

  const screenshots = [
    {
      src: '/projects/ByteMe/ByteMe-Dashboard1.png',
      alt: 'ByteMe daily dashboard',
      caption: 'Home dashboard – a clean, glanceable view of today’s nutrition and trends.'
    },
    {
      src: '/projects/ByteMe/ByteMe-Chat1.png',
      alt: 'ByteMe insights chat view',
      caption: 'Insight surface – pulling patterns out of the raw nutrition data.'
    },
    {
      src: '/projects/ByteMe/ByteMe-Chat2.png',
      alt: 'ByteMe coaching-style chat',
      caption: 'Coaching-style conversation that connects data to behavior change.'
    },
    {
      src: '/projects/ByteMe/ByteMe-Dashboard2.png',
      alt: 'ByteMe macros breakdown view',
      caption: 'Macro breakdowns that stay readable and non-intimidating.'
    },
    {
      src: '/projects/ByteMe/ByteMe-Dashboard3.png',
      alt: 'ByteMe trends over time view',
      caption: 'Trends over time – making it easy to see patterns instead of isolated days.'
    },
    {
      src: '/projects/ByteMe/ByteMe-KeyManagement.png',
      alt: 'ByteMe settings and data management',
      caption: 'Settings, preferences, and data management – the plumbing that keeps it reliable.'
    },
    {
      src: '/projects/ByteMe/ByteMe-MultimodalEntry.png',
      alt: 'ByteMe multi-modal entry options',
      caption: 'Experimenting with multi-modal entry patterns to keep logging fast.'
    }
  ];

  const getEmbedUrl = (url) => {
    if (!url) return null;
    if (url.includes('loom.com/share/')) {
      return url.replace('/share/', '/embed/');
    }
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
                  <h2 className="project-detail-media-title">Walkthrough</h2>
                  <div className="project-detail-video-wrapper">
                    <iframe
                      src={demoEmbedUrl}
                      title="ByteMe product walkthrough"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                  <p className="project-detail-video-caption">
                    A short tour of how ByteMe actually feels to use day-to-day.
                  </p>
                </section>
              )}

              {screenshots.length > 0 && (
                <section className="project-detail-media-section project-detail-gallery">
                  <h2 className="project-detail-media-title">Screens & Flows</h2>
                  <div className="project-detail-gallery-grid">
                    {screenshots.map((shot) => (
                      <figure key={shot.src} className="project-detail-gallery-item">
                        <img src={shot.src} alt={shot.alt} />
                        {shot.caption && (
                          <figcaption className="project-detail-gallery-caption">
                            {shot.caption}
                          </figcaption>
                        )}
                      </figure>
                    ))}
                  </div>
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
                  <h2 className="project-detail-section-title">Problem & Inspiration</h2>
                  <div className="project-detail-text">
                    {project.problem.split('\n').map((paragraph, idx) => (
                      <p key={idx}>{paragraph}</p>
                    ))}
                  </div>
                </section>
              )}

              {project.features && Object.keys(project.features).length > 0 && (
                <section className="project-detail-section">
                  <h2 className="project-detail-section-title">What ByteMe Does Today</h2>
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
                  <h2 className="project-detail-section-title">Future Roadmap</h2>
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
                  <h2 className="project-detail-section-title">What I Learned</h2>
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
                Open full walkthrough in a new tab →
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ByteMePage;

