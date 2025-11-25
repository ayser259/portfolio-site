import React, { useEffect, useRef, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import TerminalModal from './components/TerminalModal';
import ProjectsShowcase from './components/ProjectsShowcase';
import SighedKickPage from './pages/SighedKickPage';
import ByteMePage from './pages/ByteMePage';
import CKFDPage from './pages/CKFDPage';
import EmptyMyInboxPage from './pages/EmptyMyInboxPage';
import PRDSystemPage from './pages/PRDSystemPage';

function HomePage() {
  const videoRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    function updateVideoSize() {
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const isMobile = window.innerWidth <= 768;
      
      if (isMobile) {
        // Mobile: video stays full width/height
        video.style.width = '100%';
        video.style.height = '100%';
        video.style.objectFit = 'cover';
        video.style.objectPosition = 'center center';
      } else {
        // Desktop: video shrinks in width when modal opens from right
        const modalWidth = 700;
        const videoWidth = isModalOpen ? viewportWidth - modalWidth : viewportWidth;
        
        video.style.width = `${videoWidth}px`;
        video.style.height = '100%';
        video.style.objectFit = 'cover';
        video.style.objectPosition = 'left center';
      }
    }
    
    // Update size when video metadata loads
    video.addEventListener('loadedmetadata', updateVideoSize);
    video.addEventListener('loadeddata', updateVideoSize);
    
    // Update on resize
    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(updateVideoSize, 50);
    };
    window.addEventListener('resize', handleResize);
    
    // Initial update
    updateVideoSize();
    
    // Fallback updates
    setTimeout(updateVideoSize, 100);
    setTimeout(updateVideoSize, 500);
    
    // Ensure video plays
    video.play().catch(error => {
      console.log('Video autoplay prevented:', error);
      const handleClick = () => {
        video.play();
      };
      document.addEventListener('click', handleClick, { once: true });
    });

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      video.removeEventListener('loadedmetadata', updateVideoSize);
      video.removeEventListener('loadeddata', updateVideoSize);
    };
  }, [isModalOpen]);

  // Open modal after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsModalOpen(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="App">
      {/* Hero Section with Video Background */}
      <section className="hero-section">
        <video 
          id="bgVideo"
          ref={videoRef}
          className={isModalOpen ? 'modal-open' : ''}
          autoPlay 
          muted 
          loop 
          playsInline
        >
          <source src="/assets/images/background/full_background_video.mov" type="video/mp4" />
          <source src="/assets/images/background/full_background_video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <TerminalModal isOpen={isModalOpen} onOpen={() => setIsModalOpen(true)} />
      </section>
      
      {/* Projects Showcase Section */}
      <ProjectsShowcase />
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/sighedkick" element={<SighedKickPage />} />
        <Route path="/bytem" element={<ByteMePage />} />
        <Route path="/ckfd" element={<CKFDPage />} />
        <Route path="/emptymyinbox" element={<EmptyMyInboxPage />} />
        <Route path="/prdsystem" element={<PRDSystemPage />} />
      </Routes>
    </Router>
  );
}

export default App;

