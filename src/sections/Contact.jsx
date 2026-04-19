import { useState } from "react";
import SectionWrapper from "../components/SectionWrapper";
import { contact } from "../data/siteData";
import { useTheme } from "../context/ThemeContext";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";
import { motion } from "framer-motion";

const iconMap = { mail: FiMail, phone: FiPhone, location: FiMapPin };

export default function Contact() {
  const { mode } = useTheme();
  const isDark = mode === "dark";
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle");

  const handleChange = (e) => setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));
  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("submitting");
    setTimeout(() => { setStatus("success"); setFormData({ name: "", email: "", message: "" }); setTimeout(() => setStatus("idle"), 3000); }, 1500);
  };

  return (
    <SectionWrapper id="contact" className="py-12">
      <div className="glass-section py-12 relative">
        {isDark && <div className="absolute left-0 top-0 h-full w-1" style={{ backgroundColor: "var(--color-accent)" }} />}
        <div className="mx-auto max-w-6xl px-6">
          {/* Header */}
          <div className={`mb-14 ${isDark ? "text-left" : "text-center"}`}>
            {!isDark && <p className="section-label">Reach Out</p>}
            <h2 className="section-title" style={isDark ? { display: "flex", alignItems: "center", gap: "1rem" } : {}}>
              {isDark && <span style={{ color: "var(--color-accent)" }}>/</span>}
              Contact
            </h2>
            {!isDark && <div className="section-divider mx-auto" />}
            {isDark && <div className="section-divider mt-4" />}
          </div>

          <div className="grid gap-12 lg:grid-cols-2">
            {/* Info */}
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true, margin: "-80px" }}>
              <h3 className="mb-4 text-xl font-bold" style={{ color: "var(--color-text-heading)" }}>Get In Touch</h3>
              <p className="mb-8 text-base leading-relaxed max-w-md" style={{ color: "var(--color-text-body)" }}>{contact.text}</p>

              <div className="space-y-4">
                {contact.links.map((link, idx) => {
                  const Icon = iconMap[link.icon] || FiMail;
                  return (
                    <div key={idx} className="flex items-center gap-4 group">
                      <span className="flex h-10 w-10 items-center justify-center transition-all" style={{
                        backgroundColor: "var(--color-accent-soft)",
                        color: "var(--color-accent)",
                        borderRadius: isDark ? 0 : "0.5rem",
                        border: isDark ? "1px solid var(--color-accent)" : "none",
                      }}>
                        <Icon className="h-4 w-4" />
                      </span>
                      {link.url ? (
                        <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-sm font-medium no-underline" style={{ color: "var(--color-text-body)" }}>{link.label}</a>
                      ) : (
                        <span className="text-sm font-medium" style={{ color: "var(--color-text-body)" }}>{link.label}</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* Form */}
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true, margin: "-80px" }}>
              <form onSubmit={handleSubmit} className="card p-7">
                <div className="space-y-5">
                  {contact.form.fields.map((field) => (
                    <div key={field.name}>
                      <label htmlFor={field.name} className="mb-1.5 block text-sm font-semibold" style={{ color: "var(--color-text-heading)" }}>{field.label}</label>
                      {field.type === "textarea" ? (
                        <textarea id={field.name} name={field.name} value={formData[field.name]} onChange={handleChange} placeholder={field.placeholder} required
                          className="w-full resize-none h-28 px-4 py-3 text-sm outline-none transition-all"
                          style={{ backgroundColor: "var(--color-input-bg)", border: isDark ? "none" : "1px solid var(--color-input-border)", borderBottom: isDark ? "2px solid var(--color-border)" : undefined, borderRadius: "var(--radius-input)", color: "var(--color-input-text)" }}
                        />
                      ) : (
                        <input type={field.type} id={field.name} name={field.name} value={formData[field.name]} onChange={handleChange} placeholder={field.placeholder} required
                          className="w-full px-4 py-3 text-sm outline-none transition-all"
                          style={{ backgroundColor: "var(--color-input-bg)", border: isDark ? "none" : "1px solid var(--color-input-border)", borderBottom: isDark ? "2px solid var(--color-border)" : undefined, borderRadius: "var(--radius-input)", color: "var(--color-input-text)" }}
                        />
                      )}
                    </div>
                  ))}
                  <button type="submit" disabled={status === "submitting"} className="btn-primary w-full justify-center">
                    {status === "submitting" ? "Sending..." : contact.form.buttonText}
                  </button>
                  {status === "success" && <p className="mt-3 text-center text-sm font-medium" style={{ color: "#16a34a" }}>Message sent successfully!</p>}
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
