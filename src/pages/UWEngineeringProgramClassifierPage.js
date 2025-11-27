import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import projectDetails from '../data/projectDetails';
import ImageModal from '../components/ImageModal';
import './ProjectDetailPage.css';

function UWEngineeringProgramClassifierPage() {
  const navigate = useNavigate();
  const project = projectDetails['UWEngineeringProgramClassifier'];
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
                      You don&apos;t need a huge deep-learning stack to add value here—a carefully designed, relatively simple classifier
                      can materially improve program recommendations.
                    </li>
                    <li>
                      Evaluation metrics like accuracy alone are insufficient; metrics such as Reciprocal Rank, Top-3 rate, and Top-X rates
                      give a much clearer sense of how helpful rankings are to real students.
                    </li>
                    <li>
                      Fairness checks (gender and program bias) are first-class concerns, not afterthoughts: the confusion matrices and
                      gender-bias charts directly shaped which model was selected.
                    </li>
                    <li>
                      The final model balances performance and interpretability, making it easier to explain to stakeholders why it&apos;s
                      trustworthy and how it should be used.
                    </li>
                  </ul>
                </div>
              </section>

              <section className="project-detail-section">
                <h2 className="project-detail-section-title">Model Families & Hypotheses</h2>
                <div className="project-detail-text">
                  <p>
                    The project explored a wide space of model families and hypotheses, varying question sets, encodings, model types, and
                    label strategies. Each combination formed a different hypothesis about how best to map survey answers to program
                    recommendations.
                  </p>
                  <figure className="project-detail-gallery-item" onClick={() => setSelectedImage("/projects/legacy/uw_placement_quiz_classifier_model_tree.png")}>
                    <img
                      src="/projects/legacy/uw_placement_quiz_classifier_model_tree.png"
                      alt="Model family tree diagram"
                      style={{ cursor: 'pointer' }}
                    />
                    <figcaption className="project-detail-gallery-caption">
                      Model family tree outlining the combinations of features, encodings, and model types explored.
                    </figcaption>
                  </figure>
                </div>
              </section>

              <section className="project-detail-section">
                <h2 className="project-detail-section-title">Evaluation Metrics</h2>
                <div className="project-detail-text">
                  <p>
                    Instead of relying solely on accuracy, the team used a set of ranking metrics to evaluate how well models served
                    students:
                  </p>
                  <ul>
                    <li>
                      <strong>Reciprocal Rank</strong> – how high a student&apos;s actual program appears in the ranked list.
                    </li>
                    <li>
                      <strong>Top-3 rate (t3)</strong> – how often the true program appears in the top three recommendations.
                    </li>
                    <li>
                      <strong>Top-X rates</strong> – how often the true program appears in the top X positions, for various X.
                    </li>
                  </ul>
                  <div className="project-detail-gallery-grid">
                    <figure className="project-detail-gallery-item" onClick={() => setSelectedImage("/projects/legacy/uw_placement_quiz_classifier_reciprocal_rank.png")}>
                      <img
                        src="/projects/legacy/uw_placement_quiz_classifier_reciprocal_rank.png"
                        alt="Reciprocal rank formula diagram"
                        style={{ cursor: 'pointer' }}
                      />
                      <figcaption className="project-detail-gallery-caption">
                        Reciprocal Rank metric as presented to stakeholders.
                      </figcaption>
                    </figure>
                    <figure className="project-detail-gallery-item" onClick={() => setSelectedImage("/projects/legacy/uw_placement_quiz_classifier_t3_rate.png")}>
                      <img
                        src="/projects/legacy/uw_placement_quiz_classifier_t3_rate.png"
                        alt="Top-3 rate formula diagram"
                        style={{ cursor: 'pointer' }}
                      />
                      <figcaption className="project-detail-gallery-caption">
                        Top-3 (t3) rate definition highlighting focus on the top of the list.
                      </figcaption>
                    </figure>
                  </div>
                </div>
              </section>

              <section className="project-detail-section">
                <h2 className="project-detail-section-title">Bias & Fairness Checks</h2>
                <div className="project-detail-text">
                  <p>
                    Because the classifier is used to guide high-stakes educational decisions, bias checks were central to model selection:
                  </p>
                  <ul>
                    <li>Does the model disproportionately recommend certain programs to certain genders?</li>
                    <li>
                      Does it collapse too many students into a small set of “popular” programs, ignoring less common but appropriate
                      options?
                    </li>
                  </ul>
                  <div className="project-detail-gallery-grid">
                    <figure className="project-detail-gallery-item" onClick={() => setSelectedImage("/projects/legacy/uw_engineering_placement_qui_gender_bias.png")}>
                      <img
                        src="/projects/legacy/uw_engineering_placement_qui_gender_bias.png"
                        alt="Gender bias visualization"
                        style={{ cursor: 'pointer' }}
                      />
                      <figcaption className="project-detail-gallery-caption">
                        Gender bias visualization used to check whether certain programs skewed heavily by gender in recommendations.
                      </figcaption>
                    </figure>
                    <figure className="project-detail-gallery-item" onClick={() => setSelectedImage("/projects/legacy/uw_engineering_quiz_old_team_matrix.png")}>
                      <img
                        src="/projects/legacy/uw_engineering_quiz_old_team_matrix.png"
                        alt="Old quiz confusion matrix"
                        style={{ cursor: 'pointer' }}
                      />
                      <figcaption className="project-detail-gallery-caption">
                        Confusion matrix for the legacy quiz, showing a heavy bias toward a few programs.
                      </figcaption>
                    </figure>
                    <figure className="project-detail-gallery-item" onClick={() => setSelectedImage("/projects/legacy/uw_engineering_placement_quiz_confusion_matrix.png")}>
                      <img
                        src="/projects/legacy/uw_engineering_placement_quiz_confusion_matrix.png"
                        alt="New model confusion matrix"
                        style={{ cursor: 'pointer' }}
                      />
                      <figcaption className="project-detail-gallery-caption">
                        Confusion matrix for the new model, showing a more balanced distribution across programs.
                      </figcaption>
                    </figure>
                  </div>
                  <figure className="project-detail-gallery-item" onClick={() => setSelectedImage("/projects/legacy/uw_engineering_placement_quiz_ranking_heatmap.png")}>
                    <img
                      src="/projects/legacy/uw_engineering_placement_quiz_ranking_heatmap.png"
                      alt="Ranking heatmap"
                      style={{ cursor: 'pointer' }}
                    />
                    <figcaption className="project-detail-gallery-caption">
                      Heatmap of where each program tends to be ranked, helping validate that programs appear near the top when appropriate.
                    </figcaption>
                  </figure>
                </div>
              </section>

              <section className="project-detail-section">
                <h2 className="project-detail-section-title">Model Selection & Performance</h2>
                <div className="project-detail-text">
                  <p>
                    Multiple model variants were benchmarked across the ranking metrics, and performance curves were compared to understand
                    how often the correct program appears in the top of the list.
                  </p>
                  <figure className="project-detail-gallery-item" onClick={() => setSelectedImage("/projects/legacy/uw_engineering_placement_quiz_scores.png")}>
                    <img
                      src="/projects/legacy/uw_engineering_placement_quiz_scores.png"
                      alt="Top-X scores chart"
                      style={{ cursor: 'pointer' }}
                    />
                    <figcaption className="project-detail-gallery-caption">
                      Top-X scores for the selected model versus alternatives, used to choose the production model.
                    </figcaption>
                  </figure>
                  <p>
                    The final choice reflects a balance: strong Top-3 and Top-5 performance, good coverage across programs, and acceptable
                    bias characteristics.
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

export default UWEngineeringProgramClassifierPage;


