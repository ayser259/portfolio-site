import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import projectDetails from '../data/projectDetails';
import ImageModal from '../components/ImageModal';
import './ProjectDetailPage.css';

function CanadianEconomyPage() {
  const navigate = useNavigate();
  const project = projectDetails['CanadianEconomy'];
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
                      Across the 2008–2019 period, Canadian GDP shows a strong post-recession recovery and then a fairly steady upward
                      trajectory, even as some underlying indicators move more noisily.
                    </li>
                    <li>
                      Wages—especially in manufacturing and information/cultural sectors—track GDP closely and act as strong signals, while
                      some financial-market variables (like securities transactions) add noise but little predictive value.
                    </li>
                    <li>
                      Simple clustering reveals two broad economic regimes with a transition band, but interpreting the causes of those
                      regimes requires domain expertise beyond the data alone.
                    </li>
                    <li>
                      For prediction, a relatively straightforward KNN model with the full feature set (k = 5) outperforms linear
                      baselines, showing that careful feature selection + simple models can go a long way for this problem.
                    </li>
                  </ul>
                </div>
              </section>

              <section className="project-detail-section">
                <h2 className="project-detail-section-title">Key Charts</h2>
                <div className="project-detail-gallery-grid">
                  <figure className="project-detail-gallery-item">
                    <img
                      src="/projects/legacy/canadian_economy_preview.png"
                      alt="Canadian economic performance preview"
                      onClick={() => setSelectedImage("/projects/legacy/canadian_economy_preview.png")}
                      style={{ cursor: 'pointer' }}
                    />
                    <figcaption className="project-detail-gallery-caption">
                      High-level preview of the Canadian Economic Performance dashboard used in the analysis.
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
                <h2 className="project-detail-section-title">Histograms of Key Variables</h2>
                <div className="project-detail-text">
                  <p>
                    To understand the distribution of each feature, the original analysis generated histograms (10 bins) and normalized the
                    data so different variables could be compared on the same scale.
                  </p>
                  <p>Takeaways from the histogram pass:</p>
                  <ul>
                    <li>
                      GDP appears close to a uniform or linear distribution over the study period.
                      <figure className="project-detail-gallery-item">
                        <img src="/projects/legacy/hist_GDP.png" alt="Histogram of Canadian GDP" onClick={() => setSelectedImage("/projects/legacy/hist_GDP.png")} style={{ cursor: 'pointer' }} />
                      </figure>
                    </li>
                    <li>
                      Many features (like total electricity generation) follow a roughly normal or left-skewed normal distribution.
                      <figure className="project-detail-gallery-item">
                        <img
                          src="/projects/legacy/hist_electricity_generation.png"
                          alt="Histogram of total electricity generation"
                          onClick={() => setSelectedImage("/projects/legacy/hist_electricity_generation.png")}
                          style={{ cursor: 'pointer' }}
                        />
                      </figure>
                    </li>
                    <li>
                      Some features, such as electricity delivery, are more classically normal.
                      <figure className="project-detail-gallery-item">
                        <img
                          src="/projects/legacy/hist_electricity_delivery.png"
                          alt="Histogram of electricity delivery"
                          onClick={() => setSelectedImage("/projects/legacy/hist_electricity_delivery.png")}
                          style={{ cursor: 'pointer' }}
                        />
                      </figure>
                    </li>
                    <li>
                      Compensation of employees shows a wide, somewhat uniform spread that visually mirrors GDP and hints at correlation.
                      <figure className="project-detail-gallery-item">
                        <img
                          src="/projects/legacy/hist_compensation_employee.png"
                          alt="Histogram of employee compensation"
                          onClick={() => setSelectedImage("/projects/legacy/hist_compensation_employee.png")}
                          style={{ cursor: 'pointer' }}
                        />
                      </figure>
                    </li>
                    <li>
                      Employer&apos;s social contributions are one of the few bi-modal distributions.
                      <figure className="project-detail-gallery-item">
                        <img
                          src="/projects/legacy/hist_employer_social_contribution.png"
                          alt="Histogram of employer social contributions"
                          onClick={() => setSelectedImage("/projects/legacy/hist_employer_social_contribution.png")}
                          style={{ cursor: 'pointer' }}
                        />
                      </figure>
                    </li>
                  </ul>
                </div>
              </section>

              <section className="project-detail-section">
                <h2 className="project-detail-section-title">Trends Over Time vs GDP</h2>
                <div className="project-detail-text">
                  <p>
                    Each variable was then plotted over time and compared directly to GDP, which is the target the later models try to
                    predict.
                  </p>
                  <p>Key observations from those line charts:</p>
                  <ul>
                    <li>
                      GDP has risen steadily over the last decade, with a visible 2008 recession dip and recovery by around 2010.
                      <figure className="project-detail-gallery-item">
                        <img src="/projects/legacy/line_GDP.png" alt="Line chart of GDP over time" onClick={() => setSelectedImage("/projects/legacy/line_GDP.png")} style={{ cursor: 'pointer' }} />
                      </figure>
                    </li>
                    <li>
                      Total electricity generation shows strong seasonality (peaks in December, dips in June) with a slight upward drift.
                      <figure className="project-detail-gallery-item">
                        <img
                          src="/projects/legacy/line_total_electricity_generation.png"
                          alt="Line chart of total electricity generation"
                          onClick={() => setSelectedImage("/projects/legacy/line_total_electricity_generation.png")}
                          style={{ cursor: 'pointer' }}
                        />
                      </figure>
                    </li>
                    <li>
                      Securities transactions don&apos;t show a meaningful relationship with GDP and were excluded from the model.
                      <figure className="project-detail-gallery-item">
                        <img src="/projects/legacy/line_securities.png" alt="Line chart of securities transactions" onClick={() => setSelectedImage("/projects/legacy/line_securities.png")} style={{ cursor: 'pointer' }} />
                      </figure>
                    </li>
                    <li>
                      Wages and salaries trend positively with GDP, but wages are “sticky”: they don&apos;t dip as sharply as GDP in a
                      downturn.
                      <figure className="project-detail-gallery-item">
                        <img
                          src="/projects/legacy/line_compensation_employee.png"
                          alt="Line chart of compensation of employees"
                          onClick={() => setSelectedImage("/projects/legacy/line_compensation_employee.png")}
                          style={{ cursor: 'pointer' }}
                        />
                      </figure>
                    </li>
                    <li>
                      Wages in manufacturing and in information/cultural industries are among the most tightly correlated with GDP.
                      <figure className="project-detail-gallery-item">
                        <img
                          src="/projects/legacy/line_wages_manufacturing.png"
                          alt="Line chart of wages in manufacturing"
                          onClick={() => setSelectedImage("/projects/legacy/line_wages_manufacturing.png")}
                          style={{ cursor: 'pointer' }}
                        />
                      </figure>
                    </li>
                  </ul>
                </div>
              </section>

              <section className="project-detail-section">
                <h2 className="project-detail-section-title">Features Selected for Modeling</h2>
                <div className="project-detail-text">
                  <p>The notebook then narrows down which features to carry forward into predictive modeling:</p>
                  <ul>
                    <li>
                      <strong>Total electricity generation</strong> – not perfectly aligned with GDP but useful for capturing seasonal
                      structure.
                    </li>
                    <li>
                      <strong>Wages</strong> – both for the overall economy and for specific sectors (manufacturing, information, cultural)
                      where correlations with GDP are strongest.
                    </li>
                  </ul>
                  <p>
                    Before building models, K-means clustering is run on both the full feature set and the reduced feature set to see if
                    there are natural regime shifts in the time series.
                  </p>
                </div>
              </section>

              <section className="project-detail-section">
                <h2 className="project-detail-section-title">K-Means Clustering</h2>
                <div className="project-detail-text">
                  <p>
                    An elbow analysis was first performed (k from 1 to 10) on both the full and reduced datasets. In both cases, an elbow at
                    k = 2 suggests two primary clusters.
                  </p>
                  <div className="project-detail-gallery-grid">
                    <figure className="project-detail-gallery-item">
                      <img src="/projects/legacy/elbow1.png" alt="Elbow chart for clustering all features" onClick={() => setSelectedImage("/projects/legacy/elbow1.png")} style={{ cursor: 'pointer' }} />
                      <figcaption className="project-detail-gallery-caption">
                        Elbow analysis using all features.
                      </figcaption>
                    </figure>
                    <figure className="project-detail-gallery-item">
                      <img src="/projects/legacy/elbow2.png" alt="Elbow chart for clustering selected features" onClick={() => setSelectedImage("/projects/legacy/elbow2.png")} style={{ cursor: 'pointer' }} />
                      <figcaption className="project-detail-gallery-caption">
                        Elbow analysis using the selected feature subset.
                      </figcaption>
                    </figure>
                  </div>
                  <p>
                    Clusters are then projected back onto GDP and other variables to see if they reveal meaningful economic regimes or
                    breaks over time.
                  </p>
                  <div className="project-detail-gallery-grid">
                    <figure className="project-detail-gallery-item">
                      <img src="/projects/legacy/cluster1.png" alt="Clustered GDP, full dataset" onClick={() => setSelectedImage("/projects/legacy/cluster1.png")} style={{ cursor: 'pointer' }} />
                      <figcaption className="project-detail-gallery-caption">
                        GDP with clusters based on all features.
                      </figcaption>
                    </figure>
                    <figure className="project-detail-gallery-item">
                      <img src="/projects/legacy/cluster2.png" alt="Clustered GDP, selected features" onClick={() => setSelectedImage("/projects/legacy/cluster2.png")} style={{ cursor: 'pointer' }} />
                      <figcaption className="project-detail-gallery-caption">
                        GDP with clusters based on the selected feature subset.
                      </figcaption>
                    </figure>
                  </div>
                  <p>
                    Both views suggest two broad economic periods with a transitional band in between; the team notes that interpreting the
                    mechanisms behind those regimes would require deeper macro expertise.
                  </p>
                  <div className="project-detail-gallery-grid">
                    <figure className="project-detail-gallery-item">
                      <img src="/projects/legacy/cluster3.png" alt="Clusters mapped to GDP and sector wages" onClick={() => setSelectedImage("/projects/legacy/cluster3.png")} style={{ cursor: 'pointer' }} />
                      <figcaption className="project-detail-gallery-caption">
                        Example of clusters mapped simultaneously to GDP and wages in cultural/information sectors.
                      </figcaption>
                    </figure>
                    <figure className="project-detail-gallery-item">
                      <img src="/projects/legacy/cluster4.png" alt="GDP broken into 10 clusters" onClick={() => setSelectedImage("/projects/legacy/cluster4.png")} style={{ cursor: 'pointer' }} />
                      <figcaption className="project-detail-gallery-caption">
                        GDP broken into 10 clusters as an exploratory, higher-granularity view.
                      </figcaption>
                    </figure>
                  </div>
                </div>
              </section>

              <section className="project-detail-section">
                <h2 className="project-detail-section-title">Predictive Models & Performance</h2>
                <div className="project-detail-text">
                  <p>
                    The predictive phase compares linear regression and KNN models on both the full and reduced feature sets, using an
                    80/20 train-test split and metrics like MSE, MAE, and RMSE.
                  </p>
                  <figure className="project-detail-gallery-item">
                    <img src="/projects/legacy/score_table.png" alt="Score table for all models" onClick={() => setSelectedImage("/projects/legacy/score_table.png")} style={{ cursor: 'pointer' }} />
                    <figcaption className="project-detail-gallery-caption">
                      Score table comparing linear regression and KNN models across full vs selected feature sets.
                    </figcaption>
                  </figure>
                  <p>
                    The best-performing model is a KNN model on the full dataset with k = 5, which balances error metrics and overall
                    behaviour.
                  </p>
                  <figure className="project-detail-gallery-item">
                    <img src="/projects/legacy/winning_model.png" alt="Winning model residual plot" onClick={() => setSelectedImage("/projects/legacy/winning_model.png")} style={{ cursor: 'pointer' }} />
                    <figcaption className="project-detail-gallery-caption">
                      Residuals / prediction vs actual plot for the winning KNN model.
                    </figcaption>
                  </figure>
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

export default CanadianEconomyPage;

