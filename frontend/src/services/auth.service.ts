import apiClient from "../api/client";

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface TokenResponse {
  access_token: string;
  token_type: string;
}

export interface UserResponse {
  id: number;
  username: string;
  email: string;
  is_active: boolean;
}

export const registerUser = async (
  request: RegisterRequest
): Promise<UserResponse> => {
  const response = await apiClient.post<UserResponse>(
    "/auth/register",
    request
  );

  return response.data;
};

export const loginUser = async (
  request: LoginRequest
): Promise<TokenResponse> => {
  const response = await apiClient.post<TokenResponse>(
    "/auth/login",
    request
  );

  return response.data;
};