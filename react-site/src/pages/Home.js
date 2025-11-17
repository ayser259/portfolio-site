import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  useEffect(() => {
    // Initialize scripts after component mounts
    const initScripts = () => {
      if (window.$ && window.jQuery) {
        const $ = window.$;
        
        // Initialize scroll to fixed
        if ($.fn.scrollToFixed) {
          $('#header_wrapper').scrollToFixed();
        }

        // Initialize one page nav
        if ($.fn.onePageNav) {
          $('#mainNav').onePageNav({
            currentClass: 'active',
            changeHash: false,
            scrollSpeed: 950,
            scrollThreshold: 0.2,
            filter: '',
            easing: 'swing',
            begin: function() {},
            end: function() {
              if (!$('#main-nav ul li:first-child').hasClass('active')) {
                $('.header').addClass('addBg');
              } else {
                $('.header').removeClass('addBg');
              }
            },
            scrollChange: function($currentListItem) {
              if (!$('#main-nav ul li:first-child').hasClass('active')) {
                $('.header').addClass('addBg');
              } else {
                $('.header').removeClass('addBg');
              }
            }
          });
        }

        // Initialize isotope
        if ($.fn.isotope) {
          const container = $('#portfolio_wrapper');
          container.isotope({
            animationEngine: 'best-available',
            animationOptions: {
              duration: 200,
              queue: false
            },
            layoutMode: 'fitRows'
          });

          $('#filters a').click(function(e) {
            e.preventDefault();
            $('#filters a').removeClass('active');
            $(this).addClass('active');
            const selector = $(this).attr('data-filter');
            container.isotope({
              filter: selector
            });
            setProjects();
            return false;
          });

          function splitColumns() {
            const winWidth = $(window).width();
            let columnNumb = 1;
            if (winWidth > 1024) {
              columnNumb = 4;
            } else if (winWidth > 900) {
              columnNumb = 2;
            } else if (winWidth > 479) {
              columnNumb = 2;
            } else if (winWidth < 479) {
              columnNumb = 1;
            }
            return columnNumb;
          }

          function setColumns() {
            const winWidth = $(window).width();
            const columnNumb = splitColumns();
            const postWidth = Math.floor(winWidth / columnNumb);
            container.find('.portfolio-item').each(function() {
              $(this).css({
                width: postWidth + 'px'
              });
            });
          }

          function setProjects() {
            setColumns();
            container.isotope('reLayout');
          }

          if ($.fn.imagesLoaded) {
            container.imagesLoaded(function() {
              setColumns();
            });
          } else {
            setColumns();
          }

          $(window).bind('resize', function() {
            setProjects();
          });
        }

        // Initialize fancybox for external links and images
        if ($.fn.fancybox) {
          $('.fancybox').fancybox();
        }

        // Initialize WOW
        if (window.WOW) {
          const wow = new window.WOW({
            animateClass: 'animated',
            offset: 100
          });
          wow.init();
        }

        // Click all filter on load
        $('#all').click();
      }
    };

    // Wait for scripts to load
    const checkScripts = setInterval(() => {
      if (window.$ && window.jQuery && window.jQuery.fn.isotope) {
        clearInterval(checkScripts);
        initScripts();
      }
    }, 100);

    return () => {
      clearInterval(checkScripts);
    };
  }, []);

  return (
    <div>
      {/* Nav Bar */}
      <header id="header_wrapper">
        <div className="container">
          <div className="header_box">
            <nav className="navbar navbar-inverse" role="navigation">
              <div className="navbar-header">
                <button type="button" id="nav-toggle" className="navbar-toggle" data-toggle="collapse" data-target="#main-nav">
                  <span className="sr-only">Toggle navigation</span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                </button>
              </div>
              <div id="main-nav" className="collapse navbar-collapse navStyle">
                <ul className="nav navbar-nav" id="mainNav">
                  <li className="active"><a href="#hero_section" className="scroll-link">Home</a></li>
                  <li><a href="#Portfolio" className="scroll-link">Projects</a></li>
                  <li><a href="https://www.linkedin.com/in/ayser-ca/" className="scroll-link">LinkedIn</a></li>
                  <li><a href="https://github.com/ayser259" className="scroll-link">GitHub</a></li>
                  <li><a href="https://medium.com/@ayser.choudhury" className="scroll-link">Medium</a></li>
                  <li><a href="#contact" className="scroll-link">Contact</a></li>
                </ul>
              </div>
            </nav>
          </div>
        </div>
      </header>
      {/*/Nav Bar*/}

      {/*Hero_Section*/}
      <section id="hero_section" className="top_cont_outer">
        <div className="hero_wrapper">
          <div className="container">
            <div className="hero_section">
              <div className="row">
                <div className="col-md-12">
                  <div className="top_left_cont zoomIn wow animated">
                    <h2>Ayser Choudhury<br />
                      <a></a>
                      <a></a>
                      <a></a>
                      <p style={{ fontSize: '17px' }}>
                        Product Portfolio
                      </p>
                    </h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*/Hero_Section*/}

      {/* Projects */}
      <section id="Portfolio" className="content">
        {/* Container */}
        <div className="container portfolio_title">
          {/* Title */}
          <div className="section-title">
            <h2>Projects</h2>
            <h6>Check out some of the projects I finished in 2020!</h6>
          </div>
          {/*/Title */}
        </div>
        {/* Container */}

        <div className="portfolio-top"></div>

        {/* Portfolio Filters */}
        <div className="portfolio">
          <div id="filters" className="sixteen columns">
            <ul className="clearfix">
              <li><a id="all" href="#" data-filter="*" className="active">
                <h5>All</h5>
              </a></li>
              <li><a className="" href="#" data-filter=".pm">
                <h5>Product </h5>
              </a></li>
              <li><a className="" href="#" data-filter=".design">
                <h5>UX & Design</h5>
              </a></li>
              <li><a className="" href="#" data-filter=".data_ml">
                <h5>Data & ML</h5>
              </a></li>
              <li><a className="" href="#" data-filter=".development">
                <h5>Development</h5>
              </a></li>
            </ul>
          </div>
          {/*/Portfolio Filters */}

          {/* Portfolio Wrapper */}
          <div className="isotope animated wow grid" style={{ position: 'relative', overflow: 'hidden', height: '480px' }} id="portfolio_wrapper">
            {/* Portfolio Item */}
            <figure className="portfolio-item one-four pm isotope-item effect-oscar">
              <div className="portfolio_img">
                <img src="/images/amazon_lists.png" alt="Kakeibo" />
              </div>
              <figcaption>
                <div>
                  <a href="https://docs.google.com/document/d/12pNq-_2SYqV6y3UxDYkuBJujSxG7dpbE2rDXxl3i8NA/edit?usp=sharing" className="fancybox">
                    <h2>Amazon Shopping Lists</h2>
                    <p>Product Enhancement of "Shopping Lists" on Amazon</p>
                  </a>
                </div>
              </figcaption>
            </figure>
            {/*/Portfolio Item */}

            {/* Portfolio Item*/}
            <figure className="portfolio-item one-four pm isotope-item effect-oscar">
              <div className="portfolio_img">
                <img src="/images/deel.png" alt="Kakeibo" />
              </div>
              <figcaption>
                <div>
                  <a href="https://docs.google.com/document/d/1upJ8NpSIZK8B8NFbjOn-bypxtGFUUWiIicFwYoHAepY/edit?usp=sharing" className="fancybox">
                    <h2>PRD: Deel's Referrals</h2>
                    <p>Product Requirement Document for Referrals on Deel</p>
                  </a>
                </div>
              </figcaption>
            </figure>
            {/*/Portfolio Item */}

            {/* Portfolio Item*/}
            <figure className="portfolio-item one-four pm isotope-item effect-oscar">
              <div className="portfolio_img">
                <img src="/images/uber.png" alt="Kakeibo" />
              </div>
              <figcaption>
                <div>
                  <a href="https://docs.google.com/document/d/1upJ8NpSIZK8B8NFbjOn-bypxtGFUUWiIicFwYoHAepY/edit?usp=sharing" className="fancybox">
                    <h2>Product Strategy: Uber</h2>
                    <p>Product Strategy for Expanding Delivery by Uber</p>
                  </a>
                </div>
              </figcaption>
            </figure>
            {/*/Portfolio Item */}

            {/* Portfolio Item */}
            <figure className="portfolio-item one-four design pm isotope-item effect-oscar">
              <div className="portfolio_img">
                <img src="/images/kakeibo_preview.png" alt="Kakeibo" style={{ transform: 'rotate(-90deg)' }} />
              </div>
              <figcaption>
                <div>
                  <Link to="/kakeibo">
                    <h2>Kakeibo</h2>
                    <p>Consolidating Personal Finance in One Mobile App</p>
                  </Link>
                </div>
              </figcaption>
            </figure>
            {/*/Portfolio Item */}

            {/* Portfolio Item*/}
            <figure className="portfolio-item one-four pm design development isotope-item effect-oscar">
              <div className="portfolio_img">
                <img src="/images/uw_placement_quiz_development_preview.png" alt="Portfolio 1" />
              </div>
              <figcaption>
                <div>
                  <Link to="/uw_placement_quiz">
                    <h2>UW Placement Quiz</h2>
                    <p>ML Based Interactive Quiz built for the University of Waterloo's Marketing & Recruiment Team</p>
                  </Link>
                </div>
              </figcaption>
            </figure>
            {/*/Portfolio Item */}

            {/* Portfolio Item*/}
            <figure className="portfolio-item one-four pm isotope-item effect-oscar">
              <div className="portfolio_img">
                <img src="/images/yotta.png" alt="Portfolio 1" />
              </div>
              <figcaption>
                <div>
                  <a href="https://medium.com/@ayser.choudhury/improving-yotta-and-the-no-lose-lottery-271829fbbff?sk=0949cc91dce1fa4bb7e98881a42b17bf" className="fancybox">
                    <h2>Yotta</h2>
                    <p>Explorating product improvements on a newcommer in the prize-linked savings space</p>
                  </a>
                </div>
              </figcaption>
            </figure>
            {/* Portfolio Item */}

            {/* Portfolio Item*/}
            <figure className="portfolio-item one-four data_ml web isotope-item effect-oscar">
              <div className="portfolio_img">
                <img src="/images/uw_engineering_quiz_model_building.png" alt="Portfolio 1" />
              </div>
              <figcaption>
                <div>
                  <Link to="/uw_engineering_classifier">
                    <h2>Engineering Program Classifier</h2>
                    <p>Model & building process powering the University of Waterloo's Placement Quiz</p>
                  </Link>
                </div>
              </figcaption>
            </figure>
            {/* Portfolio Item */}

            {/* Portfolio Item */}
            <figure className="portfolio-item one-four data_ml isotope-item effect-oscar">
              <div className="portfolio_img">
                <img src="/images/canadian_economy_preview.png" alt="Portfolio 1" />
              </div>
              <figcaption>
                <div>
                  <Link to="/canadian_economy">
                    <h2>Canada: Economic Drivers</h2>
                    <p>Data analysis and model building used to figure out how to boost Canada's GDP</p>
                  </Link>
                </div>
              </figcaption>
            </figure>
            {/*/Portfolio Item*/}

            {/* Portfolio Item */}
            <figure className="portfolio-item one-four design isotope-item effect-oscar">
              <div className="portfolio_img">
                <img src="/images/leap_of_faith.jpg" alt="Portfolio 1" />
              </div>
              <figcaption>
                <div>
                  <a href="/images/leap_of_faith.jpg" className="fancybox">
                    <h2>A Leap of Faith</h2>
                    <p>A Representation of a Leap of Faith</p>
                  </a>
                </div>
              </figcaption>
            </figure>
            {/*/Portfolio Item */}

            {/* Portfolio Item */}
            <figure className="portfolio-item one-four design web isotope-item effect-oscar">
              <div className="portfolio_img">
                <img src="/images/atomic.jpg" alt="Portfolio 1" />
              </div>
              <figcaption>
                <div>
                  <a href="/images/atomic.jpg" className="fancybox">
                    <h2>Atomic</h2>
                    <p>A Celestial Representation of an Atom</p>
                  </a>
                </div>
              </figcaption>
            </figure>
            {/*/Portfolio Item */}

            {/* Portfolio Item  */}
            <figure className="portfolio-item one-four design web isotope-item effect-oscar">
              <div className="portfolio_img">
                <img src="/images/waves_of_simulation.jpg" alt="Portfolio 1" />
              </div>
              <figcaption>
                <div>
                  <a href="/images/waves_of_simulation.jpg" className="fancybox">
                    <h2>Waves of Simulation</h2>
                    <p>Simulation in Binary flowing through waves</p>
                  </a>
                </div>
              </figcaption>
            </figure>
            {/*/Portfolio Item */}
          </div>
          {/*/Portfolio Wrapper */}
        </div>
        {/*/Portfolio Filters */}

        <div className="portfolio_btm"></div>

        <div id="project_container">
          <div className="clear"></div>
          <div id="project_data"></div>
        </div>
      </section>
      {/*/Projects */}

      {/*Contact*/}
      <footer className="footer_wrapper" id="contact">
        <div className="container">
          <section className="page_section contact" id="contact">
            <div className="contact_section">
              <h2>Get In Touch!</h2>
              <h6>Feel Free to email me to get in touch to discuss any product opportunities!</h6>
              <h4 style={{ textAlign: 'center' }}>Email Me</h4>
              <p style={{ textAlign: 'center' }}>ayserchoudhury@gmail.com</p>
            </div>
            <div className="row">
              <div className="col-lg-4 wow fadeInLeft">
                <div className="contact_info">
                  <div className="detail"></div>
                </div>
              </div>
            </div>
          </section>
        </div>
        <div className="container">
          <div className="footer_bottom">
            <span>&copy; Company Name 2018 All right reserved. <a style={{ color: 'black' }} href="http://webthemez.com/free-bootstrap-templates/" target="_blank" rel="noopener noreferrer">Free Bootstrap Templates</a> By WebThemez</span>
          </div>
        </div>
      </footer>
      {/*/Contact*/}
    </div>
  );
};

export default Home;

