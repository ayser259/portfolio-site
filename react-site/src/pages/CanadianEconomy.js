import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const CanadianEconomy = () => {
  const [htmlContent, setHtmlContent] = useState('');

  useEffect(() => {
    // Fetch the HTML file
    fetch('/canadian_economy.html')
      .then(response => response.text())
      .then(html => {
        // Remove Django template tags and fix paths
        let processedHtml = html
          .replace(/{% load static %}/g, '')
          .replace(/{% static 'ayser\//g, '/')
          .replace(/' %}/g, '');
        setHtmlContent(processedHtml);
      })
      .catch(error => {
        console.error('Error loading page:', error);
      });
  }, []);

  return (
    <div>
      <nav style={{ padding: '20px', background: '#333', color: 'white' }}>
        <Link to="/" style={{ color: 'white', textDecoration: 'none', marginRight: '20px' }}>← Back to Home</Link>
      </nav>
      {htmlContent ? (
        <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
      ) : (
        <div style={{ padding: '20px' }}>Loading...</div>
      )}
    </div>
  );
};

export default CanadianEconomy;

