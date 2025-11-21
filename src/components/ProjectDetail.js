import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './ProjectDetail.css';

const ProjectDetail = ({ projectName, projectPath, images, textFileName }) => {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [parsedSections, setParsedSections] = useState([]);
  const [demoLink, setDemoLink] = useState(null);
  const [tagline, setTagline] = useState(null);

  useEffect(() => {
    // Use provided textFileName or default to projectPath
    const fileName = textFileName || projectPath;
    // Fetch the text file
    fetch(`/projects/${projectPath}/${fileName}.txt`)
      .then(response => {
        if (!response.ok) throw new Error('Failed to load');
        return response.text();
      })
      .then(text => {
        setContent(text);
        parseContent(text);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error loading project:', error);
        setLoading(false);
      });
  }, [projectPath, textFileName]);

  const parseContent = (text) => {
    // Split by major sections (lines that start with specific patterns)
    const lines = text.split('\n');
    const sections = [];
    let currentSection = { title: '', content: [] };
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      
      // Skip the "Home Page Summary" section
      if (line.includes('Home Page Summary') || line.includes('Project Card')) {
        // Skip until we hit "Project Detail Page"
        while (i < lines.length && !lines[i].includes('Project Detail Page')) {
          i++;
        }
        continue;
      }
      
      // Skip "Project Detail Page" header
      if (line.includes('Project Detail Page')) {
        continue;
      }
      
      // Check if this is a section header
      // Headers typically:
      // 1. Start with # (markdown style)
      // 2. Are short lines (less than 80 chars)
      // 3. Don't end with punctuation (except &)
      // 4. Are followed by a blank line or content starting with capital letter
      const isHeader = line.match(/^#+\s/) || 
        (line.length > 0 && 
         line.length < 80 && 
         !line.match(/[.!?]$/) && 
         !line.match(/^\d+\./) &&
         !line.match(/^[-•]/) &&
         i + 1 < lines.length &&
         (lines[i + 1].trim() === '' || 
          (lines[i + 1].trim().length > 0 && 
           !lines[i + 1].trim().match(/^\d+\./) &&
           !lines[i + 1].trim().match(/^[-•]/))));
      
      if (isHeader) {
        // Save previous section if it has content
        if (currentSection.content.length > 0 || currentSection.title) {
          sections.push({ ...currentSection });
        }
        
        // Start new section
        currentSection = {
          title: line.replace(/^#+\s*/, ''),
          content: []
        };
      } else if (line.length > 0) {
        currentSection.content.push(line);
      }
    }
    
    // Add the last section
    if (currentSection.content.length > 0 || currentSection.title) {
      sections.push(currentSection);
    }
    
    // Extract demo link and tagline from content
    const demoLinkMatch = text.match(/DemoLink[:\s]*(https?:\/\/[^\s]+)/i);
    if (demoLinkMatch) {
      setDemoLink(demoLinkMatch[1]);
    }
    
    const taglineMatch = text.match(/Tagline[:\s]*\n(.+)/i);
    if (taglineMatch) {
      setTagline(taglineMatch[1].trim());
    }
    
    setParsedSections(sections);
  };

  const formatContent = (contentLines) => {
    const elements = [];
    let currentList = [];
    let listType = null; // 'ul' or 'ol'
    
    const flushList = () => {
      if (currentList.length > 0) {
        const ListTag = listType === 'ol' ? 'ol' : 'ul';
        elements.push(
          <ListTag key={`list-${elements.length}`}>
            {currentList.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ListTag>
        );
        currentList = [];
        listType = null;
      }
    };
    
    contentLines.forEach((line, idx) => {
      // Check for numbered lists
      if (line.match(/^\d+\.\s/)) {
        if (listType !== 'ol') {
          flushList();
          listType = 'ol';
        }
        currentList.push(line.replace(/^\d+\.\s/, ''));
        return;
      }
      
      // Check for bullet points
      if (line.match(/^[-•]\s/)) {
        if (listType !== 'ul') {
          flushList();
          listType = 'ul';
        }
        currentList.push(line.replace(/^[-•]\s/, ''));
        return;
      }
      
      // If we hit a non-list line, flush any current list
      flushList();
      
      // Check for bold text (surrounded by **)
      if (line.includes('**')) {
        const parts = line.split('**');
        elements.push(
          <p key={idx}>
            {parts.map((part, i) => 
              i % 2 === 1 ? <strong key={i}>{part}</strong> : part
            )}
          </p>
        );
        return;
      }
      
      // Regular paragraph
      if (line.length > 0) {
        elements.push(<p key={idx}>{line}</p>);
      }
    });
    
    // Flush any remaining list
    flushList();
    
    return elements;
  };

  if (loading) {
    return (
      <div className="project-detail">
        <div className="container">
          <div className="loading-state">
            <p>Loading project details...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="project-detail">
      <div className="project-header">
        <div className="container">
          <Link to="/" className="back-link">
            ← Back to Home
          </Link>
          <h1 className="project-title">{projectName}</h1>
        </div>
      </div>

      <div className="project-content">
        <div className="container">
          {/* Project Images Gallery */}
          {images && images.length > 0 && (
            <div className="project-images">
              {images.map((image, idx) => (
                <img
                  key={idx}
                  src={`/projects/${projectPath}/${image}`}
                  alt={`${projectName} screenshot ${idx + 1}`}
                  className="project-image"
                />
              ))}
            </div>
          )}

          {/* Parsed Content Sections */}
          {parsedSections.map((section, idx) => (
            <div key={idx} className="project-section">
              {section.title && (
                <h2 className="section-title">{section.title}</h2>
              )}
              <div className="section-content">
                {formatContent(section.content)}
              </div>
            </div>
          ))}

          {/* Fallback: Show raw content if parsing didn't work well */}
          {parsedSections.length === 0 && content && (
            <div className="project-section">
              <div className="section-content">
                {content.split('\n').map((line, idx) => {
                  if (line.trim().length === 0) return <br key={idx} />;
                  if (line.startsWith('#')) {
                    const level = line.match(/^#+/)[0].length;
                    const text = line.replace(/^#+\s*/, '');
                    const HeadingTag = `h${Math.min(level, 6)}`;
                    return React.createElement(HeadingTag, { key: idx, className: 'section-title' }, text);
                  }
                  return <p key={idx}>{line}</p>;
                })}
              </div>
            </div>
          )}

          {/* Demo Link and Tagline */}
          {(demoLink || tagline) && (
            <div className="project-footer">
              {tagline && (
                <p className="project-tagline">{tagline}</p>
              )}
              {demoLink && (
                <a 
                  href={demoLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn btn-primary demo-link"
                >
                  View Demo →
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;

