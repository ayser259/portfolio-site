import React from 'react';
import { useNavigate } from 'react-router-dom';
import projectDetails from '../data/projectDetails';
import './ProjectDetailPage.css';

function MakingYourOwnCopilotPage() {
  const navigate = useNavigate();
  const project = projectDetails['MakingYourOwnCopilot'];

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

      // Check if line starts with a bullet point (dash or numbered)
      if (trimmedLine.match(/^[-•]\s/) || trimmedLine.match(/^\d+\.\s/)) {
        flushParagraph();
        const bulletText = trimmedLine.replace(/^[-•]\s/, '').replace(/^\d+\.\s/, '').trim();
        if (bulletText) {
          currentList.push(bulletText);
        }
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

  const getEmbedUrl = (url) => {
    if (!url) return null;
    if (url.includes('loom.com/share/')) {
      return url.replace('/share/', '/embed/');
    }
    return url;
  };

  // Convert Google Slides share URL to embed URL
  const getSlidesEmbedUrl = (url) => {
    if (!url) return null;
    // Extract presentation ID from share URL
    const match = url.match(/\/d\/([a-zA-Z0-9-_]+)/);
    if (match) {
      return `https://docs.google.com/presentation/d/${match[1]}/embed?start=false&loop=false&delayms=3000`;
    }
    return url;
  };

  const demoEmbedUrl = getEmbedUrl(project.demoLink);
  const slidesEmbedUrl = getSlidesEmbedUrl(project.slidesLink);

  return (
    <div className="project-detail-page">
      <div className="project-detail-container">
        <button onClick={() => navigate('/', { state: { scrollToProjects: true } })} className="back-button">
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

              <section className="project-detail-section">
                <h2 className="project-detail-section-title">Key Insights (TL;DR)</h2>
                <div className="project-detail-text">
                  <ul>
                    <li>
                      An AI copilot is a <strong>system</strong>—not just a model, prompt, or tool. It's how you create, use, and leverage a personalized ecosystem for interacting with LLMs.
                    </li>
                    <li>
                      Think of it like a <strong>robot vacuum</strong>: it learns your space, navigates obstacles, and gets better over time—but you still need to manage it and use your judgment.
                    </li>
                    <li>
                      The core skills are: <strong>decomposition</strong> (breaking work into AI-friendly tasks), <strong>context engineering</strong> (providing the right information at the right time), and <strong>prompt engineering</strong> (improving how you ask for things).
                    </li>
                    <li>
                      Start with a <strong>turn-key setup</strong>: Google Drive for inputs, Gemini/ChatGPT for interactions, and templates for outputs. Then iterate from there.
                    </li>
                    <li>
                      <strong>Context rot</strong> is real: as inputs grow, model reliability drops. For larger tasks, engineer context carefully and refresh conversations regularly.
                    </li>
                    <li>
                      The workshop is hands-on: participants build their own copilot during the session, starting with a "global context" document and then creating reusable workflows for specific use cases.
                    </li>
                  </ul>
                </div>
              </section>

              {demoEmbedUrl && (
                <section className="project-detail-media-section">
                  <h2 className="project-detail-media-title">Dry Run Walkthrough</h2>
                  <div className="project-detail-video-wrapper">
                    <iframe
                      src={demoEmbedUrl}
                      title="Making Your Own AI Copilot dry run walkthrough"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                  <p className="project-detail-video-caption">
                    A walkthrough of the workshop flow and exercises.
                  </p>
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
                  <h2 className="project-detail-section-title">Workshop Structure</h2>
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

              {project.outcomes && (
                <section className="project-detail-section">
                  <h2 className="project-detail-section-title">Impact</h2>
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

              {slidesEmbedUrl && (
                <section className="project-detail-media-section">
                  <h2 className="project-detail-media-title">Workshop Slides</h2>
                  <div className="project-detail-video-wrapper" style={{ paddingTop: '56.25%' }}>
                    <iframe
                      src={slidesEmbedUrl}
                      title="Making Your Own AI Copilot Workshop Slides"
                      allow="fullscreen"
                      allowFullScreen
                    />
                  </div>
                  <p className="project-detail-video-caption">
                    The full slide deck from the workshop, covering mental models, setup, and hands-on exercises.
                  </p>
                </section>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MakingYourOwnCopilotPage;

