import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './ProjectPage.css';

const ProjectPage = ({ title, htmlFile }) => {
  const [htmlContent, setHtmlContent] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the HTML file
    fetch(htmlFile)
      .then(response => {
        if (!response.ok) throw new Error('Failed to load');
        return response.text();
      })
      .then(html => {
        // Remove Django template tags and fix paths
        let processedHtml = html
          .replace(/{% load static %}/g, '')
          .replace(/{% static 'ayser\//g, '/')
          .replace(/' %}/g, '');
        setHtmlContent(processedHtml);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error loading page:', error);
        setLoading(false);
      });
  }, [htmlFile]);

  return (
    <div className="project-page">
      <div className="project-header">
        <div className="container">
          <Link to="/" className="back-link">
            ← Back to Home
          </Link>
          <h1 className="project-title">{title}</h1>
        </div>
      </div>

      <div className="project-content">
        <div className="container">
          {loading ? (
            <div className="loading-state">
              <p>Loading project details...</p>
            </div>
          ) : htmlContent ? (
            <div 
              className="project-html-content"
              dangerouslySetInnerHTML={{ __html: htmlContent }} 
            />
          ) : (
            <div className="error-state">
              <p>Unable to load project content. Please try again later.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectPage;

