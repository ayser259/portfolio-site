// Central content configuration for the React app.
// This file intentionally only keeps fields that are actually used in the codebase.

const siteContent = {
  // Used by PageTitle to set the default document title
  site: {
    title: 'Ayser C – Product Manager & Systems Builder',
  },

  // Used by TerminalModal for the intro terminal sequence
  terminal: {
    messages: [
      '',
      "Hi, I'm Ayser 👋",
      '',
      "I'm a Product Lead and builder based in San Francisco, CA.",
      '',
      'This site is a snapshot of who I am, how I think, what I build, and what I like.',
      '',
      'Where should we start?',
      '',
    ],
  },

  // Used by ProjectsShowcase to render the projects grid
  projects: {
    title: 'Featured Work',
    items: [
      {
        icon: 'fa-robot',
        iconColor: 'cyan-400',
        title: 'Sighed Kick (Gen AI Writing Partner)',
        description:
          'A Gen AI companion for rewriting, analyzing, and shaping text across emails, docs, and conversations—with opinionated tone controls and structured prompt patterns under the hood.',
        technologies: ['TypeScript', 'Next.js', 'OpenAI API'],
      },
      {
        icon: 'fa-inbox',
        iconColor: 'purple-400',
        title: 'Empty My Inbox',
        description:
          'A Django + React tool that turns Gmail chaos into workflows—batching, triaging, and auto-routing emails so busy people can realistically hit Inbox Zero.',
        technologies: ['Django', 'React', 'PostgreSQL'],
      },
      {
        icon: 'fa-mobile-alt',
        iconColor: 'cyan-400',
        title: 'ByteMe',
        description:
          'A native iOS nutrition tracker that borrows patterns from financial monitoring—turning daily food logging into a clean, insight-driven experience.',
        technologies: ['Swift', 'SwiftUI', 'iOS'],
      },
      {
        icon: 'fa-chalkboard-teacher',
        iconColor: 'cyan-400',
        title: 'Making Your Own AI Copilot',
        description:
          'A hands-on workshop I designed and delivered to help product managers, engineers, and operators build their own AI copilots—personalized systems that leverage LLMs as context-rich, persistent partners.',
        technologies: ['Workshop Design', 'GenAI', 'Education'],
      },
      {
        icon: 'fa-chart-line',
        iconColor: 'purple-400',
        title: 'Demo App: Personalized Feed Engagement',
        description:
          'A high-fidelity, mobile-first React prototype that explores how personalized content feeds can drive engagement in financial wellness apps.',
        technologies: ['React', 'TypeScript', 'MUI'],
      },
      {
        icon: 'fa-file-alt',
        iconColor: 'cyan-400',
        title: 'AI-Assisted PRD Workflow',
        description:
          'A lightweight, GenAI-powered workflow that turns messy, spoken ideas into clean, structured PRDs using voice transcripts, targeted AI prompts, and guided refinement.',
        technologies: ['GenAI', 'Workflow Design', 'Product Management'],
      },
      {
        icon: 'fa-question-circle',
        iconColor: 'purple-400',
        title: 'What Type of Engineering Should I Study?',
        description:
          'A browser-based quiz that helps prospective students think through which UW programs might fit them, using structured questions and transparent scoring instead of a black-box model.',
        technologies: ['JavaScript', 'UX', 'Decision Support'],
      },
      {
        icon: 'fa-university',
        iconColor: 'cyan-400',
        title: 'Engineering Fit Classifier',
        description:
          'An applied ML demo that uses a simple classifier plus a guided UX to suggest UW engineering programs based on student interests and attributes.',
        technologies: ['Python', 'scikit-learn', 'Data Science'],
      },
      {
        icon: 'fa-wallet',
        iconColor: 'purple-400',
        title: 'Kakeibo',
        description:
          'A small, opinionated personal finance prototype that applies the Japanese kakeibo money journaling method to digital budgeting, focusing on reflection and intention over complex dashboards.',
        technologies: ['Python', 'Jupyter', 'Behavior Design'],
      },
      {
        icon: 'fa-chart-bar',
        iconColor: 'cyan-400',
        title: 'ZIRP-era Canadian Economic Analysis (2008–2019)',
        description:
          'An interactive data visualization that explores Canadian macroeconomic indicators over time, built as a Jupyter notebook exported to the web so stakeholders can explore trends in-browser.',
        technologies: ['Python', 'Jupyter', 'Data Visualization'],
      },
    ],
  },

  // Used by ContactSection for the contact CTA
  contact: {
    title: "Let's build together",
    description:
      'I’m open to connecting over senior to principal IC product roles, seed and pre-seed investment opportunities, and startup advisory. If you’re tackling a hard problem in growth, systems, finance, productivity, or AI, I’d love to talk.',
    email: 'ayserchoudhury@gmail.com',
  },
};

export default siteContent;


