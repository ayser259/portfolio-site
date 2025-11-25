// Google Analytics utility functions
// Replace 'G-XXXXXXXXXX' with your actual Google Analytics Measurement ID

export const GA_TRACKING_ID = process.env.REACT_APP_GA_TRACKING_ID || 'G-XXXXXXXXXX';

// Check if GA should be enabled (not in development with placeholder ID)
const isGAEnabled = () => {
  return GA_TRACKING_ID && GA_TRACKING_ID !== 'G-XXXXXXXXXX' && typeof window !== 'undefined';
};

// Initialize Google Analytics
export const initGA = () => {
  if (!isGAEnabled()) {
    console.log('Google Analytics not initialized - using placeholder ID or disabled');
    return;
  }

  if (window.gtag) {
    return; // Already initialized
  }

  // Load Google Analytics script
  const script1 = document.createElement('script');
  script1.async = true;
  script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
  document.head.appendChild(script1);

  // Initialize gtag
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', GA_TRACKING_ID, {
    page_path: window.location.pathname,
  });
};

// Track page views
export const trackPageView = (path) => {
  if (isGAEnabled() && window.gtag) {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: path,
    });
  }
};

// Track custom events
export const trackEvent = ({ action, category, label, value }) => {
  if (isGAEnabled() && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

