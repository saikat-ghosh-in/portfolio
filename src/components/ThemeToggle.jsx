import { useTheme } from "../context/ThemeContext";
import { motion } from "framer-motion";
import { FiSun, FiMoon } from "react-icons/fi";

export default function ThemeToggle() {
  const { mode, toggleMode } = useTheme();
  const isDark = mode === "dark";

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={(e) => toggleMode(e)}
      className="relative flex items-center justify-between w-[72px] h-9 rounded-full p-1 transition-[background-color,border-color,box-shadow] duration-200 cursor-pointer select-none touch-manipulation"
      style={{ 
        backgroundColor: "var(--color-bg-surface-alt)", 
        border: "1px solid var(--color-border)",
        boxShadow: isDark ? "inset 0 2px 4px rgba(0,0,0,0.5)" : "inset 0 2px 4px rgba(0,0,0,0.05)"
      }}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      {/* Sliding indicator */}
      <motion.div 
        className="absolute w-7 h-7 rounded-full shadow-sm"
        style={{ backgroundColor: "var(--color-bg-primary)", border: "1px solid var(--color-border)" }}
        initial={false}
        animate={{ 
          x: isDark ? 34 : 0,
        }}
        transition={{ type: "spring", duration: 0.35, bounce: 0.15 }}
      />

      {/* Sun Icon */}
      <div className="relative z-10 flex items-center justify-center w-7 h-7">
        <FiSun className="w-4 h-4 transition-colors duration-200" style={{ color: !isDark ? "var(--color-accent)" : "var(--color-text-muted)" }} />
      </div>

      {/* Moon Icon */}
      <div className="relative z-10 flex items-center justify-center w-7 h-7">
        <FiMoon className="w-4 h-4 transition-colors duration-200" style={{ color: isDark ? "var(--color-accent)" : "var(--color-text-muted)" }} />
      </div>
    </motion.button>
  );
}
