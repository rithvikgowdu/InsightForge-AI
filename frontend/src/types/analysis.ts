export interface AnalysisRequest {
  owner: string;
  repository: string;
  limit?: number;
}

export interface Opportunity {
  [key: string]: unknown;
}

export interface ClusterResult {
  cluster: number;
  documents: number;
  summary: string;
  opportunity: Opportunity;
}

export interface AnalysisResponse {
  id: number;
  repository: string;
  status: string;
  total_clusters: number;
  results: ClusterResult[];
}

export interface AnalysisHistoryResponse {
  id: number;
  repository: string;
  status: string;
  total_clusters: number;
  results: Record<string, unknown>;
  created_at: string;
}