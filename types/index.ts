export type NodeType = 'domain' | 'topic' | 'subtopic' | 'blog';

export interface KnowledgeNode {
  id: string;
  label: string;
  type: NodeType;
  description?: string;
  tags?: string[];
  difficulty?: number;
  energyLevel?: number;
  importance_weight?: number;
  children?: KnowledgeNode[];
  progress?: number;
  completed?: boolean;
  resources?: string[];
  repoLink?: string;
  githubRepo?: string;
  githubType?: "repo" | "org" | "user";
}
