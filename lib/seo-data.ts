export type Faq = { q: string; a: string };

export const FAQS: Faq[] = [
  {
    q: "What does ARBYNEX do?",
    a: "ARBYNEX is a full-service software and technology company. We design, build and scale digital products, custom software, AI solutions and business systems for startups, SMEs and established businesses worldwide.",
  },
  {
    q: "What technologies do you use?",
    a: "We use modern production-grade technologies: React, Next.js, TypeScript, Tailwind CSS for frontend; Node.js, NestJS, Python, Django for backend; PostgreSQL, MongoDB, Redis for databases; Docker, CI/CD and cloud infrastructure for deployment. We also integrate LLMs, AI agents and intelligent workflows.",
  },
  {
    q: "How long does a project take?",
    a: "Timelines depend on scope. Simple web apps and MVPs can go live in 1–3 weeks. Complex SaaS products, enterprise systems and multi-feature platforms typically take 4–12 weeks. We define a clear roadmap before development starts.",
  },
  {
    q: "How much does it cost?",
    a: "Project-based pricing starts from $500 for MVPs and simple applications. Complex SaaS products, enterprise systems and AI-powered platforms range from $2,000–$20,000+ depending on scope. Monthly dedicated development partnerships are also available. Every quote is fixed before we start.",
  },
  {
    q: "Do you work with startups?",
    a: "Yes. We help startups go from idea to MVP to production-ready product. Our product development engagement is designed specifically for startups and businesses building new SaaS products or digital platforms.",
  },
  {
    q: "What industries do you serve?",
    a: "We work across retail & wholesale, e-commerce, real estate, healthcare, education, professional services and startups. Our engineering approach is technology-agnostic — we build the right solution for your specific business requirements.",
  },
  {
    q: "Do you provide ongoing support?",
    a: "Yes. Every project includes post-launch support. We also offer monthly partnership plans for ongoing development, maintenance, monitoring and scaling. Our relationship doesn't end when the product launches.",
  },
];

export const SERVICES: { name: string; summary: string }[] = [
  {
    name: "Custom Software",
    summary:
      "Purpose-built business management systems, internal platforms, workflow systems, operations software and custom dashboards designed around exact business processes.",
  },
  {
    name: "Web Applications",
    summary:
      "Modern, responsive and scalable web applications — business web apps, customer portals, admin panels, SaaS platforms and API-driven applications.",
  },
  {
    name: "Mobile Applications",
    summary:
      "iOS and Android applications, cross-platform apps and mobile-integrated systems for customers, teams and business operations.",
  },
  {
    name: "SaaS Products",
    summary:
      "Complete subscription-based software products with multi-tenant architecture, authentication, subscription systems, billing, payments and analytics.",
  },
  {
    name: "E-commerce Platforms",
    summary:
      "Online stores, custom commerce platforms, payment integration, inventory systems and order management solutions.",
  },
  {
    name: "Enterprise Systems",
    summary:
      "CRM, ERP, POS, inventory management, reporting, analytics and business intelligence systems that connect critical business operations.",
  },
  {
    name: "AI Solutions",
    summary:
      "AI agents, chatbots, LLM applications, AI-powered workflows and intelligent automation integrated into practical business software.",
  },
  {
    name: "Cloud & DevOps",
    summary:
      "Cloud infrastructure setup, Docker containerization, CI/CD pipelines, monitoring, deployment automation and production operations.",
  },
];

export const BUILD_CATEGORIES = [
  {
    number: "01",
    title: "Custom Software",
    description: "Purpose-built software designed around your exact business processes.",
    capabilities: [
      "Business Management Systems",
      "Internal Platforms",
      "Workflow Systems",
      "Operations Software",
      "Custom Dashboards",
    ],
  },
  {
    number: "02",
    title: "Web Applications",
    description: "Modern, responsive and scalable web applications.",
    capabilities: [
      "Business Web Apps",
      "Customer Portals",
      "Admin Panels",
      "SaaS Platforms",
      "API-driven Applications",
    ],
  },
  {
    number: "03",
    title: "Mobile Applications",
    description: "Mobile experiences designed for customers, teams and business operations.",
    capabilities: [
      "iOS & Android Apps",
      "Cross-platform Apps",
      "Business Apps",
      "Customer Applications",
      "Mobile-integrated Systems",
    ],
  },
  {
    number: "04",
    title: "SaaS Products",
    description: "Turn an idea into a subscription-based software product.",
    capabilities: [
      "Multi-tenant Architecture",
      "Auth & Authorization",
      "Subscription Systems",
      "Billing & Payments",
      "Admin & Analytics",
    ],
  },
  {
    number: "05",
    title: "E-commerce",
    description: "Complete digital commerce experiences.",
    capabilities: [
      "Online Stores",
      "Custom Commerce",
      "Payment Integration",
      "Inventory Systems",
      "Order Management",
    ],
  },
  {
    number: "06",
    title: "Enterprise Systems",
    description: "Connect the critical parts of your business.",
    capabilities: [
      "CRM & ERP",
      "POS Systems",
      "Inventory Management",
      "Reporting & Analytics",
      "Business Intelligence",
    ],
  },
];

