import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isVideoLoading, setIsVideoLoading] = useState(true);
  const [videoState, setVideoState] = useState('initial'); // 'initial', 'sliding', 'ready', 'fading-out'
  const [hasSlidIn, setHasSlidIn] = useState(false); // Track if first video has completed slide-in
  const [showText, setShowText] = useState(false); // Control text visibility
  const videoRef = useRef(null);
  const nextVideoRef = useRef(null);

  const backgroundVideos = [
    '/background/coffee.mp4',
    '/background/writing.mp4',
    '/background/type.mp4',
    '/background/pause.mp4',
    '/background/wave.mp4'
  ];

  const projects = [
    {
      id: 'amazon-lists',
      title: 'Amazon Shopping Lists',
      category: 'pm',
      description: 'Product enhancement of "Shopping Lists" on Amazon',
      image: '/images/amazon_lists.png',
      link: 'https://docs.google.com/document/d/12pNq-_2SYqV6y3UxDYkuBJujSxG7dpbE2rDXxl3i8NA/edit?usp=sharing',
      external: true,
      tags: ['Product Management', 'UX Research']
    },
    {
      id: 'deel-referrals',
      title: 'PRD: Deel\'s Referrals',
      category: 'pm',
      description: 'Product Requirement Document for Referrals on Deel',
      image: '/images/deel.png',
      link: 'https://docs.google.com/document/d/1upJ8NpSIZK8B8NFbjOn-bypxtGFUUWiIicFwYoHAepY/edit?usp=sharing',
      external: true,
      tags: ['Product Management', 'PRD']
    },
    {
      id: 'uber-strategy',
      title: 'Product Strategy: Uber',
      category: 'pm',
      description: 'Product Strategy for Expanding Delivery by Uber',
      image: '/images/uber.png',
      link: 'https://docs.google.com/document/d/1upJ8NpSIZK8B8NFbjOn-bypxtGFUUWiIicFwYoHAepY/edit?usp=sharing',
      external: true,
      tags: ['Product Strategy', 'Market Analysis']
    },
    {
      id: 'kakeibo',
      title: 'Kakeibo',
      category: 'design',
      description: 'Consolidating Personal Finance in One Mobile App',
      image: '/images/kakeibo_preview.png',
      link: '/kakeibo',
      external: false,
      tags: ['UX Design', 'Mobile App']
    },
    {
      id: 'uw-placement-quiz',
      title: 'UW Placement Quiz',
      category: 'development',
      description: 'ML Based Interactive Quiz built for the University of Waterloo\'s Marketing & Recruitment Team',
      image: '/images/uw_placement_quiz_development_preview.png',
      link: '/uw_placement_quiz',
      external: false,
      tags: ['Machine Learning', 'Full Stack']
    },
    {
      id: 'yotta',
      title: 'Yotta',
      category: 'pm',
      description: 'Exploring product improvements on a newcomer in the prize-linked savings space',
      image: '/images/yotta.png',
      link: 'https://medium.com/@ayser.choudhury/improving-yotta-and-the-no-lose-lottery-271829fbbff?sk=0949cc91dce1fa4bb7e98881a42b17bf',
      external: true,
      tags: ['Product Management', 'Case Study']
    },
    {
      id: 'uw-engineering-classifier',
      title: 'Engineering Program Classifier',
      category: 'data_ml',
      description: 'Model & building process powering the University of Waterloo\'s Placement Quiz',
      image: '/images/uw_engineering_quiz_model_building.png',
      link: '/uw_engineering_classifier',
      external: false,
      tags: ['Machine Learning', 'Data Science']
    },
    {
      id: 'canadian-economy',
      title: 'Canada: Economic Drivers',
      category: 'data_ml',
      description: 'Data analysis and model building used to figure out how to boost Canada\'s GDP',
      image: '/images/canadian_economy_preview.png',
      link: '/canadian_economy',
      external: false,
      tags: ['Data Analysis', 'Economics']
    },
    {
      id: 'sighedkick',
      title: 'SighedKick',
      category: 'pm',
      description: 'My personal GenAI copilot and playground. A constantly evolving workspace where I design, build, and stress-test how AI should actually plug into real workflows.',
      image: '/projects/Sighedkick/Sighedkick-Canvas1.png',
      link: '/sighedkick',
      external: false,
      tags: ['Product Management', 'GenAI', 'Full Stack']
    },
    {
      id: 'byteme',
      title: 'ByteMe',
      category: 'development',
      description: 'A native iOS nutrition tracker that borrows patterns from financial monitoring—turning daily food logging into a clean, insight-driven experience.',
      image: '/projects/ByteMe/ByteMe-Dashboard1.png',
      link: '/byteme',
      external: false,
      tags: ['iOS Development', 'Swift', 'Product Design']
    },
    {
      id: 'emptymyinbox',
      title: 'Empty my Inbox',
      category: 'development',
      description: 'A unified email productivity tool that pulls multiple Gmail accounts into one fast, opinionated interface, designed to make Inbox Zero achievable every day.',
      image: '/projects/EmptyMyInbox/EmptyMyInbox-Home.png',
      link: '/emptymyinbox',
      external: false,
      tags: ['Full Stack', 'Django', 'React', 'Productivity']
    },
    {
      id: 'prdsystem',
      title: 'AI-Assisted PRD Workflow',
      category: 'pm',
      description: 'A lightweight, GenAI-powered workflow that turns messy, spoken ideas into clean, structured PRDs—from brain dump to update-ready doc in under an hour.',
      image: '/images/yotta.png', // Placeholder - no image available
      link: '/prdsystem',
      external: false,
      tags: ['Product Management', 'GenAI', 'Workflow Design']
    },
    {
      id: 'ckfd',
      title: 'Financial Wellness Demos',
      category: 'development',
      description: 'An interactive React demo that simulates a full financial wellness experience: credit scores, cash flow, education, gamification, and personalized insights.',
      image: '/images/yotta.png', // Placeholder - no image available
      link: '/ckfd',
      external: false,
      tags: ['React', 'TypeScript', 'Product Prototyping']
    }
  ];

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'pm', label: 'Product Management' },
    { id: 'design', label: 'UX & Design' },
    { id: 'data_ml', label: 'Data & ML' },
    { id: 'development', label: 'Development' }
  ];

  const filteredProjects = selectedFilter === 'all' 
    ? projects 
    : projects.filter(p => p.category === selectedFilter);

  // Preload next video
  useEffect(() => {
    const nextIndex = (currentVideoIndex + 1) % backgroundVideos.length;
    const nextVideo = nextVideoRef.current;
    if (nextVideo) {
      nextVideo.src = backgroundVideos[nextIndex];
      nextVideo.load();
    }
  }, [currentVideoIndex, backgroundVideos]);

  // Video rotation logic with smooth transitions
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    setIsVideoLoading(true);
    setVideoState('initial'); // Reset state for new video
    
    // Determine if this is the first video on initial load (hasn't slid in yet)
    const isFirstVideo = currentVideoIndex === 0 && !hasSlidIn;

    const handleVideoEnd = () => {
      setVideoState('fading-out');
      setTimeout(() => {
        setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % backgroundVideos.length);
      }, 600);
    };

    const handleVideoLoadedData = () => {
      // Video data is loaded, prepare for animation
      if (isFirstVideo) {
        // First video slides in
        setVideoState('sliding');
      } else {
        // Subsequent videos fade in
        setVideoState('ready');
      }
    };

    const handleVideoCanPlay = () => {
      setIsVideoLoading(false);
      // Start playing the video
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.log('Video autoplay prevented:', error);
          setIsVideoLoading(false);
        });
      }
    };

    const handleVideoWaiting = () => {
      setIsVideoLoading(true);
    };

    const handleVideoPlaying = () => {
      setIsVideoLoading(false);
      // After first video starts playing, mark slide-in as complete after animation
      if (isFirstVideo) {
        setTimeout(() => {
          setVideoState('ready');
          setHasSlidIn(true);
        }, 1500); // Match animation duration
      }
    };

    video.addEventListener('ended', handleVideoEnd);
    video.addEventListener('loadeddata', handleVideoLoadedData);
    video.addEventListener('canplay', handleVideoCanPlay);
    video.addEventListener('waiting', handleVideoWaiting);
    video.addEventListener('playing', handleVideoPlaying);

    // Load the video
    video.load();

    return () => {
      video.removeEventListener('ended', handleVideoEnd);
      video.removeEventListener('loadeddata', handleVideoLoadedData);
      video.removeEventListener('canplay', handleVideoCanPlay);
      video.removeEventListener('waiting', handleVideoWaiting);
      video.removeEventListener('playing', handleVideoPlaying);
    };
  }, [currentVideoIndex, backgroundVideos.length, hasSlidIn]);


  // Show text after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowText(true);
    }, 5000); // 5 seconds

    return () => clearTimeout(timer);
  }, []);

  // Smooth scroll for anchor links
  useEffect(() => {
    const handleAnchorClick = (e) => {
      const href = e.target.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  return (
    <div className="home">
      {/* Hero Section */}
      <section id="hero" className="hero">
        {/* Background Video */}
        <div className="hero-background">
          {/* Main video */}
          <video
            ref={videoRef}
            className={`hero-video hero-video-${videoState}`}
            src={backgroundVideos[currentVideoIndex]}
            autoPlay
            muted
            loop={false}
            playsInline
            preload="auto"
          />
          {/* Preload next video (hidden) */}
          <video
            ref={nextVideoRef}
            className="hero-video-next"
            muted
            loop={false}
            playsInline
            preload="auto"
          />
          {/* Loading indicator */}
          {isVideoLoading && (
            <div className="hero-video-loading">
              <div className="loading-spinner"></div>
            </div>
          )}
          <div className="hero-background-overlay" />
        </div>
        <div className="container">
          <div className={`hero-content ${showText ? 'slide-in-text' : 'text-hidden'}`}>
            <div className="hero-badge">Product Manager</div>
            <h1 className="hero-title">
              Hi, I'm <span className="text-primary">Ayser Choudhury</span>
            </h1>
            <p className="hero-description">
              I build products that solve real problems. With a focus on user-centered design, 
              data-driven decisions, and cross-functional collaboration, I turn ideas into 
              impactful solutions.
            </p>
            <div className="hero-actions">
              <a href="#projects" className="btn btn-primary">
                View My Work
              </a>
              <a href="#contact" className="btn btn-secondary">
                Get In Touch
              </a>
            </div>
          </div>
        </div>
        <div className="hero-scroll-indicator">
          <span>Scroll</span>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section about-section">
        <div className="container">
          <div className="about-content">
            <div className="about-text">
              <h2>About Me</h2>
              <p>
                I'm a Product Manager passionate about creating products that make a difference. 
                My approach combines strategic thinking, user research, and technical understanding 
                to deliver solutions that users love and businesses value.
              </p>
              <p>
                I've worked on products spanning e-commerce, fintech, and education technology, 
                always with a focus on understanding user needs and delivering measurable impact.
              </p>
              <div className="skills">
                <h3>Core Skills</h3>
                <div className="skills-grid">
                  <div className="skill-item">Product Strategy</div>
                  <div className="skill-item">User Research</div>
                  <div className="skill-item">Data Analysis</div>
                  <div className="skill-item">Agile/Scrum</div>
                  <div className="skill-item">Stakeholder Management</div>
                  <div className="skill-item">Technical Writing</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="section projects-section">
        <div className="container">
          <div className="section-header">
            <h2>Featured Projects</h2>
            <p className="section-description">
              A selection of projects showcasing my work in product management, design, and development
            </p>
          </div>

          {/* Category Filters */}
          <div className="project-filters">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`filter-btn ${selectedFilter === category.id ? 'active' : ''}`}
                onClick={() => setSelectedFilter(category.id)}
              >
                {category.label}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="projects-grid">
            {filteredProjects.map((project) => {
              const ProjectLink = project.external ? 'a' : Link;
              const linkProps = project.external 
                ? { href: project.link, target: '_blank', rel: 'noopener noreferrer' }
                : { to: project.link };

              return (
                <div key={project.id} className="project-card">
                  <ProjectLink {...linkProps} className="project-link">
                    <div className="project-image-wrapper">
                      <img 
                        src={project.image} 
                        alt={project.title}
                        className="project-image"
                        style={project.id === 'kakeibo' ? { transform: 'rotate(-90deg)', width: '250px' } : {}}
                      />
                      <div className="project-overlay">
                        <span className="project-link-text">View Project →</span>
                      </div>
                    </div>
                    <div className="project-content">
                      <h3 className="project-title">{project.title}</h3>
                      <p className="project-description">{project.description}</p>
                      <div className="project-tags">
                        {project.tags.map((tag, idx) => (
                          <span key={idx} className="project-tag">{tag}</span>
                        ))}
                      </div>
                    </div>
                  </ProjectLink>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section contact-section">
        <div className="container">
          <div className="contact-content">
            <h2>Let's Connect</h2>
            <p className="contact-description">
              I'm always open to discussing new opportunities, interesting projects, or just having 
              a conversation about product management and technology.
            </p>
            <div className="contact-info">
              <a href="mailto:ayserchoudhury@gmail.com" className="contact-email">
                ayserchoudhury@gmail.com
              </a>
              <div className="contact-social">
                <a 
                  href="https://www.linkedin.com/in/ayser-ca/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="social-link"
                >
                  LinkedIn
                </a>
                <a 
                  href="https://github.com/ayser259" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="social-link"
                >
                  GitHub
                </a>
                <a 
                  href="https://medium.com/@ayser.choudhury" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="social-link"
                >
                  Medium
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
