import { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";
import { FiArrowUp } from "react-icons/fi";

export default function BackToTop() {
  const { mode } = useTheme();
  const isDark = mode === "dark";
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!show) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-6 right-6 z-40 flex h-11 w-11 items-center justify-center shadow-lg transition-all duration-200 hover:-translate-y-1"
      style={{
        backgroundColor: "var(--color-accent)",
        color: isDark ? "#08080c" : "#ffffff",
        borderRadius: isDark ? 0 : "0.75rem",
        boxShadow: isDark ? "0 0 15px var(--color-accent-glow)" : "0 4px 12px rgba(37,99,235,0.3)",
      }}
      aria-label="Back to top"
    >
      <FiArrowUp className="h-5 w-5" />
    </button>
  );
}
