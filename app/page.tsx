"use client";

import dynamic from 'next/dynamic';
import { ThemeProvider, useTheme } from '@/lib/ThemeContext';
import ThemeToggle from '@/components/ThemeToggle';

// Datasets
import knowledgeverseData from '@/data/knowledgeverse.json';
import profileverseData from '@/data/profileverse.json';
import devverseData from '@/data/devverse.json';
import { KnowledgeNode } from '@/types';

const GraphScene = dynamic(() => import('@/components/GraphScene'), { ssr: false });

function UniverseContent() {
  const { activeUniverse } = useTheme();

  let activeData: KnowledgeNode | null = null;
  if (activeUniverse === 'knowledgeverse') activeData = (knowledgeverseData as KnowledgeNode[])[0];
  if (activeUniverse === 'profileverse') activeData = (profileverseData as KnowledgeNode[])[0];
  if (activeUniverse === 'devverse') activeData = (devverseData as KnowledgeNode[])[0];

  return <GraphScene data={activeData} />;
}

export default function Home() {
  return (
    <ThemeProvider>
      <main className="w-full h-screen overflow-hidden bg-black">
        <ThemeToggle />
        <UniverseContent />
      </main>
    </ThemeProvider>
  );
}
