import React from 'react';
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
    'Financial Wellness Demos': 'CKFD',
    'AI-Assisted PRD Workflow': 'PRDSystem'
  };

  const projectImageMap = {
    SighedKick: '/projects/Sighedkick/SighedKick-Library.png',
    EmptyMyInbox: '/projects/EmptyMyInbox/EmptyMyInbox-Home.png',
    ByteMe: '/projects/ByteMe/ByteMe-Dashboard1.png',
    CKFD: null,
    PRDSystem: null
  };

  // Helper function to convert project key to URL slug
  const getProjectSlug = (projectKey) => {
    return projectKey.toLowerCase();
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
        thumbnail: projectImageMap[projectKey] || null
      };
    });

  return (
    <section id="projects-showcase" className="projects-showcase">
      <div className="projects-container">
        <h2 className="projects-title">{siteContent.projects.title}</h2>
        
        <div className="projects-grid">
          {allProjects.map((project, index) => (
            <Link
              key={index}
              to={`/${project.projectSlug}`}
              className="project-card"
              style={{ textDecoration: 'none', display: 'block' }}
            >
              {project.thumbnail && (
                <div className="project-card-media">
                  <img
                    src={project.thumbnail}
                    alt={`${project.title} preview`}
                    className="project-card-image"
                  />
                </div>
              )}

              <div className="project-header">
                <div className="project-icon">
                  <i className={`fas ${project.icon} ${project.iconColor || 'cyan-400'}`}></i>
                </div>
                <h3 className="project-title">{project.title}</h3>
              </div>
              
              <p className="project-description">{project.description}</p>
              
              {project.technologies && project.technologies.length > 0 && (
                <div className="project-technologies">
                  {project.technologies.map((tech, techIndex) => (
                    <span key={techIndex} className="tech-tag">
                      {tech}
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

