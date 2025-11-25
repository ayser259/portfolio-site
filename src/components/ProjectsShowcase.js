import React, { useState } from 'react';
import './ProjectsShowcase.css';
import siteContent from '../content';
import projectHomeSummaries from '../data/projectHomeSummaries';
import projectDetails from '../data/projectDetails';
import ProjectDetailModal from './ProjectDetailModal';

function ProjectsShowcase() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Map project titles from content.js to keys in projectHomeSummaries
  const projectKeyMap = {
    'Sighed Kick (Gen AI Writing Partner)': 'SighedKick',
    'Empty My Inbox': 'EmptyMyInbox',
    'ByteMe': 'ByteMe',
    'Financial Wellness Demos': 'CKFD',
    'AI-Assisted PRD Workflow': 'PRDSystem'
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
        externalUrl: summary.externalUrl // Include external URL if available
      };
    });

  const handleProjectClick = (project) => {
    // If project has external URL, open it
    if (project.externalUrl) {
      window.open(project.externalUrl, '_blank', 'noopener,noreferrer');
      return;
    }

    // For other projects, open modal if details exist
    if (project.projectKey && projectDetails[project.projectKey]) {
      setSelectedProject(projectDetails[project.projectKey]);
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
    // Force scroll restoration after modal closes
    setTimeout(() => {
      document.body.style.removeProperty('overflow');
      document.body.style.removeProperty('padding-right');
      document.documentElement.style.removeProperty('overflow');
    }, 100);
  };

  return (
    <section id="projects-showcase" className="projects-showcase">
      <div className="projects-container">
        <h2 className="projects-title">{siteContent.projects.title}</h2>
        
        <div className="projects-grid">
          {allProjects.map((project, index) => (
            <div 
              key={index} 
              className="project-card"
              onClick={() => handleProjectClick(project)}
              style={{ cursor: (project.externalUrl || (project.projectKey && projectDetails[project.projectKey])) ? 'pointer' : 'default' }}
            >
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
              
              {(project.externalUrl || (project.projectKey && projectDetails[project.projectKey])) && (
                <div className="project-link">
                  {project.externalUrl ? 'View Project →' : 'View Details →'}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <ProjectDetailModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </section>
  );
}

export default ProjectsShowcase;

