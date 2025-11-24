import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import TerminalModal from './components/TerminalModal';

function App() {
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
        // Mobile: video stays full screen as background behind the modal
        video.style.width = `${viewportWidth}px`;
        video.style.height = `${viewportHeight}px`;
        video.style.left = '0';
        video.style.top = '0';
        video.style.objectFit = 'cover';
        video.style.objectPosition = 'center center';
      } else {
        // Desktop: video shrinks in width when modal opens from right
        const modalWidth = 700;
        const videoWidth = isModalOpen ? viewportWidth - modalWidth : viewportWidth;
        
        video.style.width = `${videoWidth}px`;
        video.style.height = `${viewportHeight}px`;
        video.style.left = '0';
        video.style.top = '0';
        video.style.objectFit = 'cover';
        video.style.objectPosition = 'left center';
      }
      
      // No transform needed - object-fit: cover handles the scaling and cropping
      video.style.transform = 'none';
      video.style.transformOrigin = 'left top';
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
    </div>
  );
}

export default App;

