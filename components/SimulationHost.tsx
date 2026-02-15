"use client";

import React, { Suspense, lazy } from "react";
import { KnowledgeNode } from "@/types";

interface SimulationHostProps {
  node: KnowledgeNode;
  onComplete: (success: boolean) => void;
}

// Lazy load simulations
const CommitSimulation = lazy(() => import("@/components/simulations/CommitSimulation"));
const BranchingSimulation = lazy(() => import("@/components/simulations/BranchingSimulation"));
const ConflictSimulation = lazy(() => import("@/components/simulations/ConflictSimulation"));

export default function SimulationHost({ node, onComplete }: SimulationHostProps) {
  const renderSimulation = () => {
    switch (node.contentId) {
      case "git-commit":
        return <CommitSimulation onComplete={onComplete} />;
      case "git-branch":
        return <BranchingSimulation onComplete={onComplete} />;
      case "git-conflict":
        return <ConflictSimulation onComplete={onComplete} />;
      default:
        return (
          <div className="p-8 text-center text-white/40">
            Simulation "{node.contentId}" not found.
          </div>
        );
    }
  };

  return (
    <div className="w-full min-h-[400px] bg-white/5 rounded-xl border border-white/10 overflow-hidden relative">
      <Suspense fallback={
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
        </div>
      }>
        {renderSimulation()}
      </Suspense>
    </div>
  );
}
