"use client";

import React, { useState } from "react";
import { KnowledgeNode } from "@/types";

interface QuizViewProps {
  node: KnowledgeNode;
  onComplete: (success: boolean) => void;
}

// Mock question generator based on node label for Phase 8 demonstration
const getMockQuestions = (label: string) => [
  {
    question: `What is the primary characteristic of ${label}?`,
    options: ["Performance focus", "Spatial organization", "Hierarchical structure", "Data independence"],
    correct: 2
  },
  {
    question: `In the context of the KnowledgeVerse, how does ${label} interact with its neighbors?`,
    options: ["Direct pointer links", "Hierarchical parent-child shells", "Random orbital patterns", "Fixed grid placement"],
    correct: 1
  }
];

export default function QuizView({ node, onComplete }: QuizViewProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isFinished, setIsFinished] = useState(false);
  const [score, setScore] = useState(0);

  const questions = getMockQuestions(node.label);

  const handleNext = () => {
    if (selectedOption === questions[currentStep].correct) {
      setScore(s => s + 1);
    }

    if (currentStep < questions.length - 1) {
      setCurrentStep(s => s + 1);
      setSelectedOption(null);
    } else {
      setIsFinished(true);
      const passed = score + (selectedOption === questions[currentStep].correct ? 1 : 0) === questions.length;
      onComplete(passed);
    }
  };

  if (isFinished) {
    const passed = score === questions.length;
    return (
      <div className="text-center animate-in fade-in duration-500">
        <div className="text-6xl mb-4">{passed ? "🎉" : "💪"}</div>
        <h3 className="text-2xl font-bold text-white mb-2">
          {passed ? "Mastery Achieved!" : "Keep Practicing"}
        </h3>
        <p className="text-white/60 mb-8">
          You scored {score} out of {questions.length} questions correctly.
        </p>
        {!passed && (
            <button 
                onClick={() => {
                    setCurrentStep(0);
                    setSelectedOption(null);
                    setScore(0);
                    setIsFinished(false);
                }}
                className="px-6 py-2 border border-white/20 rounded-full text-white hover:bg-white/5 transition-all"
            >
                Try Again
            </button>
        )}
      </div>
    );
  }

  const q = questions[currentStep];

  return (
    <div className="animate-in slide-in-from-right-4 duration-300">
      <div className="flex justify-between items-center mb-6">
        <span className="text-white/40 text-xs font-mono uppercase tracking-widest">Question {currentStep + 1}/{questions.length}</span>
        <div className="flex gap-1">
          {questions.map((_, i) => (
            <div 
              key={i} 
              className={`w-8 h-1 rounded-full transition-all ${i === currentStep ? "bg-white" : i < currentStep ? "bg-green-500" : "bg-white/10"}`} 
            />
          ))}
        </div>
      </div>

      <h3 className="text-xl font-medium text-white mb-8">{q.question}</h3>

      <div className="grid gap-3 mb-10">
        {q.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => setSelectedOption(i)}
            className={`p-4 rounded-xl border text-left transition-all ${
              selectedOption === i 
                ? "bg-white border-white text-black font-bold scale-[1.02]" 
                : "bg-white/5 border-white/10 text-white/80 hover:bg-white/10"
            }`}
          >
            {opt}
          </button>
        ))}
      </div>

      <button
        disabled={selectedOption === null}
        onClick={handleNext}
        className={`w-full py-4 rounded-xl font-bold transition-all ${
          selectedOption !== null 
            ? "bg-white text-black hover:bg-white/90" 
            : "bg-white/10 text-white/20 cursor-not-allowed"
        }`}
      >
        {currentStep < questions.length - 1 ? "Next Question" : "Submit Quiz"}
      </button>
    </div>
  );
}
