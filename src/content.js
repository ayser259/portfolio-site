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
        icon: 'fa-inbox',
        iconColor: 'purple-400',
        title: 'Empty My Inbox',
        description:
          'A Django + React tool that turns Gmail chaos into workflows—batching, triaging, and auto-routing emails so busy people can realistically hit Inbox Zero.',
        technologies: ['Django', 'React', 'PostgreSQL'],
      },
      {
        icon: 'fa-robot',
        iconColor: 'cyan-400',
        title: 'Sighed Kick (Gen AI Writing Partner)',
        description:
          'A Gen AI companion for rewriting, analyzing, and shaping text across emails, docs, and conversations—with opinionated tone controls and structured prompt patterns under the hood.',
        technologies: ['TypeScript', 'Next.js', 'OpenAI API'],
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
        icon: 'fa-chart-line',
        iconColor: 'purple-400',
        title: 'Financial Wellness Demos',
        description:
          'An interactive React demo that simulates a full financial wellness experience: credit scores, cash flow, education, gamification, and personalized insights.',
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
    ],
  },

  // Used by ContactSection for the contact CTA
  contact: {
    title: "Let's Build Something Interesting",
    description:
      'I’m open to senior product roles, advisory work, and ambitious side quests. If you’re tackling a hard problem in consumer finance, productivity, or AI, I’d love to talk.',
    email: 'ayserchoudhury@gmail.com',
  },
};

export default siteContent;


