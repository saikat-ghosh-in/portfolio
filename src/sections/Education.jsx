import SectionWrapper from "../components/SectionWrapper";
import { education } from "../data/siteData";
import { useTheme } from "../context/ThemeContext";
import { FiBookOpen } from "react-icons/fi";
import { motion } from "framer-motion";

export default function Education() {
  const { mode } = useTheme();
  const isDark = mode === "dark";

  return (
    <SectionWrapper id="education" className="py-12">
      <div className="py-12 relative">
        <div className="absolute right-0 top-0 h-full w-1" style={{ backgroundColor: "var(--color-accent)" }} />
        <div className="mx-auto max-w-6xl px-6">
          {/* Header */}
          <div className="mb-14 text-right">
            <h2 className="section-title" style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "1rem" }}>
              Education <span style={{ color: "var(--color-accent)" }}>/</span>
            </h2>
            <div className="section-divider ml-auto mt-4" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, margin: "-80px" }}
            className="mx-auto w-fit sm:min-w-[400px] max-w-3xl"
          >
            <div className="card p-7 group relative overflow-hidden">
              {isDark && <div className="absolute -inset-4 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-10 pointer-events-none" style={{ backgroundColor: "var(--color-accent)" }} />}
              <div className="mb-5 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center" style={{
                  backgroundColor: "var(--color-accent-soft)",
                  color: "var(--color-accent)",
                  borderRadius: isDark ? 0 : "0.5rem",
                  border: isDark ? "1px solid var(--color-accent)" : "none",
                }}>
                  <FiBookOpen className="h-5 w-5" />
                </span>
                <h3 className="text-base font-bold" style={{ color: "var(--color-text-heading)" }}>Degrees</h3>
              </div>

              <div className="space-y-6">
                {education.map((ed) => (
                  <div key={ed.id || ed.degree}>
                    <p className="text-lg font-bold" style={{ color: "var(--color-text-heading)" }}>{ed.degree}</p>
                    <p className="mt-1 text-sm font-medium" style={{ color: "var(--color-accent)" }}>{ed.institution}</p>
                    <span className="tag mt-3 inline-block">{ed.period}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  );
}
