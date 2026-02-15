"use client";

import { useTheme } from "@/lib/ThemeContext";

export default function ThemeToggle() {
    const { mode, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="fixed top-4 right-4 z-50 px-4 py-2 rounded-full border border-white/20 bg-black/40 text-white backdrop-blur-md hover:bg-white/10 transition-all duration-300"
        >
            Switch to {mode === "day" ? "Night" : "Day"} World
        </button>
    );
}
