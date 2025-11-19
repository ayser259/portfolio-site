import React, { useEffect } from 'react';
import ProjectPage from '../components/ProjectPage';

const Kakeibo = () => {
  useEffect(() => {
    // Apply rotation to kakeibo_preview.png after HTML is loaded
    const timer = setTimeout(() => {
      const imgs = document.querySelectorAll('img[src="/images/kakeibo_preview.png"], img[src*="kakeibo_preview.png"]');
      imgs.forEach(img => {
        img.style.setProperty('transform', 'rotate(-90deg)', 'important');
        img.style.width = '250px';
        img.style.display = 'block';
        img.style.margin = '0 auto';
        const parent = img.closest('p');
        if (parent) {
          parent.style.marginTop = '20px';
          parent.style.marginBottom = '250px';
          parent.style.paddingTop = '20px';
        }
      });
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return <ProjectPage title="Kakeibo" htmlFile="/kakeibo.html" />;
};

export default Kakeibo;

