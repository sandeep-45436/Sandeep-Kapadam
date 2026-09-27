import Hero from "@/components/hero/Hero";
import About from "@/components/about/About";
import Projects from "@/components/projects/Projects";
import Stack from "@/components/stack/Stack";
import Experience from "@/components/experience/Experience";
import Process from "@/components/process/Process";
import GitHubStrip from "@/components/github/GitHubStrip";
import Contact from "@/components/contact/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Projects />
      <Stack />
      <Experience />
      <Process />
      <GitHubStrip />
      <Contact />
    </>
  );
}
