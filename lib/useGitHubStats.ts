"use client";

import { useState, useCallback } from 'react';

export interface GitHubStats {
    stars: number;
    forks: number;
    lastCommitDate: string;
    openIssues: number;
}

export function useGitHubStats() {
    const [statsMap, setStatsMap] = useState<Record<string, GitHubStats>>({});
    const [loadingMap, setLoadingMap] = useState<Record<string, boolean>>({});

    const fetchStats = useCallback(async (repo: string) => {
        // Return cached stats if available
        if (statsMap[repo] || loadingMap[repo]) return;

        setLoadingMap(prev => ({ ...prev, [repo]: true }));

        try {
            const res = await fetch(`/api/github?repo=${repo}`);
            if (!res.ok) throw new Error('Failed to fetch GitHub stats');

            const data = await res.json();
            setStatsMap(prev => ({ ...prev, [repo]: data }));
        } catch (error) {
            console.error(`Error fetching stats for ${repo}:`, error);
        } finally {
            setLoadingMap(prev => ({ ...prev, [repo]: false }));
        }
    }, [statsMap, loadingMap]);

    return { statsMap, loadingMap, fetchStats };
}
