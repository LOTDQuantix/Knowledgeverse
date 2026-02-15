"use client";

import { useState, useEffect } from 'react';

export interface ProgressData {
    progress: number;
    completed: boolean;
}

export function useProgress() {
    const [progressMap, setProgressMap] = useState<Record<string, ProgressData>>({});

    // Load from localStorage on mount
    useEffect(() => {
        const saved = localStorage.getItem('devverse_progress');
        if (saved) {
            try {
                setProgressMap(JSON.parse(saved));
            } catch (e) {
                console.error("Failed to parse progress data", e);
            }
        }
    }, []);

    // Save to localStorage when progressMap changes
    const updateProgress = (nodeId: string, data: Partial<ProgressData>) => {
        setProgressMap(prev => {
            const current = prev[nodeId] || { progress: 0, completed: false };
            const updated = { ...current, ...data };

            // Auto-complete if progress reaches 100
            if (updated.progress >= 100) {
                updated.progress = 100;
                updated.completed = true;
            }

            const newMap = { ...prev, [nodeId]: updated };
            localStorage.setItem('devverse_progress', JSON.stringify(newMap));
            return newMap;
        });
    };

    return { progressMap, updateProgress };
}
