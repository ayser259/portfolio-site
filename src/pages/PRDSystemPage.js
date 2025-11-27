import React from 'react';
import { useNavigate } from 'react-router-dom';
import projectDetails from '../data/projectDetails';
import './ProjectDetailPage.css';

function PRDSystemPage() {
  const navigate = useNavigate();
  const project = projectDetails['PRDSystem'];

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
                      Talking out loud is often the fastest way to externalize a messy idea—voice memos beat staring at a blank PRD
                      template.
                    </li>
                    <li>
                      A structured AI “interview” is more effective than a one-shot “write me a PRD” prompt; it helps surface gaps,
                      clarify problems, and sharpen scope.
                    </li>
                    <li>
                      Separating the thinking phase (conversation) from the document creation phase (generation) keeps you in control and
                      makes the output more faithful to your real intent.
                    </li>
                    <li>
                      The workflow is reusable and teachable: once set up, any PM can follow the same 3 steps to go from brain dump to
                      shareable PRD in under an hour.
                    </li>
                  </ul>
                </div>
              </section>

              <section className="project-detail-section">
                <h2 className="project-detail-section-title">How to Use the Workflow</h2>
                <div className="project-detail-text">
                  <h3>1. Create a transcript of your idea</h3>
                  <ul>
                    <li>
                      Open a voice memo / recorder and start talking as if you&apos;re explaining the idea to a new teammate who needs to
                      run with it while you&apos;re on PTO.
                    </li>
                    <li>Make sure to cover:</li>
                    <ul>
                      <li>Background of the product area.</li>
                      <li>The member problem and the business problem you&apos;re trying to solve.</li>
                      <li>Additional context (history, constraints, dependencies, prior attempts).</li>
                      <li>How you&apos;d like to solve it – early solution ideas and directions.</li>
                    </ul>
                    <li>When you&apos;re done, save the recording and copy the transcript.</li>
                  </ul>

                  <h3>2. Elevate the idea (guided AI conversation)</h3>
                  <ul>
                    <li>
                      Paste your transcript into the first SighedKick prompt (the &quot;Elevate the Idea&quot; flow) where it says “Copy
                      paste transcript”.
                    </li>
                    <li>
                      Answer the questions the model asks. If something isn&apos;t relevant, say so explicitly and move on to the next
                      question.
                    </li>
                    <li>
                      Continue until:
                      <ul>
                        <li>You&apos;ve filled obvious gaps.</li>
                        <li>You feel like you&apos;re not adding much new information.</li>
                        <li>
                          The conversation history reads like a solid, structured understanding of the problem and your intended approach.
                        </li>
                      </ul>
                    </li>
                  </ul>

                  <h3>3. Generate the document</h3>
                  <ul>
                    <li>
                      Copy the full conversation history from Step 2 (transcript + all Q&amp;A) and paste it into the second SighedKick
                      prompt (the PRD generator) where it says “Copy paste transcript”.
                    </li>
                    <li>
                      Let the prompt turn that history into a structured doc (e.g., Background, Member Problem, Business Problem, Goals,
                      Proposed Solution, Risks, etc.).
                    </li>
                    <li>
                      Iterate by giving targeted feedback:
                      <ul>
                        <li>“Tighten the background section.”</li>
                        <li>“Add more detail on risks and dependencies.”</li>
                        <li>“Shorten the proposed solution by 30%.”</li>
                        <li>“Make the tone more concise and exec-ready.”</li>
                      </ul>
                    </li>
                    <li>
                      Once you&apos;re happy, copy the sections into your canonical doc tool (Confluence, Google Docs, Notion, etc.) and
                      continue editing there if needed.
                    </li>
                  </ul>

                  <h3>Flow at a glance</h3>
                  <div className="project-detail-flow">
                    <div className="project-detail-flow-step">
                      <div className="project-detail-flow-label">1</div>
                      <div className="project-detail-flow-content">
                        <h4>Talk it out</h4>
                        <p>Record a voice memo and turn it into a transcript.</p>
                      </div>
                    </div>
                    <div className="project-detail-flow-arrow">↓</div>
                    <div className="project-detail-flow-step">
                      <div className="project-detail-flow-label">2</div>
                      <div className="project-detail-flow-content">
                        <h4>Elevate in SighedKick</h4>
                        <p>Paste the transcript into the “Elevate the Idea” prompt and work through the guided Q&amp;A.</p>
                      </div>
                    </div>
                    <div className="project-detail-flow-arrow">↓</div>
                    <div className="project-detail-flow-step">
                      <div className="project-detail-flow-label">3</div>
                      <div className="project-detail-flow-content">
                        <h4>Generate the PRD</h4>
                        <p>Feed the full conversation into the PRD generator prompt to produce a structured draft.</p>
                      </div>
                    </div>
                    <div className="project-detail-flow-arrow">↓</div>
                    <div className="project-detail-flow-step">
                      <div className="project-detail-flow-label">4</div>
                      <div className="project-detail-flow-content">
                        <h4>Edit &amp; ship</h4>
                        <p>Give targeted feedback, then copy the final sections into your canonical PRD doc.</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="project-detail-cta-card">
                  <h3 className="project-detail-cta-title">Use the SighedKick prompts</h3>
                  <p className="project-detail-cta-text">
                    These two shared prompts power the Elevate → Generate flow for this PRD workflow.
                  </p>
                  <p className="project-detail-cta-text">
                    <strong>Step 2 – Elevate the idea:</strong>{' '}
                    <a
                      href="https://sighedkick.com/#/share/a4d3d3d1-5e82-411c-bc93-e03f1c702316"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-detail-cta-link"
                    >
                      Open the &quot;Elevate the Idea&quot; prompt
                    </a>
                  </p>
                  <p className="project-detail-cta-text">
                    <strong>Step 3 – Generate the PRD:</strong>{' '}
                    <a
                      href="https://sighedkick.com/#/share/4acd6ca1-fbe6-4bca-83ff-8458e76a5851"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-detail-cta-link"
                    >
                      Open the PRD generator prompt
                    </a>
                  </p>
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
                  <h2 className="project-detail-section-title">The 3-Step Workflow</h2>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PRDSystemPage;

