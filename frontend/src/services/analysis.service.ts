import apiClient from "../api/client";
import { API_ENDPOINTS } from "../api/endpoints";
import type {
  AnalysisRequest,
  AnalysisResponse,
  AnalysisHistoryResponse,
} from "../types/analysis";

export const analyzeRepository = async (
  request: AnalysisRequest
): Promise<AnalysisResponse> => {
  const response = await apiClient.post<AnalysisResponse>(
    API_ENDPOINTS.analysis,
    request
  );

  return response.data;
};

export const getAnalysisHistory = async (): Promise<
  AnalysisHistoryResponse[]
> => {
  const response = await apiClient.get<AnalysisHistoryResponse[]>(
    API_ENDPOINTS.analysisHistory
  );

  return response.data;
};

export const getAnalysisById = async (
  analysisId: number
): Promise<AnalysisResponse> => {
  const response = await apiClient.get<AnalysisResponse>(
    API_ENDPOINTS.analysisById(analysisId)
  );

  return response.data;
};