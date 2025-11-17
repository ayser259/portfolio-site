import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Kakeibo = () => {
  const [htmlContent, setHtmlContent] = useState('');

  useEffect(() => {
    // Fetch the HTML file
    fetch('/kakeibo.html')
      .then(response => response.text())
      .then(html => {
        // Remove Django template tags and fix paths
        let processedHtml = html
          .replace(/{% load static %}/g, '')
          .replace(/{% static 'ayser\//g, '/')
          .replace(/' %}/g, '');
        
        // Ensure kakeibo_preview.png has rotation applied - wrap in container for proper spacing
        processedHtml = processedHtml.replace(
          /<p><img src="\/images\/kakeibo_preview\.png"[^>]*><\/p>/gi,
          '<p style="margin-top: 20px; margin-bottom: 250px; padding-top: 20px;"><img src="/images/kakeibo_preview.png" style="width: 250px; transform: rotate(-90deg) !important; display: block; margin: 0 auto;"></p>'
        );
        
        setHtmlContent(processedHtml);
      })
      .catch(error => {
        console.error('Error loading page:', error);
      });
  }, []);

  useEffect(() => {
    // Apply rotation to kakeibo_preview.png after HTML is loaded (backup method)
    if (htmlContent) {
      const timer = setTimeout(() => {
        const imgs = document.querySelectorAll('img[src="/images/kakeibo_preview.png"], img[src*="kakeibo_preview.png"]');
        imgs.forEach(img => {
          img.style.setProperty('transform', 'rotate(-90deg)', 'important');
          img.style.width = '250px';
          img.style.display = 'block';
          img.style.margin = '0 auto';
          // Adjust parent paragraph spacing
          const parent = img.closest('p');
          if (parent) {
            parent.style.marginTop = '20px';
            parent.style.marginBottom = '250px';
            parent.style.paddingTop = '20px';
          }
        });
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [htmlContent]);

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

export default Kakeibo;

