import SectionWrapper from "../components/SectionWrapper";
import { certifications } from "../data/siteData";
import { useTheme } from "../context/ThemeContext";
import { FiAward } from "react-icons/fi";
import { motion } from "framer-motion";

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.15 } } };
const itemVariants = { hidden: { opacity: 0, x: 30 }, visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } } };

export default function Certifications() {
  const { mode } = useTheme();
  const isDark = mode === "dark";

  return (
    <SectionWrapper id="certifications" className="py-12">
      <div className="glass-section py-12 relative">
        {isDark && <div className="absolute right-0 top-0 h-full w-1" style={{ backgroundColor: "var(--color-accent)" }} />}
        <div className="mx-auto max-w-6xl px-6">
          {/* Header */}
          <div className={`mb-14 ${isDark ? "text-right" : "text-center"}`}>
            {!isDark && <p className="section-label">Credentials</p>}
            <h2 className="section-title" style={isDark ? { display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "1rem" } : {}}>
              {isDark ? <>Certifications <span style={{ color: "var(--color-accent)" }}>/</span></> : "Certifications"}
            </h2>
            {!isDark && <div className="section-divider mx-auto" />}
            {isDark && <div className="section-divider ml-auto mt-4" />}
          </div>

          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} className="mx-auto max-w-4xl">
            <div className="card p-7 group relative overflow-hidden">
              {isDark && <div className="absolute -inset-4 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-10 pointer-events-none" style={{ backgroundColor: "var(--color-accent)" }} />}
              <div className="mb-6 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center" style={{
                  backgroundColor: "var(--color-accent-soft)",
                  color: "var(--color-accent)",
                  borderRadius: isDark ? 0 : "0.5rem",
                  border: isDark ? "1px solid var(--color-accent)" : "none",
                }}>
                  <FiAward className="h-5 w-5" />
                </span>
                <h3 className="text-base font-bold" style={{ color: "var(--color-text-heading)" }}>Licenses & Certifications</h3>
              </div>

              <div className="space-y-5">
                {certifications.map((cert) => {
                  const content = (
                    <div className="flex-1">
                      <h4 className="text-base font-bold" style={{ color: "var(--color-text-heading)" }}>{cert.title}</h4>
                      <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm font-medium" style={{ color: "var(--color-accent)" }}>
                        <span>{cert.issuer}</span>
                        {cert.instructor && <><span style={{ color: "var(--color-text-muted)" }}>{isDark ? "//" : "·"}</span><span>{cert.instructor}</span></>}
                        {cert.completedOn && <><span style={{ color: "var(--color-text-muted)" }}>{isDark ? "//" : "·"}</span><span style={{ color: "var(--color-text-muted)" }}>{cert.completedOn}</span></>}
                      </div>
                      {cert.note && <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--color-text-body)" }}>{cert.note}</p>}
                      {cert.topics?.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-2">
                          {cert.topics.map((t) => <span key={t} className="tag">{t}</span>)}
                        </div>
                      )}
                    </div>
                  );

                  return cert.url ? (
                    <motion.a variants={itemVariants} key={cert.id} href={cert.url} target="_blank" rel="noopener noreferrer"
                      className="block no-underline p-5 transition-all duration-300 hover:-translate-y-1 group/cert"
                      style={{ backgroundColor: isDark ? "var(--color-bg-surface-alt)" : "var(--color-bg-surface)", border: "1px solid var(--color-border)", borderRadius: "var(--radius-card)" }}
                    >
                      <div className="flex items-start justify-between">
                        <div>{content}</div>
                        <svg className="ml-4 mt-1 h-5 w-5 shrink-0 transition-all duration-300 group-hover/cert:translate-x-1 text-[var(--color-text-muted)] group-hover/cert:text-[var(--color-accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </div>
                    </motion.a>
                  ) : (
                    <motion.div variants={itemVariants} key={cert.id} className="p-5" style={{ border: "1px solid var(--color-border)", borderRadius: "var(--radius-card)" }}>
                      {content}
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  );
}
