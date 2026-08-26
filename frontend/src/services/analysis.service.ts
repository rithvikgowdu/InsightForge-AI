import apiClient from "../api/client";
import { API_ENDPOINTS } from "../api/endpoints";
import type {
  AnalysisRequest,
  AnalysisResponse,
  AnalysisHistoryResponse,
} from "../types/analysis";

interface AnalysisStatusResponse {
  id: number;
  repository: string;
  status: string;
  total_clusters: number;
}

export const analyzeRepository = async (
  request: AnalysisRequest
): Promise<AnalysisResponse> => {
  const response = await apiClient.post<AnalysisResponse>(
    API_ENDPOINTS.analysis,
    request
  );

  const analysisId = response.data.id;

  while (true) {
    const statusResponse = await apiClient.get<AnalysisStatusResponse>(
      `${API_ENDPOINTS.analysis}/${analysisId}/status`
    );

    const status = statusResponse.data.status;

    if (status === "completed") {
      const resultResponse = await apiClient.get<AnalysisResponse>(
        `${API_ENDPOINTS.analysis}/${analysisId}`
      );

      return resultResponse.data;
    }

    if (status === "failed") {
      throw new Error("Analysis failed on the backend.");
    }

    await new Promise((resolve) => setTimeout(resolve, 2000));
  }
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