
export interface LoginPayload {
  lgoin: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface ApiResponse<T> {
  status?: boolean;
  message?: string;
  error?: string;
  token?: string;
  data: T;
}

export interface LoginResponse {
  accessToken: string;
}
