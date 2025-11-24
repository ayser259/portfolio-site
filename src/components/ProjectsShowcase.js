import React from 'react';
import './ProjectsShowcase.css';
import siteContent from '../content';

function ProjectsShowcase() {
  const projects = siteContent.projects.items;

  return (
    <section id="projects-showcase" className="projects-showcase">
      <div className="projects-container">
        <h2 className="projects-title">{siteContent.projects.title}</h2>
        
        <div className="projects-grid">
          {projects.map((project, index) => (
            <div key={index} className="project-card">
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
              
              {project.link && project.link !== '#' && (
                <a 
                  href={project.link} 
                  className="project-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Project →
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProjectsShowcase;

