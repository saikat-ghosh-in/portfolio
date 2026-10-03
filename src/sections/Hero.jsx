import { profile } from "../data/siteData";
import { useTheme } from "../context/ThemeContext";
import SectionWrapper from "../components/SectionWrapper";
import saikatPhoto from "../assets/Saikat_Ghosh_Photo.jpg";
import { motion } from "framer-motion";

export default function Hero() {
  const { mode } = useTheme();
  const isDark = mode === "dark";

  return (
    <section id="hero" className="relative overflow-hidden pt-24 md:pt-32 pb-0 min-h-[100svh] flex flex-col justify-center">
      {/* Decorative background */}
      {isDark && (
        <div className="absolute inset-0 dark-grid-bg" />
      )}
      {!isDark && (
        <div className="absolute inset-0 opacity-40" style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, rgba(0,0,0,0.04) 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }} />
      )}

      <div className="relative z-10 mx-auto max-w-5xl px-6 py-10 md:py-16 lg:py-24 w-full text-center flex flex-col items-center">
        {/* Avatar — centered top */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
          className="mb-6 flex justify-center"
        >
          <div className="relative group">
            {isDark && <div className="absolute -inset-2 opacity-40 blur-2xl transition-opacity duration-700 group-hover:opacity-60" style={{ background: "linear-gradient(135deg, #0071e3, #bf5af2, #5ac8fa)" }} />}
            <div
              className="overflow-hidden transition-[transform,box-shadow] duration-700"
              style={{
                width: "clamp(120px, 20vw, 160px)",
                height: "clamp(120px, 20vw, 160px)",
                borderRadius: "50%",
                border: isDark ? "2px solid rgba(255,255,255,0.1)" : "3px solid var(--color-bg-surface)",
                boxShadow: isDark ? "0 0 60px rgba(41,151,255,0.15)" : "0 20px 60px rgba(0,0,0,0.08)",
              }}
            >
              <img
                src={saikatPhoto}
                alt={profile.name}
                className="h-full w-full object-cover object-top"
                style={{ transform: "scale(1.1)" }}
              />
            </div>
          </div>
        </motion.div>

        {/* Name */}
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
          className="mb-4 text-2xl font-semibold"
          style={{ color: "var(--color-text-heading)", letterSpacing: "-0.02em" }}
        >
          {profile.name}
        </motion.h2>

        {/* Status badge */}
        {profile.availableForWork && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="mb-6 inline-flex items-center gap-2.5 px-4 py-2"
            style={{
              background: "var(--color-accent-soft)",
              borderRadius: "var(--radius-pill)",
              border: "1px solid var(--color-border)",
            }}
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" style={{ backgroundColor: "#30d158" }} />
              <span className="relative inline-flex h-2 w-2 rounded-full" style={{ backgroundColor: "#30d158" }} />
            </span>
            <span className="text-xs font-medium" style={{ color: "var(--color-text-body)" }}>
              Available for new opportunities
            </span>
          </motion.div>
        )}

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.23, 1, 0.32, 1] }}
          className="mb-6 max-w-4xl"
          style={{
            fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
            lineHeight: "1.1",
            letterSpacing: "-0.03em",
            fontWeight: 700,
            color: "var(--color-text-heading)"
          }}
        >
          {profile.title.split(" ").map((word, i) => (
            <span key={i} style={{ color: i % 2 === 1 ? "var(--color-accent)" : "inherit" }}>
              {word}{" "}
            </span>
          ))}
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5, ease: [0.23, 1, 0.32, 1] }}
          className="mx-auto mb-10 max-w-2xl text-lg sm:text-xl leading-relaxed"
          style={{ color: "var(--color-text-body)" }}
        >
          {profile.tagline}
        </motion.p>

        {/* CTAs — Apple-style link buttons */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6, ease: [0.23, 1, 0.32, 1] }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center items-center"
        >
          <a href="#projects" onClick={(e) => { e.preventDefault(); document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" }); }}
            className="btn-primary h-12 px-8 flex w-full sm:w-auto items-center justify-center text-base"
          >
            View Projects
          </a>
          <a href="https://drive.google.com/file/d/1u7es6TRXsnCC9OLujSa0Ofz8YLcvQ1eN/view?usp=sharing" target="_blank" rel="noopener noreferrer"
            className="btn-outline h-12 px-8 flex w-full sm:w-auto items-center justify-center text-base"
          >
            View Resume
            <svg className="h-4 w-4 ml-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </motion.div>
      </div>

      {/* About section */}
      <SectionWrapper id="about" className="py-16">
        <div className="py-10">
          <div className="mx-auto max-w-5xl px-6">
            <div className="glass-text p-8 md:p-14 mx-auto max-w-4xl">
              <div className="mb-10 text-center">
                <h2 className="section-title">About Me</h2>
              </div>
              <div className="space-y-6 text-base leading-relaxed" style={{ color: "var(--color-text-body)" }}>
                {profile.about.map((p, i) => <p key={i}>{p}</p>)}
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>
    </section>
  );
}
