import { profile } from "../data/siteData";
import saikatPhoto from "../assets/Saikat_Ghosh_Photo.jpg";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section id="hero" className="relative px-4 pb-12 pt-[calc(4.5rem+env(safe-area-inset-top,0px))] sm:px-6 md:pb-16 md:pt-28">
      <div className="hero-panel relative z-10 mx-auto grid w-full max-w-6xl items-center gap-8 rounded-[var(--radius-card)] border px-5 py-8 text-center sm:px-8 sm:py-10 md:grid-cols-[minmax(13rem,0.8fr)_minmax(0,1.4fr)] md:gap-12 md:px-12 md:py-14 md:text-left lg:gap-16 lg:px-16">

        {/* Avatar */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-5 md:mb-0 md:justify-self-center"
        >
          <img
            src={saikatPhoto}
            alt={profile.name}
            className="mx-auto h-24 w-24 rounded-full object-cover shadow-sm sm:h-28 sm:w-28 md:h-56 md:w-56 lg:h-64 lg:w-64"
            style={{ objectPosition: "center 15%", border: "1px solid var(--color-border)" }}
          />
        </motion.div>

        {/* Availability badge */}
        <div className="min-w-0 md:py-2">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-3 text-xs font-medium tracking-wide sm:text-sm"
            style={{ color: "var(--color-text-muted)" }}
          >
            {profile.availableForWork ? "🟢 Available for new opportunities" : "Software Engineer"}
          </motion.p>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-2 break-words font-display font-semibold tracking-tight"
          style={{
            fontSize: "clamp(2rem, 5.2vw, 3.75rem)",
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
          className="mb-5 font-display font-semibold tracking-tight"
          style={{
            fontSize: "clamp(1.125rem, 2.8vw, 1.75rem)",
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
          className="mx-auto mb-7 max-w-xl px-1 text-sm leading-relaxed sm:text-base md:mx-0 md:mb-8"
          style={{ color: "var(--color-text-body)" }}
        >
          {profile.tagline}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="w-full"
        >
          <div className="flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:flex-wrap sm:items-center md:justify-start">
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="btn-primary flex h-11 items-center justify-center px-7 text-sm md:text-base"
            >
              View Projects
            </a>
            <a
              href="https://drive.google.com/file/d/1u7es6TRXsnCC9OLujSa0Ofz8YLcvQ1eN/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline flex h-11 items-center justify-center border px-7 text-sm md:text-base"
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
      </div>
    </section>
  );
}
