import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Layout.css';

const Layout = ({ children }) => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
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

    // Handle scroll for navbar
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/#projects', label: 'Projects' },
    { path: '/#about', label: 'About' },
    { path: '/#contact', label: 'Contact' },
  ];

  const socialLinks = [
    { href: 'https://www.linkedin.com/in/ayser-ca/', label: 'LinkedIn', icon: '🔗' },
    { href: 'https://github.com/ayser259', label: 'GitHub', icon: '💻' },
    { href: 'https://medium.com/@ayser.choudhury', label: 'Medium', icon: '✍️' },
  ];

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/' || location.pathname === '/home';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="layout">
      {/* Navigation - Hidden */}
      <nav className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`} style={{ display: 'none' }}>
        <div className="container">
          <div className="navbar-content">
            <Link to="/" className="navbar-brand">
              Ayser Choudhury
            </Link>
            
            {/* Desktop Navigation */}
            <ul className="navbar-nav">
              {navLinks.map((link) => (
                <li key={link.path}>
                  {link.path.startsWith('#') ? (
                    <a 
                      href={link.path} 
                      className={location.pathname === '/' ? 'active' : ''}
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link 
                      to={link.path} 
                      className={isActive(link.path) ? 'active' : ''}
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>

            {/* Mobile Menu Button */}
            <button 
              className="mobile-menu-toggle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="mobile-nav">
              {navLinks.map((link) => (
                <Link 
                  key={link.path}
                  to={link.path.startsWith('#') ? '/' : link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="main-content">
        {children}
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h4>Ayser Choudhury</h4>
              <p>Product Manager building user-centric solutions</p>
            </div>
            
            <div className="footer-section">
              <h4>Connect</h4>
              <div className="social-links">
                {socialLinks.map((link) => (
                  <a 
                    key={link.href}
                    href={link.href} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    aria-label={link.label}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
            
            <div className="footer-section">
              <h4>Contact</h4>
              <a href="mailto:ayserchoudhury@gmail.com">
                ayserchoudhury@gmail.com
              </a>
            </div>
          </div>
          
          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} Ayser Choudhury. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
