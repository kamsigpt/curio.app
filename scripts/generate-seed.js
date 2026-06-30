import { writeFileSync } from "fs";

const categories = [
  { id: "cat-dev", name: "Development", slug: "development", icon: "code-2", count: 482 },
  { id: "cat-design", name: "Design", slug: "design", icon: "palette", count: 311 },
  { id: "cat-business", name: "Business", slug: "business", icon: "briefcase", count: 264 },
  { id: "cat-marketing", name: "Marketing", slug: "marketing", icon: "megaphone", count: 198 },
  { id: "cat-data", name: "Data Science", slug: "data-science", icon: "bar-chart-3", count: 176 },
  { id: "cat-photo", name: "Photography", slug: "photography", icon: "camera", count: 122 },
  { id: "cat-music", name: "Music", slug: "music", icon: "music-2", count: 95 },
  { id: "cat-growth", name: "Personal Growth", slug: "personal-growth", icon: "brain", count: 140 },
];

const instructors = [
  {
    id: "ins-1", name: "Amara Okafor", headline: "Senior Frontend Engineer, ex-Stripe",
    avatar_url: "amara", bio: "Amara has spent a decade building production interfaces at scale and has taught over 90,000 students how modern web apps actually get built.",
    rating: 4.8, student_count: 94210, course_count: 6,
  },
  {
    id: "ins-2", name: "Daniel Kessler", headline: "Brand & Product Designer",
    avatar_url: "daniel", bio: "Daniel leads design at a fintech startup and previously worked at two design agencies in Berlin. He teaches design systems thinking from first principles.",
    rating: 4.9, student_count: 51230, course_count: 4,
  },
  {
    id: "ins-3", name: "Priya Raman", headline: "Independent Tutor \u00b7 Data & AI",
    avatar_url: "priya", bio: "Priya is a self-taught data scientist who left consulting to teach full time. Her courses focus on practical, portfolio-ready projects.",
    rating: 4.7, student_count: 28890, course_count: 5,
  },
  {
    id: "ins-4", name: "Marcus Webb", headline: "Growth Marketer & Founder",
    avatar_url: "marcus", bio: "Marcus has run growth for three venture-backed startups and now teaches the channels and frameworks that actually move revenue.",
    rating: 4.6, student_count: 33410, course_count: 3,
  },
  {
    id: "ins-5", name: "Sofia Lindqvist", headline: "Independent Tutor \u00b7 Visual Arts",
    avatar_url: "sofia", bio: "Sofia is a working photographer and colorist who teaches the technical craft behind editorial and travel photography.",
    rating: 4.9, student_count: 19040, course_count: 4,
  },
  {
    id: "ins-6", name: "Tomasz Nowak", headline: "Backend Architect, 12+ yrs",
    avatar_url: "tomasz", bio: "Tomasz has designed backend systems for companies processing millions of requests a day, and teaches systems design with real production stories.",
    rating: 4.8, student_count: 67550, course_count: 5,
  },
  {
    id: "ins-7", name: "Naledi Dube", headline: "Executive Coach & Author",
    avatar_url: "naledi", bio: "Naledi coaches founders and executives on focus, communication and decision-making, distilled from 15 years of 1:1 coaching practice.",
    rating: 4.9, student_count: 22170, course_count: 3,
  },
  {
    id: "ins-8", name: "Leo Fontaine", headline: "Independent Tutor \u00b7 Music Production",
    avatar_url: "leo", bio: "Leo produces for independent artists and teaches music production from a home-studio budget upward.",
    rating: 4.7, student_count: 15680, course_count: 3,
  },
];

