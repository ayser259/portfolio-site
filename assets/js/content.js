// Content and copy for the portfolio site
// Edit this file to update all text content on the site

const siteContent = {
    // Site metadata
    site: {
        title: "Ayser – Product Manager & Systems Builder",
        name: "Ayser",
        tagline: "Product Manager · Systems Builder · Storyteller"
    },

    // Terminal messages (shown in the terminal animation)
    terminal: {
        prompt: "ayser@portfolio:~$",
        messages: [
            "$ initializing portfolio.exe...",
            "$ booting systems_builder.ts",
            "",
            "> Hey, I'm Ayser 👋",
            "> Staff Product Manager & systems builder",
            "> currently leading Discovery at Credit Karma",
            "",
            "> I design products that move the needle",
            "> blending data, experimentation, and storytelling",
            "",
            "> I've led full-app redesigns, growth experiments,",
            "> and data platform work for 100M+ members",
            "",
            "> Previously: founder during grad school at Waterloo",
            "> Always: builder, writer, and board game nerd",
            "",
            "> Focus areas:",
            "  • Product strategy & discovery",
            "  • Growth & experimentation",
            "  • Systems design & data platforms",
            "  • Gen AI-powered product experiences",
            "",
            "> This site is a snapshot of what I build,",
            "> how I think, and what I ship.",
            "",
            "> Scroll to explore the work",
            "> Or reach out if you want to build together",
            "",
            "$ portfolio_loaded successfully ✓"
        ]
    },

    // About section
    about: {
        title: "Product Manager & Systems Builder",
        description: "I sit at the intersection of product strategy, systems design, and storytelling. I love untangling messy problems, designing durable architectures, and shipping experiences that actually change behavior at scale.",
        features: [
            {
                icon: "fa-code",
                iconColor: "cyan-400",
                title: "Technical Deep Dives",
                description: "From data models to APIs and architecture, I speak engineering fluently and use it to make sharper product calls."
            },
            {
                icon: "fa-rocket",
                iconColor: "purple-400",
                title: "Experimentation & Growth",
                description: "Designing experiments that connect member value to business impact—beyond vanity metrics and one-off wins."
            },
            {
                icon: "fa-cogs",
                iconColor: "cyan-400",
                title: "Systems Thinking",
                description: "Thinking in loops, platforms, and ecosystems so features plug into a coherent, scalable system instead of isolated bets."
            }
        ]
    },

    // Projects section
    projects: {
        title: "Featured Work",
        items: [
            {
                icon: "fa-mobile-alt",
                iconColor: "cyan-400",
                title: "Credit Karma App & Web Redesign",
                description: "Leading the end-to-end redesign of Credit Karma’s dashboard and discovery surfaces for 140M+ members, reversing negative engagement trends and unlocking new revenue levers.",
                technologies: ["Product strategy", "Cross-platform UX", "Experimentation"],
                link: "#"
            },
            {
                icon: "fa-chart-line",
                iconColor: "purple-400",
                title: "Discovery & Engagement Platform",
                description: "Rebuilt the Discovery layer that powers what members see when they log in—simplifying navigation, improving relevance, and driving a measurable lift in MAU and session depth.",
                technologies: ["Recommendations", "Ranking", "Eventing & Analytics"],
                link: "#"
            },
            {
                icon: "fa-rocket",
                iconColor: "cyan-400",
                title: "Goals & Personalization Reboot",
                description: "Hit pause on a fully approved ‘member goals’ launch, aligned multiple orgs on a new strategy, and rebuilt the stack for durable personalization instead of one-off data hacks.",
                technologies: ["Data modeling", "Systems design", "Stakeholder alignment"],
                link: "#"
            },
            {
                icon: "fa-inbox",
                iconColor: "purple-400",
                title: "Empty My Inbox",
                description: "A Django + React tool that turns Gmail chaos into workflows—batching, triaging, and auto-routing emails so busy people can realistically hit Inbox Zero.",
                technologies: ["Django", "React", "PostgreSQL"],
                link: "#"
            },
            {
                icon: "fa-robot",
                iconColor: "cyan-400",
                title: "Sighed Kick (Gen AI Writing Partner)",
                description: "A Gen AI companion for rewriting, analyzing, and shaping text across emails, docs, and conversations—with opinionated tone controls and structured prompt patterns under the hood.",
                technologies: ["TypeScript", "Next.js", "OpenAI API"],
                link: "#"
            },
            {
                icon: "fa-database",
                iconColor: "purple-400",
                title: "Systems & Analytics Foundations",
                description: "Partnered with infra and data teams to design event schemas, pub/sub patterns, and analytics contracts that keep experiments fast, trustworthy, and easy to scale.",
                technologies: ["Kafka", "BigQuery", "Experimentation"],
                link: "#"
            }
        ]
    },

    // GitHub section
    github: {
        title: "Open Source & Side Projects",
        stats: {
            commits: "500+",
            repositories: "50+",
            stars: "200+",
            prs: "100+"
        },
        profileUrl: "https://github.com/ayser259"
    },

    // Contact section
    contact: {
        title: "Let's Build Something Interesting",
        description: "I’m open to senior product roles, advisory work, and ambitious side quests. If you’re tackling a hard problem in consumer finance, productivity, or AI, I’d love to talk.",
        email: "ayserchoudhury@gmail.com",
        socialLinks: {
            linkedin: "https://linkedin.com/in/ayser-ca",
            github: "https://github.com/ayser259",
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
        year: "2025"
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
