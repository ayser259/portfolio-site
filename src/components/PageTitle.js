import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import siteContent from '../content';

function PageTitle() {
  const location = useLocation();

  useEffect(() => {
    const projectTitles = {
      '/sighedkick': 'SighedKick - Ayser Choudhury',
      '/bytem': 'ByteMe - Ayser Choudhury',
      '/ckfd': 'Financial Wellness Demos - Ayser Choudhury',
      '/emptymyinbox': 'Empty My Inbox - Ayser Choudhury',
      '/prdsystem': 'AI-Assisted PRD Workflow - Ayser Choudhury'
    };

    const title = projectTitles[location.pathname] || siteContent.site.title;
    document.title = title;
  }, [location]);

  return null;
}

export default PageTitle;

