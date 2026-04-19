import { profile } from "../data/siteData";
import { useTheme } from "../context/ThemeContext";
import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";

export default function Footer() {
  const { mode } = useTheme();
  const isDark = mode === "dark";
  const year = new Date().getFullYear();

  const socials = [
    { icon: FiGithub, href: profile.github, label: "GitHub" },
    { icon: FiLinkedin, href: profile.linkedin, label: "LinkedIn" },
    { icon: FiMail, href: `mailto:${profile.email}`, label: "Email" },
  ];

  return (
    <footer style={{ backgroundColor: "var(--color-footer-bg)", borderTop: "1px solid var(--color-footer-border)" }} className="py-10">
      <div className="mx-auto max-w-6xl px-6 flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
        <p className="text-sm" style={{ color: "var(--color-footer-text)" }}>
          © {year}{" "}
          <span className="font-semibold" style={{ color: isDark ? "var(--color-accent)" : "#e2e8f0" }}>{profile.name}</span>
          . All rights reserved.
        </p>

        <div className="flex items-center gap-4">
          {socials.map(({ icon: Icon, href, label }) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
              className="flex h-9 w-9 items-center justify-center transition-all duration-200 no-underline"
              style={{
                color: "var(--color-footer-text)",
                borderRadius: isDark ? 0 : "0.5rem",
                border: `1px solid ${isDark ? "var(--color-border)" : "rgba(255,255,255,0.1)"}`,
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "var(--color-accent)"; e.currentTarget.style.borderColor = "var(--color-accent)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "var(--color-footer-text)"; e.currentTarget.style.borderColor = isDark ? "var(--color-border)" : "rgba(255,255,255,0.1)"; }}
            >
              <Icon className="h-4 w-4" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