const courses = [
  {
    id: "c-1", slug: "modern-javascript-frameworks",
    title: "Modern JavaScript: From Fundamentals to Frameworks",
    subtitle: "Master JS, then build real apps with React and TypeScript",
    description: "A project-driven path through modern JavaScript: closures, async patterns, the module system, and the mental models you need before picking up React and TypeScript. Ends with three deployable projects for your portfolio.",
    thumbnail_url: "dev-1", provider: "Curio Original",
    instructor_id: "ins-1", category_id: "cat-dev",
    level: "Beginner", price: 49.99, original_price: 129.99,
    rating: 4.8, rating_count: 12480, student_count: 58210,
    duration_hours: 32, lecture_count: 186, bestseller: true,
    tags: ["JavaScript", "React", "TypeScript"],
    what_you_will_learn: ["Write idiomatic modern JavaScript without relying on guesswork", "Reason about async code: promises, async/await, and event loops", "Build component-based UIs with React", "Add type safety to a real app using TypeScript", "Ship three portfolio-ready projects"],
    requirements: ["Basic HTML & CSS", "A computer with Node.js installed", "No prior JS experience required"],
    curriculum: [{ id: "sec-0", title: "JavaScript Foundations", lessons: [{ id: "les-0-0", title: "JavaScript Foundations \u2014 Part 1", duration_minutes: 6, is_preview: true }, { id: "les-0-1", title: "JavaScript Foundations \u2014 Part 2", duration_minutes: 9, is_preview: false }, { id: "les-0-2", title: "JavaScript Foundations \u2014 Part 3", duration_minutes: 12, is_preview: false }] }, { id: "sec-1", title: "Asynchronous Patterns", lessons: [{ id: "les-1-0", title: "Asynchronous Patterns \u2014 Part 1", duration_minutes: 9, is_preview: false }, { id: "les-1-1", title: "Asynchronous Patterns \u2014 Part 2", duration_minutes: 12, is_preview: false }, { id: "les-1-2", title: "Asynchronous Patterns \u2014 Part 3", duration_minutes: 15, is_preview: false }] }, { id: "sec-2", title: "The Module System & Tooling", lessons: [{ id: "les-2-0", title: "The Module System & Tooling \u2014 Part 1", duration_minutes: 12, is_preview: false }, { id: "les-2-1", title: "The Module System & Tooling \u2014 Part 2", duration_minutes: 15, is_preview: false }, { id: "les-2-2", title: "The Module System & Tooling \u2014 Part 3", duration_minutes: 18, is_preview: false }] }, { id: "sec-3", title: "React Fundamentals", lessons: [{ id: "les-3-0", title: "React Fundamentals \u2014 Part 1", duration_minutes: 15, is_preview: false }, { id: "les-3-1", title: "React Fundamentals \u2014 Part 2", duration_minutes: 18, is_preview: false }] }, { id: "sec-4", title: "Typing Your App with TypeScript", lessons: [{ id: "les-4-0", title: "Typing Your App with TypeScript \u2014 Part 1", duration_minutes: 18, is_preview: false }, { id: "les-4-1", title: "Typing Your App with TypeScript \u2014 Part 2", duration_minutes: 21, is_preview: false }, { id: "les-4-2", title: "Typing Your App with TypeScript \u2014 Part 3", duration_minutes: 24, is_preview: false }] }, { id: "sec-5", title: "Capstone Projects", lessons: [{ id: "les-5-0", title: "Capstone Projects \u2014 Part 1", duration_minutes: 21, is_preview: false }] }],
  },
  {
    id: "c-2", slug: "backend-systems-design",
    title: "Backend Systems Design: Building for Scale",
    subtitle: "APIs, queues, caching and databases that hold up under load",
    description: "Move beyond CRUD. Learn how production backends actually handle scale: caching layers, message queues, database indexing strategy, and the tradeoffs senior engineers weigh every day, told through real incident stories.",
    thumbnail_url: "dev-2", provider: "Udemy",
    instructor_id: "ins-6", category_id: "cat-dev",
    level: "Advanced", price: 64.99, original_price: 159.99,
    rating: 4.9, rating_count: 8120, student_count: 31900,
    duration_hours: 28, lecture_count: 142, bestseller: true,
    tags: ["System Design", "Databases", "APIs"],
    what_you_will_learn: ["Design APIs that scale gracefully under real traffic", "Choose the right caching layer for a given problem", "Use message queues to decouple services", "Index and shard databases without guessing"],
    requirements: ["Comfortable with at least one backend language", "Basic SQL knowledge"],
    curriculum: [{ id: "sec-0", title: "API Design Principles", lessons: [{ id: "les-0-0", title: "API Design Principles \u2014 Part 1", duration_minutes: 6, is_preview: true }, { id: "les-0-1", title: "API Design Principles \u2014 Part 2", duration_minutes: 9, is_preview: false }, { id: "les-0-2", title: "API Design Principles \u2014 Part 3", duration_minutes: 12, is_preview: false }] }, { id: "sec-1", title: "Caching Strategies", lessons: [{ id: "les-1-0", title: "Caching Strategies \u2014 Part 1", duration_minutes: 9, is_preview: false }, { id: "les-1-1", title: "Caching Strategies \u2014 Part 2", duration_minutes: 12, is_preview: false }, { id: "les-1-2", title: "Caching Strategies \u2014 Part 3", duration_minutes: 15, is_preview: false }] }, { id: "sec-2", title: "Message Queues & Eventing", lessons: [{ id: "les-2-0", title: "Message Queues & Eventing \u2014 Part 1", duration_minutes: 12, is_preview: false }, { id: "les-2-1", title: "Message Queues & Eventing \u2014 Part 2", duration_minutes: 15, is_preview: false }, { id: "les-2-2", title: "Message Queues & Eventing \u2014 Part 3", duration_minutes: 18, is_preview: false }] }, { id: "sec-3", title: "Database Indexing & Sharding", lessons: [{ id: "les-3-0", title: "Database Indexing & Sharding \u2014 Part 1", duration_minutes: 15, is_preview: false }, { id: "les-3-1", title: "Database Indexing & Sharding \u2014 Part 2", duration_minutes: 18, is_preview: false }] }, { id: "sec-4", title: "Observability & Incident Response", lessons: [{ id: "les-4-0", title: "Observability & Incident Response \u2014 Part 1", duration_minutes: 18, is_preview: false }, { id: "les-4-1", title: "Observability & Incident Response \u2014 Part 2", duration_minutes: 21, is_preview: false }, { id: "les-4-2", title: "Observability & Incident Response \u2014 Part 3", duration_minutes: 24, is_preview: false }] }],
  },
  {
    id: "c-3", slug: "uiux-design-foundations",
    title: "UI/UX Design Foundations: From Wireframe to Prototype",
    subtitle: "A complete, portfolio-first path into product design",
    description: "Learn the full design process \u2014 research, wireframing, visual systems, and interactive prototyping \u2014 by designing a real product end to end. Built for people switching careers into product design.",
    thumbnail_url: "design-1", provider: "Curio Original",
    instructor_id: "ins-2", category_id: "cat-design",
    level: "Beginner", price: 44.99, original_price: 99.99,
    rating: 4.9, rating_count: 9870, student_count: 41200,
    duration_hours: 24, lecture_count: 118, bestseller: true,
    tags: ["UX Research", "Figma", "Design Systems"],
    what_you_will_learn: ["Run lightweight user research that actually informs decisions", "Structure information so products feel obvious to use", "Build a cohesive visual design system", "Prototype interactions that feel real, not flat"],
    requirements: ["No design experience needed", "Figma (free plan is fine)"],
    curriculum: [{ id: "sec-0", title: "Design Process & Research", lessons: [{ id: "les-0-0", title: "Design Process & Research \u2014 Part 1", duration_minutes: 6, is_preview: true }, { id: "les-0-1", title: "Design Process & Research \u2014 Part 2", duration_minutes: 9, is_preview: false }, { id: "les-0-2", title: "Design Process & Research \u2014 Part 3", duration_minutes: 12, is_preview: false }] }, { id: "sec-1", title: "Wireframing & Information Architecture", lessons: [{ id: "les-1-0", title: "Wireframing & Information Architecture \u2014 Part 1", duration_minutes: 9, is_preview: false }, { id: "les-1-1", title: "Wireframing & Information Architecture \u2014 Part 2", duration_minutes: 12, is_preview: false }, { id: "les-1-2", title: "Wireframing & Information Architecture \u2014 Part 3", duration_minutes: 15, is_preview: false }] }, { id: "sec-2", title: "Visual Design Systems", lessons: [{ id: "les-2-0", title: "Visual Design Systems \u2014 Part 1", duration_minutes: 12, is_preview: false }, { id: "les-2-1", title: "Visual Design Systems \u2014 Part 2", duration_minutes: 15, is_preview: false }, { id: "les-2-2", title: "Visual Design Systems \u2014 Part 3", duration_minutes: 18, is_preview: false }] }, { id: "sec-3", title: "Prototyping & Micro-interactions", lessons: [{ id: "les-3-0", title: "Prototyping & Micro-interactions \u2014 Part 1", duration_minutes: 15, is_preview: false }, { id: "les-3-1", title: "Prototyping & Micro-interactions \u2014 Part 2", duration_minutes: 18, is_preview: false }] }, { id: "sec-4", title: "Building Your Portfolio Case Study", lessons: [{ id: "les-4-0", title: "Building Your Portfolio Case Study \u2014 Part 1", duration_minutes: 18, is_preview: false }, { id: "les-4-1", title: "Building Your Portfolio Case Study \u2014 Part 2", duration_minutes: 21, is_preview: false }, { id: "les-4-2", title: "Building Your Portfolio Case Study \u2014 Part 3", duration_minutes: 24, is_preview: false }] }],
  },
  {
    id: "c-4", slug: "brand-identity-design",
    title: "Brand Identity Design: Logos, Systems & Guidelines",
    subtitle: "Design cohesive brand identities clients actually approve",
    description: "A studio-style walkthrough of the brand identity process: discovery, logo exploration, color and type systems, and packaging it all into a guideline document clients can hand to any vendor.",
    thumbnail_url: "design-2", provider: "Independent Tutor",
    instructor_id: "ins-2", category_id: "cat-design",
    level: "Intermediate", price: 39.99, original_price: null,
    rating: 4.7, rating_count: 3210, student_count: 14880,
    duration_hours: 16, lecture_count: 74, is_new: true,
    tags: ["Branding", "Logo Design", "Style Guides"],
    what_you_will_learn: ["Run a brand discovery session with a client", "Explore and narrow logo concepts methodically", "Build a complete color and type system", "Package an identity into a professional guideline"],
    requirements: ["Basic familiarity with a design tool (Figma, Illustrator, or similar)"],
    curriculum: [{ id: "sec-0", title: "Brand Discovery & Strategy", lessons: [{ id: "les-0-0", title: "Brand Discovery & Strategy \u2014 Part 1", duration_minutes: 6, is_preview: true }, { id: "les-0-1", title: "Brand Discovery & Strategy \u2014 Part 2", duration_minutes: 9, is_preview: false }, { id: "les-0-2", title: "Brand Discovery & Strategy \u2014 Part 3", duration_minutes: 12, is_preview: false }] }, { id: "sec-1", title: "Logo Exploration & Mark-Making", lessons: [{ id: "les-1-0", title: "Logo Exploration & Mark-Making \u2014 Part 1", duration_minutes: 9, is_preview: false }, { id: "les-1-1", title: "Logo Exploration & Mark-Making \u2014 Part 2", duration_minutes: 12, is_preview: false }, { id: "les-1-2", title: "Logo Exploration & Mark-Making \u2014 Part 3", duration_minutes: 15, is_preview: false }] }, { id: "sec-2", title: "Color & Typography Systems", lessons: [{ id: "les-2-0", title: "Color & Typography Systems \u2014 Part 1", duration_minutes: 12, is_preview: false }, { id: "les-2-1", title: "Color & Typography Systems \u2014 Part 2", duration_minutes: 15, is_preview: false }, { id: "les-2-2", title: "Color & Typography Systems \u2014 Part 3", duration_minutes: 18, is_preview: false }] }, { id: "sec-3", title: "Assembling the Brand Guideline", lessons: [{ id: "les-3-0", title: "Assembling the Brand Guideline \u2014 Part 1", duration_minutes: 15, is_preview: false }, { id: "les-3-1", title: "Assembling the Brand Guideline \u2014 Part 2", duration_minutes: 18, is_preview: false }] }],
  },
  {
    id: "c-5", slug: "python-data-science-bootcamp",
    title: "Python for Data Science: The Practical Bootcamp",
    subtitle: "Pandas, visualization and real-world analysis projects",
    description: "Skip the theory-heavy intros. This bootcamp gets you cleaning, analyzing and visualizing real datasets in your first week, building toward a complete analysis project you can show employers.",
    thumbnail_url: "data-1", provider: "Independent Tutor",
    instructor_id: "ins-3", category_id: "cat-data",
    level: "Beginner", price: 54.99, original_price: 119.99,
    rating: 4.7, rating_count: 15600, student_count: 72340,
    duration_hours: 30, lecture_count: 160, bestseller: true,
    tags: ["Python", "Pandas", "Data Visualization"],
    what_you_will_learn: ["Clean and reshape messy real-world data", "Explore datasets to find the story inside them", "Build clear, honest visualizations", "Present an end-to-end analysis project"],
    requirements: ["No prior Python experience required"],
    curriculum: [{ id: "sec-0", title: "Python Refresher for Data Work", lessons: [{ id: "les-0-0", title: "Python Refresher for Data Work \u2014 Part 1", duration_minutes: 6, is_preview: true }, { id: "les-0-1", title: "Python Refresher for Data Work \u2014 Part 2", duration_minutes: 9, is_preview: false }, { id: "les-0-2", title: "Python Refresher for Data Work \u2014 Part 3", duration_minutes: 12, is_preview: false }] }, { id: "sec-1", title: "Data Cleaning with Pandas", lessons: [{ id: "les-1-0", title: "Data Cleaning with Pandas \u2014 Part 1", duration_minutes: 9, is_preview: false }, { id: "les-1-1", title: "Data Cleaning with Pandas \u2014 Part 2", duration_minutes: 12, is_preview: false }, { id: "les-1-2", title: "Data Cleaning with Pandas \u2014 Part 3", duration_minutes: 15, is_preview: false }] }, { id: "sec-2", title: "Exploratory Data Analysis", lessons: [{ id: "les-2-0", title: "Exploratory Data Analysis \u2014 Part 1", duration_minutes: 12, is_preview: false }, { id: "les-2-1", title: "Exploratory Data Analysis \u2014 Part 2", duration_minutes: 15, is_preview: false }, { id: "les-2-2", title: "Exploratory Data Analysis \u2014 Part 3", duration_minutes: 18, is_preview: false }] }, { id: "sec-3", title: "Visualization with Matplotlib & Seaborn", lessons: [{ id: "les-3-0", title: "Visualization with Matplotlib & Seaborn \u2014 Part 1", duration_minutes: 15, is_preview: false }, { id: "les-3-1", title: "Visualization with Matplotlib & Seaborn \u2014 Part 2", duration_minutes: 18, is_preview: false }] }, { id: "sec-4", title: "Capstone: End-to-End Analysis", lessons: [{ id: "les-4-0", title: "Capstone: End-to-End Analysis \u2014 Part 1", duration_minutes: 18, is_preview: false }, { id: "les-4-1", title: "Capstone: End-to-End Analysis \u2014 Part 2", duration_minutes: 21, is_preview: false }, { id: "les-4-2", title: "Capstone: End-to-End Analysis \u2014 Part 3", duration_minutes: 24, is_preview: false }] }],
  },
  {
    id: "c-6", slug: "machine-learning-foundations",
    title: "Machine Learning Foundations: Models That Actually Work",
    subtitle: "From linear regression to gradient boosting, with intuition first",
    description: "A model-by-model tour of machine learning built around intuition before math. Each model is taught through a real dataset, with an honest look at when it works, when it fails, and why.",
    thumbnail_url: "data-2", provider: "Coursera Partner",
    instructor_id: "ins-3", category_id: "cat-data",
    level: "Intermediate", price: 69.99, original_price: 149.99,
    rating: 4.8, rating_count: 6790, student_count: 25430,
    duration_hours: 38, lecture_count: 174,
    tags: ["Machine Learning", "scikit-learn", "Statistics"],
    what_you_will_learn: ["Build intuition for how core ML models actually work", "Choose the right model for a given dataset", "Evaluate models without fooling yourself", "Avoid the most common beginner mistakes in ML projects"],
    requirements: ["Comfortable with Python", "High-school level algebra"],
    curriculum: [{ id: "sec-0", title: "Intuition Before Math", lessons: [{ id: "les-0-0", title: "Intuition Before Math \u2014 Part 1", duration_minutes: 6, is_preview: true }, { id: "les-0-1", title: "Intuition Before Math \u2014 Part 2", duration_minutes: 9, is_preview: false }, { id: "les-0-2", title: "Intuition Before Math \u2014 Part 3", duration_minutes: 12, is_preview: false }] }, { id: "sec-1", title: "Regression Models", lessons: [{ id: "les-1-0", title: "Regression Models \u2014 Part 1", duration_minutes: 9, is_preview: false }, { id: "les-1-1", title: "Regression Models \u2014 Part 2", duration_minutes: 12, is_preview: false }, { id: "les-1-2", title: "Regression Models \u2014 Part 3", duration_minutes: 15, is_preview: false }] }, { id: "sec-2", title: "Classification Models", lessons: [{ id: "les-2-0", title: "Classification Models \u2014 Part 1", duration_minutes: 12, is_preview: false }, { id: "les-2-1", title: "Classification Models \u2014 Part 2", duration_minutes: 15, is_preview: false }, { id: "les-2-2", title: "Classification Models \u2014 Part 3", duration_minutes: 18, is_preview: false }] }, { id: "sec-3", title: "Tree-Based Methods & Boosting", lessons: [{ id: "les-3-0", title: "Tree-Based Methods & Boosting \u2014 Part 1", duration_minutes: 15, is_preview: false }, { id: "les-3-1", title: "Tree-Based Methods & Boosting \u2014 Part 2", duration_minutes: 18, is_preview: false }] }, { id: "sec-4", title: "Model Evaluation You Can Trust", lessons: [{ id: "les-4-0", title: "Model Evaluation You Can Trust \u2014 Part 1", duration_minutes: 18, is_preview: false }, { id: "les-4-1", title: "Model Evaluation You Can Trust \u2014 Part 2", duration_minutes: 21, is_preview: false }, { id: "les-4-2", title: "Model Evaluation You Can Trust \u2014 Part 3", duration_minutes: 24, is_preview: false }] }],
  },
  {
    id: "c-7", slug: "growth-marketing-playbook",
    title: "The Growth Marketing Playbook",
    subtitle: "Channels, experiments and funnels that compound",
    description: "A no-fluff walkthrough of how startups actually grow: choosing channels, running experiments that produce real signal, and building funnels that compound instead of leaking.",
    thumbnail_url: "marketing-1", provider: "Curio Original",
    instructor_id: "ins-4", category_id: "cat-marketing",
    level: "Intermediate", price: 49.99, original_price: null,
    rating: 4.6, rating_count: 4310, student_count: 19870,
    duration_hours: 18, lecture_count: 92,
    tags: ["Growth", "Funnels", "A/B Testing"],
    what_you_will_learn: ["Pick growth channels based on evidence, not trends", "Design experiments that actually produce a signal", "Build a funnel that compounds over time", "Diagnose where a funnel is leaking"],
    requirements: ["Some familiarity with a startup or small business context is helpful"],
    curriculum: [{ id: "sec-0", title: "Choosing Your First Channels", lessons: [{ id: "les-0-0", title: "Choosing Your First Channels \u2014 Part 1", duration_minutes: 6, is_preview: true }, { id: "les-0-1", title: "Choosing Your First Channels \u2014 Part 2", duration_minutes: 9, is_preview: false }, { id: "les-0-2", title: "Choosing Your First Channels \u2014 Part 3", duration_minutes: 12, is_preview: false }] }, { id: "sec-1", title: "Designing Real Experiments", lessons: [{ id: "les-1-0", title: "Designing Real Experiments \u2014 Part 1", duration_minutes: 9, is_preview: false }, { id: "les-1-1", title: "Designing Real Experiments \u2014 Part 2", duration_minutes: 12, is_preview: false }, { id: "les-1-2", title: "Designing Real Experiments \u2014 Part 3", duration_minutes: 15, is_preview: false }] }, { id: "sec-2", title: "Funnel Architecture", lessons: [{ id: "les-2-0", title: "Funnel Architecture \u2014 Part 1", duration_minutes: 12, is_preview: false }, { id: "les-2-1", title: "Funnel Architecture \u2014 Part 2", duration_minutes: 15, is_preview: false }, { id: "les-2-2", title: "Funnel Architecture \u2014 Part 3", duration_minutes: 18, is_preview: false }] }, { id: "sec-3", title: "Retention & Compounding Growth", lessons: [{ id: "les-3-0", title: "Retention & Compounding Growth \u2014 Part 1", duration_minutes: 15, is_preview: false }, { id: "les-3-1", title: "Retention & Compounding Growth \u2014 Part 2", duration_minutes: 18, is_preview: false }] }],
  },
  {
    id: "c-8", slug: "seo-content-strategy",
    title: "SEO & Content Strategy That Actually Ranks",
    subtitle: "Research, structure and write content built to be found",
    description: "Learn the research and structural work behind content that ranks: keyword clustering, search intent, on-page structure, and a sustainable content calendar that doesn't burn you out.",
    thumbnail_url: "marketing-2", provider: "Independent Tutor",
    instructor_id: "ins-4", category_id: "cat-marketing",
    level: "Beginner", price: 34.99, original_price: 79.99,
    rating: 4.5, rating_count: 2980, student_count: 13210,
    duration_hours: 12, lecture_count: 58,
    tags: ["SEO", "Content Writing", "Keyword Research"],
    what_you_will_learn: ["Cluster keywords around real search intent", "Structure pages that both readers and search engines understand", "Plan a content calendar you can sustain"],
    requirements: ["A website or blog you're actively writing for is helpful but not required"],
    curriculum: [{ id: "sec-0", title: "Understanding Search Intent", lessons: [{ id: "les-0-0", title: "Understanding Search Intent \u2014 Part 1", duration_minutes: 6, is_preview: true }, { id: "les-0-1", title: "Understanding Search Intent \u2014 Part 2", duration_minutes: 9, is_preview: false }, { id: "les-0-2", title: "Understanding Search Intent \u2014 Part 3", duration_minutes: 12, is_preview: false }] }, { id: "sec-1", title: "Keyword Research & Clustering", lessons: [{ id: "les-1-0", title: "Keyword Research & Clustering \u2014 Part 1", duration_minutes: 9, is_preview: false }, { id: "les-1-1", title: "Keyword Research & Clustering \u2014 Part 2", duration_minutes: 12, is_preview: false }, { id: "les-1-2", title: "Keyword Research & Clustering \u2014 Part 3", duration_minutes: 15, is_preview: false }] }, { id: "sec-2", title: "On-Page Structure That Ranks", lessons: [{ id: "les-2-0", title: "On-Page Structure That Ranks \u2014 Part 1", duration_minutes: 12, is_preview: false }, { id: "les-2-1", title: "On-Page Structure That Ranks \u2014 Part 2", duration_minutes: 15, is_preview: false }, { id: "les-2-2", title: "On-Page Structure That Ranks \u2014 Part 3", duration_minutes: 18, is_preview: false }] }, { id: "sec-3", title: "Building a Sustainable Content Calendar", lessons: [{ id: "les-3-0", title: "Building a Sustainable Content Calendar \u2014 Part 1", duration_minutes: 15, is_preview: false }, { id: "les-3-1", title: "Building a Sustainable Content Calendar \u2014 Part 2", duration_minutes: 18, is_preview: false }] }],
  },
  {
    id: "c-9", slug: "startup-finance-fundamentals",
    title: "Startup Finance Fundamentals",
    subtitle: "Model your runway, raise smart, and read a cap table",
    description: "Everything a non-finance founder needs: building a simple financial model, understanding runway and burn, reading a cap table, and knowing what investors are actually evaluating.",
    thumbnail_url: "business-1", provider: "Curio Original",
    instructor_id: "ins-7", category_id: "cat-business",
    level: "Beginner", price: 59.99, original_price: null,
    rating: 4.8, rating_count: 3650, student_count: 16700,
    duration_hours: 14, lecture_count: 64, is_new: true,
    tags: ["Finance", "Fundraising", "Startups"],
    what_you_will_learn: ["Build a simple, honest financial model", "Track runway and burn without a finance background", "Read and understand a cap table", "Prepare for early investor conversations"],
    requirements: ["No finance background required"],
    curriculum: [{ id: "sec-0", title: "Building Your First Financial Model", lessons: [{ id: "les-0-0", title: "Building Your First Financial Model \u2014 Part 1", duration_minutes: 6, is_preview: true }, { id: "les-0-1", title: "Building Your First Financial Model \u2014 Part 2", duration_minutes: 9, is_preview: false }, { id: "les-0-2", title: "Building Your First Financial Model \u2014 Part 3", duration_minutes: 12, is_preview: false }] }, { id: "sec-1", title: "Runway & Burn Rate", lessons: [{ id: "les-1-0", title: "Runway & Burn Rate \u2014 Part 1", duration_minutes: 9, is_preview: false }, { id: "les-1-1", title: "Runway & Burn Rate \u2014 Part 2", duration_minutes: 12, is_preview: false }, { id: "les-1-2", title: "Runway & Burn Rate \u2014 Part 3", duration_minutes: 15, is_preview: false }] }, { id: "sec-2", title: "Reading a Cap Table", lessons: [{ id: "les-2-0", title: "Reading a Cap Table \u2014 Part 1", duration_minutes: 12, is_preview: false }, { id: "les-2-1", title: "Reading a Cap Table \u2014 Part 2", duration_minutes: 15, is_preview: false }, { id: "les-2-2", title: "Reading a Cap Table \u2014 Part 3", duration_minutes: 18, is_preview: false }] }, { id: "sec-3", title: "What Investors Actually Look At", lessons: [{ id: "les-3-0", title: "What Investors Actually Look At \u2014 Part 1", duration_minutes: 15, is_preview: false }, { id: "les-3-1", title: "What Investors Actually Look At \u2014 Part 2", duration_minutes: 18, is_preview: false }] }],
  },
  {
    id: "c-10", slug: "executive-communication",
    title: "Executive Communication & Decision-Making",
    subtitle: "Lead meetings, give feedback, and decide under uncertainty",
    description: "A practical course for new and aspiring leaders on the communication and decision habits that separate effective managers from everyone else, drawn from over a decade of executive coaching.",
    thumbnail_url: "growth-1", provider: "Independent Tutor",
    instructor_id: "ins-7", category_id: "cat-growth",
    level: "All Levels", price: 44.99, original_price: 89.99,
    rating: 4.9, rating_count: 5120, student_count: 21900,
    duration_hours: 10, lecture_count: 48, bestseller: true,
    tags: ["Leadership", "Communication", "Management"],
    what_you_will_learn: ["Run meetings that produce decisions, not just discussion", "Give feedback that people can actually act on", "Make sound decisions without complete information", "Build trust quickly as a new manager"],
    requirements: ["Useful for anyone managing people or projects"],
    curriculum: [{ id: "sec-0", title: "Running Meetings People Want to Attend", lessons: [{ id: "les-0-0", title: "Running Meetings People Want to Attend \u2014 Part 1", duration_minutes: 6, is_preview: true }, { id: "les-0-1", title: "Running Meetings People Want to Attend \u2014 Part 2", duration_minutes: 9, is_preview: false }, { id: "les-0-2", title: "Running Meetings People Want to Attend \u2014 Part 3", duration_minutes: 12, is_preview: false }] }, { id: "sec-1", title: "Giving Feedback That Lands", lessons: [{ id: "les-1-0", title: "Giving Feedback That Lands \u2014 Part 1", duration_minutes: 9, is_preview: false }, { id: "les-1-1", title: "Giving Feedback That Lands \u2014 Part 2", duration_minutes: 12, is_preview: false }, { id: "les-1-2", title: "Giving Feedback That Lands \u2014 Part 3", duration_minutes: 15, is_preview: false }] }, { id: "sec-2", title: "Deciding Under Uncertainty", lessons: [{ id: "les-2-0", title: "Deciding Under Uncertainty \u2014 Part 1", duration_minutes: 12, is_preview: false }, { id: "les-2-1", title: "Deciding Under Uncertainty \u2014 Part 2", duration_minutes: 15, is_preview: false }, { id: "les-2-2", title: "Deciding Under Uncertainty \u2014 Part 3", duration_minutes: 18, is_preview: false }] }, { id: "sec-3", title: "Building Trust as a New Manager", lessons: [{ id: "les-3-0", title: "Building Trust as a New Manager \u2014 Part 1", duration_minutes: 15, is_preview: false }, { id: "les-3-1", title: "Building Trust as a New Manager \u2014 Part 2", duration_minutes: 18, is_preview: false }] }],
  },
  {
    id: "c-11", slug: "travel-photography-masterclass",
    title: "Travel & Editorial Photography Masterclass",
    subtitle: "Composition, light and a professional editing workflow",
    description: "Learn to see and shoot like a working travel photographer: composition under pressure, working with available light, and a complete editing workflow from RAW file to final image.",
    thumbnail_url: "photo-1", provider: "Independent Tutor",
    instructor_id: "ins-5", category_id: "cat-photo",
    level: "Intermediate", price: 42.99, original_price: null,
    rating: 4.9, rating_count: 2870, student_count: 11430,
    duration_hours: 15, lecture_count: 70,
    tags: ["Photography", "Lightroom", "Composition"],
    what_you_will_learn: ["Compose strong images quickly, even in unfamiliar locations", "Work confidently with available light", "Tell a story across a series of images", "Edit RAW files into a consistent, professional look"],
    requirements: ["A camera with manual controls (mirrorless, DSLR, or capable mobile)"],
    curriculum: [{ id: "sec-0", title: "Composition Under Pressure", lessons: [{ id: "les-0-0", title: "Composition Under Pressure \u2014 Part 1", duration_minutes: 6, is_preview: true }, { id: "les-0-1", title: "Composition Under Pressure \u2014 Part 2", duration_minutes: 9, is_preview: false }, { id: "les-0-2", title: "Composition Under Pressure \u2014 Part 3", duration_minutes: 12, is_preview: false }] }, { id: "sec-1", title: "Working With Available Light", lessons: [{ id: "les-1-0", title: "Working With Available Light \u2014 Part 1", duration_minutes: 9, is_preview: false }, { id: "les-1-1", title: "Working With Available Light \u2014 Part 2", duration_minutes: 12, is_preview: false }, { id: "les-1-2", title: "Working With Available Light \u2014 Part 3", duration_minutes: 15, is_preview: false }] }, { id: "sec-2", title: "Storytelling Through a Photo Series", lessons: [{ id: "les-2-0", title: "Storytelling Through a Photo Series \u2014 Part 1", duration_minutes: 12, is_preview: false }, { id: "les-2-1", title: "Storytelling Through a Photo Series \u2014 Part 2", duration_minutes: 15, is_preview: false }, { id: "les-2-2", title: "Storytelling Through a Photo Series \u2014 Part 3", duration_minutes: 18, is_preview: false }] }, { id: "sec-3", title: "A Complete Editing Workflow", lessons: [{ id: "les-3-0", title: "A Complete Editing Workflow \u2014 Part 1", duration_minutes: 15, is_preview: false }, { id: "les-3-1", title: "A Complete Editing Workflow \u2014 Part 2", duration_minutes: 18, is_preview: false }] }],
  },
  {
    id: "c-12", slug: "portrait-lighting-studio",
    title: "Portrait Lighting: Studio & On-Location",
    subtitle: "Shape light with confidence, in the studio or on the go",
    description: "A focused course on portrait lighting: classic studio setups, modifying light with simple gear, and adapting your lighting kit for on-location shoots.",
    thumbnail_url: "photo-2", provider: "Udemy",
    instructor_id: "ins-5", category_id: "cat-photo",
    level: "Beginner", price: 0, original_price: null,
    rating: 4.6, rating_count: 1920, student_count: 24800,
    duration_hours: 6, lecture_count: 28,
    tags: ["Lighting", "Portraits", "Studio"],
    what_you_will_learn: ["Set up three classic studio lighting patterns", "Modify light with reflectors and diffusers", "Adapt a lighting kit for on-location shoots"],
    requirements: ["Any camera with manual flash or strobe control"],
    curriculum: [{ id: "sec-0", title: "Classic Lighting Setups", lessons: [{ id: "les-0-0", title: "Classic Lighting Setups \u2014 Part 1", duration_minutes: 6, is_preview: true }, { id: "les-0-1", title: "Classic Lighting Setups \u2014 Part 2", duration_minutes: 9, is_preview: false }, { id: "les-0-2", title: "Classic Lighting Setups \u2014 Part 3", duration_minutes: 12, is_preview: false }] }, { id: "sec-1", title: "Modifying Light", lessons: [{ id: "les-1-0", title: "Modifying Light \u2014 Part 1", duration_minutes: 9, is_preview: false }, { id: "les-1-1", title: "Modifying Light \u2014 Part 2", duration_minutes: 12, is_preview: false }, { id: "les-1-2", title: "Modifying Light \u2014 Part 3", duration_minutes: 15, is_preview: false }] }, { id: "sec-2", title: "On-Location Adaptations", lessons: [{ id: "les-2-0", title: "On-Location Adaptations \u2014 Part 1", duration_minutes: 12, is_preview: false }, { id: "les-2-1", title: "On-Location Adaptations \u2014 Part 2", duration_minutes: 15, is_preview: false }, { id: "les-2-2", title: "On-Location Adaptations \u2014 Part 3", duration_minutes: 18, is_preview: false }] }],
  },
  {
    id: "c-13", slug: "music-production-home-studio",
    title: "Music Production From a Home Studio",
    subtitle: "Write, record, mix and master on a real-world budget",
    description: "A complete, budget-aware path through home music production: writing and arranging, recording clean takes, mixing with intent, and mastering a release-ready track.",
    thumbnail_url: "music-1", provider: "Independent Tutor",
    instructor_id: "ins-8", category_id: "cat-music",
    level: "Beginner", price: 39.99, original_price: 89.99,
    rating: 4.7, rating_count: 2140, student_count: 9870,
    duration_hours: 20, lecture_count: 88,
    tags: ["Music Production", "Mixing", "Mastering"],
    what_you_will_learn: ["Write and arrange a track from a blank session", "Record clean takes with budget gear", "Mix with intention instead of presets", "Master a track to release-ready loudness"],
    requirements: ["A DAW (any \u2014 Ableton, FL Studio, Logic, Reaper)"],
    curriculum: [{ id: "sec-0", title: "Writing & Arranging", lessons: [{ id: "les-0-0", title: "Writing & Arranging \u2014 Part 1", duration_minutes: 6, is_preview: true }, { id: "les-0-1", title: "Writing & Arranging \u2014 Part 2", duration_minutes: 9, is_preview: false }, { id: "les-0-2", title: "Writing & Arranging \u2014 Part 3", duration_minutes: 12, is_preview: false }] }, { id: "sec-1", title: "Recording Clean Takes", lessons: [{ id: "les-1-0", title: "Recording Clean Takes \u2014 Part 1", duration_minutes: 9, is_preview: false }, { id: "les-1-1", title: "Recording Clean Takes \u2014 Part 2", duration_minutes: 12, is_preview: false }, { id: "les-1-2", title: "Recording Clean Takes \u2014 Part 3", duration_minutes: 15, is_preview: false }] }, { id: "sec-2", title: "Mixing With Intent", lessons: [{ id: "les-2-0", title: "Mixing With Intent \u2014 Part 1", duration_minutes: 12, is_preview: false }, { id: "les-2-1", title: "Mixing With Intent \u2014 Part 2", duration_minutes: 15, is_preview: false }, { id: "les-2-2", title: "Mixing With Intent \u2014 Part 3", duration_minutes: 18, is_preview: false }] }, { id: "sec-3", title: "Mastering a Release-Ready Track", lessons: [{ id: "les-3-0", title: "Mastering a Release-Ready Track \u2014 Part 1", duration_minutes: 15, is_preview: false }, { id: "les-3-1", title: "Mastering a Release-Ready Track \u2014 Part 2", duration_minutes: 18, is_preview: false }] }],
  },
  {
    id: "c-14", slug: "mindful-focus-deep-work",
    title: "Mindful Focus: A System for Deep Work",
    subtitle: "Build attention back, one deliberate habit at a time",
    description: "A practical system for reclaiming focus in a distraction-saturated world, combining attention-training exercises with the scheduling habits that protect deep work.",
    thumbnail_url: "growth-2", provider: "Curio Original",
    instructor_id: "ins-7", category_id: "cat-growth",
    level: "All Levels", price: 29.99, original_price: null,
    rating: 4.7, rating_count: 4490, student_count: 27600,
    duration_hours: 7, lecture_count: 34,
    tags: ["Focus", "Habits", "Productivity"],
    what_you_will_learn: ["Understand why attention erodes and how to rebuild it", "Train focus with short, deliberate exercises", "Protect deep work blocks on a real calendar"],
    requirements: ["None"],
    curriculum: [{ id: "sec-0", title: "Understanding Attention", lessons: [{ id: "les-0-0", title: "Understanding Attention \u2014 Part 1", duration_minutes: 6, is_preview: true }, { id: "les-0-1", title: "Understanding Attention \u2014 Part 2", duration_minutes: 9, is_preview: false }, { id: "les-0-2", title: "Understanding Attention \u2014 Part 3", duration_minutes: 12, is_preview: false }] }, { id: "sec-1", title: "Training Focus Deliberately", lessons: [{ id: "les-1-0", title: "Training Focus Deliberately \u2014 Part 1", duration_minutes: 9, is_preview: false }, { id: "les-1-1", title: "Training Focus Deliberately \u2014 Part 2", duration_minutes: 12, is_preview: false }, { id: "les-1-2", title: "Training Focus Deliberately \u2014 Part 3", duration_minutes: 15, is_preview: false }] }, { id: "sec-2", title: "Protecting Deep Work", lessons: [{ id: "les-2-0", title: "Protecting Deep Work \u2014 Part 1", duration_minutes: 12, is_preview: false }, { id: "les-2-1", title: "Protecting Deep Work \u2014 Part 2", duration_minutes: 15, is_preview: false }, { id: "les-2-2", title: "Protecting Deep Work \u2014 Part 3", duration_minutes: 18, is_preview: false }] }],
  },
  {
    id: "c-15", slug: "advanced-css-design-systems",
    title: "Advanced CSS & Design Systems",
    subtitle: "Container queries, design tokens, and scalable component CSS",
    description: "Go beyond layout basics into the CSS that powers real design systems: tokens, container queries, logical properties, and patterns for component CSS that scales across a large product.",
    thumbnail_url: "dev-3", provider: "Udemy",
    instructor_id: "ins-1", category_id: "cat-dev",
    level: "Advanced", price: 39.99, original_price: 94.99,
    rating: 4.8, rating_count: 3870, student_count: 18650,
    duration_hours: 16, lecture_count: 76, is_new: true,
    tags: ["CSS", "Design Systems", "Frontend Architecture"],
    what_you_will_learn: ["Build a token-based styling system", "Use container queries for component-level responsiveness", "Write CSS that adapts cleanly across languages and scripts", "Scale component CSS across a large codebase"],
    requirements: ["Solid working knowledge of CSS"],
    curriculum: [{ id: "sec-0", title: "Design Tokens in Practice", lessons: [{ id: "les-0-0", title: "Design Tokens in Practice \u2014 Part 1", duration_minutes: 6, is_preview: true }, { id: "les-0-1", title: "Design Tokens in Practice \u2014 Part 2", duration_minutes: 9, is_preview: false }, { id: "les-0-2", title: "Design Tokens in Practice \u2014 Part 3", duration_minutes: 12, is_preview: false }] }, { id: "sec-1", title: "Container Queries & Modern Layout", lessons: [{ id: "les-1-0", title: "Container Queries & Modern Layout \u2014 Part 1", duration_minutes: 9, is_preview: false }, { id: "les-1-1", title: "Container Queries & Modern Layout \u2014 Part 2", duration_minutes: 12, is_preview: false }, { id: "les-1-2", title: "Container Queries & Modern Layout \u2014 Part 3", duration_minutes: 15, is_preview: false }] }, { id: "sec-2", title: "Logical Properties & Internationalization", lessons: [{ id: "les-2-0", title: "Logical Properties & Internationalization \u2014 Part 1", duration_minutes: 12, is_preview: false }, { id: "les-2-1", title: "Logical Properties & Internationalization \u2014 Part 2", duration_minutes: 15, is_preview: false }, { id: "les-2-2", title: "Logical Properties & Internationalization \u2014 Part 3", duration_minutes: 18, is_preview: false }] }, { id: "sec-3", title: "Scaling Component CSS", lessons: [{ id: "les-3-0", title: "Scaling Component CSS \u2014 Part 1", duration_minutes: 15, is_preview: false }, { id: "les-3-1", title: "Scaling Component CSS \u2014 Part 2", duration_minutes: 18, is_preview: false }] }],
  },
  {
    id: "c-16", slug: "figma-to-production-handoff",
    title: "Figma to Production: The Developer Handoff",
    subtitle: "Specs, tokens and a workflow designers and engineers both trust",
    description: "A practical bridge between design and engineering: structuring Figma files for handoff, exporting tokens, and building a shared workflow that stops 'pixel-perfect' arguments before they start.",
    thumbnail_url: "design-3", provider: "Coursera Partner",
    instructor_id: "ins-2", category_id: "cat-design",
    level: "Intermediate", price: 32.99, original_price: null,
    rating: 4.6, rating_count: 1540, student_count: 8120,
    duration_hours: 9, lecture_count: 42,
    tags: ["Figma", "Design Ops", "Handoff"],
    what_you_will_learn: ["Structure Figma files engineers can actually use", "Export and maintain design tokens", "Run a handoff workflow without endless review cycles"],
    requirements: ["Basic Figma familiarity"],
    curriculum: [{ id: "sec-0", title: "Structuring Files for Handoff", lessons: [{ id: "les-0-0", title: "Structuring Files for Handoff \u2014 Part 1", duration_minutes: 6, is_preview: true }, { id: "les-0-1", title: "Structuring Files for Handoff \u2014 Part 2", duration_minutes: 9, is_preview: false }, { id: "les-0-2", title: "Structuring Files for Handoff \u2014 Part 3", duration_minutes: 12, is_preview: false }] }, { id: "sec-1", title: "Exporting Design Tokens", lessons: [{ id: "les-1-0", title: "Exporting Design Tokens \u2014 Part 1", duration_minutes: 9, is_preview: false }, { id: "les-1-1", title: "Exporting Design Tokens \u2014 Part 2", duration_minutes: 12, is_preview: false }, { id: "les-1-2", title: "Exporting Design Tokens \u2014 Part 3", duration_minutes: 15, is_preview: false }] }, { id: "sec-2", title: "A Shared Review Workflow", lessons: [{ id: "les-2-0", title: "A Shared Review Workflow \u2014 Part 1", duration_minutes: 12, is_preview: false }, { id: "les-2-1", title: "A Shared Review Workflow \u2014 Part 2", duration_minutes: 15, is_preview: false }, { id: "les-2-2", title: "A Shared Review Workflow \u2014 Part 3", duration_minutes: 18, is_preview: false }] }],
  },
];

