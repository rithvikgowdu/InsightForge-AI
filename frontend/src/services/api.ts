const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:8000";

type RequestOptions = RequestInit & {
  auth?: boolean;
};

async function request<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  const { auth = false, headers, ...fetchOptions } = options;

  const token = localStorage.getItem("access_token");

  const requestHeaders = new Headers(headers);

  requestHeaders.set("Content-Type", "application/json");

  if (auth && token) {
    requestHeaders.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(
    `${API_BASE_URL}${endpoint}`,
    {
      ...fetchOptions,
      headers: requestHeaders,
    }
  );

  if (!response.ok) {
    let message = "Something went wrong";

    try {
      const errorData = await response.json();

      if (typeof errorData.detail === "string") {
        message = errorData.detail;
      }
    } catch {
      // Keep the default error message
    }

    throw new Error(message);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json();
}


/* =========================
   Authentication
========================= */

export type RegisterRequest = {
  username: string;
  email: string;
  password: string;
};

export type RegisterResponse = {
  id: number;
  username: string;
  email: string;
  is_active: boolean;
};

export type LoginRequest = {
  username: string;
  password: string;
};

export type LoginResponse = {
  access_token: string;
  token_type: string;
};

export type User = {
  id: number;
  username: string;
  email: string;
  is_active: boolean;
};


export async function register(
  data: RegisterRequest
): Promise<RegisterResponse> {
  return request<RegisterResponse>("/auth/register", {
    method: "POST",
    body: JSON.stringify(data),
  });
}


export async function login(
  data: LoginRequest
): Promise<LoginResponse> {
  const response = await request<LoginResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify(data),
  });

  localStorage.setItem(
    "access_token",
    response.access_token
  );

  return response;
}


export async function getCurrentUser(): Promise<User> {
  return request<User>("/auth/me", {
    method: "GET",
    auth: true,
  });
}


export function logout(): void {
  localStorage.removeItem("access_token");
}


export function getToken(): string | null {
  return localStorage.getItem("access_token");
}


/* =========================
   Analysis
========================= */

export type StartAnalysisRequest = {
  owner: string;
  repository: string;
  limit: number;
};


/*
 * One individual cluster returned inside
 * the completed analysis results.
 */

export type AnalysisResult = {
  cluster: number;
  documents: number;
  summary: string;
  pain_score: number;
  opportunity?: Record<string, unknown>;
  growth?: number | null;
};



/*
 * The completed analysis returns results
 * as an object containing a clusters array.
 */
export type AnalysisResults = {
  clusters: AnalysisResult[];
};


/*
 * Response returned immediately by
 * POST /analysis.
 *
 * At this stage the backend returns
 * status = pending and results = [].
 */
export type StartAnalysisResponse = {
  id: number;
  repository: string;
  status: string;
  total_clusters: number;
  results: unknown[];
};


/*
 * Response returned by
 * GET /analysis/{analysis_id}/status.
 *
 * This endpoint does not return the full results.
 */
export type AnalysisStatus = {
  id: number;
  repository: string;
  status: string;
  total_clusters: number;
};


/*
 * Complete analysis returned by
 * GET /analysis/{analysis_id}
 * and GET /analysis/history.
 */
export type Analysis = {
  id: number;
  repository: string;
  status: string;
  total_clusters: number;
  results: AnalysisResults;
  created_at?: string;
};


/*
 * Start a new analysis.
 */
export async function startAnalysis(
  data: StartAnalysisRequest
): Promise<StartAnalysisResponse> {
  return request<StartAnalysisResponse>("/analysis", {
    method: "POST",
    auth: true,
    body: JSON.stringify(data),
  });
}


/*
 * Check the current status of an analysis.
 */
export async function getAnalysisStatus(
  analysisId: number
): Promise<AnalysisStatus> {
  return request<AnalysisStatus>(
    `/analysis/${analysisId}/status`,
    {
      method: "GET",
      auth: true,
    }
  );
}


/*
 * Get the complete analysis including
 * clusters and AI-generated results.
 */
export async function getAnalysis(
  analysisId: number
): Promise<Analysis> {
  return request<Analysis>(
    `/analysis/${analysisId}`,
    {
      method: "GET",
      auth: true,
    }
  );
}


/*
 * Get the user's analysis history.
 */
export async function getAnalysisHistory(): Promise<
  Analysis[]
> {
  return request<Analysis[]>("/analysis/history", {
    method: "GET",
    auth: true,
  });
}


/* =========================
   Health
========================= */

export type HealthResponse = {
  status: string;
};


export async function healthCheck(): Promise<HealthResponse> {
  return request<HealthResponse>("/health", {
    method: "GET",
  });
}