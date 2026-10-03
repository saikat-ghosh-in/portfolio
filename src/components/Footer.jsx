import { profile } from "../data/siteData";
import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";

export default function Footer() {
  const year = new Date().getFullYear();

  const socials = [
    { icon: FiGithub, href: "https://github.com/saikat-ghosh-in", label: "GitHub" },
    { icon: FiLinkedin, href: "https://linkedin.com/in/ln-saikat", label: "LinkedIn" },
    { icon: FiMail, href: `mailto:${profile.email}`, label: "Email" },
  ];

  return (
    <footer style={{ backgroundColor: "var(--color-footer-bg)", borderTop: "1px solid var(--color-footer-border)" }} className="py-8 relative z-50">
      <div className="mx-auto max-w-5xl px-6 flex flex-col items-center gap-5 sm:flex-row sm:justify-between">
        <p className="text-xs" style={{ color: "var(--color-footer-text)" }}>
          © {year} {profile.name}. All rights reserved.
        </p>

        <div className="flex items-center gap-3">
          {socials.map((item) => {
            const Icon = item.icon;
            return (
              <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer" aria-label={item.label}
                className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition-[color,transform,background-color] duration-200 ease-[var(--ease-out)] hover:scale-105 active:scale-95 select-none touch-manipulation no-underline"
                style={{
                  color: "var(--color-footer-text)",
                  backgroundColor: "var(--color-accent-soft)",
                }}
              >
                <Icon className="h-3.5 w-3.5" />
              </a>
            );
          })}
        </div>
      </div>
    </footer>
  );
}
