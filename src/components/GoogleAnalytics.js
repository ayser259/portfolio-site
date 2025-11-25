import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { initGA, trackPageView } from '../utils/analytics';

function GoogleAnalytics() {
  const location = useLocation();

  useEffect(() => {
    // Initialize GA on mount
    initGA();
  }, []);

  useEffect(() => {
    // Track page views on route change
    trackPageView(location.pathname + location.search);
  }, [location]);

  return null;
}

export default GoogleAnalytics;

