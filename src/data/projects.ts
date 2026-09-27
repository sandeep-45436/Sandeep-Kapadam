export type Project = {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  tags: string[];
  image: string;
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  duration: string;
  problem: string;
  solution: string;
  features: string[];
  architecture: string[];
  challenges: string[];
  impact: string;
};

export const projects: Project[] = [
  {
    id: "nexusiq-rag",
    slug: "agentic-rag-platform",
    title: "NexusIQ",
    subtitle: "Autonomous Campus Intelligence & University RAG",
    category: "AI / Multi-Agent / Full Stack",
    description:
      "Enterprise multi-agent RAG platform delivering zero-hallucination, citation-grounded answers and on-demand PDF extraction for students, faculty, and university leadership.",
    tags: ["Next.js", "TypeScript", "LangGraph", "LangChain", "Qdrant", "PostgreSQL", "FastAPI"],
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80",
    liveUrl: "https://agenticrag-nine.vercel.app/",
    githubUrl: "https://github.com/sandeep-45436",
    featured: true,
    duration: "Production",
    problem:
      "University academic regulations, syllabi, timetables, and departmental circulars exist across disparate, unstructured PDF files. Standard commercial LLMs hallucinate academic rules and cannot provide auditable, verifiable source citations.",
    solution:
      "A cognitive university intelligence platform powered by LangGraph multi-agent routing, Qdrant hybrid vector search, and PostgreSQL ground-truth storage. Delivers sub-35ms grounded answers with direct citations, headless PDF lecture slicing, and dedicated portals for Students, Faculty, HODs, and the Principal.",
    features: [
      "Autonomous Multi-Agent Routing (Knowledge Agent, Slicer Engine, Regulations & Governance)",
      "Sub-35ms Hybrid Vector Search combining dense vector similarity with sparse keyword BM25",
      "100% Policy Grounded with verifiable page & paragraph citations linking back to original PDFs",
      "Headless PDF Slide & Lecture Slicing Engine for on-demand chapter and slide extraction",
      "5 Institutional Subsystems: Student Portal, Faculty Dashboard, HOD Command Center, Placement Accelerator, & Principal Cockpit",
      "Live interactive query playground with step-by-step reasoning trace visualization",
    ],
    architecture: [
      "Next.js 16 Web Client & Interactive Portals",
      "API Gateway & Role-Based Access Control",
      "LangGraph Autonomous Multi-Agent Orchestrator",
      "Qdrant Vector Database (Document Embeddings & Hybrid Search)",
      "PostgreSQL (Academic Records & Audit Ledgers)",
      "FastAPI Document Ingestion & PDF Slicing Engine",
    ],
    challenges: [
      "Eliminating hallucinations on strict academic grading criteria — achieved through strict contextual constraint prompting and verification scoring",
      "Optimizing vector retrieval latency across dense multi-page syllabi — solved with hierarchical chunking and hybrid dense/sparse indexing",
      "Seamless multi-role workflow orchestration across executive, departmental, and student tiers",
    ],
    impact:
      "Deployed live in production at ALITS serving 3,500+ students and 180+ faculty across 9 engineering departments with 100% cited source provenance.",
  },
  {
    id: "toolforge",
    slug: "toolforge",
    title: "ToolForge",
    subtitle: "All-in-One PDF & Image Utility Platform",
    category: "Client-Side Engineering / Web Utilities",
    description:
      "A high-performance, privacy-first document and image suite that compresses, converts, merges, splits, and optimizes files 100% client-side inside the browser without uploading to any server.",
    tags: ["Next.js", "React", "TypeScript", "Tailwind CSS", "pdf-lib", "HTML5 Canvas", "Web APIs"],
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80",
    liveUrl: "https://tools-forge-kappa.vercel.app/",
    githubUrl: "https://github.com/sandeep-45436",
    featured: true,
    duration: "Production",
    problem:
      "Traditional online PDF and image compressors require users to upload sensitive files (such as ID cards, bank statements, and private photos) to third-party servers, creating security risks, bandwidth delays, and queue bottlenecks.",
    solution:
      "Engineered a zero-server upload utility platform running completely in the user's browser memory using WebAssembly, pdf-lib, and HTML5 Canvas. Users get instant local processing in milliseconds with absolute data privacy.",
    features: [
      "100% Client-Side In-Browser Processing — zero files sent over the network",
      "PDF Utilities: PDF Merger, PDF Page Splitter, Image-to-PDF, and PDF-to-Image",
      "Image Utilities: In-browser Image Compressor, Image Resizer, and JPG ↔ PNG ↔ WEBP Converter",
      "Dynamic QR Code Generator with custom URLs, WiFi configurations, and color customization",
      "Responsive, mobile-first touch UI with drag-and-drop file ingestion and live size comparison",
      "Instant multi-file download with zero latency and zero queue times",
    ],
    architecture: [
      "Next.js 16 Static Frontend & Component Layer",
      "Client-Side In-Memory Buffer Pipeline (ArrayBuffers & Blobs)",
      "pdf-lib WebAssembly Engine for PDF Manipulation",
      "HTML5 Canvas 2D Context for High-Performance Image Compression",
      "Local Worker Threads for Non-Blocking Heavy File Exports",
    ],
    challenges: [
      "Preventing mobile browser tab crashes under large 25MB+ PDF files — resolved by chunking ArrayBuffers and releasing unused blob memory",
      "Maintaining sharp text quality during client-side image compression across diverse aspect ratios",
    ],
    impact:
      "Provides instantaneous file optimization with zero backend server costs and 100% document privacy for daily users.",
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
export const getProject = (slug: string) => projects.find((p) => p.slug === slug || p.id === slug);
