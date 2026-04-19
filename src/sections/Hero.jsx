import { profile } from "../data/siteData";
import { useTheme } from "../context/ThemeContext";
import SectionWrapper from "../components/SectionWrapper";
import saikatPhoto from "../assets/Saikat_Ghosh_Photo.jpg";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Hero() {
  const { mode } = useTheme();
  const isDark = mode === "dark";
  const [isTypingDone, setIsTypingDone] = useState(false);
  const [isTaglineTypingDone, setIsTaglineTypingDone] = useState(false);

  return (
    <section id="hero" className="relative overflow-hidden pt-28 pb-0">
      {/* Decorative background */}
      {isDark && (
        <div className="absolute inset-0 dark-grid-bg" />
      )}
      {!isDark && (
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-30" />
      )}

      <div className="absolute left-0 bottom-0 h-px w-full" style={{ background: isDark ? "linear-gradient(to right, transparent, var(--color-accent), transparent)" : "var(--color-border)", opacity: isDark ? 0.4 : 1 }} />

      <div className="relative z-10 mx-auto max-w-6xl px-6 py-10 lg:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left — Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {profile.availableForWork && (
              <div className="mb-6 inline-flex items-center gap-3">
                <div className="relative flex h-2 w-2 flex-shrink-0 items-center justify-center">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" style={{ backgroundColor: "var(--color-accent)" }} />
                  <span className="relative inline-flex h-2 w-2 rounded-full" style={{ backgroundColor: "var(--color-accent)" }} />
                </div>
                <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--color-text-muted)" }}>
                  Open to new opportunities
                </span>
              </div>
            )}

            <h1 className="mb-4 relative" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", lineHeight: isDark ? "1.15" : "1.1" }}>
              <span className="invisible pointer-events-none block w-full">{profile.title}</span>
              <motion.span
                initial="hidden"
                animate="visible"
                onAnimationComplete={() => setIsTypingDone(true)}
                variants={{
                  hidden: { opacity: 1 },
                  visible: {
                    opacity: 1,
                    transition: { staggerChildren: 0.04 }
                  }
                }}
                className="absolute top-0 left-0 block w-full h-full"
              >
                {isDark
                  ? profile.title.split("").map((char, i) => {
                    // Determine word index to colorize alternating words
                    const wordIndex = profile.title.substring(0, i).split(" ").length - 1;
                    return (
                      <motion.span
                        key={i}
                        variants={{ hidden: { opacity: 0, display: "none" }, visible: { opacity: 1, display: "inline" } }}
                        style={{ color: wordIndex % 2 === 1 ? "var(--color-accent)" : "var(--color-text-heading)" }}
                      >
                        {char}
                      </motion.span>
                    );
                  })
                  : profile.title.split("").map((char, i) => (
                    <motion.span
                      key={i}
                      variants={{ hidden: { opacity: 0, display: "none" }, visible: { opacity: 1, display: "inline" } }}
                    >
                      {char}
                    </motion.span>
                  ))
                }
                {!isTypingDone && (
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                    style={{ color: "var(--color-accent)", marginLeft: "2px", fontWeight: "300" }}
                  >
                    |
                  </motion.span>
                )}
              </motion.span>
            </h1>

            <p className="mb-10 max-w-lg text-lg leading-relaxed relative" style={{ color: "var(--color-text-body)" }}>
              <span className="invisible pointer-events-none block w-full">{profile.tagline}</span>
              {isTypingDone && (
                <motion.span
                  initial="hidden"
                  animate="visible"
                  onAnimationComplete={() => setIsTaglineTypingDone(true)}
                  variants={{
                    hidden: { opacity: 1 },
                    visible: {
                      opacity: 1,
                      transition: { staggerChildren: 0.015 }
                    }
                  }}
                  className="absolute top-0 left-0 block w-full h-full"
                >
                  {profile.tagline.split("").map((char, i) => (
                    <motion.span
                      key={i}
                      variants={{ hidden: { opacity: 0, display: "none" }, visible: { opacity: 1, display: "inline" } }}
                    >
                      {char}
                    </motion.span>
                  ))}
                  {!isTaglineTypingDone && (
                    <motion.span
                      animate={{ opacity: [1, 0] }}
                      transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                      style={{ color: "var(--color-accent)", marginLeft: "2px", fontWeight: "300" }}
                    >
                      |
                    </motion.span>
                  )}
                </motion.span>
              )}
            </p>

            <motion.div 
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isTaglineTypingDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <a href="#projects" onClick={(e) => { e.preventDefault(); document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" }); }} className="btn-primary">
                View Projects
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a href="https://drive.google.com/file/d/1u7es6TRXsnCC9OLujSa0Ofz8YLcvQ1eN/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="btn-outline group text-sm">
                View Resume
                <div className="ml-1 transition-all duration-300">
                  <svg className="h-4 w-4 shrink-0 transition-colors duration-300 text-[var(--color-text-muted)] group-hover:text-[var(--color-accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </div>
              </a>
            </motion.div>
          </motion.div>

          {/* Right — Avatar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative group">
              {isDark && <div className="absolute -inset-1 opacity-30 blur-lg transition duration-500 group-hover:opacity-60" style={{ backgroundColor: "var(--color-accent)" }} />}
              <div
                className="overflow-hidden transition-all duration-500"
                style={{
                  width: "clamp(280px, 25vw, 350px)",
                  height: "clamp(280px, 25vw, 350px)",
                  borderRadius: "var(--radius-card)",
                  border: isDark ? "none" : "4px solid var(--color-bg-surface)",
                  boxShadow: isDark ? "0 0 30px var(--color-accent-glow)" : "0 20px 60px rgba(0,0,0,0.1)",
                  filter: "none",
                }}
              >
                <img
                  src={saikatPhoto}
                  alt="Saikat Ghosh"
                  className="h-full w-full object-cover object-top transition-all duration-500"
                  style={{ transform: "scale(1.05)" }}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* About blurb */}
      <SectionWrapper id="about" className="py-10">
        <div className="py-10">
          <div className="mx-auto max-w-6xl px-6">
            <div className="glass-text p-8 mx-auto max-w-3xl">
              <div className="mb-10 text-left">
                <h2 className="section-title" style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  <span style={{ color: "var(--color-accent)" }}>/</span>
                  Who I Am
                </h2>
                <div className="section-divider mt-4" />
              </div>
              <div className="space-y-6 text-base leading-relaxed sm:text-lg text-left border-l pl-8" style={{ color: "var(--color-text-body)", borderColor: "var(--color-border)" }}>
                {profile.about.map((p, i) => <p key={i}>{p}</p>)}
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>
    </section>
  );
}