export const AI_SOLUTIONS = [
  {
    title: "AI Agents",
    description:
      "Intelligent agents capable of interacting with users, tools and business systems autonomously.",
  },
  {
    title: "AI Chatbots",
    description:
      "Customer support, internal assistants and conversational business experiences powered by modern LLMs.",
  },
  {
    title: "LLM Applications",
    description:
      "Custom applications built around large language models for specific business use cases.",
  },
  {
    title: "AI-Powered Workflows",
    description:
      "Use AI to classify, summarize, extract, generate and route information across business systems.",
  },
];

export const AUTOMATION_SOLUTIONS = [
  {
    title: "Lead Automation",
    description: "Capture, qualify and route leads automatically across all channels.",
  },
  {
    title: "Communication Automation",
    description: "Connect WhatsApp, email and messaging channels with business workflows.",
  },
  {
    title: "Workflow Automation",
    description: "Reduce repetitive manual tasks and connect disparate systems.",
  },
  {
    title: "Document Automation",
    description: "Generate, process and manage business documents automatically.",
  },
];

export const TECH_STACK = {
  frontend: {
    label: "Frontend",
    description: "Modern interfaces built for performance, usability and scalability.",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
  },
  backend: {
    label: "Backend",
    description: "Robust APIs, business logic and scalable backend architectures.",
    items: ["Node.js", "NestJS", "Python", "Django"],
  },
  databases: {
    label: "Databases",
    description: "Reliable data architectures selected according to project requirements.",
    items: ["PostgreSQL", "MongoDB", "Redis", "SQLite"],
  },
  aiData: {
    label: "AI & Data",
    description: "AI capabilities integrated into practical business applications.",
    items: ["LLMs", "AI Agents", "AI APIs", "Intelligent Workflows"],
  },
  cloud: {
    label: "Cloud & DevOps",
    description: "Infrastructure designed for reliable delivery and production operations.",
    items: ["Docker", "CI/CD", "Monitoring", "Cloud Infrastructure"],
  },
  integrations: {
    label: "Integrations",
    description: "Connect existing systems and build new digital workflows.",
    items: ["REST APIs", "Webhooks", "Payment Gateways", "CRM", "Messaging"],
  },
};

export const INDUSTRIES = [
  {
    title: "Retail & Wholesale",
    capabilities: "POS · Inventory · Billing · Customer Management · Reporting",
  },
  {
    title: "E-commerce",
    capabilities: "Online Stores · Payments · Orders · Inventory · CX",
  },
  {
    title: "Real Estate",
    capabilities: "Property Platforms · Lead Management · CRM · Portals",
  },
  {
    title: "Healthcare",
    capabilities: "Management Systems · Portals · Scheduling · Workflows",
  },
  {
    title: "Education",
    capabilities: "Learning Platforms · Student Systems · Admin · Portals",
  },
  {
    title: "Professional Services",
    capabilities: "CRM · Client Portals · Workflow · Billing · Reporting",
  },
  {
    title: "Startups",
    capabilities: "MVP Development · SaaS · Product Engineering · AI · Scaling",
  },
  {
    title: "Growing Businesses",
    capabilities: "Digital Transformation · Custom Systems · Automation · Cloud",
  },
];

export const PROCESS_STEPS = [
  {
    number: "01",
    title: "Discover",
    description: "We understand your business, users, goals, challenges and requirements.",
    output: "Clear requirements & project direction",
  },
  {
    number: "02",
    title: "Strategize",
    description: "We define the product scope, technology approach, architecture and roadmap.",
    output: "Technical strategy & development plan",
  },
  {
    number: "03",
    title: "Design",
    description: "We create the user experience and interface before development.",
    output: "UI/UX & product experience",
  },
  {
    number: "04",
    title: "Build",
    description: "Our engineering team develops the product in structured iterations.",
    output: "Working software",
  },
  {
    number: "05",
    title: "Test",
    description: "We validate functionality, performance, integrations and real-world workflows.",
    output: "Production-ready system",
  },
  {
    number: "06",
    title: "Deploy",
    description: "We configure the production environment and launch the system.",
    output: "Live product",
  },
  {
    number: "07",
    title: "Support & Scale",
    description: "We continue improving, maintaining and scaling as the business grows.",
    output: "Long-term technology partnership",
  },
];

export const WHY_ARBYNEX = [
  {
    title: "Business-First Thinking",
    description: "We focus on the business problem before selecting the technology.",
  },
  {
    title: "Custom-Built Solutions",
    description: "We don't force your business into generic software when a custom solution makes more sense.",
  },
  {
    title: "Modern Engineering",
    description: "We use modern frameworks, APIs, cloud infrastructure and development practices.",
  },
  {
    title: "One Technology Partner",
    description: "Frontend, backend, AI, integrations, deployment and support — your technology stays connected.",
  },
  {
    title: "Built to Scale",
    description: "Architecture is designed with future growth in mind from day one.",
  },
  {
    title: "Transparent Communication",
    description: "Clear requirements, milestones and communication throughout development.",
  },
];
