export type Milestone = {
  id: string;
  type: "engineering" | "education";
  role: string;
  organization: string;
  period: string;
  status: "Active / Lead" | "In Production" | "Graduating 2026";
  location: string;
  summary: string;
  highlights: string[];
  metrics: { label: string; value: string }[];
  tags: string[];
  liveUrl?: string;
};

export const milestones: Milestone[] = [
  {
    id: "nexusiq-lead",
    type: "engineering",
    role: "Lead Architect & AI Systems Engineer",
    organization: "ALITS NexusIQ Cognitive Platform",
    period: "2025 — Present",
    status: "Active / Lead",
    location: "ALITS Campus, India",
    summary:
      "Spearheaded the design, architecture, and production deployment of the university's flagship autonomous multi-agent intelligence platform.",
    highlights: [
      "Engineered autonomous multi-agent state machines with LangGraph for strict academic regulatory compliance.",
      "Optimized hybrid dense-sparse vector retrieval via Qdrant & BM25, achieving sub-35ms query latency.",
      "Delivered 5 role-based institutional portals serving 3,500+ students and 180+ faculty across 9 departments.",
      "Enforced verifiable citation provenance directly from official syllabi, eliminating grading hallucinations.",
    ],
    metrics: [
      { label: "Students Served", value: "3,500+" },
      { label: "Faculty Tiers", value: "180+" },
      { label: "Query Latency", value: "<35ms" },
      { label: "Citation Provenance", value: "100%" },
    ],
    tags: ["LangGraph", "LangChain", "Qdrant", "FastAPI", "Next.js 16", "PostgreSQL"],
    liveUrl: "https://agenticrag-nine.vercel.app/",
  },
  {
    id: "toolforge-creator",
    type: "engineering",
    role: "Creator & Systems Architect",
    organization: "ToolForge All-in-One Utility Suite",
    period: "2025 — Present",
    status: "In Production",
    location: "Global Edge",
    summary:
      "Designed and launched an ultra-fast, zero-server privacy document optimization suite running 100% in client browser memory.",
    highlights: [
      "Built client-side WebAssembly pipeline with pdf-lib, enabling instant PDF merge, split, and conversion.",
      "Implemented HTML5 Canvas 2D image compression algorithm reducing asset weights by up to 80% locally.",
      "Eliminated all third-party server upload risks for confidential user documents like IDs and financial statements.",
      "Architected pure static edge delivery on Vercel, driving cloud compute and storage bills to exactly $0.",
    ],
    metrics: [
      { label: "Client-Side Processing", value: "100%" },
      { label: "Cloud Egress / Server Upload", value: "0 Bytes" },
      { label: "Compression Speed", value: "Instant" },
      { label: "Infrastructure Cost", value: "$0" },
    ],
    tags: ["Next.js 16", "React 19", "TypeScript", "pdf-lib", "HTML5 Canvas", "Tailwind CSS v4"],
    liveUrl: "https://tools-forge-kappa.vercel.app/",
  },
  {
    id: "alits-btech",
    type: "education",
    role: "B.Tech in Computer Science & Engineering",
    organization: "Anantha Lakshmi Institute of Technology & Sciences (ALITS)",
    period: "2022 — 2026",
    status: "Graduating 2026",
    location: "Anantapur, Andhra Pradesh, India",
    summary:
      "Rigorous academic training in core computer science, distributed algorithms, relational database architectures, and agentic artificial intelligence.",
    highlights: [
      "Appointed Campus Technical Lead for AI Systems & Distributed Architecture initiatives.",
      "Conducted technical workshops introducing students and faculty to autonomous agent workflows and vector search.",
      "Specialized coursework: Distributed Systems, Advanced Data Structures, Relational DBMS, Machine Learning & AI.",
      "Engineered production tools adopted officially by academic and departmental administrative heads.",
    ],
    metrics: [
      { label: "Degree Program", value: "B.Tech CSE" },
      { label: "Core Focus", value: "AI & Systems" },
      { label: "Leadership", value: "Campus AI Lead" },
      { label: "Timeline", value: "2022–2026" },
    ],
    tags: ["Computer Science", "Algorithms", "AI / ML", "Distributed Systems", "Database Design"],
  },
];

export const processSteps = [
  {
    number: "01",
    title: "Discover",
    note: "Deconstruct the core problem, user personas, and performance constraints before writing code.",
  },
  {
    number: "02",
    title: "Design",
    note: "Figma-driven interface prototyping with accessible design systems, fluid typography, and micro-interactions.",
  },
  {
    number: "03",
    title: "Build",
    note: "Type-safe, componentized React & Next.js architectures backed by robust APIs, vector DBs, and modern pipelines.",
  },
  {
    number: "04",
    title: "Optimize",
    note: "In-memory processing, lazy loading, client-side caching, and render budgets for sub-second responses.",
  },
  {
    number: "05",
    title: "Ship",
    note: "Automated CI/CD deployments, zero-downtime releases, and continuous telemetry monitoring.",
  },
];

