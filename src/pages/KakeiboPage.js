import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import projectDetails from '../data/projectDetails';
import ImageModal from '../components/ImageModal';
import './ProjectDetailPage.css';

function KakeiboPage() {
  const navigate = useNavigate();
  const project = projectDetails['Kakeibo'];
  const [selectedImage, setSelectedImage] = useState(null);

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
                      Kakeibo reframes budgeting from “move money between categories” to “reflect on what you want your money to do,” which
                      changes both the product surface and the copy.
                    </li>
                    <li>
                      User research and competitive analysis highlighted that people are overwhelmed by dense dashboards and appreciate
                      lightweight structures that nudge reflection without feeling like homework.
                    </li>
                    <li>
                      Card sorting and information architecture work were critical to turning the philosophy into a navigation model that
                      feels intuitive in a digital context.
                    </li>
                    <li>
                      Multiple UI explorations converged on a design that keeps the journaling questions close to the transactional views,
                      so reflection and action stay tightly coupled.
                    </li>
                  </ul>
                </div>
              </section>

              <section className="project-detail-section">
                <h2 className="project-detail-section-title">Key Screens</h2>
                <div className="project-detail-gallery-grid">
                  <figure className="project-detail-gallery-item" onClick={() => setSelectedImage("/projects/legacy/kakeibo_preview.png")}>
                    <img
                      src="/projects/legacy/kakeibo_preview.png"
                      alt="Kakeibo home screen preview"
                      style={{ cursor: 'pointer' }}
                      className="project-detail-image-rotate-90"
                    />
                    <figcaption className="project-detail-gallery-caption">
                      Preview of the kakeibo-inspired home experience.
                    </figcaption>
                  </figure>
                </div>
              </section>

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
                {project.status && (
                  <div className="project-detail-meta-item">
                    <span className="project-detail-meta-label">Status:</span>
                    <span className="project-detail-meta-value">{project.status}</span>
                  </div>
                )}
              </div>

              <section className="project-detail-section">
                <h2 className="project-detail-section-title">Phase 0 – Initial Planning</h2>
                <div className="project-detail-text">
                  <p>
                    The work started with framing: what does it mean to translate a paper money journal into a digital product without
                    losing the discipline that makes kakeibo powerful?
                  </p>
                  <figure className="project-detail-gallery-item" onClick={() => setSelectedImage("/projects/legacy/kakeibo_initial_planning.png")}>
                    <img
                      src="/projects/legacy/kakeibo_initial_planning.png"
                      alt="Initial planning artifacts for Kakeibo"
                      style={{ cursor: 'pointer' }}
                    />
                  </figure>
                </div>
              </section>

              <section className="project-detail-section">
                <h2 className="project-detail-section-title">Phase 1 – Research & Requirements</h2>
                <div className="project-detail-text">
                  <p>
                    A competitive analysis across budgeting apps and analog kakeibo workflows surfaced gaps: most products focus on precise
                    categorization and reporting, not reflection and intention.
                  </p>
                  <figure className="project-detail-gallery-item" onClick={() => setSelectedImage("/projects/legacy/kakeibo_competitor_analysis.png")}>
                    <img
                      src="/projects/legacy/kakeibo_competitor_analysis.png"
                      alt="Kakeibo competitor analysis"
                      style={{ cursor: 'pointer' }}
                    />
                  </figure>
                  <p>
                    Interviews with potential users helped clarify what felt approachable vs. overwhelming and which concepts from kakeibo
                    resonated in a digital setting.
                  </p>
                </div>
              </section>

              <section className="project-detail-section">
                <h2 className="project-detail-section-title">Phase 2 – Information Architecture</h2>
                <div className="project-detail-text">
                  <p>
                    Destinations and concepts from the research were turned into cards and used for sorting exercises, which in turn shaped
                    the navigation and grouping in the product.
                  </p>
                  <div className="project-detail-gallery-grid">
                    <figure className="project-detail-gallery-item" onClick={() => setSelectedImage("/projects/legacy/kakeibo_destinations.png")}>
                      <img
                        src="/projects/legacy/kakeibo_destinations.png"
                        alt="Destinations used for Kakeibo card sorting"
                        style={{ cursor: 'pointer' }}
                      />
                      <figcaption className="project-detail-gallery-caption">
                        Destinations used for card sorting to define the IA.
                      </figcaption>
                    </figure>
                    <figure className="project-detail-gallery-item" onClick={() => setSelectedImage("/projects/legacy/kakeibo_card_sort.png")}>
                      <img
                        src="/projects/legacy/kakeibo_card_sort.png"
                        alt="Kakeibo card sort results"
                        style={{ cursor: 'pointer' }}
                      />
                      <figcaption className="project-detail-gallery-caption">
                        Card sorting output that informed how features cluster.
                      </figcaption>
                    </figure>
                    <figure className="project-detail-gallery-item" onClick={() => setSelectedImage("/projects/legacy/kakeibo_navigation_from_sorting.png")}>
                      <img
                        src="/projects/legacy/kakeibo_navigation_from_sorting.png"
                        alt="Navigation derived from card sorting"
                        style={{ cursor: 'pointer' }}
                      />
                      <figcaption className="project-detail-gallery-caption">
                        Navigation and hierarchy derived directly from the card sort.
                      </figcaption>
                    </figure>
                  </div>
                </div>
              </section>

              <section className="project-detail-section">
                <h2 className="project-detail-section-title">Visual Design Explorations</h2>
                <div className="project-detail-text">
                  <p>
                    Several layout and visual design options were explored to find the right balance between clarity, hierarchy, and the
                    “journal” feel of kakeibo.
                  </p>
                  <div className="project-detail-gallery-grid">
                    <figure className="project-detail-gallery-item" onClick={() => setSelectedImage("/projects/legacy/kakeibo_option_1.png")}>
                      <img src="/projects/legacy/kakeibo_option_1.png" alt="Kakeibo UI option 1" style={{ cursor: 'pointer' }} />
                    </figure>
                    <figure className="project-detail-gallery-item" onClick={() => setSelectedImage("/projects/legacy/kakeibo_option_2.png")}>
                      <img src="/projects/legacy/kakeibo_option_2.png" alt="Kakeibo UI option 2" style={{ cursor: 'pointer' }} />
                    </figure>
                    <figure className="project-detail-gallery-item" onClick={() => setSelectedImage("/projects/legacy/kakeibo_option_3.png")}>
                      <img src="/projects/legacy/kakeibo_option_3.png" alt="Kakeibo UI option 3" style={{ cursor: 'pointer' }} />
                    </figure>
                    <figure className="project-detail-gallery-item" onClick={() => setSelectedImage("/projects/legacy/kakeibo_option_4.png")}>
                      <img src="/projects/legacy/kakeibo_option_4.png" alt="Kakeibo UI option 4" style={{ cursor: 'pointer' }} />
                    </figure>
                    <figure className="project-detail-gallery-item" onClick={() => setSelectedImage("/projects/legacy/kakeibo_option_5.png")}>
                      <img src="/projects/legacy/kakeibo_option_5.png" alt="Kakeibo UI option 5" style={{ cursor: 'pointer' }} />
                    </figure>
                  </div>
                </div>
              </section>

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
                  <h2 className="project-detail-section-title">What It Does</h2>
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
                  <h2 className="project-detail-section-title">What I Took Away</h2>
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
      <ImageModal
        imageSrc={selectedImage}
        imageAlt=""
        isOpen={!!selectedImage}
        onClose={() => setSelectedImage(null)}
      />
    </div>
  );
}

export default KakeiboPage;

