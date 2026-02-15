"use client";

import React from "react";

interface ConflictSimulationProps {
  onComplete: (success: boolean) => void;
}

export default function ConflictSimulation({ onComplete }: ConflictSimulationProps) {
  return (
    <div className="p-12 text-center flex flex-col items-center justify-center h-full gap-4">
      <div className="text-4xl">⚔️</div>
      <h3 className="text-xl font-bold text-white">Merge Conflict Lab</h3>
      <p className="text-white/60 text-sm max-w-xs">
        Master the art of resolving conflicting changes. Implementation in progress.
      </p>
      <button 
        onClick={() => onComplete(true)}
        className="mt-4 px-6 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full text-white text-sm transition-all"
      >
        Skip to Mastery
      </button>
    </div>
  );
}
