import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import projectDetails from '../data/projectDetails';
import ImageModal from '../components/ImageModal';
import './ProjectDetailPage.css';

function UWPlacementQuizPage() {
  const navigate = useNavigate();
  const project = projectDetails['UWPlacementQuiz'];
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
                      A generic “one-size-fits-all” placement quiz isn&apos;t enough—students need a tool that reflects meaningful
                      differences between 15 engineering programs and surfaces those differences clearly.
                    </li>
                    <li>
                      Combining interviews with professors and students plus affinity diagramming produced a richer question set that
                      actually encodes what&apos;s unique about each program.
                    </li>
                    <li>
                      The front-end UX and back-end analytics pipeline were designed together so the quiz is not just accurate, but
                      maintainable, explainable, and useful to UW&apos;s recruitment and marketing teams.
                    </li>
                    <li>
                      The result is a modular, API-driven system where questions, scoring, and recommendations can evolve without needing
                      to rebuild everything from scratch.
                    </li>
                  </ul>
                </div>
              </section>

              <section className="project-detail-section">
                <h2 className="project-detail-section-title">Key Screens</h2>
                <div className="project-detail-gallery-grid">
                  <figure className="project-detail-gallery-item">
                    <img
                      src="/projects/legacy/uw_placement_quiz_overview.png"
                      alt="UW Placement Quiz overview"
                      onClick={() => setSelectedImage("/projects/legacy/uw_placement_quiz_overview.png")}
                      style={{ cursor: 'pointer' }}
                    />
                    <figcaption className="project-detail-gallery-caption">
                      High-level overview of the UW Engineering Placement Quiz experience.
                    </figcaption>
                  </figure>
                </div>
                <div className="project-detail-cta-card">
                  <h3 className="project-detail-cta-title">Try the quiz</h3>
                  <p className="project-detail-cta-text">
                    Answer a short series of questions and see which Waterloo Engineering programs best match your interests.
                  </p>
                  <a
                    href="https://uw-engineering-quiz.herokuapp.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-detail-cta-link"
                  >
                    Open the compatibility tool
                  </a>
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
                <h2 className="project-detail-section-title">Context</h2>
                <div className="project-detail-text">
                  <p>
                    The University of Waterloo has fifteen direct-entry engineering programs. Applicants must pick a program up front, and
                    transferring later can be costly in time and effort—often adding an extra year.
                  </p>
                  <p>
                    An existing placement quiz had been in use for several years, but it had become stale: programs had evolved, new ones
                    had been added, and the underlying model was scored only on accuracy, not on fairness or quality of the ranking
                    experience.
                  </p>
                  <p>
                    This project set out to redesign the quiz, model, and system end to end: better questions, better modeling, better UX,
                    and better analytics for the recruitment and marketing teams.
                  </p>
                </div>
              </section>

              <section className="project-detail-section">
                <h2 className="project-detail-section-title">Stage 0 – Research & Requirements</h2>
                <div className="project-detail-text">
                  <p>
                    Interviews with professors surfaced what they liked and disliked about the existing quiz, plus the nuances of each
                    program: which students tend to thrive, what projects they work on, and how programs overlap or differ.
                  </p>
                  <p>
                    Interviews with students captured the “I wish I had known…” moments—insight into misconceptions and the kinds of
                    information that would have changed their program choices.
                  </p>
                  <p>
                    Given the volume and richness of the qualitative data, affinity diagramming was used to cluster insights and identify
                    themes, which then informed question design.
                  </p>
                  <figure className="project-detail-gallery-item" onClick={() => setSelectedImage("/projects/legacy/uw_placement_quiz_affinity_diagram.png")}>
                    <img
                      src="/projects/legacy/uw_placement_quiz_affinity_diagram.png"
                      alt="Affinity diagram for UW placement quiz research"
                      style={{ cursor: 'pointer' }}
                    />
                    <figcaption className="project-detail-gallery-caption">
                      Affinity diagramming output that organizes qualitative insights across programs.
                    </figcaption>
                  </figure>
                </div>
              </section>

              <section className="project-detail-section">
                <h2 className="project-detail-section-title">Stage 1 – Data Collection & Analysis</h2>
                <div className="project-detail-text">
                  <p>
                    A survey based on those themes was sent to current students and alumni across all 15 programs. Roughly 1,650 responses
                    were collected, with around 1,300 rows remaining after cleaning and filtering.
                  </p>
                  <p>
                    Analysis showed:
                  </p>
                  <ul>
                    <li>Gender was collected only to audit and remove bias.</li>
                    <li>
                      Responses about desired industries (e.g., “designing buildings” vs. “improving how we use the world&apos;s
                      resources”) mapped strongly to specific programs.
                    </li>
                    <li>
                      Some questions (like attitudes toward group work) showed little signal and were treated as low-importance in the
                      model.
                    </li>
                  </ul>
                </div>
              </section>

              <section className="project-detail-section">
                <h2 className="project-detail-section-title">Stage 3 – Building the Interactive Quiz</h2>
                <div className="project-detail-text">
                  <p>
                    Once the model and question set were in place, the team focused on designing a quiz experience that felt personal and
                    explanatory, not like a black-box sorter.
                  </p>
                  <figure className="project-detail-gallery-item" onClick={() => setSelectedImage("/projects/legacy/uw_engineering_placement_quiz_user_flow.png")}>
                    <img
                      src="/projects/legacy/uw_engineering_placement_quiz_user_flow.png"
                      alt="User flow for UW Engineering Placement Quiz"
                      style={{ cursor: 'pointer' }}
                    />
                    <figcaption className="project-detail-gallery-caption">
                      User flow outlining how students move through questions and recommendations.
                    </figcaption>
                  </figure>
                  <p>
                    The quiz format was kept intentionally familiar to students and the client, while the underlying explanation and result
                    screens were designed to help students understand why they were seeing certain programs.
                  </p>
                </div>
              </section>

              <section className="project-detail-section">
                <h2 className="project-detail-section-title">Back-End & System Design</h2>
                <div className="project-detail-text">
                  <p>
                    The production system uses Python and Django, backed by Postgres, and is deployed on Heroku. The architecture is
                    deliberately modular: frontend, API, and model can be updated with minimal coupling.
                  </p>
                  <figure className="project-detail-gallery-item" onClick={() => setSelectedImage("/projects/legacy/uw_placement_quiz_uml.png")}>
                    <img
                      src="/projects/legacy/uw_placement_quiz_uml.png"
                      alt="UML diagram for UW Placement Quiz system"
                      style={{ cursor: 'pointer' }}
                    />
                    <figcaption className="project-detail-gallery-caption">
                      UML diagram showing the database and system design for the quiz.
                    </figcaption>
                  </figure>
                  <p>
                    The system logs quiz responses (without PII) so the team can analyze program recommendations and usage patterns, and
                    provides an admin interface for updating content and pulling analytics.
                  </p>
                </div>
              </section>

              <section className="project-detail-section">
                <h2 className="project-detail-section-title">How Waterloo Uses It Today</h2>
                <div className="project-detail-text">
                  <p>
                    The quiz now powers Waterloo Engineering&apos;s official{' '}
                    <a
                      href="https://uwaterloo.ca/engineering/future-students/engineering-program-compatibility-quiz"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Engineering Program Compatibility Quiz
                    </a>
                    , and is used as part of the faculty&apos;s recruiting and orientation programs to help new students find the right
                    engineering path for them.
                  </p>
                  <p>
                    In practice, that means this project moved from a one-off prototype to a production decision-support tool embedded in
                    the university&apos;s recruitment journey.
                  </p>
                </div>
                <div className="project-detail-cta-card">
                  <h3 className="project-detail-cta-title">See it on Waterloo Engineering</h3>
                  <p className="project-detail-cta-text">
                    Explore how the quiz is positioned for future students as part of the official Waterloo Engineering site.
                  </p>
                  <a
                    href="https://uwaterloo.ca/engineering/future-students/engineering-program-compatibility-quiz"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-detail-cta-link"
                  >
                    View the Engineering Program Compatibility Quiz page
                  </a>
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

export default UWPlacementQuizPage;


