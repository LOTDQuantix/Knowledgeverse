"use client";

import React from "react";
import { KnowledgeNode } from "@/types";
import QuizView from "@/components/QuizView";

interface InteractivePanelProps {
    node: KnowledgeNode;
    onClose: () => void;
    onProgressUpdate: (nodeId: string, progress: number, completed: boolean) => void;
}

export default function InteractivePanel({ node, onClose, onProgressUpdate }: InteractivePanelProps) {
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 pointer-events-none">
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-md pointer-events-auto"
                onClick={onClose}
            />

            <div className="relative w-full max-w-2xl bg-black/60 border border-white/20 backdrop-blur-2xl rounded-2xl overflow-hidden flex flex-col shadow-2xl pointer-events-auto animate-in fade-in zoom-in duration-300">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-white/10">
                    <div>
                        <span className="text-[10px] uppercase tracking-widest text-white/40 mb-1 block">
                            {node.type} • {node.difficulty ? `Level ${node.difficulty}` : 'Concept'}
                        </span>
                        <h2 className="text-2xl font-bold text-white tracking-tight">{node.label}</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:bg-white/10 hover:text-white transition-all"
                    >
                        ✕
                    </button>
                </div>

                {/* Content Area */}
                <div className="p-8 overflow-y-auto max-h-[70vh] custom-scrollbar">
                    {node.contentType === 'quiz' ? (
                        <QuizView
                            node={node}
                            onComplete={(success: boolean) => {
                                if (success) {
                                    onProgressUpdate(node.id, 100, true);
                                }
                            }}
                        />
                    ) : (
                        <div className="prose prose-invert max-w-none">
                            <p className="text-white/80 leading-relaxed text-lg mb-6">
                                {node.description || "No description available for this node."}
                            </p>

                            {node.resources && node.resources.length > 0 && (
                                <div className="mt-8 pt-8 border-t border-white/10">
                                    <h3 className="text-sm font-semibold text-white/40 uppercase tracking-wider mb-4">Deep Learning Resources</h3>
                                    <div className="grid gap-2">
                                        {node.resources.map((res, i) => (
                                            <a
                                                key={i}
                                                href={res}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="p-3 bg-white/5 border border-white/10 rounded-lg text-white/80 hover:bg-white/10 hover:text-white transition-all flex items-center justify-between group"
                                            >
                                                <span className="truncate">{res}</span>
                                                <span className="opacity-0 group-hover:opacity-100 transition-opacity">↗</span>
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="p-4 bg-white/5 border-t border-white/10 flex justify-center">
                    <button
                        onClick={onClose}
                        className="px-6 py-2 bg-white text-black font-semibold rounded-full hover:bg-white/90 transition-all text-sm"
                    >
                        Return to Graph
                    </button>
                </div>
            </div>
        </div>
    );
}
