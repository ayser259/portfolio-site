// Content and copy for the portfolio site
// Edit this file to update all text content on the site

const siteContent = {
    // Site metadata
    site: {
        title: "Ayser - Product Manager & Systems Builder",
        name: "Ayser",
        tagline: "Product Manager & Systems Builder"
    },

    // Terminal messages (shown in the terminal animation)
    terminal: {
        prompt: "ayser@portfolio:~$",
        messages: [
            "$ initializing portfolio.exe...",
            "$ loading unicorn_mode.js",
            "",
            "> Hi, I'm Ayser 👋",
            "> Welcome to my digital playground",
            "",
            "> I'm a product manager who codes",
            "> A growth hacker who builds systems",
            "> A technical architect who ships products",
            "",
            "> Currently crafting experiences at Credit Karma",
            "> Previously: Management Engineering @ Waterloo",
            "",
            "> Specialties:",
            "  • Full-stack product development",
            "  • Growth engineering & experimentation",
            "  • Systems design & scalability",
            "  • Data-driven decision making",
            "",
            "> Fun fact: I've optimized conversion funnels",
            "> that process millions of users monthly",
            "",
            "> Scroll down to explore my work",
            "> Or reach out to build something together",
            "",
            "$ portfolio_loaded successfully ✓"
        ]
    },

    // About section
    about: {
        title: "The Unicorn Product Manager",
        description: "Where technical expertise meets product vision. I build systems, hack growth, and create experiences that scale.",
        features: [
            {
                icon: "fa-code",
                iconColor: "cyan-400",
                title: "Technical Deep Dives",
                description: "From architecture to implementation, I speak engineering fluently"
            },
            {
                icon: "fa-rocket",
                iconColor: "purple-400",
                title: "Growth Hacking",
                description: "Data-driven experiments and creative solutions to scale products"
            },
            {
                icon: "fa-cogs",
                iconColor: "cyan-400",
                title: "Systems Thinking",
                description: "Building scalable processes and infrastructure for long-term success"
            }
        ]
    },

    // Projects section
    projects: {
        title: "Featured Projects",
        items: [
            {
                icon: "fa-chart-line",
                iconColor: "cyan-400",
                title: "Growth Analytics Platform",
                description: "Built a real-time analytics dashboard processing 10M+ events daily with custom attribution modeling",
                technologies: ["Python", "React", "BigQuery"],
                link: "#"
            },
            {
                icon: "fa-robot",
                iconColor: "purple-400",
                title: "AI-Powered User Onboarding",
                description: "Reduced user churn by 35% with ML-driven personalized onboarding flows and predictive interventions",
                technologies: ["TensorFlow", "Node.js", "AWS"],
                link: "#"
            },
            {
                icon: "fa-mobile-alt",
                iconColor: "cyan-400",
                title: "Mobile Experience Redesign",
                description: "Led cross-functional team to ship native app redesign, increasing DAU by 50% and session time by 2x",
                technologies: ["Swift", "Kotlin", "Firebase"],
                link: "#"
            },
            {
                icon: "fa-shield-alt",
                iconColor: "purple-400",
                title: "Zero-Trust Security Framework",
                description: "Architected enterprise security solution handling 100K+ authentication requests per minute",
                technologies: ["Go", "Kubernetes", "Redis"],
                link: "#"
            },
            {
                icon: "fa-database",
                iconColor: "cyan-400",
                title: "Data Pipeline Automation",
                description: "Created ETL framework reducing data processing time by 80% and enabling real-time insights",
                technologies: ["Spark", "Airflow", "Docker"],
                link: "#"
            },
            {
                icon: "fa-comments",
                iconColor: "purple-400",
                title: "Real-time Collaboration Tool",
                description: "Built WebSocket-based collaboration platform supporting 10K+ concurrent users with <50ms latency",
                technologies: ["WebSockets", "Redis", "Vue.js"],
                link: "#"
            }
        ]
    },

    // GitHub section
    github: {
        title: "Open Source Contributions",
        stats: {
            commits: "500+",
            repositories: "50+",
            stars: "200+",
            prs: "100+"
        },
        profileUrl: "https://github.com/yourusername"
    },

    // Contact section
    contact: {
        title: "Let's Build Something Amazing",
        description: "I'm always interested in discussing new opportunities, innovative projects, and challenging problems to solve.",
        email: "ayser@example.com",
        socialLinks: {
            linkedin: "https://linkedin.com/in/ayser",
            github: "https://github.com/yourusername",
            twitter: "https://twitter.com/yourusername",
            medium: "https://medium.com/@yourusername",
            dribbble: "https://dribbble.com/yourusername"
        }
    },

    // Footer
    footer: {
        text: "Built with",
        passion: "passion",
        and: "and",
        precision: "precision",
        year: "2024"
    },

    // Navigation
    navigation: {
        logo: "A.",
        links: [
            { text: "About", href: "#about" },
            { text: "Projects", href: "#projects" },
            { text: "GitHub", href: "#github" },
            { text: "Contact", href: "#contact" }
        ]
    },

    // Background video
    background: {
        videoUrl: "assets/images/background/full_background_video.mp4"
    }
};

