import { useState } from "react";
import SectionWrapper from "../components/SectionWrapper";
import { contact } from "../data/siteData";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";
import { motion } from "framer-motion";

const iconMap = { mail: FiMail, phone: FiPhone, location: FiMapPin };

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle");

  const handleChange = (e) => setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");
    try {
      const response = await fetch("https://formsubmit.co/ajax/saikat.ghosh.in99@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
    setTimeout(() => setStatus("idle"), 3000);
  };

  return (
    <SectionWrapper id="contact" className="py-20">
      <div className="py-12 relative">
        <div className="mx-auto max-w-5xl px-6">
          {/* Header */}
          <div className="mb-16 text-center">
            <h2 className="section-title">Let's Talk</h2>
          </div>

          <div className="grid gap-10 lg:grid-cols-2 max-w-4xl mx-auto">
            {/* Info */}
            <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }} viewport={{ once: true, margin: "-80px" }}>
              <div className="card p-8 h-full flex flex-col justify-center">
                <h3 className="mb-3 text-xl font-semibold" style={{ color: "var(--color-text-heading)" }}>Get in touch</h3>
                <p className="mb-8 text-sm leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
                  I'm always open to discussing new projects, creative ideas, or opportunities to be part of something great.
                </p>

                <div className="space-y-4">
                  {contact.links.map((link, idx) => {
                    const Icon = iconMap[link.icon] || FiMail;
                    return (
                      <div key={idx} className="flex items-center gap-4 group">
                        <span className="flex h-10 w-10 items-center justify-center rounded-xl transition-transform duration-200 group-hover:scale-105" style={{
                          backgroundColor: "var(--color-accent-soft)",
                          color: "var(--color-accent)",
                        }}>
                          <Icon className="h-4 w-4" />
                        </span>
                        {link.url ? (
                          <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-sm font-normal no-underline hover:text-[var(--color-accent)] transition-colors duration-150" style={{ color: "var(--color-text-body)" }}>{link.label}</a>
                        ) : (
                          <span className="text-sm" style={{ color: "var(--color-text-body)" }}>{link.label}</span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>

            {/* Form */}
            <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1, ease: [0.23, 1, 0.32, 1] }} viewport={{ once: true, margin: "-80px" }}>
              <form onSubmit={handleSubmit} className="card p-8">
                <div className="space-y-5">
                  {contact.form.fields.map((field) => (
                    <div key={field.name}>
                      <label htmlFor={field.name} className="mb-1.5 block text-sm font-medium select-none" style={{ color: "var(--color-text-heading)" }}>{field.label}</label>
                      {field.type === "textarea" ? (
                        <textarea id={field.name} name={field.name} value={formData[field.name]} onChange={handleChange} placeholder={field.placeholder} required
                          className="w-full resize-none h-28 px-4 py-3 text-sm outline-none transition-[border-color,box-shadow] duration-200 focus:ring-2 focus:ring-[var(--color-accent)] focus:ring-opacity-30"
                          style={{ backgroundColor: "var(--color-input-bg)", border: "1px solid var(--color-input-border)", borderRadius: "var(--radius-input)", color: "var(--color-input-text)" }}
                        />
                      ) : (
                        <input type={field.type} id={field.name} name={field.name} value={formData[field.name]} onChange={handleChange} placeholder={field.placeholder} required
                          className="w-full px-4 py-3 text-sm outline-none transition-[border-color,box-shadow] duration-200 focus:ring-2 focus:ring-[var(--color-accent)] focus:ring-opacity-30"
                          style={{ backgroundColor: "var(--color-input-bg)", border: "1px solid var(--color-input-border)", borderRadius: "var(--radius-input)", color: "var(--color-input-text)" }}
                        />
                      )}
                    </div>
                  ))}
                  <button type="submit" disabled={status === "submitting"} className="btn-primary w-full justify-center h-12">
                    {status === "submitting" ? "Sending..." : contact.form.buttonText}
                  </button>
                  {status === "success" && <p className="mt-3 text-center text-sm font-medium" style={{ color: "#30d158" }}>Message sent successfully!</p>}
                  {status === "error" && <p className="mt-3 text-center text-sm font-medium" style={{ color: "#ff453a" }}>Failed to send. Please try again.</p>}
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