function esc(val) {
  if (val === null || val === undefined) return "NULL";
  if (Array.isArray(val)) return "'{" + val.map(v => esc(v).replace(/^'(.*)'$/, '$1')).join(",") + "}'";
  if (typeof val === "object") return "'" + JSON.stringify(val).replace(/'/g, "''") + "'";
  if (typeof val === "boolean") return val ? "true" : "false";
  if (typeof val === "number") return String(val);
  return "'" + String(val).replace(/'/g, "''") + "'";
}

let sql = "-- Seed data for Curio\n-- Run this AFTER schema.sql in the Supabase SQL Editor\n\n";

// Categories
sql += "-- Categories\n";
sql += "INSERT INTO public.categories (id, name, slug, icon, course_count) VALUES\n";
const catRows = categories.map(c => `  (${esc(c.id)}, ${esc(c.name)}, ${esc(c.slug)}, ${esc(c.icon)}, ${c.count})`);
sql += catRows.join(",\n");
sql += "\nON CONFLICT (id) DO NOTHING;\n\n";

// Instructors
sql += "-- Instructors\n";
sql += "INSERT INTO public.instructors (id, name, headline, avatar_url, bio, rating, student_count, course_count) VALUES\n";
const insRows = instructors.map(i => `  (${esc(i.id)}, ${esc(i.name)}, ${esc(i.headline)}, ${esc(i.avatar_url)}, ${esc(i.bio)}, ${i.rating}, ${i.student_count}, ${i.course_count})`);
sql += insRows.join(",\n");
sql += "\nON CONFLICT (id) DO NOTHING;\n\n";

// Courses
sql += "-- Courses\n";
sql += "INSERT INTO public.courses (id, slug, title, subtitle, description, thumbnail_url, provider, instructor_id, category_id, level, price, original_price, rating, rating_count, student_count, duration_hours, lecture_count, bestseller, is_new, tags, what_you_will_learn, requirements, curriculum) VALUES\n";
const courseRows = courses.map(c => `  (${esc(c.id)}, ${esc(c.slug)}, ${esc(c.title)}, ${esc(c.subtitle)}, ${esc(c.description)}, ${esc(c.thumbnail_url)}, ${esc(c.provider)}, ${esc(c.instructor_id)}, ${esc(c.category_id)}, ${esc(c.level)}, ${c.price}, ${c.original_price ?? "NULL"}, ${c.rating}, ${c.rating_count}, ${c.student_count}, ${c.duration_hours}, ${c.lecture_count}, ${c.bestseller ?? false}, ${c.is_new ?? false}, ${esc(c.tags)}, ${esc(c.what_you_will_learn)}, ${esc(c.requirements)}, ${esc(c.curriculum)})`);
sql += courseRows.join(",\n");
sql += "\nON CONFLICT (id) DO NOTHING;\n\n";

writeFileSync("supabase/seed.sql", sql);
console.log("Generated supabase/seed.sql successfully!");
