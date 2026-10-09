import { profile } from "../data/siteData";
import { useTheme } from "../context/ThemeContext";
import saikatPhoto from "../assets/Saikat_Ghosh_Photo.jpg";
import { motion } from "framer-motion";

export default function Hero() {
  const { mode } = useTheme();
  const isDark = mode === "dark";

  return (
    <section id="hero" className="relative pb-16 pt-28 md:pt-40">
      <div className="relative z-10 mx-auto max-w-4xl px-6 w-full text-center flex flex-col items-center">

        {/* Avatar */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <img
            src={saikatPhoto}
            alt={profile.name}
            className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover shadow-sm mx-auto"
            style={{ objectPosition: "center 15%", border: "1px solid var(--color-border)" }}
          />
        </motion.div>

        {/* Availability badge */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-4 text-xs md:text-sm font-medium tracking-wide"
          style={{ color: "var(--color-text-muted)" }}
        >
          {profile.availableForWork ? "🟢 Available for new opportunities" : "Software Engineer"}
        </motion.p>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-2 font-display font-semibold tracking-tight"
          style={{
            fontSize: "clamp(2rem, 6vw, 3.75rem)",
            lineHeight: "1.1",
            color: "var(--color-text-heading)",
          }}
        >
          {profile.name}
        </motion.h1>

        {/* Role — big, prominent title */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="mb-7 font-display font-semibold tracking-tight"
          style={{
            fontSize: "clamp(1.15rem, 3.5vw, 2rem)",
            lineHeight: "1.25",
            color: "var(--color-text-muted)",
            letterSpacing: "-0.01em",
          }}
        >
          {profile.title}
        </motion.p>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mx-auto mb-10 max-w-xl text-sm md:text-base leading-relaxed px-1"
          style={{ color: "var(--color-text-body)" }}
        >
          {profile.tagline}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="w-full flex justify-center"
        >
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="btn-primary h-11 px-7 flex items-center justify-center text-sm md:text-base"
              style={{ backgroundColor: "var(--color-text-heading)", color: "var(--color-bg-primary)" }}
            >
              View Projects
            </a>
            <a
              href="https://drive.google.com/file/d/1u7es6TRXsnCC9OLujSa0Ofz8YLcvQ1eN/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline h-11 px-7 flex items-center justify-center text-sm md:text-base border"
              style={{ borderColor: "var(--color-border)", color: "var(--color-text-heading)" }}
            >
              View Resume
              <svg className="ml-2 h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
