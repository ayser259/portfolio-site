import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './ProjectsShowcase.css';
import siteContent from '../content';
import projectHomeSummaries from '../data/projectHomeSummaries';
import projectDetails from '../data/projectDetails';

function ProjectsShowcase() {
  // Map project titles from content.js to keys in projectHomeSummaries
  const projectKeyMap = {
    'Sighed Kick (Gen AI Writing Partner)': 'SighedKick',
    'Empty My Inbox': 'EmptyMyInbox',
    'ByteMe': 'ByteMe',
    'Demo App: Personalized Feed Engagement': 'CKFD',
    'AI-Assisted PRD Workflow': 'PRDSystem',
    'ZIRP-era Canadian Economic Analysis (2008–2019)': 'CanadianEconomy',
    'Kakeibo': 'Kakeibo',
    'Engineering Fit Classifier': 'UWEngineeringProgramClassifier',
    'What Type of Engineering Should I Study?': 'UWPlacementQuiz',
    'Making Your Own AI Copilot': 'MakingYourOwnCopilot'
  };

  const projectSubtitleMap = {
    SighedKick: 'My personal GenAI copilot and systems lab',
    EmptyMyInbox: 'A systems-first path to Inbox Zero',
    ByteMe: 'Applying fintech monitoring patterns to nutrition',
    CKFD: 'A mobile-first prototype for financial wellness',
    PRDSystem: 'From brain dump to structured PRDs with AI',
    CanadianEconomy: 'An interactive data story for macro trends',
    Kakeibo: 'Budgeting through a kakeibo-inspired lens',
    UWEngineeringProgramClassifier: 'Exploring program fit with an ML model',
    UWPlacementQuiz: 'A quiz-style way to explore program fit',
    MakingYourOwnCopilot: 'A hands-on workshop for building personalized GenAI systems'
  };

  const projectImageMap = {
    SighedKick: '/projects/Sighedkick/logo.png',
    EmptyMyInbox: '/projects/EmptyMyInbox/logo.png',
    ByteMe: '/projects/ByteMe/logo.png',
    CKFD: null,
    PRDSystem: null,
    CanadianEconomy: null,
    Kakeibo: null,
    UWEngineeringProgramClassifier: null,
    UWPlacementQuiz: null,
    MakingYourOwnCopilot: null
  };

  const projectThemesMap = {
    SighedKick: ['Gen AI', 'Product Design & UX', 'Systems & Workflows', 'Prototypes'],
    EmptyMyInbox: ['Gen AI', 'Product Design & UX', 'Systems & Workflows', 'Prototypes'],
    ByteMe: ['Product Design & UX', 'Prototypes', 'Data & Insights'],
    CKFD: ['Gen AI', 'Product Design & UX', 'Prototypes', 'Workshops'],
    PRDSystem: ['Gen AI', 'Systems & Workflows', 'Workshops'],
    CanadianEconomy: ['Data & Insights'],
    Kakeibo: ['Product Design & UX'],
    UWEngineeringProgramClassifier: ['Data & Insights'],
    UWPlacementQuiz: ['Product Design & UX'],
    MakingYourOwnCopilot: ['Gen AI', 'Systems & Workflows', 'Workshops']
  };

  // Helper function to convert project key to URL slug
  const getProjectSlug = (projectKey) => {
    // Custom slug mappings for projects with non-standard URLs
    const customSlugs = {
      'CKFD': 'vibe-code-demo-app',
      'ByteMe': 'byteme'
    };
    
    return customSlugs[projectKey] || projectKey.toLowerCase();
  };

  // Filter and map projects to only include those with summaries in projectHomeSummaries
  const allProjects = siteContent.projects.items
    .map((project) => {
      // Try to find a matching summary by title mapping
      const projectKey = projectKeyMap[project.title];
      return { project, projectKey };
    })
    .filter(({ projectKey }) => projectKey && projectHomeSummaries[projectKey])
    .map(({ project, projectKey }) => {
      // Use the summary from .txt file, but keep original icon/iconColor if not in summary
      const summary = projectHomeSummaries[projectKey];
      return {
        ...project,
        title: summary.title, // Use title from summary
        description: summary.description, // Use description from summary
        icon: summary.icon || project.icon,
        iconColor: summary.iconColor || project.iconColor,
        technologies: summary.technologies || project.technologies,
        projectKey: projectKey, // Store the key for modal lookup
        projectSlug: getProjectSlug(projectKey), // URL slug for routing
        thumbnail: projectImageMap[projectKey] || null,
        subtitle: projectSubtitleMap[projectKey] || projectDetails[projectKey]?.subtitle || '',
        themes: projectThemesMap[projectKey] || []
      };
    });

  const [selectedThemes, setSelectedThemes] = useState([]);

  // Define the desired theme order
  const themeOrder = [
    'Gen AI',
    'Product Design & UX',
    'Systems & Workflows',
    'Prototypes',
    'Workshops',
    'Data & Insights'
  ];

  const allThemes = Array.from(
    new Set(
      allProjects.flatMap((project) => project.themes || [])
    )
  ).sort((a, b) => {
    const indexA = themeOrder.indexOf(a);
    const indexB = themeOrder.indexOf(b);
    // If both are in the order array, sort by their position
    if (indexA !== -1 && indexB !== -1) return indexA - indexB;
    // If only one is in the order array, prioritize it
    if (indexA !== -1) return -1;
    if (indexB !== -1) return 1;
    // If neither is in the order array, maintain alphabetical
    return a.localeCompare(b);
  });

  const toggleTheme = (theme) => {
    setSelectedThemes((prev) =>
      prev.includes(theme)
        ? prev.filter((t) => t !== theme)
        : [...prev, theme]
    );
  };

  const clearThemes = () => setSelectedThemes([]);

  const filteredProjects =
    selectedThemes.length === 0
      ? allProjects
      : allProjects.filter(
          (project) =>
            project.themes &&
            project.themes.some((theme) => selectedThemes.includes(theme))
        );

  return (
    <section id="projects-showcase" className="projects-showcase">
      <div className="projects-container">
        <h2 className="projects-title">{siteContent.projects.title}</h2>

        {allThemes.length > 0 && (
          <div className="projects-filters">
            <button
              type="button"
              onClick={clearThemes}
              className={`theme-chip theme-chip-all${
                selectedThemes.length === 0 ? ' theme-chip--active' : ''
              }`}
            >
              All
            </button>
            {allThemes.map((theme) => {
              const isActive = selectedThemes.includes(theme);
              return (
                <button
                  key={theme}
                  type="button"
                  onClick={() => toggleTheme(theme)}
                  className={`theme-chip${isActive ? ' theme-chip--active' : ''}`}
                >
                  {theme}
                </button>
              );
            })}
          </div>
        )}
        
        <div className="projects-grid">
          {filteredProjects.map((project, index) => (
            <Link
              key={index}
              to={`/${project.projectSlug}`}
              className="project-card"
              style={{ textDecoration: 'none', display: 'block' }}
            >
              <div className="project-header">
                {project.thumbnail ? (
                  <div className="project-logo">
                    <img
                      src={project.thumbnail}
                      alt={`${project.title} logo`}
                      className="project-logo-image"
                    />
                  </div>
                ) : (
                  <div className="project-icon">
                    <i className={`fas ${project.icon} ${project.iconColor || 'cyan-400'}`}></i>
                  </div>
                )}
                <h3 className="project-title">{project.title}</h3>
              </div>
              
              {project.subtitle && (
                <p className="project-subtitle">{project.subtitle}</p>
              )}

              <p className="project-description">{project.description}</p>
              
              {project.themes && project.themes.length > 0 && (
                <div className="project-themes">
                  {project.themes.map((theme, themeIndex) => (
                    <span key={themeIndex} className="theme-tag">
                      {theme}
                    </span>
                  ))}
                </div>
              )}
              
              {project.projectKey && projectDetails[project.projectKey] && (
                <div className="project-link">
                  View Details →
                </div>
              )}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProjectsShowcase;

