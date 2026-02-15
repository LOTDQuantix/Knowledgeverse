"use client";

import React, { useState } from "react";

interface CommitSimulationProps {
    onComplete: (success: boolean) => void;
}

interface Commit {
    id: string;
    message: string;
    files: string[];
    timestamp: string;
}

export default function CommitSimulation({ onComplete }: CommitSimulationProps) {
    const [workingDirectory, setWorkingDirectory] = useState<string[]>(["index.html", "styles.css"]);
    const [stagedFiles, setStagedFiles] = useState<string[]>([]);
    const [commits, setCommits] = useState<Commit[]>([]);
    const [newFileName, setNewFileName] = useState("");
    const [commitMessage, setCommitMessage] = useState("");

    const addFile = () => {
        if (newFileName && !workingDirectory.includes(newFileName)) {
            setWorkingDirectory([...workingDirectory, newFileName]);
            setNewFileName("");
        }
    };

    const stageFile = (file: string) => {
        if (!stagedFiles.includes(file)) {
            setStagedFiles([...stagedFiles, file]);
        }
    };

    const unstageFile = (file: string) => {
        setStagedFiles(stagedFiles.filter(f => f !== file));
    };

    const doCommit = () => {
        if (stagedFiles.length > 0 && commitMessage) {
            const newCommit: Commit = {
                id: Math.random().toString(36).substr(2, 7),
                message: commitMessage,
                files: [...stagedFiles],
                timestamp: new Date().toLocaleTimeString()
            };
            setCommits([newCommit, ...commits]);
            setStagedFiles([]);
            setCommitMessage("");

            if (commits.length >= 1) { // Achievement: 2 commits
                onComplete(true);
            }
        }
    };

    return (
        <div className="p-6 flex flex-col gap-6 h-full text-white animate-in fade-in duration-500">
            <div className="grid grid-cols-3 gap-4 h-64">
                {/* Working Directory */}
                <div className="bg-white/5 border border-white/10 rounded-lg p-4 flex flex-col gap-3">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-white/40">Working Directory</h4>
                    <div className="flex-1 overflow-y-auto flex flex-col gap-2">
                        {workingDirectory.map(f => (
                            <div key={f} className="flex items-center justify-between p-2 bg-white/5 rounded border border-white/5 text-sm group">
                                <span>{f}</span>
                                {!stagedFiles.includes(f) && (
                                    <button onClick={() => stageFile(f)} className="text-[10px] bg-white/10 px-2 py-1 rounded hover:bg-white/20 opacity-0 group-hover:opacity-100 transition-all">Stage</button>
                                )}
                            </div>
                        ))}
                    </div>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={newFileName}
                            onChange={e => setNewFileName(e.target.value)}
                            placeholder="new_file.js"
                            className="flex-1 bg-black/40 border border-white/10 rounded px-2 py-1 text-xs focus:outline-none focus:border-white/20"
                        />
                        <button onClick={addFile} className="bg-white/10 p-1 rounded text-lg hover:bg-white/20">＋</button>
                    </div>
                </div>

                {/* Staging Area */}
                <div className="bg-white/5 border border-white/10 rounded-lg p-4 flex flex-col gap-3">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-green-400/60">Staging Area</h4>
                    <div className="flex-1 overflow-y-auto flex flex-col gap-2">
                        {stagedFiles.length === 0 ? (
                            <div className="flex-1 flex items-center justify-center text-[10px] text-white/20 text-center italic">
                                Stage files to see them here
                            </div>
                        ) : (
                            stagedFiles.map(f => (
                                <div key={f} className="flex items-center justify-between p-2 bg-green-500/10 rounded border border-green-500/20 text-sm group">
                                    <span className="text-green-400">{f}</span>
                                    <button onClick={() => unstageFile(f)} className="text-[10px] bg-white/10 px-2 py-1 rounded hover:bg-white/20 opacity-0 group-hover:opacity-100 transition-all">Unstage</button>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Local Repository (History) */}
                <div className="bg-white/5 border border-white/10 rounded-lg p-4 flex flex-col gap-3">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-blue-400/60">Commit History</h4>
                    <div className="flex-1 overflow-y-auto flex flex-col gap-2 relative">
                        {commits.map((c, i) => (
                            <div key={c.id} className="relative pl-6">
                                {/* Visual Branch Line */}
                                {i < commits.length - 1 && (
                                    <div className="absolute left-[7px] top-4 bottom-[-10px] w-0.5 bg-blue-500/30" />
                                )}
                                <div className="absolute left-0 top-1 w-4 h-4 rounded-full border-2 border-blue-500 bg-black flex items-center justify-center">
                                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                                </div>
                                <div className="p-2 bg-blue-500/5 rounded border border-blue-500/10 text-[10px]">
                                    <div className="flex justify-between text-blue-400/80 mb-1">
                                        <span className="font-mono">{c.id}</span>
                                        <span>{c.timestamp}</span>
                                    </div>
                                    <div className="font-bold text-white/80">{c.message}</div>
                                    <div className="opacity-40">{c.files.length} files changed</div>
                                </div>
                            </div>
                        ))}
                        {commits.length === 0 && (
                            <div className="flex-1 flex items-center justify-center text-[10px] text-white/20 text-center italic">
                                No commits yet
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Commit UI */}
            <div className="p-4 bg-white/5 border border-white/10 rounded-xl flex gap-4 items-end animate-in slide-in-from-bottom-2 duration-700 delay-300">
                <div className="flex-1 flex flex-col gap-2">
                    <label className="text-[10px] uppercase font-bold text-white/40 tracking-widest">Commit Message</label>
                    <input
                        type="text"
                        placeholder="Ex: Add landing page structural components"
                        value={commitMessage}
                        onChange={e => setCommitMessage(e.target.value)}
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-blue-500/50 transition-all"
                    />
                </div>
                <button
                    onClick={doCommit}
                    disabled={stagedFiles.length === 0 || !commitMessage}
                    className={`px-8 py-3 rounded-lg font-bold transition-all ${stagedFiles.length > 0 && commitMessage ? "bg-blue-600 text-white hover:bg-blue-500 shadow-lg shadow-blue-500/20" : "bg-white/5 text-white/20 cursor-not-allowed"}`}
                >
                    Commit
                </button>
            </div>

            {commits.length >= 2 && (
                <div className="text-center text-green-400 text-xs font-bold animate-bounce mt-2">
                    Objective Met: You've mastered basic commits!
                </div>
            )}
        </div>
    );
}
