import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import projectDetails from '../data/projectDetails';
import ImageModal from '../components/ImageModal';
import './ProjectDetailPage.css';

function SighedKickPage() {
  const navigate = useNavigate();
  const project = projectDetails['SighedKick'];
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

  // Image mappings for each feature
  const featureImages = {
    'Prompt Library': [
      {
        src: '/projects/Sighedkick/SighedKick-Library.png',
        alt: 'SighedKick Prompt Library view',
        caption: 'Prompt Library – my reusable prompts, patterns, and context snippets in one place.'
      }
    ],
    'Canvas': {
      beforeWhatItDoes: {
        src: '/projects/Sighedkick/Sighedkick-Canvas1.png',
        alt: 'SighedKick Canvas workspace',
        caption: 'Canvas – AI-augmented workspace for drafting, rewriting, and structuring longer-form work.'
      },
      afterWorkflow: {
        src: '/projects/Sighedkick/Sighedkick-Canvas2.png',
        alt: 'SighedKick Canvas with analysis and drafts',
        caption: 'Canvas in use to break down a complex thread and converge on a final draft.'
      }
    },
    'Tone Shift': [
      {
        src: '/projects/Sighedkick/Sighedkick-Canvas3.png',
        alt: 'SighedKick Canvas reply variants',
        caption: 'Side-by-side variants to tune tone, structure, and emphasis before sending.'
      }
    ]
  };

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
          {/* Overview at the top */}
          {project.overview && (
            <section className="project-detail-section">
              <h2 className="project-detail-section-title">Overview</h2>
              <div className="project-detail-text">
                {renderTextWithBullets(project.overview)}
              </div>
            </section>
          )}

          {/* Walkthrough of Canvas */}
          {demoEmbedUrl && (
            <section className="project-detail-section">
              <h2 className="project-detail-section-title">Walkthrough of Canvas</h2>
              <div className="project-detail-video-wrapper">
                <iframe
                  src={demoEmbedUrl}
                  title="SighedKick Canvas walkthrough"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <p className="project-detail-video-caption">
                A walkthrough of Canvas—the AI-augmented workspace where I draft, rewrite, and structure my work.
              </p>
            </section>
          )}

          {/* CTA Card */}
          <div className="project-detail-cta-card">
            <h3 className="project-detail-cta-title">Try SighedKick for yourself</h3>
            <p className="project-detail-cta-text">
              SighedKick is my personal GenAI copilot that I use every day. Sign up to explore the Prompt Library, try Canvas for your own work, and see how a model-agnostic, workflow-first approach to GenAI feels in practice.
            </p>
            <a
              href="https://sighedkick.com/#/signup"
              target="_blank"
              rel="noopener noreferrer"
              className="project-detail-cta-link"
            >
              Sign up for SighedKick
            </a>
          </div>

          {/* Sharing prompt image */}
          <div className="project-detail-gallery-grid" style={{ marginTop: '1.5rem', marginBottom: '1.5rem' }}>
            <figure className="project-detail-gallery-item" onClick={() => setSelectedImage('/projects/Sighedkick/SighedKick-SharePrompt.png')}>
              <img 
                src="/projects/Sighedkick/SighedKick-SharePrompt.png" 
                alt="SighedKick prompt sharing view" 
                style={{ cursor: 'pointer' }} 
              />
              <figcaption className="project-detail-gallery-caption">
                Sharing a prompt as a reusable asset instead of a one-off message in chat.
              </figcaption>
            </figure>
          </div>

          {/* Problem & Spark */}
          {project.problem && (
            <section className="project-detail-section">
              <h2 className="project-detail-section-title">The Problem & Spark</h2>
              <div className="project-detail-text">
                {renderTextWithBullets(project.problem)}
              </div>
            </section>
          )}

          <div className="project-detail-layout">
            <div className="project-detail-content-column">

          {project.features && Object.keys(project.features).length > 0 && (
            <section className="project-detail-section">
              <h2 className="project-detail-section-title">Features</h2>
              {Object.entries(project.features).map(([featureName, featureDesc]) => {
                const images = featureImages[featureName];
                
                // Special handling for Canvas feature
                if (featureName === 'Canvas' && images && typeof images === 'object' && !Array.isArray(images)) {
                  const renderImage = (img) => (
                    <figure key={img.src} className="project-detail-gallery-item" style={{ margin: '1.5rem 0', maxWidth: '100%' }} onClick={() => setSelectedImage(img.src)}>
                      <img src={img.src} alt={img.alt} style={{ cursor: 'pointer', width: '100%', height: 'auto' }} />
                      {img.caption && (
                        <figcaption className="project-detail-gallery-caption">
                          {img.caption}
                        </figcaption>
                      )}
                    </figure>
                  );

                  // Split Canvas text into sections
                  const introEnd = featureDesc.indexOf('What Canvas does:');
                  const workflowStart = featureDesc.indexOf('My current workflow:');
                  const workflowEnd = featureDesc.indexOf('What makes Canvas powerful');
                  
                  const introText = featureDesc.substring(0, introEnd).trim();
                  const whatItDoesText = featureDesc.substring(introEnd, workflowStart).trim();
                  const workflowText = featureDesc.substring(workflowStart, workflowEnd).trim();
                  const closingText = featureDesc.substring(workflowEnd).trim();

                  const elements = [];
                  
                  // Intro section
                  if (introText) {
                    const introElements = renderTextWithBullets(introText);
                    if (introElements) {
                      elements.push(...(Array.isArray(introElements) ? introElements : [introElements]));
                    }
                  }
                  
                  // Image before "What Canvas does:"
                  if (images.beforeWhatItDoes) {
                    elements.push(renderImage(images.beforeWhatItDoes));
                  }
                  
                  // "What Canvas does:" section
                  if (whatItDoesText) {
                    const whatItDoesElements = renderTextWithBullets(whatItDoesText);
                    if (whatItDoesElements) {
                      elements.push(...(Array.isArray(whatItDoesElements) ? whatItDoesElements : [whatItDoesElements]));
                    }
                  }
                  
                  // "My current workflow:" section
                  if (workflowText) {
                    const workflowElements = renderTextWithBullets(workflowText);
                    if (workflowElements) {
                      elements.push(...(Array.isArray(workflowElements) ? workflowElements : [workflowElements]));
                    }
                  }
                  
                  // Image after workflow
                  if (images.afterWorkflow) {
                    elements.push(renderImage(images.afterWorkflow));
                  }
                  
                  // Closing text
                  if (closingText) {
                    const closingElements = renderTextWithBullets(closingText);
                    if (closingElements) {
                      elements.push(...(Array.isArray(closingElements) ? closingElements : [closingElements]));
                    }
                  }

                  return (
                    <div key={featureName} className="project-detail-feature-item">
                      <h3 className="project-detail-feature-title">{featureName}</h3>
                      <div className="project-detail-text">
                        {elements}
                      </div>
                    </div>
                  );
                }
                
                // Standard handling for other features
                const imageArray = Array.isArray(images) ? images : [];
                return (
                  <div key={featureName} className="project-detail-feature-item">
                    <h3 className="project-detail-feature-title">{featureName}</h3>
                    <div className="project-detail-text">
                      {renderTextWithBullets(featureDesc)}
                    </div>
                    {imageArray.length > 0 && (
                      <div className="project-detail-gallery-grid" style={{ marginTop: '1.5rem' }}>
                        {imageArray.map((img) => (
                          <figure key={img.src} className="project-detail-gallery-item" onClick={() => setSelectedImage(img.src)}>
                            <img src={img.src} alt={img.alt} style={{ cursor: 'pointer' }} />
                            {img.caption && (
                              <figcaption className="project-detail-gallery-caption">
                                {img.caption}
                              </figcaption>
                            )}
                          </figure>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </section>
          )}

          {project.futureVision && (
            <section className="project-detail-section">
              <h2 className="project-detail-section-title">Future Vision</h2>
              <div className="project-detail-text">
                {renderTextWithBullets(project.futureVision)}
              </div>
            </section>
          )}

          {project.architecture && (
            <section className="project-detail-section">
              <h2 className="project-detail-section-title">How It’s Built</h2>
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
      <ImageModal
        imageSrc={selectedImage}
        imageAlt=""
        isOpen={!!selectedImage}
        onClose={() => setSelectedImage(null)}
      />
    </div>
  );
}

export default SighedKickPage;


