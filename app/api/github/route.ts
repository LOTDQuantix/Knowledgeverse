import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const repo = searchParams.get('repo');

    if (!repo) {
        return NextResponse.json({ error: 'Repo parameter is required' }, { status: 400 });
    }

    const token = process.env.GITHUB_TOKEN;

    try {
        const res = await fetch(`https://api.github.com/repos/${repo}`, {
            headers: {
                ...(token && { Authorization: `token ${token}` }),
                'Accept': 'application/vnd.github.v3+json',
                'User-Agent': 'KnowledgeVerse-Agent'
            },
            next: { revalidate: 300 } // Cache for 5 minutes
        });

        if (!res.ok) {
            if (res.status === 404) return NextResponse.json({ error: 'Repository not found' }, { status: 404 });
            throw new Error(`GitHub API responded with ${res.status}`);
        }

        const data = await res.json();

        return NextResponse.json({
            stars: data.stargazers_count,
            forks: data.forks_count,
            lastCommitDate: data.pushed_at,
            openIssues: data.open_issues_count,
        }, {
            headers: {
                'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600'
            }
        });

    } catch (error: any) {
        console.error('GitHub Proxy Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
