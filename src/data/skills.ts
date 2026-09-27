export type SkillCategoryKey = "all" | "ai" | "frontend" | "backend" | "wasm" | "tools";

export type SkillItem = {
  name: string;
  level: number;
};

export type TechSkill = {
  name: string;
  category: "ai" | "frontend" | "backend" | "wasm" | "tools";
  tier: "Production Lead" | "Core Architecture" | "Advanced";
  project?: "NexusIQ" | "ToolForge" | "Both";
  description: string;
  iconName: string;
};

export const techSkills: TechSkill[] = [
  // AI & Multi-Agent
  {
    name: "LangGraph & LangChain",
    category: "ai",
    tier: "Production Lead",
    project: "NexusIQ",
    description: "Multi-agent cognitive orchestration, stateful routing graph, and cyclic reasoning loops.",
    iconName: "BrainCircuit",
  },
  {
    name: "Qdrant Hybrid Vector DB",
    category: "ai",
    tier: "Production Lead",
    project: "NexusIQ",
    description: "Sub-35ms dense vector embeddings fused with sparse BM25 keyword search.",
    iconName: "Database",
  },
  {
    name: "Agentic RAG & Evaluation",
    category: "ai",
    tier: "Production Lead",
    project: "NexusIQ",
    description: "Zero-hallucination source citation verification and dynamic context scoring.",
    iconName: "Sparkles",
  },
  {
    name: "Headless PDF Extraction",
    category: "ai",
    tier: "Core Architecture",
    project: "NexusIQ",
    description: "Automated lecture slide chunking, hierarchical parsing, and syllabus mapping.",
    iconName: "Cpu",
  },

  // Frontend & 3D WebGL
  {
    name: "Next.js 16 (App Router)",
    category: "frontend",
    tier: "Production Lead",
    project: "Both",
    description: "Turbopack optimization, server components, streaming SSR, and edge caching.",
    iconName: "Code2",
  },
  {
    name: "React 19 & TypeScript",
    category: "frontend",
    tier: "Production Lead",
    project: "Both",
    description: "Strict end-to-end type safety, concurrent actions, and modern hook pipelines.",
    iconName: "FileCode2",
  },
  {
    name: "Tailwind CSS v4",
    category: "frontend",
    tier: "Production Lead",
    project: "Both",
    description: "Zero-runtime CSS variables, high-performance responsive styling, and custom glassmorphism.",
    iconName: "Layers",
  },
  {
    name: "Three.js & GSAP",
    category: "frontend",
    tier: "Advanced",
    project: "Both",
    description: "Interactive 3D WebGL meshes, particle fields, 360° mouse drag physics, and smooth timelines.",
    iconName: "Zap",
  },

  // In-Browser WASM & Security
  {
    name: "pdf-lib & WebAssembly",
    category: "wasm",
    tier: "Production Lead",
    project: "ToolForge",
    description: "In-memory client-side PDF merging, splitting, rotation, and document restructuring.",
    iconName: "Cpu",
  },
  {
    name: "HTML5 Canvas 2D Buffer",
    category: "wasm",
    tier: "Production Lead",
    project: "ToolForge",
    description: "High-speed client-side image compression, format transcoding, and dynamic QR generators.",
    iconName: "Sparkles",
  },
  {
    name: "Zero-Leak ArrayBuffers",
    category: "wasm",
    tier: "Core Architecture",
    project: "ToolForge",
    description: "Memory-safe local chunking preventing mobile browser tab crashes during 25MB+ processing.",
    iconName: "ShieldCheck",
  },

  // Backend & Cloud
  {
    name: "Python & FastAPI",
    category: "backend",
    tier: "Production Lead",
    project: "NexusIQ",
    description: "Asynchronous microservices, OpenAPI documentation, and document ingestion workers.",
    iconName: "Terminal",
  },
  {
    name: "PostgreSQL & Prisma",
    category: "backend",
    tier: "Core Architecture",
    project: "NexusIQ",
    description: "Relational data integrity, schema migrations, and university audit ledgers.",
    iconName: "Database",
  },
  {
    name: "Node.js & Express",
    category: "backend",
    tier: "Advanced",
    project: "Both",
    description: "RESTful endpoints, real-time WebSockets, and secure JWT authentication layers.",
    iconName: "Workflow",
  },

  // Tools & DevOps
  {
    name: "Git & Automated CI/CD",
    category: "tools",
    tier: "Production Lead",
    project: "Both",
    description: "Branch protection, automated linting, test suites, and GitHub Actions deployments.",
    iconName: "GitBranch",
  },
  {
    name: "Docker & Containerization",
    category: "tools",
    tier: "Advanced",
    project: "NexusIQ",
    description: "Multi-stage builds, isolated local dev environments, and microservice container runs.",
    iconName: "Layers",
  },
  {
    name: "Vercel & Edge Network",
    category: "tools",
    tier: "Production Lead",
    project: "Both",
    description: "Serverless function deployment, custom domains, analytics, and instant global CDN.",
    iconName: "ArrowUpRight",
  },
];
