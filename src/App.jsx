import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import BackToTop from "./components/BackToTop";
import Hero from "./sections/Hero";
import Skills from "./sections/Skills";
import Experience from "./sections/Experience";
import Projects from "./sections/Projects";
import Certifications from "./sections/Certifications";
import Education from "./sections/Education";
import Contact from "./sections/Contact";
import ProjectDetail from "./pages/ProjectDetail";
import WebGLBlob from "./components/WebGLBlob";
function Home() {
  return (
    <main className="relative z-10">
      <Hero />
      <Skills />
      <Experience />
      <Projects />
      <Certifications />
      <Education />
      <Contact />
    </main>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen font-sans antialiased relative" style={{ backgroundColor: "var(--color-bg-primary)", color: "var(--color-text-body)" }}>
        <WebGLBlob />
        <Navbar />
        <div className="relative z-10">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/project/:title" element={<ProjectDetail />} />
          </Routes>
        </div>
        <Footer />
        <BackToTop />
      </div>
    </ThemeProvider>
  );
}
