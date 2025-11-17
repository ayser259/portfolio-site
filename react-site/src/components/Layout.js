import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Layout = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    // Load external scripts sequentially
    const loadScript = (src) => {
      return new Promise((resolve, reject) => {
        if (document.querySelector(`script[src="${src}"]`)) {
          resolve();
          return;
        }
        const script = document.createElement('script');
        script.src = src;
        script.async = false;
        script.onload = resolve;
        script.onerror = reject;
        document.body.appendChild(script);
      });
    };

    // Load Google Analytics
    if (!window.dataLayer) {
      window.dataLayer = window.dataLayer || [];
      function gtag() {
        window.dataLayer.push(arguments);
      }
      window.gtag = gtag;
      gtag('js', new Date());
      gtag('config', 'UA-164155871-1');

      const gaScript = document.createElement('script');
      gaScript.async = true;
      gaScript.src = 'https://www.googletagmanager.com/gtag/js?id=UA-164155871-1';
      document.head.appendChild(gaScript);
    }

    // Load jQuery and other scripts if on home page
    if (location.pathname === '/' || location.pathname === '/home') {
      const scripts = [
        '/js/jquery-1.11.0.min.js',
        '/js/bootstrap.min.js',
        '/js/jquery-scrolltofixed.js',
        '/js/jquery.nav.js',
        '/js/jquery.easing.1.3.js',
        '/js/jquery.isotope.js',
        '/js/fancybox/jquery.fancybox.pack.js',
        '/js/wow.js',
        '/js/custom.js'
      ];

      // Load scripts sequentially
      let promise = Promise.resolve();
      scripts.forEach(src => {
        promise = promise.then(() => loadScript(src));
      });
    }

    return () => {
      // Cleanup if needed
    };
  }, [location.pathname]);

  return (
    <div>
      {children}
    </div>
  );
};

export default Layout;

