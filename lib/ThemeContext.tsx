"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { ThemeMode, ThemeConfig, themes } from "@/styles/theme";

export type UniverseId = 'lobby' | 'knowledgeverse' | 'profileverse' | 'devverse';

interface ThemeContextType {
  mode: ThemeMode;
  config: ThemeConfig;
  activeUniverse: UniverseId;
  toggleTheme: () => void;
  setUniverse: (id: UniverseId) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const universeThemes: Record<UniverseId, { color: string; glow: string; stars?: number }> = {
  lobby: { color: '#FFFFFF', glow: '#FFFFFF', stars: 5000 },
  knowledgeverse: { color: '#4A90E2', glow: '#00FFFF', stars: 8000 },
  profileverse: { color: '#FF69B4', glow: '#FFFFFF', stars: 3000 },
  devverse: { color: '#00FF41', glow: '#00FF41', stars: 10000 },
};

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>("night");
  const [activeUniverse, setActiveUniverse] = useState<UniverseId>("lobby");

  const toggleTheme = () => {
    setMode((prev) => (prev === "day" ? "night" : "day"));
  };

  const currentConfig = {
    ...themes[mode],
    primaryNodeColor: universeThemes[activeUniverse].color,
    universeGlow: universeThemes[activeUniverse].glow,
    starCount: universeThemes[activeUniverse].stars
  };

  return (
    <ThemeContext.Provider value={{ mode, config: currentConfig, activeUniverse, toggleTheme, setUniverse: setActiveUniverse }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
