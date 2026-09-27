export const profile = {
  name: "Sandeep Kapadam",
  fullName: "Sandeep Kapadam",
  title: "Full Stack & AI Engineer",
  tagline: "Building scalable web platforms, autonomous AI systems & client-side utilities",
  email: "sand39727@gmail.com",
  phone: "+91 9347040216",
  location: "India",
  github: "https://github.com/sandeep-45436",
  linkedin: "https://linkedin.com/in/sandeepkumar",
  twitter: "https://twitter.com/sandeepkumar",
  resumeUrl: "#contact",
  siteUrl: "https://sandeep-portfolio.vercel.app",
  photoUrl: "/images/sandeep.jpg",
  stats: [
    { label: "Flagship Projects", value: "2", icon: "🚀" },
    { label: "GitHub Repos", value: "15+", icon: "📚" },
    { label: "Tech Stack", value: "15+", icon: "⚡" },
    { label: "Coffee Cups", value: "∞", icon: "☕" },
  ],
  githubStats: {
    stars: 50,
    repos: 15,
    commits: 240,
    prs: 35,
  },
  about: {
    paragraph1:
      "I'm Sandeep Kapadam, a passionate Full Stack & AI Systems Developer dedicated to building production-ready digital products. From autonomous multi-agent university RAG platforms to high-performance client-side browser utilities, I specialize in combining rigorous engineering with intuitive, responsive design.",
    paragraph2:
      "My flagship systems include NexusIQ — an autonomous campus intelligence platform serving thousands of students and faculty at ALITS, and ToolForge — a lightning-fast, privacy-first PDF and image manipulation suite running 100% in-browser.",
    paragraph3:
      "I am actively seeking impactful software engineering opportunities. Whether you need a full-stack engineer, AI systems builder, or performant web architect, feel free to connect with me directly at sand39727@gmail.com or +91 9347040216.",
  },
} as const;

export const navLinks = [
  { label: "About", href: "/#about" },
  { label: "Projects", href: "/#projects" },
  { label: "Skills", href: "/#skills" },
  { label: "Contact", href: "/#contact" },
] as const;
