import SectionWrapper from "../components/SectionWrapper";
import { skills } from "../data/siteData";
import { motion } from "framer-motion";

export default function Skills() {
  return (
    <section id="skills" className="py-20 section-tint">
      <div className="glass-surface mx-auto max-w-5xl px-5 py-6 sm:px-8 sm:py-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <p className="mb-3 text-sm font-medium" style={{ color: "var(--color-text-muted)" }}>Skills</p>
          <h2 className="text-4xl font-semibold tracking-tight" style={{ color: "var(--color-text-heading)" }}>
            The everyday toolkit.
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-3 md:grid-cols-4">
          {skills.map((group, idx) => (
            <motion.div 
              key={group.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <h3 className="mb-4 text-sm font-medium" style={{ color: "var(--color-text-heading)" }}>
                {group.category}
              </h3>
              <ul className="space-y-3">
                {group.items.map((item) => (
                  <li key={item} className="text-sm" style={{ color: "var(--color-text-muted)" }}>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
