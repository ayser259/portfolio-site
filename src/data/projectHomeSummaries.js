// Home Page Summaries for Project Cards
// These are the short descriptions shown in the projects showcase grid

const projectHomeSummaries = {
  'SighedKick': {
    title: 'SighedKick – My personal GenAI copilot (and playground)',
    description: 'A constantly evolving GenAI workspace where I design, build, and stress-test how AI should actually plug into real workflows. I use SighedKick daily as my own copilot—storing prompts, shaping tone, and drafting everything from Slack messages to PRDs—while using the same system as a testbed for multi-LLM architectures, evals, and human–AI collaboration patterns.',
    icon: 'fa-robot',
    iconColor: 'cyan-400',
    technologies: ['TypeScript', 'Next.js', 'OpenAI API'],
    externalUrl: 'https://ayser.ca/sighedkick'
  },
  'ByteMe': {
    title: 'ByteMe – Applying fintech thinking to nutrition',
    description: 'ByteMe is a native iOS nutrition tracker that borrows patterns from financial monitoring—turning daily food logging into a clean, insight-driven experience. I built it both as a real health tool I use every day and as a sandbox to prototype ideas for personal finance monitoring: frictionless entry, trend visualization, and habit-forming feedback loops.',
    icon: 'fa-mobile-alt',
    iconColor: 'cyan-400',
    technologies: ['Swift', 'SwiftUI', 'iOS'],
    externalUrl: null
  },
  'CKFD': {
    title: 'Financial Wellness Demos – React prototypes for a modern money app',
    description: 'An interactive React demo that simulates a full financial wellness experience: credit scores, cash flow, education, gamification, and personalized insights. I use it as a living prototype to explore ideas for a comprehensive personal finance platform and to align stakeholders around something they can actually click through—not just read about.',
    icon: 'fa-chart-line',
    iconColor: 'purple-400',
    technologies: ['React', 'TypeScript', 'MUI'],
    externalUrl: null
  },
  'EmptyMyInbox': {
    title: 'Empty my Inbox – A systems-first path to Inbox Zero',
    description: 'A unified email productivity tool that pulls multiple Gmail accounts into one fast, opinionated interface, designed to make Inbox Zero something you can actually hit every day—ideally in the time it takes to ride BART.',
    icon: 'fa-inbox',
    iconColor: 'purple-400',
    technologies: ['Django', 'React', 'PostgreSQL'],
    externalUrl: null
  },
  'PRDSystem': {
    title: 'AI-Assisted PRD Workflow – From brain dump to structured doc',
    description: 'A lightweight, GenAI-powered workflow I designed to turn messy, spoken ideas into clean, structured PRDs. The system combines voice transcripts, targeted AI prompts, and guided refinement so PMs can go from "I have a half-formed idea" to "I have an update-ready PRD" in under an hour—without staring at a blank doc.',
    icon: 'fa-file-alt',
    iconColor: 'cyan-400',
    technologies: ['GenAI', 'Workflow Design', 'Product Management'],
    externalUrl: null
  }
};

export default projectHomeSummaries;

