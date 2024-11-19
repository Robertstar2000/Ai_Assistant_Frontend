export type ResearchMode = 'basic' | 'advanced';
export type ResearchType = 'general' | 'literature' | 'experimental';
export type CitationStyle = 'academic' | 'web' | 'informal';

export interface ResearchRequest {
  mode: ResearchMode;
  type: ResearchType;
  citationStyle: CitationStyle;
  query: string;
}

export interface ResearchProject {
  id: string;
  userId: string;
  title: string;
  mode: ResearchMode;
  type: ResearchType;
  citationStyle: CitationStyle;
  query: string;
  content: string;
  createdAt: string;
  credits: number;
}