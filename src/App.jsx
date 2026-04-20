import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { LoadingProvider } from "./context/LoadingContext";
import Navbar from "./components/Navbar";
import Hero from "./sections/Hero";
import LoadingScreen from "./components/LoadingScreen";

// Lazy load heavy sections and components
const WebGLBlob = lazy(() => import("./components/WebGLBlob"));
const Skills = lazy(() => import("./sections/Skills"));
const Experience = lazy(() => import("./sections/Experience"));
const Projects = lazy(() => import("./sections/Projects"));
const Certifications = lazy(() => import("./sections/Certifications"));
const Education = lazy(() => import("./sections/Education"));
const Contact = lazy(() => import("./sections/Contact"));
const ProjectDetail = lazy(() => import("./pages/ProjectDetail"));
const Footer = lazy(() => import("./components/Footer"));
const BackToTop = lazy(() => import("./components/BackToTop"));

function Home() {
  return (
    <main className="relative z-10">
      <Hero />
      <Suspense fallback={null}>
        <Skills />
        <Experience />
        <Projects />
        <Certifications />
        <Education />
        <Contact />
      </Suspense>
    </main>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <LoadingProvider>
        <div className="min-h-screen font-sans antialiased relative" style={{ backgroundColor: "var(--color-bg-primary)", color: "var(--color-text-body)" }}>
          {/* Loading screen — renders on top of everything until assets are ready */}
          <LoadingScreen />

          {/* Blob loads in background; signals LoadingContext when first frame is drawn */}
          <Suspense fallback={null}>
            <WebGLBlob />
          </Suspense>

          <Navbar />
          <div className="relative z-10">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/project/:title" element={
                <Suspense fallback={null}>
                  <ProjectDetail />
                </Suspense>
              } />
            </Routes>
          </div>
          <Suspense fallback={null}>
            <Footer />
            <BackToTop />
          </Suspense>
        </div>
      </LoadingProvider>
    </ThemeProvider>
  );
}

