import SectionWrapper from "../components/SectionWrapper";
import { skills } from "../data/siteData";
import { useTheme } from "../context/ThemeContext";
import { FiCode, FiLayers, FiLayout, FiDatabase, FiCloud, FiClipboard } from "react-icons/fi";
import { motion } from "framer-motion";

const iconMap = { code: FiCode, layers: FiLayers, layout: FiLayout, database: FiDatabase, cloud: FiCloud, clipboard: FiClipboard };

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
const itemVariants = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } } };

export default function Skills() {
  const { mode } = useTheme();
  const isDark = mode === "dark";

  return (
    <SectionWrapper id="skills" className="py-12">
      <div className="py-12">
        <div className="mx-auto max-w-6xl px-6">
          {/* Header */}
          <div className="mb-14 text-right">
            <h2 className="section-title" style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "1rem" }}>
              My Expertise <span style={{ color: "var(--color-accent)" }}>/</span>
            </h2>
            <div className="section-divider ml-auto mt-4" />
          </div>

          {/* Grid */}
          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {skills.map((group) => {
              const Icon = iconMap[group.icon] || FiCode;
              return (
                <motion.div variants={itemVariants} key={group.category} className="card p-6 group relative overflow-hidden">
                  {isDark && <div className="absolute -inset-4 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-10 pointer-events-none" style={{ backgroundColor: "var(--color-accent)" }} />}
                  <div className="mb-4 flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center" style={{
                      backgroundColor: "var(--color-accent-soft)",
                      color: "var(--color-accent)",
                      borderRadius: isDark ? 0 : "0.5rem",
                      border: isDark ? "1px solid var(--color-accent)" : "none",
                      boxShadow: isDark ? "0 0 12px var(--color-accent-glow)" : "none",
                    }}>
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="text-base font-bold" style={{ color: "var(--color-text-heading)" }}>{group.category}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span key={item} className="tag">{item}</span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  );
}
