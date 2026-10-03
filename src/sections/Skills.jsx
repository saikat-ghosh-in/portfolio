import SectionWrapper from "../components/SectionWrapper";
import { skills } from "../data/siteData";
import { FiCode, FiLayers, FiLayout, FiDatabase, FiCloud, FiClipboard } from "react-icons/fi";
import { motion } from "framer-motion";

const iconMap = { code: FiCode, layers: FiLayers, layout: FiLayout, database: FiDatabase, cloud: FiCloud, clipboard: FiClipboard };

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.06 } } };
const itemVariants = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1] } } };

export default function Skills() {
  return (
    <SectionWrapper id="skills" className="py-20">
      <div className="py-12">
        <div className="mx-auto max-w-5xl px-6">
          {/* Header — centered, Apple-style */}
          <div className="mb-16 text-center">
            <h2 className="section-title">Technical Expertise</h2>
          </div>

          {/* Grid */}
          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {skills.map((group) => {
              const Icon = iconMap[group.icon] || FiCode;
              return (
                <motion.div variants={itemVariants} key={group.category} className="card p-6 group relative overflow-hidden">
                  <div className="mb-4 flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl" style={{
                      backgroundColor: "var(--color-accent-soft)",
                      color: "var(--color-accent)",
                    }}>
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="text-base font-semibold" style={{ color: "var(--color-text-heading)" }}>{group.category}</h3>
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
