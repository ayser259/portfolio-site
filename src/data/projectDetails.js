// Project Detail Pages
// Full project descriptions shown when clicking on a project card

const projectDetails = {
  'SighedKick': {
    title: 'SighedKick',
    subtitle: 'My personal GenAI copilot and experimentation lab',
    overview: `SighedKick is my personal GenAI copilot and experimentation lab—a place where I both do my work and design the systems that power it.

I use it every day to:
- Store and reuse prompts and patterns
- Shape and refine tone across audiences
- Draft and iterate on everything from quick replies to long-form docs

At the same time, I use SighedKick to prototype and test GenAI product patterns, multi-model architectures, and eval workflows. It's a meta project: the tool I use to build better versions of itself.`,
    type: 'Personal GenAI platform / experimentation environment',
    role: 'Principal Product Manager & hands-on builder (product, UX, systems design, implementation)',
    focus: 'GenAI systems, model-agnostic design, evaluations, human–AI workflows',
    status: 'Actively used and continuously evolving',
    problem: `I didn't just want to "use ChatGPT."
I wanted to understand how GenAI systems are built and what good actually looks like when AI is embedded in real, messy workflows.

A few pain points pushed me into building SighedKick:
- Prompt fragility: Good prompts are hard-won, and too easy to lose in random docs and chats.
- No portability: It's painful to move prompts, context, and patterns between providers and models.
- One-off tools: Most GenAI tools are narrow and closed—great for a single use case, not for understanding the system as a whole.
- Fast-moving landscape: New models ship constantly; I needed a way to test and switch without rebuilding everything each time.

So I gave myself a constraint:
Don't just adopt GenAI tools. Build one that powers my real work and doubles as a systems lab.

That's SighedKick: a personal copilot I rely on every day, designed from the ground up to be model-agnostic, experiment-friendly, and workflow-first.`,
    features: {
      'Prompt Library': `The Prompt Library is where all my GenAI "infrastructure" lives:
- Reusable prompts: Templates and patterns I've refined over time (e.g., interview prep, product critique, PRD scaffolds, architecture reviews).
- Context snippets: Frequently used background (product domains, teams, roles, personal bio, recurring projects).
- Prompt patterns: Structures for different jobs—analysis, brainstorming, writing, editing, role-play, etc.
- Model-agnostic templates: Prompts that are designed to behave predictably across different LLMs.

What it gives me:
- Consistency – I don't have to reinvent my best prompts every time I open a new model.
- Portability – I can carry the same patterns across providers and UIs.
- Speed – Spinning up a new workflow is often just picking a template and slotting in the specifics.

Effectively, the Prompt Library is my "prompt operating system"—the shared layer that everything else in SighedKick pulls from.`,
      'Tone Shift': `Tone Shift started as a simple question:
"What if I could see this same message in five different voices instantly?"

It has since become my go-to tool for crafting communication in context.

What Tone Shift does:
- Takes an initial draft (or even just a rough concept).
- Generates variations across tones and styles: professional, casual, direct, warm, diplomatic, etc.
- Lets me compare side-by-side and iterate quickly.
- Helps match tone to audience, medium, and stakes.

Where I use it:
- Sensitive team updates and feedback
- Exec summaries, strategy notes, product announcements
- "High-risk" emails and Slack messages where tone really matters

Tone Shift has become a kind of safety rail + amplifier: it keeps me from stepping on tone landmines and helps me reach a voice that's clear, kind, and effective without endless manual rewrites.`,
      'Canvas': `Canvas is the heart of SighedKick and the surface I now start almost everything in.

Think of it as an AI-augmented workspace where I can bring in any text—emails, Slack threads, docs, notes—and then analyze, restructure, and draft until I have something I'm happy with.

What Canvas does:
- Message analysis: Understands incoming content—what is being asked, who the audience is, what constraints exist.
- Draft preparation: Helps outline and then fill in responses, from short replies to long-form docs.
- Document iteration: Rapidly refines PRDs, launch posts, retros, interview writeups, and more.
- Flexible workflows: Supports everything from informal Slack drafts to formal communication, all in one surface.

My current workflow:
1. A complex email or Slack thread comes in → I paste or sync it into Canvas.
2. Canvas breaks down what's going on and suggests structure for a response.
3. I iterate: tweak tone, clarify arguments, reorder sections.
4. When I'm ready, I copy the final version out to its destination.

What makes Canvas powerful is its flexibility: it doesn't force a single pattern. Instead, it adapts to whatever I'm doing—structuring my thinking when I'm stuck, tightening language when I'm verbose, or just handling busywork edits when I'm tired.`
    },
    futureVision: `The next major evolution of SighedKick is toward a model-agnostic evaluation and orchestration layer—essentially, a way to continuously answer:

"Which model is best for this specific job right now?"

1. Multi-LLM Integration & Comparative Evaluation
- Multi-LLM integration: Connect SighedKick to multiple providers (OpenAI, Anthropic, Google, open-source models, etc.).
- Parallel runs: Send the same prompt + context to multiple models simultaneously.
- Comparative analysis: Compare outputs on quality, relevance, style, tone, speed, latency, cost, and accuracy for my specific workflows.

2. Eval Framework & Metrics
- Define task-specific eval sets (e.g., "rewrite this feedback more constructively," "summarize this PRD for execs," "extract key risks from this plan").
- Score model outputs based on what success actually looks like for those tasks.
- Track performance and cost over time as models change.

3. Dynamic Model Selection
- Recommend which model to use for which feature (Tone Shift, Canvas drafting, summarization, code analysis, etc.).
- Make it easy to switch providers as better models emerge without rewriting the entire product.
- Preserve optionalility: I'm never locked into a single vendor; the system is intentionally designed to adapt.

Big picture: SighedKick becomes not just my copilot, but my model routing brain, helping me stay on the best-performing tools for what I actually do day-to-day.`,
    architecture: `SighedKick follows a fairly standard but deliberately model-agnostic GenAI architecture.

Core Tech Shape:
- Frontend: A modern single-page web app for interactive, responsive UX (Prompt Library, Tone Shift, Canvas, comparison views).
- Backend API: A server layer that handles authentication, user/session management, feature logic (prompt composition, tone configuration, Canvas workflows), and communication with one or more LLM providers.
- LLM Integration: A common abstraction for calling different models via their SDKs/APIs.
- Database: Storage for prompts, contexts, feature configurations, and historical interactions.
- State Management: To keep UI, prompts, and model responses in sync across modules.

Architectural Principles:
- Model Agnosticism: All LLM calls flow through a single abstraction layer. Feature modules don't care which provider is behind the scenes. Swapping out or adding a new model is a configuration change, not a refactor.
- Feature Modularity: Prompt Library, Tone Shift, Canvas, and future Evals are structured as separate modules. They share common utilities but can evolve independently.
- Rapid Iteration: Loosely coupled components support fast refactors as my mental model of "good GenAI UX" evolves.
- Workflow-First Design: Every feature started as: "I hit this pain point repeatedly—what do I wish existed?" I dogfood each capability immediately, then refine based on actual friction I feel.`,
    outcomes: `SighedKick has had two big kinds of impact for me:

1. Personal Productivity & Quality
- I now default to drafting everything in Canvas: PRDs, retros, interview prep, 1:1 notes, launch comms.
- Tone Shift helps de-risk sensitive communication and saves me from multiple "rewrite loops."
- The Prompt Library keeps my best prompts and patterns organized and portable, which compounds over time.
- Result: I ship better writing, faster—with more consistency in style and clarity.

2. GenAI Systems Fluency
- Building and using SighedKick has given me hands-on experience with LLM integration patterns, prompt architectures, and state management.
- A grounded sense of what good GenAI UX feels like vs. just calling an API.
- A live environment for experimenting with model-agnostic design, evaluation workflows, prompt libraries, and human–AI interaction patterns over time.
- For my work as a Principal PM, this means I'm not just "using AI tools"—I'm actively designing and validating the systems behind them.`,
    tagline: 'SighedKick - a personal GenAI copilot, and a lab for what AI-powered work can become.',
    demoLink: 'https://www.loom.com/share/349fa5d6c4dd42d2816e2c61a6d0e8cb'
  },
  'ByteMe': {
    title: 'ByteMe',
    subtitle: 'Applying fintech thinking to nutrition',
    overview: `ByteMe is a personal nutrition monitoring app that brings financial monitoring patterns into the health space.

On the surface, it's a clean, simple iOS app for logging meals and tracking nutrition. Under the hood, it's a deliberate experiment in:
- How to make complex data feel approachable
- How to design monitoring workflows that people actually stick with
- How to build an app that can later plug into richer health ecosystems (Apple Health, Apple Watch, Whoop)

I use ByteMe daily both to manage my own nutrition and as a sandbox for ideas that I can transfer back into my work on personal finance monitoring.`,
    type: 'Native iOS app (nutrition monitoring)',
    role: 'Product, design, and implementation',
    stack: 'Swift, SwiftUI, local persistence + cloud sync; designed for HealthKit / Watch / Whoop integrations',
    status: 'Actively used; integration roadmap in progress',
    problem: `Working on a personal finance monitoring product, I spend a lot of time thinking about:
- How people enter data (or avoid it)
- How they scan dashboards
- How they interpret trends and set goals
- What actually drives behavior change

While evaluating other tools across domains, I noticed something:
Health tracking apps often feel more intuitive and human-friendly than their financial counterparts—even though both deal with time-series data, goals, and personal outcomes.

The parallels between money and nutrition are obvious:
- Regular data entry → logs, transactions, meals
- Ongoing monitoring → balances, budgets, calorie/macro counts
- Trend analysis → spending patterns vs eating patterns
- Goals & progress → savings targets vs weight / performance / health goals

So I asked:
"What if I built a health app that lets me test monitoring patterns for finance—while also giving me something genuinely useful in my day-to-day life?"

ByteMe is that app:
- A testing ground for UX and systems ideas I care about professionally
- A real tool I use to manage what I eat and how it impacts how I feel`,
    features: {
      'Meal Logging': `Quickly log meals and snacks throughout the day. Capture essential data like foods, quantities, and meal times. Designed to be fast enough that logging doesn't feel like a separate task.`,
      'Nutrition Tracking': `Track macronutrients (protein, carbs, fats) and key micronutrients, depending on available data. Aggregate intake by meal, day, and longer time periods.`,
      'Patterns & Trends': `Simple visualizations that highlight:
- Daily intake vs goals
- Consistency over time
- Emerging patterns (e.g., under-eating protein, late-night calorie spikes)

Emphasis on clarity over complexity—enough data to be useful, not enough to overwhelm.`,
      'Goals & Progress': `Set nutrition-related targets (e.g., daily protein, calories, macros balance). Track how often and how well you're hitting those goals. Reinforce habit formation by making progress feel visible and attainable.`
    },
    futureVision: `The next phase for ByteMe is deeper integration into the broader health ecosystem, so nutrition isn't viewed in isolation.

1. Apple Health Integration
- Sync nutrition data into Apple Health for a holistic health record.
- Pull activity data (steps, exercise, energy expenditure) to connect what you eat to how you move.
- Enable cross-app data sharing, so ByteMe doesn't have to do everything itself; it can coexist with other health and fitness apps.

2. Apple Watch Companion App
- Quick logging from the wrist for snacks and simple meals.
- Glanceable insights (e.g., today's macro breakdown, remaining goals).
- Real-time nudges like "you're trending low on protein today" or "you're close to your calorie target."

3. Whoop & Recovery Context
- Pull recovery and strain data from Whoop.
- Start to answer questions like:
  - "What does my best recovery days actually look like nutritionally?"
  - "What eating patterns correlate with poor sleep or low recovery scores?"
- Move toward a performance + recovery view of nutrition, not just calorie counting.

Together, these integrations push ByteMe from "nutrition tracker" toward a personal health performance dashboard, with food as a core input.`,
    architecture: `Development Philosophy:
I took an iterative, dogfood-heavy approach:
- I am both product manager and primary user.
- Features get shipped small, then adjusted based on real daily use.
- If something feels annoying or slow in my real life, it gets redesigned.
- This creates a tight build → use → refine loop that keeps the app grounded in real behavior instead of hypothetical personas.

Technology Stack:
- Mobile Application: Native iOS for tight integration and performance. Swift for a modern, type-safe foundation. SwiftUI for declarative UI, making it easy to evolve layouts and components as the product changes.
- Data Layer: Local persistence so the app works even without a network connection (offline-first by design). Cloud sync to back up data and support multi-device use. Structured data models for meals, food items, macro/micro breakdowns, goals and historical summaries.
- Integration Layer: Designed with HealthKit integration in mind from the start. API abstractions in place for future Whoop integrations and potential other fitness or health services. Extensible architecture so new data sources can be added without rewriting the core app.`,
    outcomes: `Building and using ByteMe has directly sharpened my thinking on monitoring products in general—especially in the financial space.

A few key takeaways:
- Frictionless entry is everything. If logging a meal (or a transaction) is painful, users stop. Every second you shave off the flow matters.
- Show just enough data. Overly dense dashboards create anxiety. The right abstractions (e.g., "are you on track today?") beat walls of charts.
- Habits > features. The job is not to expose all the data; it's to build a loop that users will come back to daily or weekly.
- Personal iteration beats hypothetical design. Dogfooding ByteMe forced me to confront the gap between "clever" and "actually usable."

These lessons flow straight back into my work on financial monitoring: how we present balances, how we treat trends, how we nudge people toward better behaviors without overwhelming them.`,
    tagline: 'ByteMe - where I test how to make data-driven products feel human, one meal at a time.',
    demoLink: 'https://www.loom.com/share/9f5c16bc44a84eb9bb24c8d31f9f5f84'
  },
  'CKFD': {
    title: 'Demo App: Personalized Feed Engagement',
    subtitle: 'A mobile-first prototype for financial wellness',
    overview: `This is a high-fidelity, interactive demo that explores how personalized content feeds can drive engagement in financial wellness apps.

Built as a living React prototype, it demonstrates a mobile-first experience where users discover relevant financial insights, education, and recommendations through a curated, personalized feed—similar to how social platforms surface content, but tailored to financial health.

The demo showcases:
- Personalized content discovery based on user financial profile
- Interactive education modules and bite-sized learning
- Contextual recommendations and actionable insights
- Engagement patterns that make financial wellness feel less like homework and more like discovery

It's not a production app; it's a rapid-iteration sandbox for testing product directions, aligning stakeholders, and validating UX patterns before committing engineering resources.`,
    type: 'Interactive demo / design & product exploration tool',
    role: 'Vision, feature design, UX, and implementation in React + TypeScript',
    tech: 'React, TypeScript, MUI, React Router, Vercel',
    status: 'Updated roughly monthly; current version is June 2025',
    problem: `Most financial apps treat engagement as an afterthought. They show you your balance, maybe some charts, and expect you to come back regularly—but there's little reason to return unless you're actively managing something.

The question: What if financial wellness apps borrowed engagement patterns from platforms that people actually want to use?

Social feeds work because they surface relevant, timely content. News apps work because they curate what matters to you. Financial apps often feel like dashboards—useful when you need them, but not something you'd open just to explore.

This demo explores a different model:
- A personalized feed that surfaces relevant financial insights, education, and recommendations
- Content discovery that feels like browsing, not homework
- Engagement patterns that make financial wellness feel less like a chore and more like discovery
- Mobile-first design that works naturally on the device people use most

The goal isn't to gamify finance or turn it into social media. It's to make financial wellness feel as engaging and discoverable as the apps people already love.`,
    features: {
      'Core Financial Tracking': `- Cash Flow Dashboard: Visuals for income, expenses, and net cash flow over time. Emphasis on approachable, story-driven views rather than raw tables.
- Credit Score Monitoring: Multi-agency view (TransUnion, Equifax, Experian). Historical trends and factor breakdowns to explain why a score looks the way it does.
- Credit Card Utilization: Real-time style card utilization tiles and limits. Designed to show "how close to the edge" a user is at a glance.
- Net Worth Tracking: Aggregated view of assets and liabilities. Simple trendline to show movement over time (up, flat, or down).`,
      'Education & Engagement': `- 10 Learning Modules: Structured lessons on key financial topics (credit, budgeting, debt, investing basics, etc.). Each module feels like a mini-course, not just a static article.
- Interactive Quizzes: Embedded quizzes tied to modules. Points/progress tracking to make learning feel like progress, not homework.
- Video Content: Video carousel for bite-sized financial education. Backed by JSON-based metadata to easily swap and test different content sets.
- Weekly Challenges: Category-specific challenges (e.g., "Spend $X less on dining out this week"). Framed to encourage nudges and small wins, not guilt/shame.
- Streak Tracking: Daily engagement streaks for logins, reviews, or lesson completion. Aims to make returning to the app a habit rather than a chore.`,
      'Personalized Insights & Recommendations': `- Blueprint Section: Conceptual area for personalized financial action plans. Think: "If your financial life were a project, here's your next sprint."
- Debt Consolidation Suggestions: Mocked logic for surfacing potential consolidation opportunities. Demonstrates how we might explain why a recommendation makes sense.
- Rewards Optimization: "Are you leaving points/cashback on the table with your current card mix?" Illustrates how card usage can be mapped to better rewards strategies.
- Credit Limit Opportunities: Proactive prompts about where a limit increase might be available or beneficial.
- Car Value Tracking: Example of pulling in a non-bank asset (vehicle) and showing how it depreciates over time.
- Suggested Offers: Personalized, contextual financial products, surfaced in a way that feels helpful, not spammy.`,
      'Social & Community Layer': `- Member Spotlight: Story-driven tiles that show how others are making progress. Designed to explore the motivational power of relatable examples.
- News Section: Curated financial news feed. A place to experiment with how much "news" vs "evergreen content" is useful.
- Review System: Daily or weekly review prompts (e.g., "Take 2 minutes to review your week"). Prototype for recurring reflection patterns, not just passive dashboards.`
    },
    futureVision: `Because this is a demo first, the roadmap is intentionally flexible and exploratory.

Potential future directions:
- Real Data Integration: Pull actual financial data via APIs (Plaid, Yodlee, etc.). Evolve from static sample data to live-like experiences.
- Advanced Analytics & ML: Predictive cash flow and risk alerts. Smart categorizations and anomaly detection ("this month doesn't look like your usual pattern").
- Richer Goal Setting: Multi-goal systems (debt, savings, investing) with clear trade-offs. Progress timelines that feel encouraging, not discouraging.
- Bill Reminders & Automations: Bill calendar, notifications, and suggestions for autopay or consolidation.
- Investment & Tax Layers: Basic portfolio tracking. Tax-relevant insights (e.g., contribution gaps, tax-loss harvesting ideas).
- Family & Shared Finances: Multi-user or "household view" support. Goals and dashboards that reflect shared realities, not just individual ones.
- AI-Powered Assistant: In-app conversational assistant to explain trends, answer "what if?" questions, and walk users through trade-offs.
- Expanded Engagement Features: Community challenges, light leaderboards. Peer learning loops without exposing sensitive data.

The common theme: keep demo velocity high, keep risk low, and use this space to test big ideas before asking engineering to harden them.`,
    architecture: `Tech Stack:
- Frontend Framework: React + TypeScript – Core front-end stack. Create React App – Simple build setup for fast iteration.
- UI & Styling: Material-UI (MUI) – Component library for consistent, accessible UI. Emotion – CSS-in-JS for scoped, component-level styling. Custom style guide – Centralized design tokens (colors, typography, spacing).
- Routing: React Router DOM – Client-side routing for multi-page flows (dashboard, modules, details).
- Tooling & Deployment: Developed using Cursor, optimized for fast refactors and code assist. Deployed on Vercel for quick previews and stakeholder links.

Architecture:
- Component Modularity: Each conceptual feature (cash flow, quizzes, video rail, etc.) is its own component. Self-contained logic per component makes it easy to experiment or remove a feature without breaking others.
- Data-Driven Design: Central JSON/TS data files back most of the UI. Makes it trivial to swap in new quiz sets, change copy and content, explore different configurations without touching core UI logic.
- Simple Routing: Main dashboard at / for the big picture. Detail pages for deeper dives (/credit-score, /cash-flow, /module-x, etc.). Keeps navigation structured and easy to talk through in demos.
- Local State Only: React hooks + props for state and communication. No global state manager intentionally, to keep the demo lightweight and easy to refactor.`,
    outcomes: `These demos are where my product thinking, system design, and builder instincts meet:
- They let me prototype the future of financial wellness in a safe space.
- They give stakeholders something concrete to react to, which surfaces better questions.
- They keep me honest: if an idea looks good in a doc but feels off in the demo, it probably needs rethinking.

In short:
This project is my "show, don't tell" engine for financial UX and system ideas.`,
    tagline: 'A prototype that explores how personalized feeds can make financial wellness feel as engaging as the apps people already love.',
    demoLink: 'https://ckfdjune25.vercel.app/'
  },
  'EmptyMyInbox': {
    title: 'Empty my Inbox',
    subtitle: 'A systems-first path to Inbox Zero',
    overview: `Empty my Inbox is a unified email productivity tool that consolidates multiple Gmail accounts into a single, streamlined interface. It's built to make "Inbox Zero" realistic: instead of spending hours each week bouncing between accounts, I can now clear everything in one focused session—often during a single BART commute.`,
    type: 'Personal product / full-stack build',
    role: 'Principal Product Manager, full-stack maker (product, UX, architecture, implementation)',
    stack: 'Django, Django REST Framework, React, Tailwind, PostgreSQL, Celery, Redis, Gmail API, OAuth2, JWT',
    status: 'In active use, with an evolving roadmap toward an AI-powered personal productivity hub',
    problem: `I love Slack's Catch up feature. It gives me a single, focused lane to process messages and consistently reach "Slack Zero."

Email was the opposite experience:
- I had multiple Gmail accounts (personal, work, side projects).
- I was constantly context switching between inboxes.
- Important messages got buried under newsletters, promos, and noise.
- "Email time" ballooned into hours per week and a dreaded weekend chore.

I wanted that same "one lane, clean sweep" feeling for email:
"What if I could process all my email from all accounts in one place, fast enough to do it on a train ride—and end every day at Inbox Zero?"

Empty my Inbox is my answer to that question.`,
    features: {
      'Multi-Account Aggregation': `Connect multiple Gmail accounts via secure OAuth2. Aggregate emails from all accounts into a single unified queue. Maintain account identity (so you still know where each email lives) while benefiting from one processing surface.`,
      'Real-time, Two-Way Synchronization': `Every action in Empty my Inbox reflects back to Gmail:
- Mark as read/unread
- Star / unstar
- Respect and preserve Gmail labels

All updates propagate in near real time through background workers and the Gmail API.`,
      'Fast Email Processing UI': `The UI is designed like a "catch-up lane":
- Clean, minimal layout focusing on one primary action bar.
- Bulk operations to process multiple emails at once.
- Filters by account, read status, and other parameters to narrow the queue.
- Quick view of email content without jumping away from the main processing flow.`,
      'Newsletter & Promo Management': `Visually separate newsletters and promotional content from high-value mail. Support for quick-clear patterns to batch through low-priority emails. Ability to bookmark/save interesting newsletters for later reading without cluttering the main inbox.`
    },
    futureVision: `The longer-term vision is for Empty my Inbox to become a productivity layer on top of email—using intelligence (including GenAI) to turn unstructured noise into structured, actionable data.

Planned and explorative directions:
1. Intelligent Task Management: Automatically extract action items from email bodies (e.g., "follow up," "review," "approve"). One-click conversion from an email to a to-do with context preserved. Smart prioritization and grouping based on sender, content, and due dates.

2. Integrated Note-Taking: Create notes directly from emails, pre-filled with relevant context. Link notes back to specific emails or threads. Over time, use email + notes to form a lightweight knowledge base (e.g., decisions, agreements, key docs).

3. Calendar Intelligence: Deeper integration with Google Calendar. Automatically detect dates, times, and commitments in emails and offer "add to calendar" suggestions. Use scheduling context (working hours, existing events) to propose smart meeting slots.

4. Advanced Email Intelligence (AI & GenAI): Go beyond Gmail's default categories to build richer semantic buckets (e.g., "billing," "travel," "approvals," "intros"). Summarize long threads using LLMs so you can understand a 30-message chain in a few sentences. A smarter priority inbox informed by sender history, response patterns, and content.

5. Productivity Analytics: Track email processing patterns (when you clear fastest, what slows you down). Highlight time sinks (e.g., recurring threads that never resolve, low-value senders). Generate lightweight weekly / monthly digests: how much you processed, how quickly, and how it's trending.`,
    architecture: `Product Approach:
- API-first: From day one, I treated the backend as a standalone API that could serve multiple UIs (web, mobile, browser extension).
- Single-flow UX: Everything centers around one primary processing lane; navigation is intentionally limited to keep attention in the queue.
- Experiment-friendly: The architecture supports adding new "actions" or "views" (tasks, notes, analytics) without rewriting the core email sync logic.

Technical Architecture:
- Backend – Django + DRF: Django 4.2 for core web framework & ORM. Django REST Framework for a clean, versionable API layer. PostgreSQL for persistent storage of email metadata, user accounts, and sync state. Celery + Redis for background jobs (sync, batch operations, token refresh). Google APIs Client (Python) for Gmail integration.
- Frontend – React: React SPA for a responsive, snappy inbox-processing experience. JWT-based auth with automatic refresh; minimal round-trips and predictable auth flows. Tailwind CSS for rapid iteration on layout and interaction patterns.

Infrastructure & System Design:
- EmailAccount model – tracks each connected Gmail account, OAuth tokens, and sync metadata.
- Email model – stores email metadata (sender, subject, labels, timestamps, read/star state) with indexed fields for fast querying and filtering.
- User model – standard Django user, extended for mapping multiple EmailAccounts per user.

Security & Performance:
- OAuth2-only: The app never stores Gmail passwords, only OAuth tokens.
- JWT with refresh tokens for app sessions, with token blacklisting on logout.
- Encrypted token storage for OAuth tokens at rest.
- Database indexing on commonly filtered fields (account, read status, date, starred).
- Pagination and lazy loading for large inboxes.
- Batch operations to minimize API calls.`,
    outcomes: `Even as a single-user tool today, the project has had real impact:
- I now end most days at Inbox Zero across multiple Gmail accounts.
- What used to be a multi-hour weekly task has become a 10–20 minute daily ritual, often squeezed into a commute.
- I've effectively given myself back several hours a month in cognitive load and admin time.

From a craft perspective, this project:
- Let me deep-dive into email systems, OAuth2 flows, and background job design.
- Strengthened my ability to wear both PM and engineer hats: define the product, design the system, and ship the implementation.
- Created a real, extensible platform I can now layer GenAI and productivity workflows on top of.`,
    tagline: 'Empty my Inbox - because your inbox should work for you, not against you.',
    demoLink: 'https://www.loom.com/share/57c39825aa134944a44d0f26d6826dda'
  },
  'PRDSystem': {
    title: 'AI-Assisted PRD Workflow',
    subtitle: 'From brain dump to structured doc',
    overview: `This "project" isn't an app — it's a workflow.

I designed an AI-assisted flow for updating PRDs that turns raw, spoken ideas into structured documents using:
- A voice memo brain dump
- A guided AI conversation to unpack and sharpen the idea
- A PRD-generation prompt that turns everything into a well-structured doc

The goal: make it dramatically easier (and faster) for PMs to go from "I have a concept in my head" to "I have a PRD I can share and iterate on."`,
    type: 'Workflow / Process Design',
    role: 'Designed the workflow, wrote the prompt systems, and rolled it into my own and my team\'s PRD habits',
    status: 'In active use as my default way to create & update PRDs; easily adaptable for specs, strategy docs, and one-pagers',
    problem: `Traditional PRD writing has a few recurring pain points:
- Blank-page paralysis – Staring at a template with empty sections is slow and demotivating.
- Fragmented context – Background, member problem, business problem, and solution ideas often live in Slack threads, random docs, and people's heads.
- High switching cost – Capturing everything in polished written form is cognitively heavy, especially when you're still figuring out the idea.
- Hard to scale thinking – When you're a principal PM, a lot of value is in your mental model of a space. Getting that out of your head in a repeatable way is non-trivial.

I wanted a flow that:
- Let me think out loud instead of writing from scratch
- Used GenAI as a structured thought partner, not just a text generator
- Produced PRD-ready material I could drop into our canonical docs
- Was simple enough that other PMs could copy it`,
    features: {
      'Step 1 – Create a transcript of your idea': `Goal: Capture everything in your head without editing yourself.

Open a voice memo / recorder. Talk as if you're explaining this to a new teammate who needs to run with it while you're on PTO.

Cover these beats explicitly:
- Background of the product area
- The member problem you're trying to solve
- The business problem you're trying to solve
- Any relevant context (history, constraints, dependencies, previous attempts)
- How you want to solve it – early solution ideas, hypotheses, directions

When you're done, save the recording and copy the transcript (from your phone or transcription tool).

This step deliberately optimizes for speed and completeness, not polish. It's easier to talk for 10–20 minutes than to write for an hour.`,
      'Step 2 – Elevate the idea (Guided AI conversation)': `Goal: Turn the raw dump into a sharper, more complete concept by letting AI interrogate it.

Take your transcript and paste it into a custom SighedKick prompt (your "Elevate the Idea" flow).

Start the conversation: the prompt asks structured questions about:
- Member problem
- Business problem
- Success metrics
- Constraints, risks, and open questions
- Edge cases and dependencies

For each question:
- If it's relevant, answer it directly, adding more context.
- If it's not relevant, explicitly say "not relevant for this idea, please skip" and move on.

Keep going until:
- You've filled in the obvious gaps
- You feel like you're not adding much new information anymore
- The conversation history reads like a solid, structured understanding of the problem and approach

This step essentially replaces a chaotic internal monologue with a guided interrogation, so by the end you've pressure-tested and sharpened your idea without manually outlining everything yourself.`,
      'Step 3 – Generate the PRD draft': `Goal: Convert the enriched conversation into a structured document you can tweak and ship.

Copy the full conversation history from Step 2 (your transcript + all Q&A).

Paste it into your second SighedKick prompt (the "Generate Document / PRD" flow).

The prompt turns that history into a structured doc, typically with sections like:
- Background / Context
- Member Problem
- Business Problem & Opportunity
- Goals & Success Metrics
- Proposed Solution & Scope
- Out of Scope
- Dependencies & Risks
- Open Questions / Next Steps

Read through the generated doc and give targeted feedback:
- "Tighten the background section."
- "Add more detail on risks."
- "Shorten the proposed solution section by 30%."
- "Make the tone more concise and executive-ready."

Once you're happy:
- Copy it section by section into your canonical PRD tool (Confluence, Google Docs, Notion, etc.).
- Continue editing there if needed, or loop back through AI for small tweaks.

At the end, you have a clean PRD draft that:
- Reflects your actual thinking
- Follows a consistent structure
- Took significantly less time than writing from scratch`
    },
    designPrinciples: `Design Principles Behind the Flow:

1. Talk first, write later
- Humans are often faster and more natural when speaking than typing.
- Voice-first capture reduces the friction of starting.

2. AI as a structured interviewer
- Instead of "write me a PRD," the model acts like a thoughtful partner asking the right follow-ups.
- This keeps you in control while still benefiting from AI's structure.

3. Separation of thinking vs document creation
- Step 2 is about thinking and refining.
- Step 3 is about formatting and presenting.

4. Repeatable, not one-off
- The links/prompts and instructions are reusable.
- The flow doesn't depend on you having a "good writing day."`,
    outcomes: `For me personally, this workflow has:
- Cut the time to go from rough idea → PRD draft by a meaningful margin.
- Reduced the blank page anxiety of starting big docs.
- Improved clarity: the Q&A phase surfaces missing context, misaligned assumptions, and fuzzy problem statements.
- Made it easier to keep PRDs fresh, since updates can start from a quick voice memo instead of rewriting from scratch.

At a principal level, it's also a way to:
- Codify my approach to problem framing and PRD structure.
- Make that approach transferable to other PMs via prompts and process, not just ad hoc coaching.
- Demonstrate concrete ways I embed GenAI into team workflows rather than just talking about AI in the abstract.`,
    tagline: 'A reusable, AI-assisted workflow that turns spoken idea dumps into clean, structured PRDs—so PMs can spend more time thinking and less time wrestling with a blank document.'
  },
  'CanadianEconomy': {
    title: 'ZIRP-era Canadian Economic Analysis (2008–2019)',
    subtitle: 'Exploring macro trends through interactive data',
    overview: `This is an interactive data story that explores key Canadian macroeconomic indicators from 2008–2019—the ZIRP era.

It was originally built as a Jupyter-driven visualization exported to the web, giving stakeholders and classmates a way to explore charts and relationships in their browser without needing a notebook environment.

The project is less about pixel-perfect UI and more about building a clear, narrative-driven lens on complex economic data.`,
    type: 'Interactive data visualization',
    role: 'Analysis, storytelling, and visualization',
    stack: 'Jupyter, Python, Plotly / matplotlib, HTML, Bootstrap, RequireJS',
    status: 'Completed academic / exploration project',
    problem: `Economic reports are often static PDFs or dense tables that make it hard to see trends and relationships at a glance.

This project asked: how can we turn macroeconomic data into something that feels explorable and intuitive for non-economists?`,
    features: {
      'Time-Series Dashboards': `Interactive charts that let you see how key indicators move over time, with the ability to focus in on specific periods.`,
      'Cross-Metric Comparisons': `Side-by-side views of indicators (e.g., GDP, unemployment, inflation) so it’s easy to reason about how they move together.`,
      'Narrated Structure': `Sections and annotations that guide the reader through what to look at and why it matters, instead of leaving them alone with raw charts.`
    },
    outcomes: `This was an early exercise in treating data visualization as a product:
- Deciding which metrics actually matter
- Sequencing the narrative so non-experts don’t get lost
- Using interaction sparingly to clarify, not distract`,
    tagline: 'Making macroeconomic data feel a little less like a wall of numbers and a little more like a story.',
    demoLink: '/projects/canadian_economy/canadian_economy.html'
  },
  'Kakeibo': {
    title: 'Kakeibo',
    subtitle: 'Budgeting with a Japanese money journaling lens',
    overview: `Kakeibo is a simple, web-based prototype that applies the Japanese "kakeibo" money journaling method to everyday spending.

Instead of starting with charts and categories, it starts with reflection questions and intentional, forward-looking choices.

The goal was to see how much of kakeibo’s analog discipline could be preserved in a lightweight digital experience.`,
    type: 'Personal finance prototype',
    role: 'Product design, content, and implementation',
    stack: 'Python, Jupyter, HTML, Bootstrap, RequireJS',
    status: 'Completed prototype used as a thinking tool for money habits',
    problem: `Most budgeting tools drop you directly into numbers: balances, charts, and categories.

Kakeibo starts from a different premise: that how you think about money and the questions you ask yourself each month matter as much as the spreadsheets.`,
    features: {
      'Monthly Reflection Flow': `Guided prompts that encourage you to articulate what you want your money to do for you this month, before you start logging anything.`,
      'Simple Spending Buckets': `Aligns with kakeibo’s traditional buckets (needs, wants, culture, unexpected) instead of hyper-granular categories.`,
      'Lightweight Visuals': `Charts that are intentionally simple—enough to reinforce the reflection, not enough to become a distraction.`
    },
    outcomes: `Kakeibo helped me explore how productized budgeting can borrow from behavior-first practices:
- How prompts and language shape the experience
- How much UI you actually need to create accountability
- Where digital tools should stop so reflection can start`,
    tagline: 'Bringing an analog money journal sensibility into a small, opinionated digital prototype.',
    demoLink: '/projects/kakeibo/kakeibo.html'
  },
  'UWEngineeringProgramClassifier': {
    title: 'Engineering Fit Classifier',
    subtitle: 'Helping students find a fit across engineering programs',
    overview: `The Engineering Fit Classifier is an interactive demo that uses a simple machine learning model to suggest University of Waterloo engineering programs based on a student’s interests and attributes.

It wraps a small classification model in a browser-based experience so students can answer a few questions and see how different programs line up.`,
    type: 'Applied ML + UX experiment',
    role: 'Model design, feature engineering, and demo experience',
    stack: 'Python, scikit-learn, Jupyter, HTML, Bootstrap, RequireJS',
    status: 'Completed exploration project',
    problem: `Choosing an engineering program is high-stakes and often overwhelming.

The project explores: can we use even a simple classifier—not as an oracle—but as a conversation starter that helps students see options they might not have considered?`,
    features: {
      'Interactive Questionnaire': `Collects a few key signals (interests, strengths, preferences) through a simple form instead of a long survey.`,
      'Program Suggestions': `Uses a trained classifier to rank programs and surface a short list of candidates, with an emphasis on explanation over raw scores.`,
      'What-If Tuning': `Lets users tweak answers and immediately see how recommendations shift, reinforcing that the model is a tool, not a verdict.`
    },
    outcomes: `This project reinforced a few ML-as-product lessons:
- Recommendations need context and caveats, not just scores
- The UX around a model is as important as the model itself
- Lightweight prototypes are a fast way to stress-test whether a model actually helps users think better`,
    tagline: 'A small, opinionated classifier wrapped in a UX that treats recommendations as the start of a conversation, not the end.',
    demoLink: '/projects/uw_engineering_program_classifier/uw_engineering_program_classifier.html'
  },
  'UWPlacementQuiz': {
    title: 'What Type of Engineering Should I Study?',
    subtitle: 'A lightweight quiz for exploring program fit',
    overview: `This project is a browser-based quiz that helps prospective students think through which UW programs might fit them, based on a series of short questions.

It leans more on structured questioning and framing than heavy algorithms, mirroring how a good advisor might walk a student through trade-offs.`,
    type: 'Interactive quiz / exploration tool',
    role: 'Question design, scoring rules, and implementation',
    stack: 'HTML, JavaScript, Bootstrap, RequireJS',
    status: 'Completed prototype for exploration and conversation',
    problem: `Prospective students often don't know how to compare programs in a structured way—they're juggling anecdotes, rankings, and vague preferences.

The quiz is an experiment in giving them a more guided way to surface what matters and see how different options align.`,
    features: {
      'Short, Structured Quiz': `A sequence of approachable questions about interests, working style, and goals, designed to be completable in a few minutes.`,
      'Simple Scoring Model': `Deterministic rules that map answers to suggestion buckets, intentionally kept transparent and debuggable.`,
      'Result Summaries': `High-level recommendations that explain the "why" behind suggestions instead of just naming programs.`
    },
    outcomes: `The quiz prototype was a useful sandbox for:
- Thinking through how to encode qualitative preferences into rules
- Exploring how much fidelity you actually need in a recommendation to be helpful
- Testing quiz-style UX patterns for future decision-support tools`,
    tagline: 'A small quiz that turns fuzzy preferences into a clearer starting point for program exploration.',
    demoLink: '/projects/uw_placement_quiz/uw_placement_quiz.html'
  },
  'MakingYourOwnCopilot': {
    title: 'Making Your Own AI Copilot',
    subtitle: 'A hands-on workshop for building personalized GenAI systems',
    overview: `This is a workshop I designed and delivered to help product managers, engineers, and operators build their own AI copilots—personalized systems that leverage LLMs as context-rich, persistent partners for their work.

The workshop covers the mental models, skills, and practical setup needed to go from "using ChatGPT" to building a reusable, teachable system that actually fits into real workflows.`,
    type: 'Workshop / Educational content',
    role: 'Workshop design, content creation, and facilitation',
    stack: 'Google Slides, Loom, Google Drive, Gemini, ChatGPT',
    status: 'Delivered at company summits and internal training sessions',
    problem: `Most people's experience with GenAI is still one-off chats and prompts that get lost in conversation history.

The workshop addresses a few core gaps:
- People don't have a mental model for what an "AI copilot" actually is beyond "using ChatGPT"
- There's no clear path from ad-hoc prompting to building reusable, persistent systems
- Context management, prompt engineering, and workflow design aren't taught as integrated skills
- Most GenAI training focuses on tool features, not on building systems that fit into real work

The goal: help people build something they'll actually use, not just learn about.`,
    features: {
      'Mental Models & Frameworks': `The workshop introduces a clear mental model for thinking about AI copilots as systems—not just tools or prompts. It covers:
- What makes a copilot "context-rich" and "persistent"
- How to think about decomposition, context engineering, and prompt engineering as integrated skills
- When to offload work vs. when to stay in control`,
      'Hands-On Setup': `Participants walk through setting up their own starter copilot:
- Creating a "global context" or "about me" document
- Setting up context-aware GPTs/Gems that leverage that context
- Building reusable prompts for specific use cases
- Managing inputs, interactions, and outputs as a system`,
      'Practical Workflows': `The workshop includes real examples and exercises:
- Converting voice memos to structured notes
- Extracting insights from user testing transcripts
- Creating launch updates from PRDs and operational notes
- Building repeatable workflows that save time and improve quality`
    },
    outcomes: `The workshop has been delivered multiple times and has helped participants:
- Move from one-off ChatGPT usage to building reusable systems
- Understand context management and when to refresh vs. extend conversations
- Create their own copilots that they actually use day-to-day
- Share patterns and workflows with their teams

It's also become a template for how I think about teaching GenAI skills: start with mental models, then hands-on setup, then real workflows—not just tool tutorials.`,
    tagline: 'From one-off ChatGPT chats to building a personalized AI copilot you actually use every day.',
    demoLink: 'https://www.loom.com/share/4ea3dd0a1242494e9fecc2379d48d24f',
    slidesLink: 'https://docs.google.com/presentation/d/1fXLnj99YAzaVNNEk1pT6gOIQ0lBLrTrpg_KMZZTHEeM/edit'
  }
};

export default projectDetails;

